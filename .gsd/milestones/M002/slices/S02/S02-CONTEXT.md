---
id: S02
milestone: M002
status: ready
---

# S02: Scroll Reveal & Metrics Animations — Context

## Goal

Add fade-up scroll-reveal animations to all content sections site-wide and a new animated metrics counter section on the homepage.

## Why this Slice

Scroll-reveal is the foundational animation pattern consumed by S04 (results showcase), S05 (pipeline & blog), and S06 (polish). The reusable ScrollReveal wrapper and CSS classes this slice produces are the most depended-upon artifacts in M002. The metrics section adds the first new homepage content block, establishing the pattern for subsequent homepage additions.

## Scope

### In Scope

- Fade-up scroll-reveal animation (fade in + ~20px upward slide) on all `<section>` elements across all pages (index, services, about, contact, blog)
- Hero/banner sections at the top of each page excluded from scroll-reveal (already visible on load — only below-the-fold sections animate)
- Reusable `ScrollReveal.astro` wrapper component (or equivalent JS utility) using Intersection Observer
- Reusable scroll-reveal CSS classes that downstream slices can apply to any element
- New metrics counter section on the homepage, positioned between the service pipeline cards and the "Why Oriflect" section
- Hardcoded plausible showcase metrics (agent picks impressive numbers like "50+ clients", "3x ROI", etc.)
- Counters animate (count up) once when first scrolled into view, then stay at final value permanently
- `prefers-reduced-motion`: scroll-reveal shows content immediately without animation; counters show final numbers without counting
- Works in both light and dark mode

### Out of Scope

- Hero animation (S01)
- Varied reveal directions (slide-from-left, slide-from-right) — fade-up only for now
- Re-triggering counters on re-scroll
- Social proof / results content (S04)
- Service pipeline animation (S05)
- Blog post content changes
- Any new pages

## Constraints

- CSS animations + vanilla JS Intersection Observer only (D013)
- Tailwind CSS v4 CSS-first config (D001)
- Must work in both light and dark mode (D003)
- Must not break existing Calendly integration or Web3Forms contact form
- `astro build` must exit 0

## Integration Points

### Consumes

- `src/pages/index.astro` — existing homepage sections (add scroll-reveal + insert new metrics section)
- `src/pages/services.astro`, `about.astro`, `contact.astro`, `blog.astro` — add scroll-reveal to their sections
- `src/styles/global.css` — brand color tokens from `@theme` block

### Produces

- `src/components/ScrollReveal.astro` (or equivalent JS utility) — reusable scroll-triggered animation wrapper using Intersection Observer
- `src/components/MetricsCounter.astro` — animated counting number component
- Scroll-reveal CSS classes in `global.css` or component styles — applicable to any section by downstream slices (S04, S05, S06)

## Open Questions

- Exact trigger threshold for Intersection Observer (e.g. 10% visible vs 20%) — tune during implementation for best feel
- Stagger delay between multiple sections visible at once — decide during implementation whether sections that are all in viewport on load should stagger or appear together
