import React from 'react';
import { Link } from 'react-router-dom';
import './KineticButton.css';

export const KineticButton = ({
  children,
  to,
  href,
  onClick,
  variant = 'cinnamon', // 'cinnamon' | 'dark' | 'outline' | 'white'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const content = (
    <>
      <span className="btn-fill"></span>
      <span className="btn-content">
        <span className="btn-dot"></span>
        <span className="btn-text">{children}</span>
        <span className="btn-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <polyline points="13 5 20 12 13 19"></polyline>
          </svg>
        </span>
      </span>
    </>
  );

  const buttonClasses = `project-btn btn-${variant} btn-${size} ${className} ${disabled ? 'disabled' : ''}`.trim();

  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default KineticButton;
