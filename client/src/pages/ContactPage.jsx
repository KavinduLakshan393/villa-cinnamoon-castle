import React, { useState } from 'react';
import { propertyData } from '../data/propertyData';
import { 
  Phone, MessageSquare, Mail, MapPin, 
  Navigation, Clock, CheckCircle, Send, Car 
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hi Devindu, my name is ${formData.name} (${formData.phone}). Message: ${formData.message}`;
    const url = `https://wa.me/94761007686?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div style={{ background: 'var(--cinnamon-950)', color: '#fff', paddingBottom: '6rem' }}>
      {/* Header */}
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
            Always At Your Service
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#fff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            Contact Host & Directions
          </h1>
          <p style={{ color: 'var(--sand-200)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            We're here to arrange seamless check-ins, local airport transfers, private chef meals, or answer questions about your stay.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '4rem auto 0', padding: '0 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem'
        }}>
          {/* Host Card & Hotlines */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              border: '1px solid rgba(212, 163, 115, 0.2)',
              padding: '2.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--gold-400)',
                  color: '#1a110d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.5rem'
                }}>
                  DG
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff' }}>
                    {propertyData.host.name}
                  </h3>
                  <div style={{ color: 'var(--gold-400)', fontSize: '0.85rem', fontWeight: 600 }}>
                    {propertyData.host.title}
                  </div>
                  <div style={{ color: 'var(--sand-400)', fontSize: '0.8rem' }}>
                    Languages: {propertyData.host.languages}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                <a
                  href={`tel:${propertyData.host.hotline}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#fff',
                    textDecoration: 'none',
                    background: 'rgba(212, 163, 115, 0.08)',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 163, 115, 0.2)'
                  }}
                >
                  <Phone size={18} color="var(--gold-400)" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--sand-300)' }}>Primary Host Hotline</div>
                    <div style={{ fontWeight: 700 }}>{propertyData.host.hotline} ({propertyData.host.hotlineLocal})</div>
                  </div>
                </a>

                <a
                  href={`tel:${propertyData.host.secondaryPhone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#fff',
                    textDecoration: 'none',
                    background: 'rgba(212, 163, 115, 0.08)',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 163, 115, 0.2)'
                  }}
                >
                  <Phone size={18} color="var(--gold-400)" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--sand-300)' }}>Secondary Hotline</div>
                    <div style={{ fontWeight: 700 }}>{propertyData.host.secondaryPhone} ({propertyData.host.secondaryPhoneLocal})</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/94761007686?text=Hi%20Devindu,%20I%20have%20an%20inquiry%20regarding%20Villa%20Cinnamoon%20Castle`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#fff',
                    textDecoration: 'none',
                    background: 'rgba(16, 185, 129, 0.15)',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid #10b981'
                  }}
                >
                  <MessageSquare size={18} color="#10b981" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>Instant WhatsApp Concierge</div>
                    <div style={{ fontWeight: 700, color: '#10b981' }}>Chat via WhatsApp (Replies in &lt;15 mins)</div>
                  </div>
                </a>

                <a
                  href={`mailto:${propertyData.host.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#fff',
                    textDecoration: 'none',
                    background: 'rgba(212, 163, 115, 0.08)',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 163, 115, 0.2)'
                  }}
                >
                  <Mail size={18} color="var(--gold-400)" />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--sand-300)' }}>Official Email</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{propertyData.host.email}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Distances */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              border: '1px solid rgba(212, 163, 115, 0.2)',
              padding: '2rem'
            }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--gold-400)', marginBottom: '1rem' }}>
                Key Transit Distances
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {propertyData.location.distances.map((dist, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--sand-200)', borderBottom: '1px solid rgba(212, 163, 115, 0.1)', paddingBottom: '0.5rem' }}>
                    <span>{dist.place}</span>
                    <strong style={{ color: 'var(--gold-400)' }}>{dist.time} ({dist.distance})</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location & Turn-by-Turn Directions */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              border: '1px solid rgba(212, 163, 115, 0.2)',
              padding: '2.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-400)', marginBottom: '0.5rem' }}>
                <MapPin size={22} />
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Estate Address</span>
              </div>
              <p style={{ color: '#fff', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {propertyData.location.address}
              </p>

              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--gold-400)', marginBottom: '1rem' }}>
                Driving Instructions
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--sand-300)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                <div>
                  <strong style={{ color: '#fff' }}>From Colombo via Southern Expressway (E01):</strong><br />
                  Take the Kurundugahahetekma or Baddegama interchange exit. Follow the scenic inland highway toward Hikkaduwa. Turn into Arachchikanda; the villa gate is just 3.5 km from the main coastal road.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>From Hikkaduwa Town / Railway Station:</strong><br />
                  A breezy 5-minute tuk-tuk ride inland away from the coastal highway traffic. Host Devindu can send a trusted driver directly to the station platform to greet you.
                </div>
                <div>
                  <strong style={{ color: '#fff' }}>Free On-Site Parking:</strong><br />
                  Secure private parking space for up to 4 vehicles inside the property gates.
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              border: '1px solid rgba(212, 163, 115, 0.2)',
              padding: '2.5rem'
            }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>
                Send an Inquiry Directly
              </h4>
              <p style={{ color: 'var(--sand-300)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Submitting this form redirects to WhatsApp with your questions pre-filled.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 163, 115, 0.3)',
                    background: 'rgba(26, 17, 13, 0.6)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile (e.g. 076 100 7686)"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 163, 115, 0.3)',
                    background: 'rgba(26, 17, 13, 0.6)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
                <textarea
                  rows={3}
                  placeholder="Your Question / Inquiry"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    padding: '0.8rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 163, 115, 0.3)',
                    background: 'rgba(26, 17, 13, 0.6)',
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                />
                <button
                  type="submit"
                  className="kinetic-btn kinetic-btn--primary"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Send size={16} /> Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
