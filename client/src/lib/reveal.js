import { gsap, SplitText, useGSAP, EASE, withMotion } from './motion.js';

const LINE_CLASS = 'rv-line';

// Every effect below runs through withMotion(): it is built only while motion is
// allowed and is reverted the moment the visitor turns reduced motion on, even
// mid-visit. Without motion the CSS pre-hide rules are off (html.has-motion), so
// text and images simply show.

/**
 * Calls `onEnter(elements)` once for each element when it really scrolls into
 * view. An IntersectionObserver reads the live layout, so a reveal can never
 * fire early because content above it loaded late and moved it (stored scroll
 * positions can go stale; this cannot). `start` is a ScrollTrigger-style
 * "top N%": the element's top must pass N % of the viewport height.
 * Elements already scrolled past when observed are handed to `onPassed`.
 */
function observeEntry(elements, { start = 'top 86%', onEnter, onPassed }) {
  const percent = Number(/(\d+(?:\.\d+)?)%/.exec(start)?.[1] ?? 86);
  const observer = new IntersectionObserver(
    (entries) => {
      const entered = [];
      const passed = [];
      entries.forEach((entry) => {
        if (entry.isIntersecting) entered.push(entry.target);
        else if (entry.boundingClientRect.bottom < 0) passed.push(entry.target);
        else return;
        observer.unobserve(entry.target);
      });
      if (passed.length) onPassed(passed);
      if (entered.length) onEnter(entered);
    },
    { rootMargin: `0px 0px -${Math.max(0, 100 - percent)}% 0px`, threshold: 0 },
  );
  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

/**
 * Splits `el` into masked lines whose text rises into place. Returns
 *  - `play(extra)`: start the reveal (`extra` seconds later than its own delay),
 *  - `finish()`: show it complete (for text already scrolled past),
 *  - `revert()`: undo the split.
 * Lines are re-measured when the width changes (autoSplit), so a resize
 * mid-reveal carries on from where it was.
 */
function createLines(el, { delay = 0, stagger, duration }) {
  let played = false;
  let wanted = false;
  let extra = 0;
  let tween = null;
  const split = SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: LINE_CLASS,
    autoSplit: true,
    onSplit(self) {
      gsap.set(el, { visibility: 'visible', opacity: 1, y: 0 });
      if (played) return undefined;

      // Hidden below its mask until the text enters view (or `when` resolves).
      const progress = tween?.progress() ?? 0;
      tween = gsap.fromTo(
        self.lines,
        { yPercent: 118 },
        {
          yPercent: 0,
          duration,
          stagger,
          delay: delay + extra,
          ease: EASE.steady,
          paused: true,
          onComplete: () => {
            played = true;
          },
        },
      );
      if (progress > 0) tween.progress(progress).play(); // re-split mid-reveal (resize)
      else if (wanted) tween.play();
      return tween;
    },
  });
  return {
    play(later = 0) {
      wanted = true;
      extra = later;
      tween?.delay(delay + later).play();
    },
    finish() {
      wanted = true;
      tween?.progress(1);
    },
    revert: () => split.revert(),
  };
}

/**
 * Primary heading reveal — masked, line-by-line upward movement
 * (Sample components/Text reveal animation/text-reveal.html).
 * Lines stay hidden until the element scrolls into view, or until `when`
 * resolves for above-the-fold text.
 */
export function useLineReveal(ref, { start = 'top 84%', delay = 0, stagger = 0.11, duration = 1.15, when } = {}) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return undefined;

      return withMotion(() => {
        const lines = createLines(el, { delay, stagger, duration });

        let stop;
        if (when) when.then(() => lines.play());
        else {
          stop = observeEntry([el], {
            start,
            onEnter: () => lines.play(),
            onPassed: () => lines.finish(),
          });
        }

        return () => {
          stop?.();
          lines.revert();
        };
      });
    },
    { scope: ref },
  );
}

// Elements the reveal never splits: controls, media and anything already animated on its own.
const NOT_TEXT = 'a, button, .btn, svg, img, picture, video, canvas, iframe, figure, [data-reveal="lines"]';
const BLOCK_DISPLAY = /^(block|list-item|flow-root|table-cell)$/;

/**
 * Elements inside `root` that hold their own lines of text: block-level, with only inline content.
 * Loose text sitting beside other elements in a flex or grid box (e.g. "01" and "Five bedrooms")
 * is wrapped in a span so it becomes a block of its own; `undo()` unwraps it.
 */
