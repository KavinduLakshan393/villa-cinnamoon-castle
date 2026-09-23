import { useRef } from 'react';
import { useLineReveal, useWordScrub } from '../lib/reveal.js';

/** Primary heading reveal: masked lines rise into place when scrolled into view. */
export function RevealHeading({
  as: Tag = 'h2',
  className = 'section-heading',
  start,
  delay,
  stagger,
  duration,
  when,
  children,
  ...rest
}) {
  const ref = useRef(null);
  useLineReveal(ref, { start, delay, stagger, duration, when });
  return (
    <Tag ref={ref} className={className} data-reveal="lines" {...rest}>
      {children}
    </Tag>
  );
}

/** Secondary reveal: words brighten in sequence with scroll progress. */
export function ScrubText({ as: Tag = 'p', className, children }) {
  const ref = useRef(null);
  useWordScrub(ref);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ index, children, className = '' }) {
  return (
    <p className={`eyebrow ${className}`} data-reveal="fade">
      {index && <span className="eyebrow__index">{index}</span>}
      {index && <span className="eyebrow__rule" aria-hidden="true" />}
      <span>{children}</span>
    </p>
  );
}
