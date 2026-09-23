import { useMemo, useRef, useState } from 'react';
import ResponsiveImage from '../../components/ResponsiveImage.jsx';
import Button from '../../components/Button.jsx';
import { categories, galleryItems } from '../../data/gallery.js';
import manifest from '../../data/media-manifest.json';
import { gsap, prefersReducedMotion, useGSAP } from '../../lib/motion.js';
import './GalleryGrid.css';

const INITIAL_COUNT = 15;
const COLUMNS = 3;

/**
 * Editorial grid: landscape photographs span two of three columns when they fit
 * in the current row; otherwise they take one column with a portrait crop.
 * Order is never changed, so DOM, keyboard and visual order stay identical.
 */
function withSpans(list) {
  let free = COLUMNS;
  return list.map((item) => {
    const { width, height } = manifest[item.name];
    if (free === 0) free = COLUMNS;
    const wide = width > height && free >= 2;
    free -= wide ? 2 : 1;
    return { ...item, wide };
  });
}

export default function GalleryGrid({ onOpen }) {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef(null);

  const filtered = useMemo(
    () => (filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  );
  const limited = filter === 'all' && !expanded && filtered.length > INITIAL_COUNT;
  const visible = withSpans(limited ? filtered.slice(0, INITIAL_COUNT) : filtered);

  // Restrained entrance when the filter changes; never on the first render.
  // Comparing against the last animated filter also survives StrictMode's double run.
  const animatedFilter = useRef(filter);
  useGSAP(
    () => {
      if (animatedFilter.current === filter) return;
      animatedFilter.current = filter;
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'power3.out', clearProps: 'transform,opacity' },
      );
    },
    { dependencies: [filter], scope: listRef },
  );

  const showMore = () => {
    setExpanded(true);
    // Move focus to the first newly shown image.
    requestAnimationFrame(() => listRef.current.children[INITIAL_COUNT]?.querySelector('button')?.focus());
  };

  return (
    <div className="gallery-grid">
      <div className="filters" role="group" aria-label="Filter images">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            className="filters__button"
            aria-pressed={filter === category.key}
            onClick={() => setFilter(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {filtered.length} images
      </p>

      <ul className="tiles" ref={listRef}>
        {visible.map((item) => (
          <li key={item.name} className={`tile${item.wide ? ' tile--wide' : ''}`}>
            <button
              type="button"
              className="tile__button"
              onClick={(event) =>
                onOpen(
                  filtered,
                  filtered.findIndex((entry) => entry.name === item.name),
                  event.currentTarget,
                )
              }
              aria-label={`${item.caption}. Open in the gallery viewer`}
            >
              <ResponsiveImage
                name={item.name}
                alt={item.alt}
                className="tile__media"
                sizes={item.wide ? '(min-width: 900px) 64vw, 50vw' : '(min-width: 900px) 32vw, 50vw'}
              />
              <span className="tile__caption" aria-hidden="true">
                {item.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {limited && (
        <div className="gallery-grid__more">
          <Button variant="swipe" tone="dark" onClick={showMore}>
            Show {filtered.length - INITIAL_COUNT} more photos
          </Button>
        </div>
      )}
    </div>
  );
}
