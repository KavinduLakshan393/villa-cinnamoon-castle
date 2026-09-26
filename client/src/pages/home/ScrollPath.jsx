import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, useGSAP, withMotion } from '../../lib/motion.js';
import './ScrollPath.css';

/**
 * A line drawn by scrolling, laid behind the text and photographs of its parent
 * (the parent must be `position: relative`). The path is written in a 0–100
 * box and scaled to the parent's size in pixels, so the stroke keeps its width
 * and dash lengths stay exact.
 *
 * - `travel`: a segment runs along the path from start to end and leaves it,
 *   so the line is never fully drawn and feels alive.
 * - `draw`:   the line draws from its start and stays drawn.
 *
 * Scrubbed against native scroll between `start` and `end` of the parent.
 * With reduced motion the whole line is shown, still.
 */
export default function ScrollPath({ d, mode = 'draw', segment = 0.4, start = 'top 75%', end = 'bottom 60%', className = '' }) {
  const rootRef = useRef(null);
  const [size, setSize] = useState(null);

  // Follow the parent's size; the path's coordinate pairs are scaled from 0–100 to pixels.
  useLayoutEffect(() => {
    const el = rootRef.current;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev && prev.w === width && prev.h === height ? prev : { w: width, h: height }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scaled =
    size && d.replace(/(-?\d*\.?\d+)\s+(-?\d*\.?\d+)/g, (_, x, y) => `${((x * size.w) / 100).toFixed(1)} ${((y * size.h) / 100).toFixed(1)}`);

  useGSAP(
    () =>
      withMotion(() => {
        const path = rootRef.current.querySelector('path');
        if (!path) return;
        const scope = rootRef.current.parentElement;
        const travel = mode === 'travel';
        // pathLength="1": a dash of `segment` followed by a gap longer than the whole path.
        // Animated as attributes: CSS pixel values would be rounded to whole numbers.
        gsap.set(path, { attr: { 'stroke-dasharray': travel ? `${segment} 2` : '1 2' } });
        gsap.fromTo(
          path,
          { attr: { 'stroke-dashoffset': travel ? segment : 1 } },
          {
            attr: { 'stroke-dashoffset': travel ? -1 : 0 },
            ease: 'none',
            scrollTrigger: { trigger: scope, start, end, scrub: true },
          },
        );
      }),
    { scope: rootRef, dependencies: [Boolean(size)] },
  );

  return (
    <div className={`scroll-path ${className}`} ref={rootRef} aria-hidden="true">
      {size && (
        <svg viewBox={`0 0 ${size.w} ${size.h}`} focusable="false">
          <path d={scaled} pathLength="1" />
        </svg>
      )}
    </div>
  );
}
