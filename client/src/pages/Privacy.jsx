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
          Villa Cinnamoon Castle respects your privacy. This notice explains what information is used when you browse
          the website or prepare a stay inquiry, why it is used and when it is shared with another service.
        </p>
      </header>

      <div className="privacy__body">
        <section aria-labelledby="p-provide">
          <h2 id="p-provide">Information you provide</h2>
          <p>When you prepare an inquiry, you may enter:</p>
          <ul>
            <li>Check-in and check-out dates</li>
            <li>Number of guests</li>
            <li>Selected stay option</li>
            <li>Full name</li>
            <li>WhatsApp number</li>
            <li>Any information you choose to add under special requests</li>
          </ul>
          <p>
            Please provide only the information needed for your stay inquiry. Do not enter passport details,
            payment-card information, bank details or unnecessary medical information in the special-requests field.
          </p>
        </section>

        <section aria-labelledby="p-use">
          <h2 id="p-use">How we use this information</h2>
          <p>The information is used to:</p>
          <ul>
            <li>Show stay options and an estimated price</li>
            <li>Prepare your inquiry message</li>
            <li>Respond to your inquiry</li>
            <li>Confirm availability and arrange the stay with you</li>
            <li>Address any special requests you choose to provide</li>
          </ul>
          <p>
            The website does not use inquiry details for unrelated advertising and does not sell personal information.
          </p>
        </section>

        <section aria-labelledby="p-storage">
          <h2 id="p-storage">Website inquiry storage</h2>
          <p>The website does not save your inquiry in an online booking database.</p>
          <p>
            While you fill in the form, your progress is kept in your browser for the current session, so moving
            between steps or returning to the form does not clear what you have entered. This session data stays on
            your device and is not a booking record.
          </p>
        </section>

        <section aria-labelledby="p-whatsapp">
          <h2 id="p-whatsapp">WhatsApp</h2>
          <p>
            When you select “Send Inquiry”, the website prepares a message and opens WhatsApp. You can review the
            message before choosing to send it.
          </p>
          <p>
            Your inquiry reaches the host only after you tap Send in WhatsApp. From that point, WhatsApp processes the
            message under its own terms and privacy policies. The host uses the conversation to respond, confirm
            availability and arrange the stay.
          </p>
          <p>
            Read the <External href="https://www.whatsapp.com/legal/privacy-policies">WhatsApp privacy policies</External>.
          </p>
        </section>

        <section aria-labelledby="p-technical">
          <h2 id="p-technical">Technical information</h2>
          <p>
            The website and its hosting provider may process limited technical information needed to deliver and
            protect the site, such as:
          </p>
          <ul>
            <li>Internet Protocol (IP) address</li>
            <li>Browser and device type</li>
            <li>Date and time of a request</li>
            <li>Pages or files requested</li>
            <li>Security and error logs</li>
          </ul>
          <p>
            This information is used for website delivery, reliability and security. The website does not use
            advertising or behavioural-analytics cookies.
          </p>
        </section>

        <section aria-labelledby="p-external">
          <h2 id="p-external">Maps and external links</h2>
          <p>
            The website may link to Google Maps, Google Reviews, Airbnb, Facebook, Instagram and TikTok. When you
            choose one of these links, that service may process information according to its own privacy policy.
          </p>
          <p>
            The website does not load an interactive map automatically. If an embedded map or another third-party
            service is added in the future, this notice will be updated first.
          </p>
          <p>
            Read the <External href="https://policies.google.com/privacy">Google Privacy Policy</External>.
          </p>
        </section>

        <section aria-labelledby="p-retention">
          <h2 id="p-retention">How long information is kept</h2>
          <p>
            Browser session data is kept only for the current session. You can remove it by closing the browser
            session or clearing this website’s data.
          </p>
          <p>
            After you send an inquiry through WhatsApp, the host keeps the conversation only for as long as reasonably
            needed to respond, arrange the stay, maintain required business or financial records, resolve a dispute or
            meet a legal obligation. Information that is no longer needed is deleted or securely removed.
          </p>
        </section>

        <section aria-labelledby="p-sharing">
          <h2 id="p-sharing">Sharing and disclosure</h2>
          <p>Inquiry information may be available to:</p>
          <ul>
            <li>The Villa Cinnamoon Castle host handling the inquiry</li>
            <li>WhatsApp, when you choose to send the prepared message</li>
            <li>Website-hosting or technical service providers processing limited data to deliver and secure the website</li>
            <li>A public authority, where disclosure is required by applicable law</li>
          </ul>
          <p>Personal information is not sold.</p>
        </section>

        <section aria-labelledby="p-choices">
          <h2 id="p-choices">Your choices and requests</h2>
          <p>Depending on applicable law, you may ask to:</p>
          <ul>
            <li>Receive information about personal data held about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion where the information is no longer required</li>
            <li>Withdraw a request or object to certain uses where applicable</li>
          </ul>
          <p>
            Some information may need to be kept where required for business records, legal obligations or dispute
            resolution.
          </p>
        </section>

        <section aria-labelledby="p-contact" className="privacy__contact">
          <h2 id="p-contact">Contact</h2>
          <p>For a privacy question or request, contact Villa Cinnamoon Castle on WhatsApp:</p>
          <p className="privacy__contact-line">
            <External href={site.whatsapp.href}>WhatsApp {site.whatsapp.label}</External>
          </p>
          <p>
            You may also visit the <External href="https://www.dpa.gov.lk/">Data Protection Authority of Sri Lanka</External>{' '}
            for information about data-protection rights and applicable procedures.
          </p>
        </section>

        <section aria-labelledby="p-changes">
          <h2 id="p-changes">Changes to this notice</h2>
          <p>
            This notice may be updated if the website’s features, service providers or data practices change. The
            latest version and its update date are published on this page.
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
