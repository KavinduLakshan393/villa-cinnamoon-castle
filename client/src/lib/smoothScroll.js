import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, prefersReducedMotion, reducedMotionQuery } from './motion.js';

/**
 * Restrained smooth scrolling (Lenis) for mouse wheels and trackpads: the page
 * glides to a stop instead of jumping by the browser's wheel step. Touch keeps
 * the device's native scrolling. Turned off (native scroll) when the visitor
 * asks for reduced motion, and paused while the intro, the mobile menu or the
 * photo viewer holds the page still.
 */

const LOCK_CLASSES = ['is-intro', 'menu-open', 'viewer-open'];
let lenis = null;
let locked = null;

function syncLock() {
  if (!lenis) return;
  const next = LOCK_CLASSES.some((name) => document.documentElement.classList.contains(name));
  if (next === locked) return;
  locked = next;
  if (next) lenis.stop();
  else lenis.start();
}

function create() {
  lenis = new Lenis({
    lerp: 0.085, // lower = softer glide
    wheelMultiplier: 0.9,
    allowNestedScroll: true, // review rows, gallery strip and viewer rail keep their own scrolling
    stopInertiaOnNavigate: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  locked = null;
  syncLock();
}

function destroy() {
  lenis?.destroy();
  lenis = null;
}

const raf = (time) => lenis?.raf(time * 1000);

/** Starts smooth scrolling for the app; returns a cleanup function. */
export function initSmoothScroll() {
  const mq = window.matchMedia(reducedMotionQuery);
  const apply = () => {
    if (mq.matches) destroy();
    else if (!lenis) create();
    ScrollTrigger.refresh();
  };
  apply();
  mq.addEventListener('change', apply);

  // One clock for Lenis and GSAP, so scroll-linked tweens never lag the scroll.
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const observer = new MutationObserver(syncLock);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  return () => {
    mq.removeEventListener('change', apply);
    gsap.ticker.remove(raf);
    observer.disconnect();
    destroy();
  };
}

/**
 * Scrolls the page to `target` (a y position or an element). Goes through
 * Lenis when it is running, so programmatic and wheel scrolling never fight.
 * Elements land below the fixed header using their CSS `scroll-margin-top`.
 */
export function scrollToTarget(target, { immediate = false } = {}) {
  const instant = immediate || prefersReducedMotion();
  const offset = target instanceof Element ? -parseFloat(getComputedStyle(target).scrollMarginTop || 0) : 0;
  if (lenis) {
    lenis.scrollTo(target, { immediate: instant, offset, force: true });
    return;
  }
  if (target instanceof Element) target.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'start' });
  else window.scrollTo({ top: target, behavior: instant ? 'auto' : 'smooth' });
}
