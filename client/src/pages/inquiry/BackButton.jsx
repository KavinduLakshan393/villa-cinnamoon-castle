export default function BackButton({ onClick, children = 'Back' }) {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="15 5 8 12 15 19" />
      </svg>
      {children}
    </button>
  );
}
