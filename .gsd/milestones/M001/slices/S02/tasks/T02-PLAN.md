---
estimated_steps: 4
estimated_files: 2
---

# T02: Blog listing page and prose styles

**Slice:** S02 — Blog System
**Milestone:** M001

## Description

Rewrite the stub `src/pages/blog.astro` to fetch and display real posts from the `blog` collection, and add prose CSS to `global.css` so that the `<Content />` component (used in T03's slug page) renders Markdown with readable typography. These two pieces land together because prose styles are a shared dependency needed before the post body page is visually complete, and the listing page validates that `getCollection` wiring works.

## Steps

1. Rewrite `src/pages/blog.astro`: import `getCollection` from `astro:content`; call `await getCollection('blog')` and sort by `pubDate` descending (`b.data.pubDate.getTime() - a.data.pubDate.getTime()`). Render with `BaseLayout` (title `"Blog"`, description about insights for SMBs). Structure: sapphire header banner section (matching `about.astro` pattern), then an ivory/dark-bg body section with post cards. Each card: post title as link to `/blog/${post.id}`, formatted publication date (`post.data.pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })`), description text. Use brand tokens (`text-sapphire`, `dark:text-sapphire-tint`, `bg-ivory`, `dark:bg-dark-bg`, `bg-white`, `dark:bg-dark-surface`, `text-charcoal`, `dark:text-dark-text`). All structural elements need `dark:` variants.

2. Handle the empty state: if no posts are returned by `getCollection`, render a friendly message (e.g. "No posts yet — check back soon.") rather than an empty section.

3. Add a `.prose` CSS block to `src/styles/global.css` covering: `.prose p` (margin-bottom spacing), `.prose h2` / `.prose h3` (font-size, font-weight, margin), `.prose ul` / `.prose ol` (list-style, padding-left, margin), `.prose li` (margin-bottom), `.prose strong` (font-weight), `.prose em` (font-style), `.prose a` (color: `var(--color-sapphire)`, underline, hover: `var(--color-ember)`), `.prose code` (font-family: mono, small background, padding, border-radius), `.prose blockquote` (border-left accent, padding, italic color). Add dark mode overrides for text-heavy selectors using the `.dark` custom variant already in `global.css`.

4. Run `npm run build` and verify exit 0; check that `dist/blog/index.html` contains post title text.

## Must-Haves

- [ ] `getCollection('blog')` called in frontmatter — not hardcoded post data
- [ ] Posts sorted by `pubDate` descending (newest first)
- [ ] Post title links to `/blog/${post.id}` — uses `post.id`, not `post.slug`
- [ ] `pubDate` displayed as human-readable string — not raw Date object or ISO string
- [ ] Empty-state handled — no crash or blank listing if collection is empty
- [ ] All new UI elements have `dark:` variants
- [ ] `.prose` styles added to `global.css` covering paragraphs, headings, lists, links, code, blockquote
- [ ] Dark mode prose variants present
- [ ] `astro build` exits 0

## Verification

- `npm run build` exits 0
- `grep -i "What Actually Works" dist/blog/index.html` — post title appears in listing
- `grep "dark:" src/pages/blog.astro | wc -l` — at least 5 dark mode class instances
- `grep "\.prose" src/styles/global.css | wc -l` — at least 8 prose CSS selectors present
- `grep "dark" src/styles/global.css | grep "prose"` — dark variants for prose exist

## Observability Impact

- Signals added/changed: If `getCollection('blog')` returns empty (collection not discovered), the page renders an empty-state message. A future agent detects this by checking `dist/blog/index.html` for post links vs. empty-state string.
- How a future agent inspects this: `grep -c "<a href=\"/blog/" dist/blog/index.html` — count of post links; `grep "No posts" dist/blog/index.html` — detects collection not wired.
- Failure state exposed: Empty listing (collection not discovered) vs. post links present — distinguishable in built output without running the dev server.

## Inputs

- `src/content/config.ts` — (from T01) `blog` collection defined and exported; `getCollection('blog')` returns entries
- `src/content/blog/ai-for-smbs-what-actually-works.md` — (from T01) post with valid frontmatter; provides data for listing
- `src/pages/about.astro` — reference for sapphire header banner pattern, brand color usage, dark mode conventions
- `src/styles/global.css` — existing Tailwind v4 config with `@custom-variant dark`; prose styles appended here

## Expected Output

- `src/pages/blog.astro` — rewritten; renders real post listing from `getCollection('blog')` with title links, formatted dates, descriptions; dark mode throughout
- `src/styles/global.css` — augmented with `.prose` block covering paragraph, heading, list, link, code, blockquote with dark variants
- `dist/blog/index.html` — built listing page containing real post title and date
