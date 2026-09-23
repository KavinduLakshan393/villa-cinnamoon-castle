// Remembers the page shown before the current one, so pages such as /inquiry can
// offer a clear way back to where the visitor came from.
let previousPath = null;

export function recordNavigation(from) {
  previousPath = from;
}

export function getPreviousPath() {
  return previousPath;
}
