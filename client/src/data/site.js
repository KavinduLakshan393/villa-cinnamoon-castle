export const site = {
  name: 'Villa Cinnamoon Castle',
  description: 'A private villa for families and groups near Hikkaduwa.',
  locality: 'Arachchikanda, Hikkaduwa, Sri Lanka',
  address: 'Arachchikanda, Hikkaduwa, Southern Province, Sri Lanka',
  whatsapp: {
    label: '+94 76 100 7686',
    href: 'https://wa.me/94761007686',
  },
  // Verified official Google Maps listing and coordinates.
  googleMapsUrl: 'https://maps.app.goo.gl/Nsd11SNNdLVSAZ9fA',
  googleMapsEmbedUrl: 'https://www.google.com/maps?q=6.1416876,80.1300153&z=16&output=embed',
  // OPEN-001: publish only the verified official Google Reviews URL.
  googleReviewsUrl: null,
  // OPEN-003: set to the real publication date (YYYY-MM-DD) before launch.
  privacyLastUpdated: null,
};

// DEC-013 navigation model. `section` items target Home anchors.
export const navItems = [
  { label: 'The Villa', to: '/#villa', section: 'villa' },
  { label: 'Stay Options', to: '/stay-options' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Location', to: '/#location', section: 'location' },
];

export const inquiryPath = '/inquiry';

export const profiles = [
  { label: 'Facebook', href: 'https://web.facebook.com/people/Villa-Cinnamoon-Castle/61565740212688/' },
  { label: 'Instagram', href: 'https://www.instagram.com/villa_cinnamoon_castle_596' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@villa.cinnamoon.ca' },
];

export const accommodationProfile = {
  label: 'Airbnb',
  href: 'https://www.airbnb.com/rooms/1651346026185294869',
};
