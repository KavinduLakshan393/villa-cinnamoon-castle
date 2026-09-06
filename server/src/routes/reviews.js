import express from 'express';
import { PrismaClient } from '@prisma/client';
import { validateAndSanitizePhone } from '../utils/phoneValidator.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * POST /api/reviews/verify
 * Check-In Date Gated Review Eligibility Verification
 */
router.post('/verify', async (req, res) => {
  try {
    const { bookingId, whatsAppNumber } = req.body;

    if (!bookingId || !whatsAppNumber) {
      return res.status(400).json({
        success: false,
        error: 'Both Booking ID and WhatsApp Number are required to verify your stay.'
      });
    }

    const sanitizedPhone = validateAndSanitizePhone(whatsAppNumber);
    if (!sanitizedPhone.valid) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid WhatsApp number.'
      });
    }

    // 1. Query booking
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId.trim().toUpperCase() },
      include: { reviews: true }
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking ID not found. Reviews are strictly reserved for guests with a confirmed booking.'
      });
    }

    // 2. Validate WhatsApp Number matches booking on file
    if (booking.whatsAppNumber !== sanitizedPhone.sanitized) {
      return res.status(403).json({
        success: false,
        error: 'The WhatsApp number entered does not match the reservation on file.'
      });
    }

    // 3. Validate Status is APPROVED
    if (booking.status !== 'APPROVED') {
      return res.status(403).json({
        success: false,
        error: `This booking is currently in ${booking.status} status. Only approved bookings are eligible for review.`
      });
    }

    // 4. Check-In Date Gate Rule: Unlocks on or after check-in date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkInDate = new Date(booking.checkIn);
    checkInDate.setHours(0, 0, 0, 0);

    if (today < checkInDate) {
      const checkInFormatted = checkInDate.toISOString().split('T')[0];
      return res.status(403).json({
        success: false,
        error: `Your review unlocks on your check-in date (${checkInFormatted}). We want you to experience the villa firsthand before sharing your thoughts!`
      });
    }

    // 5. Check if already reviewed
    if (booking.reviews && booking.reviews.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'A verified review has already been submitted for this booking.'
      });
    }

    // Eligible!
    res.json({
      success: true,
      eligible: true,
      guestName: booking.customerName,
      stayType: booking.packageName,
      checkIn: booking.checkIn
    });

  } catch (error) {
    console.error('Error verifying review eligibility:', error);
    res.status(500).json({ success: false, error: 'Failed to verify eligibility.' });
  }
});

/**
 * POST /api/reviews
 * Submit verified review
 */
router.post('/', async (req, res) => {
  try {
    const { bookingId, whatsAppNumber, rating, title, comment, stayType } = req.body;

    if (!bookingId || !rating || !comment) {
      return res.status(400).json({ success: false, error: 'Booking ID, rating, and feedback comment are required.' });
    }

    const ratingNum = parseInt(rating, 10);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ success: false, error: 'Rating must be a whole number between 1 and 5 stars.' });
    }

    if (comment.trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Please write a detailed feedback comment of at least 10 characters.' });
    }

    // Double check eligibility
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId.trim().toUpperCase() },
      include: { reviews: true }
    });

    if (!booking || booking.status !== 'APPROVED') {
      return res.status(403).json({ success: false, error: 'Invalid or unapproved booking.' });
    }

    if (booking.reviews && booking.reviews.length > 0) {
      return res.status(400).json({ success: false, error: 'A review has already been recorded for this booking.' });
    }

    const newReview = await prisma.review.create({
      data: {
        bookingId: booking.id,
        guestName: booking.customerName,
        rating: ratingNum,
        stayType: stayType || booking.packageName,
        title: title ? title.trim() : 'Sanctuary Experience',
        comment: comment.trim(),
        isPinned: false,
        isHidden: false
      }
    });

    res.status(201).json({
      success: true,
      review: newReview,
      message: 'Thank you! Your verified review has been published.'
    });

  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ success: false, error: 'Failed to submit review.' });
  }
});

/**
 * GET /api/reviews
 * Fetch public reviews (not hidden)
 */
router.get('/', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { isHidden: false },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    // Calculate rating stats
    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(2)
      : '5.00';

    res.json({
      success: true,
      reviews,
      stats: {
        totalReviews,
        avgRating
      }
    });
  } catch (error) {
    console.error('Error fetching public reviews:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve reviews.' });
  }
});

export default router;
