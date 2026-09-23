# Villa Cinnamoon Castle — Gallery Page Information Architecture

## Status

This is the Phase 1 information-architecture baseline for the dedicated public Gallery page. Its structure and interaction model are ready for wireframing; final colour, typography scale and visual styling remain part of the design phase.

The page uses a curated horizontal visual strip inspired by the `Selected work` section on Elephant Skin. The reference is used for composition and interaction principles only. Villa Cinnamoon Castle must retain its own content, typography, colour system and visual identity.

## Page objective

Help visitors understand the villa as one connected place through a deliberately edited sequence of images, then allow deeper browsing without turning the page into an unstructured photo dump.

The five bedrooms must be presented as one sleeping experience. They must not appear as five separately named or numbered gallery categories.

## Complete page order

1. Gallery Hero
2. Featured Gallery Strip
3. Full Gallery
4. Closing Inquiry
5. Global Footer — not counted as a page content section

---

## Section 1 — Gallery Hero

### Purpose

Introduce the gallery with minimal copy and establish that it is a selected view of the villa rather than an archive of every available image.

### Working copy

**Eyebrow**

> Gallery

**Headline**

> A closer look at the villa.

**Supporting text**

> Explore the spaces your group can share, inside and outside.

### Rules

- Keep the Hero compact; the visual content begins immediately below it.
- Do not use a full-screen background video from the current media collection.
- Use one strong still image or a restrained image composition.
- Do not place category filters inside the Hero.
- Text reveal begins only when the Hero enters the viewport.

---

## Section 2 — Featured Gallery Strip

### Purpose

Provide a curated, high-impact entry into the villa's main visual stories. This is the adapted component inspired by Elephant Skin's numbered horizontal `Selected work` strip. It does not replace the Full Gallery.

### Section header

Use an editorial split header on desktop: label and headline on the left, short supporting text on the right. Stack them on mobile.

**Eyebrow**

> Selected views

**Headline**

> See the villa, space by space.

**Supporting text**

> A short visual tour of the spaces your group can use throughout the stay.

### Featured chapters

Use six tall image cards in this order:

| Index | Public title | Supporting label | Recommended lead image |
|---:|---|---|---|
| 01 | Arrival | Villa & entrance | `images/photo_7.jpg` |
| 02 | Shared living | Downstairs & upstairs lounges | `images/living_rooms/living_room_2/living_room_2_04.jpg` |
| 03 | Sleeping spaces | Five bedrooms, shown as one experience | `images/bedrooms/bedroom_1/bedroom_1_04.jpg` |
| 04 | Kitchen & dining | Cooking & shared meals | `images/kitchen_and_dining/dining_area/dining_area_04.jpg` |
| 05 | Garden & outside | Courtyard, veranda & greenery | `images/outdoor_and_garden/backyard/backyard_01.jpg` |
| 06 | Around Hikkaduwa | Nearby coast & activities | `images/nearby_attractions_and_activities/attraction_08.jpg` |

### Card anatomy

- Full-bleed photograph
- Subtle lower gradient for text contrast
- Two-digit index
- Chapter title
- Short supporting label
- Entire card is one accessible link/button
- Visible focus state

Do not add descriptions, amenity lists or CTA buttons inside the cards.

### Interaction

- On desktop, keep all six cards in one viewport-width row as an expanding image accordion.
- In the resting state, cards have equal narrow widths.
- The hovered or keyboard-focused card expands smoothly while the other cards compress.
- When hover/focus leaves the row, return all cards to equal widths.
- Reveal the supporting label as the card expands; keep the chapter title available in the narrow state.
- Keyboard focus must trigger the same expanded state as mouse hover.
- On mobile and tablet, replace the hover accordion with native horizontal scrolling and CSS scroll snap.
- On touch screens, show part of the next card so additional content is discoverable.
- Support trackpad/keyboard focus on desktop and touch swipe on mobile.
- Do not hijack vertical wheel scrolling.
- Do not auto-scroll or autoplay the strip.
- On desktop hover/focus, combine the width expansion with only a restrained image scale or crop shift and a small metadata movement.
- On touch devices, no information may depend on hover.
- Scroll-triggered text and card reveals occur only when the elements enter the viewport.
- Respect reduced-motion preferences.

