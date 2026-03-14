---
estimated_steps: 6
estimated_files: 8
---

# T01: Build ScrollReveal & MetricsCounter components and apply across all pages

**Slice:** S02 — Scroll Reveal & Metrics Animations
**Milestone:** M002

## Description

Create the two reusable animation components (ScrollReveal wrapper and MetricsCounter), add supporting CSS with reduced-motion and no-JS fallbacks, insert a metrics section on the homepage, and wrap all page sections with scroll-reveal animations.

## Steps

1. Create `src/components/ScrollReveal.astro` — slot-based wrapper that adds `data-reveal` attribute; inline `<script>` creates a single IntersectionObserver (threshold 0.1) that adds `.revealed` class on first intersection then unobserves. Support optional `direction` prop (up/left/right) and `delay` prop.
2. Add scroll-reveal CSS to `src/styles/global.css` — `.scroll-reveal` base class (opacity:0, translateY(20px), transition 0.6s ease-out), `.scroll-reveal.revealed` (opacity:1, translateY(0)). Add direction variants. Add `prefers-reduced-motion` rule that sets `transition: none` and makes elements visible by default. Add `<noscript>` fallback approach.
3. Create `src/components/MetricsCounter.astro` — accepts `value` (number), `suffix` (string), `label` (string). Renders the number in a `<span data-count-to="N">0</span>`. Inline script uses IntersectionObserver + rAF to count from 0 to target over ~2 seconds with ease-out. Unobserves after completion.
4. Add metrics section to `src/pages/index.astro` between Service Pipeline and Why Oriflect — 4 metrics (e.g., "50+ Audits Completed", "3x Average ROI", "85% Time Saved", "100% Client Satisfaction"). Each metric uses MetricsCounter inside a styled card. Whole section wrapped in ScrollReveal.
5. Wrap existing sections on all pages (index, about, services, contact, blog) with `<ScrollReveal>`. Skip the hero section on homepage. Use staggered delays where multiple cards appear in a row.
6. Run `npx astro build` and fix any issues.

## Must-Haves

- [ ] ScrollReveal.astro exists with single shared IntersectionObserver
- [ ] MetricsCounter.astro exists with rAF count-up animation
- [ ] Scroll-reveal CSS in global.css with prefers-reduced-motion disable
- [ ] Metrics section on homepage between Service Pipeline and Why Oriflect
- [ ] All pages have ScrollReveal-wrapped sections
- [ ] No-JS fallback ensures content is visible without JavaScript
- [ ] `astro build` exits 0

## Verification

- `npx astro build` exits 0
- `grep -r "ScrollReveal" src/pages/` shows all 5 page files
- `grep "MetricsCounter" src/pages/index.astro` shows metrics usage
- `grep "prefers-reduced-motion" src/styles/global.css` includes transition rule
- Components exist: `ls src/components/ScrollReveal.astro src/components/MetricsCounter.astro`

## Inputs

- `src/styles/global.css` — existing animation keyframes and reduced-motion rule from S01
- `src/pages/index.astro` — current 4-section homepage layout
- `src/components/HeroAnimation.astro` — S01 pattern reference for component structure

## Expected Output

- `src/components/ScrollReveal.astro` — reusable scroll-reveal wrapper (boundary contract for S04, S05, S06)
- `src/components/MetricsCounter.astro` — animated counter component
- `src/styles/global.css` — extended with scroll-reveal classes and reduced-motion transition rule
- `src/pages/index.astro` — now 5 sections with metrics and scroll-reveal
- `src/pages/about.astro`, `services.astro`, `contact.astro`, `blog.astro` — sections wrapped with ScrollReveal

## Observability Impact

- **New DOM signals:** `[data-reveal]` attributes on all scroll-reveal wrappers; `.revealed` class added on intersection. `[data-count-to]` on counter spans with final value as attribute.
- **Inspection:** `document.querySelectorAll('[data-reveal]:not(.revealed)').length` shows how many elements haven't been revealed yet. Should reach 0 after full page scroll.
- **Failure state:** If JS fails to load, `<noscript>` style block on each page forces visibility. If IntersectionObserver unavailable, elements stay hidden but reduced-motion media query makes them visible for users who need it.
- **Build signal:** `npx astro build` exit 0 confirms all component imports and template syntax are valid.
