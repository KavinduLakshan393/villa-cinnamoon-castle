/**
 * Date calculation engine according to package_details.md and SRS.md
 * Check-in night determines classification:
 * Friday (5), Saturday (6), Sunday (0) = Weekend nights
 * Monday (1), Tuesday (2), Wednesday (3), Thursday (4) = Weekday nights
 */

export function classifyStayDates(checkInInput, checkOutInput) {
  const start = new Date(checkInInput);
  let end = checkOutInput ? new Date(checkOutInput) : null;

  // If user selected only one date (same day check-in / 1-night stay inquiry)
  if (!end || end <= start) {
    end = new Date(start);
    end.setDate(end.getDate() + 1);
  }

  // Normalize to UTC midnight
  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(0, 0, 0, 0);

  let cur = new Date(start);
  let weekendNights = 0;
  let weekdayNights = 0;
  const nightDates = [];

  while (cur < end) {
    const day = cur.getUTCDay(); // 0 = Sun, 5 = Fri, 6 = Sat
    const dateStr = cur.toISOString().split('T')[0];
    nightDates.push(dateStr);

    if (day === 5 || day === 6 || day === 0) {
      weekendNights++;
    } else {
      weekdayNights++;
    }

    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  const totalNights = weekendNights + weekdayNights;
  let dateType = 'WEEKDAY';

  if (weekendNights > 0 && weekdayNights === 0) {
    dateType = 'WEEKEND';
  } else if (weekendNights === 0 && weekdayNights > 0) {
    dateType = 'WEEKDAY';
  } else if (weekendNights > 0 && weekdayNights > 0) {
    dateType = 'MIXED';
  }

  return {
    checkIn: start,
    checkOut: end,
    totalNights,
    weekendNights,
    weekdayNights,
    dateType,
    nightDates
  };
}

/**
 * Returns formatted YYYY-MM-DD strings for all nights of a date range
 */
export function getDatesBetween(startDate, endDate) {
  const dates = [];
  const cur = new Date(startDate);
  const end = new Date(endDate);
  cur.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(0, 0, 0, 0);

  while (cur < end) {
    dates.push(cur.toISOString().split('T')[0]);
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}
