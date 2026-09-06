import React, { useState } from 'react';
import { villaImages } from '../data/images';
import { propertyData } from '../data/propertyData';
import { GalleryModal } from '../components/tour/GalleryModal';
import KineticButton from '../components/common/KineticButton';
import { 
  Bed, Wind, CheckCircle, Image as ImageIcon, 
  Layers, Utensils, Bath, Sun, Compass, ArrowRight 
} from 'lucide-react';

export default function TheVillaPage() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('bedrooms');

  const openGallery = (cat = 'all') => {
    setGalleryCategory(cat);
    setGalleryOpen(true);
  };

  return (
    <div className="villa-page" style={{ background: 'var(--cinnamon-950)', color: '#fff' }}>
      {/* Header Banner */}
      <section style={{
        position: 'relative',
        padding: '7rem 1.5rem 4rem',
        background: 'linear-gradient(rgba(26, 17, 13, 0.85), rgba(26, 17, 13, 0.95)), url(' + villaImages.balcony[0] + ') center/cover no-repeat',
        borderBottom: '1px solid rgba(212, 163, 115, 0.2)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--gold-400)'
          }}>
            Estate Walkthrough
          </span>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
            color: '#fff',
            marginTop: '0.5rem',
            marginBottom: '1rem'
          }}>
            The Villa Architecture & Suites
          </h1>
          <p style={{
            maxWidth: '750px',
            margin: '0 auto 2rem',
            color: 'var(--sand-200)',
            fontSize: '1.15rem',
            lineHeight: 1.7
          }}>
            Two expansive levels spanning five private bedrooms, two separate living lounges, granite-topped chef's kitchen, and a private enclosed courtyard.
          </p>
          <button
            onClick={() => openGallery('all')}
            className="kinetic-btn kinetic-btn--primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ImageIcon size={18} /> Open 131+ Curated Photo Gallery
          </button>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div style={{
        position: 'sticky',
        top: '72px',
        zIndex: 40,
        background: 'rgba(26, 17, 13, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(212, 163, 115, 0.2)',
        padding: '0.75rem 1rem'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          {[
            { id: 'bedrooms', label: '5 Bedrooms', icon: Bed },
            { id: 'living', label: '2 Living Lounges', icon: Layers },
            { id: 'kitchen', label: 'Kitchen & Dining', icon: Utensils },
            { id: 'bathrooms', label: 'Modern Bathrooms', icon: Bath },
            { id: 'outdoors', label: 'Balcony & Courtyard', icon: Sun }
          ].map(tab => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '30px',
                  border: isCurrent ? '1px solid var(--gold-400)' : '1px solid rgba(212, 163, 115, 0.2)',
                  background: isCurrent ? 'rgba(212, 163, 115, 0.15)' : 'transparent',
                  color: isCurrent ? 'var(--gold-400)' : 'var(--sand-300)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Sections */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        
        {/* BEDROOMS SECTION */}
        {activeTab === 'bedrooms' && (
          <div>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: '#fff' }}>
                  Five Restful Sleeping Suites
                </h2>
                <p style={{ color: 'var(--sand-300)', marginTop: '0.25rem' }}>
                  Accommodating 10 to 15 guests comfortably with crisp linens, teak beds, and verdant garden vistas.
                </p>
              </div>
              <button
                onClick={() => openGallery('bedrooms')}
                className="kinetic-btn kinetic-btn--outline"
                style={{ fontSize: '0.85rem' }}
              >
                View Bedroom Photos ({villaImages.bedrooms.bedroom1.length + villaImages.bedrooms.bedroom2.length}+)
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {/* Bedroom 1 */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 163, 115, 0.2)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
              }}>
                <div style={{ height: '320px', overflow: 'hidden' }}>
                  <img 
                    src={villaImages.bedrooms.bedroom1[0]} 
                    alt="Master Bedroom 1" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ background: 'var(--gold-400)', color: '#1a110d', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      Air Conditioned
                    </span>
                    <span style={{ background: 'rgba(212, 163, 115, 0.1)', color: 'var(--gold-400)', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      Super King Bed
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.75rem' }}>
                    Master Bedroom 1 (Ground Floor)
                  </h3>
                  <p style={{ color: 'var(--sand-300)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Our signature suite equipped with whisper-quiet air conditioning, a solid wood Super King bed, a dedicated ergonomic work station with fast Wi-Fi, and expansive garden windows.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', color: 'var(--sand-200)', fontSize: '0.9rem' }}>
                    <li>✓ High Efficiency A/C</li>
                    <li>✓ Work Desk & Chair</li>
                    <li>✓ Teak Wardrobe</li>
                    <li>✓ Garden Panorama</li>
                  </ul>
                </div>
              </div>

              {/* Bedroom 2 */}
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 163, 115, 0.2)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
              }}>
                <div style={{ height: '320px', overflow: 'hidden' }}>
                  <img 
                    src={villaImages.bedrooms.bedroom2[0]} 
                    alt="Bedroom 2" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ background: 'var(--gold-400)', color: '#1a110d', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      Air Conditioned
                    </span>
                    <span style={{ background: 'rgba(212, 163, 115, 0.1)', color: 'var(--gold-400)', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                      Super King Bed
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.75rem' }}>
                    Bedroom Suite 2 (Upper Floor)
                  </h3>
                  <p style={{ color: 'var(--sand-300)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    A bright sanctuary bathed in morning light with large glass windows framing tropical treetops. Fully air conditioned for deep island slumber.
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', color: 'var(--sand-200)', fontSize: '0.9rem' }}>
                    <li>✓ High Efficiency A/C</li>
                    <li>✓ Super King Teak Bed</li>
                    <li>✓ Large Picture Windows</li>
                    <li>✓ Direct Balcony Access</li>
                  </ul>
                </div>
              </div>

              {/* Bedrooms 3, 4, 5 Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(212, 163, 115, 0.15)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.3rem' }}>Bedroom 3</h4>
                  <p style={{ color: 'var(--sand-300)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                    Queen bed with garden breeze, ceiling fan, warm timber details, and ample luggage storage.
                  </p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(212, 163, 115, 0.15)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.3rem' }}>Bedroom 4</h4>
                  <p style={{ color: 'var(--sand-300)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                    Cozy private suite ideal for family members or kids, quiet ambiance with natural ventilation.
                  </p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(212, 163, 115, 0.15)' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.3rem' }}>Bedroom 5</h4>
                  <p style={{ color: 'var(--sand-300)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
                    Spacious room with flexible bedding configuration, peaceful garden outlook, and reading corner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LIVING ROOMS SECTION */}
        {activeTab === 'living' && (
          <div>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: '#fff' }}>
                  Two Generous Common Living Lounges
                </h2>
                <p style={{ color: 'var(--sand-300)', marginTop: '0.25rem' }}>
                  Designed so large groups never feel crowded—one on the ground level, another on the mezzanine.
                </p>
              </div>
              <button
                onClick={() => openGallery('living')}
                className="kinetic-btn kinetic-btn--outline"
                style={{ fontSize: '0.85rem' }}
              >
                View Living Room Photos ({villaImages.livingRooms.ground.length + villaImages.livingRooms.mezzanine.length})
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 163, 115, 0.2)',
                overflow: 'hidden'
              }}>
                <img 
                  src={villaImages.livingRooms.ground[0]} 
                  alt="Ground Floor Living Lounge"
                  style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff' }}>
                    Ground Floor Living Hall
                  </h3>
                  <p style={{ color: 'var(--sand-300)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
                    Welcoming entrance foyer with plush sofas, custom timber coffee table, and wide glass double doors opening onto the front porch and garden walkway.
                  </p>
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 163, 115, 0.2)',
                overflow: 'hidden'
              }}>
                <img 
                  src={villaImages.livingRooms.mezzanine[0]} 
                  alt="Mezzanine Upper Living Lounge"
                  style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                />
                <div style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff' }}>
                    Upper Mezzanine Lounge
                  </h3>
                  <p style={{ color: 'var(--sand-300)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '0.75rem' }}>
                    The favorite gathering spot for evening chats and morning tea. Directly connects to the elevated front balcony with panoramic jungle foliage views.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KITCHEN SECTION */}
        {activeTab === 'kitchen' && (
          <div>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: '#fff' }}>
                  Fully Equipped Chef's Kitchen & Dining
                </h2>
                <p style={{ color: 'var(--sand-300)', marginTop: '0.25rem' }}>
                  Everything needed to cook family feasts, brew Ceylon tea, or host outdoor barbecues.
                </p>
              </div>
              <button
                onClick={() => openGallery('kitchen')}
                className="kinetic-btn kinetic-btn--outline"
                style={{ fontSize: '0.85rem' }}
              >
                View Kitchen Photos ({villaImages.kitchenAndDining.kitchen.length + villaImages.kitchenAndDining.dining.length})
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}>
              <div>
                <img 
                  src={villaImages.kitchenAndDining.kitchen[0]} 
                  alt="Granite Kitchen"
                  style={{ width: '100%', borderRadius: '16px', border: '1px solid rgba(212, 163, 115, 0.25)' }}
                />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', color: '#fff', marginBottom: '1rem' }}>
                  Cook at Home or Hire Our Concierge Chef
                </h3>
                <p style={{ color: 'var(--sand-300)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  The villa includes an open granite kitchen featuring modern gas burners, a large refrigerator/freezer, electric kettle, rice cooker, blender, cookware, dinnerware, and filtered drinking water.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: 'var(--sand-200)', fontSize: '0.92rem' }}>
                  <div>✓ 4-Burner Gas Cooktop</div>
                  <div>✓ Refrigerator & Freezer</div>
                  <div>✓ Microwave Oven</div>
                  <div>✓ Electric Kettle & Teaware</div>
                  <div>✓ Complete Cookware & Woks</div>
                  <div>✓ Outdoor BBQ Grille Setup</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BATHROOMS SECTION */}
        {activeTab === 'bathrooms' && (
          <div>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: '#fff' }}>
                  Two Modern Hot Water Bathrooms
                </h2>
                <p style={{ color: 'var(--sand-300)', marginTop: '0.25rem' }}>
                  One on each floor with continuous hot water, rainfall showers, and clean modern finishes.
                </p>
              </div>
              <button
                onClick={() => openGallery('bathrooms')}
                className="kinetic-btn kinetic-btn--outline"
                style={{ fontSize: '0.85rem' }}
              >
                View Bathrooms ({villaImages.bathrooms.length} Photos)
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {villaImages.bathrooms.slice(0, 2).map((img, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '16px',
                  border: '1px solid rgba(212, 163, 115, 0.2)',
                  overflow: 'hidden'
                }}>
                  <img src={img} alt={`Bathroom ${i + 1}`} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#fff' }}>
                      {i === 0 ? 'Ground Floor Bathroom' : 'Upper Floor Bathroom'}
                    </h3>
                    <p style={{ color: 'var(--sand-300)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                      Features hot water geyser system, handheld and rain showerheads, ceramic vanity, mirror, and freshly laundered towels.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OUTDOORS SECTION */}
        {activeTab === 'outdoors' && (
          <div>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: '#fff' }}>
                  Private Grounds, Balcony & Evening Courtyard
                </h2>
                <p style={{ color: 'var(--sand-300)', marginTop: '0.25rem' }}>
                  Secluded tropical vegetation, cinnamon palms, and outdoor open-air spaces.
                </p>
              </div>
              <button
                onClick={() => openGallery('outdoors')}
                className="kinetic-btn kinetic-btn--outline"
                style={{ fontSize: '0.85rem' }}
              >
                View Outdoor Photos ({villaImages.exterior.length + villaImages.balcony.length})
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 163, 115, 0.2)',
                overflow: 'hidden'
              }}>
                <img src={villaImages.balcony[0]} alt="Upper Balcony" style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#fff' }}>
                    Elevated Balcony
                  </h3>
                  <p style={{ color: 'var(--sand-300)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Enjoy cool southern breezes and bird watching amidst palm trees right outside the mezzanine.
                  </p>
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 163, 115, 0.2)',
                overflow: 'hidden'
              }}>
                <img src={villaImages.nightCourtyard} alt="Night Courtyard" style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#fff' }}>
                    Gravel Courtyard BBQ
                  </h3>
                  <p style={{ color: 'var(--sand-300)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Private gravel grounds lit up by warm ambient lighting, perfect for family barbecues and stargazing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Reserve Bar */}
        <div style={{
          marginTop: '5rem',
          padding: '2.5rem',
          borderRadius: '20px',
          background: 'var(--cinnamon-800)',
          border: '1px solid rgba(212, 163, 115, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#fff', marginBottom: '0.25rem' }}>
              Ready to secure your dates at Villa Cinnamoon Castle?
            </h3>
            <p style={{ color: 'var(--sand-300)', fontSize: '0.95rem' }}>
              Direct owner booking with instant WhatsApp confirmation and zero platform markup.
            </p>
          </div>
          <KineticButton to="/reserve" variant="primary">
            Check Calendar & Reserve <ArrowRight size={16} />
          </KineticButton>
        </div>
      </div>

      {/* 131+ Image Categorized Gallery Modal */}
      <GalleryModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialCategory={galleryCategory}
      />
    </div>
  );
}
