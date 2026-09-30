# Villa Cinnamoon Castle — Phase 1 Decision Log

## Purpose

This log records confirmed product, content and UX decisions. It is not a discussion history. Only decisions that currently govern Phase 1 belong here.

## Active baseline

- **Baseline ID:** `P1-DESIGN-2026-09-22`
- **Status:** Ready for Low-Fidelity Design
- The approved decisions below are locked inputs for wireframing. A later change must follow the change procedure at the end of this document.

## Decision status

| Status | Meaning |
|---|---|
| **Approved** | Use in requirements, content and design |
| **Open** | Requires a confirmed answer before implementation or launch |
| **Superseded** | Preserved for history but no longer controls the project |

## Approved decisions

### DEC-001 — Product position

- **Status:** Approved
- **Decision:** Present Villa Cinnamoon Castle as an affordable private villa for families and groups.
- **Audience:** Both local and international visitors. The core experience must not assume that one audience is more important than the other.

### DEC-002 — Primary conversion action

- **Status:** Approved
- **Decision:** Use **Send Inquiry** for the navigation CTA, inquiry-section action and final form submission. Use **Plan Your Stay** as the Hero entry CTA leading to the same canonical inquiry journey.
- **Rule:** Do not describe the Phase 1 flow as an instant booking or confirmed reservation.

### DEC-003 — Inquiry flow

- **Status:** Approved
- **Decision:** The three-step inquiry form is a key Phase 1 feature.
- **Steps:** Dates; Guests & Stay Option; Your Details.
- **Handoff:** The completed information opens a prepared WhatsApp message. The visitor must intentionally send it in WhatsApp.
- **Access:** Every inquiry entry point navigates to the canonical `/inquiry` page. Do not duplicate the complete three-step form inside a conventional modal; the dedicated page protects mobile keyboard handling, browser navigation, session-state recovery and accessibility.

### DEC-004 — Phase 1 booking boundary

- **Status:** Approved
- **Decision:** Phase 1 does not store inquiries as backend booking records, confirm availability, reserve dates, accept payment or run approval/decline workflows.
- **Operational rule:** Availability, package discussion, payment and confirmation are handled directly between the guest and host.

### DEC-005 — Stay presentation

- **Status:** Approved
- **Decision:** The five bedrooms must not be marketed as separately selectable units or presented as `Bedroom 1`, `Bedroom 2`, and so on.
- **Rule:** Present the villa as one coherent private-stay experience and communicate sleeping capacity collectively and naturally.

### DEC-006 — Media selection

- **Status:** Approved
- **Decision:** Do not publish every supplied image or video. Curate only the strongest, most relevant media for each page and purpose.

### DEC-007 — Gallery

- **Status:** Approved
- **Decision:** Provide a dedicated Gallery page.
- **Rule:** The reference-inspired expanding featured strip may form one part of the page but must not replace the complete gallery.

### DEC-008 — Typography and reveal behaviour

- **Status:** Approved
- **Decision:** Use deliberate editorial typography with restrained animation.
- **Rule:** Reveal eligible display text when it enters the viewport; do not pre-reveal it before the user scrolls to it.
- **Exception:** Essential navigation, form instructions, validation, accessibility messages, legal content and privacy information must remain immediately available.

### DEC-009 — Public copy style

- **Status:** Approved
- **Decision:** Copy must sound natural and specific to the villa, not formulaic or AI-generated.
- **Rule:** Avoid unnecessary text, invented claims and generic luxury language.

### DEC-010 — Reviews

- **Status:** Approved
- **Decision:** Phase 1 displays Google Reviews only.
- **Excluded:** Website review submission, direct-guest review database and admin review moderation.

### DEC-011 — Location and maps

- **Status:** Approved
- **Decision:** Include the villa location in the public experience with directions through the verified official Google destination.
- **Privacy rule:** Prefer an `Open in Google Maps` action or a visitor-initiated map load instead of automatically loading an interactive third-party map.

### DEC-012 — Stay Options page

- **Status:** Approved
- **Decision:** Use one Stay Options page rather than a separate pricing-only page for Phase 1.
- **Rule:** The page explains package choices, estimated pricing, shared inclusions and the route to Send Inquiry without imitating an online booking engine.

### DEC-013 — Navigation model

- **Status:** Approved
- **Decision:** Phase 1 navigation uses Home, The Villa, Stay Options, Gallery, Location and Send Inquiry.
- **Rule:** `The Villa` and `Location` lead to relevant Home-page sections; they are not separate pages in Phase 1. `Send Inquiry` is the prominent action.

