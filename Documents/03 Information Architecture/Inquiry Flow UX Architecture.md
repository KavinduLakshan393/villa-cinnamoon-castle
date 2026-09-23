# Villa Cinnamoon Castle — Phase 1 Inquiry Flow UX Architecture

## Status

This is the authoritative UX specification for the Phase 1 `Send Inquiry` flow. It must remain consistent with the SRS, active package data and the Stay Options page.

## Recommended presentation model

Use a canonical dedicated route:

> `/inquiry`

All `Send Inquiry` actions in the navbar, homepage and Stay Options page navigate to this route.

Do not place the three-step form inside a conventional modal. A dedicated page provides better mobile keyboard handling, browser Back behaviour, refresh recovery, accessibility, deep linking and space for mixed-stay price breakdowns.

If the visitor has already selected dates, guest count or a package during the current session, preserve and prefill those values when `/inquiry` opens.

## Page-level structure

- Global logo and a clear way back to the previous page
- Page title: `Send an inquiry`
- Text progress indicator: `Step 1 of 3`
- Named steps: `Dates`, `Stay option`, `Your details`
- Current step content
- Persistent summary on desktop after enough information is available
- Inline summary on mobile
- Back and Continue controls
- Reassurance that the inquiry does not reserve dates

Completed steps may be revisited. Future steps remain unavailable until the current step is valid. Progress must not rely on colour alone.

---

## Step 1 — Dates

### Heading

> When would you like to stay?

### Controls

- `Check-in` field
- `Check-out` field
- One shared date-range calendar model
- Two visible months on suitable desktop widths
- One visible month on mobile
- Previous and next month controls

The two labelled fields remain independently understandable, but both use the same range calendar. This prevents conflicting selections from two unrelated calendar widgets.

### Rules

- Disable and visually mute dates before today.
- Check-out must be at least one day after check-in.
- One-night stays are valid.
- Friday, Saturday and Sunday are weekend nights.
- Monday through Thursday are weekday nights.
- Phase 1 does not show dates as available or unavailable because there is no live availability source.
- Do not use green availability indicators.

### Selection feedback

After a valid range is selected, show:

- Check-in and check-out dates
- Total nights
- `Weekday stay`, `Weekend stay` or `Mixed stay`
- For a mixed stay, the number of weekday and weekend nights

**Availability note**

> Availability is confirmed by the host after you send the inquiry.

### Actions

> Continue

The Continue button remains disabled until both dates form a valid range. Explain why it is disabled through inline guidance; do not rely on the disabled appearance alone.

---

## Step 2 — Guests & Stay Option

### Heading

> Choose an option for your group.

### Guest control

- Label: `Number of guests`
- Stepper range: 1–15
- Default: 2
- Provide editable numeric input behaviour in addition to minus and plus buttons
- Minimum touch target: 44 × 44 pixels

### Recommendation behaviour

- Highlight one suitable option as `Recommended for your group`.
- Recommendation is assistive, not mandatory.
- Show only packages that can accommodate the selected guest count.
- Allow the visitor to choose a larger eligible option.
- Never allow selection of a package below the chosen guest count.
- Recalculate recommendations when dates or guest count change.

### Weekday stay

Show the recommended weekday option first, followed by eligible larger alternatives. Each option displays:

- Public-facing stay name
- Maximum guest capacity
- Sleeping allocation
- Non-A/C and A/C rates where available
- One short factual distinction

Do not expose internal package codes or bedroom numbers.

### Weekend stay

Show one private full-villa offer with two choices:

- `Standard — Non-A/C`: LKR 21,000 per night
- `A/C option`: LKR 23,000 per night

Do not present these as two unrelated villa products.

### Mixed stay

Show two clearly labelled selections in this order:

1. Weekend portion
2. Weekday portion

Then show the split calculation:

> Weekend nights × weekend rate  
> +  
> Weekday nights × weekday rate  
> = Estimated total

Do not make the visitor calculate or combine the amounts manually.

### Cooling note

> A/C options include air conditioning in two bedrooms. The remaining bedrooms have stand fans.

Show this beside the relevant A/C choices. Do not hide it in a tooltip.

### Live summary

After a valid option is selected, show:

- Dates
- Total nights and date-type split
- Guest count
- Selected option or options
- Rate per night
- Estimated total

Do not show a per-person price in Phase 1. The website collects one inquiry for the group and does not need to suggest how guests divide the cost.

### Actions

> Back

> Continue

