# Google Reviews Component Structure

## Purpose

This document preserves the intended structure and behaviour of the public website's Google Reviews component. It is the reference for restoring or extending the component when the temporary Google Places integration is replaced by the full reviews integration.

The data source may change, but the established visual structure and interaction model described here should remain consistent unless a new design decision explicitly replaces it.

## Source Files

- Component: `client/src/pages/home/GoogleReviews.jsx`
- Styles: `client/src/pages/home/GoogleReviews.css`
- Website URLs and Google links: `client/src/data/site.js`
- Current API client: `client/src/lib/api.js`
- Current backend adapter: `server/src/google/places-reviews.ts`
- Current backend route: `server/src/routes/reviews.routes.ts`

## Section Structure

The component is a full-width public website section with three primary areas:

1. Header and review summary
2. Two animated review rows
3. Playback control

```text
Google Reviews section
├── Header container
│   ├── Intro
│   │   ├── Eyebrow: "Google Reviews"
│   │   └── Heading: "What guests say on Google."
│   └── Summary
│       ├── Overall numeric rating
│       ├── Five-star representation
│       ├── Total Google review count
│       └── Google action buttons
├── Google ordering/source disclosure
├── Review rows
│   ├── Upper marquee row — moves right
│   └── Lower marquee row — moves left
└── Pause/Play control
```

On desktop, the header uses two columns: the title area is on the left and the rating summary is on the right. On smaller screens, these areas stack vertically.

## Review Card Structure

Each card must contain:

1. The individual review's star rating.
2. The review text inside a blockquote.
3. A Google source link. For a long review, the label is **Read the full review**; otherwise it can be **View on Google Maps**.
4. The reviewer identity row, separated from the review by a border:
   - Google profile image when one is available.
   - The reviewer's initial as a safe fallback avatar.
   - Reviewer display name.
   - Relative or formatted review date.
   - `Google review` attribution.
   - `Translated by Google` when the supplied text is a translation.

Review text is visually limited to approximately 260 characters. Truncation must occur at a word boundary and link to the Google source rather than inventing or rewriting the missing text.

## Marquee Behaviour

- Reviews are divided into two groups.
- The upper row continuously moves to the right.
- The lower row continuously moves to the left.
- Short lists are repeated until each track is wide enough to loop without a visible gap.
- The duplicate group used to complete the loop is hidden from assistive technology.
- Animation speed is proportional to the number of cards; the established value is approximately nine seconds per card.
- The soft mask at both horizontal edges makes cards fade in and out instead of being abruptly clipped.
- Animation pauses when:
  - The pointer is over a row.
  - Keyboard focus is inside a row.
  - The reviews section is outside the viewport.
  - The visitor uses the Pause control.

The control label and icon must switch between **Pause reviews** and **Play reviews**.

## Reduced Motion and Accessibility

- Respect `prefers-reduced-motion` through the existing `useReducedMotion` hook.
- With reduced motion enabled, do not create a moving or duplicated marquee.
- Show the original reviews as horizontally scrollable, swipeable cards with scroll snapping.
- Stars expose an accessible label such as `4.8 out of 5 stars`.
- Links opening a new tab must include screen-reader-only clarification.
- The section is labelled by the visible heading.
- Duplicate marquee content must use `aria-hidden` and `inert`.
- Loading state must use `aria-busy` and expose an appropriate status label.

## Data States

### Loading

Keep the standard title visible and show loading skeletons in the summary area. Do not show invented review cards.

### Reviews available

Show the complete component: rating summary, total count, action buttons, source disclosure, two marquee rows and the Pause/Play control.

### Reviews unavailable or integration not configured

Keep the section heading visible. Show a concise explanation and link visitors to the official Google profile using **Read Reviews on Google**. When available, also show **Review Us on Google**.

The fallback summary must remain visible after asynchronous loading. Do not attach a one-time reveal attribute to content that is inserted after the page-level reveal observer has already initialized.

## Expected Review Data Contract

The UI expects an object equivalent to:

```js
{
  source: 'google-places',
  order: 'relevance',
  rating: 4.8,
  total: 125,
  reviewsUrl: 'https://...',
  fetchedAt: '2026-09-28T00:00:00.000Z',
  items: [
    {
      id: 'review-id',
      author: 'Guest name',
      authorUrl: 'https://...' || null,
      authorPhotoUrl: 'https://...' || null,
      date: 'a month ago',
      publishTime: '2026-08-28T00:00:00.000Z' || null,
      rating: 5,
      text: 'The review text supplied by Google.',
      translated: false,
      sourceUrl: 'https://...' || null
    }
  ]
}
```

Only real review content returned by Google should populate `items`. Development samples or fabricated reviews must not be displayed as genuine customer feedback.

## Google Places Limitation

The temporary Places API integration returns up to five reviews selected and ordered by Google based on relevance. The website must state this ordering and provide a link to the complete Google Maps profile. The component must not imply that the five reviews are the newest reviews or that the website selected them independently.

## Visual Tokens

The component must continue to use the public website's existing design tokens rather than introducing a separate visual system:

- `--surface` for card backgrounds.
- `--border` for borders and outline stars.
- `--text-primary` and `--text-secondary` for typography.
- `--accent`, `--accent-soft` and `--accent-hover` for interactive and avatar details.
- Existing `Button`, `Eyebrow`, `RevealHeading`, `SkeletonBlock` and screen-reader utility components/classes.

The established card width is responsive between approximately 280px and 380px, with a 24px internal padding and a 16px gap between cards and content elements.

## Preservation Checklist

When replacing the temporary integration with the full Google reviews solution, verify all of the following:

- [ ] The header remains a two-column desktop layout and a stacked mobile layout.
- [ ] Overall rating, stars and total review count are visible.
- [ ] Two opposing marquee rows remain available.
- [ ] Each review card retains rating, text, Google link, reviewer, avatar and date.
- [ ] Hover, focus, off-screen and manual pause behaviour still works.
- [ ] Reduced-motion mode is static and swipeable.
- [ ] Google attribution and source links remain present.
- [ ] Loading and unavailable states do not leave a visually blank section.
- [ ] No sample or fabricated reviews are presented as real reviews.
- [ ] Existing website design tokens and responsive behaviour are preserved.

