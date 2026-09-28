import { useEffect, useRef, useState } from 'react';

/** Avoids a skeleton flash for fast requests and keeps a shown skeleton stable. */
export function useDelayedLoading(loading, { delay = 180, minimum = 320 } = {}) {
  const [visible, setVisible] = useState(false);
  const shownAt = useRef(0);

  useEffect(() => {
    let timer;
    if (loading) {
      if (visible) return undefined;
      timer = window.setTimeout(() => {
        shownAt.current = Date.now();
        setVisible(true);
      }, delay);
    } else if (visible) {
      const remaining = Math.max(0, minimum - (Date.now() - shownAt.current));
      timer = window.setTimeout(() => setVisible(false), remaining);
    } else {
      setVisible(false);
    }
    return () => window.clearTimeout(timer);
  }, [loading, delay, minimum, visible]);

  return visible;
}
