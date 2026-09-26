# Villa Cinnamoon Castle — Phase 1 Website Copy

**Status:** Phase 1 design-copy baseline — page-specific IA documents take precedence for structure and interaction. Copy changes after baseline `P1-DESIGN-2026-09-22` must be recorded and reconciled.

This is the living reference for all public-facing website copy agreed during the Phase 1 UX and information architecture discussions.

## Copy standards

- Write in clear, natural English.
- Copy must not read like AI-generated marketing text.
- Use short, direct sentences.
- Include only information that helps a visitor understand the villa or take the next step.
- Avoid excessive adjectives, poetic filler, generic luxury language and repeated information.
- Use verified property details only.
- Keep the tone welcoming, calm and practical for both local and international guests.
- Use `Plan Your Stay` as the Hero entry CTA.
- Use `Send Inquiry` for the navbar inquiry button and the final form submission CTA.

## Information architecture decisions

- The website will include a separate Gallery page.
- The dedicated Gallery page uses curated, selected media according to `../03 Information Architecture/Gallery Page Information Architecture.md` and the Phase 1 Content Inventory.
- The five bedrooms must not be presented publicly as separately numbered bedroom categories.

## Hero / Arrival

### Current working copy

Updated under DEC-016 (2026-09-23). The previous version is preserved in `../99 Archive/Phase 1 Website Copy - Pre-Copy-Refinement 2026-09-23.md`.

**Eyebrow**

> Arachchikanda, Hikkaduwa

**Headline — the phrase in brackets changes**

> A private villa for [the whole group / family reunions / old friends / slow weekends] under the trees.

- The changing phrase uses the Bodoni Moda italic editorial accent. The rest of the headline uses Plus Jakarta Sans.
- Screen readers receive one stable sentence: `A private villa for families and groups, under the trees.`
- The first phrase stays fixed when reduced motion is requested. The phrase stops changing while the Hero is off-screen or the tab is hidden.

**Supporting text**

> Five bedrooms and space for up to 15 guests, 3.5 km from Hikkaduwa Beach.

**Primary CTA**

> Plan Your Stay

**Secondary CTA**

> Explore the Villa

### Content rule

Do not add a separate quick-facts row to the Hero when it repeats the same bedroom, capacity or location information already stated in the supporting text.

Every changing phrase must stay true of the property: one private villa for one group, set among mature trees. Do not add phrases that suggest events, services or facilities the host has not confirmed.

### Loading intro

The intro appears only on a full page load of Home. It shows the following phrases in order, then lifts away:

> Tropical shade

> Shared tables

> Slow mornings

> Villa Cinnamoon Castle

The bottom row shows `Arachchikanda`, a 0–100 loading counter and `Hikkaduwa`.

## Villa Overview

### Current working copy

**Eyebrow**

> The villa

**Headline**

> The whole villa is yours.

**Supporting text**

> No shared areas and no other guests. Your group has private use of the living spaces, kitchen and garden throughout the stay.

**Supporting details**

- Two living areas
- Full kitchen
- Two bathrooms
- Wi-Fi

### Content rule

Do not repeat the bedroom count, guest capacity or distance from Hikkaduwa in this section. Those details already appear in the Hero. This section should focus on privacy and shared facilities. It does not need another CTA.

## Amenities Placement

### Information architecture decision

Place the dedicated amenities section after the visual villa tour—shared living, sleeping, kitchen and outdoor spaces—and before stay options and pricing.

Recommended sequence:

1. Hero / Arrival
2. Villa Overview
3. Shared Living
4. Sleeping Experience
5. Kitchen & Dining
6. Outdoor Setting
7. What the Villa Includes
8. Nearby Experiences
9. Location
10. Stay Options & Pricing

Relevant amenities may be mentioned naturally within the earlier visual sections. The dedicated amenities section provides the concise reference list and must not repeat lengthy descriptions.

### Information structure

- Text-only four-column grid on desktop
- Stacked groups on mobile
- No supporting paragraph
- No decorative image required
- No CTA

### Current working heading

> What the villa includes

### Amenity groups

**Comfort**

- Wi-Fi
- Air conditioning in two bedrooms with A/C stay options
- Stand fans in the remaining bedrooms and living areas
- Hot-water showers

**Kitchen & dining**

- Gas stove
- Refrigerator and freezer
- Rice cooker and kettle
- Cookware and tableware
- Dining table

**Living & practical**

- Two living areas
- TV
- Workspace
- Washing machine and iron

