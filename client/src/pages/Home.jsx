import { useRef } from 'react';
import Hero from './home/Hero.jsx';
import GoogleReviews from './home/GoogleReviews.jsx';
import { PhotoViewerProvider } from './home/PhotoViewer.jsx';
import CursorLabel from '../components/CursorLabel.jsx';
import ScrollPath from './home/ScrollPath.jsx';
import { VILLA_PATH, ROOMS_PATH, INQUIRY_PATH } from './home/paths.js';
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
    <PhotoViewerProvider>
      <div className="home" ref={pageRef}>
        <Hero />
        {/* Scroll-drawn paths (desktop) run behind the text and photographs; shapes in home/paths.js. */}
        <div className="path-scope">
          <ScrollPath className="scroll-path--wide" mode="travel" segment={0.45} d={VILLA_PATH} />
          <Overview />
          <SharedLiving />
        </div>
        <QuoteBand>
          Five bedrooms, two living areas and a garden, <span className="editorial">shared by one group</span> and no one
          else.
        </QuoteBand>
        <div className="path-scope">
          <ScrollPath className="scroll-path--wide" mode="travel" segment={0.3} d={ROOMS_PATH} />
          <Sleeping />
          <KitchenDining />
          <Outdoor />
        </div>
        <Balcony />
        <Includes />
        <Beach />
        <Nearby />
        {/* The last path draws on and stops at the Send Inquiry button. */}
        <div className="path-scope">
          <ScrollPath className="scroll-path--wide" mode="draw" d={INQUIRY_PATH} start="top 60%" end="bottom 95%" />
          <Location />
          <StayPreview />
          <GoogleReviews />
          <InquiryCta />
        </div>
      </div>
      <CursorLabel />
    </PhotoViewerProvider>
  );
}
