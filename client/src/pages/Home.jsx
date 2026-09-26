import { useRef } from 'react';
import Hero from './home/Hero.jsx';
import GoogleReviews from './home/GoogleReviews.jsx';
import { PhotoViewerProvider } from './home/PhotoViewer.jsx';
import CursorLabel from '../components/CursorLabel.jsx';
import ScrollPath from './home/ScrollPath.jsx';
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

// A path in the 0–100 box of the Overview + Shared living scope (desktop only).
const VILLA_PATH = [
  'M 104 1',
  'C 97 3 91 5 88.5 9', // enters beside the statement
  'C 84 14 76 19.5 54 19.5', // sweeps left under the facts
  'C 32 19.5 16 18.5 13 13.5',
  'C 11 9.5 20 7.5 22 11', // a loop in the open left column
  'C 24 14.5 14 17 13 21',
  'C 12 24.5 40 21.5 62 22.5',
  'C 70 23 64 27 62 30.5', // between the Shared living heading and copy
  'C 60 36 50 50 48 56.5', // behind the mezzanine photograph
  'C 47 59.5 55 61 56 58.5', // a loop above the middle column
  'C 57 55.5 46 55.5 42 58',
  'C 37 61 34.3 66 34.3 75', // down the gap between the columns
  'C 34.3 86 34.3 92 30 96',
  'C 26 100 16 101 8 104',
].join(' ');

// Section order follows the Phase 1 Sitemap and Website Copy baseline, with the
// cinemagraph and quote interludes added by DEC-022.
export default function Home() {
  const pageRef = useRef(null);
  useFadeReveals(pageRef);

  return (
    <PhotoViewerProvider>
      <div className="home" ref={pageRef}>
        <Hero />
        {/* The path runs from the Overview down through Shared living, behind the text and photographs. */}
        <div className="path-scope">
          <ScrollPath className="scroll-path--wide" mode="travel" segment={0.45} d={VILLA_PATH} />
          <Overview />
          <SharedLiving />
        </div>
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
      <CursorLabel />
    </PhotoViewerProvider>
  );
}
