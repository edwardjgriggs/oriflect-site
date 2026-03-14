# S06: Micro-interactions & Final Polish

**Goal:** All interactive elements have polished hover/focus/active states, `prefers-reduced-motion` fully audited, and build is clean with no size regressions.
**Demo:** `astro build` exits 0; `grep` confirms focus-visible and active styles in output; reduced-motion media query suppresses all transform-based effects; build output is reasonable for a 6-page static site.

## Must-Haves

- `focus-visible` ring styles on all buttons and interactive cards
- `active` press-feedback (scale) on buttons
- `prefers-reduced-motion` suppresses card `translateY` hover effects
- `astro build` exits 0
- Build output size documented and reasonable

## Verification

- `npx astro build` exits 0
- `grep -r "focus-visible" src/styles/global.css` finds ring styles
- `grep -r "active:" src/styles/global.css` OR inline classes finds active scale
- `grep "translate" src/styles/global.css` inside `prefers-reduced-motion` block confirms transform suppression
- `du -sh dist/` reports total build size
- `grep -c "prefers-reduced-motion" src/styles/global.css` returns 1 (single consolidated block; if 0 or >1, rules are missing or fragmented)

## Tasks

- [x] **T01: Add focus-visible, active states and finalize reduced-motion coverage** `est:20m`
  - Why: Closes all micro-interaction gaps (focus, active, reduced-motion for transforms) and verifies build health
  - Files: `src/styles/global.css`, `src/pages/index.astro`
  - Do: (1) Add global `.btn-interactive` utility with `focus-visible:ring-2 ring-ember ring-offset-2` and `active:scale-[0.97]` transition, apply to CTA buttons across pages OR add rules directly in global.css targeting common button/card selectors. (2) Inside existing `prefers-reduced-motion` block, add rules to suppress `transform` and `translate` on hover for cards (`.hover\:-translate-y-1` pattern). (3) Run `npx astro build`, check exit 0, measure `du -sh dist/`.
  - Verify: `npx astro build` exits 0; grep confirms focus-visible, active, and transform suppression in reduced-motion block; build size < 5MB
  - Done when: All verification commands pass

## Observability / Diagnostics

- **Inspection:** `grep "focus-visible\|active\|translate" src/styles/global.css` confirms all three rule categories present
- **Failure visibility:** `npx astro build` will fail with exit code ≠ 0 if CSS is malformed; build output shows exact error location
- **Runtime signals:** Focus-visible ring is visually inspectable via keyboard Tab navigation in any browser; active state visible on click
- **Diagnostic check:** `grep -c "prefers-reduced-motion" src/styles/global.css` should return 1 (single consolidated block)
- **No secrets or PII involved** — pure CSS, no redaction needed

## Files Likely Touched

- `src/styles/global.css`
- `src/pages/index.astro` (minor — class additions if needed)
