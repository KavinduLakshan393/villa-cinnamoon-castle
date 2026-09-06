import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { GatedReviewModal } from '../components/reviews/GatedReviewModal';
import KineticButton from '../components/common/KineticButton';
import { 
  Star, ShieldCheck, CheckCircle, MessageSquarePlus, 
  Lock, Calendar, Heart, Award, ArrowRight 
} from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await api.getReviews();
      if (res.success && res.reviews) {
        setReviews(res.reviews);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  // Compute average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : '5.0';

  return (
    <div style={{ background: 'var(--cinnamon-950)', color: '#fff', paddingBottom: '6rem' }}>
      {/* Header Banner */}
      <section style={{
        padding: '7rem 1.5rem 4rem',
        background: 'linear-gradient(rgba(26, 17, 13, 0.9), rgba(26, 17, 13, 0.95)), var(--cinnamon-900)',
        borderBottom: '1px solid rgba(212, 163, 115, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <span style={{
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--gold-400)'
          }}>
            100% Genuine Guest Feedback
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#fff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            Verified Guest Reviews
          </h1>
          <p style={{ color: 'var(--sand-200)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            We only accept reviews from guests who have stayed at Villa Cinnamoon Castle. Every review is cryptographically gated by Booking ID and Check-In Date verification.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="kinetic-btn kinetic-btn--primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1.75rem' }}
          >
            <MessageSquarePlus size={18} /> Write a Verified Review
          </button>
        </div>
      </section>

      {/* Aggregate Score Bar */}
      <div style={{ maxWidth: '1100px', margin: '3rem auto 0', padding: '0 1.5rem' }}>
        <div style={{
          background: 'rgba(212, 163, 115, 0.05)',
          border: '1px solid rgba(212, 163, 115, 0.25)',
          borderRadius: '16px',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--gold-400)', lineHeight: 1 }}>
              {avgRating}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '0.5rem 0', color: '#fbbf24' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" />
              ))}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--sand-300)' }}>
              Based on {reviews.length} Verified Stays
            </div>
          </div>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.25rem' }}>
              <ShieldCheck size={22} /> 100% Gated Authenticity
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--sand-300)', maxWidth: '280px', margin: '0 auto' }}>
              Submissions strictly unlocked on or after verified arrival date.
            </div>
          </div>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-400)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.25rem' }}>
              <Award size={22} /> Superhost Concierge
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--sand-300)', maxWidth: '280px', margin: '0 auto' }}>
              Dedicated host support for private barbecues & transfers.
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{ marginTop: '3.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--sand-300)' }}>
              Loading guest reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '16px',
              border: '1px solid rgba(212, 163, 115, 0.2)'
            }}>
              <p style={{ color: 'var(--sand-300)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                No public reviews found yet. Be the first to share your experience!
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="kinetic-btn kinetic-btn--primary"
              >
                Submit the First Review
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '18px',
                    border: '1px solid rgba(212, 163, 115, 0.2)',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', gap: '3px', color: '#fbbf24' }}>
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={16} fill="#fbbf24" />
                        ))}
                      </div>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem',
                        color: '#10b981',
                        background: 'rgba(16, 185, 129, 0.1)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '20px',
                        fontWeight: 600
                      }}>
                        <CheckCircle size={12} /> Verified Stay
                      </span>
                    </div>

                    {rev.title && (
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>
                        "{rev.title}"
                      </h4>
                    )}

                    <p style={{ color: 'var(--sand-200)', fontSize: '0.95rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                      "{rev.comment}"
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(212, 163, 115, 0.15)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--gold-400)', fontSize: '0.95rem' }}>
                        {rev.guestName}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--sand-400)' }}>
                        {rev.stayType || 'Private Stay'} • {rev.stayMonth || new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gated Modal */}
      <GatedReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}
