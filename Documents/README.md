# Villa Cinnamoon Castle — Phase 1 Document Index

## Current baseline

- **Baseline ID:** `P1-DESIGN-2026-09-22`
- **Status:** Ready for Low-Fidelity Design
- **Scope authority:** SRS v1.3.0, Decision Log and page-specific Information Architecture documents
- **Public product model:** Informational villa website with a three-step WhatsApp inquiry flow; not an online booking engine

This baseline means that the Phase 1 scope, sitemap, page structure, inquiry behaviour, package-management boundary and working public copy are sufficiently reconciled to begin wireframes. It does not mean that the website is ready for launch.

## Recommended reading order

1. [Decision Log](00%20Document%20Control/Decision%20Log.md) — approved decisions and unresolved inputs
2. [SRS v1.3.0](02%20Requirements/SRS.md) — functional, technical and non-functional requirements
3. [Phase 1 Sitemap](03%20Information%20Architecture/Phase%201%20Sitemap.md) — routes, navigation and page relationships
4. Page and component Information Architecture:
   - [Stay Options](03%20Information%20Architecture/Stay%20Options%20Page%20Information%20Architecture.md)
   - [Inquiry Flow](03%20Information%20Architecture/Inquiry%20Flow%20UX%20Architecture.md)
   - [Gallery](03%20Information%20Architecture/Gallery%20Page%20Information%20Architecture.md)
   - [Footer](03%20Information%20Architecture/Footer%20Information%20Architecture.md)
   - [Privacy](03%20Information%20Architecture/Privacy%20Page%20Information%20Architecture.md)
5. [Phase 1 Website Copy](04%20Content/Phase%201%20Website%20Copy.md) — current English public-copy baseline
6. [Phase 1 Content Inventory](04%20Content/Phase%201%20Content%20Inventory.md) — approved media-selection guidance
7. Business and property sources:
   - [Official Package & Pricing Catalog](01%20Source%20Information/package_details.md)
   - [Property Specifications](01%20Source%20Information/property_details.md)
   - [Original Requirements](01%20Source%20Information/Original%20Requirements.md) — historical traceability only
8. [Sinhala documents](05%20Sinhala/) — synchronized translations of the SRS, property and package sources
9. [Document Register](00%20Document%20Control/Document%20Register.md) — document authority, status and reconciliation history

## Locked design inputs

- Position the property as an affordable private villa for families and groups, serving local and international visitors.
- Use `Plan Your Stay` for the Hero entry action and `Send Inquiry` for the navbar, inquiry-section and final form actions.
- Use the canonical `/inquiry` page for the complete three-step form; do not duplicate it in a conventional modal.
- Present the five bedrooms as one collective sleeping experience. Do not label them publicly as `Bedroom 1` to `Bedroom 5`.
- Use a dedicated Gallery page with curated media; do not publish every supplied image or video.
- Display Google Reviews only in Phase 1. Do not build direct-review submission or moderation.
- Do not store inquiry/booking records, claim live availability, block dates or accept payment in Phase 1.
- Limit the admin portal to authentication and package management with soft deactivation.
- Load Google Maps only after a visitor chooses to open or activate it.
- Keep essential navigation, form, validation, legal and privacy information immediately visible; scroll-reveal is for eligible display text only.

## Open design item

- The final colour system is intentionally not locked. It will be explored and approved during visual design after low-fidelity wireframes.

## External launch dependencies

These items do not block wireframing, but they must be resolved before launch:

1. Exact verified Google Business Profile or Google Maps destination for directions and review actions
2. Hosting provider, technical-log behaviour and retention period
3. Final Privacy Notice publication date and privacy-request handling procedure

## Change control after this baseline

1. Record any proposed scope or UX change in the Decision Log.
2. Identify every affected authoritative and translated document.
3. Update the English source documents first.
4. Synchronize the Sinhala documents where applicable.
5. Re-run route, requirement-ID, package-data, local-link and Phase 1 boundary checks.
6. Preserve materially superseded content in `99 Archive` instead of deleting it.

## Archive policy

`99 Archive` contains pre-reconciliation snapshots. Archived material is retained for traceability and must not be used as an implementation or design source.

