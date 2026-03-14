---
estimated_steps: 5
estimated_files: 3
---

# T01: Add ClientRouter and fix all scripts for view transition survival

**Slice:** S03 — View Transitions & Page Flow
**Milestone:** M002

## Description

Wire Astro's `<ClientRouter />` into the base layout to enable smooth cross-fade page transitions. Fix all `is:inline` interactive scripts (theme toggle, mobile menu) to survive DOM swaps by using `astro:page-load` re-initialization. Add `astro:after-swap` dark mode persistence so `.dark` class is applied before paint on navigation.

## Steps

1. In `BaseLayout.astro`: import `{ ClientRouter }` from `'astro:transitions'` and add `<ClientRouter />` inside `<head>` after the existing scripts.
2. In `BaseLayout.astro`: add a `<script is:inline>` block with `document.addEventListener('astro:after-swap', ...)` that reads localStorage theme and applies/removes `.dark` class on `<html>` — this fires before paint so no flash occurs.
3. In `ThemeToggle.astro`: replace the `is:inline` script with a non-inline `<script>` that uses `document.addEventListener('astro:page-load', ...)` to bind the click handler. Use event delegation on `document` clicking `#theme-toggle-btn` for robustness.
4. In `Header.astro`: replace the `is:inline` script with a non-inline `<script>` using `astro:page-load` for mobile menu toggle binding. Add `astro:after-swap` listener to force mobile menu closed (add `hidden` class) on navigation.
5. Run `npx astro build` and verify clean exit.

## Must-Haves

- [ ] `<ClientRouter />` present in BaseLayout head
- [ ] `astro:after-swap` dark mode persistence in BaseLayout
- [ ] ThemeToggle re-binds after view transition navigation
- [ ] Mobile menu re-binds after view transition navigation
- [ ] Mobile menu closes on navigation
- [ ] `astro build` exits 0

## Verification

- `npx astro build` exits 0
- `grep -c "ClientRouter" src/layouts/BaseLayout.astro` returns ≥ 1
- `grep -c "astro:after-swap" src/layouts/BaseLayout.astro` returns ≥ 1
- `grep -c "astro:page-load" src/components/ThemeToggle.astro` returns ≥ 1
- `grep -c "astro:page-load" src/components/Header.astro` returns ≥ 1

## Observability Impact

- **New signals**: `astro:page-load` and `astro:after-swap` events now fire on every navigation. Scripts log no output by default but can be instrumented via browser console listeners.
- **Inspection**: Check dark mode state with `document.documentElement.classList.contains('dark')` and `localStorage.getItem('theme')` after any navigation.
- **Failure visibility**: Build errors surface in `npx astro build` stderr with file/line. Runtime: if theme toggle or mobile menu stops working after navigation, the `astro:page-load` handler failed to re-bind — check console for errors.

## Inputs

- `src/layouts/BaseLayout.astro` — current layout with dark mode init IIFE and Calendly scripts
- `src/components/ThemeToggle.astro` — current `is:inline` click handler
- `src/components/Header.astro` — current `is:inline` mobile menu toggle
- S03-RESEARCH.md — identifies `ClientRouter` as the Astro 5 component name, pitfalls with `is:inline`

## Expected Output

- `src/layouts/BaseLayout.astro` — updated with `<ClientRouter />` import/tag and `astro:after-swap` dark mode handler
- `src/components/ThemeToggle.astro` — script converted to `astro:page-load` pattern
- `src/components/Header.astro` — script converted to `astro:page-load` pattern with menu-close on swap
