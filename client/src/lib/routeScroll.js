import { scrollToTarget } from './smoothScroll.js';

function decodeHash(hash) {
  const value = hash?.replace(/^#/, '');
  if (!value) return '';

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Scroll to the element named by a route hash, or to the top when the route has
 * no hash. Returning false lets callers retry after the destination page mounts.
 */
export function scrollToRouteLocation(hash, { immediate = true } = {}) {
  const id = decodeHash(hash);
  const target = id ? document.getElementById(id) : null;

  if (id && !target) return false;
  scrollToTarget(target ?? 0, { immediate });
  return true;
}
