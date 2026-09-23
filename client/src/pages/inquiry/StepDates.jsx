import { useRef, useState } from 'react';
import Button from '../../components/Button.jsx';
import RangeCalendar from './RangeCalendar.jsx';
import { describeSplit, formatShort, plural } from '../../lib/inquiry.js';

export default function StepDates({ state, update, stay, onContinue }) {
  const { checkIn, checkOut } = state;
  const [choosing, setChoosing] = useState(checkIn && !checkOut ? 'checkOut' : 'checkIn');
  const [showError, setShowError] = useState(false);
  const checkInRef = useRef(null);
  const checkOutRef = useRef(null);

  const select = (key) => {
    setShowError(false);
    if (choosing === 'checkOut' && checkIn && key > checkIn) {
      update({ checkOut: key });
      setChoosing('checkIn');
      return;
    }
    // A new check-in keeps an existing check-out only when it still comes after it.
    const keepOut = choosing === 'checkIn' && checkOut && key < checkOut;
    update({ checkIn: key, checkOut: keepOut ? checkOut : null });
    setChoosing(keepOut ? 'checkIn' : 'checkOut');
  };

  const guidance = !checkIn
    ? 'Choose your check-in date.'
    : !checkOut
      ? 'Now choose your check-out date. One-night stays are welcome.'
      : null;

  const next = () => {
    if (stay) {
      onContinue();
      return;
    }
    setShowError(true);
    (checkIn ? checkOutRef : checkInRef).current?.focus();
    setChoosing(checkIn ? 'checkOut' : 'checkIn');
  };

  const field = (name, ref, label, value, time) => (
    <button
      ref={ref}
      type="button"
      className={`date-field${choosing === name ? ' is-active' : ''}${value ? ' has-value' : ''}`}
      aria-pressed={choosing === name}
      onClick={() => setChoosing(name)}
    >
      <span className="date-field__label">{label}</span>
      <span className="date-field__value">{value ? formatShort(value) : 'Add date'}</span>
      <span className="date-field__time">{time}</span>
    </button>
  );

  return (
    <div className="step">
      <h2 className="step__heading" id="step-heading" tabIndex={-1}>
        When would you like to stay?
      </h2>

      <div className="date-fields" role="group" aria-label="Stay dates. Select a field, then choose a date in the calendar.">
        {field('checkIn', checkInRef, 'Check-in', checkIn, 'From 1:00 PM')}
        <span className="date-fields__arrow" aria-hidden="true">
          →
        </span>
        {field('checkOut', checkOutRef, 'Check-out', checkOut, 'By 10:00 AM')}
      </div>

      <div className="step__card">
        <RangeCalendar checkIn={checkIn} checkOut={checkOut} choosing={choosing} onSelect={select} />
      </div>

      <div className="stay-feedback" aria-live="polite">
        {stay ? (
          <>
            <p className="stay-feedback__nights">
              <strong>{plural(stay.nights, 'night')}</strong>
              <span className={`type-badge type-badge--${stay.type}`}>{stay.label}</span>
              {stay.type === 'mixed' && <span className="stay-feedback__split">{describeSplit(stay)}</span>}
            </p>
            <p className="caption">Availability is confirmed by the host after you send the inquiry.</p>
          </>
        ) : (
          <p className={`stay-feedback__guide${showError ? ' is-error' : ''}`}>
            {showError && (
              <span className="error-icon" aria-hidden="true">
                !
              </span>
            )}
            {guidance}
          </p>
        )}
      </div>

      <div className="step__actions">
        {(checkIn || checkOut) && (
          <button
            type="button"
            className="text-button"
            onClick={() => {
              update({ checkIn: null, checkOut: null });
              setChoosing('checkIn');
            }}
          >
            Clear dates
          </button>
        )}
        <Button onClick={next} aria-disabled={!stay} className={!stay ? 'is-inactive' : ''}>
          Continue
        </Button>
      </div>
    </div>
  );
}
