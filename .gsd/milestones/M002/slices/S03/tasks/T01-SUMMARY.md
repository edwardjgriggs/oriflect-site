---
id: T01
parent: S03
milestone: M002
provides:
  - ClientRouter view transitions on all pages
  - Dark mode persistence across navigations via astro:after-swap
  - View-transition-safe theme toggle and mobile menu scripts
key_files:
  - src/layouts/BaseLayout.astro
  - src/components/ThemeToggle.astro
  - src/components/Header.astro
key_decisions:
  - ThemeToggle uses event delegation (document click on #theme-toggle-btn) with once astro:page-load listener — avoids duplicate handlers
  - Header mobile menu uses direct element binding per astro:page-load since elements are replaced on swap
  - Calendly openCalendly() kept as is:inline — global window function survives view transitions
  - Dark mode init IIFE kept as is:inline for first paint; astro:after-swap covers subsequent navigations
patterns_established:
  - astro:page-load for re-binding interactive scripts after view transitions
  - astro:after-swap for pre-paint DOM state restoration
observability_surfaces:
  - Browser console: listen to astro:page-load / astro:after-swap to confirm transitions fire
  - document.documentElement.classList.contains('dark') vs localStorage.getItem('theme') to verify dark mode sync
  - Build errors surface in npx astro build stderr with file/line
duration: 5m
verification_result: passed
completed_at: 2026-03-14
blocker_discovered: false
---

# T01: Add ClientRouter and fix all scripts for view transition survival

**Wired Astro ClientRouter for cross-fade page transitions; converted theme toggle and mobile menu scripts to survive DOM swaps via astro:page-load/after-swap patterns.**

## What Happened

1. Imported `ClientRouter` from `astro:transitions` and added `<ClientRouter />` in BaseLayout `<head>`.
2. Added `astro:after-swap` `is:inline` script in BaseLayout that reads localStorage theme and applies/removes `.dark` class before paint — prevents flash on navigation.
3. Converted ThemeToggle from `is:inline` to a bundled `<script>` using event delegation on `document` for `#theme-toggle-btn` clicks, registered once via `astro:page-load`.
4. Converted Header mobile menu from `is:inline` to a bundled `<script>` with `astro:page-load` for click binding and `astro:after-swap` to force menu closed + reset icons on navigation.

## Verification

- `npx astro build` — exits 0, 6 pages built, ClientRouter JS chunk emitted (15.36 kB)
- `grep -c "ClientRouter" src/layouts/BaseLayout.astro` → 2 (import + tag)
- `grep -c "astro:after-swap" src/layouts/BaseLayout.astro` → 1
- `grep -c "astro:page-load" src/components/ThemeToggle.astro` → 1
- `grep -c "astro:page-load" src/components/Header.astro` → 1

Slice-level verification: all 4 checks pass. This is the only task in S03, so slice is complete.

## Diagnostics

- In browser devtools: `document.addEventListener('astro:page-load', () => console.log('page-load fired'))` confirms transitions work.
- Dark mode: compare `document.documentElement.classList.contains('dark')` with `localStorage.getItem('theme')` after navigating.
- Mobile menu: `document.getElementById('mobile-menu').classList.contains('hidden')` should be true after any navigation.

## Deviations

None.

## Known Issues

None.

## Files Created/Modified

- `src/layouts/BaseLayout.astro` — added ClientRouter import/tag, astro:after-swap dark mode persistence
- `src/components/ThemeToggle.astro` — converted is:inline to bundled script with astro:page-load event delegation
- `src/components/Header.astro` — converted is:inline to bundled script with astro:page-load + astro:after-swap menu close