**Outside**

- Private garden and courtyard
- Gated on-site parking
- Veranda and upstairs balcony

### Content rule

Do not mix included amenities with services or activities that require prior arrangement. Private chef service, BBQ setup, boat safaris, kayaking and snorkelling must appear separately under `Available on request`.

## Available on Request

### Information structure

- Compact block immediately after `What the Villa Includes`
- One heading
- Short list of services and activities
- One clarification about availability and cost
- No CTA and no separate full-screen section

### Current working copy

**Heading**

> Available on request

**Items**

- Private chef
- BBQ setup
- Lagoon or river boat safari
- Kayaking
- Snorkelling
- Underwater photography or photo shoots

**Clarification**

> Availability and cost are confirmed directly with the host.

### Content rules

- Do not present these items as included amenities.
- Do not imply that every activity is operated directly by the villa.
- Do not advertise a fixed price unless the host has supplied and approved it.

## Home Quote Band

### Information structure

- Text-only interlude between Shared living and Sleeping arrangements (DEC-022)
- One quote, revealed word by word with scroll (text reveal 2)

### Current working copy

> Five bedrooms, two living areas and a garden, *shared by one group* and no one else.

## Balcony

### Information structure

- Full-screen cinemagraph after the Outside section (DEC-022): desktop 16:9 and mobile 9:16 loops, with a pause control
- One eyebrow and one quote in the lower left, revealed word by word with scroll

### Current working copy

**Eyebrow**

> The balcony

**Quote**

> Mornings on the balcony, *above the palms,* with nowhere else to be.

## Hikkaduwa Beach

### Information structure

- Full-screen aerial cinemagraph between the Amenities and Nearby sections (DEC-022): desktop 16:9 and mobile 9:16 loops, with a pause control
- One eyebrow, one quote in the lower left (text reveal 2) and one distance line

### Current working copy

**Eyebrow**

> Hikkaduwa Beach

**Quote**

> Reef, surf and golden sand, *five minutes down the road.*

**Distance line**

> Nearby · 3.5 km from the villa, about 5 minutes by car

### Content rules

- Always present the beach as a nearby place, never as part of the villa.
- The source aerial photograph must be licensed or replaced with an owned photograph before launch.

## Nearby Hikkaduwa

### Information structure

- One section label
- One factual heading
- One short supporting paragraph
- Up to four selected destination or activity images, each captioned `Nearby — …` (DEC-022)
- No CTA; the map and directions appear later in the Location section

*Superseded by DEC-022 (2026-09-26): "No more than two selected destination or activity images".*

### Current working copy

**Eyebrow**

> Nearby

**Headline**

> Hikkaduwa is 3.5 km away.

**Supporting text**

> The town, beach, coral reef and surf spots are a short trip from the villa. Galle Fort is around 20 minutes away by road.

**Route labels (decorative line, DEC-023)**

> The villa

> Hikkaduwa Beach

> 3.5 km · about 5 minutes

### Content rules

- Clearly present beach, reef and activity images as nearby experiences rather than on-property facilities.
- Use approximate travel times because road conditions may vary.
- Do not repeat the full `Available on request` list in this section.
- Use no more than four images on the homepage; additional destination media can appear in the separate Gallery page.

*Superseded by DEC-022 (2026-09-26): "Use no more than two images on the homepage".*

## Location

### Placement decision

Place the Location section immediately after `Nearby Hikkaduwa` and before the homepage Stay Options preview.

### Information structure

- One section label
- One short heading
- Locality and regional address
- Visitor-initiated `Open in Google Maps` action using the verified official destination
- One external directions CTA
- No repeated attraction list or travel description

### Current working copy

**Eyebrow**

> Location

**Headline**

> Find us in Arachchikanda.

**Address**

> Arachchikanda, Hikkaduwa, Southern Province, Sri Lanka

**CTA**

> Get Directions

### Content rules

- Use the verified official Villa Cinnamoon Castle Google Business Profile or Maps destination for directions. Do not automatically load an interactive third-party map on initial page load.
- Do not invent coordinates or use an approximate map pin.
- Open `Get Directions` in Google Maps.
- Keep Google review content and the `Review Us on Google` action in the separate Google Reviews section.

## Homepage Stay Options Preview

### Information structure

- One section label
- One direct heading
- Two summary blocks: Weekday stays and Weekend stays
- One starting rate in each block
- One link to the dedicated Stay Options page
- No full package table and no package comparison controls on the homepage

### Current working copy