### DEC-014 — Privacy and data minimisation

- **Status:** Approved
- **Decision:** Provide a public Privacy page, keep temporary inquiry progress session-scoped, and do not enable advertising cookies or behavioural analytics by default in Phase 1.
- **Rule:** Do not request passport, payment-card, bank or unnecessary medical information in the inquiry form.

### DEC-015 — Global footer

- **Status:** Approved
- **Decision:** Use one consistent footer across all public pages with navigation, primary contact, verified social/accommodation destinations and a Privacy link.

### DEC-016 — Home Hero headline and implementation copy

- **Status:** Approved (2026-09-23)
- **Decision:** Replace the static Hero headline `A private villa for families and groups.` with a headline whose middle phrase changes: `A private villa for [the whole group / family reunions / old friends / slow weekends] under the trees.` The changing phrase uses the Bodoni Moda editorial accent.
- **Accessibility rule:** Screen readers receive one stable sentence: `A private villa for families and groups, under the trees.` The phrase stops changing when the Hero is off-screen, when the tab is hidden, or when reduced motion is requested.
- **Related copy:** The Hero eyebrow becomes `Arachchikanda, Hikkaduwa` so that it does not repeat `private villa`. The Home closing inquiry heading becomes `Send your dates to the host.` The loading intro shows `Tropical shade`, `Shared tables`, `Slow mornings` and then the villa name.
- **Unchanged:** Supporting text, `Plan Your Stay`, `Explore the Villa` and all verified facts.
- **Affected documents:** `04 Content/Phase 1 Website Copy.md`.

### DEC-017 — Stay Options copy refinement

- **Status:** Approved (2026-09-23)
- **Decision:** Refine the Stay Options working copy for clarity during implementation. The four-section structure, every package rate, capacity, A/C rule and package boundary are unchanged.
- **Main changes:**
  - Hero headline `Find the right stay for your group.`; the Hero states that Friday to Sunday nights are booked as the whole villa. `View options` becomes `View rates`.
  - Add `Rates follow the night you stay, so a Sunday night is a weekend night.`
  - Use `Without A/C` / `With A/C` as public column labels instead of `Non-A/C` / `A/C`.
  - Use guest-oriented stay names with short details, such as `Two bedrooms — Two separate bedrooms`.
  - Show the mixed-stay example with official catalogue figures (package_details.md §5, case C): 3 × Rs. 23,000 + 1 × Rs. 19,900 = Rs. 88,900 estimated.
  - State `All rates are per night for the whole group, in Sri Lankan rupees.`
  - Add `Electricity, gas, Wi-Fi and use of the full kitchen are part of the nightly rate.` (package_details.md §1).
  - Add the late check-out limit (up to 11:30 AM, on request) and the possible two-night minimum on long weekends (package_details.md §3 and §8). The internal turnaround window remains unpublished.
- **Affected documents:** `03 Information Architecture/Stay Options Page Information Architecture.md`.

### DEC-018 — Gallery Hero, strip motion and curated media

- **Status:** Approved (2026-09-23)
- **Decision:** The Gallery Hero is text only. The Featured Gallery Strip follows it immediately and serves as the Hero visual. The strip's separate section header is removed.
- **Motion:** The strip reproduces the approved reference clip `Gallery strip.mp4`. The hovered or focused card expands to about 48% of the row in 0.5 s. Photographs reveal more of the scene rather than zooming, the metadata lifts, and all cards return to equal widths when the pointer leaves. Touch and narrow screens use scroll-snap.
- **Copy:**
  - Hero supporting text: `Six views of the spaces your group shares, inside and out. Open any view to see more photos.`
  - Strip label 02: `Two lounges, downstairs and up`.
  - Strip label 03: `Five bedrooms`.
- **Media:** Arrival leads with a crop of the 8K exterior photograph. Kitchen & dining leads with `dining_area_01` (watermark cropped), because `dining_area_04` shows alcohol branding. The Full Gallery uses a curated set of 27 images listed in the Gallery IA.
- **Affected documents:** `03 Information Architecture/Gallery Page Information Architecture.md`.

### DEC-019 — Privacy page copy and self-hosted fonts

