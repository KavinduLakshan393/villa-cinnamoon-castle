import React from 'react';

export const PackageSelector = ({
  packages,
  dateType,
  guestCount,
  selectedPackage,
  onSelectPackage,
  selectedMixedWeekday,
  onSelectMixedWeekday,
  weekendNights,
  weekdayNights
}) => {
  const isWeekend = dateType === 'WEEKEND';
  const isWeekday = dateType === 'WEEKDAY';
  const isMixed = dateType === 'MIXED';

  // Filter weekday packages matching group size
  const availableWeekdayPkgs = (packages.weekday || []).filter(
    (p) => p.maxPax >= guestCount
  );

  const availableWeekendPkgs = packages.weekend || [];

  return (
    <div className="package-selector-container">
      {/* Mode A: Weekend Only */}
      {isWeekend && (
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--cinnamon-primary)', marginBottom: '14px' }}>
            Weekend Full Buyout Packages ({weekendNights} Weekend {weekendNights === 1 ? 'Night' : 'Nights'}):
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {availableWeekendPkgs.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg)}
                  style={{
                    border: isSelected ? '2px solid var(--cinnamon-primary)' : '1px solid var(--border-hairline)',
                    backgroundColor: isSelected ? 'rgba(150, 75, 40, 0.04)' : '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? 'var(--shadow-hover)' : 'var(--shadow-soft)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}>{pkg.title}</strong>
                      {pkg.isAc && (
                        <span style={{
                          backgroundColor: 'var(--cinnamon-primary)',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          textTransform: 'uppercase',
                          fontWeight: 700
                        }}>A/C</span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {pkg.description}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '20px' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--cinnamon-primary)' }}>
                      Rs. {pkg.rate.toLocaleString()}/=
                    </span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ night</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode B: Weekday Only */}
      {isWeekday && (
        <div>
          <h4 style={{ fontSize: '1rem', color: 'var(--cinnamon-primary)', marginBottom: '14px' }}>
            Weekday Options for {guestCount} Guests ({weekdayNights} Weekday {weekdayNights === 1 ? 'Night' : 'Nights'}):
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {availableWeekdayPkgs.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg)}
                  style={{
                    border: isSelected ? '2px solid var(--cinnamon-primary)' : '1px solid var(--border-hairline)',
                    backgroundColor: isSelected ? 'rgba(150, 75, 40, 0.04)' : '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? 'var(--shadow-hover)' : 'var(--shadow-soft)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}>{pkg.title}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({pkg.bedrooms})</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {pkg.description}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '20px' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--cinnamon-primary)' }}>
                      Rs. {pkg.rate.toLocaleString()}/=
                    </span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ night</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode C: Mixed Stay Dual Selector */}
      {isMixed && (
        <div>
          <div style={{
            backgroundColor: 'var(--surface-muted)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-hairline)',
            fontSize: '0.88rem',
            marginBottom: '20px'
          }}>
            <strong>Mixed Stay Detected:</strong> Your dates span across both <strong>{weekendNights} Weekend Nights</strong> and <strong>{weekdayNights} Weekday Nights</strong>. Please select the respective packages below for a transparent split rate calculation.
          </div>

          {/* Weekend sub-selector */}
          <h4 style={{ fontSize: '0.95rem', color: 'var(--cinnamon-primary)', marginBottom: '10px' }}>
            1. Weekend Package ({weekendNights} Weekend Nights):
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {availableWeekendPkgs.map((pkg) => {
              const isSelected = selectedPackage?.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => onSelectPackage(pkg)}
                  style={{
                    border: isSelected ? '2px solid var(--cinnamon-primary)' : '1px solid var(--border-hairline)',
                    backgroundColor: isSelected ? 'rgba(150, 75, 40, 0.04)' : '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px 18px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{pkg.title}</strong>
                    <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{pkg.description}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--cinnamon-primary)' }}>
                    Rs. {pkg.rate.toLocaleString()}/=
                  </span>
                </div>
              );
            })}
          </div>

          {/* Weekday sub-selector */}
          <h4 style={{ fontSize: '0.95rem', color: 'var(--cinnamon-primary)', marginBottom: '10px' }}>
            2. Weekday Package ({weekdayNights} Weekday Nights):
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {availableWeekdayPkgs.map((wpkg) => {
              const isSelected = selectedMixedWeekday?.id === wpkg.id;
              return (
                <div
                  key={wpkg.id}
                  onClick={() => onSelectMixedWeekday(wpkg)}
                  style={{
                    border: isSelected ? '2px solid var(--cinnamon-primary)' : '1px solid var(--border-hairline)',
                    backgroundColor: isSelected ? 'rgba(150, 75, 40, 0.04)' : '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    padding: '14px 18px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.95rem' }}>{wpkg.title}</strong>
                    <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{wpkg.bedrooms}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--cinnamon-primary)' }}>
                    Rs. {wpkg.rate.toLocaleString()}/=
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
