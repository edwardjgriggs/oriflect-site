---
id: T01
parent: S01
milestone: M002
provides:
  - HeroAnimation.astro component with 15 floating nodes and 4 SVG connecting lines
  - Reusable @keyframes float and pulse-line in global.css
  - prefers-reduced-motion support pausing all animations
key_files:
  - src/components/HeroAnimation.astro
  - src/pages/index.astro
  - src/styles/global.css
key_decisions:
  - Node opacity controlled via inline styles for per-node variation; background color set in scoped CSS with :global(.dark) for dark mode
  - Animation keyframes placed in global.css (not scoped) for reuse by downstream slices
patterns_established:
  - Animation layers use position:absolute + inset:0 + pointer-events:none + z-index:0; content above uses relative z-10
  - prefers-reduced-motion handled globally via animation-play-state:paused on all elements
observability_surfaces:
  - grep dist/index.html for "hero-animation" confirms animation container rendered
  - grep dist/_astro/ for "float" confirms keyframes compiled
  - grep dist/ for "prefers-reduced-motion" confirms a11y handling
duration: ~8m
verification_result: passed
completed_at: 2026-03-14
blocker_discovered: false
---

# T01: Build HeroAnimation component and wire into homepage hero

**Created HeroAnimation.astro with 15 CSS-animated floating nodes and 4 SVG pulse-line connectors, wired into homepage hero as background layer with dark mode and reduced-motion support.**

## What Happened

Added `@keyframes float` (vertical drift + horizontal sway) and `@keyframes pulse-line` (opacity pulse) to `global.css` with a `prefers-reduced-motion: reduce` media query that pauses all animations. Created `HeroAnimation.astro` with 15 absolutely-positioned dot nodes (4-8px, varying opacity 0.15-0.3, staggered durations 16-40s and delays) and 4 SVG connecting lines with pulse animation. Light mode uses white-tinted nodes; dark mode uses `.dark` variant with blue-white tint. Wired into `index.astro` hero section: added `relative overflow-hidden` to the section, inserted `<HeroAnimation />` as first child, and added `relative z-10` to the text container. Existing gradient, text, and Calendly CTA preserved unchanged.

## Verification

- `npx astro build` exits 0 ✅
- `grep -rl "prefers-reduced-motion" dist/` → matches in compiled CSS ✅
- `grep -rl "float" dist/_astro/` → matches (keyframes compiled) ✅
- `grep -c "hero-animation" dist/index.html` → 2 (container rendered) ✅
- `grep -c "openCalendly" dist/index.html` → 5 (CTA preserved) ✅

### Slice-level verification (partial — single task slice):
- `npx astro build` exits 0 ✅
- `grep -r "HeroAnimation" dist/` → present via `hero-animation` class ✅
- `grep -r "float" dist/` → keyframes present ✅
- `grep -r "prefers-reduced-motion" dist/` → present ✅
- Visual dev server check: not performed (no browser tool available)
- `grep -r "openCalendly" dist/index.html` → CTA intact ✅

## Diagnostics

- Inspect animation presence: `grep "hero-animation" dist/index.html`
- Inspect compiled keyframes: `grep "float" dist/_astro/*.css`
- Inspect reduced-motion: `grep "prefers-reduced-motion" dist/_astro/*.css`
- If CTA becomes unclickable, check that `.hero-animation` has `pointer-events: none` and hero text div has `z-10`

## Deviations

None.

## Known Issues

None.

## Files Created/Modified

- `src/components/HeroAnimation.astro` — new animated background component with 15 nodes and 4 SVG lines
- `src/pages/index.astro` — hero section made relative, added HeroAnimation import and component, text div given z-10
- `src/styles/global.css` — added @keyframes float, @keyframes pulse-line, and prefers-reduced-motion media query
- `.gsd/milestones/M002/slices/S01/S01-PLAN.md` — added Observability/Diagnostics section and failure-path verification
- `.gsd/milestones/M002/slices/S01/tasks/T01-PLAN.md` — added Observability Impact section
