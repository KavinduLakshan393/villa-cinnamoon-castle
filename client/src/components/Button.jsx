import SmartLink from './SmartLink.jsx';
import './Button.css';

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="13 5 20 12 13 19" />
  </svg>
);

const ArrowUpRight = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4 12L12 4M12 4H6M12 4V10" />
  </svg>
);

/**
 * variant="fill"  — pill with a left-to-right fill; the dot morphs into an arrow
 *                    (Sample components/Button/button.html).
 * variant="swipe" — outlined button whose background slides up from below
 *                    (Sample components/Button/button 2.html).
 * tone: "accent" | "light" | "dark" — controls colours for light or photographic backgrounds.
 */
export default function Button({ to, variant = 'fill', tone = 'accent', size, external, children, className = '', ...rest }) {
  const isExternal = external ?? /^https?:\/\//.test(to ?? '');
  const classes = `btn btn--${variant} btn--${tone}${size ? ` btn--${size}` : ''} ${className}`;

  const content =
    variant === 'fill' ? (
      <span className="btn__content">
        <span className="btn__dot" aria-hidden="true" />
        <span className="btn__label">{children}</span>
        <span className="btn__arrow">{isExternal ? <ArrowUpRight /> : <ArrowRight />}</span>
      </span>
    ) : (
      <span className="btn__content">
        <span className="btn__label">{children}</span>
        {isExternal ? <ArrowUpRight /> : <ArrowRight />}
      </span>
    );

  const inner = (
    <>
      {variant === 'fill' && <span className="btn__fill" aria-hidden="true" />}
      {content}
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (to) {
    return (
      <SmartLink to={to} className={classes} {...rest}>
        {inner}
      </SmartLink>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}
