# S02: Scroll Reveal & Metrics Animations

**Goal:** All pages have scroll-reveal animations on content sections; homepage has an animated metrics counter section.
**Demo:** Scrolling any page reveals sections with fade-up animation; homepage metrics numbers count up from 0 when scrolled into view; `prefers-reduced-motion` disables transitions.

## Must-Haves

- `ScrollReveal.astro` wrapper component using Intersection Observer (single shared observer, not per-instance)
- `MetricsCounter.astro` component with animated count-up (value, suffix, label props)
- Scroll-reveal applied to all section-level content across homepage, about, services, contact, blog pages
- Metrics section on homepage between Service Pipeline and Why Oriflect
- `prefers-reduced-motion` disables scroll-reveal transitions (not just pauses keyframe animations)
- No-JS fallback: elements visible if JS doesn't load
- `astro build` exits 0

## Verification

- `npx astro build` exits 0
- `grep -r "ScrollReveal" src/pages/` shows usage on all pages
- `grep -r "MetricsCounter" src/pages/index.astro` shows metrics section
- `grep "prefers-reduced-motion" src/styles/global.css` shows transition disable rule
- `grep -l "scroll-reveal" src/components/ScrollReveal.astro` confirms component exists

## Observability / Diagnostics

- **Scroll reveal visibility:** In browser DevTools, elements with `[data-reveal]` start with `.scroll-reveal` (opacity:0). On scroll intersection, `.revealed` class is added — inspect via `document.querySelectorAll('[data-reveal]:not(.revealed)')` to see unrevealed elements.
- **Counter animation:** `document.querySelectorAll('[data-count-to]')` lists all counter elements. Final text content should match `data-count-to` attribute value after animation completes.
- **Reduced motion:** Toggle `prefers-reduced-motion: reduce` in DevTools → Rendering panel. All scroll-reveal elements should be immediately visible with no transition.
- **No-JS fallback:** Disable JavaScript in DevTools; `<noscript>` style block forces `opacity:1` and `transform:none` on `.scroll-reveal` elements.
- **Failure visibility:** If IntersectionObserver is unavailable (very old browsers), elements remain at opacity:0. The `<noscript>` fallback and reduced-motion rules provide graceful degradation.
- **Build verification:** `npx astro build` exit code 0 confirms no template or import errors.

## Tasks

- [x] **T01: Build ScrollReveal & MetricsCounter components and apply across all pages** `est:45m`
  - Why: This is the entire slice — two components plus wiring them into pages. Small enough for one task.
  - Files: `src/components/ScrollReveal.astro`, `src/components/MetricsCounter.astro`, `src/styles/global.css`, `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/services.astro`, `src/pages/contact.astro`, `src/pages/blog.astro`
  - Do: (1) Create ScrollReveal.astro with slot wrapper, data-attributes for direction/delay, inline script using single IntersectionObserver with `threshold: 0.1`, adds `.revealed` class on intersect with `once: true`. (2) Add scroll-reveal CSS classes in global.css (opacity:0 → 1, translateY transition) plus prefers-reduced-motion rule that sets transition:none and opacity:1 by default. (3) Add no-JS fallback via `<noscript><style>` that makes elements visible. (4) Create MetricsCounter.astro accepting value/suffix/label props, uses rAF counting animation triggered by IntersectionObserver. (5) Add metrics section to index.astro between Service Pipeline and Why Oriflect with 3-4 metrics. (6) Wrap existing sections on all pages with ScrollReveal (skip hero section on homepage).
  - Verify: `npx astro build` exits 0; grep confirms components used on all pages
  - Done when: All pages have scroll-reveal sections, homepage has counting metrics, reduced-motion disables transitions, build passes

## Files Likely Touched

- `src/components/ScrollReveal.astro`
- `src/components/MetricsCounter.astro`
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/services.astro`
- `src/pages/contact.astro`
- `src/pages/blog.astro`
