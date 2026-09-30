import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ResponsiveImage from '../../components/ResponsiveImage.jsx';
import { gsap, prefersReducedMotion } from '../../lib/motion.js';
import { useMediaQuery } from '../../lib/media.js';
import './GalleryViewer.css';

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';
// Phones, tablets and touch screens get the card stack; arrows are for pointer devices.
const COMPACT = '(hover: none), (max-width: 899px)';
const HINT_KEY = 'vcc-viewer-swipe-hint';

// Card-stack feel: how far the back card is set back, and when a swipe commits.
const BACK_SCALE = 0.94;
const COMMIT_DISTANCE = 0.22; // share of the screen width
const COMMIT_VELOCITY = 0.5; // px per ms
const MAX_TILT = 7; // degrees at a full-width drag

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

const pad = (n) => String(n).padStart(2, '0');

/**
 * Full-screen photo viewer shared by the Home and Gallery photographs: only the
 * photograph, a counter and Close are on screen.
 *
 * - Touch: a card stack. The photo follows the finger with a slight tilt while
 *   the next (or previous) photo waits behind it and grows into place; a short
 *   swipe springs back, a long or fast one sends the card off screen.
 * - Pointer devices: subtle Previous/Next buttons and the arrow keys.
 * - The photo opens out of the tile that was selected and closes back into the
 *   tile of the photo on screen (a fade when that tile is off screen).
 * - Reduced motion: photos change without movement and the viewer fades.
 *
 * Only the current photo and its two neighbours are in the DOM, so the
 * neighbours are already loaded when they are needed. Focus is trapped, the page
 * behind is inert, and focus returns to the opener.
 */
