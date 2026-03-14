---
id: M002
provides:
  - Animated hero background with floating AI-themed nodes and SVG connecting lines
  - Scroll-reveal animations on all 5 pages via reusable ScrollReveal component
  - Animated metrics counters section (50+ Audits, 3x ROI, 85% Time Saved, 100% Satisfaction)
  - Astro View Transitions (ClientRouter) with dark mode persistence across navigations
  - Social proof sections — before/after results cards and rotating testimonials
  - Animated service pipeline with CSS pulse animation on connector arrows
  - Featured blog posts section on homepage
  - Global focus-visible rings, active press feedback, and comprehensive prefers-reduced-motion coverage
key_decisions:
  - D007: Single shared IntersectionObserver per component type for performance
  - D010: astro:page-load for script re-init after view transitions; astro:after-swap for pre-paint state
  - D011: CSS opacity transitions for testimonial slides (not JS animation)
  - D013: CSS-only pipeline-pulse keyframe (no JS needed)
  - D014: Homepage order — hero → pipeline → metrics → results → testimonials → why oriflect → blog → CTA
  - D015: Global CSS selectors for focus/active states rather than per-component
patterns_established:
  - Animation layers use position:absolute + inset:0 + pointer-events:none + z-index:0
  - ScrollReveal wrapper with direction/delay props for consistent entrance animations
  - astro:page-load for interactive script re-binding after view transitions
  - astro:after-swap for pre-paint DOM state restoration (dark mode, menu close)
  - prefers-reduced-motion handled globally in consolidated CSS block
observability_surfaces:
  - "[data-reveal]" DOM attribute on scroll-reveal wrappers; ".revealed" class added on intersection
  - "[data-count-to]" attribute on counter spans confirms metrics rendering
  - "grep focus-visible|active|translate src/styles/global.css" confirms interaction styles
  - "npx astro build" exit code confirms all imports and templates valid
requirement_outcomes:
  - id: R005
    from_status: active
    to_status: active
    proof: Hero animation, social proof sections, hover states all implemented; awaits visual UAT for validation
  - id: R006
    from_status: active
    to_status: active
    proof: ScrollReveal applied to all 5 pages; contract-verified via grep
  - id: R007
    from_status: active
    to_status: active
    proof: 4 MetricsCounter instances on homepage; count-up animation implemented
  - id: R008
    from_status: active
    to_status: active
    proof: ClientRouter in BaseLayout; dark mode persists via astro:after-swap
  - id: R009
    from_status: active
    to_status: active
    proof: ResultsShowcase and Testimonials components on homepage
  - id: R013
    from_status: active
    to_status: active
    proof: FeaturedPosts component renders blog collection on homepage
  - id: R014
    from_status: active
    to_status: active
    proof: Global focus-visible rings and active scale in global.css
  - id: R015
    from_status: active
    to_status: active
    proof: Consolidated prefers-reduced-motion block covers all animations
  - id: R016
    from_status: active
    to_status: active
    proof: pipeline-arrow-pulse class applied to pipeline arrows with CSS keyframe
duration: ~45m
verification_result: passed
completed_at: 2026-03-14
---

# M002: Site Enhancement v2 — Kinetic & Polished

**Transformed the Oriflect website from a static brochure into a dynamic, animated experience with scroll reveals, view transitions, social proof sections, and polished micro-interactions across all pages.**

## What Happened

Six slices built incrementally on each other to add motion and polish across the entire site:

**S01** established the animation foundation — a `HeroAnimation.astro` component with 15 floating CSS-animated nodes and 4 SVG connecting lines evoking neural network imagery, plus reusable `@keyframes float` and `pulse-line` in `global.css`.

**S02** created the `ScrollReveal.astro` wrapper (IntersectionObserver-based fade/slide entrance) and `MetricsCounter.astro` (rAF count-up animation), applying scroll-reveal to all 5 pages and adding a 4-counter metrics section to the homepage.

**S03** wired Astro's `ClientRouter` for smooth cross-fade page transitions, with `astro:after-swap` dark mode persistence and script re-initialization patterns (`astro:page-load`) for the theme toggle and mobile menu.

**S04** added social proof — `ResultsShowcase.astro` (3 before/after metrics cards) and `Testimonials.astro` (auto-rotating quotes with dot navigation, reduced-motion guard, and view-transition cleanup).

**S05** animated the service pipeline with CSS pulse on connector arrows, created `FeaturedPosts.astro` for blog cards, and reordered homepage sections to the final flow: hero → pipeline → metrics → results → testimonials → why oriflect → blog → CTA.

