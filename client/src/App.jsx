import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Intro from './components/Intro.jsx';
import CursorLabel from './components/CursorLabel.jsx';
import MobileInquiryBar from './components/MobileInquiryBar.jsx';
import Home from './pages/Home.jsx';
import { gsap, ScrollTrigger, introState, prefersReducedMotion } from './lib/motion.js';
import { site } from './data/site.js';
import { recordNavigation } from './lib/navigation.js';
import { initSmoothScroll } from './lib/smoothScroll.js';
import { scrollToRouteLocation } from './lib/routeScroll.js';

// Only the Home page ships in the first download. Every other page is a separate
// file, fetched while the current page eases out (or in idle time, see App).
const pages = {
  '/stay-options': () => import('./pages/StayOptions.jsx'),
  '/gallery': () => import('./pages/Gallery.jsx'),
  '/inquiry': () => import('./pages/Inquiry.jsx'),
  '/privacy': () => import('./pages/Privacy.jsx'),
};
const loadAdmin = () => import('./admin/AdminApp.jsx');
const StayOptions = lazy(pages['/stay-options']);
const Gallery = lazy(pages['/gallery']);
const Inquiry = lazy(pages['/inquiry']);
const Privacy = lazy(pages['/privacy']);
const AdminApp = lazy(loadAdmin);
const Placeholder = lazy(() => import('./pages/Placeholder.jsx'));

/** Fetches the code for a route ahead of showing it. Never rejects. */
const preloadPage = (pathname) => {
  const load = pathname.startsWith('/admin') ? loadAdmin : pages[pathname];
  return load ? load().catch(() => {}) : Promise.resolve();
};

const titles = {
  '/': `${site.name} — Private villa near Hikkaduwa`,
  '/stay-options': `Stay Options — ${site.name}`,
  '/gallery': `Gallery — ${site.name}`,
  '/inquiry': `Send Inquiry — ${site.name}`,
  '/privacy': `Privacy — ${site.name}`,
  '/admin/login': `Admin Sign In — ${site.name}`,
  '/admin/inquiries': `Inquiries — ${site.name} Admin`,
  '/admin/packages': `Packages — ${site.name} Admin`,
};

/**
 * Restrained route transition: the current page eases out (~0.3 s), the new page
 * rises in (~0.6 s). Same-page hash changes simply scroll; no transition.
 */
function usePageTransition(pageRef) {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  // Tracks the path already on screen; survives StrictMode's double effect run,
  // so the initial load never plays an entrance transition.
  const renderedPath = useRef(shown.pathname);

  useEffect(() => {
    if (location.pathname === shown.pathname) {
      if (location !== shown) setShown(location);
      return;
    }
    // The next page's code downloads while this one eases out, so it is ready to show.
    let cancelled = false;
    const ready = preloadPage(location.pathname);
    const show = () => ready.then(() => !cancelled && setShown(location));
    const tween = gsap.to(pageRef.current, {
      opacity: 0,
      y: prefersReducedMotion() ? 0 : -10,
      duration: prefersReducedMotion() ? 0.12 : 0.3,
      ease: 'power2.in',
      onComplete: show,
    });
    // GSAP pauses in background tabs; never let navigation wait on the exit animation.
    const fallback = setTimeout(show, 700);
    return () => {
      cancelled = true;
      tween.kill();
      clearTimeout(fallback);
    };
  }, [location, shown, pageRef]);

  useLayoutEffect(() => {
    document.title = titles[shown.pathname] ?? site.name;
    if (renderedPath.current === shown.pathname) return;
    recordNavigation(renderedPath.current);
    renderedPath.current = shown.pathname;
    ScrollTrigger.refresh();

    const reduce = prefersReducedMotion();
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: reduce ? 0 : 14 },
      { opacity: 1, y: 0, duration: reduce ? 0.2 : 0.6, ease: 'power3.out', clearProps: 'transform' },
    );
    // Focus the new page for keyboard and screen-reader users.
    document.getElementById('main')?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown.pathname]);

  return shown;
}

/**
 * React Router keeps the current document alive between routes, so browsers do
 * not automatically reset its scroll position. Scroll after the destination DOM
 * commits, then repeat on the next frame after Lenis and layout measurements
 * have caught up. This also handles the initial hosted page load.
 */
function useRouteScroll(location) {
  useLayoutEffect(() => {
    let frame = 0;

    const settle = () => {
      scrollToRouteLocation(location.hash, { immediate: true });
      ScrollTrigger.refresh();
    };

    settle();
    frame = requestAnimationFrame(settle);

    return () => cancelAnimationFrame(frame);
  }, [location.key, location.pathname, location.hash]);
}

export default function App() {
  const pageRef = useRef(null);
  const shown = usePageTransition(pageRef);
  useRouteScroll(shown);
  const isAdmin = shown.pathname.startsWith('/admin');
  const [introVisible, setIntroVisible] = useState(introState.active);
  const hideIntro = useCallback(() => setIntroVisible(false), []);

  useEffect(() => {
    // Recalculate trigger positions once every late image and font has settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const stopSmoothScroll = initSmoothScroll();

    // Content that arrives late (API data, fonts, images) changes the page
    // height after the scroll-linked effects measured their positions. Measure
    // again whenever the height settles, so nothing plays early or late.
    let height = document.body.offsetHeight;
    let timer = 0;
    const observer = new ResizeObserver(() => {
      const next = document.body.offsetHeight;
      if (next === height) return;
      height = next;
      clearTimeout(timer);
      timer = setTimeout(refresh, 200);
    });
    observer.observe(document.body);

    // Once the first page has settled, fetch the other public pages in idle time
    // so moving between them is instant.
    const idle = window.requestIdleCallback ?? ((run) => setTimeout(run, 2500));
    const warm = () => idle(() => Object.keys(pages).forEach(preloadPage));
    if (document.readyState === 'complete') warm();
    else window.addEventListener('load', warm, { once: true });

    return () => {
      window.removeEventListener('load', warm);
      window.removeEventListener('load', refresh);
      observer.disconnect();
      clearTimeout(timer);
      stopSmoothScroll();
    };
  }, []);

  useEffect(() => {
    if (isAdmin) document.documentElement.classList.remove('is-intro', 'menu-open');
  }, [isAdmin]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {!isAdmin && <Navbar />}
      <div className="page" ref={pageRef}>
        <main id="main" tabIndex={-1}>
          <Suspense fallback={<div className="page-loading" aria-hidden="true" />}>
          <Routes location={shown}>
            <Route path="/" element={<Home />} />
            <Route path="/stay-options" element={<StayOptions />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/admin/*" element={<AdminApp />} />
            <Route
              path="*"
              element={
                <Placeholder
                  key="*"
                  eyebrow="Page not found"
                  title="This page does not exist."
                  note="The link may be out of date."
                />
              }
            />
          </Routes>
          </Suspense>
        </main>
        {!isAdmin && <Footer />}
      </div>
      {!isAdmin && introVisible && <Intro onDone={hideIntro} />}
      {!isAdmin && <CursorLabel />}
      {!isAdmin && <MobileInquiryBar />}
    </>
  );
}
