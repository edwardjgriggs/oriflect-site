---
id: T01
parent: S04
milestone: M002
provides:
  - ResultsShowcase component with 3 before/after AI consulting metrics cards
  - Testimonials component with auto-rotating quotes, dot nav, reduced-motion and view-transition guards
  - Homepage integration of both sections between Why Oriflect and CTA
key_files:
  - src/components/ResultsShowcase.astro
  - src/components/Testimonials.astro
  - src/pages/index.astro
key_decisions:
  - Testimonials uses CSS opacity transitions (not JS animation) for slide changes — simpler, respects reduced-motion CSS rules
  - ResultsShowcase cards use map over data array rather than hand-coded cards — easier to update content
patterns_established:
  - Testimonial auto-rotation pattern: setInterval with astro:before-swap cleanup, astro:page-load re-init, prefers-reduced-motion guard
  - Before/after metrics card layout: flex row with muted "before" value, arrow SVG, ember-highlighted "after" value
observability_surfaces:
  - "[data-testimonials] container with [data-slide] and [data-dot] attributes for DOM state inspection"
  - "Active slide has opacity-100 class; inactive have opacity-0 pointer-events-none"
  - "Graceful degradation: first testimonial visible if JS fails (server-rendered opacity-100)"
duration: 8m
verification_result: passed
completed_at: 2026-03-14
blocker_discovered: false
---

# T01: Build ResultsShowcase and Testimonials components and wire into homepage

**Created ResultsShowcase (3 before/after metrics cards) and Testimonials (auto-rotating quotes with dot nav, reduced-motion respect, view-transition cleanup) and wired both into homepage between Why Oriflect and CTA.**

## What Happened

1. Created `src/components/ResultsShowcase.astro` — 3-column CSS grid with before/after cards for Manual Reporting, Customer Support, and Lead Qualification scenarios. Each card shows muted "before" metric, ember arrow, and ember-highlighted "after" metric. Cards use established styling (bg-white dark:bg-dark-surface rounded-xl p-8 shadow-md) with staggered ScrollReveal delays.

2. Created `src/components/Testimonials.astro` — 3 quotes with CSS opacity transitions, dot navigation, and 5-second auto-advance. Script uses `astro:page-load` for re-initialization (not `is:inline`), `astro:before-swap` for interval cleanup, and `prefers-reduced-motion` check to skip auto-rotation.

3. Updated `src/pages/index.astro` — imported both components and inserted them wrapped in ScrollReveal between the Why Oriflect section and Final CTA section.

4. Build passed on first attempt.

## Verification

All slice-level checks pass (this is the only task in S04):

- ✅ `npx astro build` → exit 0
- ✅ `grep -c "ResultsShowcase" src/pages/index.astro` → 2
- ✅ `grep -c "Testimonials" src/pages/index.astro` → 3
- ✅ `grep "prefers-reduced-motion" src/components/Testimonials.astro` → match found
- ✅ `grep "astro:before-swap" src/components/Testimonials.astro` → match found
- ✅ Both component files exist

## Diagnostics

- Testimonial state inspectable via `[data-slide]` and `[data-dot]` DOM attributes
- If JS fails, first testimonial remains visible via server-rendered classes (graceful degradation)
- Interval cleanup verifiable by absence of stale-DOM errors in console after page transitions
