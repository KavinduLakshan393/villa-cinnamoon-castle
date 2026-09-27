import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/motion.js';
import { useMediaQuery, useReducedMotion } from '../lib/media.js';
import './CursorLabel.css';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';

/**
 * A round label that follows the pointer over any `[data-cursor]` element and
 * shows its text (e.g. "View"). Mouse and trackpad only; with reduced motion
 * the native zoom-in cursor is used instead. Purely visual: the element under
 * it keeps its own accessible name and keyboard behaviour.
 */
export default function CursorLabel() {
  const fine = useMediaQuery(FINE_POINTER);
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const ref = useRef(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return undefined;
    document.documentElement.classList.add('has-cursor-label');
    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    let active = null;

    const onMove = (event) => {
      x(event.clientX);
      y(event.clientY);
      const target = event.target.closest?.('[data-cursor]') ?? null;
      if (target === active) return;
      active = target;
      if (target) {
        setText(target.dataset.cursor);
        gsap.to(el, { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
      } else {
        gsap.to(el, { scale: 0.3, opacity: 0, duration: 0.3, ease: 'power2.in', overwrite: 'auto' });
      }
    };
    // First move: jump into place instead of gliding in from the corner.
    const onFirst = (event) => {
      gsap.set(el, { x: event.clientX, y: event.clientY });
      window.removeEventListener('pointermove', onFirst);
    };
    const onLeave = () => {
      active = null;
      gsap.to(el, { scale: 0.3, opacity: 0, duration: 0.2 });
    };

    window.addEventListener('pointermove', onFirst);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.documentElement.classList.remove('has-cursor-label');
      window.removeEventListener('pointermove', onFirst);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="cursor-label" ref={ref} aria-hidden="true">
      <span>{text}</span>
    </div>
  );
}
