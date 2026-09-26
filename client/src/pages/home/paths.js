// Scroll-drawn path shapes (ScrollPath), in the 0–100 box of each path scope:
// x is a percentage of the scope's width, y of its height. Coordinates were laid
// out against the desktop layout so the line crosses gaps, not text or photos.

const path = (...segments) => segments.join(' ');

/** Overview + Shared living: enters top right, loops in the open left column, dives behind the mezzanine. */
export const VILLA_PATH = path(
  'M 104 1',
  'C 97 3 91 5 88.5 9', // beside the statement
  'C 84 14 76 19.5 54 19.5', // under the facts, between two items
  'C 32 19.5 16 18.5 13 13.5',
  'C 11 9.5 20 7.5 22 11', // loop in the open left column
  'C 24 14.5 14 17 13 21',
  'C 12 24.5 40 21.5 62 22.5',
  'C 70 23 64 27 62 30.5', // between the heading and the copy
  'C 60 36 50 50 48 56.5', // behind the mezzanine photograph
  'C 47 59.5 55 61 56 58.5', // loop above the middle column
  'C 57 55.5 46 55.5 42 58',
  'C 37 61 34.3 66 34.3 75', // down the gap between the columns
  'C 34.3 86 34.3 92 30 96',
  'C 26 100 16 101 8 104',
);

/** Sleeping + Kitchen + Outside: down the gutter beside the bedrooms, through the kitchen, into the Balcony. */
export const ROOMS_PATH = path(
  'M 46 -1',
  'C 46 5 44 11 46 15', // gutter between the text and the bedroom photos
  'C 48 19 40 21.5 28 22',
  'C 18 22.5 12 21.5 13 20', // loop in the open left column
  'C 14 18.5 22 18.7 22.5 20.3',
  'C 23 22 20 23.5 26 24.5',
  'C 36 26 46 28 46 33',
  'C 46 37 54 38.5 61 40.5', // between the kitchen heading and copy
  'C 64 42 60 44 55 45.5',
  'C 51 46.5 50 48 50 52', // down the gap between the kitchen photos
  'C 50 58 42 61 30 62', // into the space under the kitchen photo
  'C 20 63 16 65.5 19 67', // loop
  'C 22 68.5 30 67.5 29 65.5',
  'C 28 64 12 66 5 71',
  'C 1.5 74 1.8 77.5 2 79.5', // down the gutter beside the Outside heading
  'C 2.3 81.5 34.2 80.5 34.3 86', // gap between the outside photos
  'C 34.4 92 30 93.5 22 95',
  'C 14 96.5 20 100 34 100.5',
  'C 44 101 50 102 52 106', // on into the Balcony
);

/** Location → Inquiry: from under the map panel, past the rates and reviews, to the Send Inquiry button. */
export const INQUIRY_PATH = path(
  'M 70 18',
  'C 70 22 84 22 88 25.5', // beside the Stay options heading
  'C 92 29 80 31.5 70 31.5',
  'C 58 31.5 50 31 50 34', // straight down the gap between the two rate blocks
  'C 50 37 50 39.5 50 40.5',
  'C 50 42 52 43 58 43',
  'C 70 45 84 44 90 46.5',
  'C 97 50 98 54 96 57', // behind the review rows
  'C 94 68 60 70 50 74',
  'C 42 77 46 79 46 83', // gap between the photo and the text
  'C 46 88 46 90.5 50.3 91.7', // ends at the Send Inquiry button
);

/** Nearby: the road from the villa to the beach. */
export const ROUTE_PATH = 'M 3 70 C 16 70 20 22 35 30 S 52 92 67 64 S 86 24 97 30';
