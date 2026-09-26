import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button.jsx';
import { inquiryPath } from '../../data/site.js';
import { gsap, EASE, introState, prefersReducedMotion, whenIntroLifts, useGSAP } from '../../lib/motion.js';
import { PORTRAIT_QUERY, useMediaQuery, videoAllowed } from '../../lib/media.js';
import './Hero.css';

// The dynamic phrase names who (or what) the villa is for. Every option is true of
// the property: one private villa for a single group, set among mature trees.
const PHRASES = ['the whole group', 'family reunions', 'old friends', 'slow weekends'];
const HOLD_MS = 2800;
const SWAP_MS = 450;

// Cinemagraph hero (8 s generated clip, stabilised, texture-cleaned and crossfaded
// into a seamless 9 s loop). Portrait screens get the 9:16 cut. Each poster is the
// clip's first frame, so the hand-off from poster to video is invisible.
const HERO_MEDIA = {
  landscape: { video: '/media/hero-video-desktop.mp4', poster: '/media/hero-video-desktop-poster.jpg' },
  portrait: { video: '/media/hero-video-mobile.mp4', poster: '/media/hero-video-mobile-poster.jpg' },
};
const HERO_ALT = 'Villa Cinnamoon Castle seen from its shaded gravel courtyard, framed by tall trees and a timber fence';

function HeroMedia({ sectionRef, paused }) {
  const variant = useMediaQuery(PORTRAIT_QUERY) ? 'portrait' : 'landscape';
  const { video, poster } = HERO_MEDIA[variant];
  const videoRef = useRef(null);
  const [allowed] = useState(videoAllowed);

  // Play only while the Hero is on screen and the visitor has not paused it.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;
    el.muted = true; // React does not write the muted attribute; iOS needs it set before play().
    let visible = true;
    const sync = () => {
      if (paused || !visible || document.hidden) el.pause();
      else el.play().catch(() => {}); // Autoplay can be refused (e.g. iOS Low Power Mode): the poster stays.
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(sectionRef.current);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [paused, variant, sectionRef]);

  if (!allowed) {
    return <img src={poster} alt={HERO_ALT} className="hero__media" fetchPriority="high" data-hero-image="" />;
  }
  return (
    <video
      key={variant}
      ref={videoRef}
      className="hero__media"
      src={video}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      data-hero-image=""
    />
  );
}

function useCyclingPhrase(active, sectionRef) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!active || prefersReducedMotion()) return undefined;

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(sectionRef.current);

    let swap;
    const interval = setInterval(() => {
      // Pause while the Hero is off-screen or the tab is hidden.
      if (!visible || document.hidden) return;
      setLeaving(true);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length);
        setLeaving(false);
      }, SWAP_MS);
    }, HOLD_MS);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      clearTimeout(swap);
    };
  }, [active, sectionRef]);

  return { phrase: PHRASES[index], leaving };
}

export default function Hero() {
  const sectionRef = useRef(null);
  const [cycling, setCycling] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const { phrase, leaving } = useCyclingPhrase(cycling, sectionRef);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      if (prefersReducedMotion()) {
        setCycling(true);
        return;
      }

      const lines = q('.hero__line > span');
      const fades = q('[data-hero-fade]');
      const fromIntro = introState.active;
      gsap.set(lines, { yPercent: 118 });
      gsap.set(fades, { opacity: 0, y: 18 });
      gsap.set(q('.hero__media'), { scale: fromIntro ? 1.12 : 1.05 });

      let cancelled = false;
      whenIntroLifts().then(() => {
        if (cancelled) return;
        gsap
          .timeline()
          .to(q('.hero__media'), { scale: 1, duration: fromIntro ? 2.6 : 1.6, ease: EASE.out }, 0)
          .to(lines, { yPercent: 0, duration: 1.25, stagger: 0.1, ease: EASE.reveal }, fromIntro ? 0.8 : 0.15)
          .to(fades, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: EASE.out }, '<0.35')
          .add(() => setCycling(true), '-=0.4');
      });

      // Scroll parallax: the photograph drifts slower than the page; scrubbed to native scroll.
      gsap.to(q('.hero__parallax'), {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(q('.hero__content'), {
        y: -48,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: sectionRef },
  );

  return (
    <section className="hero" ref={sectionRef} data-nav-overlay="" aria-labelledby="hero-title">
      <div className="hero__parallax">
        <HeroMedia sectionRef={sectionRef} paused={videoPaused} />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      {/* WCAG 2.2.2: moving background content can be paused. */}
      {videoAllowed() && (
        <button
          type="button"
          className="hero__video-toggle"
          onClick={() => setVideoPaused((value) => !value)}
          aria-label={videoPaused ? 'Play background video' : 'Pause background video'}
          data-hero-fade=""
        >
          {videoPaused ? (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5v9l7-4.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5.5 3.5v9M10.5 3.5v9" />
            </svg>
          )}
        </button>
      )}

      <div className="hero__content">
        <div className="hero__title-block">
          <p className="hero__eyebrow" data-hero-fade="">
            Arachchikanda, Hikkaduwa
          </p>
          <h1 className="hero__title" id="hero-title">
            <span className="sr-only">A private villa for families and groups, under the trees.</span>
            <span aria-hidden="true">
              <span className="hero__line">
                <span>A private villa for</span>
              </span>
              <span className="hero__line hero__line--dynamic">
                <span>
                  <span className={`hero__phrase editorial${leaving ? ' is-leaving' : ''}`}>{phrase}</span>
                </span>
              </span>
              <span className="hero__line">
                <span>under the trees.</span>
              </span>
            </span>
          </h1>
        </div>

        <div className="hero__aside">
          <p className="hero__support" data-hero-fade="">
            Five bedrooms and space for up to 15 guests, 3.5&nbsp;km from Hikkaduwa Beach.
          </p>
          <div className="hero__actions" data-hero-fade="">
            <Button to={inquiryPath} tone="light">
              Plan Your Stay
            </Button>
            <Button to="/#villa" variant="swipe" tone="light">
              Explore the Villa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
