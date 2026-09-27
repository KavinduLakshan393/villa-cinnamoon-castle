import { describe, expect, it } from 'vitest';
import { classifyNights, dateKey, parseDateKey } from './dates.js';

describe('date-only stay calculations', () => {
  it('classifies Friday, Saturday and Sunday nights as weekend nights', () => {
    const result = classifyNights(parseDateKey('2026-10-02', 'checkIn'), parseDateKey('2026-10-06', 'checkOut'));
    expect(result).toEqual({ WEEKDAY: 1, WEEKEND: 3, total: 4 });
  });

  it('keeps date-only values stable in UTC', () => {
    expect(dateKey(parseDateKey('2026-12-31', 'date'))).toBe('2026-12-31');
  });

  it('rejects impossible calendar dates', () => {
    expect(() => parseDateKey('2026-02-30', 'checkIn')).toThrow('valid calendar date');
  });

  it('rejects check-out on or before check-in', () => {
    const date = parseDateKey('2026-10-01', 'date');
    expect(() => classifyNights(date, date)).toThrow('after check-in');
  });
});
