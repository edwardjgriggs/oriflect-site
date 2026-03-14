# S04: Social Proof & Results Showcase

**Goal:** Homepage has animated before/after client results cards and a rotating testimonial section, all with scroll-reveal entrance animations.
**Demo:** Scrolling the homepage reveals a results showcase section with before/after metrics cards (staggered entrance) and a testimonials section with rotating quotes and dot navigation.

## Must-Haves

- `ResultsShowcase.astro` component with 3 before/after results cards showing realistic SMB AI consulting metrics
- `Testimonials.astro` component with 3 rotating quotes, auto-advance, dot navigation, and CSS transitions
- Both sections inserted on homepage between "Why Oriflect" and CTA sections
- Both sections wrapped in ScrollReveal for entrance animation
- Testimonial auto-rotation pauses under `prefers-reduced-motion`
- Testimonial interval cleaned up on `astro:before-swap` and re-initialized on `astro:page-load`
- Cards work in both light and dark mode
- `astro build` exits 0

## Verification

- `npx astro build` exits 0
- `grep -c "ResultsShowcase" src/pages/index.astro` returns 1+
- `grep -c "Testimonials" src/pages/index.astro` returns 1+
- `grep "prefers-reduced-motion" src/components/Testimonials.astro` finds the reduced-motion check
- `grep "astro:before-swap" src/components/Testimonials.astro` finds cleanup listener
- Both component files exist: `src/components/ResultsShowcase.astro`, `src/components/Testimonials.astro`

## Observability / Diagnostics

- **Testimonial rotation state**: The `[data-testimonials]` container and `[data-slide]`/`[data-dot]` attributes are inspectable via DOM. The active slide has `opacity-100`; inactive slides have `opacity-0 pointer-events-none`. Active dot has `bg-ember` class.
- **Reduced-motion behavior**: When `prefers-reduced-motion: reduce` is active, auto-rotation does not start. Verifiable by toggling the media query in DevTools and confirming no interval fires (no class changes on slides after 5s).
- **Interval cleanup**: On `astro:before-swap`, the interval is cleared via `stopAutoRotation`. If cleanup fails, stale intervals would cause console errors on swapped-out DOM (slides no longer in document). Absence of such errors confirms correct cleanup.
- **ScrollReveal entrance**: Elements with `[data-reveal]` gain `.revealed` class when intersecting viewport at 10% threshold. Unrevealed elements remain at `opacity: 0`.
- **Failure visibility**: If testimonial JS fails to initialize (e.g., `[data-testimonials]` missing), all slides except the first remain hidden via initial server-rendered classes — graceful degradation to showing only the first quote.

## Verification

- `npx astro build` exits 0
- `grep -c "ResultsShowcase" src/pages/index.astro` returns 1+
- `grep -c "Testimonials" src/pages/index.astro` returns 1+
- `grep "prefers-reduced-motion" src/components/Testimonials.astro` finds the reduced-motion check
- `grep "astro:before-swap" src/components/Testimonials.astro` finds cleanup listener
- Both component files exist: `src/components/ResultsShowcase.astro`, `src/components/Testimonials.astro`
- DOM inspection: `document.querySelectorAll('[data-slide]').length === 3` confirms all testimonial slides rendered

- [x] **T01: Build ResultsShowcase and Testimonials components and wire into homepage** `est:35m`
  - Why: This is the entire slice — two components plus homepage integration. The components are independent Astro files with no complex interactions requiring separate tasks.
  - Files: `src/components/ResultsShowcase.astro`, `src/components/Testimonials.astro`, `src/pages/index.astro`
  - Do: Create ResultsShowcase with 3 CSS-grid cards (before → after format, muted left/highlighted right with ember accent, staggered ScrollReveal delays). Create Testimonials with 3 rotating quotes using setInterval + CSS opacity transitions, dot navigation, astro:before-swap cleanup, astro:page-load re-init, and prefers-reduced-motion pause. Insert both between Why Oriflect and CTA on homepage wrapped in ScrollReveal. Use established card pattern (bg-white dark:bg-dark-surface rounded-xl p-8 shadow-md).
  - Verify: `npx astro build` exits 0; grep confirms both components on homepage; grep confirms reduced-motion and swap listeners in Testimonials
  - Done when: Build passes, both sections render on homepage, testimonial rotation has accessibility and view-transition guards

## Files Likely Touched

- `src/components/ResultsShowcase.astro`
- `src/components/Testimonials.astro`
- `src/pages/index.astro`
