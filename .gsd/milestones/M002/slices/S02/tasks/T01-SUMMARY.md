---
id: T01
parent: S02
milestone: M002
provides:
  - ScrollReveal.astro reusable wrapper component (boundary contract for S04, S05, S06)
  - MetricsCounter.astro animated counter component
  - Scroll-reveal CSS with reduced-motion and no-JS fallbacks
  - Metrics section on homepage
  - All 5 pages wrapped with ScrollReveal
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
  - Single shared IntersectionObserver per component type (scroll-reveal and counter each have one observer)
  - astro:after-swap listener for Astro view transition compatibility
  - noscript style block on each page for no-JS fallback rather than .no-js class approach
patterns_established:
  - ScrollReveal wrapper pattern with direction/delay props for downstream slices
  - IntersectionObserver + rAF pattern for animated counters
observability_surfaces:
  - "[data-reveal]" DOM attribute on all scroll-reveal wrappers; ".revealed" class on intersection
  - "[data-count-to]" attribute on counter spans; final textContent matches target
  - prefers-reduced-motion media query disables transitions and forces visibility
duration: ~20min
verification_result: passed
completed_at: 2026-03-14T16:36:00-04:00
blocker_discovered: false
---

# T01: Build ScrollReveal & MetricsCounter components and apply across all pages

**Created ScrollReveal and MetricsCounter components, added scroll-reveal CSS with reduced-motion/no-JS fallbacks, added metrics section to homepage, and wrapped all 5 page files with scroll-reveal animations.**

## What Happened

1. Created `ScrollReveal.astro` — slot-based wrapper with `direction` (up/left/right) and `delay` props. Uses single shared IntersectionObserver (threshold 0.1) that adds `.revealed` class and unobserves. Includes `astro:after-swap` listener for view transitions.
2. Added scroll-reveal CSS to `global.css` — base `.scroll-reveal` class (opacity:0, translateY/X variants), `.revealed` state (opacity:1, transform:none), `prefers-reduced-motion` rule (transition:none, opacity:1), and no-JS fallback rule.
3. Created `MetricsCounter.astro` — accepts value/suffix/label props, renders `data-count-to` span. Inline script uses IntersectionObserver + rAF with ease-out-quart to count from 0 to target over 2 seconds.
4. Added metrics section to `index.astro` between Service Pipeline and Why Oriflect — 4 metrics (50+ Audits, 3x ROI, 85% Time Saved, 100% Satisfaction) with staggered delays.
5. Wrapped sections on all 5 pages with ScrollReveal. Skipped hero on homepage. Used staggered delays for card grids.
6. Fixed pre-existing merge conflict in `about.astro` (kept the ring-2 ring-gold variant from HEAD).
7. Added `<noscript>` style blocks on each page for no-JS fallback.

## Verification

- `npx astro build` → exits 0 ✅
- `grep -r "ScrollReveal" src/pages/` → shows usage in all 5 page files (index, about, services, contact, blog) ✅
- `grep "MetricsCounter" src/pages/index.astro` → shows 4 counter instances ✅
- `grep "prefers-reduced-motion" src/styles/global.css` → includes transition disable rule ✅
- `ls src/components/ScrollReveal.astro src/components/MetricsCounter.astro` → both exist ✅

### Slice-level verification (all pass — this is the only task in S02):
- `npx astro build` exits 0 ✅
- ScrollReveal usage on all pages ✅
- MetricsCounter in index.astro ✅
- prefers-reduced-motion in global.css ✅
- scroll-reveal in ScrollReveal.astro ✅

## Diagnostics

- `document.querySelectorAll('[data-reveal]:not(.revealed)').length` — shows unrevealed elements
- `document.querySelectorAll('[data-count-to]')` — lists all counter elements
- DevTools Rendering → Emulate prefers-reduced-motion: reduce → all elements immediately visible
- Disable JS → noscript style forces all scroll-reveal elements visible
