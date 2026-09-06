import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateAndSanitizePhone } from '../utils/phoneValidator.js';
import { classifyStayDates, getDatesBetween } from '../utils/dateEngine.js';
import { generateBookingId } from '../utils/idGenerator.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * POST /api/bookings
 * Create new reservation inquiry (status: PENDING)
 */
router.post('/', async (req, res) => {
  try {
    const customerName = req.body.customerName || req.body.guestName;
    const whatsAppNumber = req.body.whatsAppNumber || req.body.guestPhone;
    const checkIn = req.body.checkIn || req.body.checkInDate;
    const checkOut = req.body.checkOut || req.body.checkOutDate;
    const guestCount = req.body.guestCount;
    const packageId = req.body.packageId;
    const mixedWeekdayPkgId = req.body.mixedWeekdayPkgId;
    const notes = req.body.notes || req.body.specialRequests || '';

    // 1. Validate customer name
    if (!customerName || customerName.trim().length < 3) {
      return res.status(400).json({ success: false, error: 'Full name must be at least 3 characters long.' });
    }

    // 2. Validate & sanitize WhatsApp number using Regex
    const phoneResult = validateAndSanitizePhone(whatsAppNumber);
    if (!phoneResult.valid) {
      return res.status(400).json({ success: false, error: phoneResult.error });
    }

    // 3. Process Dates & Classify Stay Type
    if (!checkIn) {
      return res.status(400).json({ success: false, error: 'Please select your preferred check-in date.' });
    }

    const stay = classifyStayDates(checkIn, checkOut);

    // 4. Verify no overlap with APPROVED bookings
    const approvedBookings = await prisma.booking.findMany({
      where: { status: 'APPROVED' },
      select: { checkIn: true, checkOut: true }
    });

    const requestedDates = new Set(stay.nightDates);

    for (const b of approvedBookings) {
      const bookedDates = getDatesBetween(b.checkIn, b.checkOut);
      for (const d of bookedDates) {
        if (requestedDates.has(d)) {
          return res.status(400).json({
            success: false,
            error: `Date ${d} is already booked. Please choose open dates highlighted in green/white.`
          });
        }
      }
    }

    // 5. Look up primary package and calculate price
    const primaryPkg = await prisma.package.findUnique({ where: { id: packageId } });
    if (!primaryPkg) {
      return res.status(400).json({ success: false, error: 'Selected package is invalid or does not exist.' });
    }

    let totalPrice = 0;
    let mixedWeekdayPkg = null;

    if (stay.dateType === 'WEEKEND') {
      totalPrice = stay.totalNights * primaryPkg.rate;
    } else if (stay.dateType === 'WEEKDAY') {
      totalPrice = stay.totalNights * primaryPkg.rate;
    } else if (stay.dateType === 'MIXED') {
      // Mixed stay calculation: Weekend rate for weekend nights + Weekday rate for weekday nights
      const weekendCost = stay.weekendNights * primaryPkg.rate;

      let weekdayRate = 17900; // default full buyout fallback
      if (mixedWeekdayPkgId) {
        mixedWeekdayPkg = await prisma.package.findUnique({ where: { id: mixedWeekdayPkgId } });
        if (mixedWeekdayPkg) {
          weekdayRate = mixedWeekdayPkg.rate;
        }
      }
      const weekdayCost = stay.weekdayNights * weekdayRate;
      totalPrice = weekendCost + weekdayCost;
    }

    // 6. Generate Booking ID and save to database
    let bookingId = generateBookingId();
    // Ensure uniqueness
    let exists = await prisma.booking.findUnique({ where: { id: bookingId } });
    while (exists) {
      bookingId = generateBookingId();
      exists = await prisma.booking.findUnique({ where: { id: bookingId } });
    }

    const newBooking = await prisma.booking.create({
      data: {
        id: bookingId,
        customerName: customerName.trim(),
        whatsAppNumber: phoneResult.sanitized,
        checkIn: stay.checkIn,
        checkOut: stay.checkOut,
        totalNights: stay.totalNights,
        weekendNights: stay.weekendNights,
        weekdayNights: stay.weekdayNights,
        dateType: stay.dateType,
        guestCount: parseInt(guestCount, 10) || 2,
        packageId: primaryPkg.id,
        packageName: primaryPkg.title,
        mixedWeekdayPkgId: mixedWeekdayPkg ? mixedWeekdayPkg.id : null,
        mixedWeekdayPkgName: mixedWeekdayPkg ? mixedWeekdayPkg.title : null,
        notes: notes ? notes.trim() : null,
        status: 'PENDING',
        totalPrice
      }
    });

    // 7. Format WhatsApp deep-link for instant customer-to-host inquiry
    const checkInStr = stay.checkIn.toISOString().split('T')[0];
    const checkOutStr = stay.checkOut.toISOString().split('T')[0];
    const waMessage = `Hello Villa Cinnamoon Castle! 🏰\nI would like to inquire about booking #${bookingId}.\nGuest: ${customerName}\nDates: ${checkInStr} to ${checkOutStr} (${stay.totalNights} nights)\nGuests: ${newBooking.guestCount}\nPackage: ${primaryPkg.title}\nEstimated Total: Rs. ${totalPrice.toLocaleString()}/=`;
    const hostWhatsAppUrl = `https://wa.me/94761007686?text=${encodeURIComponent(waMessage)}`;

    res.status(201).json({
      success: true,
      booking: newBooking,
      whatsappUrl: hostWhatsAppUrl,
      message: 'Your reservation inquiry has been received. Our host will review and respond via WhatsApp shortly.'
    });

  } catch (error) {
    console.error('Error creating booking inquiry:', error);
    res.status(500).json({ success: false, error: 'Failed to submit booking inquiry. Please try again.' });
  }
});

/**
 * GET /api/bookings/:id
 * Retrieve booking status and details
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: { id: id.toUpperCase() },
      select: {
        id: true,
        customerName: true,
        checkIn: true,
        checkOut: true,
        totalNights: true,
        guestCount: true,
        packageName: true,
        status: true,
        declineReason: true,
        totalPrice: true,
        createdAt: true
      }
    });

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking ID not found.' });
    }

    res.json({ success: true, booking });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve booking.' });
  }
});

export default router;
