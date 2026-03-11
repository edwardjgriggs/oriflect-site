---
estimated_steps: 4
estimated_files: 2
---

# T02: Polish Services and About pages

**Slice:** S03 — Visual Design Polish
**Milestone:** M001

## Description

Apply targeted visual improvements to `services.astro` and `about.astro`. On Services, the alternating-background sections feel abrupt — adding a subtle `border-t` divider to non-first sections creates segmentation without breaking the established bg-ivory/bg-sapphire-tint alternation. On About, the founder photo lacks intentional framing — a gold ring treatment makes it feel more composed. The Core Values grid items are bare icon+text columns — converting them to cards with white/dark-surface backgrounds matches the premium visual language established by T01's "Why Oriflect" card conversion.

## Steps

1. **services.astro, section dividers** — Add `border-t border-sapphire/10 dark:border-white/5` to the opening `<section>` tag for the AI Implementation section (`id="implementation"`) and the Staff Training section (`id="training"`). Do NOT add to the first Audit section (it follows the page header banner directly) or the closing CTA section (it uses `bg-sapphire` and needs no border).
2. **about.astro, founder photo ring** — Update the `<img>` tag's class: replace `rounded-xl shadow-lg` with `rounded-xl shadow-lg ring-2 ring-gold ring-offset-2 ring-offset-ivory dark:ring-offset-dark-bg`. The `ring-offset-dark-bg` handles dark mode so the ring is always visible against the section background.
3. **about.astro, Core Values cards** — Inside the `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 text-center` container, wrap each bare `<div>` column's inner content in `<div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm flex flex-col items-center text-center">`. Keep the SVG icon and headings/paragraphs unchanged inside. Remove `text-center` from the outer grid div (it migrates into each card).
4. Run `npm run build` and confirm exit 0; run the verification greps

## Must-Haves

- [ ] `border-t border-sapphire/10 dark:border-white/5` present on Implementation and Training sections in services.astro
- [ ] Audit section and closing CTA section do NOT get the border treatment
- [ ] Founder photo `<img>` has `ring-2 ring-gold ring-offset-2 ring-offset-ivory dark:ring-offset-dark-bg` in its class
- [ ] Each of the four Core Values items is wrapped in a card with `bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm`
- [ ] All new dark-mode-affecting classes have paired `dark:` variants
- [ ] `astro build` exits 0 after all changes

## Verification

- `grep "border-sapphire" dist/services/index.html` → found (section divider)
- `grep "dark:border-white" dist/services/index.html` → found (dark mode divider variant)
- `grep "ring-gold" dist/about/index.html` → found (photo ring)
- `grep "dark:ring-offset-dark-bg" dist/about/index.html` → found (dark ring offset)
- `grep -c "dark:bg-dark-surface" dist/about/index.html` → ≥ 4 (at least 4 card wrappers; mission section already uses dark-surface, so count may be higher — ≥ 4 confirms cards were added)
- `npm run build` → exit 0

## Observability Impact

- Signals added/changed: none (static site; no runtime state)
- How a future agent inspects this: greps against built HTML confirm class names compiled through Tailwind v4 into the output; source file review confirms dark mode pairing
- Failure state exposed: if `ring-gold` is absent from built output, it means the class wasn't used in the Astro template (Tailwind v4 scans templates for used classes); if border is missing, the section element wasn't updated

## Inputs

- `src/pages/services.astro` — current section markup with `id="implementation"` and `id="training"` section elements
- `src/pages/about.astro` — current `<img>` tag with `rounded-xl shadow-lg`; Core Values 4-col grid with bare `<div>` columns
- T01 complete: baseline confirmed that `astro build` passes after global CSS and Home page changes — T02 builds on that clean state

## Expected Output

- `src/pages/services.astro` — Implementation and Training sections have `border-t border-sapphire/10 dark:border-white/5`
- `src/pages/about.astro` — founder photo has gold ring frame; Core Values items are rounded cards with `bg-white dark:bg-dark-surface`
- `dist/services/index.html` and `dist/about/index.html` — reflect all changes; build exits 0
