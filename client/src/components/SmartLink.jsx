import { forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { prefersReducedMotion } from '../lib/motion.js';

export function scrollToSection(id, { instant = false } = {}) {
  const target = id ? document.getElementById(id) : null;
  if (!target) {
    window.scrollTo({ top: 0, behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth' });
    return;
  }
  target.scrollIntoView({ behavior: instant || prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

/**
 * Internal link that understands Home anchors (`/#villa`). On Home it scrolls to the
 * section; elsewhere it navigates to Home and the page transition lands on the anchor.
 * External URLs render a plain anchor that opens in a new tab.
 */
const SmartLink = forwardRef(function SmartLink({ to, onClick, children, ...rest }, ref) {
  const location = useLocation();
  const navigate = useNavigate();

  if (/^https?:\/\//.test(to)) {
    return (
      <a ref={ref} href={to} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  const [path, hash] = to.split('#');
  const targetPath = path || '/';

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    if (targetPath === location.pathname) {
      event.preventDefault();
      if (hash) {
        navigate({ pathname: targetPath, hash: `#${hash}` }, { replace: true, state: { noTransition: true } });
      }
      scrollToSection(hash);
    }
  };

  return (
    <Link ref={ref} to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
});

export default SmartLink;
