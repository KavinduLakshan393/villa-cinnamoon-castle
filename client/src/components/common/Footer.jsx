import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { propertyData } from '../../data/propertyData';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#050507',
      color: '#FFFFFF',
      padding: '80px 6vw 40px',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '48px',
        marginBottom: '60px'
      }}>
        {/* Brand Column */}
        <div>
          <Logo light />
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            marginTop: '16px',
            maxWidth: '320px'
          }}>
            An authentic two-story cinnamon estate sanctuary in Arachchikanda, Hikkaduwa. 100% private buyout for families and travel groups.
          </p>
          <div style={{ marginTop: '20px' }}>
            <span style={{
              display: 'inline-block',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--cinnamon-tertiary)'
            }}>
              Host: {propertyData.host.name}
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            marginBottom: '20px'
          }}>
            Explore the Estate
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>Home</Link></li>
            <li><Link to="/the-villa" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>The Villa & Suites</Link></li>
            <li><Link to="/packages" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>Rates & Packages</Link></li>
            <li><Link to="/reserve" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>Reserve Your Stay</Link></li>
            <li><Link to="/experiences" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>Curated Experiences</Link></li>
            <li><Link to="/reviews" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>Verified Reviews</Link></li>
            <li><Link to="/contact" style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>Contact & Directions</Link></li>
          </ul>
        </div>

        {/* Direct Contact Lines */}
        <div>
          <h4 style={{
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            marginBottom: '20px'
          }}>
            Direct Host Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--cinnamon-tertiary)' }}>WhatsApp & Primary Hotline</span>
              <a href={`https://wa.me/94761007686`} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', fontWeight: 600 }}>
                {propertyData.host.hotline} ({propertyData.host.hotlineLocal})
              </a>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--cinnamon-tertiary)' }}>Secondary Line</span>
              <a href={`tel:${propertyData.host.secondaryPhoneLocal}`} style={{ color: '#FFFFFF' }}>
                {propertyData.host.secondaryPhone}
              </a>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--cinnamon-tertiary)' }}>Email</span>
              <a href={`mailto:${propertyData.host.email}`} style={{ color: 'rgba(255, 255, 255, 0.9)', wordBreak: 'break-all' }}>
                {propertyData.host.email}
              </a>
            </div>
          </div>
        </div>

        {/* Location & Socials */}
        <div>
          <h4 style={{
            color: '#FFFFFF',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            marginBottom: '20px'
          }}>
            Sanctuary Location
          </h4>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Arachchikanda, Hikkaduwa<br />
            Southern Province, 80240<br />
            Sri Lanka (3.5 km inland)
          </p>

          <div style={{ marginTop: '24px' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--cinnamon-tertiary)', marginBottom: '8px' }}>
              Connect With Us
            </span>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              {propertyData.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.82rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    transition: 'border-color 0.2s'
                  }}
                >
                  {s.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        fontSize: '0.82rem',
        color: 'rgba(255, 255, 255, 0.4)'
      }}>
        <span>&copy; {new Date().getFullYear()} Villa Cinnamoon Castle. All Rights Reserved.</span>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span>Find your own peacefulness 🌿</span>
          <Link to="/admin" style={{ color: 'rgba(255, 255, 255, 0.2)', textDecoration: 'none' }}>
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
