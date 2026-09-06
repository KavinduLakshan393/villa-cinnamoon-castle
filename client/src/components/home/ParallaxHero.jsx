import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { villaImages } from '../../data/images';
import { propertyData } from '../../data/propertyData';
import KineticButton from '../common/KineticButton';
import './ParallaxHero.css';

gsap.registerPlugin(ScrollTrigger);

const ParallaxHero = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entry Animation: subtle Ken Burns zoom-in ──────────────────────
      gsap.from(bgRef.current, {
        scale: 1.08,
        duration: 2.6,
        ease: 'power3.out',
      });

      // ── Scroll Parallax: bg drifts slower than scroll ──────────────────
      gsap.to(bgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // ── Content gently fades out as user scrolls ───────────────────────
      gsap.to(contentRef.current, {
        y: 50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '55% top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      // ── Mouse Parallax: subtle 3-D tilt depth ─────────────────────────
      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 16;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        gsap.to(bgRef.current, {
          x: -x * 1.2,
          y: -y * 1.2,
          duration: 1.8,
          ease: 'power1.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="parallax-hero-section" ref={containerRef}>
      {/* ── Background: Real villa photo ─────────────────────────────── */}
      <div className="hero-bg-wrap">
        <img
          ref={bgRef}
          src={villaImages.exterior[0]}
          alt="Villa Cinnamoon Castle surrounded by tropical greenery, Arachchikanda, Hikkaduwa"
          className="hero-bg-img"
        />
      </div>

      {/* ── Gradient Scrim: Left-side reading tint ───────────────────── */}
      <div className="hero-scrim hero-scrim--left" aria-hidden="true" />

      {/* ── Gradient Scrim: Bottom-up depth darkening ────────────────── */}
      <div className="hero-scrim hero-scrim--bottom" aria-hidden="true" />

      {/* ── Editorial Content Overlay ─────────────────────────────────── */}
      <div className="hero-editorial-overlay" ref={contentRef}>
        <div className="page-container">
          <div className="hero-text-card">
            <span className="hero-pill-badge">
              Arachchikanda, Hikkaduwa &bull; Sri Lanka
            </span>

            <h1 className="hero-main-title">
              Find your own peacefulness in an authentic cinnamon estate.
            </h1>

            <p className="hero-narrative">
              A private two-story luxury sanctuary just 3.5 km inland from Hikkaduwa beach.
              Complete seclusion for up to 15 guests surrounded by nature.
            </p>

            <div className="hero-cta-group">
              <KineticButton to="/reserve" variant="cinnamon" size="lg">
                Reserve Your Stay
              </KineticButton>
              <KineticButton to="/the-villa" variant="outline" size="lg">
                Explore The Villa
              </KineticButton>
            </div>
          </div>

          {/* ── Spec Strip ─────────────────────────────────────────────── */}
          <div className="hero-spec-strip">
            {propertyData.specs.map((item, idx) => (
              <div key={idx} className="spec-card-item">
                <span className="spec-value">{item.value}</span>
                <span className="spec-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
