---
phase: 03-conversion-mechanisms
plan: 02
subsystem: ui
tags: [calendly, cta, navigation, conversion]

requires:
  - phase: 03-01
    provides: Contact page with form and Calendly embed, global openCalendly() function in BaseLayout
provides:
  - All 9 CTA buttons sitewide wired to Calendly popup via openCalendly()
  - Contact nav link in header (desktop + mobile) and footer
  - Complete conversion flow from any page
affects: [04-blog-content, 05-seo-launch]

tech-stack:
  added: []
  patterns:
    - "onclick='openCalendly(); return false;' pattern on all CTA anchor tags"
    - "href=#book kept as no-JS fallback alongside onclick handler"

key-files:
  created: []
  modified:
    - src/components/Header.astro
    - src/components/Footer.astro
    - src/pages/index.astro
    - src/pages/services.astro
    - src/pages/about.astro

key-decisions:
  - "Kept href=#book as no-JS fallback on all CTA buttons alongside onclick handler"

patterns-established:
  - "CTA conversion pattern: add onclick='openCalendly(); return false;' to existing anchor tags without changing other attributes"

requirements-completed: [CONT-02]

duration: 2min
completed: 2026-03-09
---

# Phase 3 Plan 02: CTA Wiring and Contact Nav Links Summary

**All 9 sitewide CTA buttons wired to Calendly popup with Contact added to header and footer navigation**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-09T20:01:00Z
- **Completed:** 2026-03-09T20:03:00Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Wired all 9 existing "Book a Discovery Call" CTA buttons across Header, homepage, services, and about pages to trigger Calendly popup
- Added "Contact" navigation link to desktop nav, mobile menu, and footer
- Maintained href="#book" as no-JS fallback on all CTA buttons
- Complete conversion flow verified: visitors can book calls from any page via CTA or navigate to contact page

## Task Commits

Each task was committed atomically:

1. **Task 1: Add Contact nav links and convert all CTAs to Calendly popup** - `28ec1eb` (feat)
2. **Task 2: Verify complete conversion flow** - checkpoint:human-verify (approved)

## Files Created/Modified
- `src/components/Header.astro` - Added Contact nav link (desktop + mobile), onclick handler on both CTA buttons
- `src/components/Footer.astro` - Added Contact link in footer
- `src/pages/index.astro` - Added onclick handler on hero and bottom CTA buttons
- `src/pages/services.astro` - Added onclick handler on all 4 service CTA buttons
- `src/pages/about.astro` - Added onclick handler on bottom CTA button

## Decisions Made
- Kept href="#book" as no-JS fallback on all CTA buttons alongside the onclick handler, ensuring graceful degradation

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Full conversion mechanism complete: contact page + form + Calendly embed + all CTAs wired
- Ready for Phase 4 (Blog Content) and Phase 5 (SEO & Launch)
- Calendly placeholder URL should be replaced with real account URL before launch

---
*Phase: 03-conversion-mechanisms*
*Completed: 2026-03-09*
