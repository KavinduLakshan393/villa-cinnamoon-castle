import { formatRupees } from '../../data/packages.js';
import { describeSplit, formatShort, plural } from '../../lib/inquiry.js';

function EditButton({ onClick, label }) {
  return (
    <button type="button" className="summary__edit" onClick={onClick}>
      Edit<span className="sr-only"> {label}</span>
    </button>
  );
}

/** Stay summary. `showOptions` is false until the visitor has reached Step 2. */
export default function Summary({ state, stay, est, showOptions, onEdit, editBefore = 4, liveTotal = false }) {
  // Edit links only point back to earlier steps.
  const canEdit = (target) => Boolean(onEdit) && target < editBefore;
  if (!stay) {
    return (
      <div className="summary summary--empty">
        <p className="summary__title">Your stay</p>
        <p className="summary__empty">Choose your dates to see the options and an estimated total.</p>
        <p className="summary__assure">
          Sending an inquiry doesn’t reserve your dates. The host confirms availability, the final amount and payment
          on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="summary">
      <p className="summary__title">Your stay</p>
      <dl className="summary__list">
        <div className="summary__row">
          <dt>Dates</dt>
          <dd>
            {formatShort(state.checkIn)} – {formatShort(state.checkOut)}
            <span className="summary__sub">
              {plural(stay.nights, 'night')} · {stay.label}
              {stay.type === 'mixed' && ` (${describeSplit(stay)})`}
            </span>
          </dd>
          {canEdit(1) && <EditButton onClick={() => onEdit(1)} label="dates" />}
        </div>
        {showOptions && (
          <div className="summary__row">
            <dt>Guests</dt>
            <dd>{plural(state.guests, 'guest')}</dd>
            {canEdit(2) && <EditButton onClick={() => onEdit(2)} label="guests" />}
          </div>
        )}
        {showOptions &&
          est?.lines.map((line) => (
            <div className="summary__row" key={line.portion}>
              <dt>{est.lines.length > 1 ? `${line.portion} nights` : 'Stay option'}</dt>
              <dd>
                {line.name}
                <span className="summary__sub">
                  {plural(line.nights, 'night')} × {formatRupees(line.rate)}
                </span>
              </dd>
              {canEdit(2) && <EditButton onClick={() => onEdit(2)} label={`${line.portion.toLowerCase()} stay option`} />}
            </div>
          ))}
      </dl>
      {showOptions && est && (
        <div className="summary__total" aria-live={liveTotal ? 'polite' : 'off'}>
          <span>Estimated total</span>
          <strong>{formatRupees(est.total)}</strong>
        </div>
      )}
      <p className="summary__assure">
        This is an estimate. Sending an inquiry doesn’t reserve your dates; the host confirms availability and the
        final amount on WhatsApp.
      </p>
    </div>
  );
}