- **Status:** Approved (2026-09-23)
- **Decision:** Publish the Privacy notice with plain public wording. Internal terms such as `Phase 1` and `should` are replaced with statements that describe the website's verified behaviour. `Last updated` shows a draft label until the real publication date is set (OPEN-003); an invented date is never shown.
- **Related technical decision:** Self-host the web fonts instead of loading them from Google Fonts. The Google Fonts request sent every visitor's IP address to a third party that the notice did not mention.
- **Verification:** A network audit of all five public pages found requests only to the site's own origin, no cookies, no local storage, and only the session entry `vcc-inquiry`.
- **Affected documents:** `03 Information Architecture/Privacy Page Information Architecture.md`.

### DEC-020 — Moving Google Reviews rows

- **Status:** Approved (2026-09-24)
- **Decision:** Show the Google Reviews as two continuously moving rows. The upper row moves right and the lower row moves left. This replaces the earlier three-card static grid and supersedes the rule "Do not auto-rotate the review cards".
- **Accessibility conditions (WCAG 2.2.2):**
  - A visible `Pause reviews` control.
  - Motion pauses on hover, on keyboard focus and while the section is off-screen.
  - Duplicate loop copies are hidden from assistive technology and keyboard focus.
  - With reduced motion, the rows are static and can be swiped or scrolled.
- **Data rule (unchanged from DEC-010):** Only real reviews from the official Google Business Profile. The section stays hidden until they are supplied.
- **Affected documents:** `04 Content/Phase 1 Website Copy.md`.

### DEC-021 — Location map loads only on request

- **Status:** Approved (2026-09-24)
- **Decision:** The embedded Google map in the Home Location section shows a placeholder with a `Show map` button. The map loads only after the visitor selects it (NFR-PRV-04). The `Get Directions` link opens the verified Google Maps destination.
- **Verification:** A network audit showed no Google request before the click; the map loads from `google.com` only after it.
- **Affected documents:** `03 Information Architecture/Privacy Page Information Architecture.md`. The Maps paragraph of the privacy copy now describes the on-request map.

### DEC-022 — Home media rework, cinemagraph interludes and quote band

- **Status:** Approved (2026-09-26)
- **Decision:**
  - The Home sections after the Overview use the enhanced cinematic photographs from `images/Final Homepage 8K masters and videos/`:
    - Shared living: one wide mezzanine image plus a six-photo mosaic.
    - Sleeping: nine bedroom photos and one bathroom photo.
    - Kitchen & dining: one kitchen photo and two dining photos.
    - Outside: four photos.
    - Nearby: four photos.
  - Photographs sit in columns that drift at different speeds against native scroll. The page is never pinned. On screens narrower than 760 px, or with reduced motion, the drift is off.
  - Three interludes are added:
    - A text-only quote band after Shared living.
    - A full-screen **Balcony** cinemagraph after Outside.
    - A full-screen **Hikkaduwa Beach** cinemagraph between Amenities and Nearby.
  - Each quote uses the secondary word-scrub reveal (text reveal 2) and is real page text, not burned into the video.
  - Each cinemagraph has separate desktop (16:9) and mobile (9:16) loops and a pause control (WCAG 2.2.2). The video downloads only when the section is about to enter the viewport and plays only while it is on screen. With reduced motion or data saver, the page shows the poster frame instead.
  - The beach section is labelled as nearby, with the distance (`Nearby · 3.5 km from the villa, about 5 minutes by car`), so it is not read as a villa facility.
- **Supersedes:** In `Phase 1 Website Copy.md` (Nearby Hikkaduwa), the rule that allowed no more than two destination images on the homepage.
- **Composite images:** The mezzanine, kitchen and veranda images were generated from several real photographs of the same space. They were checked against the originals before use.
- **Launch dependencies:**
  - The Hikkaduwa aerial source image was downloaded from the web. It must be licensed or replaced with an owned photograph before launch.
  - `attraction_02` and `attraction_07` show identifiable people. Their publication consent must be confirmed before launch (Content Inventory rule).
- **Affected documents:** `04 Content/Phase 1 Website Copy.md` (new Quote band, Balcony and Hikkaduwa Beach entries; Nearby rules); `06 Design/Home Page Image and Video Prompts.md` (generation prompts).

### DEC-023 — Openable Home photographs and the scroll-drawn path

