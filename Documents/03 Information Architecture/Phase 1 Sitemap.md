# Villa Cinnamoon Castle — Phase 1 Sitemap

This sitemap is the Phase 1 design baseline for public pages, homepage sections, external destinations and the package-management admin portal. Changes after baseline `P1-DESIGN-2026-09-22` must be recorded in the Decision Log.

## 1. Public website

```text
/
├── Home
│   ├── Hero / Arrival
│   ├── Villa Overview
│   ├── Shared Living
│   ├── Sleeping Experience
│   ├── Kitchen & Dining
│   ├── Outdoor Setting
│   ├── What the Villa Includes
│   ├── Available on Request
│   ├── Nearby Hikkaduwa
│   ├── Location / Google Maps
│   ├── Stay Options Preview
│   ├── Google Reviews
│   ├── Send Inquiry
│   └── Footer
│
├── /stay-options
│   ├── Hero
│   ├── Stay Options & Pricing
│   │   ├── Weekday, Weekend and Mixed-Stay Guidance
│   │   ├── Rate Comparisons by Guest Capacity
│   │   └── Cooling Clarification
│   ├── What Your Stay Includes
│   │   ├── Common Facilities
│   │   └── Available on Request
│   └── Stay Information & Send Inquiry
│
├── /gallery
│   ├── Gallery Hero
│   ├── Featured Gallery Strip
│   ├── Full Gallery
│   │   ├── Thematic Filters
│   │   └── Full-Screen Media Viewer
│   └── Closing Inquiry
│
├── /inquiry
│   └── Canonical three-step Send Inquiry flow
│
└── /privacy [recommended before launch]
    └── Brief privacy information covering form data and the WhatsApp handoff
```

## 2. Three-step inquiry flow

The inquiry flow is a core Phase 1 feature and is not a standard contact form.

```text
Step 1 — Dates
├── Check-in
├── Check-out
├── Total nights
└── Weekday / Weekend / Mixed classification

Step 2 — Guests & Package
├── Guest count
├── Recommended eligible package
├── Alternative eligible packages
├── A/C information
├── Mixed-stay price calculation
└── Estimated total

Step 3 — Contact
├── Full name
├── WhatsApp number
├── Special requests
├── Inquiry consent
└── Send Inquiry

WhatsApp handoff
└── Pre-filled structured message to the host
```

### Inquiry access points

- Navbar `Send Inquiry` button
- Hero `Plan Your Stay` button
- Homepage Send Inquiry section
- Stay Options page

All entry points must use the same three-step form logic, active package data and validation rules.

Every `Send Inquiry` entry point navigates to the canonical `/inquiry` page. The dedicated page is used on desktop and mobile so the three-step flow has consistent browser navigation, keyboard handling, state recovery and accessibility.

## 3. Main navigation

### Desktop

```text
Villa Cinnamoon Castle logo/name
The Villa
Stay Options
Gallery
Location
Send Inquiry
```

- Logo/name returns to the top of Home.
- `The Villa` opens the Villa Overview section on Home; it is not a separate page in Phase 1.
- `Stay Options` and `Gallery` are separate pages.
- `Location` opens the Location section on Home.
- `Send Inquiry` opens the three-step inquiry flow.

### Mobile

- Explicit `Home` link inside the menu
- The Villa
- Stay Options
- Gallery
- Location
- Send Inquiry remains prominent or immediately accessible

## 4. External destinations

These are outbound actions rather than internal website pages:

- Google Maps — `Get Directions`
- Google Business Profile — `View All Reviews`
- Google review form — `Review Us on Google`
- WhatsApp — final inquiry handoff

## 5. Admin portal — Phase 1

```text
/admin/login
└── Admin Login

/admin
└── Redirect or entry to Package Management

/admin/packages
├── Active Packages
├── Inactive Packages
├── Create Package
└── Edit / Deactivate Package
```

### Phase 1 admin scope

- Secure login and logout
- View active and inactive packages
- Create packages
- Edit package details and rates
- Deactivate packages without permanently deleting them

### Deferred from Phase 1

- Inquiry queue and booking management
- Booking history
- Approval, decline and cancellation workflows
- Automated quotations
- Calendar date blocking
- Direct-review moderation

## 6. Footer structure — final

- Villa identity, short description and Arachchikanda location
- `Send Inquiry`
- Explore: Home, The Villa, Stay Options, Gallery and Location
- Contact: primary WhatsApp number, Get Directions and Google Reviews
- External profiles: Facebook, Instagram, TikTok and Airbnb
- Legal bar: current-year copyright, Privacy and rights statement

The official Google Business Profile or Google Maps URL is still required before the directions and reviews links are published. The complete footer specification and verified external destinations are maintained in `Footer Information Architecture.md`.

## 7. Information architecture status

The Phase 1 public-page information architecture is complete. The Privacy page structure, working copy and implementation requirements are maintained in `Privacy Page Information Architecture.md`.

Remaining pre-launch dependencies are content and operational inputs rather than information-architecture decisions:

1. Official Google Business Profile or Maps URL
2. Production hosting provider and technical-log retention details
3. Final Privacy Notice publication date
4. Final visual design and responsive wireframes
