# S02: Blog System — Research

**Date:** 2026-03-11
**Milestone:** M001
**Slice:** S02

## Summary

S02 introduces a working blog to the Oriflect site using Astro 5's Content Layer API. The site already has a `src/pages/blog.astro` stub ("coming soon") and no content infrastructure at all — no `src/content/` directory, no config, no posts. This is a clean-slate implementation.

Astro 5 (currently `5.18.0` in this project) has fully migrated to the new Content Layer API. The old v2/v4 API (type-only collections in `src/content/`) is available behind a `legacy.collections` flag but should not be used for new work. The correct approach is: define a collection in `src/content/config.ts` using `defineCollection` + `glob()` loader from `astro/loaders`, place Markdown posts in `src/content/blog/`, and use `getCollection` + `render` from `astro:content` in page components.

Three new files need to be created (`src/content/config.ts`, at least one `.md` post, and `src/pages/blog/[slug].astro`) and one existing file updated (`src/pages/blog.astro`). Dark mode must work on all new UI — the `.dark` class pattern from the rest of the site applies throughout.

## Recommendation

Use the **Astro 5 Content Layer API** with `glob()` loader. Do not use `legacy.collections`. Place blog posts in `src/content/blog/` with the config file at `src/content/config.ts`. The dynamic route file must be at `src/pages/blog/[slug].astro` and use `getStaticPaths` + `getCollection` + `render`.

Author one substantive real blog post about AI for SMBs — it should be genuinely useful content, not a lorem ipsum placeholder, since this is a credibility/SEO vehicle.

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---------|------------------|------------|
| Content schema validation | Zod via `astro/zod` or `astro:content` | Already bundled with Astro; type-safe frontmatter |
| Markdown rendering | `render(post)` from `astro:content` | Native Astro — handles markdown to HTML, no extra packages |
| Static route generation | `getStaticPaths` + `getCollection` | Built-in Astro pattern; generates one page per post at build time |
| Date parsing from frontmatter | `z.coerce.date()` in Zod schema | Handles ISO string → JS Date conversion automatically |

## Existing Code and Patterns

- `src/pages/blog.astro` — currently a stub; rewrite to fetch + list posts from `getCollection('blog')`, sorted by date descending
- `src/layouts/BaseLayout.astro` — wraps every page; use it in both `blog.astro` and `[slug].astro`; accepts `title` and `description` props
- `src/styles/global.css` — Tailwind v4 CSS-first; all brand tokens available (`text-sapphire`, `text-ember`, `text-gold`, `text-charcoal`, `dark:bg-dark-bg`, `dark:text-dark-text`, etc.) — use these consistently
- `src/pages/about.astro` — reference for section structure, color usage, dark mode classes, heading hierarchy — match this visual language
- `src/pages/index.astro` — reference for card component patterns and CTA sections

## Constraints

- **Astro 5 Content Layer API only** — do not use `legacy.collections: true` in `astro.config.mjs`; do not use `type: 'content'` without a `loader` property
- **`src/content/config.ts` must export `collections`** — Astro will not auto-discover collections otherwise
- **Glob `base` path is relative to project root** — use `"./src/content/blog"` (not `"./src/data/blog"`)
- **Dynamic route params must match** — if `getStaticPaths` returns `params: { slug: post.id }`, the file must be `[slug].astro`
- **`post.id` in Content Layer API** = filename without extension (e.g., `my-first-post.md` → id `my-first-post`) — use this as the slug
- **Tailwind v4 CSS-first** — no `tailwind.config.js`; all customization in `global.css`; do not introduce `tailwind.config.js`
- **Dark mode** — all new UI must include `dark:` variants; use `.dark` class pattern already established
- **No new npm packages** — all needed tools (`astro:content`, `astro/loaders`, Tailwind tokens) are already available
- **tsconfig.json** uses `"extends": "astro/tsconfigs/strict"` — `strictNullChecks` is on; be explicit about optional fields and null checks

## Files to Create / Modify

