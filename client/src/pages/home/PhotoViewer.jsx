import { createContext, useCallback, useContext, useState } from 'react';
import GalleryViewer from '../gallery/GalleryViewer.jsx';

const OpenPhotoContext = createContext(null);

/** Hosts the full-screen viewer for the Home photographs (the Gallery page's viewer). */
export function PhotoViewerProvider({ children }) {
  const [viewer, setViewer] = useState(null);
  const open = useCallback((items, index, opener) => setViewer({ items, index, opener }), []);
  const close = useCallback(() => setViewer(null), []);

  return (
    <OpenPhotoContext.Provider value={open}>
      {children}
      {viewer && (
        <GalleryViewer items={viewer.items} startIndex={viewer.index} returnFocusTo={viewer.opener} onClose={close} />
      )}
    </OpenPhotoContext.Provider>
  );
}

/**
 * Returns `(name, opener) => void`, opening the viewer on `name` within one
 * section's photographs. The viewer shows `chapterTitle` in its bar and each
 * photo's caption (or its alt text when it has no caption).
 */
export function useOpenPhoto(items, chapterTitle) {
  const open = useContext(OpenPhotoContext);
  return useCallback(
    (name, opener) => {
      if (!open) return;
      const set = items.map((item) => ({ ...item, caption: item.caption ?? item.alt, chapterTitle }));
      open(set, Math.max(0, set.findIndex((item) => item.name === name)), opener);
    },
    [open, items, chapterTitle],
  );
}
