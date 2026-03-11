# S02: Blog System

**Goal:** `/blog` lists real posts sorted by date and individual post pages render at `/blog/[slug]` — all powered by Astro 5 Content Layer API with Markdown files in `src/content/blog/`.
**Demo:** Run `astro build` with no errors; dev server renders `/blog` (post listing) and `/blog/ai-for-smbs-what-actually-works` (individual post page) with title, date, description, and full body content — dark mode works on both pages.

## Must-Haves

- `src/content/config.ts` defines a `blog` collection using `defineCollection` + `glob()` loader with Zod schema (title, description, pubDate, optional tags)
- `export const collections = { blog }` is present — Astro discovers the collection
- At least one real authored `.md` post in `src/content/blog/` with valid frontmatter
- `src/pages/blog.astro` lists all posts from `getCollection('blog')` sorted by date descending, with title, date, and description per post
- `src/pages/blog/[slug].astro` dynamic route renders individual posts using `getStaticPaths` + `render`
- Post body prose (paragraphs, headings, lists) is visibly styled — not unstyled raw HTML
- All new UI has `dark:` variants consistent with the rest of the site
- `astro build` exits 0 with no errors
- All changes committed to branch `gsd/M001/S02`

## Proof Level

- This slice proves: **integration** — real Markdown files are read by Astro's Content Layer at build time; real pages are generated and rendered
- Real runtime required: yes — `astro build` exercised and output inspected
- Human/UAT required: no (build verification is sufficient for contract; visual check is bonus)

## Verification

```bash
# 1. Build must exit 0 (no schema errors, no missing exports, no route conflicts)
cd /c/Users/edwar/Desktop/Claude/test && npm run build

# 2. Built output must contain blog listing and post pages
ls dist/blog/index.html
ls dist/blog/ai-for-smbs-what-actually-works/index.html

# 3. Post page contains expected frontmatter content
grep -i "What Actually Works" dist/blog/ai-for-smbs-what-actually-works/index.html | head -2

# 4. No legacy.collections flag introduced
grep -r "legacy" src/content/config.ts astro.config.mjs 2>/dev/null && echo "FAIL: legacy flag found" || echo "PASS: no legacy flag"

# 5. Dark mode classes present in new pages
grep "dark:" src/pages/blog/\[slug\].astro | head -3
grep "dark:" src/pages/blog.astro | head -3
```

## Observability / Diagnostics

- **Build errors:** `astro build` emits structured Zod validation errors when frontmatter doesn't match schema — error names the file and field. Run `npm run build 2>&1` to see them.
- **Collection discovery:** If `src/content/config.ts` is missing or `export const collections` is absent, `getCollection('blog')` returns an empty array (no build error, but `/blog` shows no posts). Inspect `dist/blog/index.html` for post links.
- **Route conflict:** If `blog.astro` and `blog/` directory conflict, Astro emits a "conflicting routes" warning in build output.
- **Slug mismatch:** If `getStaticPaths` uses `post.slug` instead of `post.id`, routes generate wrong paths. Check `dist/blog/` directory structure — each post should have a subdirectory matching its `.md` filename (without extension).
- **Unstyled prose:** If `<Content />` renders unstyled, visible in built HTML as bare `<p>` tags without classes. Inspect `dist/blog/[slug]/index.html` for `.prose` wrapper.
- **Redaction constraints:** None — no secrets or PII in blog content.

## Integration Closure

- Upstream surfaces consumed:
  - `src/layouts/BaseLayout.astro` — wraps both blog pages (title/description props)
  - `src/styles/global.css` — Tailwind v4 tokens (colors, fonts) used in new page UI
  - Astro 5 Content Layer API (`astro:content`, `astro/loaders`) — already in `astro` package
- New wiring introduced in this slice:
  - `src/content/config.ts` → registers `blog` collection with Astro runtime
  - `src/content/blog/*.md` → post source files consumed by collection
  - `src/pages/blog.astro` → `getCollection('blog')` call wires collection to listing UI
  - `src/pages/blog/[slug].astro` → `getStaticPaths` + `render` wires collection to dynamic post pages
  - Prose styles in `global.css` → styles `<Content />` rendered markdown output
- What remains before the milestone is truly usable end-to-end:
  - S03 visual polish (layout refinement, typography, spacing improvements across all pages)
  - Push squash commit to `origin/main` (done at slice completion)

## Tasks

- [x] **T01: Content infrastructure — config, schema, and first real blog post** `est:45m`
  - Why: Establishes the Astro 5 Content Layer foundation; without `config.ts` and at least one `.md` post, the listing and slug pages have nothing to render. This is the data layer for the entire slice.
  - Files: `src/content/config.ts`, `src/content/blog/ai-for-smbs-what-actually-works.md`
  - Do: Create `src/content/config.ts` with `defineCollection` + `glob()` loader and Zod schema (title, description, pubDate, optional tags); export `collections = { blog }`. Create `src/content/blog/` directory. Write one substantive real post about AI for SMBs with valid frontmatter matching the schema exactly.
  - Verify: `npm run build` exits 0; `grep "export const collections" src/content/config.ts` passes; frontmatter fields visible in post file
  - Done when: `astro build` exits 0 with `src/content/config.ts` and at least one `.md` post; no Zod validation errors

- [x] **T02: Blog listing page and prose styles** `est:45m`
  - Why: Rewrites the stub `blog.astro` to show real posts from the collection and adds prose CSS to `global.css` so `<Content />` markdown renders with readable typography. Landing page entry point for the blog.
  - Files: `src/pages/blog.astro`, `src/styles/global.css`
  - Do: Rewrite `blog.astro` to call `getCollection('blog')`, sort by `pubDate` descending, render post cards with title link (to `/blog/${post.id}`), formatted date, and description. Match visual language of `about.astro` (sapphire banner, ivory/dark-surface body, brand tokens, dark mode). Add `.prose` CSS block to `global.css` covering paragraphs, headings, lists, links, code, blockquote with dark variants.
  - Verify: `npm run build` exits 0; `grep -i "What Actually Works" dist/blog/index.html` finds post title; dark mode classes count ≥ 5 in `blog.astro`
  - Done when: `blog.astro` renders real post list from collection with dark mode; prose styles in `global.css`; build passes

- [x] **T03: Individual post page, build verification, and git commit** `est:30m`
  - Why: Creates the dynamic route for individual post pages; verifies full end-to-end build; commits all S02 work. Without this task the slice goal is not met.
  - Files: `src/pages/blog/[slug].astro`
  - Do: Create `src/pages/blog/[slug].astro` with `getStaticPaths` mapping `post.id` to slug param (NOT `post.slug`); accept `post` as prop; `await render(post)` for Content; render with BaseLayout; sapphire header with title/date, body with `<Content />` in `.prose` wrapper, back link to `/blog`. All dark mode variants. Run `npm run build` and confirm exit 0. Commit all changes: `feat(M001/S02): blog system — content collections, listing, and post pages`.
  - Verify: `npm run build` exits 0; `ls dist/blog/ai-for-smbs-what-actually-works/index.html` exists; `git log --oneline -1` shows feat commit
  - Done when: Build exits 0, individual post page in `dist/`, all changes committed on `gsd/M001/S02`

## Files Likely Touched

- `src/content/config.ts` — new
- `src/content/blog/ai-for-smbs-what-actually-works.md` — new
- `src/pages/blog.astro` — rewrite
- `src/pages/blog/[slug].astro` — new
- `src/styles/global.css` — add prose styles
