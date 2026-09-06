import React, { useState } from 'react';
import './DateCalendar.css';

export const DateCalendar = ({
  blockedDates = [],
  checkIn,
  checkOut,
  onDateRangeSelect
}) => {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const [rangeWarning, setRangeWarning] = useState('');

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  // First day of month & total days
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon...
  // Normalize to Monday start (0 = Mon, 6 = Sun)
  const mondayStartIndex = (firstDayIndex + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const todayStr = new Date().toISOString().split('T')[0];

  const handleDayClick = (day) => {
    setRangeWarning('');
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const selectedDate = new Date(`${dateStr}T00:00:00Z`);

    if (blockedDates.includes(dateStr)) return;

    if (!checkIn || (checkIn && checkOut)) {
      // Starting new selection
      onDateRangeSelect(selectedDate, null);
    } else if (checkIn && !checkOut) {
      // Second click: either same date (1-night inquiry) or range
      if (selectedDate < checkIn) {
        // Reset to new start date
        onDateRangeSelect(selectedDate, null);
      } else if (selectedDate.getTime() === checkIn.getTime()) {
        // Single date inquiry (1 night)
        const nextDay = new Date(selectedDate);
        nextDay.setUTCDate(nextDay.getUTCDate() + 1);
        onDateRangeSelect(selectedDate, nextDay);
      } else {
        // Date range: check for blocked dates in between
        let cur = new Date(checkIn);
        let hasBlocked = false;

        while (cur < selectedDate) {
          const curStr = cur.toISOString().split('T')[0];
          if (blockedDates.includes(curStr)) {
            hasBlocked = true;
            break;
          }
          cur.setUTCDate(cur.getUTCDate() + 1);
        }

        if (hasBlocked) {
          setRangeWarning('Selected range contains unavailable dates. Please select continuous open dates.');
          onDateRangeSelect(null, null);
        } else {
          onDateRangeSelect(checkIn, selectedDate);
        }
      }
    }
  };

  const isDaySelected = (dateStr) => {
    if (!checkIn) return false;
    const inStr = checkIn.toISOString().split('T')[0];
    if (inStr === dateStr) return 'start';
    if (checkOut) {
      const outStr = checkOut.toISOString().split('T')[0];
      if (outStr === dateStr) return 'end';
      const d = new Date(`${dateStr}T00:00:00Z`);
      if (d > checkIn && d < checkOut) return 'in-range';
    }
    return false;
  };

  return (
    <div className="vcc-calendar-wrapper">
      <div className="vcc-calendar-header">
        <div className="month-title">
          {monthNames[month]} {year}
        </div>
        <div className="calendar-nav-buttons">
          <button type="button" onClick={prevMonth} className="cal-nav-btn" aria-label="Previous Month">
            &larr;
          </button>
          <button type="button" onClick={nextMonth} className="cal-nav-btn" aria-label="Next Month">
            &rarr;
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot available"></span> Open
        </div>
        <div className="legend-item">
          <span className="legend-dot blocked"></span> Unavailable (Booked)
        </div>
        <div className="legend-item">
          <span className="legend-dot selected"></span> Selected
        </div>
      </div>

      {/* Grid */}
      <div className="calendar-week-names">
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
        <div>Su</div>
      </div>

      <div className="calendar-days-grid">
        {/* Empty slots for Monday offset */}
        {Array.from({ length: mondayStartIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="cal-day-cell empty"></div>
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isBlocked = blockedDates.includes(dateStr);
          const isPast = dateStr < todayStr;
          const selectedState = isDaySelected(dateStr);

          let cellClass = 'cal-day-cell';
          if (isBlocked) cellClass += ' blocked';
          if (isPast) cellClass += ' past';
          if (selectedState === 'start') cellClass += ' selected-start';
          if (selectedState === 'end') cellClass += ' selected-end';
          if (selectedState === 'in-range') cellClass += ' in-range';

          return (
            <button
              type="button"
              key={dateStr}
              disabled={isBlocked || isPast}
              onClick={() => handleDayClick(day)}
              className={cellClass}
              title={isBlocked ? 'Unavailable (Confirmed Booking)' : `${monthNames[month]} ${day}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {rangeWarning && (
        <div className="calendar-range-warning">
          ⚠️ {rangeWarning}
        </div>
      )}
    </div>
  );
};
