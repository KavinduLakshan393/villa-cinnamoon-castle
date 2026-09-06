import React, { useState } from 'react';
import { villaImages } from '../../data/images';

export const GalleryModal = ({ isOpen, onClose, initialCategory = 'all' }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeImage, setActiveImage] = useState(null);

  if (!isOpen) return null;

  // Flatten images into categorized list
  const categoryImages = {
    all: [
      villaImages.hero,
      ...villaImages.exterior,
      ...villaImages.livingRooms.ground,
      ...villaImages.livingRooms.mezzanine,
      ...villaImages.bedrooms.bedroom1,
      ...villaImages.bedrooms.bedroom2,
      ...villaImages.kitchenAndDining.kitchen,
      ...villaImages.kitchenAndDining.dining,
      ...villaImages.bathrooms,
      ...villaImages.balcony,
      villaImages.nightCourtyard
    ],
    bedrooms: [
      ...villaImages.bedrooms.bedroom1,
      ...villaImages.bedrooms.bedroom2,
      ...villaImages.bedrooms.bedroom3,
      ...villaImages.bedrooms.bedroom4,
      ...villaImages.bedrooms.bedroom5
    ],
    living: [
      ...villaImages.livingRooms.ground,
      ...villaImages.livingRooms.mezzanine
    ],
    kitchen: [
      ...villaImages.kitchenAndDining.kitchen,
      ...villaImages.kitchenAndDining.dining
    ],
    bathrooms: villaImages.bathrooms,
    outdoors: [
      ...villaImages.exterior,
      ...villaImages.balcony,
      villaImages.nightCourtyard
    ],
    moments: villaImages.guestMoments
  };

  const imagesToDisplay = categoryImages[activeCategory] || categoryImages.all;

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'bedrooms', label: 'Bedrooms (1–5)' },
    { id: 'living', label: 'Living Rooms' },
    { id: 'kitchen', label: 'Kitchen & Dining' },
    { id: 'bathrooms', label: 'Bathrooms' },
    { id: 'outdoors', label: 'Courtyard & Grounds' },
    { id: 'moments', label: 'Guest Moments' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(10, 10, 12, 0.95)',
      zIndex: 2500,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px'
    }} onClick={onClose}>
      
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#FFFFFF'
      }} onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFFFF' }}>
            Villa Cinnamoon Castle Gallery
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            131 Curated Architectural & Experience Photos
          </span>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '2rem',
            cursor: 'pointer'
          }}
        >
          &times;
        </button>
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        padding: '16px 0',
        flexShrink: 0
      }} onClick={(e) => e.stopPropagation()}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid',
              borderColor: activeCategory === cat.id ? 'var(--cinnamon-primary)' : 'rgba(255, 255, 255, 0.2)',
              backgroundColor: activeCategory === cat.id ? 'var(--cinnamon-primary)' : 'transparent',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        padding: '16px 0'
      }} onClick={(e) => e.stopPropagation()}>
        {imagesToDisplay.map((imgSrc, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(imgSrc)}
            style={{
              height: '220px',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <img
              src={imgSrc}
              alt={`Villa Cinnamoon Castle photo ${idx + 1}`}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Photo Lightbox (when an image is clicked) */}
      {activeImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }} onClick={() => setActiveImage(null)}>
          <button
            onClick={() => setActiveImage(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '2.5rem',
              cursor: 'pointer'
            }}
          >
            &times;
          </button>
          <img
            src={activeImage}
            alt="Villa Cinnamoon Castle detail"
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </div>
      )}

    </div>
  );
};
