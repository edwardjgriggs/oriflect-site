# S02: Scroll Reveal & Metrics Animations — UAT

**Milestone:** M002
**Written:** 2026-03-14

## UAT Type

- UAT mode: mixed (artifact-driven build check + live-runtime browser verification)
- Why this mode is sufficient: Scroll-reveal and counter animations require visual browser confirmation; build and grep checks verify structural correctness

## Preconditions

- `npm install` completed in `test/` directory
- Dev server running: `npx astro dev` from `test/`
- Modern browser with DevTools available

## Smoke Test

Open `http://localhost:4321` and scroll down. Sections should fade into view as you scroll. The metrics section should show numbers counting up from 0.

## Test Cases

### 1. Scroll-reveal on homepage

1. Open `http://localhost:4321`
2. Note the hero section is immediately visible (no scroll-reveal)
3. Scroll down slowly
4. **Expected:** Each section below the hero fades up into view as it enters the viewport. Service cards appear with staggered delays.

### 2. Metrics counter animation

1. On the homepage, scroll to the metrics section (between Service Pipeline and Why Oriflect)
2. Watch the numbers as the section enters the viewport
3. **Expected:** Four counters animate from 0 to their target values: "50+", "3x", "85%", "100%". Animation takes ~2 seconds with ease-out feel.

### 3. Scroll-reveal on About page

1. Navigate to `/about`
2. Scroll down through all sections
3. **Expected:** Mission section, bio section, and values cards all fade in on scroll with staggered delays on the value cards.

### 4. Scroll-reveal on Services page

1. Navigate to `/services`
2. Scroll through all sections
3. **Expected:** All service sections fade in on scroll.

### 5. Scroll-reveal on Contact page

1. Navigate to `/contact`
2. Scroll through the page
3. **Expected:** Contact form and info sections fade in on scroll.

### 6. Scroll-reveal on Blog page

1. Navigate to `/blog`
2. Scroll through the page
3. **Expected:** Blog listing section fades in on scroll.

## Edge Cases

### Prefers-reduced-motion

1. Open DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`
2. Reload the homepage and scroll through
3. **Expected:** All sections are immediately visible with no animation or transition. Metrics counters should still show final values. No fade-in, no slide-in.

### No-JavaScript fallback

1. Open DevTools → Settings → Disable JavaScript
2. Reload the homepage
3. **Expected:** All sections are visible (opacity:1, no transform). Page is fully readable. Metrics show their target numbers as static text.

### Fast scroll

1. Re-enable JS. Scroll very quickly from top to bottom of homepage
2. **Expected:** All sections reveal correctly; no elements stuck at opacity:0. Counter animation may be partially visible but should complete.

### Page reload mid-scroll

1. Scroll halfway down the homepage
2. Reload the page
3. **Expected:** Sections above the fold are immediately visible (IntersectionObserver fires on already-visible elements). Sections below fold reveal on scroll.

## Failure Signals

- Any section permanently stuck at opacity:0 (invisible)
- Metrics showing "0" or "NaN" instead of target values after scrolling past
- Console errors related to IntersectionObserver
- Sections visibly "jumping" instead of smooth transition
- Build failure (`npx astro build` non-zero exit)

## Requirements Proved By This UAT

- R003 (Visual design polish) — partially proved; scroll-reveal animations add dynamic feel to all pages

## Not Proven By This UAT

- R003 full validation requires all M002 slices (hover states, view transitions, etc.)
- Mobile performance of scroll-reveal animations (not tested here)
- Exact metric values representing real business data (placeholder values used)

## Notes for Tester

- The metrics values (50+ Audits, 3x ROI, etc.) are illustrative — focus on whether the counting animation works, not the specific numbers.
- The `astro:after-swap` listener for view transitions won't activate until S03 adds View Transitions. It's present but dormant.
- Blog individual post pages (`/blog/[slug]`) don't have scroll-reveal since they're dynamic content pages managed by content collections.
