---
estimated_steps: 5
estimated_files: 3
---

# T01: Add focus-visible, active states and finalize reduced-motion coverage

**Slice:** S06 — Micro-interactions & Final Polish
**Milestone:** M002

## Description

Add polished focus-visible ring and active press-feedback styles to all buttons/interactive cards site-wide via global CSS. Patch the existing `prefers-reduced-motion` block to suppress transform-based hover effects (card lift). Run build and measure output size to retire the "animation weight" risk.

## Steps

1. Read `src/styles/global.css` to find the existing `prefers-reduced-motion` block and identify where to add new utility classes
2. Add global CSS rules: (a) focus-visible ring style for buttons/links with `bg-ember` or similar interactive patterns, (b) active scale transform for buttons, (c) inside `prefers-reduced-motion` block, suppress `transform` on hover for elements with translate-based hover effects
3. Grep across `src/pages/` and `src/components/` for any buttons missing the new classes; add classes if needed (prefer global CSS selectors to minimize file touches)
4. Run `npx astro build` — must exit 0
5. Run `du -sh dist/` and record build size; verify it's reasonable for a 6-page static site (< 5MB)

## Must-Haves

- [ ] `focus-visible` ring styles present in global.css
- [ ] `active` scale/press feedback on buttons
- [ ] `prefers-reduced-motion` block suppresses transform-based hover (translateY card lift)
- [ ] `astro build` exits 0
- [ ] Build size recorded and reasonable

## Verification

- `npx astro build` exits 0
- `grep "focus-visible" src/styles/global.css` matches
- `grep "active" src/styles/global.css` matches (scale rule)
- The `prefers-reduced-motion` block in global.css contains transform/translate suppression
- `du -sh dist/` < 5MB

## Inputs

- `src/styles/global.css` — existing reduced-motion block at ~lines 210-226, existing animation keyframes
- S01-S05 summaries — all animation patterns, component inventory, known gaps from research

## Expected Output

- `src/styles/global.css` — updated with focus-visible, active, and expanded reduced-motion rules
- Build verification output confirming clean build and reasonable size

## Observability Impact

- **Focus-visible ring:** Keyboard-navigable focus indicator now visible on all interactive elements; inspectable via browser DevTools `:focus-visible` pseudo-class
- **Active state:** Press feedback (scale 0.97) on buttons/links; observable in DevTools computed styles on `:active`
- **Reduced-motion:** `prefers-reduced-motion: reduce` now suppresses translate-based hover transforms and active scale; testable via browser DevTools media query emulation
- **Failure signal:** Malformed CSS will cause `astro build` to fail with non-zero exit code
