# Villa Cinnamoon Castle — Stay Options Page Information Architecture

## Status

This is the authoritative Phase 1 information architecture and working copy for the public `Stay Options` page. It supersedes the earlier eight-section exploration in `../04 Content/Phase 1 Website Copy.md`.

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

> Choose a stay for your group.

**Supporting text**

> Weekday options are available for couples, families and groups. Friday to Sunday nights are offered as a private full-villa stay.

**Actions**

> View options

> Send Inquiry

### Information and interaction rules

- Use one representative villa visual: exterior, shared living space or garden.
- Do not use a single bedroom as the main page visual.
- Do not place prices or package cards in the Hero.
- `View options` scrolls to Section 2.
- `Send Inquiry` opens the canonical three-step inquiry flow.
- The visual style remains undecided; the rejected HTML sample must not influence the final design.

---

## Section 2 — Stay Options & Pricing

### Purpose

Keep all date logic, package comparison and rates in one place. A visitor should not need to move between separate page sections to understand the available options.

### Section heading

**Eyebrow**

> Rates and options

**Headline**

> Compare stays by date and group size.

### Date-type orientation

Show these three rules together at the start of the section:

**Weekday nights**

> Monday to Thursday — options for couples, families and groups.

**Weekend nights**

> Friday to Sunday — private full-villa stays for up to 15 guests.

**Mixed stays**

> When a stay includes both date types, each night uses the matching rate.

These rules remain visible. Do not hide them inside tabs, accordions or tooltips.

### Weekend rate comparison

Present the weekend offer as one full-villa stay with two cooling choices, not as two unrelated promotional cards.

| Weekend option | Capacity | Rate per night |
|---|---:|---:|
| Standard — Non-A/C | Up to 15 guests | LKR 21,000 |
| A/C option | Up to 15 guests | LKR 23,000 |

**Weekend summary**

> Both options include private use of the villa, all five bedrooms, shared living spaces, the kitchen and the garden.

### Weekday rate comparison

Order weekday options by guest capacity. On desktop, use one structured comparison list. On mobile, convert each row into a compact block without losing the Non-A/C and A/C comparison.

| Suitable for | Stay option | Capacity | Non-A/C per night | A/C per night |
|---|---|---:|---:|---:|
| Couples | Couples stay | Up to 2 | LKR 6,500 | Not offered |
| Families | Family stay | Up to 4 | LKR 8,500 | Not offered |
| Small groups | Two-bedroom stay | Up to 4 | LKR 8,500 | LKR 10,500 |
| Medium groups | Three-bedroom stay | Up to 6 | LKR 12,500 | LKR 14,500 |
| Larger groups | Four-bedroom stay | Up to 8 | LKR 15,500 | LKR 17,500 |
| Larger groups | Five-bedroom stay | Up to 10 | LKR 17,900 | LKR 19,900 |
| Full-villa groups | Full-villa stay | Up to 15 | LKR 17,900 | LKR 19,900 |

**Selection guidance**

> Choose a larger option if your group would like more space.

**Family and small-group distinction**

> The Family stay uses a host-arranged family sleeping setup. The Two-bedroom stay guarantees a two-bedroom allocation.

**Large-group note**

> Groups above 10 guests use additional sleeping arrangements, confirmed with the host before booking.

### Cooling clarification

Keep this clarification directly beside or immediately below the rate comparison. It is not a separate page section.

**Non-A/C**

> Stand fans are provided in the bedrooms. Air conditioning is not included with this option.

**A/C**

> Air conditioning is available in two bedrooms. The remaining bedrooms have stand fans.

**Availability note**

> A/C is available only where an A/C rate is shown. It is not offered with the Couples or Family stay.

### Mixed-stay calculation

Use a compact visual equation:

> Weekend nights × selected weekend rate  
> +  
> Weekday nights × selected weekday rate  
> = Estimated stay total

**Example**

> A Friday check-in and Tuesday check-out includes three weekend nights and one weekday night.

**Calculation note**

> Select your dates and guest count in the inquiry form to see the matching options and estimated price breakdown.

### Section action

> Send Inquiry

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

### Included facilities

Organise the content into four short groups rather than individual amenity cards.

**Privacy & living**

- The villa is not shared with another guest booking
- Ground-floor living room
- Upstairs lounge
- Group dining area

**Kitchen**

- Gas stove
- Refrigerator and freezer
- Rice cooker and kettle
- Cookware, cutlery and glassware

**Comfort & connectivity**

- Wi-Fi
- Television with satellite channels
- Hot-water showers
- Bedroom cooling based on the selected option

**Outside**

- Private courtyard and garden
- Veranda
- Secure on-site parking
- BBQ pavilion

### Available on request

Keep request-based arrangements visually subordinate to the included list.

**Private chef**

> A private chef can be arranged in advance. Guests provide or cover the cost of ingredients.

**BBQ setup**

> BBQ equipment can be prepared when requested before arrival.

**Request note**

> Availability and any additional charges are confirmed directly with the host. Add your request under special requests when sending your inquiry.

### Information and interaction rules

- Do not repeat prices, bedroom counts or guest limits here.
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

> Stay details and the next step.

### Essential stay information

**Check-in**

> From 1:00 PM

**Check-out**

> By 10:00 AM

**Late check-out**

> A short extension may be available on request and must be confirmed by the host.

Do not expose the internal villa turnaround schedule on the public page. It is an operational detail rather than a guest decision.

### Three-step inquiry summary

**Step 1 — Dates**

> Select your check-in and check-out dates.

**Step 2 — Guests & stay option**

> Enter the guest count, review the matching options and see the estimated total.

**Step 3 — Contact details**

> Add your name, WhatsApp number and any special requests, then send the inquiry.

### Phase 1 confirmation message

> Sending an inquiry does not reserve or confirm the selected dates. WhatsApp opens with your stay details, and the host confirms availability, the final amount and payment instructions directly with you.

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
- The final visual language, colour system and component styling remain open for a later design phase.
