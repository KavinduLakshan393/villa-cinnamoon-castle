import { useRef } from 'react';
import Frame from '../components/Frame.jsx';
import Button from '../components/Button.jsx';
import { RevealHeading, Eyebrow } from '../components/Reveal.jsx';
import { useFadeReveals } from '../lib/reveal.js';
import { inquiryPath } from '../data/site.js';
import { stayRows, formatRupees } from '../data/packages.js';
import { usePackages } from '../data/PackagesContext.jsx';
import './StayOptions.css';

const NOT_OFFERED = 'Not offered';

function Price({ amount }) {
  if (amount === null) return <span className="price price--none">{NOT_OFFERED}</span>;
  return <span className="price">{formatRupees(amount)}</span>;
}

function Hero() {
  return (
    <section className="stay-hero" aria-labelledby="stay-hero-title">
      <div className="container stay-hero__grid">
        <Eyebrow>Stay options</Eyebrow>
        <RevealHeading as="h1" id="stay-hero-title" className="stay-hero__title" start="top 100%" delay={0.1}>
          Find the right stay for <span className="editorial">your group.</span>
        </RevealHeading>
        <div className="stay-hero__aside" data-reveal="fade">
          <p className="lead">
            Enjoy flexible weekday stays tailored to your party, or reserve the entire private villa for weekend
            gatherings of up to 15 guests.
          </p>
          <div className="stay-hero__actions">
            <Button to={inquiryPath}>Send Inquiry</Button>
            <Button to="/stay-options#rates" variant="swipe" tone="dark">
              View rates
            </Button>
          </div>
        </div>
      </div>
      <div className="container">
        <Frame
          className="stay-hero__image"
          name="villa-facade"
          alt="The front of Villa Cinnamoon Castle, a two-storey white house with a tiled veranda roof, shaded by tall trees"
          ratio={null}
          sizes="(min-width: 1680px) 1600px, 94vw"
        />
      </div>
    </section>
  );
}

const dateRules = [
  { title: 'Weekday nights', days: 'Monday to Thursday', text: 'Stays sized for couples, families and groups.' },
  { title: 'Weekend nights', days: 'Friday, Saturday and Sunday', text: 'The whole villa, for up to 15 guests.' },
  { title: 'Mixed stays', days: 'Weekday and weekend', text: 'Each night is charged at its own rate.' },
];

function WeekdayTable() {
  const rows = stayRows('WEEKDAY');
  return (
    <div className="rate-group">
      <header className="rate-group__header">
        <h3 className="subheading">Weekday nights</h3>
        <p className="caption">Rates per night, Monday to Thursday</p>
      </header>
      <table className="rate-table">
        <caption className="sr-only">Weekday rates per night by group size, without and with air conditioning</caption>
        <thead>
          <tr>
            <th scope="col">Group size</th>
            <th scope="col">Stay</th>
            <th scope="col">Without A/C</th>
            <th scope="col">With A/C</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <th scope="row" className="rate-table__guests">
                Up to {row.maxGuests} guests
              </th>
              <td className="rate-table__stay">
                <span className="rate-table__name">{row.name}</span>
                <span className="rate-table__detail">{row.detail}</span>
              </td>
              <td data-label="Without A/C">
                <Price amount={row.standard} />
              </td>
              <td data-label="With A/C">
                <Price amount={row.ac} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="rate-notes">
        <li>
          <strong>Choosing your setup:</strong> The Family stay provides a shared family layout, while Two Bedrooms
          offers two completely separate rooms.
        </li>
        <li>
          <strong>Groups over 10:</strong> Additional sleeping arrangements are comfortably arranged and confirmed
          directly with your host.
        </li>
        <li>
          <strong>Want more space?</strong> You can choose a larger option than your group needs.
        </li>
      </ul>
    </div>
  );
}

function CoolingNotes() {
  return (
    <aside className="cooling" aria-labelledby="cooling-title">
      <h3 id="cooling-title" className="cooling__title">
        About A/C
      </h3>
      <dl className="cooling__list">
        <div>
          <dt>Without A/C</dt>
          <dd>Natural tropical ventilation with dedicated cooling fans in every bedroom.</dd>
        </div>
        <div>
          <dt>With A/C</dt>
          <dd>Air-conditioned comfort in two bedrooms, with gentle cooling fans in the remaining rooms.</dd>
        </div>
      </dl>
      <p className="caption">A/C is not offered with the Couples or Family stay.</p>
    </aside>
  );
}

