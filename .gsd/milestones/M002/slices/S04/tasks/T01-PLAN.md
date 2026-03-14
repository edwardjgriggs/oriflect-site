---
estimated_steps: 5
estimated_files: 3
---

# T01: Build ResultsShowcase and Testimonials components and wire into homepage

**Slice:** S04 — Social Proof & Results Showcase
**Milestone:** M002

## Description

Create two Astro components — ResultsShowcase (before/after client results cards) and Testimonials (rotating quotes) — and add both to the homepage between the "Why Oriflect" and CTA sections. Both use ScrollReveal for entrance animation. Testimonials has auto-rotation with proper cleanup for view transitions and reduced-motion respect.

## Steps

1. Create `src/components/ResultsShowcase.astro`: 3-column CSS grid of before/after result cards. Each card shows a scenario (e.g., "Manual Reporting"), a before metric (muted), an arrow, and an after metric (highlighted in ember/gold). Use established card styling. Wrap each card in ScrollReveal with staggered delays.

2. Create `src/components/Testimonials.astro`: 3 testimonial quotes with name/role. Auto-advance every 5s via setInterval. CSS opacity transitions between quotes. Dot navigation for manual selection. Script must:
   - Clear interval on `astro:before-swap`
   - Re-init on `astro:page-load`
   - Check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip auto-rotation if true
   - Use `is:inline` is NOT used (per D010 — use astro:page-load instead)

3. In `src/pages/index.astro`, import both components and insert them between the "Why Oriflect" section and the "Final CTA" section. Wrap each in ScrollReveal.

4. Run `npx astro build` and fix any errors.

5. Run verification grep checks to confirm all must-haves.

## Must-Haves

- [ ] ResultsShowcase has 3 before/after cards with realistic AI consulting scenarios
- [ ] Testimonials has 3 rotating quotes with auto-advance and dot navigation
- [ ] Testimonial interval cleared on astro:before-swap
- [ ] Testimonial re-inits on astro:page-load
- [ ] Reduced-motion disables testimonial auto-rotation
- [ ] Both sections on homepage between Why Oriflect and CTA
- [ ] Light and dark mode styling works
- [ ] astro build exits 0

## Verification

- `npx astro build` → exit 0
- `grep -c "ResultsShowcase" src/pages/index.astro` → 1+
- `grep -c "Testimonials" src/pages/index.astro` → 1+
- `grep "prefers-reduced-motion" src/components/Testimonials.astro` → match
- `grep "astro:before-swap" src/components/Testimonials.astro` → match
- `test -f src/components/ResultsShowcase.astro && test -f src/components/Testimonials.astro`

## Observability Impact

- **New DOM signals**: `[data-testimonials]`, `[data-slide]`, `[data-dot]` attributes enable programmatic inspection of testimonial state. Active slide has `opacity-100` class.
- **Failure degradation**: If JS fails, first testimonial remains visible (server-rendered `opacity-100`), others hidden. No broken state.
- **Interval lifecycle**: `astro:before-swap` listener clears rotation interval. Stale interval errors in console would indicate cleanup failure.

## Inputs

- `src/components/ScrollReveal.astro` — wrapper component with direction/delay props
- `src/pages/index.astro` — current homepage; insert after Why Oriflect section, before CTA
- `src/styles/global.css` — brand color tokens (sapphire, gold, ember, charcoal, ivory)
- S02 summary — ScrollReveal API and patterns
- D010 — use `astro:page-load` for script re-init, not `is:inline`

## Expected Output

- `src/components/ResultsShowcase.astro` — new component with 3 before/after results cards
- `src/components/Testimonials.astro` — new component with rotating quotes, cleanup, reduced-motion
- `src/pages/index.astro` — modified to include both new sections
