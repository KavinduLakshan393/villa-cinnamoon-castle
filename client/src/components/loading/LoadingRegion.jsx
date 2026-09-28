import './Loading.css';

export default function LoadingRegion({ label, className = '', children }) {
  return (
    <div className={`loading-region ${className}`.trim()} role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      <div aria-hidden="true">{children}</div>
    </div>
  );
}
