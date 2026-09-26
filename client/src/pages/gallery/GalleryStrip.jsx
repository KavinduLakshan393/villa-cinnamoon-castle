import { useRef } from 'react';
import ResponsiveImage from '../../components/ResponsiveImage.jsx';
import { chapters } from '../../data/gallery.js';
import { gsap, EASE, useGSAP, withMotion } from '../../lib/motion.js';
import './GalleryStrip.css';

/**
 * Featured strip — expanding image accordion (reference: Gallery strip.mp4).
 * Desktop with hover: six equal panels; the hovered or focused panel widens while
 * the others compress, and all return to equal widths when the pointer leaves.
 * The photograph is sized to the expanded width, so widening reveals more of the
 * scene rather than zooming it. Touch and narrow screens get native scroll-snap.
 */
export default function GalleryStrip({ onOpen }) {
  const rootRef = useRef(null);

  useGSAP(
    () =>
      withMotion(() => {
        const cards = gsap.utils.toArray('.strip__card', rootRef.current);
        gsap.fromTo(
          cards,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            stagger: 0.08,
            ease: EASE.reveal,
            // Keep the final inline value: clearing it would let the CSS pre-reveal
            // rule (clip-path: inset(100%)) hide the cards again.
            scrollTrigger: { trigger: rootRef.current, start: 'top 88%', once: true },
          },
        );
      }),
    { scope: rootRef },
  );

  return (
    <div className="strip" ref={rootRef}>
      <ul className="strip__list" aria-label="Selected views">
        {chapters.map((chapter) => (
          <li key={chapter.key} className="strip__item">
            <button
              type="button"
              className="strip__card"
              onClick={(event) => onOpen(chapter.key, event.currentTarget)}
              aria-label={`${chapter.title}: ${chapter.label}. Open in the gallery viewer`}
            >
              <ResponsiveImage
                name={chapter.lead}
                alt=""
                className="strip__media"
                sizes="(min-width: 1000px) 48vw, 80vw"
              />
              <span className="strip__shade" aria-hidden="true" />
              <span className="strip__meta" aria-hidden="true">
                <span className="strip__index">{chapter.index}</span>
                <span className="strip__title">{chapter.title}</span>
                <span className="strip__label">{chapter.label}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
