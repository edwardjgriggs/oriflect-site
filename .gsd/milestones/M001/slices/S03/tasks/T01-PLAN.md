---
estimated_steps: 7
estimated_files: 3
---

# T01: Polish global CSS, BaseLayout, and Home page

**Slice:** S03 — Visual Design Polish
**Milestone:** M001

## Description

Apply the foundational and highest-impact visual changes: add `antialiased` rendering globally via BaseLayout, improve prose readability in global.css, and upgrade the Home page's most impactful components — service pipeline card hover lift, icon background containers, and "Why Oriflect" column conversion to cards. These three files are edited together because they produce a coherent visual baseline that T02 and T03 build on.

## Steps

1. **BaseLayout.astro** — Add `antialiased` to the `<body>` class string alongside existing `bg-ivory text-charcoal font-body dark:bg-dark-bg dark:text-dark-text min-h-screen`
2. **global.css** — In the `.prose p` rule, change `line-height: 1.75` to `line-height: 1.8` and add `font-size: 1.0625rem;` as a new property
3. **index.astro, pipeline cards** — For each of the three service pipeline `<a>` cards: replace `hover:shadow-lg transition-shadow` with `hover:-translate-y-1 hover:shadow-xl transition-all duration-200` in the card's class list
4. **index.astro, icon containers** — Inside each pipeline card, replace the bare `<div class="mb-4">` (icon wrapper) with `<div class="inline-flex items-center justify-center w-14 h-14 bg-ember/10 rounded-lg mb-4">` — the SVG inside keeps its `w-12 h-12 text-ember` classes
5. **index.astro, "Why Oriflect" cards** — For each of the three bare `<div>` columns inside the `grid grid-cols-1 md:grid-cols-3 gap-8 text-center` wrapper, wrap the column content in `<div class="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm flex flex-col items-center text-center">`. Remove the `text-center` from the outer grid container (it now lives in each card). Keep the icon `<div class="flex justify-center mb-4">` and heading/paragraph unchanged inside.
6. **index.astro, Final CTA section** — Add `border-t border-white/10` to the section element: `<section class="py-20 px-6 text-center border-t border-white/10" style="...">` 
7. Run `npm run build` and confirm exit 0; run the four verification greps

## Must-Haves

- [ ] `antialiased` is in the body class in BaseLayout.astro
- [ ] `.prose p` in global.css has `font-size: 1.0625rem` and `line-height: 1.8`
- [ ] All three service pipeline card `<a>` elements have `hover:-translate-y-1 hover:shadow-xl transition-all duration-200`
- [ ] All three pipeline card icon wrappers are `<div class="inline-flex items-center justify-center w-14 h-14 bg-ember/10 rounded-lg mb-4">`
- [ ] All three "Why Oriflect" columns are wrapped in card divs with `bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm`
- [ ] `astro build` exits 0 after all changes

## Verification

- `grep "antialiased" dist/index.html` → found (BaseLayout change in built output)
- `grep "hover:-translate-y-1" dist/index.html` → found (pipeline card hover)
- `grep "bg-ember/10" dist/index.html` → found (icon background containers)
- `grep "1.0625rem" src/styles/global.css` → found (source check — CSS vars don't appear in built HTML)
- `npm run build` → exit 0 (no Astro or Tailwind errors)

## Observability Impact

- Signals added/changed: none (pure static site; no runtime state changes)
- How a future agent inspects this: `grep` against `dist/index.html` for the specific new class names confirms the changes compiled into the build; `grep "1.0625rem" src/styles/global.css` confirms the prose change is in source
- Failure state exposed: if `astro build` fails, the error message names the file and line; a missing grep result identifies exactly which change is absent

## Inputs

- `src/layouts/BaseLayout.astro` — body class string to extend with `antialiased`
- `src/styles/global.css` — `.prose p` rule to extend with font-size and line-height
- `src/pages/index.astro` — service pipeline cards and "Why Oriflect" section to refactor
- S02 summary (Forward Intelligence): brand tokens are all CSS vars in `@theme`; dark mode via `.dark` class; no new color values to be added

## Expected Output

- `src/layouts/BaseLayout.astro` — body has `antialiased` in class list
- `src/styles/global.css` — `.prose p` has `font-size: 1.0625rem; line-height: 1.8;`
- `src/pages/index.astro` — pipeline card icons have ember-tinted background containers; cards have hover lift; "Why Oriflect" columns are visual cards with `dark:bg-dark-surface`
- `dist/index.html` — reflects all changes; build exits 0
