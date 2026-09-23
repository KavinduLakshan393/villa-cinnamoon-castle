# Villa Cinnamoon Castle — Document Register

## Purpose

This register defines the role, authority and current status of every project document. It prevents working notes, source material and superseded content from being mistaken for approved Phase 1 requirements.

## Design baseline status

- **Baseline ID:** `P1-DESIGN-2026-09-22`
- **Status:** **Ready for Low-Fidelity Design**
- **Internal reconciliation queue:** None
- **Launch readiness:** Pending the external Google and privacy/hosting inputs listed below

## Authority hierarchy

When two documents conflict, use the following order of precedence:

1. **Approved Decision Log** — the latest explicitly confirmed product and UX decisions
2. **SRS** — functional, technical, integration and non-functional requirements
3. **Page-specific Information Architecture documents** — the approved structure, content role and behaviour of an individual page or shared component
4. **Phase 1 Sitemap** — navigation, page relationships and route-level scope
5. **Package and property source documents** — factual business, property and pricing information
6. **Website Copy and Content Inventory** — public copy and media-selection guidance
7. **Original Requirements** — historical traceability only
8. **Sample HTML files** — design experiments only; never requirements or final visual designs

The most recent approved decision takes precedence over older text at the same level. Any conflict must be corrected in the affected documents rather than left unresolved.

## Language policy

- English documents are the implementation source unless a document is explicitly designated otherwise.
- Sinhala documents are maintained translations and must preserve the same meaning and scope.
- A translation must not silently introduce, remove or alter a requirement.
- After an authoritative English document changes, its Sinhala equivalent must be marked for synchronization until updated and checked.

## Status definitions

| Status | Meaning |
|---|---|
| **Active — authoritative** | Approved source that controls its defined subject area |
| **Active — supporting** | Current reference that supports an authoritative document |
| **Working** | Still being discussed or awaiting final confirmation |
| **Needs reconciliation** | Contains known outdated, duplicated or conflicting material |
| **Translation** | Language equivalent of another document; not an independent source of scope |
| **Historical** | Retained only for traceability and must not control implementation |
| **Sample** | Experimental visual or interaction reference only |

## Current document register

| Current document | Role | Status | Authority and notes |
|---|---|---|---|
| `README.md` | Phase 1 document index and design handoff entry point | **Active — baseline index** | Start here; identifies the reading order, locked design inputs, open design item and launch dependencies |
| `00 Document Control/Decision Log.md` | Approved decisions and open inputs | **Active — highest precedence** | Latest approved product and UX decisions override older conflicting text and must be propagated to affected documents |
| `00 Document Control/Document Register.md` | Document authority, status and reconciliation history | **Active — document control** | Defines precedence, translation policy, baseline state and change-control rules |
| `02 Requirements/SRS.md` | Complete Phase 1 software requirements | **Active — authoritative** | Version 1.3.0; reconciled to the approved Phase 1 booking, reviews, IA, bedroom-presentation and package-management boundaries |
| `05 Sinhala/SRS_Sinhala.md` | Sinhala translation of the SRS | **Translation — synchronized** | Version 1.3.0; synchronized with the reconciled English SRS |
| `01 Source Information/package_details.md` | Pricing, date classification and package rules | **Active — authoritative** | Version 1.0.1; controls business pricing facts while the SRS and Stay Options IA control Phase 1 presentation and implementation |
| `05 Sinhala/package_details_Sinhala.md` | Sinhala package reference | **Translation — synchronized** | Version 1.0.1; package codes and official rate set match the English source |
| `01 Source Information/property_details.md` | Property facts, amenities, contact information and source content | **Active — supporting** | Controls verified property facts; its web blueprint is aligned with SRS v1.3.0 and current IA |
| `05 Sinhala/property_details_Sinhala.md` | Sinhala property reference | **Translation — synchronized** | Property facts and implementation boundary are aligned with the English source and Sinhala SRS |
| `01 Source Information/Original Requirements.md` | Original client requirements | **Historical** | Traceability only; the current SRS and Decision Log take precedence |
| `03 Information Architecture/Phase 1 Sitemap.md` | Pages, routes, navigation and section relationships | **Active — authoritative** | Controls current route-level Information Architecture |
| `03 Information Architecture/Stay Options Page Information Architecture.md` | Stay Options page structure and working copy | **Active — authoritative** | Supersedes the older eight-section exploration in the Website Copy document; working copy refined under DEC-017 (2026-09-23) |
| `03 Information Architecture/Inquiry Flow UX Architecture.md` | Three-step inquiry behaviour and WhatsApp handoff | **Active — authoritative** | Controls the inquiry UX; must remain aligned with active package data |
| `03 Information Architecture/Gallery Page Information Architecture.md` | Gallery page structure and interactions | **Active — authoritative** | Updated under DEC-018 (2026-09-23) with the implemented strip motion and curated media set |
| `03 Information Architecture/Footer Information Architecture.md` | Global footer structure and verified destinations | **Active — authoritative** | Exact official Google destination is still required before launch |
| `03 Information Architecture/Privacy Page Information Architecture.md` | Privacy page structure, working copy and implementation policy | **Active — authoritative** | Requires final operational and legal review before publication |
| `04 Content/Phase 1 Website Copy.md` | Consolidated public-facing copy | **Active — supporting** | Reconciled to current page IA; page-specific IA documents remain authoritative for structure and interaction |
| `04 Content/Phase 1 Content Inventory.md` | Reviewed media and recommended shortlist | **Active — supporting** | Controls media-selection guidance, not final visual composition |

