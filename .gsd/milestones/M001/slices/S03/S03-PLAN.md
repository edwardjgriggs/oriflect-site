# S03: Visual Design Polish

**Goal:** Apply a focused visual polish pass across all five site pages (Home, Services, About, Blog listing, Blog post) using only existing brand tokens and Tailwind utility classes, so the site feels noticeably more premium without introducing new dependencies or color values.

**Demo:** A visitor navigating from `/` → `/services` → `/about` → `/blog` → a post page sees:
- Service pipeline cards lift on hover; "Why Oriflect" items are contained cards with icon backgrounds
- Services page sections have visual segmentation via top-border dividers
- About founder photo has a gold-ring frame; Core Values items are elevated cards
- Blog listing cards display tag pills and a stronger hover state
- Blog post prose is larger and better-spaced; description text uses the accent font
- `antialiased` rendering applied globally via `BaseLayout.astro`
- `astro build` exits 0 with no regressions; dark mode works correctly on all new UI

## Must-Haves

- `BaseLayout.astro` body element has `antialiased` for improved global text rendering
- `index.astro` "Why Oriflect" columns converted to cards with icon background circles
- `index.astro` service pipeline card icons wrapped in ember-tinted background containers
- `index.astro` service pipeline cards have hover lift (`hover:-translate-y-1 hover:shadow-xl transition-all duration-200`)
- `services.astro` non-first sections have `border-t border-sapphire/10 dark:border-white/5` for visual segmentation
- `about.astro` founder photo wrapped in a gold `ring-2 ring-gold ring-offset-2` frame
- `about.astro` Core Values items converted to cards (`bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm`)
- `blog.astro` post cards display tag pills when `post.data.tags` is non-empty
- `blog.astro` post card hover state improved with border color change (`hover:border-sapphire/30 dark:hover:border-sapphire-tint/30`)
- `blog/[slug].astro` post description text uses `font-accent italic` for typographic distinction
- `global.css` prose base font size increased to `1.0625rem` (17px) with improved line-height
- Every new color-affecting class has a paired `dark:` variant
- `astro build` exits 0 after all changes

## Proof Level

- This slice proves: **integration** — all page changes build correctly together with the existing content collections, BaseLayout, and dark mode system
- Real runtime required: no (build output is sufficient for contract verification; human UAT is a bonus)
- Human/UAT required: no (build exit 0 + grep checks prove all changes are in built output)

## Verification

All checks are executable against the built `dist/` output:

```bash
# 1. Build exits 0
npm run build 2>&1 | tail -5
# → exit 0

# 2. antialiased class on body in any built page
grep "antialiased" dist/index.html
# → found

# 3. Why Oriflect card wrapper in built home page
grep "dark:bg-dark-surface" dist/index.html | grep -c "rounded-xl"
# → ≥ 1 (card wrappers present)

# 4. Hover lift class on pipeline cards
grep "hover:-translate-y-1" dist/index.html
# → found

# 5. Services section border divider
grep "border-sapphire" dist/services/index.html
# → found

# 6. Founder photo ring
grep "ring-gold" dist/about/index.html
# → found

# 7. About values card wrapper
grep "dark:bg-dark-surface" dist/about/index.html
# → found in values section

# 8. Blog listing tag pills
grep "post\.data\.tags" src/pages/blog.astro   # (source check)
# → found

# 9. Blog post description uses font-accent
grep "font-accent" dist/blog/ai-for-smbs-what-actually-works/index.html
# → found

# 10. Prose font-size tweak in global.css (source check)
grep "1.0625rem" src/styles/global.css
# → found

# 11. Dark mode classes present across all modified pages
grep -c "dark:" dist/index.html      # → ≥ 10
grep -c "dark:" dist/about/index.html # → ≥ 10
grep -c "dark:" dist/blog/index.html  # → ≥ 5
```

## Observability / Diagnostics

- Runtime signals: `astro build` structured output; Zod schema errors name file+field on any frontmatter issue
- Inspection surfaces:
  - `npm run build 2>&1 | grep -i "error\|warn"` — detect any build-time CSS/Astro errors
  - `grep "antialiased" dist/index.html` — confirms BaseLayout change is in built output
  - `grep "ring-gold" dist/about/index.html` — confirms photo ring class persisted through build
  - `grep "font-accent" dist/blog/*/index.html` — confirms description styling in post pages
  - `grep -c "dark:" dist/index.html` — ensures dark mode variants weren't dropped
- Failure visibility: if `astro build` fails, error message identifies file and line; if grep checks find nothing, the specific missing element is named
- Redaction constraints: none (no secrets or PII involved)

## Integration Closure

- Upstream surfaces consumed:
  - `src/layouts/BaseLayout.astro` — body class string (adding `antialiased`)
  - `src/pages/index.astro` — existing service card and "Why Oriflect" section markup
  - `src/pages/services.astro` — existing alternating-bg section markup
  - `src/pages/about.astro` — existing founder photo `<img>` and Core Values grid
  - `src/pages/blog.astro` — existing post card structure; `post.data.tags` already in schema
  - `src/pages/blog/[slug].astro` — existing post header description element
  - `src/styles/global.css` — existing `.prose` block
- New wiring introduced in this slice:
  - `antialiased` utility class wired into BaseLayout body (affects all pages globally)
  - Tag pill rendering wired from `post.data.tags` (already in Content Layer schema) into blog listing cards
  - Icon background containers wired into existing SVG icon wrappers on `index.astro`
  - Prose font-size override added directly to `.prose p` block in `global.css`
- What remains before the milestone is truly usable end-to-end:
  - Squash-merge `gsd/M001/S03` → main and push to origin (R004 closure for this slice)
  - That push completes the milestone (S01 + S02 + S03 all on main)

