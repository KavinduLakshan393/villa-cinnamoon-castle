import { useRef } from 'react';
import Button from '../components/Button.jsx';
import { RevealHeading, Eyebrow } from '../components/Reveal.jsx';
import { useFadeReveals } from '../lib/reveal.js';
import './Placeholder.css';

/** Temporary shell for Phase 1 pages that are designed after Home. */
export default function Placeholder({ eyebrow, title, note, action }) {
  const ref = useRef(null);
  useFadeReveals(ref);

  return (
    <section className="placeholder" ref={ref} aria-labelledby="page-title">
      <div className="container placeholder__inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <RevealHeading as="h1" id="page-title" className="section-heading placeholder__title" delay={0.1} start="top 100%">
          {title}
        </RevealHeading>
        <p className="body-copy" data-reveal="fade">
          {note}
        </p>
        <div className="placeholder__actions" data-reveal="fade">
          {action}
          <Button to="/" variant="swipe" tone="dark">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
