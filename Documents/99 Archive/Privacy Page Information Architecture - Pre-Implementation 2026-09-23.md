# Villa Cinnamoon Castle — Phase 1 Privacy Page

## Status

This is the authoritative Phase 1 information architecture, implementation policy and working English copy for `/privacy`.

The notice is intentionally concise and specific to the website's actual Phase 1 behaviour. It must be reviewed again before launch if hosting, analytics, maps, form storage, payment collection or third-party integrations change.

This working document supports product design and is not a substitute for legal advice.

## Regulatory context

- Sri Lanka enacted the Personal Data Protection Act, No. 9 of 2022 and the Personal Data Protection (Amendment) Act, No. 22 of 2025.
- The Data Protection Authority lists Extraordinary Gazette No. 2498/16 of 22 July 2026. The announced operational date for key processing, controller and processor provisions is 1 January 2027.
- The notice should be written to transparent, data-minimising standards now rather than waiting for the operational date.

Official references:

- Data Protection Authority of Sri Lanka: `https://www.dpa.gov.lk/`
- DPA guidelines and legislation: `https://www.dpa.gov.lk/guidelines.php`
- Personal Data Protection Act, No. 9 of 2022: `https://www.documents.gov.lk/view/act/2022/3/09-2022_E.pdf`
- Personal Data Protection (Amendment) Act, No. 22 of 2025: `https://www.dpa.gov.lk/acts/22-2025_E_251104_201549.pdf`
- WhatsApp privacy policies: `https://www.whatsapp.com/legal/privacy-policies`
- Google Privacy Policy: `https://policies.google.com/privacy`

## Page objective

Explain, in plain language:

1. Which information the website uses
2. Why it is used
3. That Phase 1 does not store inquiries in a website backend
4. When information moves to WhatsApp or another third party
5. How long information is kept
6. How a visitor can ask a privacy question or request a correction or deletion

This is an information page, not a marketing page. It does not need a Hero image, animation, inquiry CTA or decorative content.

## Page structure

- Simple page title
- Last-updated date
- Short introduction
- Document headings within one readable article
- Contact route
- Link back to the website
- Global footer

The article headings below are not separate marketing sections.

---

# Working public copy

## Privacy Notice

**Last updated:** `[launch date]`

Villa Cinnamoon Castle respects your privacy. This notice explains what information is used when you browse the website or prepare a stay inquiry, why it is used and when it is shared with another service.

### Information you provide

When you prepare an inquiry, you may enter:

- Check-in and check-out dates
- Number of guests
- Selected stay option
- Full name
- WhatsApp number
- Any information you choose to add under special requests

Please provide only the information needed for your stay inquiry. Do not enter passport details, payment-card information, bank details or unnecessary medical information in the special-requests field.

### How we use this information

The information is used to:

- Show stay options and an estimated price
- Prepare your inquiry message
- Respond to your inquiry
- Confirm availability and arrange the stay with you
- Address any special requests you choose to provide

The website does not use inquiry details for unrelated advertising and does not sell personal information.

### Website inquiry storage

In Phase 1, the website does not save your inquiry in a backend booking database.

The website may temporarily keep your form progress in your browser for the current session so that moving between steps or returning to the form does not immediately clear valid information. This session data stays on your device and is not an online booking record.

### WhatsApp

When you select `Send Inquiry`, the website prepares a message and opens WhatsApp. You can review the message before choosing to send it.

Your inquiry reaches the host only after you tap Send in WhatsApp. From that point, WhatsApp processes the message under its own terms and privacy policies. The host uses the conversation to respond, confirm availability and arrange the stay.

Read the [WhatsApp privacy policies](https://www.whatsapp.com/legal/privacy-policies).

### Technical information

The website and its hosting provider may process limited technical information needed to deliver and protect the site, such as:

- Internet Protocol address
- Browser and device type
- Date and time of a request
- Pages or files requested
- Security and error logs

This information is used for website delivery, reliability and security. Phase 1 does not use advertising or behavioural-analytics cookies.

### Maps and external links

The website may link to Google Maps, Google Reviews, Airbnb, Facebook, Instagram and TikTok. When you choose one of these links, the external service may process information according to its own privacy policy.

The Phase 1 website should not automatically load an interactive Google Map before a visitor chooses to open it. If an embedded map or another tracking service is introduced later, this notice and any required consent controls must be updated before it is enabled.

Read the [Google Privacy Policy](https://policies.google.com/privacy).

### How long information is kept

Browser session data is kept only for the current session and can be removed by closing the relevant browser session or clearing website data.

After you send an inquiry through WhatsApp, the host keeps the conversation only for as long as reasonably needed to respond, arrange the stay, maintain required business or financial records, resolve a dispute or meet a legal obligation. Information that is no longer needed should be deleted or securely removed.

### Sharing and disclosure

Inquiry information may be available to:

- The Villa Cinnamoon Castle host handling the inquiry
- WhatsApp when you choose to send the prepared message
- Website-hosting or technical service providers processing limited data to deliver and secure the website
- A public authority where disclosure is required by applicable law

Personal information is not sold.

### Your choices and requests

Depending on applicable law, you may ask to:

- Receive information about personal data held about you
- Correct inaccurate information
- Request deletion where the information is no longer required
- Withdraw a request or object to certain uses where applicable

Some information may need to be retained where required for business records, legal obligations or dispute resolution.

### Contact

For a privacy question or request, contact Villa Cinnamoon Castle on WhatsApp:

> +94 76 100 7686

> `https://wa.me/94761007686`

You may also visit the [Data Protection Authority of Sri Lanka](https://www.dpa.gov.lk/) for information about data-protection rights and applicable procedures.

### Changes to this notice

This notice may be updated if the website's features, service providers or data practices change. The latest version and its update date will be published on this page.

---

## UX and content rules

- Use a comfortable reading width of approximately 65–75 characters.
- Keep the article left-aligned.
- Use visible headings and a logical heading hierarchy.
- Provide a compact in-page contents list only if the final copy becomes materially longer.
- Do not use scroll-reveal animation; legal and privacy information must appear immediately.
- Do not use accordions to hide the main notice.
- External-policy links must be clearly identifiable and keyboard accessible.
- Keep `Last updated` visible near the title.
- Do not add a consent checkbox to the Privacy page itself.
- The mandatory inquiry consent remains in Step 3 of the inquiry flow.
- Do not make claims such as `100% secure`, `fully GDPR compliant` or `we never collect data`.
- Do not list cookies or analytics that are not actually used.
- Reassess the notice before launch and whenever site behaviour changes.

## Phase 1 implementation requirements

- No backend inquiry storage.
- No advertising cookies.
- No behavioural analytics in the initial release unless separately approved, documented and implemented with any required consent.
- Preserve inquiry progress with session-scoped browser storage only.
- Prefer an external `Open in Google Maps` action or a user-initiated map load instead of an automatically loaded third-party iframe.
- Do not collect payment-card, bank-account or passport information through the website.
- Keep the Privacy link in the global footer and the inquiry consent copy.
- Record the actual hosting provider and verify its logging/retention behaviour before final launch review.

## Decisions required before launch

1. Insert the real publication date under `Last updated`.
2. Confirm the production hosting provider and its technical-log retention.
3. Confirm whether the host uses standard WhatsApp or WhatsApp Business and review the matching policy link.
4. Confirm an operational process for responding to access, correction and deletion requests received on WhatsApp.
5. Re-review the notice if analytics, cookies, embedded maps, payment collection or backend storage are added.
