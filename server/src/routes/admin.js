import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * POST /api/admin/login
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password required.' });
    }

    const admin = await prisma.admin.findUnique({ where: { username: username.trim() } });
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
    }

    const validPass = await bcrypt.compare(password, admin.passwordHash);
    if (!validPass) {
      return res.status(401).json({ success: false, error: 'Invalid admin credentials.' });
    }

    res.json({
      success: true,
      message: 'Admin authenticated successfully.',
      admin: { username: admin.username }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, error: 'Authentication failed.' });
  }
});

/**
 * GET /api/admin/bookings
 */
router.get('/bookings', async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status && status !== 'ALL') {
      where.status = status.toUpperCase();
    }

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching admin bookings:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve bookings.' });
  }
});

/**
 * PATCH /api/admin/bookings/:id/approve
 * Approves booking & generates WhatsApp approval notification link for the guest
 */
router.patch('/bookings/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({ where: { id: id.toUpperCase() } });
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found.' });
    }

    const updated = await prisma.booking.update({
      where: { id: id.toUpperCase() },
      data: {
        status: 'APPROVED',
        declineReason: null
      }
    });

    // Format WhatsApp notification message to customer
    const checkInStr = updated.checkIn.toISOString().split('T')[0];
    const checkOutStr = updated.checkOut.toISOString().split('T')[0];
    const waText = `Dear ${updated.customerName}! 🏰\nGreat news from Villa Cinnamoon Castle! Your booking #${updated.id} for ${checkInStr} to ${checkOutStr} (${updated.totalNights} nights) has been APPROVED!\nTotal Amount: Rs. ${updated.totalPrice.toLocaleString()}/=\nWe look forward to welcoming you to our peaceful cinnamon estate in Arachchikanda, Hikkaduwa.`;
    
    // Clean target WhatsApp number (digits only for wa.me URL)
    const targetDigits = updated.whatsAppNumber.replace(/\+/g, '');
    const customerWhatsAppUrl = `https://wa.me/${targetDigits}?text=${encodeURIComponent(waText)}`;

    res.json({
      success: true,
      booking: updated,
      whatsappDispatchUrl: customerWhatsAppUrl,
      message: 'Booking has been approved! Calendar dates are now blocked.'
    });
  } catch (error) {
    console.error('Error approving booking:', error);
    res.status(500).json({ success: false, error: 'Failed to approve booking.' });
  }
});

/**
 * PATCH /api/admin/bookings/:id/decline
 * Declines booking with custom reason & generates WhatsApp decline notification link
 */
router.patch('/bookings/:id/decline', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason || reason.trim().length < 5) {
      return res.status(400).json({ success: false, error: 'Please specify a valid decline reason (at least 5 characters).' });
    }

    const booking = await prisma.booking.findUnique({ where: { id: id.toUpperCase() } });
    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found.' });
    }

    const updated = await prisma.booking.update({
      where: { id: id.toUpperCase() },
      data: {
        status: 'DECLINED',
        declineReason: reason.trim()
      }
    });

    // Format WhatsApp notification message to customer
    const waText = `Dear ${updated.customerName},\nRegarding your reservation inquiry #${updated.id} at Villa Cinnamoon Castle:\nWe are unable to confirm your booking at this time for the following reason:\n"${reason.trim()}"\n\nPlease feel free to contact us for alternate dates or inquiries. Thank you!`;
    const targetDigits = updated.whatsAppNumber.replace(/\+/g, '');
    const customerWhatsAppUrl = `https://wa.me/${targetDigits}?text=${encodeURIComponent(waText)}`;

    res.json({
      success: true,
      booking: updated,
      whatsappDispatchUrl: customerWhatsAppUrl,
      message: 'Booking inquiry marked as declined.'
    });
  } catch (error) {
    console.error('Error declining booking:', error);
    res.status(500).json({ success: false, error: 'Failed to decline booking.' });
  }
});

/**
 * GET /api/admin/reviews
 */
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve reviews.' });
  }
});

/**
 * PATCH /api/admin/reviews/:id/pin
 */
router.patch('/reviews/:id/pin', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ success: false, error: 'Review not found.' });

    const updated = await prisma.review.update({
      where: { id },
      data: { isPinned: !review.isPinned }
    });

    res.json({ success: true, review: updated });
  } catch (error) {
    console.error('Error toggling pin:', error);
    res.status(500).json({ success: false, error: 'Failed to update review pin.' });
  }
});

/**
 * PATCH /api/admin/reviews/:id/hide
 */
router.patch('/reviews/:id/hide', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ success: false, error: 'Review not found.' });

    const updated = await prisma.review.update({
      where: { id },
      data: { isHidden: !review.isHidden }
    });

    res.json({ success: true, review: updated });
  } catch (error) {
    console.error('Error toggling hide:', error);
    res.status(500).json({ success: false, error: 'Failed to update review visibility.' });
  }
});

/**
 * GET /api/admin/stats
 */
router.get('/stats', async (req, res) => {
  try {
    const totalBookings = await prisma.booking.count();
    const pendingBookings = await prisma.booking.count({ where: { status: 'PENDING' } });
    const approvedBookings = await prisma.booking.count({ where: { status: 'APPROVED' } });

    const approvedList = await prisma.booking.findMany({
      where: { status: 'APPROVED' },
      select: { checkIn: true, checkOut: true }
    });

    let blockedDatesCount = 0;
    approvedList.forEach((b) => {
      const cur = new Date(b.checkIn);
      const end = new Date(b.checkOut);
      while (cur <= end) {
        blockedDatesCount++;
        cur.setDate(cur.getDate() + 1);
      }
    });

    res.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        approvedBookings,
        blockedDatesCount
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve stats.' });
  }
});

export default router;
