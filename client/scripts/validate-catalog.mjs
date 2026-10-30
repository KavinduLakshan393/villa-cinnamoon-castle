import { packages, stayLabels, stayRows } from '../src/data/packages.js';

const failures = [];
const seenCodes = new Set();
const seenVariants = new Set();

for (const item of packages) {
  const label = item.code || item.title || 'unknown package';
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.code ?? '')) failures.push(`${label}: invalid package code`);
  if (seenCodes.has(item.code)) failures.push(`${label}: duplicate package code`);
  seenCodes.add(item.code);
  if (!['WEEKDAY', 'WEEKEND'].includes(item.type)) failures.push(`${label}: invalid stay type`);
  if (!['NA', 'NON_AC', 'AC'].includes(item.ac)) failures.push(`${label}: invalid cooling type`);
  if (!Number.isFinite(item.rate) || item.rate < 0) failures.push(`${label}: invalid rate`);
  if (!Number.isInteger(item.minGuests) || !Number.isInteger(item.maxGuests)) failures.push(`${label}: guest limits must be integers`);
  if (item.minGuests < 1 || item.maxGuests > 15 || item.minGuests > item.maxGuests) failures.push(`${label}: invalid guest range`);
  if (!stayLabels[item.stay]) failures.push(`${label}: missing public stay label`);
  const variantKey = `${item.stay}:${item.ac}`;
  if (seenVariants.has(variantKey)) failures.push(`${label}: duplicate stay/cooling combination`);
  seenVariants.add(variantKey);
}

for (const type of ['WEEKDAY', 'WEEKEND']) {
  if (!packages.some((item) => item.active && item.type === type)) failures.push(`No active ${type.toLowerCase()} package`);
  for (const row of stayRows(type)) {
    if (row.standard === null) failures.push(`${row.key}: missing standard or flat rate`);
  }
}

if (failures.length) {
  console.error(`Package catalogue validation failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`Package catalogue valid: ${packages.length} variants across ${new Set(packages.map((item) => item.stay)).size} stays.`);

