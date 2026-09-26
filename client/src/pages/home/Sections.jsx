import { useEffect, useRef, useState } from 'react';
import Frame from '../../components/Frame.jsx';
import Button from '../../components/Button.jsx';
import { RevealHeading, ScrubText, Eyebrow } from '../../components/Reveal.jsx';
import Mosaic from './Mosaic.jsx';
import Cinemagraph from './Cinemagraph.jsx';
import { useOpenPhoto } from './PhotoViewer.jsx';
import ScrollPath from './ScrollPath.jsx';
import { ROUTE_PATH } from './paths.js';
import { site, inquiryPath } from '../../data/site.js';
import { startingRate, formatRupees } from '../../data/packages.js';

// ---------- Home photographs ----------
// Each mosaic's photographs, in columns. Selecting a photo opens the viewer on
// that section's set (the lead mezzanine image joins Shared living).

const photosOf = (columns) => columns.flatMap((column) => column.items);

const SHARED_LEAD = {
  name: 'home-living-mezzanine',
  alt: 'The open upstairs mezzanine under a timber-beamed ceiling, looking down to the dining table on the ground floor',
  caption: 'The mezzanine, open to the floor below',
};

const SHARED_COLUMNS = [
  {
    shift: 0,
    items: [
      {
        name: 'home-living-lounge',
        alt: 'Wooden cane-seated lounge chairs around a low table in the upstairs sitting area',
        caption: 'Upstairs sitting area',
        ratio: '4 / 5',
      },
      {
        name: 'home-living-stair-light',
        alt: 'The staircase seen from the landing, lit by a warm wall light',
        ratio: '4 / 5',
      },
    ],
  },
  {
    shift: 70,
    items: [
      {
        name: 'home-living-downstairs',
        alt: 'The downstairs living room with a row of cane-seated armchairs beside the staircase',
        caption: 'Downstairs living room',
        ratio: '3 / 4',
      },
      {
        name: 'home-living-entrance',
        alt: 'Cane-seated armchairs along the wall near the timber front door',
        ratio: '4 / 5',
      },
    ],
  },
  {
    shift: -50,
    items: [
      {
        name: 'home-living-upstairs-dining',
        alt: 'A dining table with cane chairs at the end of the upstairs mezzanine',
        caption: 'Upstairs dining corner',
        ratio: '4 / 5',
      },
      {
        name: 'home-living-stairs',
        alt: 'The staircase with a timber handrail rising above the downstairs seating',
        ratio: '3 / 4',
      },
    ],
  },
];

const SLEEPING_COLUMNS = [
  {
    shift: 0,
    items: [
      {
        name: 'home-bed-check-throw',
        alt: 'A double bed with white linen, a yellow check throw and rolled towels under a timber ceiling',
        ratio: '4 / 5',
      },
      {
        name: 'home-bed-towels',
        alt: 'Twin beds made up together with white linen and rolled towels',
        ratio: '4 / 5',
      },
      {
        name: 'home-bed-leaf-print',
        alt: 'A double bed with a navy leaf-print cover beside a wooden dresser',
        ratio: '4 / 5',
      },
      {
        name: 'home-bed-pendant',
        alt: 'A bedroom under a high timber-beamed ceiling with a warm pendant light',
        ratio: '4 / 5',
      },
      {
        name: 'home-bathroom',
        alt: 'A bathroom with a pedestal basin, mirror, towel rail and louvred window',
        caption: 'One of two bathrooms, with hot-water showers',
        ratio: '3 / 4',
      },
    ],
  },
  {
    shift: 90,
    items: [
      {
        name: 'home-bed-four-poster',
        alt: 'A four-poster bed seen past a patterned curtain, under a timber ceiling',
        ratio: '4 / 5',
      },
      {
        name: 'home-bed-ac',
        alt: 'An air-conditioned bedroom with a wooden double bed and a wall light',
        caption: 'Air-conditioned bedroom',
        ratio: '4 / 5',
      },
      {
        name: 'home-bed-leaf-grey',
        alt: 'A double bed with a leaf-print cover and grey throw beside an arched wooden door',
        ratio: '4 / 5',
      },
      {
        name: 'home-bed-white',
        alt: 'A carved wooden double bed with white linen under a sloped timber ceiling',
        ratio: '4 / 5',
      },
      {
        name: 'home-bed-mirror',
        alt: 'A bedroom with striped curtains, a tall wooden cupboard and a wall mirror',
        ratio: '4 / 3',
      },
    ],
  },
];