**S06** added global focus-visible rings, active press feedback (scale), and consolidated the `prefers-reduced-motion` block to cover all animations including Tailwind translate hovers.

## Cross-Slice Verification

| Success Criterion | Evidence | Status |
|---|---|---|
| Homepage hero has animated background with AI-themed visual motifs | `HeroAnimation.astro` renders 15 nodes + 4 SVG lines; `grep -c "hero-animation" src/pages/index.astro` → 2 | ✅ |
| Every page has scroll-reveal animations | `grep -rl "ScrollReveal" src/pages/` → 5 pages | ✅ |
| Page navigation uses smooth Astro View Transitions | `ClientRouter` in BaseLayout; `astro:after-swap` dark mode persistence | ✅ |
| Homepage includes animated metrics counters | 4 `MetricsCounter` instances in index.astro | ✅ |
| Homepage includes client results showcase | `ResultsShowcase` imported and rendered | ✅ |
| Homepage includes featured blog posts | `FeaturedPosts` imported and rendered | ✅ |
| Service pipeline animates as connected flow | `pipeline-arrow-pulse` class on arrow divs | ✅ |
| All interactive elements have polished hover/press states | Global focus-visible + active scale in global.css | ✅ |
| All animations respect `prefers-reduced-motion` | Consolidated media query block in global.css covers all animations | ✅ |
| `astro build` exits 0 | 6 pages built in 991ms, exit 0 | ✅ |
| Dark mode persists across transitions | `astro:after-swap` reads localStorage and applies `.dark` before paint | ✅ |
| All 6 slices complete with summaries | All 6 S*-SUMMARY.md files exist | ✅ |

## Requirement Changes

All M002 requirements (R005–R009, R013–R016) remain **active** — all features are implemented and contract-verified via build + grep, but none are formally validated because they require visual/browser UAT confirmation. No requirement status transitions occurred during this milestone.

## Forward Intelligence

### What the next milestone should know
- The homepage now has 8 sections in a specific order (D014) — any additions should consider placement carefully
- All interactive scripts use `astro:page-load` pattern — new interactive components must follow this
- ScrollReveal is the standard entrance animation wrapper — just wrap any new section with `<ScrollReveal direction="up">`

### What's fragile
- Hero node positioning is hardcoded inline — significant hero height changes could cause visual issues
- Noscript style blocks are duplicated across 5 pages — class name changes require updating all pages
- `*[class*="hover:-translate"]` reduced-motion selector depends on Tailwind's class naming convention
- FeaturedPosts assumes sorted array from `getCollection('blog')` with no TypeScript validation
- ThemeToggle event delegation relies on `#theme-toggle-btn` ID — silent failure if renamed

### Authoritative diagnostics
- `npx astro build` — catches all import, template, and compilation errors
- `grep -r "ScrollReveal\|ClientRouter\|MetricsCounter" src/` — confirms component wiring
- `grep "prefers-reduced-motion\|focus-visible\|:active" src/styles/global.css` — confirms interaction styles
- Browser DevTools → Rendering → Emulate prefers-reduced-motion: reduce → all elements immediately visible

### What assumptions changed
- No assumptions changed — all 6 slices executed as planned without deviations

## Files Created/Modified

- `src/components/HeroAnimation.astro` — animated hero background with floating nodes and SVG lines
- `src/components/ScrollReveal.astro` — reusable scroll-triggered animation wrapper
- `src/components/MetricsCounter.astro` — animated counting number component
- `src/components/ResultsShowcase.astro` — before/after client results cards
- `src/components/Testimonials.astro` — rotating testimonial section
- `src/components/FeaturedPosts.astro` — blog post card grid for homepage
- `src/components/ThemeToggle.astro` — converted to view-transition-safe script pattern
- `src/components/Header.astro` — converted to view-transition-safe script pattern
- `src/layouts/BaseLayout.astro` — added ClientRouter and dark mode persistence
- `src/pages/index.astro` — hero animation, metrics, results, testimonials, pipeline animation, blog, section reorder
- `src/pages/about.astro` — scroll-reveal wrapping
- `src/pages/services.astro` — scroll-reveal wrapping
- `src/pages/contact.astro` — scroll-reveal wrapping
- `src/pages/blog.astro` — scroll-reveal wrapping
- `src/styles/global.css` — keyframes, scroll-reveal CSS, pipeline-pulse, focus-visible, active states, reduced-motion
