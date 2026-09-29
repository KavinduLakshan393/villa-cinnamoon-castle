import { describe, expect, it } from 'vitest';
import { decisionWhatsappUrl, whatsappDecisionMessage } from './inquiries.routes.js';

const inquiry = {
  customerName: 'Test Customer',
  reference: 'VCC-20260927-ABC12345',
  checkIn: new Date('2026-10-10T00:00:00.000Z'),
  checkOut: new Date('2026-10-12T00:00:00.000Z'),
} as never;

describe('admin inquiry WhatsApp handoff', () => {
  it('creates an acceptance message containing the customer, reference and dates', () => {
    const message = whatsappDecisionMessage(inquiry, 'ACCEPTED');
    expect(message).toContain('Hello Test Customer');
    expect(message).toContain('VCC-20260927-ABC12345');
    expect(message).toContain('2026-10-10 to 2026-10-12');
    expect(message).toContain('has been accepted');
  });

  it('creates a rejection message without claiming it was sent', () => {
    const message = whatsappDecisionMessage(inquiry, 'REJECTED');
    expect(message).toContain('unable to accept');
    expect(message).toContain('alternative dates');
  });

  it('opens the exact customer number with an encoded draft message', () => {
    const url = decisionWhatsappUrl('+94712345678', 'Hello & thank you');
    expect(url).toBe('https://wa.me/94712345678?text=Hello%20%26%20thank%20you');
  });
});
