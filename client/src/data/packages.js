// Phase 1 package seed — Documents/01 Source Information/package_details.md §9.
// Rates, capacities and A/C classifications must match the official catalogue.
// Replace with the public packages API once the admin portal exists; the Home
// preview, the Stay Options comparison and the inquiry flow all read from here.
//
// `stay` groups the Non-A/C and A/C variants of one offer into a single public row.
export const packages = [
  { title: 'Weekend Standard — Non-A/C', type: 'WEEKEND', ac: 'NON_AC', rate: 21000, minGuests: 1, maxGuests: 15, stay: 'weekend-villa', active: true },
  { title: 'Weekend Premium — A/C', type: 'WEEKEND', ac: 'AC', rate: 23000, minGuests: 1, maxGuests: 15, stay: 'weekend-villa', active: true },
  { title: 'Couples Package', type: 'WEEKDAY', ac: 'NA', rate: 6500, minGuests: 1, maxGuests: 2, stay: 'couples', active: true },
  { title: 'Family Package', type: 'WEEKDAY', ac: 'NA', rate: 8500, minGuests: 3, maxGuests: 4, stay: 'family', active: true },
  { title: '2-Room Group — Non-A/C', type: 'WEEKDAY', ac: 'NON_AC', rate: 8500, minGuests: 1, maxGuests: 4, stay: 'two-bedroom', active: true },
  { title: '2-Room Group — A/C', type: 'WEEKDAY', ac: 'AC', rate: 10500, minGuests: 1, maxGuests: 4, stay: 'two-bedroom', active: true },
  { title: '3-Room Group — Non-A/C', type: 'WEEKDAY', ac: 'NON_AC', rate: 12500, minGuests: 5, maxGuests: 6, stay: 'three-bedroom', active: true },
  { title: '3-Room Group — A/C', type: 'WEEKDAY', ac: 'AC', rate: 14500, minGuests: 5, maxGuests: 6, stay: 'three-bedroom', active: true },
  { title: '4-Room Group — Non-A/C', type: 'WEEKDAY', ac: 'NON_AC', rate: 15500, minGuests: 7, maxGuests: 8, stay: 'four-bedroom', active: true },
  { title: '4-Room Group — A/C', type: 'WEEKDAY', ac: 'AC', rate: 17500, minGuests: 7, maxGuests: 8, stay: 'four-bedroom', active: true },
  { title: '5-Room Group — Non-A/C', type: 'WEEKDAY', ac: 'NON_AC', rate: 17900, minGuests: 9, maxGuests: 10, stay: 'five-bedroom', active: true },
  { title: '5-Room Group — A/C', type: 'WEEKDAY', ac: 'AC', rate: 19900, minGuests: 9, maxGuests: 10, stay: 'five-bedroom', active: true },
  { title: 'Full Villa — Non-A/C', type: 'WEEKDAY', ac: 'NON_AC', rate: 17900, minGuests: 11, maxGuests: 15, stay: 'full-villa', active: true },
  { title: 'Full Villa — A/C', type: 'WEEKDAY', ac: 'AC', rate: 19900, minGuests: 11, maxGuests: 15, stay: 'full-villa', active: true },
];

// Guest-oriented public labels (Stay Options IA). Bedrooms are counted, never named or numbered.
export const stayLabels = {
  'weekend-villa': { name: 'The whole villa', detail: 'All five bedrooms and every shared space' },
  couples: { name: 'Couples stay', detail: 'One bedroom' },
  family: { name: 'Family stay', detail: 'Family sleeping setup arranged by the host' },
  'two-bedroom': { name: 'Two bedrooms', detail: 'Two separate bedrooms' },
  'three-bedroom': { name: 'Three bedrooms', detail: 'Three bedrooms prepared' },
  'four-bedroom': { name: 'Four bedrooms', detail: 'Four bedrooms prepared' },
  'five-bedroom': { name: 'All five bedrooms', detail: 'Every bedroom prepared' },
  'full-villa': { name: 'Full villa', detail: 'Five bedrooms plus extra sleeping arrangements' },
};

/** One public row per stay: the Non-A/C (or flat) rate and the A/C rate, if offered. */
export function stayRows(type) {
  const rows = new Map();
  packages
    .filter((p) => p.active && p.type === type)
    .forEach((p) => {
      const row = rows.get(p.stay) ?? { key: p.stay, maxGuests: p.maxGuests, standard: null, ac: null, ...stayLabels[p.stay] };
      if (p.ac === 'AC') row.ac = p.rate;
      else row.standard = p.rate;
      row.maxGuests = Math.max(row.maxGuests, p.maxGuests);
      rows.set(p.stay, row);
    });
  return [...rows.values()].sort((a, b) => a.maxGuests - b.maxGuests || a.standard - b.standard);
}

export function rateFor(stay, ac) {
  return packages.find((p) => p.active && p.stay === stay && p.ac === ac)?.rate ?? null;
}

export function startingRate(type) {
  const rates = packages.filter((p) => p.active && p.type === type).map((p) => p.rate);
  return rates.length ? Math.min(...rates) : null;
}

export function formatRupees(amount) {
  return `Rs. ${amount.toLocaleString('en-LK')}`;
}
