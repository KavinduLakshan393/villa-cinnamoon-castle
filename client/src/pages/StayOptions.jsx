import { useRef } from 'react';
import Frame from '../components/Frame.jsx';
import Button from '../components/Button.jsx';
import { RevealHeading, Eyebrow } from '../components/Reveal.jsx';
import { useFadeReveals } from '../lib/reveal.js';
import { inquiryPath } from '../data/site.js';
import { stayRows, rateFor, formatRupees } from '../data/packages.js';
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
            From Monday to Thursday, choose a stay sized to your group. Friday to Sunday nights are booked as the whole
            villa, for up to 15 guests.
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
          <strong>Family stay or two bedrooms?</strong> The Family stay uses a sleeping setup arranged by the host. Two
          bedrooms always means two separate rooms.
        </li>
        <li>
          <strong>More than 10 guests?</strong> The full villa adds extra sleeping arrangements, confirmed with the host.
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
          <dd>Stand fans in every bedroom. Air conditioning stays off.</dd>
        </div>
        <div>
          <dt>With A/C</dt>
          <dd>Air conditioning in two bedrooms. The other bedrooms have stand fans.</dd>
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

// Worked example from the official catalogue (package_details.md §5, case C).
function MixedStay() {
  const weekendRate = rateFor('weekend-villa', 'AC');
  const weekdayRate = rateFor('full-villa', 'AC');
  if (weekendRate === null || weekdayRate === null) return null;
  const weekendNights = 3;
  const weekdayNights = 1;
  const total = weekendNights * weekendRate + weekdayNights * weekdayRate;

  return (
    <div className="rate-group mixed" data-reveal="fade">
      <header className="rate-group__header">
        <h3 className="subheading">Mixed stays</h3>
        <p className="caption">Friday check-in, Tuesday check-out · full villa with A/C</p>
      </header>
      <div className="mixed__equation" role="group" aria-label="Example mixed-stay estimate">
        <p className="mixed__term">
          <span className="mixed__nights">{weekendNights} weekend nights</span>
          <span className="mixed__rate">× {formatRupees(weekendRate)}</span>
        </p>
        <span className="mixed__op" aria-hidden="true">
          +
        </span>
        <p className="mixed__term">
          <span className="mixed__nights">{weekdayNights} weekday night</span>
          <span className="mixed__rate">× {formatRupees(weekdayRate)}</span>
        </p>
        <span className="mixed__op" aria-hidden="true">
          =
        </span>
        <p className="mixed__term mixed__term--total">
          <span className="mixed__nights">Estimated total</span>
          <span className="mixed__rate">{formatRupees(total)}</span>
        </p>
      </div>
      <p className="body-copy">
        The inquiry form works this out for your own dates and group. The host confirms the final amount.
      </p>
    </div>
  );
}

function Rates() {
  return (
    <section id="rates" className="section rates" aria-labelledby="rates-title">
      <div className="container">
        <header className="rates__header">
          <Eyebrow index="01">Rates</Eyebrow>
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

        <div className="rates__action" data-reveal="fade">
          <Button to={inquiryPath}>Send Inquiry</Button>
          <p className="caption">All rates are per night for the whole group, in Sri Lankan rupees.</p>
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
  { title: 'Kitchen', items: ['Gas stove', 'Refrigerator and freezer', 'Rice cooker and kettle', 'Cookware, cutlery and glassware'] },
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
          <Eyebrow index="02">Your stay</Eyebrow>
          <RevealHeading id="included-title">Included with every stay.</RevealHeading>
          <p className="lead" data-reveal="fade">
            Electricity, gas, Wi-Fi and use of the full kitchen are part of the nightly rate.
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
              <dt>Private chef</dt>
              <dd>Arranged in advance. Guests cover the cost of ingredients.</dd>
            </div>
            <div>
              <dt>BBQ setup</dt>
              <dd>The grill is prepared before you arrive.</dd>
            </div>
          </dl>
          <p className="caption">
            Add these under special requests in your inquiry. The host confirms availability and any extra charge.
          </p>
        </div>
      </div>
    </section>
  );
}

const stayFacts = [
  { label: 'Check-in', value: 'From 1:00 PM' },
  { label: 'Check-out', value: 'By 10:00 AM' },
  { label: 'Later check-out', value: 'Up to 11:30 AM, on request, if the host can arrange it' },
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
          <Eyebrow index="03">Before you inquire</Eyebrow>
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
          <p className="before__statement">“Sending an inquiry doesn’t reserve your dates.”</p>
          <p className="body-copy">
            WhatsApp opens with your stay details ready to send. The host replies to confirm availability, the final
            amount and how to pay.
          </p>
          <Button to={inquiryPath}>Send Inquiry</Button>
        </div>
      </div>
    </section>
  );
}

export default function StayOptions() {
  const pageRef = useRef(null);
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
