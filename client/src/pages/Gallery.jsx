import { useCallback, useRef, useState } from 'react';
import Button from '../components/Button.jsx';
import { RevealHeading, Eyebrow } from '../components/Reveal.jsx';
import GalleryStrip from './gallery/GalleryStrip.jsx';
import GalleryGrid from './gallery/GalleryGrid.jsx';
import GalleryViewer from './gallery/GalleryViewer.jsx';
import { useFadeReveals } from '../lib/reveal.js';
import { galleryItems } from '../data/gallery.js';
import { inquiryPath } from '../data/site.js';
import './gallery/Gallery.css';

export default function Gallery() {
  const pageRef = useRef(null);
  const [viewer, setViewer] = useState(null);
  useFadeReveals(pageRef);

  const openSet = useCallback((items, index, opener) => setViewer({ items, index, opener }), []);

  // A strip chapter opens the full sequence at that chapter's first image.
  const openChapter = useCallback(
    (chapter, opener) =>
      openSet(
        galleryItems,
        galleryItems.findIndex((item) => item.chapter === chapter),
        opener,
      ),
    [openSet],
  );

  const closeViewer = useCallback(() => setViewer(null), []);

  return (
    <div className="gallery-page" ref={pageRef}>
      <section className="gallery-hero" aria-labelledby="gallery-title">
        <div className="container gallery-hero__grid">
          <Eyebrow>Gallery</Eyebrow>
          <RevealHeading as="h1" id="gallery-title" className="gallery-hero__title" start="top 100%" delay={0.1}>
            A closer look at <span className="editorial">the villa.</span>
          </RevealHeading>
          <p className="lead gallery-hero__text" data-reveal="fade">
            Six views of the spaces your group shares, inside and out. Open any view to see more photos.
          </p>
        </div>
      </section>

      <GalleryStrip onOpen={openChapter} />

      <section className="section gallery-full" aria-labelledby="full-gallery-title">
        <div className="container">
          <header className="gallery-full__header">
            <Eyebrow>Full gallery</Eyebrow>
            <RevealHeading id="full-gallery-title">Explore more of the villa.</RevealHeading>
          </header>
          <GalleryGrid onOpen={openSet} />
        </div>
      </section>

      <section className="section gallery-close" aria-labelledby="gallery-close-title">
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

      {viewer && (
        <GalleryViewer
          items={viewer.items}
          startIndex={viewer.index}
          returnFocusTo={viewer.opener}
          onClose={closeViewer}
        />
      )}
    </div>
  );
}
