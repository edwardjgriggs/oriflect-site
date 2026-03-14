---
id: S01
milestone: M002
status: ready
---

# S01: Animated Hero & AI Visual Language — Context

## Goal

Add a subtle animated network-graph background to the homepage hero and establish reusable CSS animation patterns for downstream slices.

## Why this Slice

This is the first visual impression of the site and sets the animation language for the entire milestone. It has no dependencies, so it can start immediately. The reusable keyframes, timing functions, and utility classes it produces unblock S02 (scroll reveals), S05 (pipeline animation), and S06 (polish pass).

## Scope

### In Scope

- Animated background layer behind the existing hero text — floating dots/nodes with thin connecting lines that drift slowly, evoking neural networks
- Subtle ambient intensity: low opacity, very slow movement, text is clearly the star
- Dark mode adaptation: same animation with color palette swapped to suit dark theme (no glow/intensity change)
- Mobile: simplified version with fewer nodes and slower movement for performance
- Reusable CSS animation patterns: extracted keyframes, timing functions, and utility classes other slices can import
- `prefers-reduced-motion`: animation pauses or is hidden entirely

### Out of Scope

- Hero text or CTA copy changes
- Hero layout changes (stays centered, animation is background-only)
- Scroll-reveal animations (S02)
- Canvas, WebGL, or heavy JS animation libraries (D013 locks CSS + vanilla JS)
- Service pipeline animation (S05)
- Any new pages or sections

## Constraints

- CSS animations + vanilla JS only — no animation libraries (D013)
- Clean & kinetic visual direction, not dark/glowy or 3D (D014)
- Must work in both light and dark mode using existing `.dark` class strategy (D003)
- Tailwind CSS v4 CSS-first config — animation utilities go in `global.css` or component styles (D001)
- Must not break existing Calendly CTA or any existing hero functionality
- `astro build` must exit 0

## Integration Points

### Consumes

- `src/pages/index.astro` — existing hero section (background layer added behind current content)
- `src/styles/global.css` — brand color tokens from `@theme` block
- `src/layouts/BaseLayout.astro` — dark mode class on `<html>`

### Produces

- `src/components/HeroAnimation.astro` — animated network-graph background component
- Reusable CSS animation patterns in `global.css` (or dedicated animation file): keyframes, timing functions, utility classes for downstream slices
- AI visual motif elements (node dots, connecting lines) as CSS/inline SVG patterns

## Open Questions

- Exact node count and line density — needs tuning during implementation; start conservative and increase if too sparse
- Whether reusable patterns live in `global.css` or a separate `animations.css` imported alongside it — decide during planning based on size
