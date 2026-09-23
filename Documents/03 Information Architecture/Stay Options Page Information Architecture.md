# Villa Cinnamoon Castle — Stay Options Page Information Architecture

## Status

This is the authoritative Phase 1 information architecture and working copy for the public `Stay Options` page. It supersedes the earlier eight-section exploration in `../04 Content/Phase 1 Website Copy.md`.

The working copy was refined during implementation under DEC-017 (2026-09-23). The previous version is preserved in `../99 Archive/Stay Options Page Information Architecture - Pre-Copy-Refinement 2026-09-23.md`. Package rates, capacities and A/C rules did not change.

The page contains **four primary content sections**. Weekday, weekend, mixed-stay, cooling and request-based details are supporting content inside those sections; they are not separate page sections.

The rejected file `Sample components/stay-options-intro.html` is not an approved visual reference.

## Page objective

Help a visitor:

1. Understand which rates apply to their dates
2. Compare suitable options by group size
3. Understand what is and is not included
4. Start the three-step WhatsApp inquiry with accurate expectations

The page must not imitate an online booking engine. Phase 1 shows estimated pricing and sends an inquiry; it does not display live availability, reserve dates or confirm a booking.

---

## Section 1 — Hero

### Purpose

Identify the page and explain the weekday/weekend distinction without placing a price table above the fold.

### Working copy

**Eyebrow**

> Stay options

**Headline**

> Find the right stay for *your group.*

The italic phrase uses the Bodoni Moda editorial accent.

**Supporting text**

> From Monday to Thursday, choose a stay sized to your group. Friday to Sunday nights are booked as the whole villa, for up to 15 guests.

**Actions**

> Send Inquiry

> View rates

### Information and interaction rules

- Use one representative villa visual: exterior, shared living space or garden.
- Do not use a single bedroom as the main page visual.
- Do not place prices or package cards in the Hero.
- `View rates` scrolls to Section 2 (`/stay-options#rates`).
- `Send Inquiry` opens the canonical three-step inquiry flow.
- Use the approved colour and typography system. The rejected HTML sample must not influence the final design.

---

## Section 2 — Stay Options & Pricing

### Purpose

Keep all date logic, package comparison and rates in one place. A visitor should not need to move between separate page sections to understand the available options.

### Section heading

**Eyebrow**

> Rates

**Headline**

> Compare stays by date and group size.

### Date-type orientation

Show these three rules together at the start of the section:

**Weekday nights** — Monday to Thursday

> Stays sized for couples, families and groups.

**Weekend nights** — Friday, Saturday and Sunday

> The whole villa, for up to 15 guests.

**Mixed stays** — Weekday and weekend

> Each night is charged at its own rate.

**Night-classification note**

> Rates follow the night you stay, so a Sunday night is a weekend night.

These rules remain visible. Do not hide them inside tabs, accordions or tooltips.

### Weekend rate comparison

Present the weekend offer as one full-villa stay with two cooling choices, not as two unrelated promotional cards.

Section label: `Weekend nights` — `Rates per night, Friday to Sunday`

| Stay | Capacity | Without A/C | With A/C |
|---|---:|---:|---:|
| The whole villa | Up to 15 guests | Rs. 21,000 | Rs. 23,000 |

**Weekend summary**

> One group of up to 15 guests. Both options include all five bedrooms, both living areas, the kitchen and the garden.

### Weekday rate comparison

Order weekday options by guest capacity. On desktop, use one structured comparison list. On mobile, convert each row into a compact block without losing the Non-A/C and A/C comparison.

Section label: `Weekday nights` — `Rates per night, Monday to Thursday`

Public column labels are `Group size`, `Stay`, `Without A/C` and `With A/C`.

| Group size | Stay | Stay detail | Without A/C | With A/C |
|---|---|---|---:|---:|
| Up to 2 guests | Couples stay | One bedroom | Rs. 6,500 | Not offered |
| Up to 4 guests | Family stay | Family sleeping setup arranged by the host | Rs. 8,500 | Not offered |
| Up to 4 guests | Two bedrooms | Two separate bedrooms | Rs. 8,500 | Rs. 10,500 |
| Up to 6 guests | Three bedrooms | Three bedrooms prepared | Rs. 12,500 | Rs. 14,500 |
| Up to 8 guests | Four bedrooms | Four bedrooms prepared | Rs. 15,500 | Rs. 17,500 |
| Up to 10 guests | All five bedrooms | Every bedroom prepared | Rs. 17,900 | Rs. 19,900 |
| Up to 15 guests | Full villa | Five bedrooms plus extra sleeping arrangements | Rs. 17,900 | Rs. 19,900 |

**Notes below the table**

> **Family stay or two bedrooms?** The Family stay uses a sleeping setup arranged by the host. Two bedrooms always means two separate rooms.

> **More than 10 guests?** The full villa adds extra sleeping arrangements, confirmed with the host.

> **Want more space?** You can choose a larger option than your group needs.

### Cooling clarification

Keep this clarification directly beside or immediately below the rate comparison. It is not a separate page section.

Heading: `About A/C`. On wide screens it stays beside the rate comparison.

**Without A/C**

> Stand fans in every bedroom. Air conditioning stays off.

**With A/C**

> Air conditioning in two bedrooms. The other bedrooms have stand fans.

**Availability note**

> A/C is not offered with the Couples or Family stay.

### Mixed-stay calculation

