import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Scroll-linked tweens are scrubbed directly against native scroll: no smoothing
// layer, no scroll hijacking and no artificial slow-down.
ScrollTrigger.config({ ignoreMobileResize: true });

export const EASE = {
  out: 'power3.out',
  reveal: 'power4.out',
  inOut: 'power3.inOut',
  lift: 'expo.inOut',
};

export const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(reducedMotionQuery).matches;
}

// Keeps the html.has-motion flag in sync if the visitor changes the OS setting mid-visit.
if (typeof window !== 'undefined') {
  window.matchMedia(reducedMotionQuery).addEventListener('change', (event) => {
    document.documentElement.classList.toggle('has-motion', !event.matches);
    ScrollTrigger.refresh();
  });
}

/* ---------- Intro lifecycle ----------
   The intro only plays on a full page load of Home. Other components wait on
   `introLifted` so the Hero reveals as the intro lifts away. */

let liftResolve;
const introLiftedPromise = new Promise((resolve) => {
  liftResolve = resolve;
});

export const introState = {
  active: typeof document !== 'undefined' && document.documentElement.classList.contains('is-intro'),
};

export function markIntroLifting() {
  introState.active = false;
  liftResolve();
}

export function whenIntroLifts() {
  return introState.active ? introLiftedPromise : Promise.resolve();
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
