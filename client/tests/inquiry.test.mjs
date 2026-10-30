import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMessage,
  checkPhone,
  classifyStay,
  estimate,
  whatsappUrl,
} from '../src/lib/inquiry.js';

const mixedState = {
  checkIn: '2026-11-06',
  checkOut: '2026-11-10',
  guests: 8,
  weekend: { cooling: 'standard' },
  weekday: { stay: 'four-bedroom', cooling: 'ac' },
  name: 'Kavindu Lakshan',
  requests: 'Please prepare the BBQ grill.',
};

test('classifies Friday through Sunday as weekend nights', () => {
  assert.deepEqual(classifyStay(mixedState.checkIn, mixedState.checkOut), {
    nights: 4,
    weekend: 3,
    weekday: 1,
    type: 'mixed',
    label: 'Mixed stay',
  });
});

test('calculates a mixed stay from the static catalogue', () => {
  const quote = estimate(mixedState);
  assert.equal(quote.lines.length, 2);
  assert.equal(quote.lines[0].subtotal, 63_000);
  assert.equal(quote.lines[1].subtotal, 17_500);
  assert.equal(quote.total, 80_500);
});

test('normalises Sri Lankan and international WhatsApp numbers', () => {
  assert.deepEqual(checkPhone('94', '071 234 5678'), { normalized: '+94712345678' });
  assert.deepEqual(checkPhone('other', '+44 7700 900123'), { normalized: '+447700900123' });
  assert.ok(checkPhone('94', '123').error);
});

test('builds a direct WhatsApp message without claiming a stored reference', () => {
  const quote = estimate(mixedState);
  const message = buildMessage(mixedState, quote, '+94712345678', null);
  assert.match(message, /Estimated total: LKR 80,500/);
  assert.match(message, /Estimate only — availability and the final price are confirmed by the host\./);
  assert.match(message, /Kavindu Lakshan/);
  assert.match(message, /Please prepare the BBQ grill\./);
  assert.doesNotMatch(message, /Reference:/);
  assert.equal(
    whatsappUrl(message),
    `https://wa.me/94761007686?text=${encodeURIComponent(message)}`,
  );
});