Use a compact visual equation with a worked example taken from the official catalogue (`package_details.md` §5, case C). Calculate the figures from the active package data; do not hard-code them.

**Example label**

> Friday check-in, Tuesday check-out · full villa with A/C

**Equation**

> 3 weekend nights × Rs. 23,000  
> +  
> 1 weekday night × Rs. 19,900  
> = Estimated total Rs. 88,900

**Calculation note**

> The inquiry form works this out for your own dates and group. The host confirms the final amount.

### Section action

> Send Inquiry

**Rate basis note (beside the action)**

> All rates are per night for the whole group, in Sri Lankan rupees.

### Information and interaction rules

- Do not build a flat grid of twelve package cards.
- Do not require visitors to enter dates within this section and then enter them again in the inquiry form.
- Keep all essential rates visible; do not hide prices in carousels or accordions.
- `Not offered` must be written explicitly instead of using an unexplained dash.
- Room counts may describe a package, but bedrooms must not be named, numbered or marketed individually.
- Do not advertise a per-person price.
- All displayed package data must come from the same active package source used by the inquiry flow.
- Rates updated by the admin must update both this comparison and the inquiry calculation.
- Mixed-stay totals are estimates, not confirmed booking totals.

---

## Section 3 — What Your Stay Includes

### Purpose

Confirm the common facilities and explain request-based arrangements without repeating amenities inside every package row.

### Section heading

**Eyebrow**

> Your stay

**Headline**

> Included with every stay.

**Supporting text**

> Electricity, gas, Wi-Fi and use of the full kitchen are part of the nightly rate.

Source: `package_details.md` §1 (bundled utilities).

### Included facilities

Organise the content into four short groups rather than individual amenity cards.

**Privacy & living**

- No other guests in the villa
- Ground-floor living room
- Upstairs lounge
- Dining table for the whole group

**Kitchen**

- Gas stove
- Refrigerator and freezer
- Rice cooker and kettle
- Cookware, cutlery and glassware

**Comfort**

- Wi-Fi
- TV with satellite channels
- Hot-water showers
- Bedroom cooling to match your option

**Outside**

- Private courtyard and garden
- Veranda
- Gated on-site parking
- BBQ pavilion

### Available on request

Keep request-based arrangements visually subordinate to the included list.

**Private chef**

> Arranged in advance. Guests cover the cost of ingredients.

**BBQ setup**

> The grill is prepared before you arrive.

**Request note**

> Add these under special requests in your inquiry. The host confirms availability and any extra charge.

### Information and interaction rules

- Do not repeat package prices, bedroom counts or guest limits here. The general statement that utilities are included is permitted.
- Do not present private-chef service, ingredients or BBQ equipment as automatically included.
- Do not add airport transfers, tours or activities until the host confirms they can be arranged.
- Nearby attractions are not stay inclusions.
- This is a concise confirmation section; the homepage remains the main visual amenities overview.
- No CTA is required inside this section.

---

## Section 4 — Stay Information & Send Inquiry

### Purpose

Set final expectations, explain the inquiry process and provide the page's closing action.

### Section heading

**Eyebrow**

> Before you inquire

**Headline**

> Stay details and what happens next.

### Essential stay information

**Check-in**

> From 1:00 PM

**Check-out**

> By 10:00 AM

**Later check-out**

> Up to 11:30 AM, on request, if the host can arrange it

**Long weekends**

> A two-night minimum may apply on long weekends and festive holidays

Sources: `package_details.md` §8 (late check-out) and §3 (weekend booking policy). Do not show the internal villa turnaround schedule on the public page. It is an operational detail, not a guest decision.

### Three-step inquiry summary

**Step 1 — Dates**

> Choose your check-in and check-out dates.

**Step 2 — Guests & stay**

> Enter your group size, compare the matching options and see the estimated total.

**Step 3 — Your details**

> Add your name, WhatsApp number and any requests, then send.

### Phase 1 confirmation message

**Statement (shown in quotation marks)**

> “Sending an inquiry doesn’t reserve your dates.”

**Supporting text**

> WhatsApp opens with your stay details ready to send. The host replies to confirm availability, the final amount and how to pay.

### Final action

> Send Inquiry

### Information and interaction rules

- The button opens the same canonical three-step flow used by the navbar and homepage.
- Do not replace the three-step flow with a standard contact form.
- Keep values already selected during the current session when the inquiry opens.
- Show validation and price changes inside the relevant step, not as detached alerts.
- The final CTA label remains exactly `Send Inquiry`.
- Do not use `Book now`, `Reserve now` or language implying immediate confirmation.
- After this section, show the global website footer; the footer is not counted as a page content section.

---

## Complete page order

1. Hero
2. Stay Options & Pricing
3. What Your Stay Includes
4. Stay Information & Send Inquiry
5. Global Footer — not counted as a page content section

## Global page rules

- Use the same navbar defined in the Phase 1 sitemap.
- Keep the navbar `Send Inquiry` action available throughout the page.
- On mobile, avoid horizontally scrolling price tables; transform rows into stacked, labelled comparisons.
- Text reveal animation starts only when content enters the viewport. Content must remain readable when JavaScript is unavailable or reduced motion is enabled.
- Avoid decorative motion that delays access to rates or controls.
- Use concise factual copy; do not add generic luxury claims or unnecessary promotional paragraphs.
- Use the approved colour and typography system in `../06 Design/Colour and Typography.md`.
