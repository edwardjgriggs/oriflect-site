---
id: T01
parent: S06
milestone: M002
provides:
  - Global focus-visible ring styles on all interactive elements
  - Active press-feedback (scale) on buttons/links
  - Expanded prefers-reduced-motion block suppressing translate-based hovers and active scale
key_files:
  - src/styles/global.css
key_decisions:
  - Used global CSS selectors (a, button, [role="button"]) rather than per-component classes to minimize file touches
  - Used attribute substring selector [class*="hover:-translate"] to catch Tailwind translate hover classes in reduced-motion
patterns_established:
  - All interactive focus/active states live in global.css, not per-component
observability_surfaces:
  - "grep focus-visible src/styles/global.css" confirms ring styles
  - "grep active src/styles/global.css" confirms press feedback
  - Browser DevTools media query emulation for prefers-reduced-motion verification
duration: 8m
verification_result: passed
completed_at: 2026-03-14
blocker_discovered: false
---

# T01: Add focus-visible, active states and finalize reduced-motion coverage

**Added global focus-visible ring, active scale feedback, and expanded reduced-motion to suppress translate-based hovers across all interactive elements.**

## What Happened

Added three CSS rule groups to `src/styles/global.css`:

1. **Focus-visible ring** — `outline: 2px solid var(--color-ember)` with `outline-offset: 2px` on `a`, `button`, `[role="button"]`, `input`, `textarea`, `select`, `summary` via `:focus-visible`.
2. **Active press feedback** — `transform: scale(0.97)` with 0.1s transition on `button:active`, `[role="button"]:active`, `a[href]:active`.
3. **Expanded reduced-motion block** — added `*[class*="hover:-translate"]` and `*[class*="hover:translate"]` selectors with `transform: none !important` to suppress card lift hovers. Also suppresses active scale in reduced-motion.

No component files needed modification — global selectors cover all existing interactive elements (confirmed via grep of `hover:-translate-y-1` usage in index.astro, FeaturedPosts.astro).

## Verification

- `npx astro build` → exits 0, 6 pages built in 1.01s ✓
- `grep "focus-visible" src/styles/global.css` → matches ring styles ✓
- `grep "active" src/styles/global.css` → matches scale rule ✓
- `grep "translate" src/styles/global.css` inside reduced-motion block → confirms transform suppression ✓
- Build size: **~2.2 MB** (well under 5MB threshold) ✓

### Slice-level verification status (1/1 tasks):
- [x] `npx astro build` exits 0
- [x] `grep -r "focus-visible" src/styles/global.css` finds ring styles
- [x] `grep -r "active:" src/styles/global.css` finds active scale
- [x] `grep "translate" src/styles/global.css` inside reduced-motion confirms suppression
- [x] Build size ~2.2MB reported and reasonable

## Diagnostics

- Tab through any page to see ember-colored focus rings on interactive elements
- Click any button to observe scale-down press feedback
- Enable "prefers-reduced-motion: reduce" in DevTools → card hover lift and active scale are suppressed

## Deviations

None.

## Known Issues

None.

## Files Created/Modified

- `src/styles/global.css` — Added focus-visible ring, active scale, expanded reduced-motion block
