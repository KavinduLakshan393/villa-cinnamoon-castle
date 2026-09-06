import React from 'react';

export const SummaryCard = ({
  checkIn,
  checkOut,
  totalNights,
  weekendNights,
  weekdayNights,
  dateType,
  guestCount,
  selectedPackage,
  selectedMixedWeekday,
  totalPrice
}) => {
  const perPersonPerNight = (totalPrice > 0 && guestCount > 0 && totalNights > 0)
    ? Math.round(totalPrice / (guestCount * totalNights))
    : 0;

  const formatDate = (date) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <aside style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: '32px 28px',
      boxShadow: 'var(--shadow-card)',
      position: 'sticky',
      top: '100px'
    }}>
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.4rem',
        paddingBottom: '16px',
        marginBottom: '20px',
        borderBottom: '1px solid var(--border-hairline)'
      }}>
        Reservation Summary
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.92rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Check-in:</span>
          <strong>{formatDate(checkIn)}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Check-out:</span>
          <strong>{formatDate(checkOut)}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Duration:</span>
          <span>
            {totalNights > 0 ? (
              `${totalNights} ${totalNights === 1 ? 'Night' : 'Nights'} (${weekendNights} Wknd / ${weekdayNights} Wkday)`
            ) : (
              '—'
            )}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Stay Type:</span>
          <span style={{
            fontWeight: 700,
            color: dateType === 'WEEKEND' ? 'var(--color-gold)' : dateType === 'WEEKDAY' ? 'var(--cinnamon-secondary)' : 'var(--cinnamon-primary)'
          }}>
            {dateType || '—'}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>Guests:</span>
          <strong>{guestCount} Guests</strong>
        </div>

        <div style={{
          marginTop: '8px',
          paddingTop: '12px',
          borderTop: '1px dashed var(--border-hairline)'
        }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px' }}>Package:</div>
          <div style={{ fontWeight: 700, color: 'var(--cinnamon-primary)', lineHeight: 1.3 }}>
            {selectedPackage ? selectedPackage.title : '—'}
            {dateType === 'MIXED' && selectedMixedWeekday && (
              <span style={{ display: 'block', color: 'var(--text-dark)', fontSize: '0.85rem', marginTop: '4px' }}>
                + {selectedMixedWeekday.title}
              </span>
            )}
          </div>
        </div>

        {/* Total Cost Highlight */}
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-hairline)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline'
        }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Estimated Total:</span>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'var(--cinnamon-primary)'
          }}>
            Rs. {totalPrice.toLocaleString()}/=
          </span>
        </div>

        {perPersonPerNight > 0 && (
          <div style={{
            textAlign: 'right',
            fontSize: '0.82rem',
            color: 'var(--cinnamon-secondary)',
            fontWeight: 600
          }}>
            ~Rs. {perPersonPerNight.toLocaleString()} per guest / night
          </div>
        )}
      </div>
    </aside>
  );
};
