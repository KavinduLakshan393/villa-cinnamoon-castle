# Villa Cinnamoon Castle — Phase 1 Footer Information Architecture

## Status

This is the authoritative Phase 1 specification for the global website footer. The same footer is used on Home, Stay Options, Gallery, Inquiry and Privacy pages.

The footer is a global component and is not counted as a content section within individual page information architecture.

## Footer objective

Give visitors a reliable final route to:

1. Send an inquiry
2. Return to a primary page or section
3. Contact or locate the villa
4. Visit an official social or accommodation profile
5. Read the privacy information

The footer must remain concise. It is not a second sitemap and must not repeat package prices, amenities or promotional paragraphs.

## Desktop structure

Use one wide footer grid with four content groups, followed by a slim legal bar.

### Group 1 — Villa identity

**Name**

> Villa Cinnamoon Castle

**Description**

> A private villa for families and groups near Hikkaduwa.

**Location**

> Arachchikanda, Hikkaduwa, Sri Lanka

**Primary action**

> Send Inquiry

The action navigates to the canonical `/inquiry` page and preserves valid inquiry data from the current session.

### Group 2 — Explore

**Heading**

> Explore

**Links**

- Home — `/`
- The Villa — `/#villa`
- Stay Options — `/stay-options`
- Gallery — `/gallery`
- Location — `/#location`

Do not add links to homepage sections that are not useful as independent destinations.

### Group 3 — Contact & location

**Heading**

> Contact & location

**WhatsApp**

> +94 76 100 7686

Destination:

> `https://wa.me/94761007686`

**Directions**

> Get directions

**Reviews**

> Google Reviews

The official Google Business Profile or Google Maps URL is still required. Do not invent a search URL or publish either link until the exact official destination is supplied and verified. If only one official Google destination covers both directions and reviews, the two public labels may use that same verified profile URL.

### Group 4 — Follow & find us

**Heading**

> Follow & find us

**Links**

- Facebook — `https://web.facebook.com/people/Villa-Cinnamoon-Castle/61565740212688/`
- Instagram — `https://www.instagram.com/villa_cinnamoon_castle_596`
- TikTok — `https://www.tiktok.com/@villa.cinnamoon.ca`
- Airbnb — `https://www.airbnb.com/rooms/1651346026185294869`

Airbnb is an accommodation-platform link, not a social network. It remains in the same compact group for usability but should use a distinct label or visual separation from the three social profiles.

## Legal bar

**Left**

> © {current year} Villa Cinnamoon Castle

**Right**

- Privacy — `/privacy`
- `All rights reserved.`

The year should be generated from the current date rather than hard-coded.

Do not add Terms, Cookies or Cancellation links until corresponding approved content exists.

## Mobile structure

Use this order:

1. Villa name, description and location
2. `Send Inquiry`
3. Explore links
4. Contact and location links
5. Social and Airbnb links
6. Privacy and copyright

Do not hide the small link groups inside accordions. The complete footer is short enough to remain visible and easier to scan when expanded.

## Interaction and accessibility rules

- Use descriptive text labels; social links must not rely on icons alone.
- Icons may accompany labels but never replace them.
- External links open in a new tab only when the interface clearly indicates that behaviour.
- New-tab links use `rel="noopener noreferrer"`.
- WhatsApp, Airbnb and social destinations are identified as external.
- All links have visible keyboard focus states.
- Minimum touch target height is 44 pixels on mobile.
- Link text and surrounding background meet contrast requirements.
- Do not animate the footer links beyond a restrained underline, colour or arrow movement.
- Footer content must remain visible without JavaScript.
- The footer itself does not require scroll-reveal animation; visitors should not wait for navigation links to appear.

## Content rules

- Use `Send Inquiry` exactly.
- Do not use `Book now` or `Reserve now`.
- Use the primary WhatsApp number `+94 76 100 7686` consistently.
- Do not publish the secondary hotline as an equal primary contact in Phase 1.
- Do not add an email address unless an official monitored address is supplied.
- Do not include package prices, check-in times or amenity lists.
- Do not include an embedded Google Map inside the footer.
- Do not display an empty newsletter form or mailing-list signup.

## Final content outline

```text
Villa Cinnamoon Castle
A private villa for families and groups near Hikkaduwa.
Arachchikanda, Hikkaduwa, Sri Lanka
[Send Inquiry]

Explore
Home
The Villa
Stay Options
Gallery
Location

Contact & location
WhatsApp — +94 76 100 7686
Get directions — exact official Google URL required
Google Reviews — exact official Google URL required

Follow & find us
Facebook
Instagram
TikTok
Airbnb

© {current year} Villa Cinnamoon Castle
Privacy
All rights reserved.
```
