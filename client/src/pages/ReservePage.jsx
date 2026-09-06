import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { api } from '../services/api';
import { DateCalendar } from '../components/booking/DateCalendar';
import { GuestStepper } from '../components/booking/GuestStepper';
import { PackageSelector } from '../components/booking/PackageSelector';
import { SummaryCard } from '../components/booking/SummaryCard';
import KineticButton from '../components/common/KineticButton';
import { 
  Calendar as CalendarIcon, Users, CreditCard, 
  CheckCircle, AlertCircle, ArrowLeft, ArrowRight, 
  Phone, MessageSquare, Sparkles, Clock 
} from 'lucide-react';

export default function ReservePage() {
  const [searchParams] = useSearchParams();
  const initialPackageParam = searchParams.get('package');

  const { blockedDates, packages, refreshBlockedDates } = useBooking();

  // Wizard state
  const [step, setStep] = useState(1); // 1: Dates, 2: Guests & Package, 3: Guest Details

  // Date selection state
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [totalNights, setTotalNights] = useState(0);
  const [weekendNights, setWeekendNights] = useState(0);
  const [weekdayNights, setWeekdayNights] = useState(0);
  const [dateType, setDateType] = useState('WEEKDAY'); // 'WEEKEND', 'WEEKDAY', 'MIXED'

  // Guests & Package state
  const [guestCount, setGuestCount] = useState(2);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedMixedWeekday, setSelectedMixedWeekday] = useState(null);

  // Guest details form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  // Date calculation engine
  const handleDateRangeSelect = (start, end) => {
    setCheckIn(start);
    setCheckOut(end);

    if (start && end) {
      const cur = new Date(start);
      let weCount = 0;
      let wdCount = 0;

      while (cur < end) {
        const day = cur.getUTCDay(); // 0 = Sun, 5 = Fri, 6 = Sat
        if (day === 5 || day === 6 || day === 0) {
          weCount++;
        } else {
          wdCount++;
        }
        cur.setUTCDate(cur.getUTCDate() + 1);
      }

      const total = weCount + wdCount;
      setTotalNights(total);
      setWeekendNights(weCount);
      setWeekdayNights(wdCount);

      if (weCount > 0 && wdCount > 0) {
        setDateType('MIXED');
      } else if (weCount > 0) {
        setDateType('WEEKEND');
      } else {
        setDateType('WEEKDAY');
      }
    } else {
      setTotalNights(0);
      setWeekendNights(0);
      setWeekdayNights(0);
    }
  };

  // Auto-select package when dateType or packages change
  useEffect(() => {
    if (!packages.all || packages.all.length === 0) return;

    if (dateType === 'WEEKEND') {
      const weekendPkg = packages.weekend?.[0] || packages.all.find(p => p.type === 'WEEKEND_FULL_VILLA');
      setSelectedPackage(weekendPkg);
    } else if (dateType === 'WEEKDAY') {
      // Find matching weekday package for guest count
      const matching = (packages.weekday || []).find(p => p.maxPax >= guestCount) || packages.weekday?.[0];
      setSelectedPackage(matching);
    } else if (dateType === 'MIXED') {
      const weekendPkg = packages.weekend?.[0];
      const matchingWeekday = (packages.weekday || []).find(p => p.maxPax >= guestCount) || packages.weekday?.[0];
      setSelectedPackage(weekendPkg);
      setSelectedMixedWeekday(matchingWeekday);
    }
  }, [dateType, guestCount, packages]);

  // Compute Total Price
  const computeTotalPrice = () => {
    if (totalNights <= 0) return 0;

    if (dateType === 'WEEKEND' && selectedPackage) {
      return weekendNights * selectedPackage.price;
    }
    if (dateType === 'WEEKDAY' && selectedPackage) {
      return weekdayNights * selectedPackage.price;
    }
    if (dateType === 'MIXED') {
      const weRate = selectedPackage ? selectedPackage.price : 40000;
      const wdRate = selectedMixedWeekday ? selectedMixedWeekday.price : 30000;
      return (weekendNights * weRate) + (weekdayNights * wdRate);
    }
    return 0;
  };

  const totalPrice = computeTotalPrice();

  // Validate phone input
  const validatePhone = (val) => {
    const cleaned = val.replace(/\s+/g, '');
    const slLocal = /^07[01245678]\d{7}$/;
    const slIntl = /^(\+94|0094|94)7[01245678]\d{7}$/;
    const intlGeneric = /^\+[1-9]\d{7,14}$/;

    if (!cleaned) {
      return 'WhatsApp number is required.';
    }
    if (!slLocal.test(cleaned) && !slIntl.test(cleaned) && !intlGeneric.test(cleaned)) {
      return 'Enter a valid WhatsApp number (e.g., 076 100 7686 or +94 76 100 7686).';
    }
    return '';
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setPhone(val);
    if (phoneError) {
      setPhoneError(validatePhone(val));
    }
  };

  // Submit Booking
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    const err = validatePhone(phone);
    if (err) {
      setPhoneError(err);
      return;
    }

    if (!fullName.trim()) {
      setSubmitError('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        checkInDate: checkIn.toISOString().split('T')[0],
        checkOutDate: checkOut.toISOString().split('T')[0],
        guestCount,
        guestName: fullName.trim(),
        guestPhone: phone.trim(),
        packageId: selectedPackage?.id || 'standard-buyout',
        packageDetails: {
          packageName: selectedPackage?.name || 'Private Buyout',
          dateType,
          weekendNights,
          weekdayNights,
          totalPrice
        },
        specialRequests: specialRequests.trim()
      };

      const res = await api.createBooking(payload);
      if (res.success) {
        setBookingConfirmed(res);
        refreshBlockedDates();
      } else {
        setSubmitError(res.message || 'Failed to submit reservation inquiry.');
      }
    } catch (error) {
      setSubmitError(error.message || 'Network error while creating booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: 'var(--cinnamon-950)', color: '#fff', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Page Header */}
      <section style={{
        padding: '6.5rem 1.5rem 3rem',
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
            Direct Reservation Concierge
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.25rem)',
            color: '#fff',
            marginTop: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            Reserve Your Private Sanctuary
          </h1>
          <p style={{ color: 'var(--sand-200)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Direct booking with host Devindu. Locked dates appear red on calendar. Instant WhatsApp confirmation with zero third-party commissions.
          </p>

          {/* Stepper Progress Indicator */}
          {!bookingConfirmed && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '2.5rem',
              flexWrap: 'wrap'
            }}>
              {[
                { num: 1, label: 'Dates & Stay' },
                { num: 2, label: 'Party & Package' },
                { num: 3, label: 'Guest Details' }
              ].map((s) => {
                const isActive = step === s.num;
                const isPassed = step > s.num;
                return (
                  <div 
                    key={s.num} 
                    onClick={() => { if (isPassed) setStep(s.num); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      cursor: isPassed ? 'pointer' : 'default',
                      opacity: isActive || isPassed ? 1 : 0.5
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isActive ? 'var(--gold-400)' : isPassed ? '#10b981' : 'rgba(255,255,255,0.1)',
                      color: isActive || isPassed ? '#1a110d' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}>
                      {isPassed ? '✓' : s.num}
                    </div>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--gold-400)' : '#fff'
                    }}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Main Reservation Container */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 1.5rem' }}>
        {bookingConfirmed ? (
          /* Confirmation State */
          <div style={{
            maxWidth: '750px',
            margin: '0 auto',
            background: 'rgba(26, 17, 13, 0.9)',
            border: '2px solid var(--gold-400)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <CheckCircle size={38} />
            </div>

            <span style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--gold-400)',
              letterSpacing: '0.1em'
            }}>
              Reservation Submitted Successfully
            </span>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', color: '#fff', margin: '0.5rem 0 1.5rem' }}>
              Your Dates Are Provisionally Held
            </h2>

            <div style={{
              background: 'rgba(255,255,255,0.04)',
              padding: '1.25rem 2rem',
              borderRadius: '12px',
              border: '1px solid rgba(212, 163, 115, 0.25)',
              display: 'inline-block',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--sand-300)', textTransform: 'uppercase' }}>Booking Reference ID</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold-400)', letterSpacing: '0.05em' }}>
                {bookingConfirmed.booking?.id || 'VCC-CONFIRMED'}
              </div>
            </div>

            <p style={{ color: 'var(--sand-200)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Host Devindu has received your inquiry. To finalize check-in times, welcome beverage preferences, or express approval, tap below to chat directly on WhatsApp.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <a
                href={bookingConfirmed.whatsAppLink || `https://wa.me/94761007686?text=Hi%20Devindu,%20I%20just%20submitted%20booking%20${bookingConfirmed.booking?.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="kinetic-btn kinetic-btn--primary"
                style={{ fontSize: '1.05rem', padding: '1rem 2rem' }}
              >
                <MessageSquare size={20} /> Open Direct WhatsApp Message
              </a>
              <button
                onClick={() => {
                  setBookingConfirmed(null);
                  setStep(1);
                  setCheckIn(null);
                  setCheckOut(null);
                }}
                className="kinetic-btn kinetic-btn--outline"
                style={{ fontSize: '0.88rem' }}
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        ) : (
          /* Wizard Steps Layout */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Left Column: Active Step Controls */}
            <div>
              {/* STEP 1: DATES */}
              {step === 1 && (
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '20px',
                  border: '1px solid rgba(212, 163, 115, 0.2)',
                  padding: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <CalendarIcon size={24} color="var(--gold-400)" />
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#fff' }}>
                        Step 1: Select Check-In & Check-Out Dates
                      </h3>
                      <p style={{ color: 'var(--sand-300)', fontSize: '0.9rem' }}>
                        Red dates are already approved and unavailable. Click check-in date then check-out date.
                      </p>
                    </div>
                  </div>

                  <DateCalendar
                    blockedDates={blockedDates}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onDateRangeSelect={handleDateRangeSelect}
                  />

                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setStep(2)}
                      disabled={!checkIn || !checkOut}
                      className="kinetic-btn kinetic-btn--primary"
                      style={{ opacity: (!checkIn || !checkOut) ? 0.5 : 1, cursor: (!checkIn || !checkOut) ? 'not-allowed' : 'pointer' }}
                    >
                      Continue to Guests & Package <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: GUESTS & PACKAGE */}
              {step === 2 && (
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '20px',
                  border: '1px solid rgba(212, 163, 115, 0.2)',
                  padding: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Users size={24} color="var(--gold-400)" />
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#fff' }}>
                        Step 2: Number of Guests & Package
                      </h3>
                      <p style={{ color: 'var(--sand-300)', fontSize: '0.9rem' }}>
                        Adjust your party size to see recommended bedroom allocations.
                      </p>
                    </div>
                  </div>

                  {/* Guest Stepper */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold-400)', marginBottom: '0.5rem' }}>
                      Total Staying Guests (Max 15 Pax)
                    </label>
                    <GuestStepper guests={guestCount} onChange={(count) => setGuestCount(count)} />
                  </div>

                  {/* Package Selector */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--gold-400)', marginBottom: '0.75rem' }}>
                      Select Applicable Package for Your Dates ({dateType})
                    </label>
                    <PackageSelector
                      packages={packages}
                      dateType={dateType}
                      guestCount={guestCount}
                      selectedPackage={selectedPackage}
                      onSelectPackage={(pkg) => setSelectedPackage(pkg)}
                      selectedMixedWeekday={selectedMixedWeekday}
                      onSelectMixedWeekday={(pkg) => setSelectedMixedWeekday(pkg)}
                      weekendNights={weekendNights}
                      weekdayNights={weekdayNights}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => setStep(1)}
                      className="kinetic-btn kinetic-btn--outline"
                    >
                      <ArrowLeft size={16} /> Back to Dates
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!selectedPackage}
                      className="kinetic-btn kinetic-btn--primary"
                    >
                      Continue to Details <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: GUEST DETAILS & CONFIRMATION */}
              {step === 3 && (
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '20px',
                  border: '1px solid rgba(212, 163, 115, 0.2)',
                  padding: '2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <CreditCard size={24} color="var(--gold-400)" />
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#fff' }}>
                        Step 3: Contact & Special Requests
                      </h3>
                      <p style={{ color: 'var(--sand-300)', fontSize: '0.9rem' }}>
                        Provide your details so host Devindu can reach you directly on WhatsApp.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitBooking}>
                    {/* Full Name */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Kasun Perera"
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid rgba(212, 163, 115, 0.3)',
                          background: 'rgba(26, 17, 13, 0.6)',
                          color: '#fff',
                          fontSize: '1rem'
                        }}
                      />
                    </div>

                    {/* WhatsApp Phone */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        WhatsApp Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="e.g. 076 100 7686 or +94 76 100 7686"
                        required
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: phoneError ? '1px solid #ef4444' : '1px solid rgba(212, 163, 115, 0.3)',
                          background: 'rgba(26, 17, 13, 0.6)',
                          color: '#fff',
                          fontSize: '1rem'
                        }}
                      />
                      {phoneError ? (
                        <div style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '0.4rem' }}>{phoneError}</div>
                      ) : (
                        <div style={{ color: 'var(--sand-400)', fontSize: '0.8rem', marginTop: '0.4rem' }}>
                          Used for instant booking confirmation & gated review verification.
                        </div>
                      )}
                    </div>

                    {/* Special Requests */}
                    <div style={{ marginBottom: '2rem' }}>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '0.4rem', fontWeight: 600 }}>
                        Special Requests / Arrival Time (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="e.g. Interested in outdoor BBQ grill setup, arriving by train around 3:00 PM..."
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid rgba(212, 163, 115, 0.3)',
                          background: 'rgba(26, 17, 13, 0.6)',
                          color: '#fff',
                          fontSize: '0.95rem'
                        }}
                      />
                    </div>

                    {submitError && (
                      <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid #ef4444',
                        padding: '1rem',
                        borderRadius: '10px',
                        color: '#fca5a5',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <AlertCircle size={18} />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="kinetic-btn kinetic-btn--outline"
                      >
                        <ArrowLeft size={16} /> Back to Packages
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="kinetic-btn kinetic-btn--primary"
                        style={{ opacity: isSubmitting ? 0.7 : 1 }}
                      >
                        {isSubmitting ? 'Submitting Reservation...' : 'Confirm & Reserve Sanctuary'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Right Column: Live Sticky Summary Card */}
            <div>
              <SummaryCard
                checkIn={checkIn}
                checkOut={checkOut}
                totalNights={totalNights}
                weekendNights={weekendNights}
                weekdayNights={weekdayNights}
                dateType={dateType}
                guestCount={guestCount}
                selectedPackage={selectedPackage}
                selectedMixedWeekday={selectedMixedWeekday}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
