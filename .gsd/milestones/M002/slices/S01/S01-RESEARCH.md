# S01: Animated Hero & AI Visual Language — Research

**Date:** 2026-03-14

## Summary

The homepage hero currently uses a static `linear-gradient` background (sapphire tones) with centered text and a CTA button. The slice needs to add an animated background with floating AI-themed visual motifs (nodes, connecting lines, morphing shapes) behind the existing hero content. The approach is constrained to CSS animations + vanilla JS per D013 — no heavy animation libraries.

The hero section is a single `<section>` in `src/pages/index.astro` with an inline `style="background: linear-gradient(...)"`. The plan is to create a `HeroAnimation.astro` component that renders as an absolutely-positioned canvas or CSS layer behind the hero text, then swap it into `index.astro`. CSS keyframe patterns established here become reusable for downstream slices (S02 scroll reveals, S05 pipeline).

Key finding: the hero uses `min-h-[calc(100vh-4rem)]` with a hardcoded gradient. The animation layer needs to sit behind the text via `position: absolute; inset: 0` with the hero section becoming `position: relative`. Dark mode must be handled — the gradient already uses sapphire (#0A2463) which works in both modes, but the animation elements (nodes/lines) need appropriate colors for light vs dark.

## Recommendation

**CSS-only animated background** using `@keyframes` for floating node dots and connecting lines, rendered as pseudo-elements or inline SVG with CSS transforms. This avoids Canvas API complexity and mobile performance risk while staying within D013 (no animation library). The nodes can be small `<div>`s with `border-radius: 50%` and `animation: float` keyframes at different speeds/delays. Connecting lines via thin SVGs or CSS borders with subtle opacity pulses.

If CSS-only feels too limited for the "network graph" effect, a lightweight inline `<canvas>` with ~50 particles is the fallback — but start CSS-only.

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---------|------------------|------------|
| Reduced-motion detection | `@media (prefers-reduced-motion: reduce)` | Native CSS; just wrap all animation keyframes in this query |
| Intersection Observer | Browser native API | No library needed; used in S02 but not strictly needed for hero (always visible) |

## Existing Code and Patterns

- `src/pages/index.astro` lines 8-28 — Hero section with inline gradient, centered text, CTA. Must preserve all content; only add animation layer behind it.
- `src/styles/global.css` — Tailwind v4 `@theme` block with brand colors. Animation keyframes should go here (or in component `<style>`) for reusability by downstream slices.
- `src/layouts/BaseLayout.astro` — Wraps all pages. No changes needed for S01.
- `src/components/ThemeToggle.astro` — Dark mode toggle; `.dark` class on `<html>` (D003). Animation colors must respond to `.dark`.

## Constraints

- **D013:** CSS animations + vanilla JS only. No animation libraries (motion.dev, GSAP, etc.)
- **D014:** Clean & kinetic visual language — motion should feel sophisticated, not gamey
- **D016:** Polished but restrained micro-interactions
- No SSR — static site. All animation logic must be client-side.
- Tailwind v4 CSS-first config — custom keyframes go in `global.css` `@theme` or component `<style>` blocks
- Must not break Calendly `onclick` on the hero CTA button
- Hero gradient colors (sapphire `#0A2463` → `#1A3A7A`) must remain as base; animation overlays on top

## Common Pitfalls

- **Mobile performance with too many animated elements** — Keep particle/node count to ~15-20 CSS elements max. Use `will-change: transform` sparingly. Test with CSS `animation-play-state: paused` as reduced-motion fallback.
- **Animation fighting with hero text readability** — Nodes must be low-opacity (0.1-0.3) and positioned to not cluster over text. Use `pointer-events: none` on animation layer.
- **Z-index stacking issues** — Animation layer must be `z-0`, hero content must be `z-10` (relative). Test in both light and dark mode.
- **Forgetting `prefers-reduced-motion`** — Add from the start, not as afterthought. S06 audits but S01 should ship with it.

## Open Risks

- Visual quality judgment is subjective — the animation must look "impressive but subtle." May need iteration after first implementation.
- Dark mode: animation nodes need different opacity/color in dark mode to remain visible against `#0F172A` background vs sapphire gradient. The hero currently doesn't change gradient in dark mode — need to verify if it should.

## Skills Discovered

| Technology | Skill | Status |
|------------|-------|--------|
| Astro | `astrolicious/agent-skills@astro` (2.1K installs) | available — not installed |
| CSS animations | none found | built-in browser capability |
| Tailwind CSS v4 | (checked available_skills) | none installed/available |

## Sources

- Codebase exploration of `src/pages/index.astro`, `src/styles/global.css`, `src/components/ThemeToggle.astro`
- Decision register D013, D014, D016 from `.gsd/DECISIONS.md`
- R005 (primary), R015 (supporting) from `REQUIREMENTS.md`
