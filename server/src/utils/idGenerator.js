/**
 * Generates an unambiguous, human-friendly Booking ID: VCC-YYYY-XXXXXX
 */
export function generateBookingId() {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VCC-${year}-${random}`;
}
