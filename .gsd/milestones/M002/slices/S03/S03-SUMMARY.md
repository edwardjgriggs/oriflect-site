---
id: S03
parent: M002
milestone: M002
provides:
  - ClientRouter view transitions on all pages (cross-fade navigation)
  - Dark mode persistence across navigations via astro:after-swap
  - View-transition-safe theme toggle and mobile menu scripts
requires: []
affects:
  - S06
key_files:
  - src/layouts/BaseLayout.astro
  - src/components/ThemeToggle.astro
  - src/components/Header.astro
key_decisions:
  - ThemeToggle uses event delegation (document click on #theme-toggle-btn) with once astro:page-load listener to avoid duplicate handlers
  - Header mobile menu uses direct element binding per astro:page-load since elements are replaced on swap
  - Calendly openCalendly() kept as is:inline — global window function survives view transitions
  - Dark mode init IIFE kept as is:inline for first paint; astro:after-swap covers subsequent navigations
patterns_established:
  - astro:page-load for re-binding interactive scripts after view transitions
  - astro:after-swap for pre-paint DOM state restoration (dark mode, menu close)
observability_surfaces:
  - Browser console: listen to astro:page-load / astro:after-swap to confirm transitions fire
  - document.documentElement.classList.contains('dark') vs localStorage.getItem('theme') to verify dark mode sync
  - Build errors surface in npx astro build stderr with file/line
drill_down_paths:
  - .gsd/milestones/M002/slices/S03/tasks/T01-SUMMARY.md
duration: 5m
verification_result: passed
completed_at: 2026-03-14
---

# S03: View Transitions & Page Flow

**Wired Astro ClientRouter for smooth cross-fade page transitions with dark mode persistence and script survival across navigations.**

## What Happened

Added `<ClientRouter />` from `astro:transitions` to BaseLayout's `<head>`, enabling smooth cross-fade transitions on all page navigations. Added an `astro:after-swap` inline script in BaseLayout that reads the theme from localStorage and applies/removes the `.dark` class before paint — preventing any flash of wrong theme during navigation. Converted the ThemeToggle script from `is:inline` to a bundled script using event delegation on `document` for `#theme-toggle-btn` clicks, registered via `astro:page-load`. Converted the Header mobile menu script similarly, adding `astro:after-swap` to force the menu closed and reset icons on navigation.

## Verification

- `npx astro build` exits 0 — 6 pages built in ~2s, ClientRouter JS chunk emitted
- `grep -c "ClientRouter" src/layouts/BaseLayout.astro` → 2 (import + tag)
- `grep -c "astro:after-swap" src/layouts/BaseLayout.astro` → 1
- `grep -c "astro:page-load" src/components/ThemeToggle.astro` → 1
- `grep -c "astro:page-load" src/components/Header.astro` → 1

## Requirements Advanced

- R003 (Visual design polish) — smooth page transitions elevate overall site feel

## Requirements Validated

- None

## New Requirements Surfaced

- None

## Requirements Invalidated or Re-scoped

- None

## Deviations

None.

## Known Limitations

- View transition visual quality (cross-fade smoothness, timing) requires browser testing — contract verification confirms wiring only.
- Dark mode flash prevention on subsequent navigations relies on `astro:after-swap`; first-load flash prevention uses the existing `is:inline` IIFE.

## Follow-ups

- S06 will audit all animations including view transitions for `prefers-reduced-motion` compliance.

## Files Created/Modified

- `src/layouts/BaseLayout.astro` — added ClientRouter import/tag, astro:after-swap dark mode persistence
- `src/components/ThemeToggle.astro` — converted is:inline to bundled script with astro:page-load event delegation
- `src/components/Header.astro` — converted is:inline to bundled script with astro:page-load + astro:after-swap menu close

## Forward Intelligence

### What the next slice should know
- All interactive scripts now use the `astro:page-load` pattern — any new interactive components in S04/S05 must follow this pattern too.
- The `astro:after-swap` event fires before the new page is painted — use it for DOM state that must be set before first render.

### What's fragile
- Event delegation for ThemeToggle relies on `#theme-toggle-btn` ID — if the ID changes, the toggle breaks silently after navigation.

### Authoritative diagnostics
- `npx astro build` exit code — confirms all imports and script patterns are valid.
- Browser console `astro:page-load` / `astro:after-swap` event listeners — confirms transitions are actually firing.

### What assumptions changed
- None — slice executed exactly as planned.