| File | Action | Notes |
|------|--------|-------|
| `src/content/config.ts` | Create | `defineCollection` with `glob()` loader; schema: title, description, pubDate, optional tags |
| `src/content/blog/` | Create dir | Holds Markdown post files |
| `src/content/blog/*.md` | Create | At least one real authored post with valid frontmatter |
| `src/pages/blog.astro` | Rewrite | List posts from `getCollection('blog')` sorted by date |
| `src/pages/blog/[slug].astro` | Create | Dynamic route using `getStaticPaths` + `render` |

## Common Pitfalls

- **Wrong `base` path in glob loader** — the `base` argument in `glob({ pattern, base })` is relative to the project root, not `src/`. Use `"./src/content/blog"` to match where posts actually live.
- **Using `post.slug` instead of `post.id`** — in the Content Layer API (Astro 5), the entry identifier is `post.id` (not `post.slug` which was the Astro 4 pattern). Use `post.id` for route params.
- **Forgetting `export const collections`** — the config file must export a named `collections` object. If missing, Astro silently ignores the file.
- **Date display** — `pubDate` from the schema is a JS `Date` object; call `.toLocaleDateString()` or format manually in the template; don't render the raw Date object.
- **`render()` must be awaited** — `const { Content } = await render(post)` — forgetting `await` causes a runtime error.
- **Prose styles** — Astro does not ship `@tailwindcss/typography`; the `<Content />` component renders raw HTML from Markdown. If prose needs styling (paragraphs, headings, lists inside post body), use Tailwind's arbitrary CSS or a wrapping `prose` class — but since this project does not have `@tailwindcss/typography` installed, either install it or write custom prose styles. **Decision needed: install `@tailwindcss/typography` for post body styling, or write minimal custom CSS.** Recommend installing `@tailwindcss/typography` — it's a first-party Tailwind plugin and the cleanest solution.
- **Dark mode on `<Content />`** — prose plugin supports `dark:prose-invert`; custom styles need `dark:` variants
- **`src/pages/blog/` directory conflict** — `src/pages/blog.astro` and `src/pages/blog/[slug].astro` cannot coexist in the same way on some setups. In Astro, a file `blog.astro` and a directory `blog/` can coexist — `blog.astro` handles `/blog` and `blog/[slug].astro` handles `/blog/[slug]`. This is the correct and supported pattern.

## Open Risks

- **`@tailwindcss/typography` not installed** — the `<Content />` rendered markdown will be unstyled (no paragraph spacing, no heading styles, no list markers) without prose CSS. Either install `@tailwindcss/typography` (adds a dev dependency) or write hand-crafted prose styles. This is the one potential new package; it's low-risk and purpose-built.
- **No `.astro/types.d.ts` yet for `astro:content`** — Astro generates this after the first `astro dev` or `astro sync` run once `src/content/config.ts` exists. TypeScript errors in the editor are expected until then; `astro build` will generate it during build.
- **Post frontmatter schema drift** — if a post `.md` file has missing or wrong-typed frontmatter fields, the build fails with a Zod validation error. All `.md` files must exactly match the defined schema (required fields: `title`, `description`, `pubDate`).

## Skills Discovered

| Technology | Skill | Status |
|------------|-------|--------|
| Astro | (none searched — Astro is well-documented and this is a standard pattern) | N/A |

## API Summary (Astro 5 Content Layer)

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

```astro
<!-- src/pages/blog/[slug].astro -->
---
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---
```

## Sources

- Astro 5 Content Layer API — `defineCollection`, `glob`, `getCollection`, `render` (source: [Astro Docs — Content Collections](https://docs.astro.build/en/guides/content-collections))
- Astro 5 upgrade guide — Content Layer replaces v2 API; `post.id` not `post.slug` (source: [Astro Upgrade to v5](https://docs.astro.build/en/guides/upgrade-to/v5))
- Dynamic route generation with `getStaticPaths` + `getCollection` (source: [Astro Docs — Reference: astro:content](https://docs.astro.build/en/reference/modules/astro-content))
