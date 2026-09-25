import { useEffect, useRef, useState } from 'react';
import Frame from '../../components/Frame.jsx';
import Button from '../../components/Button.jsx';
import { RevealHeading, ScrubText, Eyebrow } from '../../components/Reveal.jsx';
import { site, inquiryPath } from '../../data/site.js';
import { startingRate, formatRupees } from '../../data/packages.js';

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
          className="shared__downstairs"
          name="living-downstairs"
          alt="The downstairs living room with timber chairs beside the staircase"
          caption="Downstairs living room"
          ratio="3 / 4"
          sizes="(min-width: 1000px) 40vw, 90vw"
        />
        <Frame
          className="shared__upstairs"
          name="living-mezzanine"
          alt="The upstairs mezzanine under a high timber-beamed ceiling, with a small table and chairs"
          caption="Upstairs mezzanine"
          ratio="4 / 5"
          sizes="(min-width: 1000px) 34vw, 90vw"
        />
      </div>
    </section>
  );
}

export function Sleeping() {
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
        <div className="sleeping__images">
          <Frame
            name="sleeping-prepared"
            alt="A double bed made up with fresh linen, pillows and folded towels"
            ratio="4 / 5"
            sizes="(min-width: 1000px) 26vw, 45vw"
          />
          <Frame
            className="sleeping__offset"
            name="sleeping-high-ceiling"
            alt="A bedroom under a high timber-beamed ceiling with a wooden double bed"
            ratio="4 / 5"
            sizes="(min-width: 1000px) 26vw, 45vw"
          />
        </div>
      </div>
    </section>
  );
}

export function KitchenDining() {
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
        <Frame
          className="kitchen__kitchen"
          name="kitchen"
          alt="The kitchen counter with a gas stove, kettle and cookware"
          caption="Kitchen"
          ratio="4 / 3"
          sizes="(min-width: 1000px) 56vw, 90vw"
        />
        <Frame
          className="kitchen__dining"
          name="dining"
          alt="A wooden dining table with chairs beside the kitchen"
          caption="Dining area"
          ratio="3 / 4"
          sizes="(min-width: 1000px) 28vw, 90vw"
        />
      </div>
    </section>
  );
}

export function Outdoor() {
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
        <Frame
          className="outdoor__garden"
          name="outdoor-garden"
          alt="The upstairs balcony looking out over banana and coconut palms"
          caption="Upstairs balcony"
          ratio="4 / 3"
          sizes="(min-width: 1000px) 62vw, 90vw"
        />
        <Frame
          className="outdoor__veranda"
          name="outdoor-veranda"
          alt="The covered veranda with timber roof beams, opening onto the garden"
          caption="Veranda"
          ratio="3 / 4"
          sizes="(min-width: 1000px) 24vw, 70vw"
        />
      </div>
    </section>
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
        <Frame
          className="nearby__coast"
          name="nearby-coast"
          alt="Waves washing over a rocky tidal pool on the coast at sunset"
          caption="Nearby — the south coast"
          ratio="4 / 5"
          sizes="(min-width: 1000px) 34vw, 90vw"
        />
        <Frame
          className="nearby__reef"
          name="nearby-reef"
          alt="A snorkeller swimming among striped reef fish in clear water"
          caption="Nearby — snorkelling on the reef"
          ratio="8 / 7"
          sizes="(min-width: 1000px) 38vw, 90vw"
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
