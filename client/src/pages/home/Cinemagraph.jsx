import { useEffect, useRef, useState } from 'react';
import { Eyebrow, ScrubText } from '../../components/Reveal.jsx';
import { gsap, useGSAP, withMotion } from '../../lib/motion.js';
import { PORTRAIT_QUERY, useMediaQuery, useVideoAllowed } from '../../lib/media.js';
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
  const allowed = useVideoAllowed();
  const [near, setNear] = useState(false);

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

  // Play while the section is on screen.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !near) return undefined;
    el.muted = true; // iOS needs muted set before play().
    let visible = false;
    const sync = () => {
      if (!visible || document.hidden) el.pause();
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
  }, [near, variant, allowed]);

  // The picture drifts slightly slower than the page.
  useGSAP(
    () =>
      withMotion(() => {
        gsap.fromTo(
          sectionRef.current.querySelector('.cinema__media'),
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      }),
    { scope: sectionRef, dependencies: [allowed] },
  );

  // Rounded inset card that opens to full screen as the section arrives and
  // closes back into a card as it leaves. Only the section's clip changes; the
  // video's parallax drift above runs untouched inside it.
  useGSAP(
    () =>
      withMotion(() => {
        const narrow = window.innerWidth < 760;
        // Side insets stay inside the page gutter, so the quote is never clipped.
        const card = `inset(${narrow ? '2.5% 2.5% 2.5% 2.5%' : '5% 3% 5% 3%'} round ${narrow ? 22 : 40}px)`;
        const full = 'inset(0% 0% 0% 0% round 0px)';
        // Opens while the section rises into view (full as its top meets the top of the
        // screen), holds briefly, then closes as it scrolls away.
        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
          })
          .fromTo(sectionRef.current, { clipPath: card }, { clipPath: full, ease: 'power2.in', duration: 0.46 })
          .to(sectionRef.current, { clipPath: full, duration: 0.08 })
          .to(sectionRef.current, { clipPath: card, ease: 'power2.out', duration: 0.46 });
      }),
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
            autoPlay
            preload={near ? 'auto' : 'none'}
            disablePictureInPicture
            aria-hidden="true"
          />
        ) : (
          <img className="cinema__media" src={poster} alt={alt} loading="lazy" decoding="async" />
        )}
      </div>
      <div className="cinema__shade" aria-hidden="true" />

      <div className="cinema__content container">
        <Eyebrow className="cinema__eyebrow">{eyebrow}</Eyebrow>
        {/* Revealed against the section: complete as the video fills the screen. */}
        <ScrubText as="h2" id={titleId} className="cinema__quote" within=".cinema" start="top 70%" end="top top">
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
