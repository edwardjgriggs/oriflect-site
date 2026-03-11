---
id: T01
parent: S03
milestone: M001
provides:
  - antialiased global text rendering via BaseLayout body class
  - improved prose readability (font-size 1.0625rem, line-height 1.8)
  - service pipeline card hover lift (translate-y + shadow-xl)
  - ember-tinted icon background containers on pipeline cards
  - "Why Oriflect" columns converted to elevated cards with dark mode support
  - Final CTA section border-top separator
key_files:
  - src/layouts/BaseLayout.astro
  - src/styles/global.css
  - src/pages/index.astro
key_decisions:
  - none (all changes followed task plan exactly; no architectural decisions required)
patterns_established:
  - Icon containers use `inline-flex items-center justify-center w-14 h-14 bg-{color}/10 rounded-lg` pattern — reused by T02/T03 if needed
  - "Why Oriflect" card style (`bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm flex flex-col items-center text-center`) established as the card pattern for value-prop grids
observability_surfaces:
  - grep "antialiased" dist/index.html — confirms BaseLayout change in built output
  - grep "hover:-translate-y-1" dist/index.html — confirms pipeline card hover lift
  - grep "bg-ember/10" dist/index.html — confirms icon background containers
  - grep "1.0625rem" src/styles/global.css — confirms prose font-size (source check)
  - grep "dark:bg-dark-surface" dist/index.html | grep -c "rounded-xl" → 6 (Why Oriflect cards)
duration: ~10m
verification_result: passed
completed_at: 2026-03-11
blocker_discovered: false
---

# T01: Polish global CSS, BaseLayout, and Home page

**Added `antialiased` rendering globally, improved prose readability, and upgraded the Home page with service card hover lift, ember-tinted icon containers, and "Why Oriflect" card elevation.**

## What Happened

All seven steps completed without issues:

1. **BaseLayout.astro** — appended `antialiased` to the `<body>` class alongside existing `bg-ivory text-charcoal font-body dark:bg-dark-bg dark:text-dark-text min-h-screen`
2. **global.css** — added `font-size: 1.0625rem;` and changed `line-height: 1.75` → `1.8` in the `.prose p` rule
3. **index.astro pipeline cards (hover)** — replaced `hover:shadow-lg transition-shadow` with `hover:-translate-y-1 hover:shadow-xl transition-all duration-200` on all three `<a>` card elements
4. **index.astro pipeline cards (icon containers)** — replaced bare `<div class="mb-4">` with `<div class="inline-flex items-center justify-center w-14 h-14 bg-ember/10 rounded-lg mb-4">` on all three cards; SVGs kept their `w-12 h-12 text-ember` classes
5. **index.astro "Why Oriflect"** — wrapped each of the three bare `<div>` columns in `<div class="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm flex flex-col items-center text-center">`; removed `text-center` from the outer `grid` container
6. **index.astro Final CTA** — added `border-t border-white/10` to the `<section>` element
7. **Build** — `npm run build` → exit 0, 6 pages built in 899ms, no warnings

## Verification

All task-level checks passed:

```
grep "antialiased" dist/index.html              → ✅ found in <body> class
grep "hover:-translate-y-1" dist/index.html     → ✅ found (3 occurrences, all three cards)
grep "bg-ember/10" dist/index.html              → ✅ found (3 occurrences, all three icon containers)
grep "1.0625rem" src/styles/global.css          → ✅ found in .prose p rule
grep "dark:bg-dark-surface" dist/index.html | grep -c "rounded-xl"  → ✅ 6 (3 pipeline cards + 3 Why Oriflect cards)
npm run build                                   → ✅ exit 0
```

Slice-level checks applicable to T01:

```
grep "antialiased" dist/index.html              → ✅ check #2
grep "dark:bg-dark-surface" dist/index.html | grep -c "rounded-xl" → ✅ 6 ≥ 1 — check #3
grep "hover:-translate-y-1" dist/index.html     → ✅ check #4
grep "1.0625rem" src/styles/global.css          → ✅ check #10
grep -c "dark:" dist/index.html                 → ✅ 11 ≥ 10 — check #11
npm run build                                   → ✅ check #1
```

Checks #5–#9 are owned by T02/T03 (Services, About, Blog pages not yet modified).

## Diagnostics

All changes are inspectable against `dist/index.html`:
- `grep "antialiased" dist/index.html` — BaseLayout body class
- `grep "hover:-translate-y-1" dist/index.html` — pipeline card lift on all 3 cards
- `grep "bg-ember/10" dist/index.html` — icon background containers
- `grep "dark:bg-dark-surface" dist/index.html | grep -c "rounded-xl"` — Why Oriflect cards (returns 6)
- `grep "border-t border-white/10" dist/index.html` — CTA section separator
- `grep "1.0625rem" src/styles/global.css` — prose font-size (CSS vars don't appear in built HTML)

## Deviations

None. All changes followed the task plan exactly.

## Known Issues

None.

## Files Created/Modified

- `src/layouts/BaseLayout.astro` — added `antialiased` to body class
- `src/styles/global.css` — added `font-size: 1.0625rem` and changed `line-height` to `1.8` in `.prose p`
- `src/pages/index.astro` — pipeline card hover lift; ember-tinted icon containers; Why Oriflect card conversion; Final CTA border separator
