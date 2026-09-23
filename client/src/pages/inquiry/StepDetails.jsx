import { useRef, useState } from 'react';
import Button from '../../components/Button.jsx';
import BackButton from './BackButton.jsx';
import { REQUESTS_LIMIT, checkName, checkPhone, countries } from '../../lib/inquiry.js';

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="field__error">
      <span className="error-icon" aria-hidden="true">
        !
      </span>
      {message}
    </p>
  );
}

export default function StepDetails({ state, update, summary, onBack, onSubmit, sending }) {
  // Errors appear after a field loses focus, and again on submission — never per keystroke.
  const [touched, setTouched] = useState({});
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const consentRef = useRef(null);

  const nameError = checkName(state.name);
  const phoneResult = checkPhone(state.country, state.phone);
  const consentError = state.consent ? null : 'Please confirm that you understand this is an inquiry.';
  const show = (field, error) => (touched[field] ? error : null);
  const remaining = REQUESTS_LIMIT - state.requests.length;

  const submit = (event) => {
    event.preventDefault();
    setTouched({ name: true, phone: true, consent: true });
    const firstInvalid = nameError ? nameRef : phoneResult.error ? phoneRef : consentError ? consentRef : null;
    if (firstInvalid) {
      firstInvalid.current.focus();
      return;
    }
    onSubmit(phoneResult.normalized);
  };

  const isOther = state.country === 'other';

  return (
    <form className="step" onSubmit={submit} noValidate>
      <h2 className="step__heading" id="step-heading" tabIndex={-1}>
        Where should the host reply?
      </h2>

      <div className="fields">
        <div className="field">
          <label htmlFor="inq-name" className="field__label">
            Full name
          </label>
          <input
            ref={nameRef}
            id="inq-name"
            className="field__input"
            type="text"
            autoComplete="name"
            value={state.name}
            onChange={(e) => update({ name: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={Boolean(show('name', nameError))}
            aria-describedby={show('name', nameError) ? 'inq-name-error' : undefined}
          />
          <FieldError id="inq-name-error" message={show('name', nameError)} />
        </div>

        <div className="field">
          <label htmlFor="inq-phone" className="field__label">
            WhatsApp number
          </label>
          <div className={`phone${isOther ? ' phone--other' : ''}`}>
            <label htmlFor="inq-country" className="sr-only">
              Country code
            </label>
            <select
              id="inq-country"
              className="field__input phone__country"
              value={state.country}
              onChange={(e) => update({ country: e.target.value })}
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              ref={phoneRef}
              id="inq-phone"
              className="field__input"
              type="tel"
              inputMode="tel"
              autoComplete={isOther ? 'tel' : 'tel-national'}
              placeholder={state.country === '94' ? '071 234 5678' : isOther ? '+44 7700 900123' : ''}
              value={state.phone}
              onChange={(e) => update({ phone: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              aria-invalid={Boolean(show('phone', phoneResult.error))}
              aria-describedby={`inq-phone-hint${show('phone', phoneResult.error) ? ' inq-phone-error' : ''}`}
            />
          </div>
          <p id="inq-phone-hint" className="field__hint">
            The host replies to you on this number.
          </p>
          <FieldError id="inq-phone-error" message={show('phone', phoneResult.error)} />
        </div>

        <div className="field">
          <label htmlFor="inq-requests" className="field__label">
            Special requests <span className="field__optional">(optional)</span>
          </label>
          <textarea
            id="inq-requests"
            className="field__input field__textarea"
            rows={4}
            maxLength={REQUESTS_LIMIT}
            value={state.requests}
            onChange={(e) => update({ requests: e.target.value })}
            aria-describedby="inq-requests-hint inq-requests-count"
          />
          <div className="field__foot">
            <p id="inq-requests-hint" className="field__hint">
              BBQ setup, dietary needs, expected arrival time or other requests. Please don’t include payment or medical
              details.
            </p>
            <p
              id="inq-requests-count"
              className={`field__count${remaining < 50 ? ' is-low' : ''}`}
              aria-live={remaining < 50 ? 'polite' : 'off'}
            >
              {remaining} characters left
            </p>
          </div>
        </div>

        <div className="field">
          <label className={`consent${show('consent', consentError) ? ' has-error' : ''}`}>
            <input
              ref={consentRef}
              type="checkbox"
              className="consent__input"
              checked={state.consent}
              onChange={(e) => {
                update({ consent: e.target.checked });
                setTouched((t) => ({ ...t, consent: true }));
              }}
              aria-invalid={Boolean(show('consent', consentError))}
              aria-describedby={show('consent', consentError) ? 'inq-consent-error' : undefined}
            />
            <span className="consent__box" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
              </svg>
            </span>
            <span className="consent__text">
              I understand that this is an inquiry. The host will confirm availability, the final amount and payment
              details on WhatsApp.
            </span>
          </label>
          <FieldError id="inq-consent-error" message={show('consent', consentError)} />
        </div>
      </div>

      <div className="inline-summary">{summary}</div>

      <div className="handoff">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="handoff__icon">
          <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.6-4.5a8.4 8.4 0 1 1 15.4-4.4Z" />
        </svg>
        <p>WhatsApp will open with your inquiry details. Review the message and tap Send to contact the host.</p>
      </div>

      <div className="step__actions">
        <BackButton onClick={onBack} />
        <Button type="submit" aria-busy={sending} disabled={sending} className={sending ? 'is-busy' : ''}>
          {sending ? 'Opening WhatsApp…' : 'Send Inquiry'}
        </Button>
      </div>
    </form>
  );
}