## External working artifacts

The files under `Sample components/` are **samples**, not approved designs. They may demonstrate typography, motion, layout or interaction ideas, but they do not override the SRS, sitemap, page IA documents or Decision Log.

## External launch dependency queue

1. Add the exact official Google Business Profile or Maps URL when supplied and verified.
2. Confirm hosting provider and technical-log retention before publishing the Privacy Notice.

## Completed reconciliation

- **2026-09-22 — SRS v1.3.0:** Removed legacy booking-management, date-blocking, direct-review and review-moderation implementation details from the active Phase 1 SRS; retained the complete pre-reconciliation English and Sinhala copies in `99 Archive`.
- Aligned the English and Sinhala SRS documents with the approved multi-page sitemap, dedicated Gallery, three-step inquiry flow, Google-Reviews-only rule, collective bedroom presentation and package-management-only admin scope.
- **2026-09-22 — Website Copy reconciliation:** Archived the superseded copy, removed the obsolete eight-section Stay Options exploration, replaced automatic Google Map embedding with a visitor-initiated directions action, and aligned all inquiry entry points to the canonical `/inquiry` page.
- **2026-09-22 — Cross-document consistency audit:** Reconciled English and Sinhala package/property sources with SRS v1.3.0, corrected the package admin requirement ID, removed stale single-page/gallery-modal blueprint language, confirmed Google-Reviews-only scope and canonical routes, and verified all local links and Markdown code fences.
- **2026-09-22 — Design baseline freeze:** Established baseline `P1-DESIGN-2026-09-22` and marked the reconciled document set ready for low-fidelity wireframing. Future scope or UX changes must follow the Decision Log and synchronization procedure.

- **2026-09-23 — Implementation copy refinement (DEC-016, DEC-017):**
  - Updated the Home Hero copy (changing headline phrase, eyebrow, loading intro and homepage closing inquiry heading) in `Phase 1 Website Copy.md`.
  - Refined the Stay Options working copy in `Stay Options Page Information Architecture.md`. Package rates, capacities, A/C rules and the four-section structure did not change.
  - Preserved both previous versions in `99 Archive` with the suffix `Pre-Copy-Refinement 2026-09-23`.
  - **Sinhala synchronization:** Not required. The Sinhala set contains only the SRS, package and property translations. None of them contain page-level copy, and the pricing facts did not change.

- **2026-09-23 — Gallery implementation (DEC-018):**
  - Updated `Gallery Page Information Architecture.md` with the text-only Hero, the implemented strip motion, the revised strip labels and lead images, and the curated set of 27 images with exclusions.
  - Preserved the previous version in `99 Archive` as `Gallery Page Information Architecture - Pre-Implementation 2026-09-23.md`.
  - **Sinhala synchronization:** Not required, because no Sinhala Gallery document exists.

- **2026-09-23 — Privacy implementation (DEC-019):**
  - Refined the public copy in `Privacy Page Information Architecture.md` and recorded the self-hosted-font requirement and the network-audit result.
  - Preserved the previous version in `99 Archive`.
  - **Sinhala synchronization:** Not required, because no Sinhala Privacy document exists.

## Document control rules

- Do not delete superseded material until it has been preserved in `99 Archive`.
- Do not put unresolved alternatives into an authoritative document without marking them as open decisions.
- Every approved scope change must first be recorded in the Decision Log and then propagated to affected documents.
- Page-specific working copy belongs with its page IA until approved; final public copy can then be consolidated into the Website Copy document.
- File moves must be followed by a full internal-link and path check.
