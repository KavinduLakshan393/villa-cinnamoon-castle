import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SmartLink from './SmartLink.jsx';
import Button from './Button.jsx';
import { navItems, inquiryPath, site } from '../data/site.js';
import { gsap, EASE, prefersReducedMotion, whenIntroLifts, useGSAP } from '../lib/motion.js';
import './Navbar.css';

const mobileItems = [{ label: 'Home', to: '/' }, ...navItems];

export default function Navbar() {
  const location = useLocation();
  const headerRef = useRef(null);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const [overlay, setOverlay] = useState(location.pathname === '/');
  const [open, setOpen] = useState(false);

  // Transparent over the Hero photograph, solid once the Hero has scrolled away.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector('[data-nav-overlay]');
      const navHeight = headerRef.current?.offsetHeight ?? 76;
      setOverlay(Boolean(hero) && hero.getBoundingClientRect().bottom > navHeight);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    // The new page mounts after the route transition; re-check shortly after.
    const settle = setTimeout(update, 450);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      clearTimeout(settle);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname]);

  // The header settles into place as the intro lifts.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = headerRef.current.querySelectorAll('[data-nav-in]');
      gsap.set(items, { opacity: 0, y: -12 });
      let cancelled = false;
      whenIntroLifts().then(() => {
        if (!cancelled) gsap.to(items, { opacity: 1, y: 0, duration: 1, stagger: 0.06, delay: 0.9, ease: EASE.out });
      });
      return () => {
        cancelled = true;
      };
    },
    { scope: headerRef },
  );

  // Close the menu whenever the route or hash changes.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // Menu open: lock scroll, make the page inert, animate the links, manage focus.
  useEffect(() => {
    const root = document.documentElement;
    const background = document.querySelectorAll('#main, .site-footer');
    if (!open) return undefined;

    root.classList.add('menu-open');
    background.forEach((el) => el.setAttribute('inert', ''));
    const links = panelRef.current.querySelectorAll('[data-menu-item]');
    if (!prefersReducedMotion()) {
      gsap.fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.05, ease: EASE.reveal, delay: 0.12 });
    }
    panelRef.current.querySelector('a')?.focus({ preventScroll: true });

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const toggle = toggleRef.current;
    return () => {
      root.classList.remove('menu-open');
      background.forEach((el) => el.removeAttribute('inert'));
      window.removeEventListener('keydown', onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const isCurrent = (to) => !to.includes('#') && to !== '/' && location.pathname === to;
  const mode = open ? 'menu' : overlay ? 'overlay' : 'solid';

  return (
    <header className={`site-header is-${mode}`} ref={headerRef}>
      <div className="site-header__bar">
        <SmartLink to="/" className="brand" aria-label={`${site.name} — Home`} data-nav-in="">
          <span>Villa</span>
          <span>Cinnamoon</span>
          <span>Castle</span>
        </SmartLink>

        <nav className="site-nav" aria-label="Main">
          <ul className="site-nav__list" data-nav-in="">
            {navItems.map((item, i) => (
              <li key={item.to}>
                <SmartLink
                  to={item.to}
                  className="site-nav__link"
                  aria-current={isCurrent(item.to) ? 'page' : undefined}
                >
                  {item.label}
                </SmartLink>
                {i < navItems.length - 1 && <span aria-hidden="true">,</span>}
              </li>
            ))}
          </ul>
          <span data-nav-in="">
            <Button to={inquiryPath} size="sm" tone={overlay && !open ? 'light' : 'accent'}>
              Send Inquiry
            </Button>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
            data-nav-in=""
          >
            <span className="menu-toggle__label">{open ? 'Close' : 'Menu'}</span>
            <span className="menu-toggle__icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </nav>
      </div>

      <div id="site-menu" className="site-menu" ref={panelRef} hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="site-menu__list">
            {mobileItems.map((item) => (
              <li key={item.to} className="site-menu__mask">
                <SmartLink
                  to={item.to}
                  className="site-menu__link"
                  data-menu-item=""
                  aria-current={isCurrent(item.to) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-menu__footer">
          <p className="site-menu__locality">{site.locality}</p>
          <a className="site-menu__contact" href={site.whatsapp.href} target="_blank" rel="noopener noreferrer">
            WhatsApp {site.whatsapp.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </header>
  );
}