const KITCHEN_COLUMNS = [
  {
    shift: 0,
    items: [
      {
        name: 'home-kitchen',
        alt: 'The kitchen with a long wooden counter, gas stove, rice cooker, kettle, washing machine and a louvred window',
        caption: 'Kitchen',
        ratio: '3 / 4',
      },
    ],
  },
  {
    shift: 80,
    items: [
      {
        name: 'home-dining',
        alt: 'A wooden dining table with chairs beside the refrigerator and grey curtains',
        caption: 'Dining area',
        ratio: '4 / 5',
      },
      {
        name: 'home-dining-stairs',
        alt: 'A long wooden dining table at the foot of the staircase',
        ratio: '4 / 5',
      },
    ],
  },
];

const OUTDOOR_COLUMNS = [
  {
    shift: 0,
    items: [
      {
        name: 'home-porch',
        alt: 'The covered veranda with timber roof beams and a white pillar, opening onto the garden',
        caption: 'Veranda',
        ratio: '3 / 4',
      },
    ],
  },
  {
    shift: -60,
    items: [
      {
        name: 'home-balcony-walk',
        alt: 'The upstairs balcony walkway looking out over banana plants, coconut palms and paddy fields',
        caption: 'Upstairs balcony',
        ratio: '4 / 3',
      },
      {
        name: 'home-villa-sign',
        alt: 'The Villa Cinnamoon Castle sign at the roadside at dusk',
        ratio: '4 / 5',
      },
    ],
  },
  {
    shift: 60,
    items: [
      {
        name: 'home-balcony-exterior',
        alt: 'The white villa with its curved upstairs balcony among the trees',
        ratio: '3 / 4',
      },
    ],
  },
];

const NEARBY_COLUMNS = [
  {
    shift: 0,
    items: [
      {
        name: 'home-nearby-coast',
        alt: 'Waves pouring into a rocky tidal pool on the coast at sunset',
        caption: 'Nearby — the south coast',
        ratio: '4 / 5',
      },
      {
        name: 'home-nearby-kayaks',
        alt: 'A group of friends in life jackets kayaking on a calm lagoon',
        caption: 'Nearby — kayaking on the lagoon',
        ratio: '4 / 3',
      },
    ],
  },
  {
    shift: 80,
    items: [
      {
        name: 'home-nearby-reef',
        alt: 'A snorkeller swimming among striped reef fish in clear water',
        caption: 'Nearby — snorkelling on the reef',
        ratio: '8 / 7',
      },
      {
        name: 'home-nearby-turtle',
        alt: 'A sea turtle in the clear shallows beside a swimmer',
        caption: 'Nearby — sea turtles in the shallows',
        ratio: '4 / 5',
      },
    ],
  },
];

const SHARED_ITEMS = [SHARED_LEAD, ...photosOf(SHARED_COLUMNS)];
const SLEEPING_ITEMS = photosOf(SLEEPING_COLUMNS);
const KITCHEN_ITEMS = photosOf(KITCHEN_COLUMNS);
const OUTDOOR_ITEMS = photosOf(OUTDOOR_COLUMNS);
const NEARBY_ITEMS = photosOf(NEARBY_COLUMNS);

