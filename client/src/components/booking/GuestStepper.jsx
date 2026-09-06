import React from 'react';

export const GuestStepper = ({ guests, onChange }) => {
  const handleMinus = () => {
    if (guests > 1) onChange(guests - 1);
  };

  const handlePlus = () => {
    if (guests < 15) onChange(guests + 1);
  };

  const getRecommendation = (count) => {
    if (count <= 2) {
      return {
        title: 'Couples Package (Rs. 6,500/night)',
        desc: 'Ideal romantic escape with 1 master suite, private hot bath, and full kitchen access.'
      };
    }
    if (count <= 4) {
      return {
        title: 'Family Package or 2-Room Group (from Rs. 8,500/night)',
        desc: 'Comfortable family stay with 2 allocated bedrooms and garden play area.'
      };
    }
    if (count <= 6) {
      return {
        title: '3-Room Group Package (from Rs. 12,500/night)',
        desc: 'Spacious 3-bedroom setup with ground living room and kitchen facilities.'
      };
    }
    if (count <= 8) {
      return {
        title: '4-Room Group Package (from Rs. 15,500/night)',
        desc: 'Generous 4-suite accommodation for large families or friends traveling together.'
      };
    }
    if (count <= 10) {
      return {
        title: '5-Room Group Package (from Rs. 17,900/night)',
        desc: 'Full bedroom occupancy for groups up to 10 pax with access to all living spaces.'
      };
    }
    return {
      title: 'Full Private Villa Buyout (up to 15 Guests)',
      desc: 'Exclusive private buyout of the entire estate, both floors, and BBQ courtyard pavilion.'
    };
  };

  const recommendation = getRecommendation(guests);

  return (
    <div className="guest-stepper-container" style={{ margin: '24px 0' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px',
        backgroundColor: '#FFFFFF',
        boxShadow: 'var(--shadow-soft)'
      }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: '1.15rem', display: 'block', color: 'var(--text-dark)' }}>
            Total Guests
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Adults & children (standard capacity: 10, expandable to 15)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            type="button"
            onClick={handleMinus}
            disabled={guests <= 1}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '1px solid var(--border-hairline)',
              backgroundColor: 'var(--surface-muted)',
              cursor: guests <= 1 ? 'not-allowed' : 'pointer',
              fontSize: '1.4rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-dark)',
              transition: 'all 0.2s'
            }}
          >
            &minus;
          </button>

          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.8rem',
            fontWeight: 700,
            minWidth: '36px',
            textAlign: 'center',
            color: 'var(--cinnamon-primary)'
          }}>
            {guests}
          </span>

          <button
            type="button"
            onClick={handlePlus}
            disabled={guests >= 15}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '1px solid var(--border-hairline)',
              backgroundColor: 'var(--surface-muted)',
              cursor: guests >= 15 ? 'not-allowed' : 'pointer',
              fontSize: '1.4rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-dark)',
              transition: 'all 0.2s'
            }}
          >
            &plus;
          </button>
        </div>
      </div>

      {/* Auto-Suggestion Teaser Box */}
      <div style={{
        marginTop: '16px',
        padding: '16px 20px',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: 'var(--surface-muted)',
        border: '1px solid var(--border-hairline)',
        fontSize: '0.88rem',
        lineHeight: 1.6
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cinnamon-primary)', fontWeight: 700, marginBottom: '4px' }}>
          <span>⭐ Auto-Recommendation for {guests} {guests === 1 ? 'Guest' : 'Guests'}:</span>
        </div>
        <div style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{recommendation.title}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{recommendation.desc}</div>
      </div>
    </div>
  );
};