### Card destination

Selecting a card opens the Full Gallery viewer at the first image in that visual chapter. It must not navigate to a separate page for each chapter.

The viewer retains the selected chapter context while allowing movement to adjacent images.

---

## Section 3 — Full Gallery

### Purpose

Provide complete visual browsing after the curated strip, using a selected set of the strongest media rather than every source file.

### Section header

**Eyebrow**

> Full gallery

**Headline**

> Explore more of the villa.

### Filters

Use these filter labels:

- All
- Villa & Arrival
- Living & Dining
- Sleeping
- Garden & Outside
- Around Hikkaduwa

`All` is selected by default. Filters change the visible set without reloading the page.

Do not create `Bedroom 1`, `Bedroom 2`, `Bedroom 3`, `Bedroom 4` or `Bedroom 5` filters. All sleeping images belong to the single `Sleeping` group.

### Grid

- Use an editorial CSS grid with a controlled mixture of portrait and landscape spans.
- Preserve a logical DOM and keyboard order; do not use dense packing that visually reorders content.
- Avoid an endless masonry wall.
- Load an intentionally selected initial set.
- If more approved media is available, use `Load more` rather than infinite scroll.
- Keep image aspect ratios stable while files load to prevent layout shift.
- Use responsive image sizes and lazy loading below the fold.

### Media selection rules

- Use only the strongest images identified in the Phase 1 content inventory.
- Do not display every available photograph.
- Exclude duplicates, weak images, watermarked images and the damaged `living_room_1_05.jpg` file.
- Guest photographs may be used only after publication consent is confirmed.
- Current portrait handheld videos are not used as large autoplay media.
- A selected video may be introduced later only after editing, stabilisation and quality review.
- Nearby images must be labelled as nearby experiences, not villa facilities.
- Never imply that the villa has a swimming pool.

### Full-screen viewer

Opening an image displays an accessible full-screen viewer with:

- Large image
- Close button
- Previous and next controls
- Current position, for example `3 of 18`
- Short factual caption where useful
- Chapter/category label
- Thumbnail rail only on sufficiently large screens

Viewer behaviour:

- Left/right arrow keys move between images.
- Escape closes the viewer.
- Mobile supports horizontal swipe.
- Focus is trapped inside the viewer while open and returns to the originating image when closed.
- Background page scrolling is disabled while open.
- Images remain usable with zoom at browser level.
- Captions never use bedroom numbers.
- Decorative images use empty alternative text; informative images receive concise factual alternative text.

---

## Section 4 — Closing Inquiry

### Purpose

Provide one clear next step after visual exploration without turning every gallery image into a conversion element.

### Working copy

**Eyebrow**

> Planning a stay?

**Headline**

> Send your dates and group details.

**Supporting text**

> The host will confirm availability and the final stay details on WhatsApp.

**Action**

> Send Inquiry

### Rules

- The button navigates to the canonical `/inquiry` page.
- Preserve any inquiry data already entered during the session.
- Do not add package prices or another inquiry form to the Gallery page.
- Do not place `Send Inquiry` buttons on individual gallery cards.

---

## Reference-inspired decisions

Adopt:

- Editorial section header with strong hierarchy
- Numbered, image-led cards
- Horizontal visual rhythm
- Bottom-aligned metadata over a controlled gradient
- Partial next-card visibility
- A curated sequence instead of an undifferentiated image grid

Do not copy:

- Reference-site wording, colours or brand styling
- Project-to-project navigation model
- Aggressive scroll hijacking or cursor effects
- Excessive hover dependence
- Large animation that delays gallery access

## Global consistency rules

- Use the approved navbar and footer.
- Keep the navbar `Send Inquiry` action available.
- Apply the agreed typography system when it is finalised.
- Colour direction remains open and must not inherit the rejected HTML sample.
- All text remains hidden before its viewport-triggered reveal, while still being readable when JavaScript is unavailable.
