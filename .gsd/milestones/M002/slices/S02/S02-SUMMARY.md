---
id: S02
parent: M002
milestone: M002
provides:
  - ScrollReveal.astro reusable wrapper component (boundary contract for S04, S05, S06)
  - MetricsCounter.astro animated counter component
  - Scroll-reveal CSS with prefers-reduced-motion and no-JS fallbacks
  - Metrics section on homepage (4 counters between Service Pipeline and Why Oriflect)
  - All 5 pages wrapped with ScrollReveal
requires: []
affects:
  - S04
  - S05
  - S06
key_files:
  - src/components/ScrollReveal.astro
  - src/components/MetricsCounter.astro
  - src/styles/global.css
  - src/pages/index.astro
  - src/pages/about.astro
  - src/pages/services.astro
  - src/pages/contact.astro
  - src/pages/blog.astro
key_decisions:
  - Single shared IntersectionObserver per component type (not per-instance) for performance
  - astro:after-swap listener for view transition compatibility (forward-compatible with S03)
  - noscript style block per page for no-JS fallback rather than .no-js class approach
  - Metrics values: 50+ Audits, 3x ROI, 85% Time Saved, 100% Satisfaction
patterns_established:
  - ScrollReveal wrapper with direction/delay props — downstream slices wrap new sections the same way
  - IntersectionObserver + rAF pattern for animated counters
observability_surfaces:
  - "[data-reveal]" DOM attribute on scroll-reveal wrappers; ".revealed" class added on intersection
  - "[data-count-to]" attribute on counter spans; final textContent matches target value
  - prefers-reduced-motion media query disables transitions and forces opacity:1
drill_down_paths:
  - .gsd/milestones/M002/slices/S02/tasks/T01-SUMMARY.md
duration: ~20min
verification_result: passed
completed_at: 2026-03-14T16:38:00-04:00
---

# S02: Scroll Reveal & Metrics Animations

**Created ScrollReveal and MetricsCounter components with full accessibility fallbacks, added animated metrics section to homepage, and applied scroll-reveal animations across all 5 pages.**

## What Happened

1. Created `ScrollReveal.astro` — slot-based wrapper accepting `direction` (up/left/right) and `delay` props. Uses a single shared IntersectionObserver (threshold 0.1) that adds `.revealed` class and unobserves. Includes `astro:after-swap` listener for future view transition support.
2. Added scroll-reveal CSS to `global.css` — `.scroll-reveal` base (opacity:0, translateY/X), `.revealed` transition (opacity:1, transform:none), `prefers-reduced-motion` rule (transition:none, opacity:1), and no-JS fallback.
3. Created `MetricsCounter.astro` — accepts value/suffix/label props, uses IntersectionObserver + rAF with ease-out-quart to count from 0 to target over 2 seconds.
4. Added metrics section to `index.astro` with 4 counters (50+ Audits, 3x ROI, 85% Time Saved, 100% Satisfaction) with staggered delays.
5. Wrapped sections on all 5 pages with ScrollReveal (hero section on homepage intentionally excluded).
6. Fixed pre-existing merge conflict in `about.astro`.
7. Added `<noscript>` style blocks on each page for no-JS fallback.

## Verification

- `npx astro build` → exits 0 ✅
- `grep -r "ScrollReveal" src/pages/` → all 5 pages ✅
- `grep "MetricsCounter" src/pages/index.astro` → 4 counter instances ✅
- `grep "prefers-reduced-motion" src/styles/global.css` → transition disable rule ✅
- Both component files exist ✅

## Requirements Advanced

- R003 (Visual design polish) — scroll-reveal animations add dynamic feel across all pages; metrics section adds social proof numbers

## Requirements Validated

- none

## New Requirements Surfaced

- none

## Requirements Invalidated or Re-scoped

- none

## Deviations

- Fixed a pre-existing merge conflict in about.astro (kept ring-2 ring-gold variant). Not a plan deviation, just cleanup.

## Known Limitations

- Counter animation uses simple rAF loop; very large numbers (10,000+) would need formatting with commas
- No scroll-reveal on blog post individual pages (only the blog listing page) — those pages don't exist as static routes yet

## Follow-ups

- none

## Files Created/Modified

- `src/components/ScrollReveal.astro` — created, reusable scroll-reveal wrapper
- `src/components/MetricsCounter.astro` — created, animated counting number component
- `src/styles/global.css` — added scroll-reveal classes, reduced-motion rule, no-JS fallback
- `src/pages/index.astro` — added metrics section, wrapped sections with ScrollReveal
- `src/pages/about.astro` — wrapped sections with ScrollReveal, fixed merge conflict
- `src/pages/services.astro` — wrapped sections with ScrollReveal
- `src/pages/contact.astro` — wrapped sections with ScrollReveal
- `src/pages/blog.astro` — wrapped sections with ScrollReveal

## Forward Intelligence

### What the next slice should know
- ScrollReveal accepts `direction` ("up"|"left"|"right") and `delay` (ms number) props — just wrap any section with `<ScrollReveal>` to get fade-up animation
- The IntersectionObserver script re-initializes on `astro:after-swap` so it's already compatible with View Transitions (S03)

### What's fragile
- The noscript style blocks are duplicated on each page — if the CSS class name `.scroll-reveal` changes, all pages need updating

### Authoritative diagnostics
- `document.querySelectorAll('[data-reveal]:not(.revealed)')` — shows elements not yet revealed; should be empty after full scroll
- DevTools Rendering → Emulate prefers-reduced-motion: reduce → all elements immediately visible with no transition

### What assumptions changed
- none — slice executed as planned
