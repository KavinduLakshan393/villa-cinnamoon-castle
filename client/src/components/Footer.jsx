import SmartLink from './SmartLink.jsx';
import Button from './Button.jsx';
import { site, navItems, inquiryPath, profiles, accommodationProfile } from '../data/site.js';
import './Footer.css';

const explore = [{ label: 'Home', to: '/' }, ...navItems];

function External({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__identity">
          <p className="site-footer__name">{site.name}</p>
          <p className="site-footer__text">{site.description}</p>
          <p className="site-footer__text">{site.locality}</p>
          <Button to={inquiryPath} tone="light">
            Send Inquiry
          </Button>
        </div>

        <nav className="site-footer__group" aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="site-footer__heading">
            Explore
          </h2>
          <ul>
            {explore.map((item) => (
              <li key={item.to}>
                <SmartLink to={item.to} className="footer-link">
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__group">
          <h2 className="site-footer__heading">Contact &amp; location</h2>
          <ul>
            <li>
              <External href={site.whatsapp.href}>WhatsApp {site.whatsapp.label}</External>
            </li>
            {site.googleMapsUrl && (
              <li>
                <External href={site.googleMapsUrl}>Get directions</External>
              </li>
            )}
            {site.googleReviewsUrl && (
              <li>
                <External href={site.googleReviewsUrl}>Google Reviews</External>
              </li>
            )}
          </ul>
        </div>

        <div className="site-footer__group">
          <h2 className="site-footer__heading">Follow &amp; find us</h2>
          <ul>
            {profiles.map((profile) => (
              <li key={profile.label}>
                <External href={profile.href}>{profile.label}</External>
              </li>
            ))}
          </ul>
          <ul className="site-footer__platform">
            <li>
              <External href={accommodationProfile.href}>{accommodationProfile.label} listing</External>
            </li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__legal">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="site-footer__legal-links">
          <SmartLink to="/privacy" className="footer-link">
            Privacy
          </SmartLink>
          <span>All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
