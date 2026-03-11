---
id: S02
parent: M001
milestone: M001
provides:
  - Astro 5 Content Layer config at src/content/config.ts with glob() loader and Zod schema
  - First real authored blog post at src/content/blog/ai-for-smbs-what-actually-works.md
  - Blog listing page at src/pages/blog.astro rendering real posts from getCollection('blog') sorted newest-first
  - Prose CSS block in src/styles/global.css covering paragraphs, headings, lists, links, code, blockquote with dark variants
  - Dynamic post page at src/pages/blog/[slug].astro using getStaticPaths + render (Astro 5 Content Layer)
  - Full end-to-end build verification — dist/blog/ contains both listing and individual post pages
requires:
  - slice: S01
    provides: nothing (dependency is sequential publishing order only; S01 content doesn't affect blog)
affects:
  - S03: blog.astro and [slug].astro are targets for visual polish
key_files:
  - src/content/config.ts
  - src/content/blog/ai-for-smbs-what-actually-works.md
  - src/pages/blog.astro
  - src/pages/blog/[slug].astro
  - src/styles/global.css
key_decisions:
  - Used glob() loader from astro/loaders (Content Layer API) — not legacy type-only collections
  - post.id is the slug identifier (not post.slug) — Astro 5 Content Layer API
  - Hand-crafted .prose CSS in global.css (no @tailwindcss/typography) — avoids dependency, full brand token control
  - Blog post kebab-case filename = URL slug (post.id = filename without .md extension)
patterns_established:
  - Blog posts in src/content/blog/*.md; schema enforced at build time via Zod; z.coerce.date() for frontmatter dates
  - Dynamic route pattern: getStaticPaths maps post.id → slug param; render() extracts Content component
  - Post page structure: sapphire header (title, date, tags) + ivory/dark-bg body with .prose-wrapped <Content />
  - Empty-state guard on listing page prevents blank UI if collection is empty
  - Tag pills in sapphire header (conditionally rendered when post.data.tags is non-empty)
  - Back link at bottom of post page using border-t separator
observability_surfaces:
  - astro build emits structured Zod validation errors naming file and field when frontmatter is invalid
  - grep -c '<a href="/blog/' dist/blog/index.html — count of post links (0 = collection not discovered)
  - grep "No posts" dist/blog/index.html — detects empty-state render (collection wiring broken)
  - grep "prose" dist/blog/[slug]/index.html — confirms prose class wrapper in built output
  - ls dist/blog/ — shows all generated post pages; each .md = one subdirectory
drill_down_paths:
  - .gsd/milestones/M001/slices/S02/tasks/T01-SUMMARY.md
  - .gsd/milestones/M001/slices/S02/tasks/T02-SUMMARY.md
  - .gsd/milestones/M001/slices/S02/tasks/T03-SUMMARY.md
duration: ~40m
verification_result: passed
completed_at: 2026-03-11
---

# S02: Blog System

**Astro 5 Content Layer blog system shipped end-to-end: `src/content/config.ts` with glob loader + Zod schema, one real authored post, a listing page with sorted post cards, and a dynamic post page with prose-styled markdown — `astro build` exits 0 with 6 pages including `/blog` and `/blog/ai-for-smbs-what-actually-works`.**

## What Happened

**T01 — Content infrastructure:** Created `src/content/config.ts` using the Astro 5 Content Layer API (`defineCollection` from `astro:content`, `glob` from `astro/loaders`). The schema defines `title`, `description`, `pubDate` (z.coerce.date()), and optional `tags`. The required `export const collections = { blog }` export is present so Astro auto-discovers the collection. Authored `src/content/blog/ai-for-smbs-what-actually-works.md` — a ~900 word practical guide on AI adoption for SMBs covering where to start, which tools deliver ROI, common adoption mistakes, and a 90-day rollout plan. Frontmatter matches the schema exactly. `astro build` exited 0 on first attempt.

**T02 — Blog listing and prose styles:** Replaced the stub `blog.astro` (hardcoded "Coming soon") with a real implementation calling `getCollection('blog')`, sorting by `pubDate` descending, and rendering post cards with title links, formatted dates, and descriptions — using the sapphire banner + ivory/dark-bg body visual language from `about.astro`. Added 8 dark mode class instances. Added a `.prose` CSS block to `global.css` (20 selectors) covering all markdown output elements (p, h2, h3, ul, ol, li, strong, em, a, code, blockquote) plus 8 `.dark .prose` overrides using brand CSS vars. Build continued to pass.

**T03 — Individual post page, build verification, commit:** Created `src/pages/blog/[slug].astro` with `getStaticPaths` mapping `post.id` → slug param (Content Layer API, not v4 `post.slug`), `await render(post)` to extract the Content component, BaseLayout wrapper, sapphire header with tag pills (conditional), h1 title, formatted date, description lead, and a prose-wrapped `<Content />` body section. Back link to `/blog` at the bottom. Full dark mode throughout. `npm run build` exited 0 in 948ms generating 6 pages. All changes committed: `feat(M001/S02): blog system — content collections, listing, and post pages`.

## Verification

All slice-level checks passed:

```bash
# 1. Build exits 0
npm run build → exit 0, 6 pages built in 894ms (re-verified at slice close)

# 2. Both blog pages in dist/
ls dist/blog/index.html                                        → exists ✓
ls dist/blog/ai-for-smbs-what-actually-works/index.html        → exists ✓

# 3. Post title in built slug page
grep -i "What Actually Works" dist/blog/ai-for-smbs-what-actually-works/index.html
→ found in <title>, <h1>, and meta description ✓

# 4. No legacy flag
grep -r "legacy" src/content/config.ts astro.config.mjs → PASS: no legacy flag ✓

# 5. Dark mode classes present
grep "dark:" src/pages/blog/[slug].astro → 5+ dark: variants ✓
grep "dark:" src/pages/blog.astro → 3+ dark: variants ✓

# 6. post.id used (not post.slug)
grep "post\.id" src/pages/blog/[slug].astro → params: { slug: post.id } ✓

# 7. Prose wrapper in built HTML
grep "prose" dist/blog/ai-for-smbs-what-actually-works/index.html
→ <div class="prose dark:prose-dark max-w-3xl mx-auto"> ✓
```

## Requirements Advanced

- R001 — Blog system with real posts: fully delivered. `/blog` lists real posts from Astro 5 Content Layer; `/blog/ai-for-smbs-what-actually-works` renders full post with title, date, description, and prose-styled body content.
- R004 — All changes published to GitHub: S02 changes committed on `gsd/M001/S02`; squash-merge to main and push to origin pending slice close.

## Requirements Validated

- R001 — Blog system with real posts: **validated**. Proof: `astro build` exits 0; `dist/blog/index.html` contains post title link; `dist/blog/ai-for-smbs-what-actually-works/index.html` contains full rendered post including title, date, description, and prose-wrapped body. Contract verification complete.

## New Requirements Surfaced

- None. No new capability gaps or candidate requirements discovered during execution.

## Requirements Invalidated or Re-scoped

- None.

## Deviations

None. All three tasks executed exactly as planned. No unplanned changes to scope, files, or approach.

## Known Limitations

- Only one blog post exists (`ai-for-smbs-what-actually-works.md`). The system supports any number of posts — adding a new post requires only dropping a `.md` file with valid frontmatter in `src/content/blog/`.
- Prose styles are hand-crafted in `global.css` rather than using `@tailwindcss/typography`. This is intentional (D007) but means any new markdown elements (e.g. tables, `<hr>`, images) need manual prose style additions.
- No pagination on the listing page — all posts render in one list. Acceptable for the current single-post state; will need pagination if post volume grows significantly.
- S03 visual polish (typography refinement, spacing, section transitions) is not yet applied to blog pages — that is the explicit scope of the next slice.

## Follow-ups

- S03 should apply visual polish to `blog.astro` and `[slug].astro` — spacing, typography scale, possible card design improvements.
- Future: add more blog posts; the infrastructure is entirely in place and post addition requires no code changes.
- Future: if post volume grows, consider adding pagination or an `astro-paginate` integration to the listing page.
- Future: consider adding RSS feed (`src/pages/rss.xml.js`) for SEO and feed readers — Astro has first-class RSS support via `@astrojs/rss`.

## Files Created/Modified

- `src/content/config.ts` — new; defines `blog` collection with `glob()` loader and Zod schema; exports `collections`
- `src/content/blog/ai-for-smbs-what-actually-works.md` — new; ~900 word real authored post on AI adoption for SMBs with valid frontmatter
- `src/pages/blog.astro` — rewritten; renders real post listing from `getCollection('blog')` with sapphire banner, post cards, formatted dates, title links to `/blog/${post.id}`, empty-state guard, full dark mode
- `src/pages/blog/[slug].astro` — new; dynamic post page with `getStaticPaths`, `render`, BaseLayout, sapphire header, tag pills, prose-wrapped `<Content />`, back link, full dark mode
- `src/styles/global.css` — augmented with `.prose` CSS block (20 selectors) covering paragraphs, headings, lists, links, code, blockquote, and 8 `.dark .prose` overrides

## Forward Intelligence

### What the next slice should know
- Blog pages are styled with brand tokens (sapphire, ivory, dark-bg, charcoal, dark-text) via Tailwind utility classes — S03 polish should stay within this token system. Do not introduce new color values.
- The `.prose` block in `global.css` uses CSS variables for colors (e.g. `var(--color-sapphire)`) — this is consistent with the Tailwind v4 CSS-first `@theme` approach and means prose colors respond to dark mode via `.dark .prose` selectors already in place.
- `post.id` is the slug (filename without `.md`) — this is the Astro 5 Content Layer API. Never use `post.slug` in this project (that was the Astro v4 pattern and does not exist here).
- Adding a new blog post: drop a `.md` file in `src/content/blog/` with frontmatter fields `title`, `description`, `pubDate` (ISO date string), and optionally `tags` (string array). Next `astro build` automatically generates the page.

### What's fragile
- `dark:prose-dark` class on the prose wrapper — this is a custom class referencing the `.dark .prose` selectors in `global.css`. It is NOT the Tailwind Typography plugin's dark mode class. If the `.dark .prose` block is removed from `global.css`, dark mode prose breaks silently (text stays dark on dark backgrounds).
- Empty-state guard on `blog.astro` (`posts.length === 0`) — if `getCollection('blog')` returns empty due to a config error, the listing page shows a friendly message rather than erroring. This can mask a broken collection; if posts go missing, check `export const collections` in `config.ts` first.

### Authoritative diagnostics
- `npm run build 2>&1 | grep -i "content\|zod\|invalid\|error"` — Astro emits structured Zod errors naming the file and field when any post's frontmatter doesn't match the schema. This is the first place to look for any post authoring problem.
- `ls dist/blog/` — each `.md` file in `src/content/blog/` should produce exactly one subdirectory here. Count mismatch = schema error silently dropped a post.
- `grep -c '<a href="/blog/' dist/blog/index.html` — count of post links in the built listing. If this is 0 when posts exist, collection is not being discovered.

### What assumptions changed
- No assumptions changed. The Astro 5 Content Layer API behaved exactly as documented; `post.id` correctly resolves to the filename without extension; `glob()` loader correctly discovers all `.md` files in the specified directory.
