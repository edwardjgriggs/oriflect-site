---
id: S02
milestone: M001
status: ready
---

# S02: Blog System — Context

<!-- Slice-scoped context. Milestone-only sections (acceptance criteria, completion class,
     milestone sequence) do not belong here — those live in the milestone context. -->

## Goal

Wire up Astro content collections so `/blog` lists real posts and `/blog/[slug]` renders individual post pages — with one real authored sample post live from day one.

## Why this Slice

S01 proved the About page; S02 closes the second visible gap a real visitor would notice: the blog is currently a "coming soon" stub. Completing this slice unblocks S03 (visual polish on blog pages) and satisfies R001 (blog system) and the credibility goal that makes the site presentable to potential clients.

## Scope

### In Scope

- `src/content/config.ts` — Astro content collections schema with fields: `title`, `date`, `description` (excerpt)
- `src/content/blog/*.md` — one authored sample post (AI-consulting-themed, written by agent; user can replace later)
- `src/pages/blog.astro` — updated listing page showing all posts as cards (title, date, excerpt), sorted by date descending
- `src/pages/blog/[slug].astro` — dynamic route rendering individual post pages with title, date, and rendered Markdown body
- Empty state on `/blog`: friendly "no posts yet" message if the collection is empty
- Prose styling for post body via hand-written classes in `global.css` (no new npm packages)
- Dark mode support on all new UI (consistent with D003)
- `astro build` exits 0 with no errors after all changes
- Squash merge to main and push to `origin/main`

### Out of Scope

- Tags / categories — deferred; schema can add them later without breaking existing posts
- Author field per post — deferred; single-author site for now
- Cover / hero images per post — deferred; no image pipeline needed at this stage
- CMS integration (deferred R010)
- More than one post at launch — one sample post is sufficient to prove the system
- Pagination — not needed with one post; can be added later
- RSS feed — deferred
- Social share metadata per post — deferred

## Constraints

- **No new npm packages** unless clearly necessary — project already has Tailwind v4 and all fonts (D001)
- **Prose styling must be hand-written** in `global.css` using `@theme` / Tailwind v4 CSS-first approach — do NOT install `@tailwindcss/typography`
- **Tailwind v4 CSS-first only** — no `tailwind.config.js` (D001)
- **Dark mode via `.dark` class on `<html>`** — all new UI must include `dark:` variants (D003)
- **`BaseLayout.astro` structure must remain intact** — wrap all new pages in BaseLayout
- **Astro 5 content collections API** — use `defineCollection` + `z` schema in `src/content/config.ts`

## Integration Points

### Consumes

- `src/layouts/BaseLayout.astro` — wraps both `/blog` and `/blog/[slug]` pages; no changes to this file
- `src/styles/global.css` — append prose styles for post body rendering; do not remove existing `@theme` variables
- `gsd/M001/S01` branch squash-merged to main — S02 branches from that clean main state

### Produces

- `src/content/config.ts` — collection schema (title, date, description); consumed by both listing and post pages
- `src/content/blog/[slug].md` — one sample post; consumed by `[slug].astro` dynamic route
- `src/pages/blog.astro` — updated listing page with card layout; consumed by S03 for visual polish
- `src/pages/blog/[slug].astro` — individual post page; consumed by S03 for visual polish
- `src/styles/global.css` (appended) — prose styles for post body; consumed by `[slug].astro`

## Open Questions

- Sample post topic — current thinking: an AI-consulting-themed article (e.g. "How Small Businesses Can Start with AI") that feels authentic to Oriflect's voice; user can replace text at any time without changing any code
- Prose style depth — current thinking: cover headings (h2, h3), paragraphs, unordered lists, blockquotes, and inline code as the minimum useful set for a blog post; expand in S03 polish pass if needed
