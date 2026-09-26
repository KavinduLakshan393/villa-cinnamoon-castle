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
  - A brand-green line drawn by scrolling runs behind the text and photographs:
    - Travelling segments through Overview and Shared living, and through Sleeping, Kitchen and Outside into the Balcony video (desktop only).
    - A line from the Location section that draws past the rates and reviews and stops at the `Send Inquiry` button (desktop only).
    - A villa-to-beach route in the Nearby section, labelled `The villa`, `Hikkaduwa Beach` and `3.5 km · about 5 minutes`. The route is decorative (`aria-hidden`), because the heading already states the distance.
  - Every scroll-linked effect now follows the reduced-motion setting live. Turning it on mid-visit stops the parallax, drift, word scrub and videos (the poster is shown), and draws the lines fully and still.
- **Not adopted:** Velocity-based image bending (reference: Lusion.co).
- **Affected documents:** `04 Content/Phase 1 Website Copy.md` (route labels).

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
