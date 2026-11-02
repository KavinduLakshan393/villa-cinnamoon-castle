import { useRef } from 'react';
import Button from '../components/Button.jsx';
import Frame from '../components/Frame.jsx';
import { Eyebrow, RevealHeading } from '../components/Reveal.jsx';
import { inquiryPath } from '../data/site.js';
import { useFadeReveals } from '../lib/reveal.js';
import './hikkaduwa/HikkaduwaGuide.css';

const areaHighlights = [
  {
    title: 'Hikkaduwa Beach',
    detail: '3.5 km from the villa — about five minutes by car.',
    text: 'Plan an easy beach morning, return to the villa for a quiet afternoon, or head back towards town for sunset.',
  },
  {
    title: 'Reef, surf and town',
    detail: 'A short trip from Arachchikanda.',
    text: 'Hikkaduwa’s beach, coral reef, surf spots, restaurants and everyday shops are within the same coastal area.',
  },
  {
    title: 'Galle Fort',
    detail: 'Around 20 minutes away by road.',
    text: 'The villa also works as a relaxed group base for a visit to Galle and the wider south coast.',
  },
];

const groupReasons = [
  ['One private place', 'Your group has the five bedrooms, two living areas, kitchen and garden without shared guest spaces.'],
  ['Room to gather', 'There is space for up to 15 guests, with shared areas for meals, conversations and slower evenings.'],
  ['A quieter setting', 'Stay among the trees in Arachchikanda while keeping Hikkaduwa Beach and town a short drive away.'],
  ['Direct planning', 'Send dates and group details to the host through WhatsApp for availability and final pricing.'],
];

export default function HikkaduwaGuide() {
  const pageRef = useRef(null);
  useFadeReveals(pageRef);

  return (
    <div className="hikkaduwa-page" ref={pageRef}>
      <section className="hikkaduwa-hero" aria-labelledby="hikkaduwa-title">
        <div className="container hikkaduwa-hero__grid">
          <Eyebrow>Hikkaduwa guide</Eyebrow>
          <RevealHeading as="h1" id="hikkaduwa-title" className="hikkaduwa-hero__title" start="top 100%" delay={0.1}>
            A private villa base for exploring <span className="editorial">Hikkaduwa.</span>
          </RevealHeading>
          <div className="hikkaduwa-hero__aside" data-reveal="fade">
            <p className="lead">
              Villa Cinnamoon Castle is a five-bedroom private villa for families and groups of up to 15 guests,
              3.5&nbsp;km from Hikkaduwa Beach.
            </p>
            <div className="hikkaduwa-hero__actions">
              <Button to={inquiryPath}>Plan Your Stay</Button>
              <Button to="/stay-options" variant="swipe" tone="dark">View stay options</Button>
            </div>
          </div>
        </div>
        <div className="container">
          <Frame
            className="hikkaduwa-hero__image"
            name="home-nearby-coast"
            alt="Waves meeting the rocky south coast near Hikkaduwa at sunset"
            ratio={null}
            sizes="(min-width: 1680px) 1600px, 94vw"
          />
        </div>
      </section>

      <section className="section hikkaduwa-area" aria-labelledby="hikkaduwa-area-title">
        <div className="container hikkaduwa-area__grid">
          <header className="hikkaduwa-area__intro">
            <Eyebrow>Around the villa</Eyebrow>
            <RevealHeading id="hikkaduwa-area-title" className="section-heading">
              Close to the coast, quiet under the trees.
            </RevealHeading>
            <p className="body-copy" data-reveal="fade">
              The villa sits in Arachchikanda, just inland from Hikkaduwa. It gives a family or group a quieter place to
              come back to after time at the beach, reef, town or Galle.
            </p>
          </header>

          <ol className="hikkaduwa-area__list">
            {areaHighlights.map((item, index) => (
              <li key={item.title} data-reveal="fade">
                <span className="hikkaduwa-area__index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="subheading">{item.title}</h2>
                  <p className="hikkaduwa-area__detail">{item.detail}</p>
                  <p className="body-copy">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section hikkaduwa-group" aria-labelledby="hikkaduwa-group-title">
        <div className="container">
          <Eyebrow>For families and groups</Eyebrow>
          <RevealHeading id="hikkaduwa-group-title" className="section-heading hikkaduwa-group__title">
            Stay together, with Hikkaduwa close by.
          </RevealHeading>
          <div className="hikkaduwa-group__grid">
            {groupReasons.map(([title, text]) => (
              <article key={title} data-reveal="fade">
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section hikkaduwa-close" aria-labelledby="hikkaduwa-close-title">
        <div className="container">
          <div className="hikkaduwa-close__panel">
            <Eyebrow>Ready to plan?</Eyebrow>
            <RevealHeading id="hikkaduwa-close-title" className="section-heading">
              Choose the stay that fits your group.
            </RevealHeading>
            <p className="body-copy" data-reveal="fade">
              Compare weekday and weekend options, then send your preferred dates directly to the host on WhatsApp.
            </p>
            <div className="hikkaduwa-close__actions" data-reveal="fade">
              <Button to="/stay-options">View stay options</Button>
              <Button to={inquiryPath} variant="swipe" tone="dark">Send Inquiry</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