Continue remains disabled until guest count and every required package choice are valid.

---

## Step 3 — Your Details

### Heading

> Where should the host reply?

### Fields

**Full name**

- Required
- Minimum three characters
- Use a visible label; placeholder text is only an example

**WhatsApp number**

- Required
- Support Sri Lankan and international numbers
- Provide a country-code selector or clearly visible country code
- Use telephone input behaviour on mobile
- Validate after the field loses focus and again on submission

**Special requests**

- Optional multiline field
- Supporting prompt: `BBQ setup, dietary needs, expected arrival time or other requests`
- Display an appropriate character limit and remaining count

### Consent

Required checkbox:

> I understand that this is an inquiry. The host will confirm availability, the final amount and payment details on WhatsApp.

### Final review

Before submission, show an editable summary of:

- Dates
- Nights and classification
- Guest count
- Selected stay option or options
- Estimated total
- Name and WhatsApp number
- Special requests

Provide `Edit` links that return to the relevant step without clearing later valid values.

### WhatsApp instruction

> WhatsApp will open with your inquiry details. Review the message and tap Send to contact the host.

### Final action

> Send Inquiry

This exact label is used without an emoji. Prevent repeated activation while the WhatsApp link is being prepared.

---

## WhatsApp handoff

### Message format

```text
Villa Cinnamoon Castle — Stay Inquiry

Check-in: {check_in_date} — from 1:00 PM
Check-out: {check_out_date} — by 10:00 AM
Nights: {total_nights} — {date_type_label}

Guests: {guest_count}
Stay option: {package_name}
Rate: LKR {rate} per night
Estimated total: LKR {total_estimate}
{mixed_stay_breakdown_if_required}

Name: {customer_name}
WhatsApp: {whatsapp_number}

Special requests:
{special_requests_or_none}

Sent from the Villa Cinnamoon Castle website.
```

The message must be URL-encoded and opened with the official WhatsApp link for `+94 76 100 7686`.

### Return state

Opening WhatsApp does not prove that the visitor sent the message. Therefore, never display `Your inquiry has been sent` immediately after opening the link.

Use:

**Heading**

> WhatsApp opened

**Message**

> Review the prepared message in WhatsApp and tap Send. The host will reply there after receiving it.

**Fallback actions**

> Open WhatsApp again

> Copy inquiry details

Keep the form state available when the visitor returns to the browser.

---

## Validation and error behaviour

- Place each error beside the field or selection that needs attention.
- Use plain language that explains how to correct the problem.
- On failed progression, move focus to the first invalid control.
- Do not clear valid fields when another field fails.
- Do not use colour alone to indicate an error.
- Announce changing totals and validation messages to assistive technology without interrupting typing.
- Do not validate every keystroke in the name or phone fields.
- If package data cannot load, preserve dates and guest count and show a retry action.
- If WhatsApp cannot open, keep the generated message and offer copy and retry actions.

## Responsive behaviour

### Desktop

- Form content on the left
- Sticky inquiry summary on the right after Step 1 is complete
- Keep the primary action visible without covering content

### Mobile

- Single-column flow
- Full-width fields and option controls
- Price summary appears inline before the step actions
- Do not use a modal, side panel or horizontally scrolling package table
- Keep the on-screen keyboard from covering the active field or final action

## Accessibility requirements

- Every input has a persistent text label.
- Step names and current position are available to screen readers.
- All actions work by keyboard.
- Visible focus states meet contrast requirements.
- Touch targets are at least 44 × 44 pixels.
- Motion is not required to understand progression or price changes.
- Reduced-motion preferences are respected.
- Focus moves to the new step heading after successful progression.

## Data and consistency rules

- Package names, rates, capacity and active status come from the same source used by the Stay Options page and admin package management.
- Deactivated packages never appear in the inquiry flow.
- Changes to dates or guest count invalidate only selections that are no longer eligible.
- Form state is kept locally for the current session; Phase 1 does not store an inquiry in the backend.
- Do not claim real-time availability.
- Do not use `Book now`, `Reserve`, `Confirmed` or equivalent transactional language.

## Final flow

```text
Send Inquiry entry point
        ↓
/inquiry
        ↓
Step 1 — Dates
        ↓
Step 2 — Guests & Stay Option
        ↓
Step 3 — Your Details & Review
        ↓
Open prepared WhatsApp message
        ↓
Visitor taps Send in WhatsApp
        ↓
Host confirms availability and final details
```
