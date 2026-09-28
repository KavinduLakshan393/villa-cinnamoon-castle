import './Loading.css';

export default function LoadingSpinner({ size = 'md', className = '', label }) {
  return (
    <span
      className={`loading-spinner loading-spinner--${size} ${className}`.trim()}
      role={label ? 'status' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    />
  );
}
