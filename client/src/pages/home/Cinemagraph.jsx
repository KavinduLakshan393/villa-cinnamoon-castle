import { useEffect, useRef, useState } from 'react';
import { Eyebrow, ScrubText } from '../../components/Reveal.jsx';
import { gsap, prefersReducedMotion, useGSAP } from '../../lib/motion.js';
import { PORTRAIT_QUERY, useMediaQuery, videoAllowed } from '../../lib/media.js';
import './Cinemagraph.css';

/**
 * Full-bleed looping video with a quote in the lower left, revealed word by word
 * with scroll (text reveal 2). Same pipeline as the Hero: generated clip,
 * stabilised, static areas locked and crossfaded into a seamless loop; each
 * poster is the loop's first frame.
 *
 * The clip only starts downloading when the section is about to enter the
 * viewport, and plays only while it is on screen. Reduced motion or data saver
 * shows the poster.
 */
export default function Cinemagraph({ id, name, alt, eyebrow, note, className = '', children }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const variant = useMediaQuery(PORTRAIT_QUERY) ? 'mobile' : 'desktop';
  const video = `/media/${name}-video-${variant}.mp4`;
  const poster = `/media/${name}-video-${variant}-poster.jpg`;
  const [allowed] = useState(videoAllowed);
  const [near, setNear] = useState(false);
  const [paused, setPaused] = useState(false);

  // Start fetching the clip one screen before the section arrives.
  useEffect(() => {
    if (!allowed) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100% 0px' },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [allowed]);

  // Play only while the section is on screen and the visitor has not paused it.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !near) return undefined;
    el.muted = true; // iOS needs muted set before play().
    let visible = false;
    const sync = () => {
      if (paused || !visible || document.hidden) el.pause();
      else el.play().catch(() => {}); // Autoplay can be refused: the poster stays.
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(sectionRef.current);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [near, paused, variant]);

  // The picture drifts slightly slower than the page.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        sectionRef.current.querySelector('.cinema__media'),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    },
    { scope: sectionRef },
  );

  const titleId = `${id}-quote`;

  return (
    <section id={id} className={`cinema ${className}`} ref={sectionRef} aria-labelledby={titleId}>
      <div className="cinema__frame">
        {allowed ? (
          <video
            key={variant}
            ref={videoRef}
            className="cinema__media"
            src={near ? video : undefined}
            poster={poster}
            muted
            loop
            playsInline
            preload={near ? 'auto' : 'none'}
            disablePictureInPicture
            aria-hidden="true"
          />
        ) : (
          <img className="cinema__media" src={poster} alt={alt} loading="lazy" decoding="async" />
        )}
      </div>
      <div className="cinema__shade" aria-hidden="true" />

      {/* WCAG 2.2.2: moving background content can be paused. */}
      {allowed && (
        <button
          type="button"
          className="cinema__toggle"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? 'Play background video' : 'Pause background video'}
        >
          {paused ? (
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

      <div className="cinema__content container">
        <Eyebrow className="cinema__eyebrow">{eyebrow}</Eyebrow>
        <ScrubText as="h2" id={titleId} className="cinema__quote" start="top 92%" end="bottom 55%">
          {children}
        </ScrubText>
        {note && (
          <p className="cinema__note" data-reveal="fade">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
