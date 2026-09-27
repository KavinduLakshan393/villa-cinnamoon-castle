# Villa Cinnamoon Castle — Gallery Page Information Architecture

## Status

This is the Phase 1 information-architecture baseline for the dedicated public Gallery page. It was updated during implementation under DEC-018 (2026-09-23), and again under DEC-026 (2026-09-27), when the filtered grid was replaced by villa chapters tracked by a scroll wheel. Previous versions are preserved in `../99 Archive/Gallery Page Information Architecture - Pre-Implementation 2026-09-23.md` and `../99 Archive/Gallery Page Information Architecture - Pre-Wheel 2026-09-27.md`. Use the approved system in `../06 Design/Colour and Typography.md`.

The page uses a curated horizontal visual strip inspired by the `Selected work` section on Elephant Skin. The reference is used for composition and interaction principles only. Villa Cinnamoon Castle must retain its own content, typography, colour system and visual identity.

## Page objective

Help visitors understand the villa as one connected place through a deliberately edited sequence of images, then allow deeper browsing without turning the page into an unstructured photo dump.

The five bedrooms must be presented as one sleeping experience. They must not appear as five separately named or numbered gallery categories.

## Complete page order

1. Gallery Hero
2. Featured Gallery Strip
3. Villa Chapters with the Wheel
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

> Explore the living spaces, quiet corners, and natural surroundings of our private sanctuary in Arachchikanda.

### Rules

- The Hero is text only. The Featured Gallery Strip begins immediately below it and acts as the Hero visual, as approved under DEC-018.
- Do not use a full-screen background video from the current media collection.
- Do not place category filters inside the Hero.
- Text reveal begins only when the Hero enters the viewport.

---

## Section 2 — Featured Gallery Strip

### Purpose

Provide a curated, high-impact entry into the villa's main visual stories. This is the adapted component inspired by Elephant Skin's numbered horizontal `Selected work` strip. It does not replace the villa chapters.

### Section header

None. The Gallery Hero text introduces the strip directly (DEC-018). The strip list keeps the accessible name `Selected views`.

### Featured chapters

Use six tall image cards in this order:

| Index | Public title | Supporting label | Lead image (highlight) |
|---:|---|---|---|
| 01 | Arrival | The villa & entrance | `villa-facade` (8K hero, facade crop) |
| 02 | Shared living | Two living areas, downstairs and up | `home-living-mezzanine` (mezzanine composite) |
| 03 | Sleeping | Five bedrooms and two bathrooms | `home-bed-pendant` (`bedroom_4_03`, enhanced) |
| 04 | Kitchen & dining | Cooking and shared meals | `home-kitchen` (kitchen composite) |
| 05 | Garden & outside | Veranda, balcony and greenery | `home-porch` (veranda composite) |
| 06 | Around Hikkaduwa | Nearby coast and activities | `home-nearby-coast` (`attraction_08`, enhanced) |

*Superseded by DEC-026 (2026-09-27): the lead images `living_room_2_04`, `bedroom_1_04`, `dining_area_01` and `backyard_01`, and the labels "Villa & entrance", "Two lounges, downstairs and up", "Sleeping spaces / Five bedrooms", "Cooking & shared meals", "Courtyard, veranda & greenery" and "Nearby coast & activities".*

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

Selecting a card opens the full-screen viewer at the chapter's highlight photo, and the photograph grows out of the card into the viewer (DEC-026). It must not navigate to a separate page for each chapter.

The viewer retains the selected chapter context while allowing movement to adjacent images.

---

## Section 3 — Villa Chapters with the Wheel

*Supersedes the "Full Gallery" section (the header "Explore more of the villa.", the filters, the editorial grid and `Load more`) under DEC-026 (2026-09-27). The previous text is preserved in the archived version.*

### Purpose

Walk the visitor through the villa one part at a time, with every selected photograph on the page, while a wheel shows where they are.

