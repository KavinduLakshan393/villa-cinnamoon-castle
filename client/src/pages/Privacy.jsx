import SmartLink from '../components/SmartLink.jsx';
import { site } from '../data/site.js';
import './Privacy.css';

// Privacy Page IA: an information page — no hero image, animation or inquiry CTA,
// and no scroll reveal: every word is readable immediately.

function External({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="privacy__link">
      {children}
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M5 11L11 5M11 5H6.5M11 5V9.5" />
      </svg>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Privacy() {
  const updated = site.privacyLastUpdated;

  return (
    <article className="privacy container" aria-labelledby="privacy-title">
      <header className="privacy__header">
        <p className="eyebrow">Privacy</p>
        <h1 id="privacy-title" className="privacy__title">
          Privacy notice
        </h1>
        <p className="privacy__updated">
          Last updated:{' '}
          {updated ? (
            <time dateTime={updated}>{dateFormat.format(new Date(`${updated}T00:00:00`))}</time>
          ) : (
            <span className="privacy__draft">draft — the publication date is added at launch</span>
          )}
        </p>
        <p className="privacy__intro">
          Villa Cinnamoon Castle respects your privacy. Whether you are exploring our spaces, reading guest reviews,
          or preparing an inquiry for a stay, this notice explains what information we collect, why we need it, how it
          is kept secure, and how you remain in control of your personal data.
        </p>
      </header>

      <div className="privacy__body">
        <section aria-labelledby="p-glance">
          <h2 id="p-glance">Our commitments at a glance</h2>
          <ul>
            <li>
              <strong>No advertising trackers:</strong> We do not use third-party tracking, profiling, or advertising cookies.
            </li>
            <li>
              <strong>We never sell data:</strong> Your contact and stay details are never sold, rented, or used for third-party marketing.
            </li>
            <li>
              <strong>Authentic Google Reviews:</strong> Guest reviews displayed on our website are real reviews sourced directly from our verified Google Business Account.
            </li>
            <li>
              <strong>Always in control:</strong> You can review, correct, or request deletion of your inquiry details anytime by messaging the host on WhatsApp.
            </li>
          </ul>
        </section>

        <section aria-labelledby="p-provide">
          <h2 id="p-provide">Information you provide</h2>
          <p>When you prepare a stay inquiry, you provide details needed to coordinate your visit:</p>
          <ul>
            <li>Check-in and check-out dates</li>
            <li>Number of guests</li>
            <li>Preferred stay option and room package</li>
            <li>Full name</li>
            <li>WhatsApp contact number</li>
            <li>Any optional special requests you choose to share</li>
          </ul>
          <p>
            Please provide only the details necessary for your stay. Do not enter passport scans, payment card numbers,
            bank details, or confidential medical information into the special requests field. Payment and identity
            verification are arranged directly with the host when confirming your reservation.
          </p>
        </section>

        <section aria-labelledby="p-use">
          <h2 id="p-use">How we use this information</h2>
          <p>We use your inquiry details solely to:</p>
          <ul>
            <li>Calculate estimated pricing and check stay availability</li>
            <li>Create an inquiry reference number so the host can identify your request</li>
            <li>Enable the villa management team to review and arrange your visit</li>
            <li>Prepare your direct WhatsApp inquiry message</li>
            <li>Address any special preferences or arrangements you have requested</li>
          </ul>
          <p>
            We never use your contact details for unrelated marketing, automated promotional campaigns, or third-party
            advertising, and we never sell personal information.
          </p>
        </section>

        <section aria-labelledby="p-storage">
          <h2 id="p-storage">How your inquiry is stored and protected</h2>
          <p>
            When you submit an inquiry, your request details are saved to our secure reservation system to generate your
            reference number and allow the host to review dates and manage the stay.
          </p>
          <p>
            <strong>Private management access:</strong> Your inquiry records are accessible strictly to authorized villa
            management through an authenticated administration portal.
          </p>
          <p>
            <strong>Browser form memory:</strong> While you move through the form steps, your progress is kept in your
            device’s temporary browser storage so you do not lose entered details if you switch steps or refresh the
            page.
          </p>
        </section>

        <section aria-labelledby="p-whatsapp">
          <h2 id="p-whatsapp">Direct WhatsApp communication</h2>
          <p>
            When you select “Send Inquiry”, our website records your inquiry reference and opens WhatsApp with your
            pre-filled inquiry summary.
          </p>
          <p>
            <strong>You choose when to send:</strong> The inquiry reaches the host only after you review the message and
            tap Send in WhatsApp.
          </p>
          <p>
            <strong>Encrypted conversation:</strong> From that point, your conversation takes place directly on WhatsApp
            under WhatsApp’s privacy terms and end-to-end messaging encryption. The host uses this chat to answer
            questions, confirm availability, and finalize your stay.
          </p>
          <p>
            Read the <External href="https://www.whatsapp.com/legal/privacy-policies">WhatsApp privacy policies</External>.
          </p>
        </section>

        <section aria-labelledby="p-reviews-maps">
          <h2 id="p-reviews-maps">Google Reviews, maps and external links</h2>
          <p>
            We display authentic guest ratings and feedback sourced directly from our official Google Business Account:
          </p>
          <ul>
            <li>
              <strong>Google Reviews:</strong> The reviews and star ratings shown on our website reflect genuine experiences
              shared by guests on our Google Business Profile. When you choose to read full reviews on Google, view our
              profile, or submit your own review via “Review Us on Google”, you will be directed to Google’s platform, where
              your interaction is handled under Google’s privacy terms.
            </li>
            <li>
              <strong>On-Demand Location Map:</strong> To help you plan your journey, our Location section provides an
              interactive Google map. To respect your privacy, this map does not load automatically—it activates only when
              you select “Show map”, at which point Google receives standard technical connection data (such as your IP
              address). You can also select “Get directions” to open Google Maps directly.
            </li>
            <li>
              <strong>External Links:</strong> We provide links to our verified profiles on Airbnb, Google Maps, Facebook,
              Instagram, and TikTok. Choosing any of these links opens the external platform under its own terms and
              privacy practices.
            </li>
          </ul>
          <p>
            Read the <External href="https://policies.google.com/privacy">Google Privacy Policy</External>.
          </p>
        </section>

        <section aria-labelledby="p-cookies">
          <h2 id="p-cookies">Cookies and device storage</h2>
          <p>We keep device storage minimal and transparent:</p>
          <ul>
            <li>
              <strong>Public visitors:</strong> The website does not use advertising, marketing, or behavioural
              analytics cookies. We use only temporary browser storage to remember your inquiry form inputs while you
              navigate the site.
            </li>
            <li>
              <strong>Administrative portal:</strong> If a villa manager signs into the administration dashboard, an
              essential security session cookie is used strictly to protect their login session.
            </li>
          </ul>
        </section>

        <section aria-labelledby="p-retention">
          <h2 id="p-retention">How long information is kept</h2>
          <p>
            Temporary browser form data remains on your personal device only until you complete your session or clear
            your browser data.
          </p>
          <p>
            Inquiry records are retained in our secure reservation system for as long as reasonably needed to manage
            active stays, maintain required business and financial records, address any disputes, or meet statutory
            obligations. Information that is no longer needed is securely removed.
          </p>
          <p>
            WhatsApp conversation history is kept by the host for communication continuity, booking details, and guest
            support.
          </p>
        </section>

        <section aria-labelledby="p-sharing">
          <h2 id="p-sharing">Sharing and disclosure</h2>
          <p>Your inquiry information is handled with strict discretion and is shared only with:</p>
          <ul>
            <li>The Villa Cinnamoon Castle host and management team handling your reservation</li>
            <li>WhatsApp, when you choose to send your prepared inquiry message</li>
            <li>
              Essential website hosting providers processing technical delivery logs to ensure site security and
              availability
            </li>
            <li>A lawful authority, only where disclosure is strictly required by applicable law</li>
          </ul>
          <p>We do not sell, rent, or trade personal data under any circumstances.</p>
        </section>

        <section aria-labelledby="p-choices">
          <h2 id="p-choices">Your choices and rights</h2>
          <p>
            In accordance with Sri Lanka’s Personal Data Protection Act (No. 9 of 2022) and international privacy
            principles, you have the right to:
          </p>
          <ul>
            <li>Ask what personal information we hold regarding your inquiries</li>
            <li>Request correction of any inaccurate or out-of-date details</li>
            <li>
              Request the deletion of your inquiry records where they are no longer required for legal or booking
              administration
            </li>
            <li>Withdraw consent for future communications at any time</li>
          </ul>
        </section>

        <section aria-labelledby="p-contact" className="privacy__contact">
          <h2 id="p-contact">Contact &amp; privacy requests</h2>
          <p>
            To ask a privacy question, update your information, or request deletion of your inquiry details, message
            Villa Cinnamoon Castle directly on WhatsApp:
          </p>
          <p className="privacy__contact-line">
            <External href={site.whatsapp.href}>WhatsApp {site.whatsapp.label}</External>
          </p>
          <p>
            For independent regulatory information regarding data protection rights in Sri Lanka, you may visit the{' '}
            <External href="https://www.dpa.gov.lk/">Data Protection Authority of Sri Lanka</External>.
          </p>
        </section>

        <section aria-labelledby="p-changes">
          <h2 id="p-changes">Changes to this notice</h2>
          <p>
            This notice may be updated if our website features, service providers, or data practices change. The latest
            version and its publication date will always be published on this page.
          </p>
        </section>
      </div>

      <footer className="privacy__footer">
        <SmartLink to="/" className="privacy__back">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 5 8 12 15 19" />
          </svg>
          Back to the website
        </SmartLink>
      </footer>
    </article>
  );
}
