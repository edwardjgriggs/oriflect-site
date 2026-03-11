---
id: T03
parent: S02
milestone: M001
provides:
  - Dynamic blog post page at src/pages/blog/[slug].astro using getStaticPaths + render (Astro 5 Content Layer)
  - Full S02 slice end-to-end build verification — dist/blog/ contains both listing and individual post pages
  - All S02 changes committed on branch gsd/M001/S02
key_files:
  - src/pages/blog/[slug].astro
key_decisions:
  - post.id used as slug param in getStaticPaths (not post.slug) — consistent with Astro 5 Content Layer API
  - render(post) awaited to extract Content component — required pattern for Astro 5 Content Layer
  - Tags rendered as pill badges in sapphire header — conditionally rendered only when post.data.tags is non-empty
patterns_established:
  - Dynamic route pattern for Astro 5 Content Layer: getStaticPaths maps post.id → slug param, render() extracts Content
  - Post page structure: sapphire header (title, date, tags) + ivory/dark-bg body with .prose-wrapped <Content />
  - Back link at bottom of post page using border-t separator — consistent UX pattern for all future post pages
observability_surfaces:
  - dist/blog/ directory listing shows all generated post pages (each post = one subdirectory)
  - grep "<p>" dist/blog/[slug]/index.html confirms markdown-to-HTML rendering worked
  - grep "prose" dist/blog/[slug]/index.html confirms prose class wrapper present in output
duration: ~15m
verification_result: passed
completed_at: 2026-03-11
blocker_discovered: false
---

# T03: Individual post page, build verification, and git commit

**Created `src/pages/blog/[slug].astro` — dynamic post page with `getStaticPaths` + `render` — and confirmed full slice build exits 0 with both listing and post pages in `dist/`; all S02 work committed.**

## What Happened

Created `src/pages/blog/[slug].astro` as the final piece of the S02 blog system. The page implements:

- `getStaticPaths()` using `getCollection('blog')` with `post.id` as the slug param (Content Layer API, not v4 `post.slug`)
- `const { Content } = await render(post)` — awaited to extract the rendered markdown component
- `BaseLayout` wrapper with `title={post.data.title}` and `description={post.data.description}`
- Sapphire header section with: tag pills (conditionally rendered when `post.data.tags` present), `<h1>` post title, formatted publication date, and description lead
- Ivory/dark-bg body section with `<Content />` wrapped in `<div class="prose dark:prose-dark max-w-3xl mx-auto">` to pick up T02 prose styles
- Back link to `/blog` at the bottom separated by a `border-t` divider
- Full dark mode variants on all structural elements (`dark:bg-sapphire/90`, `dark:bg-dark-bg`, `dark:text-sapphire-tint`, `dark:hover:text-ember`, `dark:border-dark-text/10`)

Ran `npm run build` — exited 0 in 948ms, generating 6 static pages including `dist/blog/ai-for-smbs-what-actually-works/index.html`. Committed all S02 changes with message `feat(M001/S02): blog system — content collections, listing, and post pages`.

## Verification

All slice-level verification checks passed:

```bash
# 1. Build exits 0
npm run build → exit 0, 6 pages built in 948ms, no errors or warnings

# 2. Both blog pages present in dist/
ls dist/blog/index.html           → exists ✓
ls dist/blog/ai-for-smbs-what-actually-works/index.html → exists ✓

# 3. Post page contains expected frontmatter content
grep -i "What Actually Works" dist/blog/ai-for-smbs-what-actually-works/index.html
→ Found in <title>, <h1>, and meta description ✓

# 4. No legacy flag
grep -r "legacy" src/content/config.ts astro.config.mjs → PASS: no legacy flag ✓

# 5. post.id used (not post.slug)
grep "post\.id" "src/pages/blog/[slug].astro" → params: { slug: post.id } ✓

# 6. Dark mode classes present
grep "dark:" src/pages/blog/[slug].astro → 5+ dark: variants ✓
grep "dark:" src/pages/blog.astro → 3+ dark: variants ✓

# 7. Prose wrapper in built HTML
grep "prose" dist/blog/ai-for-smbs-what-actually-works/index.html
→ <div class="prose dark:prose-dark max-w-3xl mx-auto"> ✓

# 8. Git commit
git log --oneline -1 → e10234a feat(M001/S02): blog system — content collections, listing, and post pages ✓
```

## Diagnostics

- `ls dist/blog/` — shows all generated post pages; each `.md` file = one subdirectory
- `grep "<p>" dist/blog/ai-for-smbs-what-actually-works/index.html` — confirms markdown-to-HTML rendering worked (full post body rendered as `<p>` and `<h2>` tags)
- `grep "prose" dist/blog/ai-for-smbs-what-actually-works/index.html` — confirms `.prose` class wrapper is present in built output
- Adding new posts: drop a `.md` file in `src/content/blog/` with valid frontmatter (title, description, pubDate); next build auto-generates `/blog/[filename-without-md]/`

## Deviations

None. Task executed exactly as planned.

## Known Issues

None.

## Files Created/Modified

- `src/pages/blog/[slug].astro` — new; dynamic post page with getStaticPaths, render, BaseLayout, prose wrapper, tag pills, back link, dark mode
