/**
 * Property Specifications & Content Guide from property_details.md
 */

export const propertyData = {
  name: 'Villa Cinnamoon Castle',
  tagline: 'Find your own peacefulness',
  shortDescription: 'Your private tropical sanctuary just 3.5 km inland from Hikkaduwa’s golden shores.',
  fullDescription: `Welcome to Villa Cinnamoon Castle! Situated in peaceful Arachchikanda just 3.5 km (5 minutes) from Hikkaduwa town and beach, our spacious two-story sanctuary comfortably accommodates 10 to 15 guests. The villa features 5 beautifully appointed bedrooms, 2 modern hot water bathrooms, and 100% private buyout of the entire estate—including a fully equipped granite kitchen, two living halls, and a secluded gravel courtyard with evening BBQ setup.`,
  host: {
    name: 'Dampalla Gamage Devindu',
    title: 'Property Host & Concierge',
    languages: 'English, Sinhala',
    hotline: '+94 76 100 7686',
    hotlineLocal: '076 100 7686',
    secondaryPhone: '+94 70 254 6028',
    secondaryPhoneLocal: '070 254 6028',
    email: 'gamagedeshandevindu13@gmail.com',
    responseRate: 'Under 15 minutes via WhatsApp',
    status: 'Superhost standard 100% private estate buyout'
  },
  location: {
    address: 'Arachchikanda, Hikkaduwa, Southern Province, Sri Lanka',
    postalCode: '80240',
    coordinates: '6.1405° N, 80.1325° E',
    distances: [
      { place: 'Hikkaduwa Coral Reef & Surfing Beach', time: '5 mins', distance: '3.5 km' },
      { place: 'Hikkaduwa Town & Railway Station', time: '5 mins', distance: '3.5 km' },
      { place: 'Galle Fort World Heritage Site', time: '20 mins', distance: '18 km' },
      { place: 'Southern Expressway Interchange', time: '12 mins', distance: '9 km' }
    ]
  },
  specs: [
    { label: 'Bedrooms', value: '5 Suites' },
    { label: 'Max Guests', value: '10–15 Pax' },
    { label: 'Bathrooms', value: '2 Modern' },
    { label: 'To Beach', value: '3.5 km' },
    { label: 'Buyout', value: '100% Private' }
  ],
  rooms: [
    {
      id: 'room-1',
      title: 'Master Bedroom 1',
      badge: 'Air Conditioned',
      isAc: true,
      bed: 'Super King-sized solid wooden bed',
      description: 'Our premier suite featuring high-efficiency air conditioning, a dedicated remote-work desk with ergonomic chair, wardrobe, and warm pendant lighting.',
      features: ['Super King Bed', 'Air Conditioning (A/C)', 'Dedicated Work Desk', 'Garden Views']
    },
    {
      id: 'room-2',
      title: 'Bedroom 2',
      badge: 'Air Conditioned',
      isAc: true,
      bed: 'Super King-sized wooden bed',
      description: 'Sun-drenched bedroom with expansive windows framing lush garden foliage. Air-conditioned with built-in wardrobe.',
      features: ['Super King Bed', 'Air Conditioning (A/C)', 'Large Picture Windows', 'Storage Wardrobe']
    },
    {
      id: 'room-3',
      title: 'Bedroom 3',
      badge: 'Ceiling Fan',
      isAc: false,
      bed: 'King-sized solid wooden bed',
      description: 'Naturally cooled suite with high-efficiency silent ceiling fan, cross-ventilation breeze windows, and tranquil garden orientation.',
      features: ['King Bed', 'Silent Ceiling Fan', 'Cross-Ventilation', 'Garden Outlook']
    },
    {
      id: 'room-4',
      title: 'Bedroom 4 (Attic Suite)',
      badge: 'Vaulted Timber Roof',
      isAc: false,
      bed: 'Super King-sized wooden bed',
      description: 'Distinctive architectural attic design with high vaulted timber roof beams and elevated grove views. Equipped with high-efficiency ceiling fan.',
      features: ['Super King Bed', 'Vaulted Timber Attic', 'Ceiling Fan', 'Elevated Grove View']
    },
    {
      id: 'room-5',
      title: 'Bedroom 5',
      badge: 'Ceiling Fan',
      isAc: false,
      bed: 'Queen-sized solid wooden bed',
      description: 'Tranquil ambient room with natural daylight and solid wooden bed. High-efficiency ceiling fan, perfect for kids or couples.',
      features: ['Queen Bed', 'Silent Ceiling Fan', 'Ambient Natural Light', 'Garden Views']
    }
  ],
  socials: [
    { platform: 'Airbnb', url: 'https://www.airbnb.com/rooms/1651346026185294869', handle: 'Listing 1651346026185294869' },
    { platform: 'Facebook', url: 'https://web.facebook.com/people/Villa-Cinnamoon-Castle/61565740212688/', handle: 'Villa Cinnamoon Castle' },
    { platform: 'Instagram', url: 'https://www.instagram.com/villa_cinnamoon_castle_596', handle: '@villa_cinnamoon_castle_596' },
    { platform: 'TikTok', url: 'https://www.tiktok.com/@villa.cinnamoon.ca', handle: '@villa.cinnamoon.ca' }
  ]
};
