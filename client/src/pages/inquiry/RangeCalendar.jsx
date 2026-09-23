import { useEffect, useRef, useState } from 'react';
import { addDays, addMonths, formatLong, fromKey, toKey, todayKey } from '../../lib/inquiry.js';
import './RangeCalendar.css';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthFormat = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
const MONTHS_AHEAD = 18;

function useMonthsVisible() {
  const query = '(min-width: 760px)';
  const [two, setTwo] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setTwo(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return two ? 2 : 1;
}

const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const monthIndex = (d) => d.getFullYear() * 12 + d.getMonth();

/**
 * One shared date-range calendar behind the Check-in and Check-out fields.
 * Arrow keys move by day/week, Page Up/Down by month, Home/End to week edges.
 */
export default function RangeCalendar({ checkIn, checkOut, choosing, onSelect }) {
  const months = useMonthsVisible();
  const today = todayKey();
  const firstMonth = startOfMonth(new Date());
  const lastMonth = addMonths(firstMonth, MONTHS_AHEAD);
  const maxKey = toKey(addDays(addMonths(lastMonth, 1), -1));

  const [view, setView] = useState(() => startOfMonth(checkIn ? fromKey(checkIn) : new Date()));
  const [focusKey, setFocusKey] = useState(checkIn ?? today);
  const [hoverKey, setHoverKey] = useState(null);
  const gridRef = useRef(null);
  const shouldFocus = useRef(false);

  const lastVisible = addMonths(view, months - 1);
  // Roving tabindex: keep one focusable day inside the visible months.
  const firstVisibleKey = toKey(view) < today ? today : toKey(view);
  const lastVisibleKey = toKey(addDays(addMonths(lastVisible, 1), -1));
  const tabKey = focusKey >= firstVisibleKey && focusKey <= lastVisibleKey ? focusKey : firstVisibleKey;
  const canPrev = monthIndex(view) > monthIndex(firstMonth);
  const canNext = monthIndex(lastVisible) < monthIndex(lastMonth);

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector(`[data-day="${focusKey}"]`)?.focus();
  }, [focusKey, view]);

  const moveFocus = (key) => {
    const clamped = key < today ? today : key > maxKey ? maxKey : key;
    const d = fromKey(clamped);
    if (monthIndex(d) < monthIndex(view)) setView(startOfMonth(d));
    else if (monthIndex(d) > monthIndex(lastVisible)) setView(addMonths(startOfMonth(d), -(months - 1)));
    shouldFocus.current = true;
    setFocusKey(clamped);
  };

  const onKeyDown = (event) => {
    const key = event.target.dataset?.day;
    if (!key) return;
    const d = fromKey(key);
    const weekPos = (d.getDay() + 6) % 7;
    const moves = {
      ArrowLeft: () => addDays(d, -1),
      ArrowRight: () => addDays(d, 1),
      ArrowUp: () => addDays(d, -7),
      ArrowDown: () => addDays(d, 7),
      Home: () => addDays(d, -weekPos),
      End: () => addDays(d, 6 - weekPos),
      PageUp: () => new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()),
      PageDown: () => new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
    };
    if (!moves[event.key]) return;
    event.preventDefault();
    moveFocus(toKey(moves[event.key]()));
  };

  // While choosing check-out, preview the range under the pointer or keyboard focus.
  const previewEnd = choosing === 'checkOut' && checkIn && !checkOut ? hoverKey : null;
  const rangeEnd = checkOut ?? (previewEnd && previewEnd > checkIn ? previewEnd : null);

  const renderMonth = (monthStart) => {
    const offset = (monthStart.getDay() + 6) % 7;
    const days = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < offset; i++) cells.push(<span key={`blank-${i}`} className="cal__blank" aria-hidden="true" />);
    for (let day = 1; day <= days; day++) {
      const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
      const key = toKey(date);
      const disabled = key < today || key > maxKey;
      const isStart = key === checkIn;
      const isEnd = key === checkOut;
      const inRange = checkIn && rangeEnd && key > checkIn && key < rangeEnd;
      const isPreviewEnd = !checkOut && key === rangeEnd;
      const classes = [
        'cal__day',
        isStart && 'is-start',
        isStart && rangeEnd && 'has-range',
        (isEnd || isPreviewEnd) && 'is-end',
        isPreviewEnd && 'is-preview',
        inRange && 'is-range',
        key === today && 'is-today',
        [5, 6, 0].includes(date.getDay()) && 'is-weekend',
      ]
        .filter(Boolean)
        .join(' ');
      const status = isStart ? ', check-in' : isEnd ? ', check-out' : inRange ? ', in your stay' : '';
      cells.push(
        <button
          key={key}
          type="button"
          className={classes}
          data-day={key}
          disabled={disabled}
          tabIndex={key === tabKey ? 0 : -1}
          aria-label={`${formatLong(key)}${status}${disabled ? ', not available to select' : ''}`}
          aria-pressed={isStart || isEnd}
          onClick={() => {
            setFocusKey(key);
            onSelect(key);
          }}
          onMouseEnter={() => setHoverKey(key)}
          onFocus={() => {
            setFocusKey(key);
            setHoverKey(key);
          }}
        >
          <span>{day}</span>
        </button>,
      );
    }
    return (
      <div className="cal__month" key={toKey(monthStart)}>
        <p className="cal__month-name">{monthFormat.format(monthStart)}</p>
        <div className="cal__weekdays" aria-hidden="true">
          {WEEKDAYS.map((name, i) => (
            <span key={name} className={i >= 4 ? 'is-weekend' : undefined}>
              {name}
            </span>
          ))}
        </div>
        <div className="cal__days">{cells}</div>
      </div>
    );
  };

  return (
    <div className="cal">
      <div className="cal__nav">
        <button
          type="button"
          className="cal__nav-btn"
          onClick={() => setView(addMonths(view, -1))}
          disabled={!canPrev}
          aria-label="Previous month"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 5 8 12 15 19" />
          </svg>
        </button>
        <button
          type="button"
          className="cal__nav-btn"
          onClick={() => setView(addMonths(view, 1))}
          disabled={!canNext}
          aria-label="Next month"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="9 5 16 12 9 19" />
          </svg>
        </button>
      </div>
      <div
        className={`cal__months cal__months--${months}`}
        ref={gridRef}
        onKeyDown={onKeyDown}
        onMouseLeave={() => setHoverKey(null)}
        role="group"
        aria-label="Choose dates"
      >
        {Array.from({ length: months }, (_, i) => renderMonth(addMonths(view, i)))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {Array.from({ length: months }, (_, i) => monthFormat.format(addMonths(view, i))).join(' and ')}
      </p>
      <p className="cal__legend">
        <span className="cal__legend-mark" aria-hidden="true" />
        Friday, Saturday and Sunday nights use weekend rates.
      </p>
    </div>
  );
}
