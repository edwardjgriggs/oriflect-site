---
id: S05
parent: M002
milestone: M002
provides:
  - Pipeline arrow CSS pulse animation with prefers-reduced-motion guard
  - FeaturedPosts.astro component (handles 0, 1, and 3 posts)
  - Homepage section reorder to target sequence
requires:
  - slice: S02
    provides: ScrollReveal wrapper for entrance animations
  - slice: S04
    provides: Results and Testimonials sections on homepage
affects:
  - S06
key_files:
  - src/styles/global.css
  - src/components/FeaturedPosts.astro
  - src/pages/index.astro
key_decisions:
  - "D013: CSS-only pipeline-pulse keyframe (opacity 0.4→1→0.4, 2s infinite) — no JS needed"
  - "D014: Homepage order — hero → pipeline → metrics → results → testimonials → why oriflect → blog → CTA"
patterns_established:
  - Blog collection fetch in homepage frontmatter (reused from blog.astro pattern)
observability_surfaces:
  - DevTools Animations panel shows pipeline-pulse on .pipeline-arrow-pulse elements
  - prefers-reduced-motion toggle in DevTools Rendering disables pipeline animation
  - FeaturedPosts conditional render — no DOM node when 0 posts
drill_down_paths:
  - .gsd/milestones/M002/slices/S05/tasks/T01-SUMMARY.md
duration: 8m
verification_result: passed
completed_at: 2026-03-14
---

# S05: Service Pipeline & Blog Feature

**Added pulsing CSS animation to pipeline arrows, created FeaturedPosts blog card grid, and reordered homepage sections to final target sequence.**

## What Happened

Single task slice. Added `@keyframes pipeline-pulse` and `.pipeline-arrow-pulse` class to `global.css` with a `prefers-reduced-motion` guard. Applied the class to both arrow `<div>` elements between service cards in `index.astro`. Created `FeaturedPosts.astro` — a responsive card grid that accepts a `posts` prop, renders up to 3 blog post cards (title, date, description, read-more link), handles 0 posts by rendering nothing, and centers a single post. Updated homepage section order and wired FeaturedPosts wrapped in ScrollReveal between Why Oriflect and the final CTA.

## Verification

| Check | Result |
|-------|--------|
| `npx astro build` exits 0 | ✅ |
| `pipeline-arrow-pulse` in index.astro + global.css | ✅ |
| `prefers-reduced-motion` in global.css covers pipeline | ✅ |
| `FeaturedPosts.astro` exists | ✅ |
| `FeaturedPosts` imported and used in index.astro | ✅ |
| Section order: pipeline → metrics → results → testimonials → why oriflect → blog → CTA | ✅ |
| No build errors | ✅ |

## Requirements Advanced

- R003 (Visual design polish) — Pipeline animation and blog feature add visual richness to homepage

## Requirements Validated

- none

## New Requirements Surfaced

- none

## Requirements Invalidated or Re-scoped

- none

## Deviations

None.

## Known Limitations

- FeaturedPosts only shows if blog posts exist in the content collection. Currently only one post exists.
- Pipeline animation is CSS-only opacity pulse — no traveling dot or SVG path animation.

## Follow-ups

- S06 will audit all animations including pipeline-pulse for reduced-motion coverage and performance.

## Files Created/Modified

- `src/styles/global.css` — Added `pipeline-pulse` keyframe and `.pipeline-arrow-pulse` class with reduced-motion guard
- `src/components/FeaturedPosts.astro` — New component: responsive blog post card grid
- `src/pages/index.astro` — Applied animation classes, imported FeaturedPosts, reordered sections

## Forward Intelligence

### What the next slice should know
- All homepage sections are now in final order. S06 should audit the full page flow top-to-bottom.
- The `.pipeline-arrow-pulse` reduced-motion guard is at line ~223 in global.css inside the existing `@media (prefers-reduced-motion: reduce)` block.

### What's fragile
- FeaturedPosts assumes `posts` is a sorted array from `getCollection('blog')` — if collection schema changes, the component will break silently (no TypeScript prop validation).

### Authoritative diagnostics
- `grep -n "pipeline-pulse\|pipeline-arrow-pulse" src/styles/global.css src/pages/index.astro` — confirms animation wiring
- `npx astro build` — catches any import or template errors

### What assumptions changed
- None — slice executed as planned.
