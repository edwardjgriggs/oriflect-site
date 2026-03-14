# S03: View Transitions & Page Flow — Research

**Date:** 2026-03-14

## Summary

This slice adds Astro View Transitions via `<ClientRouter />` (Astro 5's renamed component) to `BaseLayout.astro` so all page navigations cross-fade smoothly. The main technical challenge is **not** adding the component itself — that's one line — but ensuring all `is:inline` scripts survive DOM swaps. Currently, ThemeToggle and mobile menu use `is:inline` event listeners that bind once and will break after view transition swaps. Dark mode class persistence across transitions also needs explicit handling via `astro:after-swap`.

The approach is straightforward: import `ClientRouter` in the layout head, add `astro:page-load` re-initialization for interactive scripts, and ensure dark mode `.dark` class persists through the `astro:after-swap` event. ScrollReveal already handles this (D009).

## Recommendation

1. Add `<ClientRouter />` import and tag to `BaseLayout.astro` `<head>`
2. Move ThemeToggle and mobile menu `is:inline` scripts to use `astro:page-load` for re-binding (or use event delegation on `document`)
3. Add `astro:after-swap` listener to re-apply `.dark` class from localStorage before paint
4. Optionally add `transition:animate` directives on header (persist) and main content (fade) for polish
5. Verify `astro build` exits 0

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---------|------------------|------------|
| Page transitions | Astro `<ClientRouter />` | Built-in, zero JS bundle cost, handles fallback |
| Scroll-reveal re-init | D009 `astro:after-swap` in ScrollReveal | Already wired up |

## Existing Code and Patterns

- `src/layouts/BaseLayout.astro` — layout wrapping all pages; dark mode init script in `<head>` (lines 36-43); this is where `<ClientRouter />` goes
- `src/components/ThemeToggle.astro` — `is:inline` click listener that toggles `.dark` and writes localStorage; will lose listener after swap
- `src/components/Header.astro` — `is:inline` mobile menu toggle; same re-init issue
- `src/components/ScrollReveal.astro` — already listens to `astro:after-swap` (line 44) for re-initialization (D009)
- `src/components/MetricsCounter.astro` — may also need `astro:after-swap` / `astro:page-load` check

## Constraints

- Astro 5.18.0 — uses `ClientRouter` not deprecated `ViewTransitions`
- `is:inline` scripts are not re-executed on view transition navigations — only on initial page load
- Dark mode uses `.dark` class on `<html>` + localStorage (D003) — must persist through swap
- Calendly widget script is loaded async with `is:inline` — needs to survive transitions
- Static site (no SSR) — view transitions use client-side navigation

## Common Pitfalls

- **`is:inline` scripts not re-running** — After `ClientRouter` swap, only scripts without `is:inline` are re-executed. Must convert to `astro:page-load` pattern or use event delegation on `document`.
- **Dark mode flash on navigation** — If `.dark` class isn't applied before the new page paints, there's a flash of light theme. Must use `astro:after-swap` (fires before paint) not `astro:page-load` (fires after paint).
- **Mobile menu left open after navigation** — View transitions keep the DOM structure; mobile menu should close on navigation. Handle in `astro:after-swap`.
- **Calendly popup breaking** — The Calendly widget script loads async; view transitions may cause it to re-initialize. The `openCalendly()` function is on `window` via `is:inline` so should survive, but test.

## Open Risks

- MetricsCounter may need `astro:page-load` re-initialization (check if it already handles this like ScrollReveal does)
- HeroAnimation from S01 may need similar re-init handling — check its script pattern

## Skills Discovered

| Technology | Skill | Status |
|------------|-------|--------|
| Astro | (built-in knowledge sufficient) | n/a |

## Sources

- Astro `ClientRouter` component in `node_modules/astro/components/ClientRouter.astro` — confirms the renamed component for Astro 5
- D009 in DECISIONS.md — forward-compat pattern for `astro:after-swap` already established in ScrollReveal
- D003 in DECISIONS.md — dark mode strategy (`.dark` class + localStorage)
