import React, { useState } from 'react';
import { api } from '../../services/api';

export const GatedReviewModal = ({ isOpen, onClose, onReviewSubmitted }) => {
  const [step, setStep] = useState('verify'); // 'verify' | 'form' | 'success'
  const [bookingId, setBookingId] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [verifiedGuest, setVerifiedGuest] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Review form fields
  const [rating, setRating] = useState(5);
  const [stayType, setStayType] = useState('Family Vacation');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleVerify = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await api.verifyReviewEligibility({
        bookingId: bookingId.trim().toUpperCase(),
        whatsAppNumber: whatsAppNumber.trim()
      });

      if (res.success && res.eligible) {
        setVerifiedGuest(res);
        setStayType(res.stayType || 'Family Vacation');
        setStep('form');
      } else {
        setErrorMsg(res.error || 'Unable to verify reservation. Please check your Booking ID and WhatsApp number.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to verification server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (comment.trim().length < 10) {
      setErrorMsg('Please share detailed feedback of at least 10 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.submitReview({
        bookingId: bookingId.trim().toUpperCase(),
        whatsAppNumber: whatsAppNumber.trim(),
        rating,
        title: title.trim() || 'Peaceful Sanctuary Stay',
        comment: comment.trim(),
        stayType
      });

      if (res.success) {
        setStep('success');
        if (onReviewSubmitted) onReviewSubmitted(res.review);
      } else {
        setErrorMsg(res.error || 'Failed to submit review.');
      }
    } catch (err) {
      setErrorMsg('Network error submitting review.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('verify');
    setBookingId('');
    setWhatsAppNumber('');
    setErrorMsg('');
    setVerifiedGuest(null);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(10, 10, 12, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={handleClose}>
      
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '560px',
        padding: '36px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        position: 'relative',
        maxHeight: '90vh',
        overflowY: 'auto'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '1.6rem',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
        >
          &times;
        </button>

        {/* STEP 1: Verify Reservation Gate */}
        {step === 'verify' && (
          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--cinnamon-primary)', fontWeight: 700 }}>
              Verified Guest Review Gate
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', margin: '8px 0 12px' }}>
              Confirm Your Stay
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
              To protect community integrity and authenticity, reviews unlock on or after your arrival date and require an approved reservation.
            </p>

            {errorMsg && (
              <div style={{
                backgroundColor: '#FEE2E2',
                border: '1px solid #F87171',
                color: '#991B1B',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                marginBottom: '20px',
                lineHeight: 1.5
              }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleVerify}>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  Booking ID *
                </label>
                <input
                  type="text"
                  placeholder="e.g. VCC-2026-X7K2P9"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-hairline)',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    textTransform: 'uppercase'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 076 100 7686 or +94 76 100 7686"
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-hairline)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--cinnamon-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'background-color 0.2s'
                }}
              >
                {loading ? 'Verifying...' : 'Verify & Unlock Review Form →'}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Unlocked Review Form */}
        {step === 'form' && (
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '8px' }}>
              <span>✓ Verified Reservation</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '6px' }}>
              Welcome, {verifiedGuest?.guestName}!
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Thank you for choosing Villa Cinnamoon Castle. Share your authentic impressions with future travelers.
            </p>

            {errorMsg && (
              <div style={{
                backgroundColor: '#FEE2E2',
                border: '1px solid #F87171',
                color: '#991B1B',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                marginBottom: '16px'
              }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmitReview}>
              {/* Star Rating Picker */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  Rating (1 to 5 Stars) *
                </label>
                <div style={{ display: 'flex', gap: '8px', fontSize: '1.8rem', cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      style={{ color: star <= rating ? 'var(--color-gold)' : '#D1D5DB', transition: 'color 0.15s' }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Stay Type */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  Stay Type *
                </label>
                <select
                  value={stayType}
                  onChange={(e) => setStayType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-hairline)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.92rem'
                  }}
                >
                  <option value="Family Vacation">Family Vacation</option>
                  <option value="Family Reunion">Family Reunion</option>
                  <option value="Couples Retreat">Couples Retreat</option>
                  <option value="Group Gathering">Group Gathering</option>
                  <option value="Holiday Celebration">Holiday Celebration</option>
                </select>
              </div>

              {/* Headline */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  Review Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Unforgettable weekend with family and peaceful nature!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-hairline)',
                    fontSize: '0.92rem'
                  }}
                />
              </div>

              {/* Detailed Comments */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  Detailed Impressions * (Min 10 characters)
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell future guests about the rooms, air conditioning, kitchen facilities, BBQ courtyard, and host hospitality..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-hairline)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--cinnamon-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Publishing...' : 'Publish Verified Review 🌿'}
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <span style={{ fontSize: '3rem' }}>🏰</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', margin: '12px 0 8px' }}>
              Thank You!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Your verified review has been published and is now visible in the community reviews section.
            </p>
            <button
              onClick={handleClose}
              style={{
                padding: '12px 28px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--cinnamon-primary)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