## Tasks

- [x] **T01: Polish global CSS, BaseLayout, and Home page** `est:30m`
  - Why: Global text rendering (`antialiased`), prose readability improvements, and the Home page's most impactful changes (service card hover lift, icon backgrounds, "Why Oriflect" card conversion) are all foundational and can be verified together with a single build.
  - Files: `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/pages/index.astro`
  - Do:
    1. Add `antialiased` to the `<body>` class in `BaseLayout.astro`
    2. In `global.css`, increase `.prose p` `font-size` to `1.0625rem` and set `line-height: 1.8`
    3. In `index.astro`, wrap each pipeline card's icon `<div class="mb-4">` SVG in a `<div class="inline-flex items-center justify-center w-14 h-14 bg-ember/10 rounded-lg mb-4">` container (remove the original `mb-4` outer div)
    4. Add `hover:-translate-y-1 hover:shadow-xl transition-all duration-200` to each pipeline card's `<a>` tag (alongside existing `hover:shadow-lg transition-shadow` — replace those two with the new set)
    5. In the "Why Oriflect" section, wrap each `<div>` column in `<div class="bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm flex flex-col items-center text-center">` — remove the bare outer `<div>` and adjust icon/text margins accordingly
    6. Add `border-t border-white/10` to the Final CTA section element
    7. Run `npm run build` and verify exit 0
  - Verify:
    - `grep "antialiased" dist/index.html` → found
    - `grep "hover:-translate-y-1" dist/index.html` → found
    - `grep "bg-ember/10" dist/index.html` → found (icon background)
    - `grep "1.0625rem" src/styles/global.css` → found
    - `npm run build` → exit 0
  - Done when: `astro build` exits 0 and all four grep checks pass

- [x] **T02: Polish Services and About pages** `est:30m`
  - Why: Services and About share the same alternating-section structure and both have targeted, non-overlapping opportunities: services needs section dividers, about needs the founder photo ring and values card conversion. Grouping them keeps T01 and T03 at clean boundaries.
  - Files: `src/pages/services.astro`, `src/pages/about.astro`
  - Do:
    1. In `services.astro`, add `border-t border-sapphire/10 dark:border-white/5` to the section element for Section 2 (Implementation) and Section 3 (Training) — not the first section after the page header, not the closing CTA
    2. In `about.astro`, update the founder `<img>` class: replace `rounded-xl shadow-lg` with `rounded-xl shadow-lg ring-2 ring-gold ring-offset-2 ring-offset-ivory dark:ring-offset-dark-bg`
    3. In `about.astro`, convert each Core Values `<div>` (the four bare divs inside the 4-col grid) to cards: wrap their content with `<div class="bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm flex flex-col items-center text-center">` — remove `text-center` from the grid container since it moves into each card
    4. Run `npm run build` and verify exit 0
  - Verify:
    - `grep "border-sapphire" dist/services/index.html` → found
    - `grep "dark:border-white" dist/services/index.html` → found
    - `grep "ring-gold" dist/about/index.html` → found
    - `grep "dark:bg-dark-surface" dist/about/index.html` → found (values cards)
    - `npm run build` → exit 0
  - Done when: `astro build` exits 0 and all four grep checks pass

- [x] **T03: Polish Blog listing and post pages, verify build, commit** `est:30m`
  - Why: Blog pages are the last surface to polish. This task also owns final slice verification, build sign-off, and the git commit that closes S03.
  - Files: `src/pages/blog.astro`, `src/pages/blog/[slug].astro`
  - Do:
    1. In `blog.astro`, add tag pill rendering inside the `<article>` element, after the `<p>` date element and before the description: `{post.data.tags && post.data.tags.length > 0 && (<div class="flex flex-wrap gap-2 mb-3">{post.data.tags.map((tag) => (<span class="inline-block px-2 py-0.5 text-xs font-body font-semibold uppercase tracking-wider bg-sapphire/10 dark:bg-sapphire-tint/10 text-sapphire dark:text-sapphire-tint rounded-full">{tag}</span>))}</div>))}`
    2. In `blog.astro`, add hover border to the `<li>` card element: add `hover:border-sapphire/30 dark:hover:border-sapphire-tint/30 transition-colors` alongside existing `hover:shadow-md transition-shadow`
    3. In `blog/[slug].astro`, update the description `<p>` in the post header: add `font-accent italic` to its class (keep existing `font-body text-white/80 text-lg mt-4 max-w-2xl mx-auto leading-relaxed` — replace `font-body` with `font-accent italic`)
    4. Run full slice verification suite:
       - `npm run build` → exit 0
       - `grep "font-accent" dist/blog/ai-for-smbs-what-actually-works/index.html` → found
       - `grep "antialiased" dist/index.html` → found (T01 regression check)
       - `grep "ring-gold" dist/about/index.html` → found (T02 regression check)
       - `grep -c "dark:" dist/index.html` → ≥ 10
    5. Commit: `git add -A && git commit -m "feat(M001/S03): visual design polish — antialiased, card elevation, tag pills, photo ring, prose improvements"`
  - Verify:
    - `npm run build` → exit 0
    - `grep "font-accent" dist/blog/ai-for-smbs-what-actually-works/index.html` → found
    - `grep "tracking-wider" dist/blog/index.html` → found (tag pill classes in listing)
    - `git log --oneline -1` → shows S03 commit message
  - Done when: `astro build` exits 0, all grep checks pass, S03 commit exists on branch

## Files Likely Touched

- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/services.astro`
- `src/pages/about.astro`
- `src/pages/blog.astro`
- `src/pages/blog/[slug].astro`
