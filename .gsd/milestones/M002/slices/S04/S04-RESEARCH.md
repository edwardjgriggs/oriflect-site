# S04: Social Proof & Results Showcase — Research

**Date:** 2026-03-14

## Summary

S04 adds two new homepage sections: a **ResultsShowcase** (before/after client results cards) and a **Testimonials** (rotating quotes). Both use the existing `ScrollReveal` wrapper from S02 for entrance animations. The current homepage flows Hero → Service Pipeline → Metrics → Why Oriflect → CTA. Per the boundary map, the new sections insert between "Why Oriflect" and the CTA section. S05 will later reorder everything into the final sequence.

No new dependencies are needed. The ScrollReveal component is simple and well-documented (direction/delay props, `data-reveal` attribute, shared IntersectionObserver). The testimonial rotation can be pure CSS or minimal vanilla JS — no animation library needed. Results cards can use CSS transforms for before/after reveal effects.

This slice owns **R009** (Social proof & client results showcase). Content will be representative/illustrative since no real client data has been provided.

## Recommendation

Build two Astro components with zero external dependencies:

1. **`ResultsShowcase.astro`** — 2-3 cards showing before/after metrics (e.g., "Manual reporting: 8 hours/week → Automated: 45 minutes/week"). Use CSS grid, staggered ScrollReveal delays, and a simple visual treatment (left side muted, right side highlighted with ember/gold accent).

2. **`Testimonials.astro`** — 3 rotating testimonial quotes with auto-advance via `setInterval` + CSS transitions. Include manual dot navigation. Use `astro:after-swap` to re-init the interval for view transition compatibility (matching S02's pattern).

Both sections get wrapped in ScrollReveal for entrance animation. Testimonial rotation is a separate concern (runs after the section is visible).

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---------|------------------|------------|
| Scroll entrance animation | `ScrollReveal.astro` from S02 | Already built, tested, view-transition compatible |
| Intersection observation | S02's shared observer pattern | Consistent with established pattern |

## Existing Code and Patterns

- `src/components/ScrollReveal.astro` — wrap any section with `<ScrollReveal direction="up" delay={N}>` for entrance animation. Already handles `astro:after-swap`.
- `src/pages/index.astro` — current section order: Hero → Pipeline → Metrics → Why Oriflect → CTA. New sections go between Why Oriflect and CTA.
- `src/styles/global.css` — brand colors available: `sapphire`, `gold`, `ember`, `charcoal`, `ivory`, dark mode variants. Scroll-reveal CSS classes already defined. `prefers-reduced-motion` rule already disables transitions.
- Card pattern in index.astro — `bg-white dark:bg-dark-surface rounded-xl p-8 shadow-md` is the established card style.

## Constraints

- No JS animation libraries — vanilla JS + CSS only (D001 spirit, M002 context "start vanilla")
- Must work in both light and dark mode with existing color tokens
- `prefers-reduced-motion` must be respected — S02's global CSS rule handles ScrollReveal; testimonial auto-rotation should also pause under reduced-motion
- Testimonial rotation script must re-init on `astro:after-swap` (view transitions from S03)
- Representative content only — no real client names/data provided; use realistic but clearly illustrative examples
- `astro build` must exit 0

## Common Pitfalls

- **Testimonial timer not cleaned up** — `setInterval` must be cleared on `astro:before-swap` to prevent memory leaks during view transitions. Add cleanup listener.
- **Reduced-motion forgetting rotation** — the CSS scroll-reveal rule covers entrance animation but the JS rotation interval should also be paused/disabled when `prefers-reduced-motion: reduce` is active.
- **Card height inconsistency** — before/after cards with varying content lengths need `h-full` or equal-height grid to avoid ragged layout.

## Open Risks

- Content quality — illustrative results data may look generic. Mitigate by making numbers specific and scenarios realistic for SMB AI consulting.
- S05 will reorder sections — the exact placement now doesn't need to be final, but the components must be modular enough to move.

## Skills Discovered

| Technology | Skill | Status |
|------------|-------|--------|
| Astro | frontend-design | installed (available_skills) |

No additional skills needed — this is straightforward Astro component work with CSS/vanilla JS.

## Sources

- S02 summary and ScrollReveal source code (codebase)
- M002 roadmap boundary map (project docs)