- **Status:** Approved (2026-09-26)
- **Decision:**
  - Every Home mosaic photograph (and the mezzanine lead image) is a button that opens the Gallery viewer on that section's set. The viewer bar shows the section name.
  - On hover (mouse and trackpad only), the frame draws in, the photograph eases closer, and the other photographs in the mosaic dim. A round `View` label follows the pointer. Keyboard focus shows the same state with a visible focus ring.
  - *Superseded by DEC-024 (2026-09-27):* A brand-green line drawn by scrolling runs behind the text and photographs:
    - Travelling segments through Overview and Shared living, and through Sleeping, Kitchen and Outside into the Balcony video (desktop only).
    - A line from the Location section that draws past the rates and reviews and stops at the `Send Inquiry` button (desktop only).
    - A villa-to-beach route in the Nearby section, labelled `The villa`, `Hikkaduwa Beach` and `3.5 km · about 5 minutes`. The route is decorative (`aria-hidden`), because the heading already states the distance.
  - Every scroll-linked effect now follows the reduced-motion setting live. Turning it on mid-visit stops the parallax, drift, word scrub and videos (the poster is shown), and draws the lines fully and still.
- **Not adopted:** Velocity-based image bending (reference: Lusion.co).
- **Affected documents:** `04 Content/Phase 1 Website Copy.md` (route labels).

### DEC-024 — Scroll-drawn line removed

- **Status:** Approved (2026-09-27)
- **Decision:** The scroll-drawn line from DEC-023 is removed from the Home page: all four paths, including the villa-to-beach route and its labels in the Nearby section. It did not match the rest of the site. The openable photographs, hover state and live reduced-motion handling from DEC-023 stay.
- **Affected documents:** `04 Content/Phase 1 Website Copy.md` (route labels superseded).

### DEC-025 — Smooth wheel scrolling and cinemagraph card reveal

- **Status:** Approved (2026-09-27)
- **Decision:**
  - Mouse-wheel and trackpad scrolling glides to a stop (Lenis, `lerp` 0.085) instead of jumping by the browser's wheel step. Touch keeps native scrolling. With reduced motion the page uses native scrolling. Scrolling pauses while the intro, mobile menu or photo viewer holds the page.
  - The Balcony and Hikkaduwa Beach videos enter as a rounded inset card, open to full screen as the section fills the viewport, and close back into a card as it leaves. The video's parallax is unchanged. There is no card effect with reduced motion.
  - The video quotes are revealed against the whole section, so every word is fully shown when the video fills the screen.
- **Not adopted:** Colour-matched fade bands above and below the videos (tried and rejected, 2026-09-26).
- **Affected documents:** None (motion only; copy unchanged).

### DEC-026 — Gallery chapters with a scroll wheel, enhanced photographs and viewer flight

- **Status:** Approved (2026-09-27)
- **Decision:**
  - The Gallery page keeps the Hero and the featured strip. The strip now shows each chapter's highlight photograph from the enhanced set.
  - The filtered grid is replaced by six villa chapters. A thin half-wheel at the left edge (a small wheel at the bottom-left on narrow screens) turns with the scroll to show the chapter on screen.
  - The Gallery uses only enhanced photographs: the Home cinematic set plus 10 photographs from the second set. `dining_area_04` stays excluded for its visible alcohol branding.
  - Photographs open and close in the viewer with a flight animation from and back to their tile.
  - The Hero supporting text changes to "Six parts of the villa, inside and out. Scroll through them, or open any photo to see it full screen."
- **Supersedes:** In DEC-018 and the Gallery IA, the Full Gallery section (header, filters, grid, `Load more`) and the original strip lead images and labels.
- **Affected documents:** `03 Information Architecture/Gallery Page Information Architecture.md` (previous version archived); `06 Design/Home Page Image and Video Prompts.md` (section 9).

### DEC-027 — Two side lines on the Home page

- **Status:** Approved (2026-09-27)
- **Decision:** *(Line weight, opacity and "stay drawn" superseded by DEC-031.)* Two fine (1.75 px) brand-green curved lines, one from each side of the page, draw toward each other with scroll in three sections:
  - Overview: they close in beneath the facts.
  - Quote band: they cross and wrap the quote.
  - Send Inquiry: they meet at the button.

  The right line is at half opacity. The lines stay in the margins and gaps and never cross text. They draw across the whole time the section is on screen, stay drawn, and are shown complete with reduced motion. Desktop and mobile have separate shapes.
- **Affected documents:** None (visual only; no copy).

### DEC-029 — Caption-free photographs and the card-stack viewer

