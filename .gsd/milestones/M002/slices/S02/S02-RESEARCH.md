# S02: Scroll Reveal & Metrics Animations — Research

**Date:** 2026-03-14

## Summary

S02 delivers two things: (1) a reusable scroll-reveal system that fades/slides sections into view on all pages, and (2) an animated metrics counter section on the homepage. The codebase is well-positioned — Astro components, Tailwind v4 CSS-first config, and S01 already established animation keyframes and a `prefers-reduced-motion` pause rule in `global.css`. No external libraries are needed; vanilla Intersection Observer + CSS transitions cover both features cleanly.

The homepage currently has 4 sections (Hero → Service Pipeline → Why Oriflect → CTA). The metrics section should be inserted between Service Pipeline and Why Oriflect — it reinforces credibility before the "Why" pitch. All other pages (about, services, contact, blog) have 4-10 `<section>` elements each that should get scroll-reveal treatment.

## Recommendation

**Pure CSS + vanilla JS Intersection Observer approach.** Create two Astro components:

1. **`ScrollReveal.astro`** — a wrapper component that applies a CSS class when the element enters the viewport. Uses a single shared Intersection Observer instance (one `<script>` tag, not per-instance). Children start with `opacity: 0; transform: translateY(20px)` and transition to visible.

2. **`MetricsCounter.astro`** — displays a number that counts up from 0 to target when scrolled into view. Uses `requestAnimationFrame` for smooth counting. Accepts props: `value`, `suffix` (e.g., "%", "+"), `label`.

Both components use the same Intersection Observer pattern. The ScrollReveal wrapper is what downstream slices (S04, S05) consume.

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---------|------------------|------------|
| Scroll detection | Intersection Observer API | Native, zero-dependency, performant, widely supported |
| Smooth number animation | requestAnimationFrame | Native, no library needed for simple easing |

No animation libraries (GSAP, Motion, etc.) are warranted — the effects are simple CSS transitions triggered by class toggling.

## Existing Code and Patterns

- `src/styles/global.css` — Already has `@keyframes float`, `@keyframes pulse-line`, and `prefers-reduced-motion` rule that pauses animations. S02 should add scroll-reveal transition classes here and ensure reduced-motion disables them.
- `src/components/HeroAnimation.astro` — S01 pattern: inline `<script>` for JS, inline `<style>` for component CSS. Follow same pattern.
- `src/pages/index.astro` — 4 sections. Metrics section inserts between Service Pipeline and Why Oriflect. Wrap existing sections with `<ScrollReveal>`.
- `src/pages/about.astro`, `services.astro`, `contact.astro`, `blog.astro` — All have multiple `<section>` elements to wrap with ScrollReveal.
- `src/layouts/BaseLayout.astro` — Global layout; no changes needed for S02.

## Constraints

- **Astro static site** — all JS must be client-side `<script>` tags, no SSR
- **Tailwind v4 CSS-first** — custom classes go in `global.css` with `@theme` or plain CSS, not a config file
- **Must work in light and dark mode** — scroll-reveal animations are mode-agnostic (opacity/transform), no color issues
- **S01's `prefers-reduced-motion` rule** pauses `animation-play-state` — S02's CSS transitions need a separate reduced-motion rule since transitions don't use `animation-play-state`
- **Downstream consumers (S04, S05, S06)** depend on `ScrollReveal.astro` — the component API must be simple (wrap children, optional direction/delay props)

## Common Pitfalls

- **Multiple Intersection Observer instances** — Creating one observer per element is wasteful. Use a single observer with `data-` attributes for configuration. Astro's `<script>` runs once per page, not per component instance.
- **Flash of invisible content on slow JS** — If JS fails to load, elements stay `opacity: 0`. Add a `<noscript>` fallback or use CSS-only `:not(.js)` body class pattern to show content without JS.
- **Counter re-triggering on scroll back** — Use `{ once: true }` or `observer.unobserve()` after first intersection so counters don't re-animate.
- **Layout shift from transform** — `translateY` on sections can cause CLS. Keep the transform small (16-24px) and use `will-change: transform, opacity` sparingly.

## Open Risks

- Metrics data is placeholder — need to pick compelling but honest numbers (e.g., "50+ Audits Completed", "3x Average ROI"). These are marketing claims on a consulting site; keep them credible.
- ScrollReveal on blog listing — if blog has many post cards, revealing them all individually could feel excessive. May need a staggered group reveal instead.

## Skills Discovered

| Technology | Skill | Status |
|------------|-------|--------|
| Astro | (checked available_skills) | none installed / none needed |
| Intersection Observer | n/a | native API, no skill needed |

## Sources

- Intersection Observer API is native browser API — no docs lookup needed
- Astro component patterns observed from existing codebase (HeroAnimation.astro)
- S01 animation patterns observed from global.css keyframes and reduced-motion rule
