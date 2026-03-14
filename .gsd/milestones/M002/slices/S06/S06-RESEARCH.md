# S06: Micro-interactions & Final Polish — Research

**Date:** 2026-03-14

## Summary

S06 is a polish and audit slice. The site already has extensive hover states on buttons (`hover:bg-ember/90`), cards (`hover:-translate-y-1 hover:shadow-xl`), and nav links (`hover:text-gold`). The `prefers-reduced-motion` media query in `global.css` globally pauses all CSS animations and disables scroll-reveal transitions. Testimonials also check reduced-motion in JS before starting auto-rotation.

The main gaps are: (1) no `focus-visible` styles for keyboard accessibility on interactive elements, (2) no `active`/press feedback on buttons, (3) Tailwind `transition-all` on cards includes `translate` transforms that should arguably be suppressed under reduced-motion, and (4) build size/performance has not been audited since S01. The work is straightforward CSS additions with no new components or JS needed.

## Recommendation

Three-task approach: (T01) Add `focus-visible` ring and `active` scale states to all buttons and interactive cards site-wide via global CSS utility classes, (T02) Audit and patch `prefers-reduced-motion` — suppress transform-based hover effects (card lift) under reduced-motion, verify all animation paths are covered, (T03) Run build size check and verify Lighthouse-relevant metrics haven't regressed vs baseline.

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---------|------------------|------------|
| Scroll animations | `ScrollReveal.astro` (S02) | Already wraps all sections; don't duplicate |
| Reduced-motion global kill | `global.css` line 210-226 | Wildcard `*` rule already pauses all CSS animations |

## Existing Code and Patterns

- `src/styles/global.css:210-226` — Reduced-motion block with wildcard animation pause, scroll-reveal disable, pipeline-pulse disable. Extend here for any new rules.
- `src/components/Testimonials.astro:99` — JS-level reduced-motion check for auto-rotation. Good pattern, already complete.
- Button pattern across site: `bg-ember hover:bg-ember/90 transition-colors` — consistent, needs `focus-visible` and `active` additions.
- Card pattern: `hover:-translate-y-1 hover:shadow-xl transition-all duration-200` — the translateY is a motion effect that should be suppressed under reduced-motion.

## Constraints

- Tailwind v4 CSS-first config — no `tailwind.config.js`, all theme in `@theme` block in `global.css`
- No new JS dependencies — CSS-only for micro-interactions
- Must not break existing Calendly `onclick` handlers on CTA buttons
- View transitions via ClientRouter already wired — don't touch

## Common Pitfalls

- **Adding focus styles that conflict with hover** — Use `focus-visible` (not `focus`) to avoid showing ring on mouse clicks
- **Over-suppressing reduced-motion** — Color transitions and opacity changes are fine; only suppress transform/movement-based effects
- **Breaking button specificity** — Global CSS additions must not override component-scoped Tailwind utility classes; use additive approach

## Open Risks

- Build size measurement has no historical baseline to compare against — can only report current size and check it's reasonable for a 6-page static site
- Lighthouse audit requires browser — contract verification can only check build output size and asset count

## Skills Discovered

| Technology | Skill | Status |
|------------|-------|--------|
| Astro | (available_skills) | none installed — not needed for CSS polish work |
| Tailwind CSS | (available_skills) | none installed — not needed |

## Sources

- S01-S05 summaries (preloaded context) — animation patterns, reduced-motion coverage, component inventory
- `global.css` lines 210-226 — existing reduced-motion implementation
- Grep of all `hover:` and `transition` usage across src/ — coverage audit
