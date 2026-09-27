import { useEffect, useState } from 'react';
import { reducedMotionQuery } from './motion.js';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

// Portrait screens get the 9:16 cut of each cinemagraph.
export const PORTRAIT_QUERY = '(max-aspect-ratio: 4/5)';

/** Live reduced-motion preference: re-renders when the visitor changes the OS setting. */
export const useReducedMotion = () => useMediaQuery(reducedMotionQuery);

/** Motion and data preferences are respected: the still first frame is shown instead of a video. */
export function useVideoAllowed() {
  const reduced = useReducedMotion();
  return !reduced && !navigator.connection?.saveData;
}