### Chapters

- The six chapters follow the strip order: Arrival, Shared living, Sleeping, Kitchen & dining, Garden & outside, Around Hikkaduwa.
- Each chapter has a two-digit index, a title (masked line reveal), the supporting label and its photographs.
- The Shared living mezzanine is a wide lead image above that chapter's photographs.
- The other photographs sit in three columns that drift at different speeds against native scroll (two-up on narrow screens).
- All sleeping images belong to the single `Sleeping` chapter. There are no per-bedroom groups.

### Wheel

- A thin half-wheel sits at the left edge of the page, with a rim, a small hub and one spoke between each pair of chapters. Only the right half is visible, because its centre sits on the page edge.
- As the visitor scrolls, the wheel turns so the chapter on screen faces the photographs (3 o'clock). A fixed green arc on the rim marks it, and its label is emphasised. Neighbouring labels fade as they turn away.
- Selecting a label scrolls to that chapter. The wheel is a `nav` named "Gallery sections", and the current label has `aria-current`.
- Below 900 px (mobile and tablet viewports), the wheel is omitted to keep the photographs and chapter headers unobstructed.
- With reduced motion, the wheel moves without easing and the photographs do not drift.

### Photographs and hover

- Every photograph opens in the full-screen viewer.
- On hover (mouse and trackpad only), the frame draws in, the photograph eases closer, the other photographs in the chapter dim, and a round `View` label follows the pointer. Keyboard focus shows the same state with a focus ring.

### Current curated set (39 photographs)

- **Arrival (6):** villa facade (8K crop), roadside sign (`exterior_08`), driveway (`photo_7`), front garden (`front_yard_01`), the villa after dark (`exterior_07`), the villa among the trees (`balcony_04`).
- **Shared living (9):** mezzanine composite, upstairs sitting area (`living_room_2_03`), downstairs living room (`living_room_1_03`), upstairs dining corner (`living_room_2_05`), upstairs dining table (`photo_2`), looking down from the landing (`living_room_1_04`), by the front door (`living_room_1_07`), the staircase (`photo_6`), from the landing (`living_room_1_05`).
- **Sleeping (12):** `bedroom_4_03`, `bedroom_1_02`, `photo_3`, `bedroom_1_07`, `bedroom_1_09`, `bedroom_2_05`, `bedroom_2_02` (watermark removed), `bedroom_3_01`, `bedroom_3_02`, `bedroom_4_04`, `bedroom_3_04`, one bathroom. Captions never use bedroom numbers.
- **Kitchen & dining (3):** kitchen composite, dining area (`dining_area_03`), dining by the staircase (`dining_area_05`).
- **Garden & outside (5):** veranda composite, upstairs balcony (`backyard_01`), balcony doorway (`balcony_03`), balcony walkway (`balcony_11`), among the palms (`backyard_02`).
- **Around Hikkaduwa (4):** coast (`attraction_08`), reef (`attraction_01`), sea turtle (`attraction_02`), lagoon kayaking (`attraction_07`).

All photographs are the enhanced versions: the Home cinematic set and the Gallery second set (`Documents/06 Design/Home Page Image and Video Prompts.md`, sections 1–5 and 9).

**Excluded:**

- `dining_area_04`: visible alcohol branding. An enhanced version exists but is not used.
- Watermarked originals, such as `front_yard_03` and `dining_area_01`.
- Group photographs with identifiable guests, until publication consent is confirmed. `attraction_02` and `attraction_07` also need consent before launch (DEC-022).

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

Opening an image displays an accessible full-screen viewer with the following (the same viewer serves the Home photographs):

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
- Opening: the selected photograph grows from its card or tile into the viewer (0.8 s) while the dark background fades in (DEC-026).
- Closing: the photograph on screen shrinks back into its tile (0.7 s). When that tile is off screen, the viewer fades out.
- With reduced motion, the viewer simply fades.
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
