import { useRef } from 'react';
import Hero from './home/Hero.jsx';
import GoogleReviews from './home/GoogleReviews.jsx';
import {
  Overview,
  SharedLiving,
  Sleeping,
  KitchenDining,
  Outdoor,
  Includes,
  Nearby,
  Location,
  StayPreview,
  InquiryCta,
} from './home/Sections.jsx';
import { useFadeReveals } from '../lib/reveal.js';
import './home/Home.css';

// Section order follows the Phase 1 Sitemap and Website Copy baseline.
export default function Home() {
  const pageRef = useRef(null);
  useFadeReveals(pageRef);

  return (
    <div className="home" ref={pageRef}>
      <Hero />
      <Overview />
      <SharedLiving />
      <Sleeping />
      <KitchenDining />
      <Outdoor />
      <Includes />
      <Nearby />
      <Location />
      <StayPreview />
      <GoogleReviews />
      <InquiryCta />
    </div>
  );
}
