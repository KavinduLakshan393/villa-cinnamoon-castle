// Side-line shapes (SideLines), in the 0–100 box of each section: x is a
// percentage of the section's width (the full page width), y of its height.
// Each line starts at its own edge of the page and keeps to the margins and
// the gaps between blocks, so it never crosses text. Laid out against the
// measured desktop (1440 px) and mobile (390 px) layouts.

const path = (...segments) => segments.join(' ');

/** Overview: the two lines come down either side of the text and draw close beneath the facts. */
export const OVERVIEW_LINES = {
  desktop: {
    left: path('M 0 32', 'C 8 32 16 42 14 56', 'C 12 70 6 86 22 92', 'C 34 96 48 94 56 93'),
    right: path('M 100 22', 'C 93 26 88 36 90 48', 'C 92 60 99 70 97 80', 'C 95 90 80 94 64 93'),
  },
  mobile: {
    left: path('M 0 12', 'C 1.4 20 1.4 30 1.2 40', 'C 1 55 1 63.5 8 65.5', 'C 18 67.5 30 66 40 66'),
    right: path('M 100 30', 'C 97 38 97 50 98 58', 'C 99 64 96 67 86 67', 'C 76 67 68 66 58 66'),
  },
};

/** Quote band: the lines cross at either side and wrap the quote, one below it and one above. */
export const QUOTE_LINES = {
  desktop: {
    left: path('M 0 40', 'C 7 40 4 90 30 92', 'C 56 94 82 90 89 70', 'C 94 50 88 14 100 12'),
    right: path('M 100 60', 'C 90 60 92 10 68 9', 'C 44 8 20 10 12 30', 'C 6 50 12 86 0 88'),
  },
  mobile: {
    left: path('M 0 30', 'C 2 14 20 8 45 9', 'C 70 10 88 14 100 6'),
    right: path('M 100 70', 'C 98 86 80 92 55 91', 'C 30 90 12 86 0 94'),
  },
};

/** Send Inquiry: the lines meet at either side of the Send Inquiry button. */
export const INQUIRY_LINES = {
  desktop: {
    left: path('M 0 95', 'C 15 97 32 96 42 92', 'C 47 90 47 80 46 74', 'C 45.5 70 47 67.2 50.2 66.9'),
    right: path('M 100 18', 'C 94 24 90 34 93 48', 'C 96 62 99 76 86 80', 'C 76 83 66 77 62.8 66.9'),
  },
  mobile: {
    left: path('M 0 97.5', 'C 12 99 26 98.5 34 97'),
    right: path('M 100 10', 'C 96 22 99 44 98 60', 'C 97.5 72 99 82 97 86', 'C 95 92 70 92 47 90.5'),
  },
};
