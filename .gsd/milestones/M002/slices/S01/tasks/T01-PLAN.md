---
estimated_steps: 5
estimated_files: 3
---

# T01: Build HeroAnimation component and wire into homepage hero

**Slice:** S01 — Animated Hero & AI Visual Language
**Milestone:** M002

## Description

Create the `HeroAnimation.astro` component with CSS-animated floating nodes and connecting lines that evoke an AI neural network. Wire it into the homepage hero section as a background layer. Establish reusable animation keyframes in `global.css` for downstream slices. Handle dark mode color adaptation and `prefers-reduced-motion`.

## Steps

1. Add reusable `@keyframes float` (vertical drift + slight horizontal sway) and `@keyframes pulse-line` (opacity pulse) to `src/styles/global.css`, wrapped with `@media (prefers-reduced-motion: reduce)` that sets `animation-play-state: paused`
2. Create `src/components/HeroAnimation.astro` — an absolutely-positioned container (`inset: 0; pointer-events: none; overflow: hidden; z-index: 0`) containing ~15 small div nodes (`width: 4-8px; height: same; border-radius: 50%; opacity: 0.15-0.3`) each with the float animation at different durations (15-40s) and delays, plus 3-4 thin SVG lines with pulse-line animation; light mode nodes use `rgba(255,255,255,...)`, dark mode uses `.dark` variant with `rgba(200,220,255,...)`
3. In `src/pages/index.astro`, import `HeroAnimation` and add `position: relative; overflow: hidden` to the hero `<section>`, insert `<HeroAnimation />` as the first child inside the section, and ensure hero text `<div>` has `relative z-10`
4. Verify `npx astro build` exits 0
5. Grep `dist/` for `float`, `prefers-reduced-motion`, and animation-related output to confirm compilation

## Must-Haves

- [ ] HeroAnimation.astro exists with ~15 animated node dots and connecting lines
- [ ] Animation layer has `pointer-events: none`, `position: absolute`, `inset: 0`
- [ ] Hero text content sits above animation layer via z-index
- [ ] Existing hero gradient, text, and Calendly CTA button unchanged
- [ ] Dark mode: nodes visible against dark background
- [ ] `prefers-reduced-motion` pauses all animations
- [ ] Reusable keyframes in global.css
- [ ] `astro build` exits 0

## Verification

- `npx astro build` exits 0
- `grep -r "prefers-reduced-motion" dist/` returns matches
- `grep -r "float" dist/_astro/` returns matches (keyframes compiled)
- Hero section in `dist/index.html` contains animation markup and preserves CTA button with `openCalendly`

## Inputs

- `src/pages/index.astro` — current hero section (lines 8-28)
- `src/styles/global.css` — Tailwind v4 theme block where keyframes will be added
- S01-RESEARCH.md findings on color values, z-index strategy, node count limits

## Expected Output

- `src/components/HeroAnimation.astro` — new animated background component
- `src/pages/index.astro` — hero section modified to include HeroAnimation
- `src/styles/global.css` — new `@keyframes float`, `@keyframes pulse-line`, and `prefers-reduced-motion` rules

## Observability Impact

- **New signals:** Animation keyframes (`float`, `pulse-line`) appear in compiled CSS output under `dist/_astro/`; `prefers-reduced-motion` media query present in same files
- **Inspection surface:** `grep -r "hero-animation" dist/index.html` verifies animation container rendered; `grep -r "float" dist/_astro/` verifies keyframes compiled
- **Failure visibility:** If animation layer has incorrect z-index or missing `pointer-events: none`, the CTA button becomes unclickable — detectable by checking `openCalendly` presence and DOM ordering in `dist/index.html`
