import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { 
  ShieldCheck, Lock, CheckCircle, XCircle, 
  MessageSquare, Calendar, Users, DollarSign, 
  Eye, EyeOff, RefreshCw, AlertCircle, LogOut 
} from 'lucide-react';

export default function AdminPage() {
  const { refreshBlockedDates } = useBooking();

  // Auth State
  const [token, setToken] = useState(localStorage.getItem('vcc_admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'reviews' | 'stats'
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  // Decline Modal State
  const [declineModal, setDeclineModal] = useState({ open: false, bookingId: '', reason: '' });
  const [actionNotice, setActionNotice] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await api.adminLogin(username.trim(), password.trim());
      if (res.success && res.token) {
        setToken(res.token);
        localStorage.setItem('vcc_admin_token', res.token);
      } else {
        setLoginError(res.message || 'Invalid username or password.');
      }
    } catch (err) {
      setLoginError('Server connection error during login.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('vcc_admin_token');
  };

  const fetchDashboardData = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const [bRes, rRes, sRes] = await Promise.all([
        api.getAdminBookings(token),
        api.getAdminReviews(token),
        api.getAdminStats(token)
      ]);

      if (bRes.success) setBookings(bRes.bookings || []);
      if (rRes.success) setReviews(rRes.reviews || []);
      if (sRes.success) setStats(sRes.stats || null);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      if (err.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // 1-Click Approve Booking
  const handleApprove = async (id) => {
    try {
      const res = await api.approveBooking(id, token);
      if (res.success) {
        setActionNotice(`Booking ${id} APPROVED! Dates are now blocked red on public calendar.`);
        refreshBlockedDates();
        fetchDashboardData();
        if (res.whatsAppLink) {
          window.open(res.whatsAppLink, '_blank');
        }
      }
    } catch (err) {
      alert('Failed to approve booking: ' + err.message);
    }
  };

  // Decline Booking with reason
  const handleDeclineSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.declineBooking(declineModal.bookingId, declineModal.reason, token);
      if (res.success) {
        setActionNotice(`Booking ${declineModal.bookingId} DECLINED.`);
        setDeclineModal({ open: false, bookingId: '', reason: '' });
        fetchDashboardData();
        if (res.whatsAppLink) {
          window.open(res.whatsAppLink, '_blank');
        }
      }
    } catch (err) {
      alert('Failed to decline booking: ' + err.message);
    }
  };

  // Toggle Review Status
  const handleToggleReview = async (id, currentApproved) => {
    try {
      const res = await api.moderateReview(id, !currentApproved, token);
      if (res.success) {
        fetchDashboardData();
      }
    } catch (err) {
      alert('Failed to update review status.');
    }
  };

  // LOGIN VIEW
  if (!token) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--cinnamon-950)',
        color: '#fff'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(26, 17, 13, 0.95)',
          borderRadius: '20px',
          border: '1px solid rgba(212, 163, 115, 0.3)',
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(212, 163, 115, 0.15)',
              color: 'var(--gold-400)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Lock size={26} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff' }}>
              Admin Operations Portal
            </h2>
            <p style={{ color: 'var(--sand-300)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Villa Cinnamoon Castle Estate Management
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--gold-400)', marginBottom: '0.3rem', fontWeight: 600 }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(212, 163, 115, 0.3)',
                  background: 'rgba(0,0,0,0.4)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--gold-400)', marginBottom: '0.3rem', fontWeight: 600 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(212, 163, 115, 0.3)',
                  background: 'rgba(0,0,0,0.4)',
                  color: '#fff',
                  fontSize: '0.95rem'
                }}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--sand-400)', marginTop: '0.3rem' }}>
                Default: <code>admin</code> / <code>admin123</code>
              </div>
            </div>

            {loginError && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                padding: '0.6rem 0.8rem',
                borderRadius: '6px',
                fontSize: '0.85rem'
              }}>
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="kinetic-btn kinetic-btn--primary"
              style={{ justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {isLoggingIn ? 'Verifying...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div style={{ background: 'var(--cinnamon-950)', color: '#fff', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Top Bar */}
      <div style={{
        background: 'rgba(26, 17, 13, 0.95)',
        borderBottom: '1px solid rgba(212, 163, 115, 0.2)',
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShieldCheck size={26} color="var(--gold-400)" />
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#fff', margin: 0 }}>
              Villa Cinnamoon Castle • Admin Desk
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--sand-300)' }}>Host Operations & Reservation Control</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={fetchDashboardData}
            style={{
              background: 'transparent',
              border: '1px solid rgba(212, 163, 115, 0.3)',
              color: 'var(--sand-200)',
              padding: '0.5rem 0.8rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#fca5a5',
              padding: '0.5rem 0.8rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
        {actionNotice && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            color: '#6ee7b7',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{actionNotice}</span>
            <button onClick={() => setActionNotice('')} style={{ background: 'none', border: 'none', color: '#6ee7b7', cursor: 'pointer', fontWeight: 700 }}>✕</button>
          </div>
        )}

        {/* Stats Overview Grid */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(212, 163, 115, 0.2)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--sand-400)', textTransform: 'uppercase' }}>Total Inquiries</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginTop: '0.25rem' }}>{stats.totalBookings || 0}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(212, 163, 115, 0.2)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--sand-400)', textTransform: 'uppercase' }}>Pending Approvals</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#f59e0b', marginTop: '0.25rem' }}>{stats.pendingBookings || 0}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(212, 163, 115, 0.2)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--sand-400)', textTransform: 'uppercase' }}>Approved Stays</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#10b981', marginTop: '0.25rem' }}>{stats.approvedBookings || 0}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(212, 163, 115, 0.2)' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--sand-400)', textTransform: 'uppercase' }}>Blocked Red Dates</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ef4444', marginTop: '0.25rem' }}>{stats.blockedDatesCount || 0}</div>
            </div>
          </div>
        )}

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid rgba(212, 163, 115, 0.2)', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('bookings')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'bookings' ? 'var(--gold-400)' : 'transparent',
              color: activeTab === 'bookings' ? '#1a110d' : 'var(--sand-300)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Reservation Inquiries ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'reviews' ? 'var(--gold-400)' : 'transparent',
              color: activeTab === 'reviews' ? '#1a110d' : 'var(--sand-300)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Review Moderation ({reviews.length})
          </button>
        </div>

        {/* TAB 1: BOOKINGS LIST */}
        {activeTab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--sand-400)' }}>
                No reservation inquiries found.
              </div>
            ) : (
              bookings.map((b) => {
                const isPending = b.status === 'PENDING';
                const isApproved = b.status === 'APPROVED';
                const isDeclined = b.status === 'DECLINED';

                return (
                  <div
                    key={b.id}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '16px',
                      border: isApproved ? '1px solid #10b981' : isDeclined ? '1px solid #ef4444' : '1px solid #f59e0b',
                      padding: '1.5rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '1.5rem',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <strong style={{ fontSize: '1.1rem', color: 'var(--gold-400)' }}>{b.id}</strong>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          background: isApproved ? 'rgba(16, 185, 129, 0.2)' : isDeclined ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: isApproved ? '#10b981' : isDeclined ? '#ef4444' : '#f59e0b'
                        }}>
                          {b.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 600 }}>{b.guestName}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--sand-300)' }}>
                        WhatsApp: <a href={`https://wa.me/${b.guestPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-400)' }}>{b.guestPhone}</a>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--sand-400)' }}>Dates & Stay</div>
                      <div style={{ fontWeight: 600 }}>{b.checkInDate} → {b.checkOutDate}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--sand-300)' }}>
                        {b.guestCount} Guests • LKR {b.totalPrice ? b.totalPrice.toLocaleString() : 'N/A'}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--sand-400)' }}>Special Requests</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--sand-200)', fontStyle: b.specialRequests ? 'normal' : 'italic' }}>
                        {b.specialRequests || 'None provided'}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                      {isPending && (
                        <>
                          <button
                            onClick={() => handleApprove(b.id)}
                            style={{
                              background: '#10b981',
                              color: '#fff',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              fontWeight: 700,
                              fontSize: '0.85rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              cursor: 'pointer'
                            }}
                          >
                            <CheckCircle size={15} /> Approve & Lock Dates
                          </button>
                          <button
                            onClick={() => setDeclineModal({ open: true, bookingId: b.id, reason: '' })}
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid #ef4444',
                              color: '#fca5a5',
                              padding: '0.5rem 0.8rem',
                              borderRadius: '8px',
                              fontWeight: 600,
                              fontSize: '0.85rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              cursor: 'pointer'
                            }}
                          >
                            <XCircle size={15} /> Decline
                          </button>
                        </>
                      )}

                      {isApproved && (
                        <a
                          href={`https://wa.me/${b.guestPhone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(b.guestName)},%20your%20stay%20at%20Villa%20Cinnamoon%20Castle%20(${b.id})%20is%20confirmed!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: 'rgba(16, 185, 129, 0.2)',
                            color: '#10b981',
                            textDecoration: 'none',
                            padding: '0.5rem 0.8rem',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <MessageSquare size={14} /> Open Guest WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--sand-400)' }}>
                No guest reviews found.
              </div>
            ) : (
              reviews.map((r) => (
                <div
                  key={r.id}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '16px',
                    border: '1px solid rgba(212, 163, 115, 0.2)',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div style={{ maxWidth: '700px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                      <strong style={{ color: 'var(--gold-400)' }}>{r.guestName}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--sand-400)' }}>
                        Booking: {r.bookingId} • Rating: {'★'.repeat(r.rating || 5)}
                      </span>
                    </div>
                    {r.title && <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>"{r.title}"</div>}
                    <div style={{ color: 'var(--sand-200)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      "{r.comment}"
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleToggleReview(r.id, r.isApproved)}
                      style={{
                        background: r.isApproved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        border: r.isApproved ? '1px solid #10b981' : '1px solid #ef4444',
                        color: r.isApproved ? '#10b981' : '#fca5a5',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer'
                      }}
                    >
                      {r.isApproved ? <Eye size={15} /> : <EyeOff size={15} />}
                      {r.isApproved ? 'Publicly Visible' : 'Hidden from Public'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Decline Reason Modal */}
      {declineModal.open && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--cinnamon-900)',
            border: '1px solid rgba(212, 163, 115, 0.3)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '450px',
            width: '100%'
          }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>
              Decline Inquiry {declineModal.bookingId}
            </h3>
            <p style={{ color: 'var(--sand-300)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Specify the reason so a pre-filled, courteous WhatsApp notification can be generated for the guest.
            </p>

            <form onSubmit={handleDeclineSubmit}>
              <textarea
                rows={3}
                required
                placeholder="e.g. Villa scheduled for maintenance or booked offline for those dates..."
                value={declineModal.reason}
                onChange={(e) => setDeclineModal({ ...declineModal, reason: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(212, 163, 115, 0.3)',
                  background: 'rgba(0,0,0,0.4)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  marginBottom: '1.25rem'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setDeclineModal({ open: false, bookingId: '', reason: '' })}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(212, 163, 115, 0.3)',
                    color: 'var(--sand-300)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: '#ef4444',
                    border: 'none',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Confirm Decline & Notify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
