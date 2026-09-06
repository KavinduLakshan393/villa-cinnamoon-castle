import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ light = false }) => {
  return (
    <Link to="/" className="brand-logo" style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      textDecoration: 'none',
      color: light ? '#FFFFFF' : 'var(--cinnamon-primary)',
      transition: 'opacity 0.2s ease'
    }}>
      {/* Golden / Cinnamon Villa Emblem */}
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        background: light 
          ? 'rgba(255, 255, 255, 0.15)' 
          : 'linear-gradient(135deg, #964B28 0%, #B85D36 100%)',
        border: light ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid var(--cinnamon-tertiary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        boxShadow: light ? 'none' : '0 4px 12px rgba(150, 75, 40, 0.2)',
        flexShrink: 0
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
          <path d="M9 21V12h6v9" />
          <path d="M12 3v3" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: 1.1
        }}>
          Villa Cinnamoon Castle
        </span>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.68rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: light ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-muted)',
          marginTop: '2px'
        }}>
          Hikkaduwa &bull; Sri Lanka
        </span>
      </div>
    </Link>
  );
};