**Eyebrow**

> Stay options

**Headline**

> Options for different group sizes.

**Weekday stays**

> From Rs. 6,500

> For couples, families and groups. Rates vary by group size and A/C choice.

**Weekend stays**

> From Rs. 21,000

> Full-villa stays for groups of up to 15 guests.

**CTA**

> View Stay Options

### Content rules

- Keep detailed package information on the dedicated Stay Options page.
- Do not display every package card on the homepage.
- Starting rates must come from the active package data rather than being hard-coded permanently into the interface.
- Clearly label prices in Sri Lankan Rupees.

## Google Reviews

### Information structure

- One section label
- One direct heading
- Official Google rating and total review count
- Selected Google review cards (six or more recommended) split across two rows
- Two continuously moving rows (DEC-020): the upper row drifts right and the lower row drifts left
- A visible `Pause reviews` / `Play reviews` control; motion also pauses on hover, on keyboard focus and while the section is off-screen
- With reduced motion, both rows are static and can be swiped or scrolled

*Superseded by DEC-020 (2026-09-24): "Three selected Google review cards" and "Static grid on desktop and horizontal manual swipe on mobile".*
- Link to view all reviews on Google
- Link for previous guests to leave a Google review

### Current working copy

**Eyebrow**

> Google Reviews

**Headline**

> What guests say on Google.

**Primary link**

> View All Reviews

**Secondary link**

> Review Us on Google

### Content rules

- Phase 1 displays Google Reviews only.
- Do not add review-source tabs or a `Verified Direct Guests` section in Phase 1.
- Do not add a website review-submission form in Phase 1.
- Do not fabricate review text, guest names, ratings or the total review count.
- Use data from the official Villa Cinnamoon Castle Google Business Profile.
- Review rows move continuously by approved exception (DEC-020). They must stay slow (about 40 px per second), loop seamlessly and never move without a visible pause control. Long reviews are shortened with a link to the full review on Google.
- Link each available action to the appropriate official Google Maps or Google review destination.

## Send Inquiry

### Information structure

- Sequential three-step inquiry form
- Step 1: Check-in and check-out dates
- Step 2: Guest count and package selection
- Step 3: Contact details, optional requests and consent
- Live stay and price summary before submission
- WhatsApp handoff with a pre-filled inquiry message
- One final submission CTA labelled `Send Inquiry`

### Access points

- The complete form is available on the canonical `/inquiry` page.
- The navbar includes a clearly visible button labelled `Send Inquiry`.
- Clicking the navbar button must navigate directly to the same three-step form on `/inquiry`.
- Use the dedicated page on desktop and mobile for consistent browser navigation, keyboard handling, session-state recovery and accessibility.
- All access points must use the same form component, validation rules and package data.

### Current working copy

**Eyebrow**

> Send an inquiry

**Step 1 — Dates**

- Check-in
- Check-out

**Step 2 — Guests and stay option**

- Guests
- Recommended stay option
- Other eligible stay options
- A/C information
- Estimated total

**Step 3 — Contact details**

- Full name
- WhatsApp number
- Special requests (optional)
- Inquiry consent

**Clarification**

> This is an inquiry only. The host will confirm availability and pricing on WhatsApp.

**CTA**

> Send Inquiry

### Homepage closing section

Added under DEC-016 (2026-09-23).

**Eyebrow**

> Send an inquiry

**Headline**

> Send your dates to the host.

**Supporting text**

> This is an inquiry only. The host will confirm availability and pricing on WhatsApp.

**CTA**

> Send Inquiry

### Content and UX rules

- One person submits the inquiry for the group.
- Do not add individual traveller details or group collaboration features.
- Preserve the three-step inquiry flow defined in the SRS.
- Keep package selection, automatic recommendations and live price calculation in Step 2.
- Package recommendations are assistive; visitors may select another eligible option.
- Keep the WhatsApp number field and validation defined in the SRS.
- Open WhatsApp with a pre-filled message containing the form details.
- The host confirms final availability, booking and payment details directly with the person who submits the inquiry.
- The form does not need individual details for the other members of the group.

## Global Navigation

### Desktop navigation

1. Villa Cinnamoon Castle logo / name — links to Home
2. The Villa — links to the villa overview on the homepage
3. Stay Options — opens the dedicated Stay Options page
4. Gallery — opens the dedicated Gallery page
5. Location — links to the homepage Location section
6. Send Inquiry — prominent inquiry button

### Mobile navigation

