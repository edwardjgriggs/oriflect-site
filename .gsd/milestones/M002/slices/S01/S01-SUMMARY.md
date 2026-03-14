---
id: S01
parent: M002
milestone: M002
provides:
  - HeroAnimation.astro component with 15 floating nodes and 4 SVG connecting lines
  - Reusable @keyframes float and pulse-line in global.css
  - prefers-reduced-motion support pausing all animations
  - Animation layer pattern (absolute + pointer-events:none + z-index:0)
requires: []
affects:
  - S05
  - S06
key_files:
  - src/components/HeroAnimation.astro
  - src/pages/index.astro
  - src/styles/global.css
key_decisions:
  - Animation keyframes placed in global.css (not scoped) for reuse by downstream slices (D013)
  - Node opacity via inline styles for per-node variation; dark mode via :global(.dark)
patterns_established:
  - Animation layers use position:absolute + inset:0 + pointer-events:none + z-index:0; content above uses relative z-10
  - prefers-reduced-motion handled globally via animation-play-state:paused on all elements
observability_surfaces:
  - grep dist/index.html for "hero-animation" confirms animation container rendered
  - grep dist/_astro/ for "float" confirms keyframes compiled
  - grep dist/ for "prefers-reduced-motion" confirms a11y handling
drill_down_paths:
  - .gsd/milestones/M002/slices/S01/tasks/T01-SUMMARY.md
duration: ~8m
verification_result: passed
completed_at: 2026-03-14
---

# S01: Animated Hero & AI Visual Language

**Created animated hero background with 15 CSS-animated floating nodes, 4 SVG pulse-line connectors, dark mode adaptation, and reduced-motion support — establishing reusable animation patterns for M002.**

## What Happened

Created `HeroAnimation.astro` with 15 absolutely-positioned dot nodes (4–8px, opacity 0.15–0.3, staggered durations 16–40s) and 4 SVG connecting lines with pulse animation. Added `@keyframes float` and `@keyframes pulse-line` to `global.css` for downstream reuse. Wired component into `index.astro` hero section as a background layer with `pointer-events: none` and `z-index: 0`, keeping all existing hero content (gradient, text, Calendly CTA) intact above at `z-10`. Dark mode uses `.dark` variant with blue-white node tint. `prefers-reduced-motion: reduce` media query pauses all animations globally.

## Verification

- `npx astro build` exits 0 ✅
- `grep -c "hero-animation" dist/index.html` → 2 (container rendered) ✅
- `grep -rl "float" dist/_astro/` → keyframes compiled ✅
- `grep -rl "prefers-reduced-motion" dist/` → a11y handling present ✅
- `grep -c "openCalendly" dist/index.html` → 5 (CTA preserved) ✅

## Requirements Advanced

- R005 — Animated hero background with AI visual motifs now implemented; floating nodes and connecting lines evoke neural network imagery
- R015 — prefers-reduced-motion support implemented for hero animations (final audit in S06)

## Requirements Validated

- None — R005 needs visual confirmation (UAT); R015 needs full-site audit in S06

## New Requirements Surfaced

- None

## Requirements Invalidated or Re-scoped

- None

## Deviations

None.

## Known Limitations

- Visual verification not performed in automated testing — requires human UAT in browser
- Animation performance on low-end mobile devices not yet tested (risk retired in S06)

## Follow-ups

- None

## Files Created/Modified

- `src/components/HeroAnimation.astro` — new animated background component with 15 nodes and 4 SVG lines
- `src/pages/index.astro` — hero section made relative, added HeroAnimation import, text div given z-10
- `src/styles/global.css` — added @keyframes float, @keyframes pulse-line, and prefers-reduced-motion media query

## Forward Intelligence

### What the next slice should know
- Reusable keyframes `float` and `pulse-line` are in `global.css` — import/use freely
- The animation layer pattern (absolute + pointer-events:none + z-0, content at z-10) works well and can be replicated

### What's fragile
- Node positioning is hardcoded with inline styles — if hero section height changes significantly, nodes may cluster or spread oddly

### Authoritative diagnostics
- `grep "hero-animation" dist/index.html` — if count drops below 2, component isn't rendering
- `grep "float" dist/_astro/*.css` — if missing, keyframes were tree-shaken (check global.css import)

### What assumptions changed
- None — plan executed as designed
