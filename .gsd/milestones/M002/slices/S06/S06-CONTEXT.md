---
id: S06
milestone: M002
status: ready
---

# S06: Micro-interactions & Final Polish — Context

## Goal

Add polished hover/press states to all interactive elements site-wide, verify `prefers-reduced-motion` coverage across all animations from S01–S05, run a Lighthouse performance audit, and fix minor visual bugs found during the audit.

## Why this Slice

S06 depends on all prior slices (S01–S05) being complete. It's the final quality pass — the slice that turns individually working features into a cohesive, polished whole. It retires the "animation weight" risk from the proof strategy by proving build size and Lighthouse performance stay green.

## Scope

### In Scope

- **Hover/press state polish** on all interactive elements site-wide: cards, buttons, nav links, blog post cards, contact form inputs, CTA buttons, service page elements — everything clickable or tappable
- Style direction: polished but restrained (D016) — smooth transitions, subtle scale/glow, no magnetic cursor or tilt effects
- **`prefers-reduced-motion` audit:** verify every animation from S01–S05 is paused/hidden/reduced when reduced-motion is on — hero nodes, scroll reveals, metrics counters, pipeline connections, view transitions
- **Lighthouse performance audit:** run on built site, ensure Performance score stays green (90+); flag regressions but don't block milestone on edge-case scores
- **Build size check:** verify JS bundle hasn't ballooned from animation code
- **Small bug fixes:** fix minor visual inconsistencies, broken animations, or dark mode issues discovered during the audit of S01–S05 work (small scope only — no feature additions)
- `astro build` exits 0

### Out of Scope

- New features or homepage sections
- Content changes
- Major bug fixes that require rearchitecting prior slice work (those get a fix slice)
- Adding new animations — only polishing existing ones
- Mobile-specific redesign — just verify existing responsive behavior works

## Constraints

- CSS animations + vanilla JS only (D013)
- Polished but restrained micro-interaction style (D016) — no playful or gimmicky effects
- Tailwind CSS v4 CSS-first config (D001)
- Must work in both light and dark mode (D003)
- Must not break Calendly integration or Web3Forms contact form
- `astro build` must exit 0

## Integration Points

### Consumes

- All components and animations from S01–S05:
  - `src/components/HeroAnimation.astro` (S01)
  - `src/components/ScrollReveal.astro` (S02)
  - `src/components/MetricsCounter.astro` (S02)
  - `src/components/ResultsShowcase.astro` (S04)
  - `src/components/FeaturedPosts.astro` (S05)
  - View Transitions in `BaseLayout.astro` (S03)
  - Pipeline animation in `index.astro` (S05)
- All pages: index, services, about, contact, blog, blog/[slug]
- `src/styles/global.css` — existing animation keyframes and `prefers-reduced-motion` media query

### Produces

- Refined hover/press states across all interactive elements site-wide
- Complete `prefers-reduced-motion` media query coverage for all animations
- Lighthouse performance verification report
- Any small visual bug fixes from the cross-slice audit

## Open Questions

- Exact hover treatment per element type (cards vs buttons vs links) — decide during implementation; keep consistent family of effects (e.g. all cards get subtle lift, all buttons get glow/darken, all links get underline slide)
