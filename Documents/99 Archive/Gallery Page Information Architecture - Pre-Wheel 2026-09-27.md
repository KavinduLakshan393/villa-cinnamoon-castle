# Villa Cinnamoon Castle — Gallery Page Information Architecture

## Status

This is the Phase 1 information-architecture baseline for the dedicated public Gallery page. It was updated during implementation under DEC-018 (2026-09-23). The previous version is preserved in `../99 Archive/Gallery Page Information Architecture - Pre-Implementation 2026-09-23.md`. Use the approved system in `../06 Design/Colour and Typography.md`.

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

> A closer look at *the villa.*

The italic phrase uses the Bodoni Moda editorial accent and must not break across lines.

**Supporting text**

> Six views of the spaces your group shares, inside and out. Open any view to see more photos.

### Rules

- The Hero is text only. The Featured Gallery Strip begins immediately below it and acts as the Hero visual, as approved under DEC-018.
- Do not use a full-screen background video from the current media collection.
- Do not place category filters inside the Hero.
- Text reveal begins only when the Hero enters the viewport.

---

## Section 2 — Featured Gallery Strip

### Purpose

Provide a curated, high-impact entry into the villa's main visual stories. This is the adapted component inspired by Elephant Skin's numbered horizontal `Selected work` strip. It does not replace the Full Gallery.

### Section header

None. The Gallery Hero text introduces the strip directly (DEC-018). The strip list keeps the accessible name `Selected views`.

### Featured chapters

Use six tall image cards in this order:

| Index | Public title | Supporting label | Lead image |
|---:|---|---|---|
| 01 | Arrival | Villa & entrance | `images/hero/villa-arrival-hero-8k.jpg` (facade crop) |
| 02 | Shared living | Two lounges, downstairs and up | `images/living_rooms/living_room_2/living_room_2_04.jpg` |
| 03 | Sleeping spaces | Five bedrooms | `images/bedrooms/bedroom_1/bedroom_1_04.jpg` |
| 04 | Kitchen & dining | Cooking & shared meals | `images/kitchen_and_dining/dining_area/dining_area_01.jpg` (watermark cropped) |
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
- Implemented motion (reference: `Gallery strip.mp4`):
  - The hovered or keyboard-focused card grows to about 48% of the row in 0.5 s (ease-out). The other cards compress equally, and all cards return to equal widths when the pointer leaves the row.
  - Each photograph is sized to the expanded card width and centred, so widening reveals more of the scene without zooming.
  - The index and title lift as the supporting label fades in. A thin outline marks the active card.
  - The accordion applies only on screens at least 1000 px wide with a fine hover pointer. Other screens use scroll-snap cards with every label visible.
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

### Current curated set

The set has 27 images; 15 show before `Load more`.

- **Villa & Arrival:** villa facade (8K crop), driveway (`photo_7`), roadside sign (`exterior_08`), front (`front_yard_01`), villa after dark (`exterior_07`).
- **Living & Dining:** upstairs mezzanine (`living_room_2_04`), downstairs living room (`living_room_1_06`), downstairs seating (`living_room_1_01`), upstairs lounge (`living_room_2_02`), upstairs landing (`living_room_2_08`), dining area (`dining_area_01`, cropped), dining and staircase (`dining_area_05`), kitchen (`full_kitchen_01`).
- **Sleeping:** `bedroom_1_04`, `bedroom_4_03`, `bedroom_1_07`, `bedroom_4_04`, `bedroom_3_01`, `bedroom_1_01`. Captions never use bedroom numbers.
- **Garden & Outside:** balcony view (`backyard_01`), veranda (`porch_01`), balcony doorway (`balcony_03`), balcony from the garden (`balcony_04`), palms (`backyard_02`).
- **Around Hikkaduwa:** coast (`attraction_08`), reef (`attraction_01`), lagoon kayaking (`attraction_11`, captioned "arranged on request").

**Excluded:**

- `dining_area_04` — visible alcohol branding
- Watermarked files, such as `front_yard_03` and `bedroom_2_02`
- Close-up guest photographs, such as `attraction_12`, until publication consent is confirmed

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
- Apply the approved colour and typography system (`../06 Design/Colour and Typography.md`).
- All text remains hidden before its viewport-triggered reveal, while still being readable when JavaScript is unavailable.