export function Overview() {
  return (
    <section id="villa" className="section overview" aria-labelledby="villa-title">
      <div className="container grid-12">
        <Eyebrow className="overview__eyebrow">
          The villa
        </Eyebrow>
        <div className="overview__body">
          <RevealHeading className="section-heading" id="villa-title">
            The whole villa is <span className="editorial">yours.</span>
          </RevealHeading>
          <ScrubText className="overview__statement">
            “No shared areas and no other guests. Your group has private use of the living spaces, kitchen and garden
            throughout the stay.”
          </ScrubText>
          <ul className="facts" aria-label="Included in every stay">
            {['Two living areas', 'Full kitchen', 'Two bathrooms', 'Wi-Fi'].map((fact, i) => (
              <li key={fact} className="facts__item" data-reveal="fade">
                <span className="facts__index">{String(i + 1).padStart(2, '0')}</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SharedLiving() {
  const open = useOpenPhoto(SHARED_ITEMS, 'Shared living');
  return (
    <section className="section shared" aria-labelledby="shared-title">
      <div className="container grid-12">
        <header className="split-intro">
          <Eyebrow>Shared living</Eyebrow>
          <RevealHeading id="shared-title">Two living areas, so the group can spread out.</RevealHeading>
          <p className="body-copy split-intro__copy" data-reveal="fade">
            The main living room is downstairs with seating and a TV. Upstairs, the open mezzanine offers a quieter place to
            sit.
          </p>
        </header>
        <Frame
          className="shared__lead"
          {...SHARED_LEAD}
          ratio="16 / 9"
          sizes="(min-width: 760px) 92vw, 100vw"
          onOpen={open}
        />
      </div>
      <div className="container">
        <Mosaic
          className="shared__mosaic"
          sizes="(min-width: 760px) 30vw, 46vw"
          columns={SHARED_COLUMNS}
          onOpen={open}
        />
      </div>
    </section>
  );
}

/** Text-only interlude between sections: words brighten with scroll (text reveal 2). */
export function QuoteBand({ children }) {
  return (
    <section className="section quote-band" aria-label="About the villa">
      <div className="container">
        <ScrubText as="blockquote" className="quote-band__text">
          {children}
        </ScrubText>
      </div>
    </section>
  );
}

export function Sleeping() {
  const open = useOpenPhoto(SLEEPING_ITEMS, 'Sleeping arrangements');
  return (
    <section className="section sleeping" aria-labelledby="sleeping-title">
      <div className="container grid-12">
        <div className="sleeping__text">
          <Eyebrow>Sleeping arrangements</Eyebrow>
          <RevealHeading id="sleeping-title">Five bedrooms, prepared for your group.</RevealHeading>
          <p className="body-copy" data-reveal="fade">
            Two bedrooms have air conditioning on A/C stay options. The remaining bedrooms have stand fans. For groups above
            10, extra sleeping arrangements are confirmed with the host during the inquiry.
          </p>
        </div>
        <Mosaic
          className="sleeping__images"
          sizes="(min-width: 760px) 24vw, 46vw"
          columns={SLEEPING_COLUMNS}
          onOpen={open}
        />
      </div>
    </section>
  );
}

export function KitchenDining() {
  const open = useOpenPhoto(KITCHEN_ITEMS, 'Kitchen & dining');
  return (
    <section className="section kitchen" aria-labelledby="kitchen-title">
      <div className="container grid-12">
        <header className="split-intro">
          <Eyebrow>Kitchen &amp; dining</Eyebrow>
          <RevealHeading id="kitchen-title">Cook your own meals and eat together.</RevealHeading>
          <p className="body-copy split-intro__copy" data-reveal="fade">
            The kitchen includes a gas stove, refrigerator, rice cooker, kettle, cookware and tableware. A dining area is
            available for shared meals.
          </p>
        </header>
      </div>
      <div className="container">
        <Mosaic
          className="kitchen__mosaic"
          sizes="(min-width: 760px) 44vw, 46vw"
          columns={KITCHEN_COLUMNS}
          onOpen={open}
        />
      </div>
    </section>
  );
}

export function Outdoor() {
  const open = useOpenPhoto(OUTDOOR_ITEMS, 'Outside');
  return (
    <section className="section outdoor" aria-labelledby="outdoor-title">
      <div className="container grid-12">
        <header className="split-intro">
          <Eyebrow>Outside</Eyebrow>
          <RevealHeading id="outdoor-title">
            Private outdoor space, surrounded by <span className="editorial">greenery.</span>
          </RevealHeading>
          <p className="body-copy split-intro__copy" data-reveal="fade">
            The villa has a gravel courtyard, shaded garden, front veranda and an upstairs balcony overlooking the trees.
          </p>
        </header>
      </div>
      <div className="container">
        <Mosaic
          className="outdoor__mosaic"
          sizes="(min-width: 760px) 30vw, 46vw"
          columns={OUTDOOR_COLUMNS}
          onOpen={open}
        />
      </div>
    </section>
  );
}

export function Balcony() {
  return (
    <Cinemagraph
      id="balcony"
      name="balcony"
      alt="The view from the upstairs balcony: a curved white wall, a timber roof eave, trees and coconut palms"
      eyebrow="The balcony"
    >
      Mornings on the balcony, <span className="editorial">above the palms,</span> with nowhere else to be.
    </Cinemagraph>
  );
}

export function Beach() {
  return (
    <Cinemagraph
      id="beach"
      name="beach"
      alt="An aerial view of Hikkaduwa Beach with its reef, moored boats and palm-lined sand"
      eyebrow="Hikkaduwa Beach"
      note="Nearby · 3.5 km from the villa, about 5 minutes by car"
    >
      Reef, surf and golden sand, <span className="editorial">five minutes down the road.</span>
    </Cinemagraph>
  );
}

const amenityGroups = [
  {
    title: 'Comfort',
    items: [
      'Wi-Fi',
      'Air conditioning in two bedrooms with A/C stay options',
      'Stand fans in the remaining bedrooms and living areas',
      'Hot-water showers',
    ],
  },
  {
    title: 'Kitchen & dining',
    items: ['Gas stove', 'Refrigerator and freezer', 'Rice cooker and kettle', 'Cookware and tableware', 'Dining table'],
  },
  { title: 'Living & practical', items: ['Two living areas', 'TV', 'Workspace', 'Washing machine and iron'] },
  { title: 'Outside', items: ['Private garden and courtyard', 'Gated on-site parking', 'Veranda and upstairs balcony'] },
];

const onRequest = [
  'Private chef',
  'BBQ setup',
  'Lagoon or river boat safari',
  'Kayaking',
  'Snorkelling',
  'Underwater photography or photo shoots',
];

export function Includes() {
  return (
    <section className="section includes" aria-labelledby="includes-title">
      <div className="container">
        <Eyebrow>Amenities</Eyebrow>
        <RevealHeading id="includes-title" className="section-heading includes__title">
          What the villa includes
        </RevealHeading>
        <div className="includes__grid">
          {amenityGroups.map((group) => (
            <div key={group.title} className="includes__group" data-reveal="fade">
              <h3 className="includes__heading">{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="on-request" data-reveal="fade">
          <h3 className="subheading">Available on request</h3>
          <ul className="on-request__list">
            {onRequest.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="caption on-request__note">Availability and cost are confirmed directly with the host.</p>
        </div>
      </div>
    </section>
  );
}

export function Nearby() {
  const open = useOpenPhoto(NEARBY_ITEMS, 'Nearby');
  return (
    <section className="section nearby" aria-labelledby="nearby-title">
      <div className="container grid-12">
        <header className="split-intro">
          <Eyebrow>Nearby</Eyebrow>
          <RevealHeading id="nearby-title">Hikkaduwa is 3.5&nbsp;km away.</RevealHeading>
          <p className="body-copy split-intro__copy" data-reveal="fade">
            The town, beach, coral reef and surf spots are a short trip from the villa. Galle Fort is around 20 minutes away
            by road.
          </p>
        </header>
      </div>
      <div className="container">
        {/* Decorative: the heading already states the distance. */}
        <div className="route" aria-hidden="true">
          <ScrollPath mode="draw" d={ROUTE_PATH} start="top 85%" end="top 35%" />
          <span className="route__stop route__stop--start">The villa</span>
          <span className="route__distance">3.5 km · about 5 minutes</span>
          <span className="route__stop route__stop--end">Hikkaduwa Beach</span>
        </div>
        <Mosaic
          className="nearby__mosaic"
          sizes="(min-width: 760px) 44vw, 46vw"
          columns={NEARBY_COLUMNS}
          onOpen={open}
        />
      </div>
    </section>
  );
}

/**
 * Visitor-initiated map (NFR-PRV-04, Privacy notice): nothing is requested from
 * Google until the visitor chooses to show the map.
 */
function LocationMap() {
  const [shown, setShown] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    if (shown) frameRef.current?.focus();
  }, [shown]);

  if (shown) {
    return (
      <div className="location__map">
        <iframe
          ref={frameRef}
          src={site.googleMapsEmbedUrl}
          title="Map showing Villa Cinnamoon Castle in Arachchikanda, Hikkaduwa"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="location__map location__map--placeholder">
      <svg className="location__pin" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
        <circle cx="12" cy="10" r="2.4" />
      </svg>
      <Button onClick={() => setShown(true)} tone="light">
        Show map
      </Button>
      <p className="location__map-note">
        The map loads from Google Maps. Google processes data under its{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          privacy policy<span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
    </div>
  );
}

export function Location() {
  return (
    <section id="location" className="section location" aria-labelledby="location-title">
      <div className="container">
        <div className="location__panel">
          {/* Heading at the top, address and directions at the bottom: the column spans the map's height. */}
          <div className="location__info">
            <div className="location__heading">
              <Eyebrow>Location</Eyebrow>
              <RevealHeading id="location-title">Find us in Arachchikanda.</RevealHeading>
            </div>
            <div className="location__details" data-reveal="fade">
              <address className="location__address">{site.address}</address>
              {site.googleMapsUrl && (
                <Button to={site.googleMapsUrl} variant="swipe" tone="dark">
                  Get Directions
                </Button>
              )}
            </div>
          </div>
          {site.googleMapsEmbedUrl && (
            <div className="location__map-col" data-reveal="fade">
              <LocationMap />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function StayPreview() {
  const weekday = startingRate('WEEKDAY');
  const weekend = startingRate('WEEKEND');
  const blocks = [
    {
      title: 'Weekday stays',
      rate: weekday,
      text: 'For couples, families and groups. Rates vary by group size and A/C choice.',
    },
    { title: 'Weekend stays', rate: weekend, text: 'Full-villa stays for groups of up to 15 guests.' },
  ].filter((block) => block.rate !== null);

  return (
    <section className="section stay" aria-labelledby="stay-title">
      <div className="container grid-12">
        <header className="stay__intro">
          <Eyebrow>Stay options</Eyebrow>
          <RevealHeading id="stay-title">Options for different group sizes.</RevealHeading>
        </header>
        <div className="stay__blocks">
          {blocks.map((block) => (
            <article key={block.title} className="stay__block" data-reveal="fade">
              <h3 className="stay__label">{block.title}</h3>
              <p className="stay__rate">
                <span className="stay__from">From</span>
                <span className="stay__amount">{formatRupees(block.rate)}</span>
                <span className="stay__unit">per night</span>
              </p>
              <p className="body-copy">{block.text}</p>
            </article>
          ))}
        </div>
        <div className="stay__action" data-reveal="fade">
          <Button to="/stay-options" variant="swipe" tone="dark">
            View Stay Options
          </Button>
        </div>
      </div>
    </section>
  );
}

export function InquiryCta() {
  return (
    <section className="section inquiry-cta" aria-labelledby="inquiry-title">
      <div className="container grid-12">
        <Frame
          className="inquiry-cta__image"
          name="arrival-gate"
          alt="The villa's gravel driveway, lined by a rustic timber fence and tall trees"
          ratio="4 / 5"
          sizes="(min-width: 1000px) 36vw, 90vw"
        />
        <div className="inquiry-cta__text">
          <Eyebrow>Send an inquiry</Eyebrow>
          <RevealHeading id="inquiry-title">Send your dates to the host.</RevealHeading>
          <p className="body-copy" data-reveal="fade">
            This is an inquiry only. The host will confirm availability and pricing on WhatsApp.
          </p>
          <div data-reveal="fade">
            <Button to={inquiryPath}>Send Inquiry</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