- **Status:** Approved (2026-09-30)
- **Decision:**
  - No caption is shown under any photograph on the Home or Gallery pages. Alternative text stays. The Nearby photographs rely on the section heading ("Nearby", "Hikkaduwa is 3.5 km away") to mark them as nearby experiences.
  - The photo viewer shows only the photograph, a counter (`03 / 12`) and Close. The chapter label, the visible caption and the thumbnail rail are removed on every layout. The caption is still announced to screen readers.
  - Touch layouts use a full-screen card stack: the photograph follows the finger, the next one waits behind it, and a short swipe springs back. There are no arrows on touch layouts. A `Swipe to explore` hint shows once per visit.
  - Pointer devices keep subtle Previous/Next buttons and the arrow keys.
  - The viewer is a viewport overlay, not the browser Fullscreen API, which behaves inconsistently on iOS.
- **Supersedes:** In DEC-022 and DEC-023, the photograph captions and the caption-line hover detail. In DEC-026 and the Gallery IA, the viewer's caption, chapter label and thumbnail rail.
- **Affected documents:** `03 Information Architecture/Gallery Page Information Architecture.md`; `04 Content/Phase 1 Website Copy.md` (Nearby caption rule, viewer hint).

### DEC-030 — Mobile audit fixes

- **Status:** Approved (2026-09-30)
- **Audit:** Every public page, the admin sign-in, and the admin Inquiries and Packages pages (rendered with mocked data) were checked at 360, 390, 430 and 768 px for horizontal overflow, touch targets under 44 px and text under 12 px. No page overflowed horizontally.
- **Decision:**
  - On narrow screens the photograph mosaics flow as a two-column masonry, so photographs of different heights leave no gaps. The desktop drifting columns are unchanged.
  - Touch targets are at least 44 px: the footer links (including the legal row), the admin sign-out, filter and delete controls, and the admin logo link.
  - On phones up to 400 px wide, the inquiry date card uses slimmer side padding, so each calendar day stays about 44 px wide.
  - Admin screens use the dynamic viewport height, and no admin text is smaller than 12 px on phones.
- **Not covered:** testing on physical devices, and the admin dialogs and the inquiry form's later steps beyond their first state.
- **Affected documents:** None (layout only; no copy).

### DEC-031 — Bolder rewinding lines and view-triggered text reveals

- **Status:** Approved (2026-09-30)
- **Decision:**
  - The two side lines (DEC-027) are bolder: 3.5 px on desktop and 2.5 px on phones, with the right line at 72 % opacity. They ease after the scroll position instead of tracking it rigidly, and they rewind when the visitor scrolls back up.
  - Heading and fade reveals start only when the element is really in view. They use an IntersectionObserver instead of stored scroll positions, which went stale when content above loaded late and made reveals play off screen.
  - Scroll-linked effects are measured again whenever the page height changes.
  - Reveals run at a steadier pace: headings take 1.6 s and fades 1.5 s, with an even ease instead of a fast start.
- **Supersedes:** In DEC-027, "fine (1.75 px)", "half opacity" and "stay drawn".
- **Related:** The animated cinnamon branches at the page edges (reference: ERA Residences) are recorded in DEC-032.
- **Affected documents:** None (motion only; no copy).

### DEC-032 — Animated cinnamon branches

- **Status:** Approved (2026-09-30)
- **Decision:**
  - Decorative cinnamon branches grow in from the page edges on three pages:
    - **Home:** Overview (left cluster on wide screens, and top-right), Quote band (top-left cluster and lower right), Kitchen & dining (left, in the empty space under the first photograph, grid layouts only), Outside (top-right cluster), Amenities (top-right) and Send Inquiry (top-right cluster).
    - **Stay Options:** Rates (top-right cluster) and Before you inquire (top-left, and right on wide screens).
    - **Gallery:** Hero (right) and the closing panel (both top corners, behind the panel).
  - Each branch is a short looping video of moving leaves with real transparency, keyed from the supplied blue-screen footage (`video/Branch assests`). Each clip file carries its colour and its matte; the page joins them on a canvas, which works in every browser. The leaves are therefore solid: they cover the side lines and each other, and no background shows around them at any time, including while the page loads.
  - A "cluster" layers a second clip behind the first for denser foliage. Phones show single, smaller branches that stay clear of text and photographs.
  - The entrance follows the scroll and rewinds when scrolling back up. A clip loads shortly before it is reached and plays only while on screen.
  - With reduced motion, still posters replace the clips and nothing moves.
  - The branches are decorative: hidden from assistive technology, never clickable, and always behind the section content.
