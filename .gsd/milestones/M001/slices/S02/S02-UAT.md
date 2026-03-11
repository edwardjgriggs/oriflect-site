# S02: Blog System — UAT

**Milestone:** M001
**Written:** 2026-03-11

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: The slice goal is "real Markdown files are read by Astro's Content Layer at build time; real pages are generated and rendered." This is fully verifiable by inspecting `astro build` output and the contents of `dist/` — no live runtime interaction is required. The built HTML files contain the exact content that would be served to visitors. Human/visual verification is bonus (S03 polish is the appropriate venue for that).

## Preconditions

- Node.js and npm installed; `npm install` completed
- Working directory: `C:\Users\edwar\Desktop\Claude\test`
- Branch: `gsd/M001/S02` (or main after squash merge)
- `src/content/config.ts`, `src/content/blog/ai-for-smbs-what-actually-works.md`, `src/pages/blog.astro`, `src/pages/blog/[slug].astro`, and `src/styles/global.css` all present

## Smoke Test

Run `npm run build` — it should exit 0 in under 2 seconds and print `6 page(s) built`. If it exits non-zero, the blog system is broken.

## Test Cases

### 1. Build exits 0 with no errors

1. Run `npm run build 2>&1`
2. Check exit code: `echo $?`
3. **Expected:** exit code 0; output shows `6 page(s) built`; no Zod validation errors; no "conflicting routes" warnings

### 2. Blog listing page is generated with real post

1. Run `npm run build`
2. Run `ls dist/blog/index.html`
3. Run `grep -i "What Actually Works" dist/blog/index.html`
4. **Expected:** File exists; post title "AI for SMBs: What Actually Works" appears in listing HTML; post is linked at `/blog/ai-for-smbs-what-actually-works`

### 3. Individual post page is generated with full content

1. Run `npm run build`
2. Run `ls dist/blog/ai-for-smbs-what-actually-works/index.html`
3. Run `grep -i "What Actually Works" dist/blog/ai-for-smbs-what-actually-works/index.html | head -2`
4. Run `grep "prose" dist/blog/ai-for-smbs-what-actually-works/index.html`
5. **Expected:** File exists; title appears in `<title>` and `<h1>`; a `<div class="prose ...">` wrapper is present in body

### 4. Post body prose is rendered (not raw markdown)

1. Run `npm run build`
2. Run `grep "<p>" dist/blog/ai-for-smbs-what-actually-works/index.html | head -3`
3. **Expected:** Multiple `<p>` tags present — markdown paragraphs converted to HTML; content is not raw markdown text

### 5. No legacy content collections API used

1. Run `grep -r "legacy" src/content/config.ts astro.config.mjs`
2. Run `grep "type:" src/content/config.ts`
3. **Expected:** No "legacy" string found; no `type: 'content'` pattern (legacy v4 API); only `glob()` loader pattern present

### 6. Dark mode classes present on both blog pages

1. Run `grep "dark:" src/pages/blog.astro | wc -l`
2. Run `grep "dark:" "src/pages/blog/[slug].astro" | wc -l`
3. **Expected:** Both counts ≥ 3; blog.astro has ≥ 3 dark variants; [slug].astro has ≥ 5 dark variants

### 7. Adding a new post auto-generates a new page

1. Create `src/content/blog/test-post.md` with valid frontmatter (title, description, pubDate)
2. Run `npm run build`
3. Run `ls dist/blog/test-post/index.html`
4. Remove `src/content/blog/test-post.md`
5. **Expected:** New post page generated at `dist/blog/test-post/index.html` — confirms the collection infrastructure is generalized, not hardcoded

## Edge Cases

### Empty tags array (no tags frontmatter)

1. Add a new test post with no `tags` field in frontmatter
2. Run `npm run build`
3. Navigate to the post page
4. **Expected:** Build exits 0 (tags is optional in schema); no tag pills render in the sapphire header; layout is clean with no empty pill container

### Frontmatter schema violation

1. Temporarily add a post with `pubDate: "not-a-date"` (invalid date string)
2. Run `npm run build 2>&1`
3. **Expected:** Build exits non-zero (or with Zod error output) naming the invalid file and field — schema enforcement is working

### Blog listing with zero posts

1. Temporarily move all `.md` files out of `src/content/blog/`
2. Run `npm run build`
3. Check `grep "No posts" dist/blog/index.html`
4. **Expected:** Build exits 0; friendly empty-state message ("No posts yet...") renders on the listing page — no crash, no blank page

## Failure Signals

- `npm run build` exits non-zero → schema error in a post's frontmatter; check `grep -i "zod\|invalid\|content" build output`
- `dist/blog/index.html` missing → blog listing route not generated; check `src/pages/blog.astro` exists
- `dist/blog/ai-for-smbs-what-actually-works/` missing → slug route not generated; check `src/pages/blog/[slug].astro` getStaticPaths
- `grep "No posts" dist/blog/index.html` matches → `getCollection('blog')` returned empty; check `export const collections` in `src/content/config.ts`
- Post title not in `dist/blog/index.html` → collection discovered but posts not rendering; check sort/render logic in `blog.astro`
- No `<p>` tags in post body → markdown-to-HTML rendering failed; check `render(post)` usage in `[slug].astro`
- No `.prose` wrapper in built post HTML → prose class missing from `[slug].astro` Content wrapper div

## Requirements Proved By This UAT

- R001 — Blog system with real posts: **proved**. `/blog` renders a real post listing from Astro content collections; `/blog/ai-for-smbs-what-actually-works` renders a full individual post page with title, date, description, and prose-styled body content. `astro build` exits 0. The content infrastructure (config, schema, glob loader) is verified working end-to-end at build time.

## Not Proven By This UAT

- Live server rendering and browser interaction (dark mode toggle, mobile layout) — not exercised. These are covered by S03 polish and are low risk given the pattern was already proven on other pages (About, Services).
- Operational publishing to GitHub (R004 partial) — `git push origin main` is executed at slice close by the GSD extension, not in this UAT. The commit is verified (`git log --oneline -1` checked in T03).
- R003 visual design polish — explicitly out of scope for S02; S03 owns this.
- Multiple posts pagination behavior — only one post exists; pagination is deferred (not yet needed).
- RSS feed / SEO metadata beyond page title and meta description — not in scope for M001.

## Notes for Tester

- All test cases run against the built `dist/` directory — no dev server required. `npm run build` is the single entry point for all artifact-driven checks.
- The `dark:prose-dark` class on the prose wrapper is a **custom class** that maps to `.dark .prose` selectors in `global.css` — it is NOT the Tailwind Typography plugin. Do not expect `@tailwindcss/typography` class names.
- The post slug (`ai-for-smbs-what-actually-works`) comes directly from the `.md` filename (without extension). This is the Astro 5 Content Layer `post.id` behavior. If you rename the file, the URL changes.
- Test Case 7 (new post auto-generation) is an integration check that confirms the system is generalized. Remove the test post file after verifying to keep the build clean.
