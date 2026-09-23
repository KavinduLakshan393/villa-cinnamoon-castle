import { useEffect, useRef, useState } from 'react';
import { gsap, EASE, markIntroLifting, prefersReducedMotion } from '../lib/motion.js';
import './Intro.css';

// Short phrases drawn from the villa itself; the name stays on screen as the intro lifts.
const PHRASES = ['Tropical shade', 'Shared tables', 'Slow mornings'];
const FINAL = 'Villa Cinnamoon Castle';
const PHRASE_MS = 950;
const MIN_DURATION = PHRASES.length * PHRASE_MS + 700;
const MAX_WAIT = 9000;

function waitForHeroImage() {
  const img = document.querySelector('[data-hero-image]');
  if (!img || img.complete) return Promise.resolve();
  return new Promise((resolve) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });
}

/** One rolling digit column. `direction` decides whether increasing values roll up or down. */
function DigitColumn({ digit, direction, hidden }) {
  const order = direction === 'up' ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const index = order.indexOf(digit);
  return (
    <span className={`intro__digit${hidden ? ' is-collapsed' : ''}`}>
      <span className="intro__track" style={{ transform: `translate3d(0, ${-index * 10}%, 0)` }}>
        {order.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </span>
    </span>
  );
}

function Counter({ value }) {
  const hundreds = Math.floor(value / 100);
  const tens = Math.floor((value % 100) / 10);
  const units = value % 10;
  return (
    <span className="intro__counter" aria-hidden="true">
      <DigitColumn digit={hundreds} direction="up" hidden={value < 100} />
      <DigitColumn digit={tens} direction="up" hidden={value < 10} />
      <DigitColumn digit={units} direction="down" />
    </span>
  );
}

export default function Intro({ onDone }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const [phrase, setPhrase] = useState({ text: prefersReducedMotion() ? FINAL : PHRASES[0], state: 'in' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const started = performance.now();
    let loadProgress = 0;
    let loaded = false;
    let lifted = false;
    const timers = [];

    // Real loading milestones: fonts, the Hero photograph and the window load event.
    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(() => {
      loadProgress += 30;
    });
    const hero = waitForHeroImage().then(() => {
      loadProgress += 55;
    });
    const windowLoad = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, { once: true });
    }).then(() => {
      loadProgress += 15;
    });
    Promise.all([fonts, hero, windowLoad]).then(() => {
      loaded = true;
    });
    // Never hold the visitor behind the intro on a slow connection.
    timers.push(
      setTimeout(() => {
        loaded = true;
      }, MAX_WAIT),
    );

    // Phrase sequence (skipped when reduced motion is requested).
    if (!reduce) {
      [...PHRASES.slice(1), FINAL].forEach((text, i) => {
        const at = (i + 1) * PHRASE_MS;
        timers.push(setTimeout(() => setPhrase((p) => ({ ...p, state: 'out' })), at - 360));
        timers.push(setTimeout(() => setPhrase({ text, state: 'in' }), at));
      });
    }

    const minDuration = reduce ? 400 : MIN_DURATION;
    let shown = 0;
    const tick = setInterval(() => {
      const timeProgress = Math.min(100, ((performance.now() - started) / minDuration) * 100);
      const target = Math.floor(Math.min(timeProgress, loaded ? 100 : Math.min(loadProgress, 96)));
      if (target > shown) {
        shown = target;
        setCount(shown);
      }
      if (shown >= 100 && !lifted) {
        lifted = true;
        clearInterval(tick);
        timers.push(setTimeout(lift, reduce ? 0 : 420));
      }
    }, reduce ? 100 : 190);

    function lift() {
      const root = rootRef.current;
      document.documentElement.classList.remove('is-intro');
      window.scrollTo(0, 0);
      markIntroLifting();

      if (reduce) {
        gsap.to(root, { autoAlpha: 0, duration: 0.25, onComplete: onDone });
        return;
      }
      // Slow, controlled upward lift that uncovers the Home page underneath.
      const tl = gsap.timeline({ onComplete: onDone });
      tl.to(root, { yPercent: -100, duration: 1.7, ease: EASE.lift }, 0);
      tl.to(stageRef.current, { yPercent: 38, opacity: 0.2, duration: 1.7, ease: EASE.lift }, 0);
    }

    return () => {
      clearInterval(tick);
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  return (
    <div className="intro" ref={rootRef}>
      <p className="sr-only" role="status">
        Loading Villa Cinnamoon Castle
      </p>
      <div className="intro__stage" ref={stageRef} aria-hidden="true">
        <span className={`intro__phrase is-${phrase.state}`} key={phrase.text}>
          {phrase.text}
        </span>
      </div>
      <div className="intro__meta" aria-hidden="true">
        <span>Arachchikanda</span>
        <Counter value={count} />
        <span>Hikkaduwa</span>
      </div>
    </div>
  );
}
