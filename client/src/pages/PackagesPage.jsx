import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KineticButton from '../components/common/KineticButton';
import { 
  Check, Calendar, Users, ShieldCheck, Flame, 
  Wifi, Car, Utensils, HelpCircle, ArrowRight 
} from 'lucide-react';

export default function PackagesPage() {
  const [stayFilter, setStayFilter] = useState('all'); // 'all', 'weekend', 'weekday'

  const packages = [
    {
      id: 'weekend-buyout',
      category: 'weekend',
      name: 'Weekend Full Villa Buyout',
      tag: 'Most Popular for Gatherings',
      price: 40000,
      priceLabel: 'LKR 40,000 / night',
      applicableDays: 'Friday, Saturday & Sunday Nights',
      rooms: '5 Air Conditioned & Garden Suites (All Rooms)',
      guests: 'Up to 15 Guests Max',
      description: 'Exclusive 100% private estate buyout. The entire villa, outdoor courtyard, two living lounges, and granite kitchen are exclusively yours with zero other guests.',
      features: [
        'All 5 Bedrooms (Master A/C Suite + Bedroom 2 A/C + 3 Garden Bedrooms)',
        '2 Modern Hot Water Bathrooms',
        '2 Complete Living Lounges (Ground & Mezzanine)',
        'Full Kitchen access (Cook yourself or bring supplies)',
        'Outdoor BBQ setup in private gravel courtyard',
        'High-Speed Wi-Fi & Private Secure Parking'
      ]
    },
    {
      id: 'weekday-whole',
      category: 'weekday',
      name: 'Weekday Whole Villa Buyout',
      tag: 'Best Value for Large Groups',
      price: 30000,
      priceLabel: 'LKR 30,000 / night',
      applicableDays: 'Monday, Tuesday, Wednesday & Thursday Nights',
      rooms: '5 Bedrooms (All Rooms)',
      guests: 'Up to 15 Guests Max',
      description: 'Enjoy the peace of Arachchikanda on quieter weekdays at a discounted whole-villa buyout rate.',
      features: [
        'Exclusive private estate access (Zero shared spaces)',
        'All 5 Bedrooms including both A/C Suites',
        '2 Hot Water Bathrooms & 2 Living Lounges',
        'Full Kitchen & Outdoor Courtyard Barbecue',
        'Free Wi-Fi & Estate Parking'
      ]
    },
    {
      id: 'weekday-4room',
      category: 'weekday',
      name: 'Weekday 4-Room Package',
      tag: 'Medium Groups',
      price: 25000,
      priceLabel: 'LKR 25,000 / night',
      applicableDays: 'Monday through Thursday Nights',
      rooms: '4 Private Bedrooms',
      guests: 'Up to 10–12 Guests',
      description: 'Generous accommodation for medium-sized family reunions or workation groups.',
      features: [
        '4 Selected Bedrooms including A/C Suite',
        'Exclusive access to living rooms & grounds during your stay',
        'Complete kitchen & dining facilities',
        'Continuous hot water showers'
      ]
    },
    {
      id: 'weekday-3room',
      category: 'weekday',
      name: 'Weekday 3-Room Package',
      tag: 'Family Getaways',
      price: 20000,
      priceLabel: 'LKR 20,000 / night',
      applicableDays: 'Monday through Thursday Nights',
      rooms: '3 Private Bedrooms',
      guests: 'Up to 8–9 Guests',
      description: 'The optimal balance for two or three small families traveling together.',
      features: [
        '3 Comfortable Bedrooms including Master A/C',
        'Full private estate grounds for your party',
        'Full kitchen access & BBQ area',
        'High-speed Wi-Fi throughout'
      ]
    },
    {
      id: 'weekday-2room',
      category: 'weekday',
      name: 'Weekday 2-Room Package',
      tag: 'Small Family Escape',
      price: 15000,
      priceLabel: 'LKR 15,000 / night',
      applicableDays: 'Monday through Thursday Nights',
      rooms: '2 Private Bedrooms',
      guests: 'Up to 5–6 Guests',
      description: 'Escape the city and work remotely with tropical views, peaceful birdsong, and beach proximity.',
      features: [
        '2 Bedrooms (including A/C Suite with work desk)',
        'Entire villa amenities reserved for your booking',
        'Fast optical fiber Wi-Fi for remote work',
        '5-min drive to Hikkaduwa Beach'
      ]
    },
    {
      id: 'weekday-1room',
      category: 'weekday',
      name: 'Weekday Couple Retreat (1 Room)',
      tag: 'Couples & Solo Travelers',
      price: 10000,
      priceLabel: 'LKR 10,000 / night',
      applicableDays: 'Monday through Thursday Nights',
      rooms: '1 Luxury A/C Master Bedroom',
      guests: 'Up to 2–3 Guests',
      description: 'Private master bedroom retreat with Super King bed, whisper-quiet A/C, and work desk.',
      features: [
        'Master Bedroom 1 with Super King Bed & A/C',
        'Dedicated ergonomic work desk & high speed Wi-Fi',
        'Private bathroom with hot water',
        'Full access to gardens, veranda, and kitchen'
      ]
    }
  ];

  const filteredPackages = stayFilter === 'all' 
    ? packages 
    : packages.filter(p => p.category === stayFilter);

  return (
    <div style={{ background: 'var(--cinnamon-950)', color: '#fff', paddingBottom: '6rem' }}>
      {/* Hero Header */}
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
            Transparent Direct Rates
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#fff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            Stay Packages & Pricing
          </h1>
          <p style={{
            color: 'var(--sand-200)',
            fontSize: '1.15rem',
            lineHeight: 1.7
          }}>
            Choose between full weekend estate buyouts or budget-flexible weekday tiered room bookings. All prices are final with zero service markups.
          </p>
          
          {/* Stay Filter Pills */}
          <div style={{
            display: 'inline-flex',
            gap: '0.75rem',
            marginTop: '2rem',
            background: 'rgba(255,255,255,0.05)',
            padding: '0.4rem',
            borderRadius: '40px',
            border: '1px solid rgba(212, 163, 115, 0.2)'
          }}>
            <button
              onClick={() => setStayFilter('all')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '30px',
                border: 'none',
                background: stayFilter === 'all' ? 'var(--gold-400)' : 'transparent',
                color: stayFilter === 'all' ? '#1a110d' : 'var(--sand-300)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              All Packages ({packages.length})
            </button>
            <button
              onClick={() => setStayFilter('weekend')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '30px',
                border: 'none',
                background: stayFilter === 'weekend' ? 'var(--gold-400)' : 'transparent',
                color: stayFilter === 'weekend' ? '#1a110d' : 'var(--sand-300)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Weekend Buyout
            </button>
            <button
              onClick={() => setStayFilter('weekday')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '30px',
                border: 'none',
                background: stayFilter === 'weekday' ? 'var(--gold-400)' : 'transparent',
                color: stayFilter === 'weekday' ? '#1a110d' : 'var(--sand-300)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Weekday Tiers (1–5 Rooms)
            </button>
          </div>
        </div>
      </section>

      {/* Package Cards Grid */}
      <div style={{ maxWidth: '1200px', margin: '4rem auto 0', padding: '0 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {filteredPackages.map((pkg) => {
            const isFeatured = pkg.id === 'weekend-buyout' || pkg.id === 'weekday-whole';
            return (
              <div 
                key={pkg.id}
                style={{
                  background: isFeatured ? 'rgba(212, 163, 115, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '20px',
                  border: isFeatured ? '2px solid var(--gold-400)' : '1px solid rgba(212, 163, 115, 0.2)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  boxShadow: isFeatured ? '0 15px 35px rgba(212, 163, 115, 0.08)' : 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      background: pkg.category === 'weekend' ? 'rgba(212, 163, 115, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--gold-400)'
                    }}>
                      {pkg.tag}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--sand-400)' }}>
                      {pkg.category === 'weekend' ? 'Fri–Sun' : 'Mon–Thu'}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
                    {pkg.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '1.25rem 0' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--gold-400)' }}>
                      LKR {pkg.price.toLocaleString()}
                    </span>
                    <span style={{ color: 'var(--sand-300)', fontSize: '0.9rem' }}>/ night</span>
                  </div>

                  <div style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--sand-200)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <div><strong>Rooms:</strong> {pkg.rooms}</div>
                    <div><strong>Capacity:</strong> {pkg.guests}</div>
                    <div><strong>Valid:</strong> {pkg.applicableDays}</div>
                  </div>

                  <p style={{ color: 'var(--sand-300)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {pkg.description}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(212, 163, 115, 0.15)', paddingTop: '1.25rem', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: '0.75rem' }}>
                      Package Inclusions:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {pkg.features.map((feat, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--sand-200)' }}>
                          <Check size={16} color="var(--gold-400)" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  to={`/reserve?package=${pkg.id}`}
                  className={`kinetic-btn ${isFeatured ? 'kinetic-btn--primary' : 'kinetic-btn--outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Select & Check Dates <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mixed Stay Explainer Card */}
        <div style={{
          marginTop: '4rem',
          background: 'rgba(212, 163, 115, 0.06)',
          border: '1px solid rgba(212, 163, 115, 0.25)',
          borderRadius: '16px',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-400)', fontWeight: 700, marginBottom: '0.5rem' }}>
              <HelpCircle size={20} />
              <span>What if my stay crosses both Weekday and Weekend?</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.75rem' }}>
              Adaptive Mixed-Stay Rate Engine
            </h3>
            <p style={{ color: 'var(--sand-300)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Our booking engine dynamically evaluates each night individually. For example, if you book Thursday (Weekday rate: LKR 30,000) and Friday (Weekend buyout rate: LKR 40,000), your total is accurately calculated at LKR 70,000 without penalizing you for the entire weekend!
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <KineticButton to="/reserve" variant="primary">
              Calculate Your Stay Now <ArrowRight size={16} />
            </KineticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
