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
 * Primary heading reveal — masked, line-by-line upward movement
 * (Sample components/Text reveal animation/text-reveal.html).
 * Lines stay hidden until the element scrolls into view, or until `when`
 * resolves for above-the-fold text.
 */
export function useLineReveal(ref, { start = 'top 84%', delay = 0, stagger = 0.16, duration = 1.6, when } = {}) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return undefined;

      return withMotion(() => {
        let played = false;
        let tween = null;
        const split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: LINE_CLASS,
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: 'visible' });
            if (played) return undefined;

            // Hidden below its mask until the heading enters view (or `when` resolves).
            const progress = tween?.progress() ?? 0;
            tween = gsap.fromTo(
              self.lines,
              { yPercent: 118 },
              {
                yPercent: 0,
                duration,
                stagger,
                delay,
                ease: EASE.steady,
                paused: true,
                onComplete: () => {
                  played = true;
                },
              },
            );
            if (progress > 0) tween.progress(progress).play(); // re-split mid-reveal (resize)
            return tween;
          },
        });

        let stop;
        if (when) when.then(() => tween?.play());
        else {
          stop = observeEntry([el], {
            start,
            onEnter: () => tween?.play(),
            onPassed: () => tween?.progress(1),
          });
        }

        return () => {
          stop?.();
          split.revert();
        };
      });
    },
    { scope: ref },
  );
}

/**
 * Restrained fade-up for supporting copy, captions and image frames.
 * Every `[data-reveal="fade"]` inside `scope` is revealed as it enters view.
 */
export function useFadeReveals(scope) {
  useGSAP(
    () => {
      const targets = gsap.utils.toArray('[data-reveal="fade"]', scope.current);
      if (!targets.length) return undefined;

      return withMotion(() => {
        // Elements that enter together rise together, one after another.
        return observeEntry(targets, {
          start: 'top 88%',
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1.5, ease: EASE.steady, stagger: 0.14, overwrite: true }),
          onPassed: (batch) => gsap.set(batch, { opacity: 1, y: 0 }),
        });
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
