import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button.jsx';
import { useMediaQuery } from '../lib/media.js';
import { inquiryPath } from '../data/site.js';
import { startingRate, formatRupees } from '../data/packages.js';
import { usePackages } from '../data/PackagesContext.jsx';
import './MobileInquiryBar.css';

const PHONE = '(max-width: 759px)';
// Places that already offer the inquiry action: the bar steps aside for them.
const OWN_ACTION = '.inquiry-cta, .before__close, .gallery-close, .site-footer';

/**
 * Phones only (DEC-034): a slim bar at the bottom of the screen that keeps Send
 * Inquiry within thumb reach. It appears once the first screen has been scrolled
 * past, and hides wherever the page already shows the same action, in the photo
 * viewer and under the open menu. Nothing is rendered on wider screens.
 */
export default function MobileInquiryBar() {
  const phone = useMediaQuery(PHONE);
  const { pathname } = useLocation();
  const { ready } = usePackages();
  const [shown, setShown] = useState(false);
  const enabled = phone && pathname !== inquiryPath && !pathname.startsWith('/admin');

  useEffect(() => {
    if (!enabled) return undefined;
    const busy = new Set();
    const update = () => setShown(window.scrollY > window.innerHeight * 0.85 && busy.size === 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? busy.add(entry.target) : busy.delete(entry.target)));
      update();
    });
    // Pages arrive after their code loads: look again shortly after a route change.
    const watch = () => document.querySelectorAll(OWN_ACTION).forEach((el) => observer.observe(el));
    watch();
    const later = setTimeout(watch, 1500);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      clearTimeout(later);
      observer.disconnect();
      window.removeEventListener('scroll', update);
      setShown(false);
    };
  }, [enabled, pathname]);

  if (!enabled) return null;
  const rate = ready ? startingRate('WEEKDAY') : null;

  return (
    <div className={`inquiry-bar${shown ? ' is-shown' : ''}`} inert={shown ? undefined : ''}>
      {rate !== null && (
        <p className="inquiry-bar__rate">
          <span className="inquiry-bar__from">From</span>
          <strong>{formatRupees(rate)}</strong>
          <span className="inquiry-bar__unit">per night</span>
        </p>
      )}
      <Button to={inquiryPath} size="sm">
        Send Inquiry
      </Button>
    </div>
  );
}
