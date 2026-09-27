// Gallery page: one chapter per part of the villa, shown as the visitor scrolls
// and tracked by the wheel. Photographs are the enhanced cinematic set (see
// Documents/06 Design/Home Page Image and Video Prompts.md). Bedrooms appear only
// as one "Sleeping" group, never numbered; nearby photos are labelled as nearby
// experiences, not villa facilities. `ratio` is the frame shape in the grid;
// `lead` is the chapter's highlight photograph, shown in the featured strip.

export const chapters = [
  {
    key: 'arrival',
    lead: 'villa-facade',
    title: 'Arrival',
    label: 'The villa & entrance',
    items: [
      { name: 'villa-facade', ratio: '4 / 3', alt: 'The front of the villa, shaded by tall trees', caption: 'The villa from the courtyard' },
      { name: 'home-villa-sign', ratio: '4 / 5', alt: 'The Villa Cinnamoon Castle sign at the roadside at dusk', caption: 'The sign at the roadside' },
      { name: 'gal-driveway', ratio: '3 / 4', alt: 'The gravel driveway lined by a rustic timber fence and tall trees, with the villa behind', caption: 'The driveway' },
      { name: 'gal-front-yard', ratio: '3 / 4', alt: 'The front of the two-storey villa framed by large trees', caption: 'The front garden' },
      { name: 'gal-night', ratio: '3 / 4', alt: 'The villa at night with its veranda and windows lit', caption: 'The villa after dark' },
      { name: 'home-balcony-exterior', ratio: '3 / 4', alt: 'The white villa with its curved upstairs balcony among the trees', caption: 'The villa among the trees' },
    ],
  },
  {
    key: 'living',
    lead: 'home-living-mezzanine',
    title: 'Shared living',
    label: 'Two living areas, downstairs and up',
    items: [
      { name: 'home-living-mezzanine', ratio: '16 / 9', wide: true, alt: 'The open upstairs mezzanine under a timber-beamed ceiling, looking down to the dining table on the ground floor', caption: 'The mezzanine, open to the floor below' },
      { name: 'home-living-lounge', ratio: '4 / 5', alt: 'Cane-seated lounge chairs around a low table in the upstairs sitting area', caption: 'Upstairs sitting area' },
      { name: 'home-living-downstairs', ratio: '3 / 4', alt: 'The downstairs living room with a row of cane-seated armchairs beside the staircase', caption: 'Downstairs living room' },
      { name: 'home-living-upstairs-dining', ratio: '4 / 5', alt: 'A dining table with cane chairs at the end of the upstairs mezzanine', caption: 'Upstairs dining corner' },
      { name: 'gal-upstairs-dining', ratio: '3 / 4', alt: 'A long wooden dining table with cane chairs under the vaulted timber ceiling upstairs', caption: 'Upstairs dining table' },
      { name: 'gal-living-from-above', ratio: '3 / 4', alt: 'The downstairs living and dining area seen from the upstairs landing', caption: 'Looking down from the landing' },
      { name: 'home-living-entrance', ratio: '4 / 5', alt: 'Cane-seated armchairs along the wall near the timber front door', caption: 'By the front door' },
      { name: 'home-living-stairs', ratio: '3 / 4', alt: 'The staircase with a timber handrail rising above the downstairs seating', caption: 'The staircase' },
      { name: 'home-living-stair-light', ratio: '4 / 5', alt: 'The staircase seen from the landing, lit by a warm wall light', caption: 'From the landing' },
    ],
  },
  {
    key: 'sleeping',
    lead: 'home-bed-pendant',
    title: 'Sleeping',
    label: 'Five bedrooms and two bathrooms',
    items: [
      { name: 'home-bed-pendant', ratio: '4 / 5', alt: 'A bedroom under a high timber-beamed ceiling with a warm pendant light', caption: 'Under the timber ceiling' },
      { name: 'home-bed-check-throw', ratio: '4 / 5', alt: 'A double bed with white linen, a yellow check throw and rolled towels', caption: 'Prepared for arrival' },
      { name: 'gal-bed-timber', ratio: '3 / 4', alt: 'A double bed with white linen under a sloped timber ceiling and a pendant bulb', caption: 'Beneath the beams' },
      { name: 'gal-bed-four-poster', ratio: '3 / 4', alt: 'A dark wooden four-poster bed with white linen, beside a patterned curtain', caption: 'The four-poster room' },
      { name: 'home-bed-four-poster', ratio: '4 / 5', alt: 'A four-poster bed seen past a patterned curtain, under a timber ceiling', caption: 'Four-poster bed' },
      { name: 'home-bed-ac', ratio: '4 / 5', alt: 'An air-conditioned bedroom with a wooden double bed and a wall light', caption: 'Air-conditioned bedroom' },
      { name: 'home-bed-towels', ratio: '4 / 5', alt: 'Twin beds made up together with white linen and rolled towels', caption: 'Fresh towels on arrival' },
      { name: 'home-bed-leaf-print', ratio: '4 / 5', alt: 'A double bed with a navy leaf-print cover beside a wooden dresser', caption: 'Leaf-print bedroom' },
      { name: 'home-bed-leaf-grey', ratio: '4 / 5', alt: 'A double bed with a leaf-print cover and grey throw beside an arched wooden door', caption: 'Beside the arched door' },
      { name: 'home-bed-white', ratio: '4 / 5', alt: 'A carved wooden double bed with white linen under a sloped timber ceiling', caption: 'Carved wooden bed' },
      { name: 'home-bed-mirror', ratio: '4 / 3', alt: 'A bedroom with striped curtains, a tall wooden cupboard and a wall mirror', caption: 'Wardrobe and mirror' },
      { name: 'home-bathroom', ratio: '3 / 4', alt: 'A bathroom with a pedestal basin, mirror, towel rail and louvred window', caption: 'One of two bathrooms' },
    ],
  },
  {
    key: 'dining',
    lead: 'home-kitchen',
    title: 'Kitchen & dining',
    label: 'Cooking and shared meals',
    items: [
      { name: 'home-kitchen', ratio: '3 / 4', alt: 'The kitchen with a long wooden counter, gas stove, rice cooker, kettle, washing machine and a louvred window', caption: 'The kitchen' },
      { name: 'home-dining', ratio: '4 / 5', alt: 'A wooden dining table with chairs beside the refrigerator and grey curtains', caption: 'Dining area' },
      { name: 'home-dining-stairs', ratio: '4 / 5', alt: 'A long wooden dining table at the foot of the staircase', caption: 'Dining by the staircase' },
    ],
  },
  {
    key: 'outside',
    lead: 'home-porch',
    title: 'Garden & outside',
    label: 'Veranda, balcony and greenery',
    items: [
      { name: 'home-porch', ratio: '3 / 4', alt: 'The covered veranda with timber roof beams and a white pillar, opening onto the garden', caption: 'Veranda' },
      { name: 'home-balcony-walk', ratio: '4 / 3', alt: 'The upstairs balcony walkway looking out over banana plants, coconut palms and paddy fields', caption: 'Upstairs balcony' },
      { name: 'gal-balcony-door', ratio: '3 / 4', alt: 'The open doorway onto the upstairs balcony, with trees and palms beyond', caption: 'Out to the balcony' },
      { name: 'gal-balcony-walkway', ratio: '3 / 4', alt: 'The balcony walkway with a white pillar and timber beams, looking out to the trees', caption: 'Balcony walkway' },
      { name: 'gal-palms', ratio: '3 / 4', alt: 'The villa seen from below through banana leaves and coconut palms', caption: 'Among the palms' },
    ],
  },
  {
    key: 'nearby',
    lead: 'home-nearby-coast',
    title: 'Around Hikkaduwa',
    label: 'Nearby coast and activities',
    items: [
      { name: 'home-nearby-coast', ratio: '4 / 5', alt: 'Waves pouring into a rocky tidal pool on the coast at sunset', caption: 'Nearby — the south coast' },
      { name: 'home-nearby-reef', ratio: '8 / 7', alt: 'A snorkeller swimming among striped reef fish in clear water', caption: 'Nearby — snorkelling on the reef' },
      { name: 'home-nearby-turtle', ratio: '4 / 5', alt: 'A sea turtle in the clear shallows beside a swimmer', caption: 'Nearby — sea turtles in the shallows' },
      { name: 'home-nearby-kayaks', ratio: '4 / 3', alt: 'A group of friends in life jackets kayaking on a calm lagoon', caption: 'Nearby — kayaking on the lagoon' },
    ],
  },
];

/** Every photograph in chapter order, each carrying its chapter title for the viewer. */
export const galleryItems = chapters.flatMap((chapter) =>
  chapter.items.map((item) => ({ ...item, chapter: chapter.key, chapterTitle: chapter.title })),
);
