# S01: Animated Hero & AI Visual Language

**Goal:** Homepage hero has a subtle animated background with floating nodes and connecting lines evoking AI/neural networks.
**Demo:** Opening the homepage shows gently floating dot-nodes with faint connecting lines drifting behind the hero text; in dark mode the nodes are lighter; with `prefers-reduced-motion` all animation stops.

## Must-Haves

- `src/components/HeroAnimation.astro` renders an absolutely-positioned animation layer with floating node dots and subtle connecting lines
- Animation layer sits behind hero text (`z-index` layering), doesn't interfere with text readability or CTA click
- Nodes are low-opacity (0.1–0.3), use CSS `@keyframes` for float motion at varied speeds/delays
- Dark mode: node colors adapt (lighter against dark background)
- `prefers-reduced-motion: reduce` pauses all animations
- Hero section in `index.astro` uses the new component; existing gradient, text, and Calendly CTA preserved exactly
- Reusable keyframes exported in `global.css` for downstream slices
- `astro build` exits 0

## Verification

- `npx astro build` exits 0
- `grep -r "HeroAnimation" dist/` confirms component rendered in build output
- `grep -r "float" dist/` confirms animation keyframes present
- `grep -r "prefers-reduced-motion" dist/` confirms reduced-motion handling present
- Visual: dev server shows floating nodes behind hero text in both light and dark mode
- `grep -r "openCalendly" dist/index.html` confirms CTA button not broken by animation layer

## Tasks

- [x] **T01: Build HeroAnimation component and wire into homepage hero** `est:45m`
  - Why: Delivers the entire slice — animated hero background with AI visual motifs (R005), reduced-motion support (R015), and reusable CSS keyframes for downstream slices
  - Files: `src/components/HeroAnimation.astro`, `src/pages/index.astro`, `src/styles/global.css`
  - Do: Create `HeroAnimation.astro` with ~15 absolutely-positioned dot nodes using `border-radius: 50%` and CSS float keyframes at staggered delays/durations; add 3-4 faint SVG connecting lines with opacity pulse keyframes; use `pointer-events: none` and low z-index on the layer; adapt colors via `.dark` parent; wrap keyframes in `@media (prefers-reduced-motion: reduce)` to pause; add reusable keyframes (`@keyframes float`, `@keyframes pulse-line`) to `global.css`; modify hero `<section>` in `index.astro` to be `relative` and include `<HeroAnimation />` as first child; preserve all existing hero content, gradient, and Calendly onclick
  - Verify: `npx astro build` exits 0; grep dist/ for `HeroAnimation`, `float`, `prefers-reduced-motion`
  - Done when: Build passes, animation keyframes and reduced-motion query present in built output, hero content and CTA unchanged

## Observability / Diagnostics

- **Animation presence:** `grep -r "hero-animation" dist/index.html` confirms the animation container rendered
- **Keyframes compiled:** `grep -r "float" dist/_astro/` confirms CSS keyframes in built output
- **Reduced-motion:** `grep -r "prefers-reduced-motion" dist/` confirms accessibility handling
- **Failure visibility:** If animation layer breaks hero layout, the CTA button (`openCalendly`) becomes unclickable — verify by grepping for `openCalendly` in `dist/index.html`
- **No secrets or PII** in animation markup

## Files Likely Touched

- `src/components/HeroAnimation.astro` (new)
- `src/pages/index.astro`
- `src/styles/global.css`
