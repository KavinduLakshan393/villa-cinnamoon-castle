import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { KineticButton } from './KineticButton';
import './Navbar.css';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile overlay on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/the-villa', label: 'The Villa' },
    { to: '/packages', label: 'Packages' },
    { to: '/experiences', label: 'Experiences' },
    { to: '/reviews', label: 'Reviews' },
  ];

  return (
    <header className={`site-header ${mobileMenuOpen ? 'menu-open' : ''}`} id="siteHeader">
      <div className="header-inner">
        
        {/* Brand Logo */}
        <Logo />

        {/* Desktop View: Horizontal Navigation Cluster */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <div className="desktop-links-cluster">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="text-roller">
                  <span className="text-primary">{item.label}</span>
                  <span className="text-secondary">{item.label}</span>
                </span>
                <span className="nav-arrow">
                  <svg viewBox="0 0 24 24">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <polyline points="13 5 20 12 13 19"></polyline>
                  </svg>
                </span>
              </NavLink>
            ))}
          </div>

          {/* Secondary Action: Contact Host */}
          <NavLink
            to="/contact"
            className={({ isActive }) => `btn-talk ${isActive ? 'active' : ''}`}
          >
            <span className="text-roller">
              <span className="text-primary">Contact</span>
              <span className="text-secondary">Contact</span>
            </span>
            <span className="nav-arrow">
              <svg viewBox="0 0 24 24">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <polyline points="13 5 20 12 13 19"></polyline>
              </svg>
            </span>
          </NavLink>

          {/* Primary Action: Book Now */}
          <KineticButton to="/reserve" variant="dark" size="sm">
            Book Now
          </KineticButton>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          <div className="toggle-icon-wrap">
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
          </div>
        </button>

      </div>

      {/* Full-screen Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="menu-card menu-card-links">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className="card-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{item.label}</span>
              <span className="card-arrow">&rarr;</span>
            </NavLink>
          ))}
        </div>

        <div className="menu-card">
          <NavLink
            to="/contact"
            className="card-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Contact Host</span>
            <span className="card-arrow">&rarr;</span>
          </NavLink>
        </div>

        <div className="menu-card menu-card-dark">
          <NavLink
            to="/reserve"
            className="card-link"
            style={{ color: '#FFFFFF', display: 'flex', justifyContent: 'space-between' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Book Your Stay</span>
            <span className="card-arrow">&rarr;</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
