import './Loading.css';

export default function SkeletonBlock({ width, height, radius, className = '' }) {
  return (
    <span
      className={`skeleton-block ${className}`.trim()}
      style={{ '--skeleton-width': width, '--skeleton-height': height, '--skeleton-radius': radius }}
      aria-hidden="true"
    />
  );
}
