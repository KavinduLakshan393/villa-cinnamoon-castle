import { useRef } from 'react';
import Hero from './home/Hero.jsx';
import GoogleReviews from './home/GoogleReviews.jsx';
import {
  Overview,
  SharedLiving,
  QuoteBand,
  Sleeping,
  KitchenDining,
  Outdoor,
  Balcony,
  Includes,
  Beach,
  Nearby,
  Location,
  StayPreview,
  InquiryCta,
} from './home/Sections.jsx';
import { useFadeReveals } from '../lib/reveal.js';
import './home/Home.css';

// Section order follows the Phase 1 Sitemap and Website Copy baseline, with the
// cinemagraph and quote interludes added by DEC-022.
export default function Home() {
  const pageRef = useRef(null);
  useFadeReveals(pageRef);

  return (
    <div className="home" ref={pageRef}>
      <Hero />
      <Overview />
      <SharedLiving />
      <QuoteBand>
        Five bedrooms, two living areas and a garden, <span className="editorial">shared by one group</span> and no one
        else.
      </QuoteBand>
      <Sleeping />
      <KitchenDining />
      <Outdoor />
      <Balcony />
      <Includes />
      <Beach />
      <Nearby />
      <Location />
      <StayPreview />
      <GoogleReviews />
      <InquiryCta />
    </div>
  );
}
