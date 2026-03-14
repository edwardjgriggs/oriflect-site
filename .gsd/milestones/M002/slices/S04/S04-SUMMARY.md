---
id: S04
parent: M002
milestone: M002
provides:
  - ResultsShowcase component with 3 before/after AI consulting metrics cards
  - Testimonials component with auto-rotating quotes, dot navigation, reduced-motion and view-transition guards
  - Homepage integration of both sections between Why Oriflect and CTA
requires:
  - slice: S02
    provides: ScrollReveal wrapper for entrance animations
affects:
  - S05
key_files:
  - src/components/ResultsShowcase.astro
  - src/components/Testimonials.astro
  - src/pages/index.astro
key_decisions:
  - Testimonials uses CSS opacity transitions (not JS animation) for slide changes — simpler, respects reduced-motion
  - ResultsShowcase cards use data-driven map over array rather than hand-coded cards
patterns_established:
  - "Testimonial auto-rotation: setInterval + astro:before-swap cleanup + astro:page-load re-init + prefers-reduced-motion guard"
  - "Before/after metrics card layout: muted before value, arrow SVG, ember-highlighted after value"
observability_surfaces:
  - "[data-testimonials] container with [data-slide] and [data-dot] attributes for DOM inspection"
  - "Active slide: opacity-100; inactive: opacity-0 pointer-events-none"
  - "Graceful degradation: first testimonial visible if JS fails"
drill_down_paths:
  - .gsd/milestones/M002/slices/S04/tasks/T01-SUMMARY.md
duration: 8m
verification_result: passed
completed_at: 2026-03-14
---

# S04: Social Proof & Results Showcase

**Homepage now has animated before/after client results cards and a rotating testimonial section with scroll-reveal entrance animations.**

## What Happened

Created two components and wired them into the homepage:

1. **ResultsShowcase** — 3-column CSS grid of before/after cards (Manual Reporting, Customer Support, Lead Qualification). Each card shows a muted "before" metric, ember arrow, and highlighted "after" metric. Cards use established styling patterns with staggered ScrollReveal delays.

2. **Testimonials** — 3 rotating quotes with CSS opacity transitions, dot navigation, 5-second auto-advance. Uses `astro:page-load` for re-initialization, `astro:before-swap` for interval cleanup, and `prefers-reduced-motion` to skip auto-rotation.

3. Both sections inserted on homepage between Why Oriflect and CTA, wrapped in ScrollReveal.

## Verification

- ✅ `npx astro build` → exit 0 (6 pages built)
- ✅ `grep -c "ResultsShowcase" src/pages/index.astro` → 2
- ✅ `grep -c "Testimonials" src/pages/index.astro` → 3
- ✅ `grep "prefers-reduced-motion" src/components/Testimonials.astro` → match
- ✅ `grep "astro:before-swap" src/components/Testimonials.astro` → match
- ✅ Both component files exist

## Requirements Advanced

- R005 (social proof sections) — homepage now includes results showcase and testimonials

## Requirements Validated

- none

## New Requirements Surfaced

- none

## Requirements Invalidated or Re-scoped

- none

## Deviations

none

## Known Limitations

- Testimonial content is hardcoded (realistic placeholder data) — real client results would need content update
- No swipe/touch gesture support on testimonials — dot nav and auto-rotation only

## Follow-ups

- none — S05 builds on this by adding service pipeline and blog sections around these components

## Files Created/Modified

- `src/components/ResultsShowcase.astro` — created, 3 before/after metrics cards
- `src/components/Testimonials.astro` — created, rotating testimonial section with accessibility guards
- `src/pages/index.astro` — modified, integrated both new sections

## Forward Intelligence

### What the next slice should know
- Both new sections are inserted between "Why Oriflect" and CTA — S05 needs to reorder to: hero → services pipeline → metrics → results → testimonials → blog → CTA
- ScrollReveal wrapping pattern is consistent with S02's approach — just wrap sections in the component

### What's fragile
- Homepage section ordering in `index.astro` — S05 will rearrange sections, must preserve all existing sections while reordering

### Authoritative diagnostics
- `[data-testimonials]` container with `[data-slide]` attributes — inspect DOM to verify testimonial state
- Build output confirms 6 pages built successfully

### What assumptions changed
- none — implementation matched plan exactly
