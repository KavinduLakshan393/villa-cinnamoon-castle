import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ResponsiveImage from '../../components/ResponsiveImage.jsx';
import './GalleryViewer.css';

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/**
 * Accessible full-screen viewer: arrow keys, Escape, swipe, focus trap,
 * scroll lock and focus return to the element that opened it.
 */
export default function GalleryViewer({ items, startIndex, onClose, returnFocusTo }) {
  const [index, setIndex] = useState(startIndex);
  const dialogRef = useRef(null);
  const railRef = useRef(null);
  const swipeStart = useRef(null);
  const item = items[index];

  const go = useCallback((delta) => setIndex((i) => (i + delta + items.length) % items.length), [items.length]);

  // Scroll lock, inert background, initial focus and focus return.
  useEffect(() => {
    const root = document.documentElement;
    const background = document.querySelectorAll('.page, .site-header');
    root.classList.add('viewer-open');
    background.forEach((el) => el.setAttribute('inert', ''));
    dialogRef.current.querySelector('.viewer__close')?.focus({ preventScroll: true });
    return () => {
      root.classList.remove('viewer-open');
      background.forEach((el) => el.removeAttribute('inert'));
      returnFocusTo?.focus({ preventScroll: true });
    };
  }, [returnFocusTo]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') go(1);
      else if (event.key === 'ArrowLeft') go(-1);
      else if (event.key === 'Tab') {
        const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    railRef.current
      ?.querySelector('[aria-current="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [index]);

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse') swipeStart.current = event.clientX;
  };
  const onPointerUp = (event) => {
    if (swipeStart.current === null) return;
    const delta = event.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
  };

  return createPortal(
    <div className="viewer" role="dialog" aria-modal="true" aria-label="Gallery viewer" ref={dialogRef}>
      <div className="viewer__bar">
        <p className="viewer__chapter">{item.chapterTitle}</p>
        <p className="viewer__count" aria-live="polite">
          {index + 1} of {items.length}
        </p>
        <button type="button" className="viewer__close" onClick={onClose}>
          Close
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
      </div>

      <div className="viewer__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <button type="button" className="viewer__nav viewer__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 5 8 12 15 19" />
          </svg>
        </button>
        <figure className="viewer__figure" key={item.name}>
          <ResponsiveImage name={item.name} alt={item.alt} sizes="100vw" className="viewer__image" />
          <figcaption className="viewer__caption">{item.caption}</figcaption>
        </figure>
        <button type="button" className="viewer__nav viewer__nav--next" onClick={() => go(1)} aria-label="Next image">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="9 5 16 12 9 19" />
          </svg>
        </button>
      </div>

      <ul className="viewer__rail" ref={railRef} aria-label="All images">
        {items.map((entry, i) => (
          <li key={entry.name}>
            <button
              type="button"
              className="viewer__thumb"
              aria-current={i === index ? 'true' : undefined}
              aria-label={`Image ${i + 1}: ${entry.caption}`}
              onClick={() => setIndex(i)}
            >
              <ResponsiveImage name={entry.name} alt="" sizes="80px" />
            </button>
          </li>
        ))}
      </ul>
    </div>,
    document.body,
  );
}
