import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button.jsx';
import BackButton from './BackButton.jsx';
import { formatRupees } from '../../data/packages.js';
import {
  MAX_GUESTS,
  MIN_GUESTS,
  isWeekdayChoiceValid,
  plural,
  weekdayOptions,
  weekendOption,
} from '../../lib/inquiry.js';

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="choice__check">
    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

function Choice({ name, value, checked, onChange, label, price, context }) {
  return (
    <label className={`choice${checked ? ' is-checked' : ''}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <CheckIcon />
      <span className="choice__label">
        <span className="sr-only">{context}, </span>
        {label}
      </span>
      <span className="choice__price">
        {formatRupees(price)}
        <span className="choice__unit"> / night</span>
      </span>
    </label>
  );
}

function GuestStepper({ guests, onChange }) {
  const [draft, setDraft] = useState(String(guests));
  useEffect(() => setDraft(String(guests)), [guests]);

  const commit = (value) => {
    const n = Number.parseInt(value, 10);
    const clamped = Number.isNaN(n) ? guests : Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, n));
    setDraft(String(clamped));
    if (clamped !== guests) onChange(clamped);
  };

  return (
    <div className="guests">
      <label htmlFor="guest-count" className="field__label">
        Number of guests
      </label>
      <div className="stepper">
        <button
          type="button"
          className="stepper__btn"
          onClick={() => onChange(Math.max(MIN_GUESTS, guests - 1))}
          disabled={guests <= MIN_GUESTS}
          aria-label="Remove a guest"
        >
          −
        </button>
        <input
          id="guest-count"
          className="stepper__input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value.replace(/\D/g, '').slice(0, 2));
          }}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit(e.currentTarget.value);
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              onChange(Math.min(MAX_GUESTS, guests + 1));
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              onChange(Math.max(MIN_GUESTS, guests - 1));
            }
          }}
          aria-describedby="guest-hint"
        />
        <button
          type="button"
          className="stepper__btn"
          onClick={() => onChange(Math.min(MAX_GUESTS, guests + 1))}
          disabled={guests >= MAX_GUESTS}
          aria-label="Add a guest"
        >
          +
        </button>
      </div>
      <p id="guest-hint" className="field__hint">
        {guests > 10
          ? 'Groups above 10 use extra sleeping arrangements, confirmed with the host.'
          : `From ${MIN_GUESTS} to ${MAX_GUESTS} guests, including children.`}
      </p>
    </div>
  );
}

const CoolingNote = () => (
  <p className="cooling-note">
    <strong>With A/C:</strong> air conditioning in two bedrooms. The other bedrooms have stand fans.
  </p>
);

function WeekendChoice({ state, update, nights, mixed }) {
  const villa = weekendOption();
  if (!villa) return null;
  const cooling = state.weekend?.cooling;
  return (
    <fieldset className="portion">
      <legend className="portion__legend">
        {mixed ? 'Weekend nights' : 'Your weekend stay'}
        <span className="portion__nights">{plural(nights, 'night')}</span>
      </legend>
      <div className={`option is-selected`}>
        <div className="option__head">
          <p className="option__name">{villa.name}</p>
          <p className="option__meta">
            Up to {villa.maxGuests} guests · {villa.detail}
          </p>
        </div>
        <div className="option__choices">
          <Choice
            name="weekend-choice"
            value="standard"
            checked={cooling === 'standard'}
            onChange={() => update({ weekend: { cooling: 'standard' } })}
            label="Without A/C"
            price={villa.standard}
            context={villa.name}
          />
          <Choice
            name="weekend-choice"
            value="ac"
            checked={cooling === 'ac'}
            onChange={() => update({ weekend: { cooling: 'ac' } })}
            label="With A/C"
            price={villa.ac}
            context={villa.name}
          />
        </div>
      </div>
      <CoolingNote />
    </fieldset>
  );
}

function WeekdayChoice({ state, update, nights, mixed }) {
  const options = weekdayOptions(state.guests);
  const selected = state.weekday;
  const pick = (stay, cooling) => update({ weekday: { stay, cooling } });

  return (
    <fieldset className="portion">
      <legend className="portion__legend">
        {mixed ? 'Weekday nights' : 'Your weekday stay'}
        <span className="portion__nights">{plural(nights, 'night')}</span>
      </legend>
      <p className="field__hint portion__hint">
        Showing options for {plural(state.guests, 'guest')}. You can choose a larger option for more space.
      </p>
      <div className="options">
        {options.map((row) => {
          const isSelected = selected?.stay === row.key;
          return (
            <div key={row.key} className={`option${isSelected ? ' is-selected' : ''}`}>
              <div className="option__head">
                <p className="option__name">
                  {row.name}
                  {row.recommended && <span className="option__badge">Recommended for your group</span>}
                </p>
                <p className="option__meta">
                  Up to {row.maxGuests} guests · {row.detail}
                </p>
              </div>
              <div className="option__choices">
                {row.ac === null ? (
                  <>
                    <Choice
                      name="weekday-choice"
                      value={`${row.key}:standard`}
                      checked={isSelected}
                      onChange={() => pick(row.key, 'standard')}
                      label="Stand fans"
                      price={row.standard}
                      context={row.name}
                    />
                    <p className="option__note">A/C not offered</p>
                  </>
                ) : (
                  <>
                    <Choice
                      name="weekday-choice"
                      value={`${row.key}:standard`}
                      checked={isSelected && selected.cooling === 'standard'}
                      onChange={() => pick(row.key, 'standard')}
                      label="Without A/C"
                      price={row.standard}
                      context={row.name}
                    />
                    <Choice
                      name="weekday-choice"
                      value={`${row.key}:ac`}
                      checked={isSelected && selected.cooling === 'ac'}
                      onChange={() => pick(row.key, 'ac')}
                      label="With A/C"
                      price={row.ac}
                      context={row.name}
                    />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <CoolingNote />
    </fieldset>
  );
}

export default function StepStay({ state, update, stay, summary, onBack, onContinue, announce }) {
  const [showError, setShowError] = useState(false);
  const previousGuests = useRef(state.guests);

  // Pre-select the recommendation and replace choices that no longer fit the group.
  useEffect(() => {
    const patch = {};
    if (stay.weekday && !isWeekdayChoiceValid(state.weekday, state.guests)) {
      const [recommended] = weekdayOptions(state.guests);
      if (recommended) {
        patch.weekday = { stay: recommended.key, cooling: 'standard' };
        if (state.weekday && previousGuests.current !== state.guests) {
          announce(`Your weekday option changed to ${recommended.name} to fit ${plural(state.guests, 'guest')}.`);
        }
      }
    }
    if (stay.weekend && !state.weekend) patch.weekend = { cooling: 'standard' };
    previousGuests.current = state.guests;
    if (Object.keys(patch).length) update(patch);
  }, [state.guests, state.weekday, state.weekend, stay.weekday, stay.weekend, update, announce]);

  const ready =
    (!stay.weekday || isWeekdayChoiceValid(state.weekday, state.guests)) && (!stay.weekend || state.weekend);

  const next = () => {
    if (ready) onContinue();
    else setShowError(true);
  };

  return (
    <div className="step">
      <h2 className="step__heading" id="step-heading" tabIndex={-1}>
        Choose an option for your group.
      </h2>

      <GuestStepper guests={state.guests} onChange={(guests) => update({ guests })} />

      {/* Mixed stays: weekend portion first, then weekday (Inquiry IA). */}
      {stay.weekend > 0 && (
        <WeekendChoice state={state} update={update} nights={stay.weekend} mixed={stay.type === 'mixed'} />
      )}
      {stay.weekday > 0 && (
        <WeekdayChoice state={state} update={update} nights={stay.weekday} mixed={stay.type === 'mixed'} />
      )}

      {showError && !ready && (
        <p className="form-error" role="alert">
          <span className="error-icon" aria-hidden="true">
            !
          </span>
          Choose a stay option for each part of your stay.
        </p>
      )}

      <div className="inline-summary">{summary}</div>

      <div className="step__actions">
        <BackButton onClick={onBack} />
        <Button onClick={next}>Continue</Button>
      </div>
    </div>
  );
}
