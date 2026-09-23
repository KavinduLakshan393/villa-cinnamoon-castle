import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SmartLink from '../components/SmartLink.jsx';
import StepDates from './inquiry/StepDates.jsx';
import StepStay from './inquiry/StepStay.jsx';
import StepDetails from './inquiry/StepDetails.jsx';
import Summary from './inquiry/Summary.jsx';
import SentState from './inquiry/SentState.jsx';
import {
  buildMessage,
  classifyStay,
  estimate,
  loadInquiry,
  saveInquiry,
  todayKey,
  whatsappUrl,
} from '../lib/inquiry.js';
import { getPreviousPath } from '../lib/navigation.js';
import { prefersReducedMotion } from '../lib/motion.js';
import './inquiry/Inquiry.css';

const STEPS = ['Dates', 'Stay option', 'Your details'];
const backLabels = { '/': 'Home', '/stay-options': 'Stay options', '/gallery': 'Gallery', '/privacy': 'Privacy' };

function Stepper({ step, allowed, sent, onGo }) {
  return (
    <nav className="stepper-nav" aria-label="Inquiry progress">
      <p className="stepper-nav__count">
        Step {step} of {STEPS.length}
        <span className="stepper-nav__current"> — {STEPS[step - 1]}</span>
      </p>
      <ol className="stepper-nav__list">
        {STEPS.map((name, i) => {
          const n = i + 1;
          const done = sent || n < step;
          const current = !sent && n === step;
          const reachable = n <= allowed && !current;
          const content = (
            <>
              <span className="stepper-nav__index" aria-hidden="true">
                {done ? (
                  <svg viewBox="0 0 16 16">
                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                ) : (
                  n
                )}
              </span>
              <span className="stepper-nav__name">{name}</span>
              <span className="sr-only">{done ? ', completed' : current ? ', current step' : ', not started'}</span>
            </>
          );
          return (
            <li
              key={name}
              className={`stepper-nav__item${done ? ' is-done' : ''}${current ? ' is-current' : ''}`}
              aria-current={current ? 'step' : undefined}
            >
              {reachable ? (
                <button type="button" className="stepper-nav__link" onClick={() => onGo(n)}>
                  {content}
                </button>
              ) : (
                <span className="stepper-nav__link">{content}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function Inquiry() {
  const [state, setState] = useState(loadInquiry);
  const [params, setParams] = useSearchParams();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const layoutRef = useRef(null);

  const update = useCallback((patch) => setState((s) => ({ ...s, ...patch })), []);
  useEffect(() => saveInquiry(state), [state]);

  const stay = classifyStay(state.checkIn, state.checkOut);
  const est = estimate(state);
  const step1Valid = Boolean(stay) && state.checkIn >= todayKey();
  const step2Valid = step1Valid && Boolean(est);
  const allowed = step1Valid ? (step2Valid ? 3 : 2) : 1;
  const requested = Math.min(3, Math.max(1, Number(params.get('step')) || 1));
  const step = Math.min(requested, allowed);

  // Keep the URL honest when a later step is requested before earlier steps are valid.
  useEffect(() => {
    if (requested !== step) setParams(step === 1 ? {} : { step: String(step) }, { replace: true });
  }, [requested, step, setParams]);

  // Steps are history entries, so the browser Back button returns to the previous step.
  const goTo = useCallback(
    (n) => {
      setSent(null);
      setParams(n === 1 ? {} : { step: String(n) });
    },
    [setParams],
  );

  // Move focus to the new step heading and bring the form into view.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const top = layoutRef.current.getBoundingClientRect().top + window.scrollY - 110;
    if (window.scrollY > top) window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    document.getElementById('step-heading')?.focus({ preventScroll: true });
  }, [step, sent]);

  const announce = useCallback((message) => setAnnouncement(message), []);

  const submit = (phone) => {
    if (sending || !est) return;
    setSending(true);
    const message = buildMessage(state, est, phone);
    const url = whatsappUrl(message);
    // Opened synchronously inside the click so pop-up blockers allow it.
    // (A 'noopener' feature string would make window.open always return null, hiding a blocked tab.)
    const opened = window.open(url, '_blank');
    if (opened) opened.opener = null;
    window.setTimeout(() => {
      setSending(false);
      setSent({ url, message, blocked: !opened });
    }, 600);
  };

  const previous = getPreviousPath();
  const backTo = previous && previous !== '/inquiry' ? previous : '/';

  const summaryProps = { state, stay, est, showOptions: step >= 2 || Boolean(sent), onEdit: goTo, editBefore: sent ? 4 : step };
  const inlineSummary = <Summary {...summaryProps} liveTotal />;

  return (
    <section className="inquiry" aria-labelledby="inquiry-title">
      <div className="container inquiry__head">
        <SmartLink to={backTo} className="inquiry__back">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 5 8 12 15 19" />
          </svg>
          Back to {backLabels[backTo] ?? 'Home'}
        </SmartLink>
        <h1 className="inquiry__title" id="inquiry-title">
          Send an inquiry
        </h1>
        <Stepper step={step} allowed={allowed} sent={Boolean(sent)} onGo={goTo} />
      </div>

      <div className="container inquiry__layout" ref={layoutRef}>
        <div className="inquiry__main" key={sent ? 'sent' : step}>
          {sent ? (
            <SentState {...sent} onEdit={() => setSent(null)} />
          ) : step === 1 ? (
            <StepDates state={state} update={update} stay={stay} onContinue={() => goTo(2)} />
          ) : step === 2 ? (
            <StepStay
              state={state}
              update={update}
              stay={stay}
              summary={inlineSummary}
              onBack={() => goTo(1)}
              onContinue={() => goTo(3)}
              announce={announce}
            />
          ) : (
            <StepDetails
              state={state}
              update={update}
              summary={inlineSummary}
              onBack={() => goTo(2)}
              onSubmit={submit}
              sending={sending}
            />
          )}
        </div>
        <aside className="inquiry__aside" aria-label="Stay summary">
          <Summary {...summaryProps} />
        </aside>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
