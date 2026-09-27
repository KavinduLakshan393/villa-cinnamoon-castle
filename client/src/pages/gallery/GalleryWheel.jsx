import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../../lib/motion.js';
import { useMediaQuery } from '../../lib/media.js';
import { scrollToTarget } from '../../lib/smoothScroll.js';
import './GalleryWheel.css';

const NARROW = '(max-width: 899px)';

/**
 * A thin half-wheel at the left edge: a rim, a hub and one spoke between each
 * pair of chapters. As the visitor scrolls through the chapters, the wheel turns
 * so the chapter on screen faces the photographs (3 o'clock) and its label is
 * highlighted. Selecting a label scrolls to that chapter.
 *
 * `chapters`: [{ key, title }]; `getSection(key)` returns the chapter element.
 */
export default function GalleryWheel({ chapters, scopeRef, getSection }) {
  const rootRef = useRef(null);
  const narrow = useMediaQuery(NARROW);
  const count = chapters.length;
  const step = 360 / count;
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  // Places the rotating spokes and labels for a fractional chapter position f.
  const render = useCallback(
    (f) => {
      const root = rootRef.current;
      if (!root) return;
      const rotation = -f * step;
      // SVG rotate() turns the spokes about the dial's centre (0,0 in the viewBox).
      root.querySelector('.wheel__spokes')?.setAttribute('transform', `rotate(${rotation.toFixed(3)})`);
      root.style.setProperty('--wheel-rotation', `${rotation}deg`);
      root.querySelectorAll('[data-wheel-label]').forEach((label, i) => {
        const angle = ((i * step + rotation) * Math.PI) / 180;
        const facing = Math.cos(angle); // 1 at 3 o'clock, 0 at 12 and 6 o'clock
        label.style.setProperty('--x', `${Math.cos(angle)}`);
        label.style.setProperty('--y', `${Math.sin(angle)}`);
        label.style.opacity = facing > 0 ? Math.pow(facing, 2).toFixed(3) : '0';
        label.style.visibility = facing > 0.05 ? 'visible' : 'hidden';
      });
      setActive(Math.min(count - 1, Math.max(0, Math.round(f))));
    },
    [count, step],
  );

  useGSAP(
    () => {
      const state = { f: 0 };
      const ease = prefersReducedMotion()
        ? (v) => {
            state.f = v;
            render(v);
          }
        : gsap.quickTo(state, 'f', { duration: 0.6, ease: 'power3.out', onUpdate: () => render(state.f) });

      // Fractional chapter under the middle of the screen: mid-chapter = exact index.
      const measure = () => {
        const mid = window.innerHeight / 2;
        let f = 0;
        chapters.forEach((chapter, i) => {
          const el = getSection(chapter.key);
          if (!el) return;
          const box = el.getBoundingClientRect();
          if (box.top <= mid) f = i + Math.min(1, (mid - box.top) / box.height) - 0.5;
        });
        ease(Math.min(count - 1, Math.max(0, f)));
      };

      render(0);
      const trigger = ScrollTrigger.create({
        trigger: scopeRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: measure,
        onRefresh: measure,
        onToggle: (self) => setInView(self.isActive),
      });
      return () => trigger.kill();
    },
    { dependencies: [chapters, render] },
  );

  // Keeps the rotation right after a resize (the radius changes with the viewport).
  useEffect(() => ScrollTrigger.refresh(), [narrow]);

  const go = (key) => {
    const el = getSection(key);
    if (el) scrollToTarget(el);
  };

  return (
    <nav
      className={`wheel${narrow ? ' wheel--compact' : ''}${inView ? ' is-in-view' : ''}`}
      ref={rootRef}
      aria-label="Gallery sections"
    >
      <div className="wheel__dial" aria-hidden="true">
        <svg className="wheel__svg" viewBox="-100 -100 200 200" focusable="false">
          <circle className="wheel__rim" r="99" />
          <circle className="wheel__hub" r="9" />
          <g className="wheel__spokes">
            {chapters.map((chapter, i) => {
              // Spokes sit between chapters, half a step either side of each label.
              const a = ((i + 0.5) * step * Math.PI) / 180;
              return <line key={chapter.key} x1={9 * Math.cos(a)} y1={9 * Math.sin(a)} x2={99 * Math.cos(a)} y2={99 * Math.sin(a)} />;
            })}
          </g>
          {/* Fixed marker: the arc of the chapter facing the photographs. */}
          <path
            className="wheel__marker"
            d={`M ${99 * Math.cos((-step / 2) * (Math.PI / 180))} ${99 * Math.sin((-step / 2) * (Math.PI / 180))} A 99 99 0 0 1 ${99 * Math.cos((step / 2) * (Math.PI / 180))} ${99 * Math.sin((step / 2) * (Math.PI / 180))}`}
          />
        </svg>
      </div>

      <ol className="wheel__labels">
        {chapters.map((chapter, i) => (
          <li key={chapter.key} data-wheel-label="">
            <button
              type="button"
              className="wheel__label"
              aria-current={i === active ? 'true' : undefined}
              onClick={() => go(chapter.key)}
            >
              <span className="wheel__index">{String(i + 1).padStart(2, '0')}</span>
              <span className="wheel__title">{chapter.title}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* Compact wheel (phones and tablets): the chapter on screen, named beside the dial. */}
      <p className="wheel__current" aria-hidden="true">
        <span className="wheel__index">{String(active + 1).padStart(2, '0')}</span>
        <span className="wheel__title">{chapters[active].title}</span>
      </p>
    </nav>
  );
}
