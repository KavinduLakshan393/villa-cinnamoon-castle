// Inquiry flow logic (Inquiry Flow UX Architecture + SRS §3.2). Pure functions only;
// the page components own state and presentation.
import { packages, stayRows, formatRupees } from '../data/packages.js';
import { site } from '../data/site.js';

/* ---------- Dates (local calendar days, stored as YYYY-MM-DD) ---------- */

const pad = (n) => String(n).padStart(2, '0');
export const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const fromKey = (key) => {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
};
export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);
export const todayKey = () => toKey(new Date());

// Friday, Saturday and Sunday nights use weekend rates.
export const isWeekendNight = (d) => [5, 6, 0].includes(d.getDay());

const shortFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const longFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const formatShort = (key) => shortFormat.format(fromKey(key));
export const formatLong = (key) => longFormat.format(fromKey(key));

export const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

/** Night-by-night classification of a stay. */
export function classifyStay(checkIn, checkOut) {
  if (!checkIn || !checkOut || checkOut <= checkIn) return null;
  let weekend = 0;
  let weekday = 0;
  for (let d = fromKey(checkIn); toKey(d) < checkOut; d = addDays(d, 1)) {
    if (isWeekendNight(d)) weekend += 1;
    else weekday += 1;
  }
  const type = weekend && weekday ? 'mixed' : weekend ? 'weekend' : 'weekday';
  const label = { mixed: 'Mixed stay', weekend: 'Weekend stay', weekday: 'Weekday stay' }[type];
  return { nights: weekend + weekday, weekend, weekday, type, label };
}

export function describeSplit(stay) {
  if (stay.type !== 'mixed') return plural(stay.nights, 'night');
  return `${plural(stay.weekend, 'weekend night')} + ${plural(stay.weekday, 'weekday night')}`;
}

/* ---------- Stay options ---------- */

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 15;

/** Eligible weekday stays, smallest first; the first is the recommendation. */
export function weekdayOptions(guests) {
  return stayRows('WEEKDAY')
    .filter((row) => row.maxGuests >= guests)
    .map((row, i) => ({ ...row, recommended: i === 0 }));
}

export const weekendOption = () => stayRows('WEEKEND')[0] ?? null;

export function isWeekdayChoiceValid(choice, guests) {
  if (!choice) return false;
  const row = weekdayOptions(guests).find((r) => r.key === choice.stay);
  return Boolean(row && (choice.cooling === 'ac' ? row.ac : row.standard));
}

const coolingLabel = (cooling) => (cooling === 'ac' ? 'with A/C' : 'without A/C');

/** Resolves a choice to its public name, official package title and nightly rate. */
function resolve(stayKey, cooling, rows) {
  const row = rows.find((r) => r.key === stayKey);
  if (!row) return null;
  const rate = cooling === 'ac' ? row.ac : row.standard;
  if (rate === null) return null;
  const pkg = packages.find(
    (p) => p.active && p.stay === stayKey && (cooling === 'ac' ? p.ac === 'AC' : p.ac !== 'AC'),
  );
  const flat = row.ac === null; // Couples and Family stays have one rate.
  return {
    name: flat ? row.name : `${row.name}, ${coolingLabel(cooling)}`,
    title: pkg?.title ?? row.name,
    rate,
  };
}

/** Estimate lines per date type and the total. Returns null until every needed choice is valid. */
export function estimate(state) {
  const stay = classifyStay(state.checkIn, state.checkOut);
  if (!stay) return null;
  const lines = [];
  if (stay.weekend) {
    const villa = weekendOption();
    const choice = villa && state.weekend && resolve(villa.key, state.weekend.cooling, [villa]);
    if (!choice) return null;
    lines.push({ portion: 'Weekend', nights: stay.weekend, ...choice, subtotal: stay.weekend * choice.rate });
  }
  if (stay.weekday) {
    if (!isWeekdayChoiceValid(state.weekday, state.guests)) return null;
    const choice = resolve(state.weekday.stay, state.weekday.cooling, weekdayOptions(state.guests));
    lines.push({ portion: 'Weekday', nights: stay.weekday, ...choice, subtotal: stay.weekday * choice.rate });
  }
  return { stay, lines, total: lines.reduce((sum, line) => sum + line.subtotal, 0) };
}

/* ---------- Contact details ---------- */

