---
id: T02
parent: S02
milestone: M001
provides:
  - Blog listing page at src/pages/blog.astro rendering real posts from getCollection('blog')
  - Prose CSS block in src/styles/global.css covering paragraphs, headings, lists, links, code, blockquote with dark mode variants
key_files:
  - src/pages/blog.astro
  - src/styles/global.css
key_decisions:
  - Used post.id (not post.slug) in href for post card links — consistent with Astro 5 Content Layer API
  - Prose styles added as plain CSS in global.css (not Tailwind Typography plugin) — keeps the dependency footprint minimal and allows full brand token control
patterns_established:
  - Blog post cards: sapphire banner header + white/dark-surface cards on ivory/dark-bg body section, matching about.astro visual language
  - Empty-state guard: conditional render on posts.length === 0 with friendly message — prevents blank listing if collection is empty
  - Prose dark mode: .dark .prose selectors in global.css override text and heading colors using brand CSS vars
observability_surfaces:
  - grep -c "<a href=\"/blog/" dist/blog/index.html — count of post links in built listing (0 = collection not discovered)
  - grep "No posts" dist/blog/index.html — detects empty-state render (collection wiring broken)
  - grep "\.prose" src/styles/global.css | wc -l — confirms prose selectors present (≥8 expected)
duration: ~15m
verification_result: passed
completed_at: 2026-03-11
blocker_discovered: false
---

# T02: Blog listing page and prose styles

**Rewrote `src/pages/blog.astro` to list real posts from `getCollection('blog')` sorted newest-first, and added a full `.prose` CSS block to `global.css` with dark mode variants — `astro build` exits 0 and the post title appears in `dist/blog/index.html`.**

## What Happened

Replaced the stub `blog.astro` (which had hardcoded "Coming soon" text) with a real implementation that:
- Calls `getCollection('blog')` in the frontmatter and sorts by `pubDate` descending
- Renders a sapphire header banner (matching `about.astro` pattern)
- Renders post cards on an ivory/dark-bg body section — each card has the post title as a link to `/blog/${post.id}`, a human-readable formatted date, the description text, and a "Read more →" link
- Handles the empty state with a friendly message if no posts are returned
- Uses brand tokens throughout with full `dark:` variant coverage (8 dark mode class instances)

Added a `.prose` CSS block to `src/styles/global.css` covering:
- `.prose p` — margin-bottom, line-height, charcoal color
- `.prose h2` / `.prose h3` — font-size, font-weight, font-family (heading), margin, sapphire color
- `.prose ul` / `.prose ol` — list-style, padding-left, margin
- `.prose li` — margin-bottom, charcoal color
- `.prose strong` — font-weight: 700
- `.prose em` — font-style: italic
- `.prose a` — sapphire color, underline, ember on hover
- `.prose code` — monospace font, light background, padding, border-radius
- `.prose blockquote` — sapphire border-left accent, italic, reduced opacity

Dark mode overrides added for `.dark .prose p`, `h2`, `h3`, `li`, `a`, `a:hover`, `code`, and `blockquote`.

## Verification

All task-level checks passed:

```
npm run build                                            → exit 0 ✓
grep -i "What Actually Works" dist/blog/index.html      → post title found in listing ✓
grep "dark:" src/pages/blog.astro | wc -l               → 8 (≥5 required) ✓
grep "\.prose" src/styles/global.css | wc -l            → 20 (≥8 required) ✓
grep "dark" src/styles/global.css | grep "prose"        → 8 dark prose selectors ✓
grep -c '<a href="/blog/' dist/blog/index.html          → 1 post link ✓
grep "No posts" dist/blog/index.html                    → not found (posts rendered) ✓
grep -r "legacy" src/content/config.ts astro.config.mjs → PASS: no legacy flag ✓
```

Slice-level checks that can be confirmed at this stage:
- ✅ `dist/blog/index.html` exists and contains the post title
- ✅ No legacy flag in config
- ✅ Dark mode classes present in `blog.astro`
- ⏳ `dist/blog/ai-for-smbs-what-actually-works/index.html` — pending T03 (slug page not yet created)

## Diagnostics

- **Collection not discovered:** `grep "No posts" dist/blog/index.html` — if this appears, `getCollection('blog')` returned empty. Check `export const collections` in `src/content/config.ts`.
- **Post links count:** `grep -c '<a href="/blog/' dist/blog/index.html` — should match the number of `.md` files in `src/content/blog/`.
- **Prose present:** `grep "\.prose" src/styles/global.css | wc -l` — should be ≥ 8.
- **Dark prose:** `grep "dark" src/styles/global.css | grep "prose"` — should return 8 lines.

## Deviations

None. Implementation followed the task plan exactly.

## Known Issues

None.

## Files Created/Modified

- `src/pages/blog.astro` — rewritten; renders real post listing from `getCollection('blog')` with sapphire banner, post cards, formatted dates, title links to `/blog/${post.id}`, empty-state guard, full dark mode
- `src/styles/global.css` — augmented with `.prose` CSS block (20 selectors) covering paragraphs, headings, lists, links, code, blockquote, and 8 `.dark .prose` overrides
