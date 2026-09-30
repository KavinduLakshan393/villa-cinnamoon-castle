import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '../../lib/media.js';
import { scrollToTarget } from '../../lib/smoothScroll.js';
import './GalleryChips.css';

const PHONE = '(max-width: 759px)';

/**
 * Phones only (DEC-034): the chapter names in a row that stays under the header
 * while the chapters scroll, standing in for the wheel of wider screens. The
 * chapter on screen is highlighted and kept in view; selecting a name scrolls to
 * that chapter. Nothing is rendered on wider screens.
 *
 * `chapters`: [{ key, title }]; `getSection(key)` returns the chapter element.
 */
export default function GalleryChips({ chapters, getSection }) {
  const phone = useMediaQuery(PHONE);
  const listRef = useRef(null);
  const [active, setActive] = useState(chapters[0]?.key);

  // The chapter crossing the upper part of the screen is the current one.
  useEffect(() => {
    if (!phone) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.dataset.chapter);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    chapters.forEach((chapter) => {
      const el = getSection(chapter.key);
      if (!el) return;
      el.dataset.chapter = chapter.key;
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [phone, chapters, getSection]);

  // Keep the current name in view within the row (never moves the page).
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector('[aria-current="true"]');
    if (!chip) return;
    const left = chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2;
    list.scrollTo({ left, behavior: 'smooth' });
  }, [active, phone]);

  if (!phone) return null;

  return (
    <nav className="chips" aria-label="Gallery sections">
      <ol className="chips__list" ref={listRef}>
        {chapters.map((chapter) => (
          <li key={chapter.key}>
            <button
              type="button"
              className="chips__chip"
              aria-current={chapter.key === active ? 'true' : undefined}
              onClick={() => {
                const el = getSection(chapter.key);
                if (el) scrollToTarget(el);
              }}
            >
              {chapter.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
