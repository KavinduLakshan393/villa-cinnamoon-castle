import { useRef } from 'react';
import ResponsiveImage from './ResponsiveImage.jsx';
import { useParallax } from '../lib/reveal.js';
import './Frame.css';

/** A cropped image frame with a gentle scroll parallax and an optional caption. */
export default function Frame({ name, alt, caption, ratio = '4 / 5', sizes, className = '', parallax = true }) {
  const frameRef = useRef(null);
  useParallax(frameRef, { enabled: parallax });

  return (
    <figure className={`frame ${className}`} data-reveal="fade">
      {/* ratio={null} leaves the aspect ratio to the stylesheet (e.g. per breakpoint). */}
      <div className="frame__window" ref={frameRef} style={ratio ? { aspectRatio: ratio } : undefined}>
        <ResponsiveImage name={name} alt={alt} sizes={sizes} className="frame__media" data-parallax="" />
      </div>
      {caption && <figcaption className="frame__caption caption">{caption}</figcaption>}
    </figure>
  );
}
