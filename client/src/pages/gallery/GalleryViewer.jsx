import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ResponsiveImage from '../../components/ResponsiveImage.jsx';
import { gsap, prefersReducedMotion } from '../../lib/motion.js';
import './GalleryViewer.css';

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

// A tile's box, if it is at least partly on screen.
const onScreen = (el) => {
  const box = el?.getBoundingClientRect();
  return box && box.width && box.bottom > 0 && box.top < window.innerHeight ? box : null;
};

// The part of a contain-fitted <img> box the photograph actually covers (known
// from its width/height attributes, so it is right even before the image loads).
const photoBox = (img) => {
  const box = img.getBoundingClientRect();
  const w = Number(img.getAttribute('width')) || box.width;
  const h = Number(img.getAttribute('height')) || box.height;
  const scale = Math.min(box.width / w, box.height / h);
  const width = w * scale;
  const height = h * scale;
  return { left: box.left + (box.width - width) / 2, top: box.top + (box.height - height) / 2, width, height };
};

/**
 * Flies a copy of `src` from one box to another above the page (the photo
 * growing out of its tile, or shrinking back into it). The copy always covers
 * its box, so the tile's crop turns smoothly into the full photograph.
 */
function flyPhoto(src, from, to, { duration, onComplete }) {
  const ghost = document.createElement('div');
  ghost.className = 'viewer-ghost';
  Object.assign(ghost.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` });
  const img = document.createElement('img');
  img.src = src;
  img.alt = '';
  ghost.appendChild(img);
  document.body.appendChild(ghost);
  const tween = gsap.to(ghost, {
    left: to.left,
    top: to.top,
    width: to.width,
    height: to.height,
    duration,
    ease: 'power4.inOut',
    onComplete: () => {
      ghost.remove();
      onComplete?.();
    },
  });
  return () => {
    tween.kill();
    ghost.remove();
  };
}

/**
 * Accessible full-screen viewer: arrow keys, Escape, swipe, focus trap,
 * scroll lock and focus return to the element that opened it. The photo opens
 * out of the tile that was selected and closes back into the tile of the photo
 * on screen (a fade when that tile is off screen, or with reduced motion).
 */
export default function GalleryViewer({ items, startIndex, onClose, returnFocusTo }) {
  const [index, setIndex] = useState(startIndex);
  const dialogRef = useRef(null);
  const railRef = useRef(null);
  const swipeStart = useRef(null);
  const item = items[index];

  const go = useCallback((delta) => setIndex((i) => (i + delta + items.length) % items.length), [items.length]);
  const closing = useRef(false);

  // Opening: the selected tile's photo grows into place while the viewer fades in.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const tileImage = returnFocusTo?.querySelector('img');
    const from = onScreen(returnFocusTo);
    const target = dialog.querySelector('.viewer__image');
    if (prefersReducedMotion() || !tileImage || !from || !target) return undefined;
    dialog.classList.add('is-flying');
    tileImage.style.visibility = 'hidden';
    const restore = () => {
      dialog.classList.remove('is-flying');
      tileImage.style.visibility = '';
    };
    const cancel = flyPhoto(tileImage.currentSrc || tileImage.src, from, photoBox(target), {
      duration: 0.8,
      onComplete: restore,
    });
    return () => {
      cancel();
      restore();
    };
  }, [returnFocusTo]);

  // Closing: the photo on screen shrinks back into its tile, then the viewer unmounts.
  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const dialog = dialogRef.current;
    const photo = dialog.querySelector('.viewer__image');
    const tile = document.querySelector(`.page [data-photo="${item.name}"]`);
    const to = onScreen(tile);
    const tileImage = tile?.querySelector('img');
    if (prefersReducedMotion() || !photo || !to || !tileImage) {
      gsap.to(dialog, { opacity: 0, duration: 0.25, ease: 'power2.out', onComplete: onClose });
      return;
    }
    const from = photoBox(photo);
    photo.style.visibility = 'hidden';
    tileImage.style.visibility = 'hidden';
    gsap.to(dialog, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    flyPhoto(photo.currentSrc || photo.src, from, to, {
      duration: 0.7,
      onComplete: () => {
        tileImage.style.visibility = '';
        onClose();
      },
    });
  }, [item.name, onClose]);

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
      if (event.key === 'Escape') requestClose();
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
  }, [go, requestClose]);

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
        <button type="button" className="viewer__close" onClick={requestClose}>
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
