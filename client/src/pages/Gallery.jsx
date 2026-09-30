import { useCallback, useRef } from 'react';
import Button from '../components/Button.jsx';
import Frame from '../components/Frame.jsx';
import Branch from './home/Branch.jsx';
import { RevealHeading, Eyebrow } from '../components/Reveal.jsx';
import GalleryStrip from './gallery/GalleryStrip.jsx';
import GalleryWheel from './gallery/GalleryWheel.jsx';
import Mosaic from './home/Mosaic.jsx';
import { PhotoViewerProvider, useOpenPhoto } from './home/PhotoViewer.jsx';
import { useFadeReveals } from '../lib/reveal.js';
import { chapters, galleryItems } from '../data/gallery.js';
import { inquiryPath } from '../data/site.js';
import './gallery/Gallery.css';

const COLUMNS = 3;
const SHIFTS = [0, 56, -28];

// Deals a chapter's photographs round-robin into columns for the drifting mosaic.
const toColumns = (items) =>
  Array.from({ length: COLUMNS }, (_, c) => ({ shift: SHIFTS[c], items: items.filter((_, i) => i % COLUMNS === c) })).filter(
    (column) => column.items.length,
  );

function Chapter({ chapter, index, onOpen }) {
  const lead = chapter.items.find((item) => item.wide);
  const rest = chapter.items.filter((item) => item !== lead);
  return (
    <section className="gallery-chapter" id={`gallery-${chapter.key}`} aria-labelledby={`gallery-${chapter.key}-title`}>
      <header className="gallery-chapter__head">
        <p className="gallery-chapter__index" data-reveal="fade">
          {String(index + 1).padStart(2, '0')}
        </p>
        <RevealHeading id={`gallery-${chapter.key}-title`} className="gallery-chapter__title">
          {chapter.title}
        </RevealHeading>
        <p className="gallery-chapter__label" data-reveal="fade">
          {chapter.label}
        </p>
      </header>
      {lead && <Frame className="gallery-chapter__lead" sizes="(min-width: 900px) 70vw, 100vw" onOpen={onOpen} {...lead} />}
      <Mosaic columns={toColumns(rest)} sizes="(min-width: 900px) 22vw, 46vw" onOpen={onOpen} />
    </section>
  );
}

// Highlights: the best photograph of each chapter; each opens in the viewer.
function FeaturedStrip() {
  const open = useOpenPhoto(galleryItems, 'Gallery');
  return <GalleryStrip onOpen={open} />;
}

function GalleryChapters() {
  const scopeRef = useRef(null);
  const open = useOpenPhoto(galleryItems, 'Gallery');
  const getSection = useCallback((key) => document.getElementById(`gallery-${key}`), []);

  return (
    <div className="gallery-chapters" ref={scopeRef}>
      <GalleryWheel chapters={chapters} scopeRef={scopeRef} getSection={getSection} />
      <div className="gallery-chapters__content">
        {chapters.map((chapter, i) => (
          <Chapter key={chapter.key} chapter={chapter} index={i} onOpen={open} />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const pageRef = useRef(null);
  useFadeReveals(pageRef);

  return (
    <PhotoViewerProvider>
      <div className="gallery-page" ref={pageRef}>
        <section className="gallery-hero" aria-labelledby="gallery-title">
          <Branch name="c" side="right" flip className="branch--gallery-hero" />
          <div className="container gallery-hero__grid">
            <Eyebrow>Gallery</Eyebrow>
            <RevealHeading as="h1" id="gallery-title" className="gallery-hero__title" start="top 100%" delay={0.1}>
              A closer look at <span className="editorial">the villa.</span>
            </RevealHeading>
            <p className="lead gallery-hero__text" data-reveal="fade">
              Explore the living spaces, quiet corners, and natural surroundings of our private sanctuary in
              Arachchikanda.
            </p>
          </div>
        </section>

        <FeaturedStrip />
        <GalleryChapters />

        <section className="section gallery-close" aria-labelledby="gallery-close-title">
          <Branch name="a" side="left" className="branch--gallery-close" />
          <Branch name="b" side="right" className="branch--gallery-close-right" />
          <div className="container">
            <div className="gallery-close__panel">
              <Eyebrow>Planning a stay?</Eyebrow>
              <RevealHeading id="gallery-close-title">Send your dates and group details.</RevealHeading>
              <p className="body-copy" data-reveal="fade">
                The host will confirm availability and the final stay details on WhatsApp.
              </p>
              <div data-reveal="fade">
                <Button to={inquiryPath}>Send Inquiry</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PhotoViewerProvider>
  );
}