export default function GalleryViewer({ items, startIndex, onClose, returnFocusTo }) {
  const [index, setIndex] = useState(startIndex);
  const compact = useMediaQuery(COMPACT);
  const dialogRef = useRef(null);
  const stageRef = useRef(null);
  const drag = useRef(null);
  const busy = useRef(false);
  const closing = useRef(false);
  const count = items.length;
  const item = items[index];

  const at = useCallback((delta) => (index + delta + count) % count, [index, count]);
  // Neighbours by slot. With two photos the single neighbour serves both directions.
  const slots = [{ slot: 'current', i: index }];
  if (count > 1) slots.push({ slot: 'next', i: at(1) });
  if (count > 2) slots.push({ slot: 'prev', i: at(-1) });

  const card = (slot) => stageRef.current?.querySelector(`[data-slot="${slot}"]`);
  const backFor = (dir) => card(dir > 0 || count === 2 ? 'next' : 'prev');

  // After a photo change the cards are re-slotted; drop every inline transform.
  useLayoutEffect(() => {
    const cards = stageRef.current.querySelectorAll('.viewer__card');
    gsap.killTweensOf(cards);
    gsap.set(cards, { clearProps: 'transform,opacity,visibility' });
    stageRef.current.classList.remove('is-dragging');
    busy.current = false;
  }, [index]);

  /** Moves to the next (1) or previous (-1) photo, from wherever the front card is. */
  const advance = useCallback(
    (dir) => {
      if (count < 2 || busy.current) return;
      const front = card('current');
      const back = backFor(dir);
      const target = at(dir);
      if (prefersReducedMotion() || !front || !back) {
        setIndex(target);
        return;
      }
      busy.current = true;
      const width = window.innerWidth;
      gsap.set(back, { visibility: 'visible' });
      gsap.to(back, { scale: 1, opacity: 1, duration: 0.42, ease: 'power3.out' });
      gsap.to(front, {
        x: -dir * width * 1.15,
        rotation: compact ? -dir * MAX_TILT : 0,
        opacity: compact ? 1 : 0,
        duration: compact ? 0.42 : 0.36,
        ease: 'power3.in',
        onComplete: () => setIndex(target),
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [at, compact, count],
  );

  // ---------- Card-stack drag (touch and pen) ----------
  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' || count < 2 || busy.current) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp, dx: 0, active: false };
  };

  const onPointerMove = (event) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.active) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        drag.current = null; // a vertical gesture is not a swipe
        return;
      }
      state.active = true;
      stageRef.current.setPointerCapture?.(event.pointerId);
      stageRef.current.classList.add('is-dragging');
      dialogRef.current.classList.add('has-swiped');
    }
    state.dx = dx;
    const width = window.innerWidth;
    const progress = Math.min(1, Math.abs(dx) / (width * 0.6));
    const reduce = prefersReducedMotion();
    gsap.set(card('current'), { x: dx, rotation: reduce ? 0 : (dx / width) * MAX_TILT });
    const dir = dx < 0 ? 1 : -1;
    const back = backFor(dir);
    // Only the card the swipe is heading for shows behind the front card.
    stageRef.current.querySelectorAll('.viewer__card:not([data-slot="current"])').forEach((el) => {
      if (el === back) gsap.set(el, { visibility: 'visible', opacity: 0.35 + 0.65 * progress, scale: BACK_SCALE + (1 - BACK_SCALE) * progress });
      else gsap.set(el, { visibility: 'hidden' });
    });
  };

  const onPointerEnd = (event) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    drag.current = null;
    if (!state.active) return;
    const velocity = state.dx / Math.max(1, event.timeStamp - state.time);
    const far = Math.abs(state.dx) > window.innerWidth * COMMIT_DISTANCE;
    const fast = Math.abs(velocity) > COMMIT_VELOCITY && Math.abs(state.dx) > 24;
    if (event.type !== 'pointercancel' && (far || fast)) {
      advance(state.dx < 0 ? 1 : -1);
      return;
    }
    // Not far enough: the card springs back to the centre.
    stageRef.current.classList.remove('is-dragging');
    gsap.to(card('current'), { x: 0, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.8)' });
    gsap.to(stageRef.current.querySelectorAll('.viewer__card:not([data-slot="current"])'), {
      scale: BACK_SCALE,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      clearProps: 'visibility',
    });
  };

  // Opening: the selected tile's photo grows into place while the viewer fades in.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const tileImage = returnFocusTo?.querySelector('img');
    const from = onScreen(returnFocusTo);
    const target = dialog.querySelector('[data-slot="current"] .viewer__image');
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
    const photo = dialog.querySelector('[data-slot="current"] .viewer__image');
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
      else if (event.key === 'ArrowRight') advance(1);
      else if (event.key === 'ArrowLeft') advance(-1);
      else if (event.key === 'Tab') {
        // Only controls that are on screen (the arrows are hidden on touch layouts).
        const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter((node) => node.offsetParent !== null);
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
  }, [advance, requestClose]);

  // "Swipe to explore": once per visit, on touch layouts with more than one photo.
  const [hint, setHint] = useState(false);
  useEffect(() => {
    if (!compact || count < 2) return undefined;
    try {
      if (sessionStorage.getItem(HINT_KEY)) return undefined;
      sessionStorage.setItem(HINT_KEY, '1');
    } catch {
      // Storage can be unavailable (private mode): show the hint anyway.
    }
    setHint(true);
    const timer = setTimeout(() => setHint(false), 3200);
    return () => clearTimeout(timer);
  }, [compact, count]);

  return createPortal(
    <div className="viewer" role="dialog" aria-modal="true" aria-label="Photo viewer" ref={dialogRef}>
      <div
        className="viewer__stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {slots.map(({ slot, i }) => (
          <figure className="viewer__card" data-slot={slot} key={items[i].name} aria-hidden={slot === 'current' ? undefined : 'true'}>
            <ResponsiveImage
              name={items[i].name}
              alt={slot === 'current' ? items[i].alt : ''}
              sizes="100vw"
              className="viewer__image"
              priority={slot === 'current'}
              loading="eager"
              draggable={false}
            />
          </figure>
        ))}
      </div>

      <p className="viewer__count" aria-hidden="true">
        {pad(index + 1)} <span>/</span> {pad(count)}
      </p>
      <button type="button" className="viewer__close" onClick={requestClose} aria-label="Close photo viewer">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" />
        </svg>
      </button>

      {count > 1 && (
        <>
          <button type="button" className="viewer__nav viewer__nav--prev" onClick={() => advance(-1)} aria-label="Previous photo">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="15 5 8 12 15 19" />
            </svg>
          </button>
          <button type="button" className="viewer__nav viewer__nav--next" onClick={() => advance(1)} aria-label="Next photo">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="9 5 16 12 9 19" />
            </svg>
          </button>
        </>
      )}

      {hint && (
        <p className="viewer__hint" aria-hidden="true">
          Swipe to explore
        </p>
      )}

      {/* The caption is not shown, but each photo change is announced with it. */}
      <p className="sr-only" aria-live="polite">
        Photo {index + 1} of {count}
        {item.chapterTitle ? `, ${item.chapterTitle}` : ''}: {item.caption ?? item.alt}
      </p>
    </div>,
    document.body,
  );
}
