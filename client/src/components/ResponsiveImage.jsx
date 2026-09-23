import manifest from '../data/media-manifest.json';

const srcset = (name, widths, ext) => widths.map((w) => `/media/${name}-${w}.${ext} ${w}w`).join(', ');

/** Serves the renditions produced by `npm run media` with explicit dimensions (no CLS). */
export default function ResponsiveImage({ name, alt, sizes = '100vw', priority = false, className, ...rest }) {
  const entry = manifest[name];
  if (!entry) throw new Error(`Unknown media "${name}". Add it to scripts/build-media.mjs.`);
  const { width, height, widths } = entry;
  const fallback = widths[Math.min(1, widths.length - 1)];

  return (
    <picture>
      <source type="image/webp" srcSet={srcset(name, widths, 'webp')} sizes={sizes} />
      <img
        src={`/media/${name}-${fallback}.jpg`}
        srcSet={srcset(name, widths, 'jpg')}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        {...rest}
      />
    </picture>
  );
}
