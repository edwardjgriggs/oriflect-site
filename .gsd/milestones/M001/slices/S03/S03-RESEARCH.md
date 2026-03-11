# S03: Visual Design Polish — Research

**Date:** 2026-03-11
**Slice:** M001/S03
**Branch:** gsd/M001/S03

## Summary

S03 is a pure visual quality pass — no new pages, no new dependencies, no structural changes. The site has solid bones: a complete Tailwind v4 CSS-first token system, four working brand fonts (Montserrat/Inter/Playfair Display/JetBrains Mono), and consistent dark mode coverage. The build is clean (6 pages, exit 0). What it lacks is design distinction — the pages feel functionally correct but visually flat.

The main opportunities are: (1) the Hero section on the home page is competent but lacks layered depth — it can be sharpened with better typographic hierarchy and stronger visual containment; (2) the Service Pipeline cards have no hover elevation or icon treatment that feels premium; (3) the blog listing cards are plain white boxes with minimal visual personality — surfacing tags and improving date contrast would help; (4) the blog post prose reading experience could benefit from improved base size and vertical rhythm; (5) section transitions across all pages are abrupt — alternating ivory/sapphire-tint is fine but lacks bridging detail.

The approach is additive and safe: layer in improved spacing, typography scale, component detail, and micro-interactions using only existing Tailwind utility classes and brand tokens already in `global.css`. No new npm packages. No new color values. All changes must carry `dark:` variants.

## Recommendation

Apply a focused polish pass in two layers:
1. **Global / CSS** — small additions to `global.css` for improved prose reading (larger base, tighter max-width) and `antialiased` on the body. Keep additions minimal.
2. **Per-page improvements** — targeted surgical edits to each page's Astro file: Home (card hover elevation, icon containment, "Why Oriflect" cards), Services (section separators), About (founder photo ring, values grid → cards), Blog listing (tag pills on cards, hover border), Blog post (prose font size, description accent font).

The entire S03 should be completable in 3 focused tasks: one for global CSS + home page, one for services + about, one for blog listing + blog post + build verification + commit.

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---------|------------------|------------|
| Dark mode toggle | Already in `ThemeToggle.astro` + localStorage | No change needed — fully working |
| Font loading | `@fontsource-variable/*` in `BaseLayout.astro` | All 4 brand fonts available by CSS variable already |
| Prose markdown styling | `.prose` block in `global.css` | Extend in-place rather than adding new blocks |
| Brand token access | `@theme` block in `global.css` (`var(--color-*)`, `var(--font-*)`) | All tokens ready; use them in `style=` attrs or extend `.prose` |
| Tailwind dark mode | `@custom-variant dark (&:where(.dark, .dark *))` in `global.css` | Use `dark:` prefix; always test both modes |

## Existing Code and Patterns

- `src/styles/global.css` — Tailwind v4 CSS-first `@theme` block defines all brand tokens. The `.prose` block (20 selectors + 8 dark overrides) is the established pattern for custom CSS beyond utilities. Any new CSS classes added here follow the same structure: plain selector + `.dark` override.
- `src/pages/index.astro` — Home page. Hero uses inline `style="background: linear-gradient(135deg, #0A2463 0%, #1A3A7A 100%)"` — this is the established pattern for gradient backgrounds (Tailwind v4 doesn't support arbitrary gradient stops cleanly). CTA buttons use `bg-ember hover:bg-ember/90` — the hover opacity pattern is established. The "Why Oriflect" section icons are bare (no background circle), which is the key polish opportunity here.
- `src/pages/services.astro` — Three service sections alternate `bg-ivory dark:bg-dark-bg` and `bg-sapphire-tint dark:bg-dark-surface`. Step timelines use ember-numbered circles + gold border connectors. Deliverable lists use ember checkmarks. The pattern is established and should be polished, not replaced.
- `src/pages/about.astro` — Founder section: photo left / bio right in a 2-col grid. Photo is `rounded-xl shadow-lg` — adding a `ring` frame would look more intentional. Mission section uses `font-accent` (Playfair Display italic) for the mission statement — the only use of the accent font on this page. Values section: 4-col icon grid with ember icons and no background — wrapping in cards is the main opportunity.
- `src/pages/blog.astro` — Post listing: white card (`bg-white dark:bg-dark-surface`) with `rounded-xl shadow-sm border border-ivory`. Tags from post frontmatter are NOT currently displayed on the listing page — they only appear on the individual post header. Displaying them here is an easy, high-value polish win.
- `src/pages/blog/[slug].astro` — Post header: full-width sapphire banner with centered title, date, description, and tag pills. Post body: `.prose dark:prose-dark` wrapper. Back link with `border-t` separator. The `dark:prose-dark` class is custom (not Tailwind Typography) — references `.dark .prose` in `global.css`.
- `src/layouts/BaseLayout.astro` — Body: `bg-ivory text-charcoal font-body dark:bg-dark-bg dark:text-dark-text`. No `antialiased` class — adding it would improve text rendering globally at no cost.
- `src/components/Header.astro` — Sticky sapphire nav. Active page state is not highlighted — out of scope for S03 but noted.
- `src/components/Footer.astro` — Sapphire bg, 3-col grid (brand / contact / social). Simple and clean; no major polish opportunity.

## Constraints

- **Tailwind v4 CSS-first only** — no `tailwind.config.js`. All extensions go in `global.css` via `@theme` or plain CSS classes. Arbitrary value syntax (`text-[#abc]`) works but brand tokens should be used instead.
- **No new npm packages** — project has all fonts and Tailwind. No `@tailwindcss/typography`, no animation libraries, no icon packs.
- **Preserve all brand tokens** — do not add new color values to `@theme`. Polish within the existing palette: sapphire, gold, ember, charcoal, ivory, sapphire-tint, gold-tint, dark-bg, dark-surface, dark-text.
- **All new UI must have dark mode variants** — every new class that affects color, border, or background must have a paired `dark:` class.
- **BaseLayout structure must not change** — Header → main slot → Footer is locked.
- **`dark:prose-dark` class must not be removed** — it activates `.dark .prose` selectors in `global.css`. If the prose wrapper class changes, update both the `.astro` file and `global.css` in tandem.
- **`post.id` is the slug** — `[slug].astro` uses `post.id`. Never change to `post.slug` (Astro v4 pattern, does not exist in Astro 5 Content Layer).
- **Inline gradient `style=` on hero sections** — Tailwind v4 doesn't support arbitrary gradient stops as utility classes cleanly. The inline style pattern for the hero gradient is correct; replicate it if adding more gradient sections.
- **`astro build` must exit 0** — verify after every significant change; Zod schema validation runs at build time.

## Specific Polish Opportunities by Page

### Home (`index.astro`)
- **Service cards:** Add `hover:-translate-y-1 hover:shadow-xl transition-all duration-200` for lift on hover. The ember icon inside each card could have a `bg-ember/10 rounded-lg p-3` background container to give it a contained, premium look.
- **"Why Oriflect" section:** The three icon columns have no visual containment. Wrapping each column in `bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm` turns them into cards, adding significant polish. The icon should get an `mb-4` and the layout consolidated into a flex-col card.
- **Final CTA:** Already strong (gradient + ember button). Add a thin `border-t border-white/10` at the top of the section to punctuate the transition.

### Services (`services.astro`)
- **Section transitions:** The alternating `bg-ivory` / `bg-sapphire-tint` sections feel abrupt. Adding `border-t border-sapphire/10 dark:border-white/5` to each section (except the first after the header) creates visual segmentation without dis