- Keep the Villa Cinnamoon Castle identity visible.
- Keep `Send Inquiry` visible or immediately accessible.
- Place the remaining navigation items inside a clear menu.
- Use the same labels as the desktop navigation.

### Navigation rules

- Keep the main header visible as the visitor scrolls.
- Do not add every homepage section as a top-level navigation item.
- Google Reviews, Kitchen & Dining and Outdoor Setting do not need separate main-navigation links.
- The logo or villa name always returns to the homepage.
- `Send Inquiry` must use that exact label; do not replace it with `Book Now` because the website does not confirm bookings.
- The navbar inquiry button opens the canonical three-step inquiry flow at `/inquiry`.
- Do not duplicate the full inquiry form inside a conventional modal.
- When a visitor is on another page, homepage section links must still return to the correct homepage anchor.

## Stay Options Page

> **Prototype note:** `Sample components/stay-options-intro.html` was created only to test the first two sections. Its visual design direction was rejected and must not be treated as an approved UI reference.

### Information architecture decision

- Package details will appear on a separate page named `Stay Options`.
- Do not create a separate public page for every package.
- The homepage will contain only a short stay-options preview and a link to the dedicated page.
- Use guest-oriented labels such as `For up to 4 guests` instead of leading with internal package names such as `2-Room Group`.
- Where necessary, supporting text may state how many bedrooms are prepared for the selected group size.
- Do not identify or display bedrooms individually by number.

### Stay Options page structure

The final page contains four primary sections:

1. Hero
2. Stay Options & Pricing
3. What Your Stay Includes
4. Stay Information & Send Inquiry

The authoritative structure and working copy are maintained in `../03 Information Architecture/Stay Options Page Information Architecture.md`.

## Shared Living

### Information structure

- One section label
- One direct heading
- One short supporting paragraph
- One ground-floor living image
- One upstairs mezzanine image
- Short factual image captions
- No CTA and no repeated amenities list

### Current working copy

**Eyebrow**

> Shared living

**Headline**

> Two living areas, so the group can spread out.

**Supporting text**

> The main living room is downstairs with seating and a TV. Upstairs, the open mezzanine offers a quieter place to sit.

**Image captions**

> Downstairs living room

> Upstairs mezzanine

## Sleeping Experience

### Information structure

- One section label
- One direct heading
- One short explanation of bedroom preparation and cooling
- Two or three bedroom images composed as one visual story
- No individual room cards, room names or room numbers
- No CTA

### Current working copy

**Eyebrow**

> Sleeping arrangements

**Headline**

> Five bedrooms, prepared for your group.

**Supporting text**

> Two bedrooms have air conditioning on A/C stay options. The remaining bedrooms have stand fans. For groups above 10, extra sleeping arrangements are confirmed with the host during the inquiry.

### Content rules

- Do not use public labels such as `Bedroom 1`, `Bedroom 2`, etc.
- Do not create five separate bedroom cards or five individual bedroom sections.
- Bedroom images should appear together as one sleeping experience.
- Do not imply that air conditioning is included with every stay option.
- Do not describe the maximum 15-person capacity as five beds accommodating 15 people. Extra sleeping arrangements for groups above 10 must be made clear.

## Kitchen & Dining

### Information structure

- One section label
- One short heading
- One factual supporting paragraph
- One kitchen image and one dining image
- No CTA
- Detailed utensils remain in the amenities section rather than the narrative copy

### Current working copy

**Eyebrow**

> Kitchen & dining

**Headline**

> Cook your own meals and eat together.

**Supporting text**

> The kitchen includes a gas stove, refrigerator, rice cooker, kettle, cookware and tableware. A dining area is available for shared meals.

### Content rules

- Keep this section focused on self-catering and shared meals.
- Do not describe every utensil individually.
- Do not imply that food, ingredients or chef service are included with the stay.
- Private chef service must appear separately under `Available on request`.

## Outdoor Setting

### Information structure

- One section label
- One direct heading
- One short supporting paragraph
- One wide greenery image
- One exterior, veranda or balcony image
- No CTA

### Current working copy

**Eyebrow**

> Outside

**Headline**

> Private outdoor space, surrounded by greenery.

**Supporting text**

> The villa has a gravel courtyard, shaded garden, front veranda and an upstairs balcony overlooking the trees.

### Content rules

- Keep parking information in the dedicated amenities section.
- Do not imply that the property has a swimming pool.
- Avoid using nearby beach or activity images as though they are located within the villa grounds.
