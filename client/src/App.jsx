import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Intro from './components/Intro.jsx';
import { scrollToSection } from './components/SmartLink.jsx';
import Home from './pages/Home.jsx';
import StayOptions from './pages/StayOptions.jsx';
import Gallery from './pages/Gallery.jsx';
import Inquiry from './pages/Inquiry.jsx';
import Privacy from './pages/Privacy.jsx';
import Placeholder from './pages/Placeholder.jsx';
import { gsap, ScrollTrigger, introState, prefersReducedMotion } from './lib/motion.js';
import { site } from './data/site.js';
import { recordNavigation } from './lib/navigation.js';

const titles = {
  '/': `${site.name} — Private villa near Hikkaduwa`,
  '/stay-options': `Stay Options — ${site.name}`,
  '/gallery': `Gallery — ${site.name}`,
  '/inquiry': `Send Inquiry — ${site.name}`,
  '/privacy': `Privacy — ${site.name}`,
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
    const tween = gsap.to(pageRef.current, {
      opacity: 0,
      y: prefersReducedMotion() ? 0 : -10,
      duration: prefersReducedMotion() ? 0.12 : 0.3,
      ease: 'power2.in',
      onComplete: () => setShown(location),
    });
    // GSAP pauses in background tabs; never let navigation wait on the exit animation.
    const fallback = setTimeout(() => setShown(location), 700);
    return () => {
      tween.kill();
      clearTimeout(fallback);
    };
  }, [location, shown, pageRef]);

  useLayoutEffect(() => {
    document.title = titles[shown.pathname] ?? site.name;
    if (renderedPath.current === shown.pathname) return;
    recordNavigation(renderedPath.current);
    renderedPath.current = shown.pathname;
    const hash = shown.hash.slice(1);
    if (hash) scrollToSection(hash, { instant: true });
    else window.scrollTo(0, 0);
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

export default function App() {
  const pageRef = useRef(null);
  const shown = usePageTransition(pageRef);
  const [introVisible, setIntroVisible] = useState(introState.active);
  const hideIntro = useCallback(() => setIntroVisible(false), []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    // Recalculate trigger positions once every late image and font has settled.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <div className="page" ref={pageRef}>
        <main id="main" tabIndex={-1}>
          <Routes location={shown}>
            <Route path="/" element={<Home />} />
            <Route path="/stay-options" element={<StayOptions />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/privacy" element={<Privacy />} />
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
        </main>
        <Footer />
      </div>
      {introVisible && <Intro onDone={hideIntro} />}
    </>
  );
}
