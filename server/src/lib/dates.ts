import { HttpError } from './http-error.js';

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_MS = 24 * 60 * 60 * 1000;

export function parseDateKey(value: string, fieldName: string): Date {
  const match = ISO_DATE.exec(value);
  if (!match) throw new HttpError(400, 'INVALID_DATE', `${fieldName} must use YYYY-MM-DD format.`);

  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (date.toISOString().slice(0, 10) !== value) {
    throw new HttpError(400, 'INVALID_DATE', `${fieldName} is not a valid calendar date.`);
  }
  return date;
}

export function dateKey(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export function todayInSriLanka(): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const read = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)!.value;
  return `${read('year')}-${read('month')}-${read('day')}`;
}

export type StayNightCounts = { WEEKDAY: number; WEEKEND: number; total: number };

export function classifyNights(checkIn: Date, checkOut: Date): StayNightCounts {
  const total = Math.round((checkOut.getTime() - checkIn.getTime()) / DAY_MS);
  if (total < 1) throw new HttpError(400, 'INVALID_DATE_RANGE', 'Check-out must be after check-in.');
  if (total > 365) throw new HttpError(400, 'STAY_TOO_LONG', 'A stay cannot be longer than 365 nights.');

  let weekday = 0;
  let weekend = 0;
  for (let offset = 0; offset < total; offset += 1) {
    const day = new Date(checkIn.getTime() + offset * DAY_MS).getUTCDay();
    if (day === 0 || day === 5 || day === 6) weekend += 1;
    else weekday += 1;
  }
  return { WEEKDAY: weekday, WEEKEND: weekend, total };
}
