import { useRef, useState } from 'react';
import ResponsiveImage from './ResponsiveImage.jsx';
import { useParallax } from '../lib/reveal.js';
import './loading/Loading.css';
import './Frame.css';

/**
 * A cropped image frame with a gentle scroll parallax and an optional caption.
 * With `onOpen`, the frame becomes a button that opens the photo in the viewer:
 * on hover the frame draws in while the photo eases closer, and a "View" cursor
 * label follows the pointer (see CursorLabel).
 */
export default function Frame({
  name,
  alt,
  caption,
  ratio = '4 / 5',
  sizes,
  className = '',
  parallax = true,
  onOpen,
}) {
  const frameRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  useParallax(frameRef, { enabled: parallax });

  const Window = onOpen ? 'button' : 'div';
  const interactive = onOpen
    ? {
        type: 'button',
        onClick: (event) => onOpen(name, event.currentTarget),
        'aria-label': `View larger: ${alt}`,
        'data-cursor': 'View',
        'data-photo': name,
      }
    : {};

  return (
    <figure className={`frame${onOpen ? ' frame--interactive' : ''} ${className}`} data-reveal="fade">
      {/* ratio={null} leaves the aspect ratio to the stylesheet (e.g. per breakpoint). */}
      <Window
        className={`frame__window ${loaded ? 'is-loaded' : 'is-loading'}`}
        ref={frameRef}
        style={ratio ? { aspectRatio: ratio } : undefined}
        {...interactive}
      >
        <ResponsiveImage
          name={name}
          alt={onOpen ? '' : alt}
          sizes={sizes}
          className="frame__media"
          data-parallax=""
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </Window>
      {caption && <figcaption className="frame__caption caption">{caption}</figcaption>}
    </figure>
  );
}
