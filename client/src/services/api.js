/**
 * Centralized API Service for Villa Cinnamoon Castle
 */

const API_BASE = '/api';

export const api = {
  // Calendar
  async getBlockedDates() {
    const res = await fetch(`${API_BASE}/calendar/blocked-dates`);
    return res.json();
  },

  // Bookings
  async createBooking(bookingData) {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return res.json();
  },

  async getBooking(id) {
    const res = await fetch(`${API_BASE}/bookings/${id}`);
    return res.json();
  },

  // Packages
  async getPackages() {
    const res = await fetch(`${API_BASE}/packages`);
    return res.json();
  },

  // Reviews
  async verifyReviewEligibility(payload) {
    const res = await fetch(`${API_BASE}/reviews/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async submitReview(payload) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getReviews() {
    const res = await fetch(`${API_BASE}/reviews`);
    return res.json();
  },

  // Admin Portal
  async adminLogin(usernameOrCreds, maybePassword) {
    const payload = typeof usernameOrCreds === 'string'
      ? { username: usernameOrCreds, password: maybePassword }
      : usernameOrCreds;
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getAdminBookings(status = 'ALL') {
    const res = await fetch(`${API_BASE}/admin/bookings?status=${status}`);
    return res.json();
  },

  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`);
    return res.json();
  },

  async approveBooking(id) {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}/approve`, {
      method: 'PATCH'
    });
    return res.json();
  },

  async declineBooking(id, reason) {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}/decline`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    return res.json();
  },

  async getAdminReviews() {
    const res = await fetch(`${API_BASE}/admin/reviews`);
    return res.json();
  },

  async moderateReview(id) {
    const res = await fetch(`${API_BASE}/admin/reviews/${id}/hide`, {
      method: 'PATCH'
    });
    return res.json();
  },

  async togglePinReview(id) {
    const res = await fetch(`${API_BASE}/admin/reviews/${id}/pin`, {
      method: 'PATCH'
    });
    return res.json();
  },

  async toggleHideReview(id) {
    const res = await fetch(`${API_BASE}/admin/reviews/${id}/hide`, {
      method: 'PATCH'
    });
    return res.json();
  }
};
