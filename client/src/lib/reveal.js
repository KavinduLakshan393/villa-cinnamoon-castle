import { gsap, ScrollTrigger, SplitText, useGSAP, EASE, withMotion } from './motion.js';

const LINE_CLASS = 'rv-line';

// Every effect below runs through withMotion(): it is built only while motion is
// allowed and is reverted the moment the visitor turns reduced motion on, even
// mid-visit. Without motion the CSS pre-hide rules are off (html.has-motion), so
// text and images simply show.

/**
 * Primary heading reveal — masked, line-by-line upward movement
 * (Sample components/Text reveal animation/text-reveal.html).
 * Lines stay hidden until the element scrolls into view, or until `when`
 * resolves for above-the-fold text.
 */
export function useLineReveal(ref, { start = 'top 86%', delay = 0, stagger = 0.09, duration = 1.15, when } = {}) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return undefined;

      return withMotion(() => {
        let played = false;
        const split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: LINE_CLASS,
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: 'visible' });
            if (played) return undefined;

            const tween = gsap.fromTo(
              self.lines,
              { yPercent: 118 },
              {
                yPercent: 0,
                duration,
                stagger,
                delay,
                ease: EASE.reveal,
                paused: Boolean(when),
                onComplete: () => {
                  played = true;
                },
                scrollTrigger: when ? undefined : { trigger: el, start, once: true },
              },
            );
            if (when) when.then(() => tween.play());
            return tween;
          },
        });

        return () => split.revert();
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
        ScrollTrigger.batch(targets, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: EASE.out,
              stagger: 0.12,
              overwrite: true,
            }),
        });
      });
    },
    { scope },
  );
}

/**
 * Secondary reveal — words brighten in sequence as the visitor scrolls
 * (Sample components/Text reveal animation/text_reveal 2.html). Scrubbed directly
 * against native scroll; the page is never pinned or slowed down.
 */
export function useWordScrub(ref, { start = 'top 82%', end = 'bottom 45%', dim = 0.16 } = {}) {
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
          scrollTrigger: { trigger: el, start, end, scrub: true },
        });

        return () => split.revert();
      });
    },
    { scope: ref },
  );
}

/**
 * Gentle parallax: the image drifts inside its fixed-size frame. The image is
 * pre-sized to 112% of the frame (see .frame__media) so a ±5% drift never reveals an edge; only transform is animated.
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
