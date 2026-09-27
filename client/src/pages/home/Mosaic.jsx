import { useRef } from 'react';
import Frame from '../../components/Frame.jsx';
import { gsap, motionQuery, useGSAP, withMotion } from '../../lib/motion.js';

/**
 * Photographs in columns that drift at different speeds against native scroll,
 * so the section moves in depth while the page scrolls normally.
 * `columns` is a list of { shift, items }; `shift` is the column's travel in px
 * (negative moves up faster, positive lags behind). On narrow screens the column
 * wrappers dissolve into a two-up grid and the drift is switched off.
 * With `onOpen`, each photograph opens in the viewer.
 */
export default function Mosaic({ columns, sizes, onOpen, className = '' }) {
  const rootRef = useRef(null);

  useGSAP(
    () =>
      withMotion(() => {
        gsap.utils.toArray('.mosaic__column', rootRef.current).forEach((column) => {
          const shift = Number(column.dataset.shift) || 0;
          if (!shift) return;
          gsap.fromTo(
            column,
            { y: -shift },
            {
              y: shift,
              ease: 'none',
              scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });
      }, `(min-width: 760px) and ${motionQuery}`),
    { scope: rootRef },
  );

  return (
    <div className={`mosaic ${className}`} ref={rootRef} style={{ '--mosaic-columns': columns.length }}>
      {columns.map((column, i) => (
        <div key={i} className="mosaic__column" data-shift={column.shift ?? 0}>
          {column.items.map((item) => (
            <Frame key={item.name} sizes={sizes} onOpen={onOpen} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
}
