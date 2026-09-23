// Curated Phase 1 gallery (Gallery Page IA + Content Inventory). Bedrooms appear
// only as one "Sleeping" group, never numbered. Nearby images are labelled as
// nearby experiences, not villa facilities. Guest photographs are excluded until
// publication consent is confirmed.

export const categories = [
  { key: 'all', label: 'All' },
  { key: 'villa', label: 'Villa & Arrival' },
  { key: 'living', label: 'Living & Dining' },
  { key: 'sleeping', label: 'Sleeping' },
  { key: 'outside', label: 'Garden & Outside' },
  { key: 'nearby', label: 'Around Hikkaduwa' },
];

// Featured strip chapters, in IA order. `lead` is the strip image; selecting a
// chapter opens the viewer at the first gallery image with the same `chapter`.
export const chapters = [
  { key: 'arrival', index: '01', title: 'Arrival', label: 'Villa & entrance', lead: 'villa-facade' },
  { key: 'living', index: '02', title: 'Shared living', label: 'Two lounges, downstairs and up', lead: 'living-mezzanine' },
  { key: 'sleeping', index: '03', title: 'Sleeping spaces', label: 'Five bedrooms', lead: 'sleeping-prepared' },
  { key: 'dining', index: '04', title: 'Kitchen & dining', label: 'Cooking & shared meals', lead: 'dining' },
  { key: 'outside', index: '05', title: 'Garden & outside', label: 'Courtyard, veranda & greenery', lead: 'outdoor-garden' },
  { key: 'nearby', index: '06', title: 'Around Hikkaduwa', label: 'Nearby coast & activities', lead: 'nearby-coast' },
];

const chapterCategory = {
  arrival: 'villa',
  living: 'living',
  dining: 'living',
  sleeping: 'sleeping',
  outside: 'outside',
  nearby: 'nearby',
};

const items = [
  { name: 'villa-facade', chapter: 'arrival', alt: 'The front of the villa, shaded by tall trees', caption: 'The villa from the courtyard' },
  { name: 'arrival-gate', chapter: 'arrival', alt: 'The gravel driveway beside a rustic timber fence', caption: 'Driveway and timber fence' },
  { name: 'villa-sign', chapter: 'arrival', alt: 'The Villa Cinnamoon Castle sign against an evening sky', caption: 'The villa sign at the roadside' },
  { name: 'front-yard', chapter: 'arrival', alt: 'The two-storey villa framed by trees', caption: 'Front of the villa' },
  { name: 'exterior-night', chapter: 'arrival', alt: 'The villa with its lights on after dark', caption: 'The villa after dark' },

  { name: 'living-mezzanine', chapter: 'living', alt: 'The upstairs mezzanine under a high timber-beamed ceiling', caption: 'Upstairs mezzanine' },
  { name: 'living-downstairs', chapter: 'living', alt: 'The downstairs living room beside the staircase', caption: 'Downstairs living room' },
  { name: 'living-seating', chapter: 'living', alt: 'A row of timber armchairs in the downstairs living room', caption: 'Downstairs seating' },
  { name: 'upstairs-lounge', chapter: 'living', alt: 'Cane chairs and a settee in the upstairs lounge', caption: 'Upstairs lounge' },
  { name: 'living-overlook', chapter: 'living', alt: 'The view from the upstairs landing over the mezzanine', caption: 'Upstairs landing' },

  { name: 'dining', chapter: 'dining', alt: 'A wooden dining table with chairs', caption: 'Dining area' },
  { name: 'dining-stairs', chapter: 'dining', alt: 'The dining table at the foot of the staircase', caption: 'Dining area and staircase' },
  { name: 'kitchen', chapter: 'dining', alt: 'The kitchen counter with a gas stove and cookware', caption: 'Kitchen' },

  { name: 'sleeping-prepared', chapter: 'sleeping', alt: 'A double bed made up with fresh linen and folded towels', caption: 'Prepared for arrival' },
  { name: 'sleeping-high-ceiling', chapter: 'sleeping', alt: 'A bedroom under a high timber-beamed ceiling', caption: 'High timber ceiling' },
  { name: 'sleeping-four-poster', chapter: 'sleeping', alt: 'A four-poster bed with white linen', caption: 'Four-poster bed' },
  { name: 'sleeping-white', chapter: 'sleeping', alt: 'A wooden double bed with white linen beside a curtained window', caption: 'Double bed and window' },
  { name: 'sleeping-leaf-print', chapter: 'sleeping', alt: 'A double bed with a leaf-print cover and rolled towels', caption: 'Fresh towels on arrival' },
  { name: 'sleeping-towels', chapter: 'sleeping', alt: 'A double bed with pillows and a stack of towels', caption: 'Ready for your group' },

  { name: 'outdoor-garden', chapter: 'outside', alt: 'The upstairs balcony overlooking banana and coconut palms', caption: 'Upstairs balcony' },
  { name: 'outdoor-veranda', chapter: 'outside', alt: 'The covered veranda opening onto the garden', caption: 'Veranda' },
  { name: 'balcony-doorway', chapter: 'outside', alt: 'An open doorway onto the upstairs balcony', caption: 'Balcony doorway' },
  { name: 'balcony-exterior', chapter: 'outside', alt: 'The curved upstairs balcony among the trees', caption: 'The balcony from the garden' },
  { name: 'garden-palms', chapter: 'outside', alt: 'The villa seen through banana leaves and coconut palms', caption: 'Palms around the villa' },

  { name: 'nearby-coast', chapter: 'nearby', alt: 'Waves washing over a rocky tidal pool at sunset', caption: 'Nearby — the south coast' },
  { name: 'nearby-reef', chapter: 'nearby', alt: 'A snorkeller among striped reef fish', caption: 'Nearby — snorkelling on the reef' },
  { name: 'nearby-kayaks', chapter: 'nearby', alt: 'Yellow kayaks on the rocks beside a lagoon', caption: 'Nearby — lagoon kayaking (arranged on request)' },
];

export const galleryItems = items.map((item) => ({
  ...item,
  category: chapterCategory[item.chapter],
  chapterTitle: chapters.find((c) => c.key === item.chapter).title,
}));
