---
id: S03
milestone: M002
status: ready
---

# S03: View Transitions & Page Flow — Context

## Goal

Wire Astro View Transitions into the site so all page navigations cross-fade smoothly, the header persists across transitions, and dark mode state survives without flash.

## Why this Slice

View Transitions are independent of S01 and S02 and can be built in parallel. S06 (final polish) consumes the transitions this slice produces. The dark-mode-persistence-across-transitions risk is explicitly called out in the milestone proof strategy and must be retired here.

## Scope

### In Scope

- Astro View Transitions (built-in `<ClientRouter />` or `<ViewTransitions />`) added to `BaseLayout.astro`
- Cross-fade transition animation on page body content
- Persistent header across transitions — header stays in place, only body content cross-fades
- Dark mode state persists across all page navigations — no flash of wrong theme
- Calendly external script survives transitions (re-init if needed after navigation)
- Mobile menu state resets properly on navigation (closes if open)
- `prefers-reduced-motion`: instant content swap, no transition animation
- `transition:animate` directives on shared elements (header, main content area)
- Works on all 5 pages: index, services, about, blog, contact
- Blog post pages (`/blog/[slug]`) also get transitions

### Out of Scope

- Scroll-reveal animations (S02)
- Hero animation (S01)
- Hover state polish (S06)
- Slide or morph transition variants — cross-fade only
- Any content or layout changes to pages
- Browser fallback polyfills for View Transitions — Astro handles graceful degradation

## Constraints

- Astro View Transitions API only — no external transition libraries (D015)
- Dark mode uses `.dark` class on `<html>` via localStorage inline script (D003) — this must not break
- Calendly widget loaded as external async script — must remain functional after client-side navigation
- Web3Forms contact form must continue working after navigating to/from contact page
- `astro build` must exit 0

## Integration Points

### Consumes

- `src/layouts/BaseLayout.astro` — add View Transitions component and dark mode persistence logic
- `src/components/Header.astro` — mark as persistent element across transitions
- Existing dark mode inline `<script>` in BaseLayout head — must fire on every transition, not just initial load

### Produces

- View Transitions wired into `BaseLayout.astro` via Astro's built-in component
- Dark mode persistence logic that survives client-side navigations (re-applies `.dark` class after swap)
- `transition:animate` directives on header (persist) and main content (cross-fade)
- Pattern for handling external scripts (Calendly) across View Transitions

## Open Questions

- Exact cross-fade duration — decide during implementation; likely 200–300ms for professional feel
- Whether Astro's `<ClientRouter />` vs `<ViewTransitions />` is the correct import for Astro 5 — verify during research
