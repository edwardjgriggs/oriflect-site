# S03: View Transitions & Page Flow

**Goal:** All page navigations use smooth cross-fade transitions; dark mode persists without flash; all interactive scripts survive navigation.
**Demo:** Click between Home, Services, About, Blog, Contact — pages cross-fade smoothly. Toggle dark mode, navigate to another page — dark mode stays. Mobile menu works after navigating. Theme toggle works after navigating.

## Must-Haves

- `<ClientRouter />` added to `BaseLayout.astro` `<head>`
- Dark mode `.dark` class persists across view transitions via `astro:after-swap`
- ThemeToggle click handler survives view transition navigations
- Mobile menu toggle survives view transition navigations
- Mobile menu closes on navigation
- `astro build` exits 0

## Verification

- `npx astro build` exits 0
- `grep -r "ClientRouter" src/layouts/BaseLayout.astro` finds the import and component
- `grep -r "astro:after-swap" src/layouts/BaseLayout.astro` finds dark mode persistence
- `grep -r "astro:page-load" src/components/ThemeToggle.astro src/components/Header.astro` confirms script re-initialization

## Tasks

- [x] **T01: Add ClientRouter and fix all scripts for view transition survival** `est:30m`
  - Why: This is the entire slice — add view transitions and make all interactive scripts survive DOM swaps
  - Files: `src/layouts/BaseLayout.astro`, `src/components/ThemeToggle.astro`, `src/components/Header.astro`
  - Do: (1) Import and add `<ClientRouter />` in BaseLayout head. (2) Add `astro:after-swap` listener in BaseLayout to re-apply `.dark` class from localStorage before paint. (3) Convert ThemeToggle `is:inline` script to use `document.addEventListener('astro:page-load', ...)` pattern so it re-binds after each navigation. (4) Convert Header mobile menu `is:inline` script similarly, and add `astro:after-swap` handler to close menu on navigation. (5) Keep the Calendly `openCalendly()` function as `is:inline` since it's a global window function that survives. (6) Keep the dark mode init IIFE as `is:inline` since it must run before paint on first load — the `astro:after-swap` handler covers subsequent navigations.
  - Verify: `npx astro build` exits 0; grep confirms ClientRouter, `astro:after-swap`, and `astro:page-load` patterns present
  - Done when: Build passes and all four grep checks from Verification section succeed

## Observability / Diagnostics

- **View transition events**: In browser console, `document.addEventListener('astro:page-load', () => console.log('[VT] page-load'))` and `document.addEventListener('astro:after-swap', () => console.log('[VT] after-swap'))` confirm transitions fire.
- **Dark mode persistence**: After navigation, `document.documentElement.classList.contains('dark')` should match `localStorage.getItem('theme')`.
- **Mobile menu state**: After navigation, `document.getElementById('mobile-menu').classList.contains('hidden')` should be `true`.
- **Build failure visibility**: `npx astro build` exits non-zero with error output if scripts or imports are invalid.

## Verification (failure-path)

- If `astro build` fails, stderr contains the specific file and line causing the error.
- If dark mode flashes on navigation, `astro:after-swap` handler is missing or not reading localStorage correctly — inspect with `console.log` in that listener.

## Files Likely Touched

- `src/layouts/BaseLayout.astro`
- `src/components/ThemeToggle.astro`
- `src/components/Header.astro`
