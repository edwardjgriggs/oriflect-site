---
estimated_steps: 5
estimated_files: 1
---

# T03: Individual post page, build verification, and git commit

**Slice:** S02 — Blog System
**Milestone:** M001

## Description

Create `src/pages/blog/[slug].astro` — the dynamic route that renders individual blog posts at `/blog/[slug]`. This is the final piece of the slice: it wires the `blog` collection to readable post pages. After creating the slug page, run a full `astro build` to verify end-to-end correctness, confirm both listing and post pages exist in `dist/`, and commit all S02 work.

## Steps

1. Create `src/pages/blog/[slug].astro`. In the frontmatter: import `getCollection` and `render` from `astro:content`; import `BaseLayout` from `'../layouts/BaseLayout.astro'`. Implement `export async function getStaticPaths()` that calls `await getCollection('blog')` and returns `posts.map(post => ({ params: { slug: post.id }, props: { post } }))` — use `post.id` as the slug param (Content Layer API), NOT `post.slug` (Astro v4 pattern).

2. In the component script: destructure `post` from `Astro.props`; call `const { Content } = await render(post)` — must be awaited.

3. Build the post page template using `BaseLayout` with `title={post.data.title}` and `description={post.data.description}`. Structure: sapphire header section with post title and formatted publication date (and optional tag list if `post.data.tags` present); body section with `<Content />` wrapped in `<div class="prose dark:prose-dark max-w-3xl mx-auto">` — this picks up the `.prose` styles added in T02. Back link to `/blog` at the bottom. All structural elements with dark mode variants (`dark:bg-dark-bg`, `dark:text-dark-text`, `dark:text-sapphire-tint`, etc.).

4. Run `npm run build` from the project root. Verify: exit code 0; `dist/blog/index.html` exists; `dist/blog/ai-for-smbs-what-actually-works/index.html` exists; no "conflicting routes" in build output.

5. Stage all changes and commit: `git add -A && git commit -m "feat(M001/S02): blog system — content collections, listing, and post pages"`. Verify with `git log --oneline -1`.

## Must-Haves

- [ ] `getStaticPaths` uses `post.id` for the `slug` param — NOT `post.slug`
- [ ] `render(post)` is awaited — `const { Content } = await render(post)`
- [ ] `BaseLayout` used with `title` and `description` from `post.data`
- [ ] `<Content />` wrapped in a container with the `.prose` class
- [ ] Dark mode variants on structural elements
- [ ] Back link to `/blog` present
- [ ] `astro build` exits 0 — no route conflicts, no missing exports, no Zod errors
- [ ] `dist/blog/ai-for-smbs-what-actually-works/index.html` exists in built output
- [ ] All changes committed on branch `gsd/M001/S02`

## Verification

```bash
cd /c/Users/edwar/Desktop/Claude/test && npm run build
echo "Build exit code: $?"
ls dist/blog/index.html
ls dist/blog/ai-for-smbs-what-actually-works/index.html
grep -i "What Actually Works" dist/blog/ai-for-smbs-what-actually-works/index.html | head -2
grep -r "legacy" src/content/config.ts astro.config.mjs 2>/dev/null && echo "FAIL" || echo "PASS: no legacy flag"
grep "post\.id" "src/pages/blog/[slug].astro"
git log --oneline -1
```

## Observability Impact

- Signals added/changed: Each successfully built post page appears as a subdirectory in `dist/blog/`. A missing post subdirectory indicates a `getStaticPaths` / slug mismatch or missing `[slug].astro`. The post page HTML contains rendered `<Content />` — inspect it to confirm prose styles applied and markdown was parsed.
- How a future agent inspects this: `ls dist/blog/` shows all generated pages; `grep "<p>" dist/blog/[slug]/index.html` confirms markdown-to-HTML rendering worked; `grep "prose" dist/blog/[slug]/index.html` confirms prose class present.
- Failure state exposed: If `[slug].astro` is missing, `dist/blog/` only has `index.html` — immediately distinguishable. If `post.slug` used instead of `post.id`, build generates wrong paths visible in `dist/blog/` directory listing.

## Inputs

- `src/content/config.ts` — (from T01) `blog` collection defined; `getCollection` and `render` work
- `src/content/blog/ai-for-smbs-what-actually-works.md` — (from T01) `post.id` will be `ai-for-smbs-what-actually-works`
- `src/pages/blog.astro` — (from T02) confirms `getCollection` pattern works in listing page
- `src/styles/global.css` — (from T02) `.prose` styles defined; `<div class="prose">` wrapper picks them up
- `src/layouts/BaseLayout.astro` — existing layout; accepts `title` and `description` string props

## Expected Output

- `src/pages/blog/[slug].astro` — new file; dynamic route with `getStaticPaths`, `render`, BaseLayout, prose wrapper, back link, dark mode
- `dist/blog/index.html` — exists (listing page)
- `dist/blog/ai-for-smbs-what-actually-works/index.html` — exists (first real post page)
- `git log --oneline -1` shows `feat(M001/S02): blog system — content collections, listing, and post pages`