- **Affected documents:** None. Visual only; no copy or structure changed.

### DEC-033 — Site-wide performance

- **Status:** Approved (2026-09-30)
- **Decision:**
  - **Code:** only the Home page ships in the first download. Stay Options, Gallery, Inquiry, Privacy and the admin area are separate files, fetched while the current page eases out and in idle time. First download: 189 kB to 161 kB (gzip).
  - **Photographs:** every photograph gains AVIF renditions and a ladder of widths up to a 2560px long edge. The 8K masters (4-6 MB each) stay on disk but leave the `srcset`, so no browser jumps to them. The photo viewer asks for the width the fitted photograph needs.
  - **Clips:** each leaf clip is downloaded and decoded once however often it appears on a page; phones get half-size leaf clips. The three portrait cinemagraphs are 720x1280. Cinemagraph posters are WebP.
  - **Delivery:** long-lived cache headers for built files, a one-week cache for media, and a preload for the Home hero poster.
  - **Measured (full scroll of Home, cache off):** phone 26.4 MB to 8.9 MB; desktop 30.1 MB to 18.0 MB; desktop at 2x density 38.1 MB to 19.6 MB.
- **Not changed:** the landscape cinemagraphs (re-encoding saved almost nothing) and the 8K files themselves.
- **Affected documents:** None. No copy or structure changed.

### DEC-034 — Mobile interface refinements (under 760px only)

- **Status:** Approved (2026-09-30)
- **Scope:** Layouts under 760px only. Desktop pages were compared before and after at 1440px and 1024px and are pixel-identical.
- **Decision:**
  - **Inquiry bar:** a slim bar at the bottom of the screen with the weekday starting rate (`From Rs. … per night`, the wording already on Home) and Send Inquiry. It appears after the first screen and hides on the Inquiry page, in the photo viewer, under the open menu, and wherever the page already shows Send Inquiry (the closing sections and the footer).
  - **Stay Options:** each weekday stay is a card, with the two prices side by side under their labels.
  - **Inquiry:** Back and Continue stay at the bottom of the screen while a step is in view.
  - **Gallery:** the chapter names sit in a row under the header while the chapters scroll, standing in for the wheel. The current chapter is highlighted; selecting a name scrolls to it.
  - **Home, Outside and Nearby:** the photographs form one row to swipe through, each large with the next one peeking in.
  - **Spacing and touch:** sections sit a little closer together; a photograph responds when pressed.
- **Supersedes:** In DEC-030, the two-column masonry for the Outside and Nearby sections only. Every other section keeps the masonry.
- **Not adopted:** an accordion for the amenities (it would hide content guests use to decide) and a scroll hint on the Hero.
- **Affected documents:** `04 Content/Phase 1 Website Copy.md` (inquiry bar wording).

### DEC-035 — Text reveals: line by line, at a steadier pace

- **Status:** Approved (2026-09-30)
- **Decision:**
  - All supporting text reveals line by line: paragraphs, lists, and the text inside boxes and cards (rates, amenities, "Available on request", the closing panels). Text never appears as one block.
  - A box or card fades in behind its lines; photographs, buttons and the map (no text) fade up as before.
  - Faster than DEC-031: headings 1.15 s per line with 0.11 s between lines (was 1.6 s and 0.16 s); body text 1.0 s with 0.085 s between lines (was a 1.5 s fade of the whole block).
  - Everything still waits for its own section to scroll into view.
- **Supersedes:** In DEC-031, the reveal timings and the fade of whole text blocks.
- **Affected documents:** None. Motion only.

## Open decisions and launch dependencies

### OPEN-001 — Official Google destination

- **Status:** Open
- **Needed:** Exact verified Google Business Profile or Google Maps URL for directions and Google Reviews actions.

### OPEN-002 — Hosting and logs

- **Status:** Open
- **Needed:** Hosting provider, technical logging behaviour and retention period for final Privacy Notice verification.

### OPEN-003 — Privacy publication details

- **Status:** Open
- **Needed:** Final publication/last-updated date and confirmation of the process used to handle privacy requests.

### OPEN-004 — Visual direction

- **Status:** Open
- **Needed:** Final colour system and approved low-fidelity wireframes. Previously explored colours are not approved.

## Change procedure

When a decision changes:

1. Mark the old entry **Superseded** without deleting it.
2. Add a new decision entry describing the replacement.
3. List the documents affected by the change.
4. Update the English authoritative documents.
5. Synchronize and verify the Sinhala translations.
