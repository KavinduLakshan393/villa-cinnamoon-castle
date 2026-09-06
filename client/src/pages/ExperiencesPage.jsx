import React from 'react';
import { villaImages } from '../data/images';
import KineticButton from '../components/common/KineticButton';
import { 
  Flame, Compass, Sun, Anchor, MapPin, 
  Clock, ArrowRight, MessageSquare, ShieldCheck 
} from 'lucide-react';

export default function ExperiencesPage() {
  const experiences = [
    {
      id: 'bbq-courtyard',
      title: 'Private Courtyard Barbecue Night',
      category: 'At The Villa',
      time: 'Evening Stargazing',
      distance: 'Villa Grounds',
      image: villaImages.nightCourtyard,
      description: 'Host Devindu will provide charcoal, fire up the outdoor barbecue grill, and arrange garden dining under the stars in your private gravel courtyard surrounded by tropical cinnamon palms.',
      highlights: ['Charcoal Grill Provided', 'Outdoor Garden Fairy Lights', 'Bring Your Own Fresh Catch or Concierge Sourced', 'Complete Dining & Cutlery Setup']
    },
    {
      id: 'hikkaduwa-reef',
      title: 'Coral Reef & Giant Sea Turtles',
      category: '5 Mins Away',
      time: 'Morning Snorkeling',
      distance: '3.5 km from Villa',
      image: villaImages.exterior[2] || villaImages.hero,
      description: 'Wade into the calm shallow waters of Hikkaduwa Marine National Park to feed and swim alongside wild, friendly giant green sea turtles right off the golden shore.',
      highlights: ['Wild Giant Green Turtles', 'Vibrant Shallow Coral Reefs', 'Snorkeling Gear Rental Available', '5-Minute Tuk-Tuk Ride']
    },
    {
      id: 'surf-beach',
      title: 'World-Class Surfing & Sunset Vibes',
      category: 'Coastal Action',
      time: 'Afternoon to Dusk',
      distance: '3.5 km from Villa',
      image: villaImages.balcony[1] || villaImages.hero,
      description: 'Hikkaduwa is world-famous for its consistent A-frame reef and beach breaks. Perfect for seasoned surfers as well as beginners taking their very first wave lessons.',
      highlights: ['Beginner Surf Schools', 'Main Reef Break for Pros', 'Sunset Beach Lounges', 'Fresh King Coconut on Shore']
    },
    {
      id: 'madu-safari',
      title: 'Madu River Mangrove Boat Safari',
      category: 'Day Excursion',
      time: 'Half-Day Trip',
      distance: '20 mins North',
      image: villaImages.exterior[1] || villaImages.hero,
      description: 'Cruise through 64 serene mangrove islands, visit a working cinnamon cultivation island to see traditional peeling demonstrations, and stop at ancient island temples.',
      highlights: ['Mangrove Canopy Tunnels', 'Live Cinnamon Island Demo', 'Natural River Fish Therapy Spa', 'Birdwatcher Paradise']
    },
    {
      id: 'galle-fort',
      title: 'UNESCO Galle Dutch Fort Walk',
      category: 'Cultural Heritage',
      time: 'Late Afternoon',
      distance: '18 km / 20 mins South',
      image: villaImages.exterior[3] || villaImages.hero,
      description: 'Stroll along 400-year-old stone ramparts overlooking the Indian Ocean. Explore cobblestone streets lined with Dutch-colonial mansions, artisanal boutiques, and gelato cafes.',
      highlights: ['Historic Lighthouse & Bastions', 'Art Galleries & Gem Boutiques', 'Panoramic Ocean Sunset', 'Colonial Dining Cafes']
    }
  ];

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
            Curated Island Adventures
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#fff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            Experiences & Excursions
          </h1>
          <p style={{ color: 'var(--sand-200)', fontSize: '1.15rem', lineHeight: 1.7 }}>
            From sizzing barbecue nights in our private courtyard to swimming with sea turtles and exploring historic Galle Fort, create memories that linger.
          </p>
        </div>
      </section>

      {/* Experiences List */}
      <div style={{ maxWidth: '1100px', margin: '4rem auto 0', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {experiences.map((exp, idx) => (
          <div
            key={exp.id}
            style={{
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '20px',
              border: '1px solid rgba(212, 163, 115, 0.2)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
            }}
          >
            <div style={{ height: '320px', overflow: 'hidden' }}>
              <img
                src={exp.image}
                alt={exp.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--gold-400)',
                    background: 'rgba(212, 163, 115, 0.12)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px'
                  }}>
                    {exp.category}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--sand-300)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} color="var(--gold-400)" /> {exp.distance}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--sand-300)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={14} color="var(--gold-400)" /> {exp.time}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: '#fff', marginBottom: '0.75rem' }}>
                  {exp.title}
                </h3>

                <p style={{ color: 'var(--sand-300)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {exp.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {exp.highlights.map((h, i) => (
                    <div key={i} style={{ fontSize: '0.85rem', color: 'var(--sand-200)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: 'var(--gold-400)' }}>•</span> {h}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/94761007686?text=Hi%20Devindu,%20I'm%20interested%20in%20arranging%20the%20${encodeURIComponent(exp.title)}%20experience%20at%20Villa%20Cinnamoon%20Castle`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kinetic-btn kinetic-btn--primary"
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
                >
                  <MessageSquare size={16} /> Inquire via WhatsApp
                </a>
                <KineticButton to="/reserve" variant="outline" style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}>
                  Book Villa Stay
                </KineticButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