function textBlocks(root) {
  const blocks = [];
  const wrapped = [];
  const undo = () => {
    wrapped.forEach((span) => {
      if (!span.parentNode) return;
      span.replaceWith(...span.childNodes);
    });
  };
  const hasText = (el) => (el.textContent ?? '').trim() !== '';
  const onlyInline = (el) =>
    [...el.querySelectorAll('*')].every((child) => getComputedStyle(child).display.startsWith('inline') || child.matches('br, wbr'));
  const walk = (el) => {
    if (el.matches(NOT_TEXT) || !hasText(el)) return;
    if (BLOCK_DISPLAY.test(getComputedStyle(el).display) && onlyInline(el)) {
      const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      // A block with no text of its own and no inline children holds nothing to split.
      if (direct || el.children.length) {
        blocks.push(el);
        return;
      }
    }
    [...el.childNodes].forEach((node) => {
      if (node.nodeType === 3 && node.textContent.trim() && el.children.length) {
        const span = document.createElement('span');
        node.replaceWith(span);
        span.append(node);
        wrapped.push(span);
        blocks.push(span);
      }
    });
    [...el.children].forEach((child) => {
      if (!wrapped.includes(child)) walk(child);
    });
  };
  if (root.matches(NOT_TEXT)) return { blocks, undo };
  walk(root);
  return { blocks, undo };
}

/**
 * Reveal for supporting copy, lists, boxes and image frames. Every
 * `[data-reveal="fade"]` inside `scope` is revealed as it enters view:
 *  - text (a paragraph, or the text inside a box or list) rises line by line,
 *    never as one block; a box or card fades in behind its lines;
 *  - anything without text (photographs, buttons, the map) fades up.
 * Elements that enter together follow one another.
 */
export function useFadeReveals(scope) {
  useGSAP(
    () => {
      const targets = gsap.utils.toArray('[data-reveal="fade"]', scope.current);
      if (!targets.length) return undefined;

      return withMotion(() => {
        const plans = new Map();
        targets.forEach((el) => {
          const { blocks, undo } = textBlocks(el);
          const own = blocks.length === 1 && blocks[0] === el; // the element is the text itself
          const units = blocks.map((block, i) =>
            createLines(block, { delay: own ? 0 : i * 0.09, stagger: 0.085, duration: 1 }),
          );
          plans.set(el, { units, undo, own, hasText: units.length > 0 });
        });

        const stop = observeEntry(targets, {
          start: 'top 88%',
          onEnter: (batch) =>
            batch.forEach((el, order) => {
              const { units, own, hasText } = plans.get(el);
              const later = order * 0.1;
              units.forEach((unit) => unit.play(later));
              // Text stands on its own; a box or a picture fades up around what it holds.
              if (!own) gsap.to(el, { opacity: 1, y: 0, duration: hasText ? 0.9 : 1.1, delay: later, ease: EASE.steady, overwrite: true });
            }),
          onPassed: (batch) =>
            batch.forEach((el) => {
              const { units } = plans.get(el);
              units.forEach((unit) => unit.finish());
              gsap.set(el, { opacity: 1, y: 0 });
            }),
        });

        return () => {
          stop();
          plans.forEach(({ units, undo }) => {
            units.forEach((unit) => unit.revert());
            undo();
          });
        };
      });
    },
    { scope },
  );
}

/**
 * Secondary reveal — words brighten in sequence as the visitor scrolls
 * (Sample components/Text reveal animation/text_reveal 2.html). Scrubbed directly
 * against native scroll; the page is never pinned or slowed down. `start`/`end`
 * refer to the text itself, or to its closest ancestor matching `within` (a
 * selector, e.g. a whole section).
 */
export function useWordScrub(ref, { start = 'top 82%', end = 'bottom 45%', dim = 0.16, within } = {}) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return undefined;

      return withMotion(() => {
        const split = SplitText.create(el, { type: 'words', wordsClass: 'scrub-word' });
        gsap.set(split.words, { opacity: dim });
        gsap.to(split.words, {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: (within && el.closest(within)) || el, start, end, scrub: true },
        });

        return () => split.revert();
      });
    },
    { scope: ref },
  );
}

/**
 * Gentle parallax: a wrapper translates the image inside its fixed-size frame.
 * The image is pre-sized to 112% (see .frame__media), while its own transform
 * remains available for the interactive hover zoom.
 */
export function useParallax(frameRef, { amount = 5, enabled = true } = {}) {
  useGSAP(
    () => {
      const frame = frameRef.current;
      const media = frame?.querySelector('[data-parallax]');
      if (!enabled || !media) return undefined;

      return withMotion(() => {
        gsap.fromTo(
          media,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    },
    { scope: frameRef },
  );
}
