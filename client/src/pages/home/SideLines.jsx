import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, useGSAP, withMotion } from '../../lib/motion.js';
import { useMediaQuery } from '../../lib/media.js';
import './SideLines.css';

const NARROW = '(max-width: 759px)';

// Scales each "x y" pair of a path written in a 0–100 box to the parent's pixels,
// so the stroke keeps its width and the dash lengths stay exact.
const scale = (d, w, h) =>
  d.replace(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g, (_, x, y) => `${((x * w) / 100).toFixed(1)} ${((y * h) / 100).toFixed(1)}`);

/**
 * Two bold curved lines, one from each side of the page, that draw toward each
 * other as the section scrolls into view and rewind as it scrolls back out.
 * The drawing eases after the scroll rather than tracking it rigidly. They sit behind the
 * section's content (the parent gets `has-lines`). `desktop` and `mobile` are
 * { left, right } paths in a 0–100 box of the section. With reduced motion both
 * lines are shown complete and still.
 */
export default function SideLines({ desktop, mobile, start = 'top 90%', end = 'bottom 70%' }) {
  const rootRef = useRef(null);
  const [size, setSize] = useState(null);
  const paths = useMediaQuery(NARROW) ? mobile : desktop;

  useLayoutEffect(() => {
    const el = rootRef.current;
    el.parentElement.classList.add('has-lines');
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev && prev.w === width && prev.h === height ? prev : { w: width, h: height }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () =>
      withMotion(() => {
        const lines = rootRef.current.querySelectorAll('path');
        if (!lines.length) return;
        // pathLength="1": one dash as long as the path, hidden by an offset of 1 and drawn to 0.
        gsap.set(lines, { attr: { 'stroke-dasharray': '1 2' } });
        gsap.fromTo(
          lines,
          { attr: { 'stroke-dashoffset': 1 } },
          {
            attr: { 'stroke-dashoffset': 0 },
            ease: 'none',
            // scrub: 1.2 eases the line toward the scroll position (about 1.2 s),
            // so it glides instead of jumping, and rewinds when scrolling back up.
            scrollTrigger: { trigger: rootRef.current.parentElement, start, end, scrub: 1.2 },
          },
        );
      }),
    { scope: rootRef, dependencies: [Boolean(size), paths] },
  );

  return (
    <div className="side-lines" ref={rootRef} aria-hidden="true">
      {size && (
        <svg viewBox={`0 0 ${size.w} ${size.h}`} focusable="false">
          <path className="side-lines__left" d={scale(paths.left, size.w, size.h)} pathLength="1" />
          <path className="side-lines__right" d={scale(paths.right, size.w, size.h)} pathLength="1" />
        </svg>
      )}
    </div>
  );
}
