# M002: Site Enhancement v2 — Kinetic & Polished — Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

## Project Description

Transform the Oriflect website from a clean but static brochure into a dynamic, technically impressive site that visually demonstrates the company's AI expertise. Add motion, social proof, and interactive elements across all pages while keeping the existing light/dark brand scheme.

## Why This Milestone

The site currently describes what Oriflect does but doesn't demonstrate technical competence through its own design. An AI consulting company's website should make prospects think "if their website is this sharp, imagine what they'd build for my business." The site needs to shift from brochure to proof of competence.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Visit the homepage and see an animated hero with AI visual motifs, animated metrics, client results, featured blog posts, and an animated service pipeline
- Navigate between any pages and experience smooth view transitions instead of hard reloads
- Scroll any page and see content sections animate into view
- Hover cards and buttons and feel polished, satisfying micro-interactions

### Entry point / environment

- Entry point: https://oriflect.com (or localhost:4321 for dev)
- Environment: browser (desktop + mobile)
- Live dependencies involved: none (static site)

## Completion Class

- Contract complete means: `astro build` exits 0; animations render in browser; reduced-motion respected
- Integration complete means: view transitions work across all page navigations; dark mode persists across transitions
- Operational complete means: none (static site, no runtime)

## Final Integrated Acceptance

To call this milestone complete, we must prove:

- Full homepage flow: animated hero → scroll reveals → metrics count up → results showcase → service pipeline animates → blog posts → CTA — all working
- Page-to-page navigation uses smooth transitions on all routes
- `prefers-reduced-motion` disables/reduces all animations
- `astro build` exits 0, no performance regressions
- All changes pushed to origin/main

## Risks and Unknowns

- Animation library weight — adding a JS animation library could bloat the bundle for a static site. Prefer CSS animations + vanilla JS Intersection Observer where possible.
- View Transitions browser support — Astro's View Transitions API has a fallback for unsupported browsers, but dark mode state persistence across transitions needs testing.
- Canvas/WebGL performance — if hero uses canvas-based particles, mobile performance needs testing.

## Existing Codebase / Prior Art

- `src/layouts/BaseLayout.astro` — wraps all pages; dark mode init, Calendly scripts, font imports
- `src/styles/global.css` — Tailwind v4 CSS-first config with `@theme` block for brand colors
- `src/pages/index.astro` — current static homepage with hero, pipeline cards, Why Oriflect, CTA
- `src/components/Header.astro` — sticky nav, mobile menu, theme toggle
- `src/content/config.ts` — blog content collection config (Astro 5 Content Layer)
- `src/pages/blog.astro` — blog listing page (pulls from content collection)

> See `.gsd/DECISIONS.md` for all architectural and pattern decisions.

## Relevant Requirements

- R005 — Animated hero background with AI visual motifs (S01)
- R006 — Scroll-reveal animations on all pages (S02)
- R007 — Animated metrics/counters section (S02)
- R008 — Astro View Transitions between pages (S03)
- R009 — Social proof & client results showcase (S04)
- R013 — Featured blog posts on homepage (S05)
- R014 — Polished micro-interactions & hover states (S06)
- R015 — Reduced-motion accessibility support (S06)
- R016 — Interactive animated service pipeline (S05)

## Scope

### In Scope

- Animations: scroll reveals, hero background, counting metrics, service pipeline flow
- View Transitions: Astro built-in, all page routes
- Social proof: results cards, testimonial rotation
- Homepage additions: metrics section, results showcase, featured blog posts
- Micro-interactions: hover states, button feedback across all pages
- Accessibility: prefers-reduced-motion support

### Out of Scope / Non-Goals

- No content changes to existing copy (services descriptions, about page text, etc.)
- No new pages
- No backend or CMS work
- No redesign of layout structure — enhance what exists
- No heavy JS frameworks (React, Vue, etc.) — use Astro islands only if needed

## Technical Constraints

- Astro 5 static site — no SSR, no server runtime
- Tailwind CSS v4 CSS-first config — no tailwind.config.js
- Must work in both light and dark mode
- Must not break existing Calendly integration
- Must not break existing Web3Forms contact form
- Blog content collection must continue working unchanged

## Integration Points

- Astro View Transitions API — built into Astro, added via `<ViewTransitions />` in layout
- Intersection Observer API — native browser API for scroll-triggered animations
- Existing dark mode toggle — must persist across view transitions

## Open Questions

- Hero animation approach: CSS-only (keyframe shapes) vs Canvas (particles) — CSS-only is lighter but less impressive; Canvas is more impressive but heavier. Lean toward CSS with fallback.
- Animation library: vanilla CSS/JS vs a lightweight library like motion.dev — start vanilla, add library only if needed.