function WeekendBlock() {
  const [villa] = stayRows('WEEKEND');
  if (!villa) return null;
  return (
    <div className="rate-group weekend">
      <header className="rate-group__header">
        <h3 className="subheading">Weekend nights</h3>
        <p className="caption">Rates per night, Friday to Sunday</p>
      </header>
      <div className="weekend__card">
        <div className="weekend__intro">
          <p className="weekend__name">{villa.name}</p>
          <p className="body-copy">
            One group of up to {villa.maxGuests} guests. Both options include all five bedrooms, both living areas, the
            kitchen and the garden.
          </p>
        </div>
        <dl className="weekend__options">
          <div>
            <dt>Without A/C</dt>
            <dd>
              <Price amount={villa.standard} />
            </dd>
          </div>
          <div>
            <dt>With A/C</dt>
            <dd>
              <Price amount={villa.ac} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function MixedStay() {
  return (
    <div className="rate-group mixed" data-reveal="fade">
      <div className="mixed__card">
        <div className="mixed__content">
          <h3 className="subheading">Stays across weekdays &amp; weekends</h3>
          <p className="body-copy">
            If your trip spans both weekday and weekend nights, each night is billed transparently at its individual
            rate—never rounded up. Select your dates in the inquiry form to instantly see your personalized breakdown.
          </p>
        </div>
        <div className="mixed__action">
          <Button to={inquiryPath} variant="swipe" tone="dark">
            Calculate for your dates
          </Button>
        </div>
      </div>
    </div>
  );
}

function Rates() {
  return (
    <section id="rates" className="section rates" aria-labelledby="rates-title">
      <div className="container">
        <header className="rates__header">
          <Eyebrow>Rates</Eyebrow>
          <RevealHeading id="rates-title">Compare stays by date and group size.</RevealHeading>
        </header>

        <div className="date-rules">
          <dl className="date-rules__list">
            {dateRules.map((rule) => (
              <div key={rule.title} className="date-rules__item">
                <dt>
                  <span className="date-rules__title">{rule.title}</span>
                  <span className="date-rules__days">{rule.days}</span>
                </dt>
                <dd>{rule.text}</dd>
              </div>
            ))}
          </dl>
          <p className="caption date-rules__note">Rates follow the night you stay, so a Sunday night is a weekend night.</p>
        </div>

        <div className="rates__layout">
          <div className="rates__main">
            <WeekdayTable />
            <WeekendBlock />
            <MixedStay />
          </div>
          <CoolingNotes />
        </div>
      </div>
    </section>
  );
}

const included = [
  {
    title: 'Privacy & living',
    items: ['No other guests in the villa', 'Ground-floor living room', 'Upstairs lounge', 'Dining table for the whole group'],
  },
  {
    title: 'Kitchen',
    items: [
      'Fully equipped self-catering kitchen',
      'Full-size refrigeration and cold storage',
      'Complete cookware, tableware and glassware',
      'Tea and hot beverage preparation essentials',
    ],
  },
  {
    title: 'Comfort',
    items: ['Wi-Fi', 'TV with satellite channels', 'Hot-water showers', 'Bedroom cooling to match your option'],
  },
  { title: 'Outside', items: ['Private courtyard and garden', 'Veranda', 'Gated on-site parking', 'BBQ pavilion'] },
];

function Included() {
  return (
    <section className="section included" aria-labelledby="included-title">
      <div className="container">
        <header className="included__header">
          <Eyebrow>Your stay</Eyebrow>
          <RevealHeading id="included-title">Included with every stay.</RevealHeading>
          <p className="lead" data-reveal="fade">
            All utilities, high-speed Wi-Fi, and exclusive use of the fully equipped kitchen are seamlessly included in your nightly rate.
          </p>
        </header>
        <div className="included__grid">
          {included.map((group) => (
            <div key={group.title} className="included__group" data-reveal="fade">
              <h3 className="included__heading">{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="request" data-reveal="fade">
          <h3 className="request__title">Available on request</h3>
          <dl className="request__list">
            <div>
              <dt>BBQ setup</dt>
              <dd>The grill is prepared before you arrive.</dd>
            </div>
          </dl>
          <p className="caption">
            Add this under special requests in your inquiry. The host confirms availability and any extra charge.
          </p>
        </div>
      </div>
    </section>
  );
}

const stayFacts = [
  { label: 'Check-in', value: 'Afternoon arrival, coordinated with your host' },
  { label: 'Check-out', value: 'Morning departure' },
  { label: 'Late check-out', value: 'Available upon request, subject to availability' },
  { label: 'Long weekends', value: 'A two-night minimum may apply on long weekends and festive holidays' },
];

const steps = [
  { title: 'Dates', text: 'Choose your check-in and check-out dates.' },
  { title: 'Guests & stay', text: 'Enter your group size, compare the matching options and see the estimated total.' },
  { title: 'Your details', text: 'Add your name, WhatsApp number and any requests, then send.' },
];

function BeforeYouInquire() {
  return (
    <section className="section before" aria-labelledby="before-title">
      <div className="container before__grid">
        <header className="before__header">
          <Eyebrow>Before you inquire</Eyebrow>
          <RevealHeading id="before-title">Stay details and what happens next.</RevealHeading>
        </header>

        <dl className="before__facts" data-reveal="fade">
          {stayFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <ol className="before__steps">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal="fade">
              <span className="before__step-index">Step {i + 1}</span>
              <h3 className="before__step-title">{step.title}</h3>
              <p className="body-copy">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="before__close" data-reveal="fade">
          <p className="before__statement">“Inquiries are completely free and carry no obligation.”</p>
          <p className="body-copy">
            Your stay details will open directly in WhatsApp to send to the host, who will personally confirm
            availability, finalize pricing, and guide you through payment.
          </p>
          <Button to={inquiryPath}>Send Inquiry</Button>
        </div>
      </div>
    </section>
  );
}

export default function StayOptions() {
  const pageRef = useRef(null);
  usePackages();
  useFadeReveals(pageRef);

  return (
    <div className="stay-page" ref={pageRef}>
      <Hero />
      <Rates />
      <Included />
      <BeforeYouInquire />
    </div>
  );
}
