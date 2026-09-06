import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getDatesBetween } from '../utils/dateEngine.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/calendar/blocked-dates
 * Returns all dates (YYYY-MM-DD) that are unavailable due to APPROVED bookings.
 * These dates will be rendered in red and unclickable on customer calendars.
 */
router.get('/blocked-dates', async (req, res) => {
  try {
    const approvedBookings = await prisma.booking.findMany({
      where: { status: 'APPROVED' },
      select: { checkIn: true, checkOut: true, id: true }
    });

    const blockedSet = new Set();

    for (const booking of approvedBookings) {
      const dates = getDatesBetween(booking.checkIn, booking.checkOut);
      dates.forEach(d => blockedSet.add(d));
    }

    const blockedDates = Array.from(blockedSet).sort();

    res.json({
      success: true,
      blockedDates
    });
  } catch (error) {
    console.error('Error fetching blocked dates:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve calendar availability.' });
  }
});

export default router;