export const countries = [
  { code: '94', label: 'Sri Lanka (+94)' },
  { code: '91', label: 'India (+91)' },
  { code: '960', label: 'Maldives (+960)' },
  { code: '44', label: 'United Kingdom (+44)' },
  { code: '49', label: 'Germany (+49)' },
  { code: '33', label: 'France (+33)' },
  { code: '31', label: 'Netherlands (+31)' },
  { code: '41', label: 'Switzerland (+41)' },
  { code: '39', label: 'Italy (+39)' },
  { code: '7', label: 'Russia (+7)' },
  { code: '1', label: 'United States / Canada (+1)' },
  { code: '61', label: 'Australia (+61)' },
  { code: '86', label: 'China (+86)' },
  { code: '81', label: 'Japan (+81)' },
  { code: '971', label: 'United Arab Emirates (+971)' },
  { code: 'other', label: 'Other — include the country code' },
];

export const REQUESTS_LIMIT = 500;

const SL_MOBILE = /^(?:0|94|\+94)?(7[01245678]\d{7})$/;
const E164 = /^\+?[1-9]\d{6,14}$/;

/** Validates and normalises a WhatsApp number to +CC… form. */
export function checkPhone(country, raw) {
  const value = (raw ?? '').replace(/[\s\-().]/g, '');
  if (!value) return { error: 'Enter your WhatsApp number.' };
  if (country === '94') {
    const match = value.match(SL_MOBILE);
    return match
      ? { normalized: `+94${match[1]}` }
      : { error: 'Enter a Sri Lankan mobile number, for example 071 234 5678.' };
  }
  if (country === 'other') {
    return value.startsWith('+') && E164.test(value)
      ? { normalized: value }
      : { error: 'Enter the full number starting with + and the country code, for example +44 7700 900123.' };
  }
  const full = `+${country}${value.replace(/^\+/, '').replace(/^0/, '')}`;
  return E164.test(full)
    ? { normalized: full }
    : { error: 'Enter the number without the country code, for example 7700 900123.' };
}

export function checkName(name) {
  return (name ?? '').trim().length >= 3 ? null : 'Enter your full name (at least 3 characters).';
}

/* ---------- WhatsApp handoff ---------- */

const lkr = (amount) => formatRupees(amount).replace('Rs.', 'LKR');

export function buildMessage(state, est, phone) {
  const { stay } = est;
  const lines = [
    'Villa Cinnamoon Castle — Stay Inquiry',
    '',
    `Check-in: ${formatShort(state.checkIn)} — from 1:00 PM`,
    `Check-out: ${formatShort(state.checkOut)} — by 10:00 AM`,
    `Nights: ${stay.nights} — ${stay.label}${stay.type === 'mixed' ? ` (${describeSplit(stay)})` : ''}`,
    '',
    `Guests: ${state.guests}`,
  ];
  if (est.lines.length === 1) {
    const [line] = est.lines;
    lines.push(`Stay option: ${line.name} (${line.title})`, `Rate: ${lkr(line.rate)} per night`);
  } else {
    est.lines.forEach((line) => {
      lines.push(`${line.portion} nights: ${line.name} (${line.title})`);
      lines.push(`  ${plural(line.nights, 'night')} × ${lkr(line.rate)} = ${lkr(line.subtotal)}`);
    });
  }
  lines.push(
    `Estimated total: ${lkr(est.total)}`,
    '',
    `Name: ${state.name.trim()}`,
    `WhatsApp: ${phone}`,
    '',
    'Special requests:',
    state.requests.trim() || 'None',
    '',
    'Sent from the Villa Cinnamoon Castle website.',
  );
  return lines.join('\n');
}

export const whatsappUrl = (message) => `${site.whatsapp.href}?text=${encodeURIComponent(message)}`;

/* ---------- Session-scoped state (NFR-PRV-02) ---------- */

const STORAGE_KEY = 'vcc-inquiry';

export const initialInquiry = {
  checkIn: null,
  checkOut: null,
  guests: 2,
  weekday: null,
  weekend: null,
  name: '',
  country: '94',
  phone: '',
  requests: '',
  consent: false,
};

export function loadInquiry() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null');
    if (!saved) return initialInquiry;
    const state = { ...initialInquiry, ...saved };
    // Dates that have passed are dropped; everything else is kept.
    if (state.checkIn && state.checkIn < todayKey()) {
      state.checkIn = null;
      state.checkOut = null;
    }
    return state;
  } catch {
    return initialInquiry;
  }
}

export function saveInquiry(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Storage can be unavailable (private mode); the form still works. */
  }
}
