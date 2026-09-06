import React from 'react';
import { Link } from 'react-router-dom'; // used in room cards
import ParallaxHero from '../components/home/ParallaxHero';
import KineticButton from '../components/common/KineticButton';
import { villaImages } from '../data/images';
import { propertyData } from '../data/propertyData';
import { 
  Users, BedDouble, Bath, Compass, ShieldCheck, 
  Wifi, Utensils, Flame, Sparkles, MapPin, 
  ArrowRight, Star, CheckCircle, ChevronRight, Phone
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="home-page">
      {/* 1. Cinematic Hero Section */}
      <ParallaxHero />

      {/* Stats already appear in the ParallaxHero spec strip — no duplicate needed */}

      {/* 3. Sanctuary Introduction */}
      <section style={{ padding: '6rem 1.5rem', background: 'var(--cinnamon-900)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '50px',
                background: 'rgba(212, 163, 115, 0.12)',
                border: '1px solid rgba(212, 163, 115, 0.3)',
                color: 'var(--gold-400)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1.5rem'
              }}>
                <Sparkles size={16} /> Arachchikanda • Hikkaduwa
              </span>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#fff',
                lineHeight: 1.2,
                marginBottom: '1.5rem'
              }}>
                Where Tropical Serenity Meets <span style={{ color: 'var(--gold-400)', fontStyle: 'italic' }}>Private Luxury</span>
              </h2>

              <p style={{
                color: 'var(--sand-200)',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                marginBottom: '1.5rem'
              }}>
                Tucked into the lush green canopy of Arachchikanda, just 3.5 kilometers from Hikkaduwa's lively beach strip, Villa Cinnamoon Castle is an exclusive private estate designed for family gatherings, reunions, and relaxed retreats.
              </p>

              <p style={{
                color: 'var(--sand-300)',
                fontSize: '0.98rem',
                lineHeight: 1.7,
                marginBottom: '2.5rem'
              }}>
                Enjoy full, private occupancy with zero shared spaces. From morning coffee on the breezy upper balcony to an evening barbecue under the stars in the private gravel courtyard, every inch is exclusively yours.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <KineticButton to="/the-villa" variant="primary">
                  Explore The Villa <ArrowRight size={16} />
                </KineticButton>
                <KineticButton to="/reserve" variant="outline">
                  Check Dates
                </KineticButton>
              </div>
            </div>

            {/* Visual Mosaic */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                border: '1px solid rgba(212, 163, 115, 0.25)'
              }}>
                <img 
                  src={villaImages.exterior[0]} 
                  alt="Villa Cinnamoon Castle Exterior"
                  style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-25px',
                left: '-20px',
                background: 'rgba(26, 17, 13, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '1.25rem 1.75rem',
                borderRadius: '12px',
                border: '1px solid rgba(212, 163, 115, 0.3)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
                maxWidth: '260px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-400)', marginBottom: '0.25rem' }}>
                  <ShieldCheck size={20} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>100% Private Buyout</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sand-300)' }}>
                  Never shared with strangers. Your personal estate staff is on call.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Room & Villa Showcase */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--cinnamon-800)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <span style={{
              color: 'var(--gold-400)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              Curated Spaces
            </span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              color: '#fff',
              marginTop: '0.5rem'
            }}>
              Thoughtfully Designed For Comfort
            </h2>
            <p style={{ color: 'var(--sand-300)', marginTop: '1rem', fontSize: '1.05rem' }}>
              Featuring two spacious living lounges, five serene bedrooms, modern baths, and dedicated work nooks.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Card 1: Master Suite */}
            <div className="villa-card" style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(212, 163, 115, 0.15)',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}>
              <div style={{ height: '230px', overflow: 'hidden' }}>
                <img 
                  src={villaImages.bedrooms.bedroom1[0]} 
                  alt="Master Bedroom 1"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--gold-400)',
                    background: 'rgba(212, 163, 115, 0.12)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px'
                  }}>
                    A/C King Suite
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--sand-300)' }}>Max 3 Guests</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Master Bedroom 1
                </h3>
                <p style={{ color: 'var(--sand-300)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Premium air-conditioned suite with Super King teak bed, private work desk, ergonomic chair, and garden view.
                </p>
                <Link to="/the-villa" style={{
                  color: 'var(--gold-400)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  View All 5 Rooms <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 2: Mezzanine Living Room */}
            <div className="villa-card" style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(212, 163, 115, 0.15)',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}>
              <div style={{ height: '230px', overflow: 'hidden' }}>
                <img 
                  src={villaImages.livingRooms.mezzanine[0]} 
                  alt="Upper Mezzanine Lounge"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--gold-400)',
                    background: 'rgba(212, 163, 115, 0.12)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px'
                  }}>
                    Upper Lounge
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--sand-300)' }}>Relaxation Area</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Mezzanine Living Room
                </h3>
                <p style={{ color: 'var(--sand-300)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Sunlit second-floor common lounge opening directly onto the green canopy balcony. Perfect for reading and tea.
                </p>
                <Link to="/the-villa" style={{
                  color: 'var(--gold-400)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  Explore Common Areas <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 3: Courtyard & Dining */}
            <div className="villa-card" style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(212, 163, 115, 0.15)',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}>
              <div style={{ height: '230px', overflow: 'hidden' }}>
                <img 
                  src={villaImages.kitchenAndDining.dining[0]} 
                  alt="Dining & Courtyard Setup"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--gold-400)',
                    background: 'rgba(212, 163, 115, 0.12)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px'
                  }}>
                    Estate Dining
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--sand-300)' }}>10+ Seats</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  Private Dining & BBQ
                </h3>
                <p style={{ color: 'var(--sand-300)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Solid wood dining table accompanied by outdoor BBQ setup in the gravel courtyard surrounded by cinnamon palms.
                </p>
                <Link to="/experiences" style={{
                  color: 'var(--gold-400)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  Discover Experiences <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Packages Teaser Banner */}
      <section style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(135deg, var(--cinnamon-950) 0%, var(--cinnamon-900) 100%)',
        borderTop: '1px solid rgba(212, 163, 115, 0.15)'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            background: 'rgba(212, 163, 115, 0.05)',
            borderRadius: '24px',
            border: '1px solid rgba(212, 163, 115, 0.25)',
            padding: '3rem 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <span style={{
                color: 'var(--gold-400)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                Transparent Island Rates
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                color: '#fff',
                marginTop: '0.5rem',
                marginBottom: '1rem'
              }}>
                Tailored Stays For Every Occasion
              </h2>
              <p style={{ color: 'var(--sand-300)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Whether you need the full estate for a 15-guest weekend celebration or a quiet 2-room weekday escape, our pricing is clear, all-inclusive, with zero hidden service fees.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <KineticButton to="/packages" variant="primary">
                  View All Packages <ArrowRight size={16} />
                </KineticButton>
                <KineticButton to="/reserve" variant="outline">
                  Instant Availability
                </KineticButton>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1rem'
            }}>
              <div style={{
                background: 'rgba(26, 17, 13, 0.8)',
                padding: '1.5rem',
                borderRadius: '14px',
                border: '1px solid rgba(212, 163, 115, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ color: 'var(--gold-400)', fontWeight: 700, fontSize: '1.1rem' }}>Weekend Full Buyout</div>
                  <div style={{ color: 'var(--sand-300)', fontSize: '0.85rem' }}>Fri / Sat / Sun • Entire 5-Bedroom Estate</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>LKR 40,000</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--sand-400)' }}>per night</div>
                </div>
              </div>

              <div style={{
                background: 'rgba(26, 17, 13, 0.8)',
                padding: '1.5rem',
                borderRadius: '14px',
                border: '1px solid rgba(212, 163, 115, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ color: 'var(--gold-400)', fontWeight: 700, fontSize: '1.1rem' }}>Weekday Whole Villa</div>
                  <div style={{ color: 'var(--sand-300)', fontSize: '0.85rem' }}>Mon – Thu • Up to 15 Guests</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>LKR 30,000</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--sand-400)' }}>per night</div>
                </div>
              </div>

              <div style={{
                background: 'rgba(26, 17, 13, 0.8)',
                padding: '1.5rem',
                borderRadius: '14px',
                border: '1px solid rgba(212, 163, 115, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ color: 'var(--gold-400)', fontWeight: 700, fontSize: '1.1rem' }}>Weekday Couple / Small Group</div>
                  <div style={{ color: 'var(--sand-300)', fontSize: '0.85rem' }}>1 to 4 Rooms Available Mon – Thu</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>From LKR 10,000</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--sand-400)' }}>per night</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Host & Concierge Guarantee */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--cinnamon-900)' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--cinnamon-700)',
            border: '2px solid var(--gold-400)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'var(--gold-400)'
          }}>
            <Phone size={32} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2.2rem',
            color: '#fff',
            marginBottom: '1rem'
          }}>
            Hosted By Dampalla Gamage Devindu
          </h2>
          <p style={{ color: 'var(--sand-300)', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Your host is available around the clock to assist with check-in, arrange tuk-tuk transfers to Hikkaduwa beach, prepare outdoor barbecues, or suggest local hidden gems.
          </p>
          <div style={{ display: 'inline-flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <KineticButton
              href="https://wa.me/94761007686"
              variant="cinnamon"
            >
              Direct WhatsApp: 076 100 7686
            </KineticButton>
            <KineticButton to="/contact" variant="outline">
              Contact &amp; Directions
            </KineticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
