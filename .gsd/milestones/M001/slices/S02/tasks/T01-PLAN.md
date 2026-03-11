---
estimated_steps: 4
estimated_files: 2
---

# T01: Content infrastructure — config, schema, and first real blog post

**Slice:** S02 — Blog System
**Milestone:** M001

## Description

Create the Astro 5 Content Layer foundation for the blog: `src/content/config.ts` with a `defineCollection` + `glob()` loader and Zod schema, and at least one real authored Markdown post in `src/content/blog/`. This is the data layer — the listing page (T02) and slug page (T03) both depend on this content existing and being schema-valid. No UI changes in this task.

## Steps

1. Create `src/content/config.ts` using `defineCollection` from `astro:content` and `glob` from `astro/loaders`. Define a `blog` collection with `loader: glob({ pattern: '**/*.md', base: './src/content/blog' })` and a Zod schema: `title: z.string()`, `description: z.string()`, `pubDate: z.coerce.date()`, `tags: z.array(z.string()).optional()`. Export `export const collections = { blog };` — this named export is required for Astro to discover the collection.

2. Create the directory `src/content/blog/` (it does not exist yet).

3. Create `src/content/blog/ai-for-smbs-what-actually-works.md` with valid frontmatter matching the schema (all required fields: title, description, pubDate as ISO date string) and a substantive post body. The post should be genuinely useful content about practical AI adoption for small and medium businesses — not filler. Aim for 600–900 words covering real tactics: where to start, what tools actually deliver ROI, common mistakes to avoid. This is the site's primary SEO and thought-leadership vehicle.

4. Run `npm run build` from the project root and verify it exits 0 with no Zod validation errors.

## Must-Haves

- [ ] `src/content/config.ts` uses `glob()` loader from `astro/loaders` — NOT `type: 'content'` without a loader (deprecated Astro v2/v4 API)
- [ ] `export const collections = { blog }` — named export present; Astro silently ignores the file without it
- [ ] `glob` base path is `'./src/content/blog'` (relative to project root)
- [ ] Post frontmatter contains all required fields: `title`, `description`, `pubDate` with a valid ISO date string (e.g. `2026-03-11`)
- [ ] Post body is real authored content — not lorem ipsum or placeholder text
- [ ] `astro build` exits 0 — no Zod schema validation errors

## Verification

- `npm run build` exits 0 with no errors
- `grep "export const collections" src/content/config.ts` — confirms named export
- `grep "glob" src/content/config.ts` — confirms Content Layer API (not legacy)
- `head -10 src/content/blog/ai-for-smbs-what-actually-works.md` — frontmatter fields visible

## Observability Impact

- Signals added/changed: Astro's build pipeline now validates all `.md` frontmatter in `src/content/blog/` against the Zod schema at build time. Any future post with missing or wrong-typed fields produces a clear error: `[content] Invalid frontmatter in "blog/filename.md": <field> is required`.
- How a future agent inspects this: Run `npm run build 2>&1 | grep -i "content\|zod\|invalid\|error"` to see schema validation results.
- Failure state exposed: Build fails with Zod error naming the file and field when frontmatter is invalid — highly legible failure mode.

## Inputs

- `astro.config.mjs` — no changes needed; confirms `legacy.collections` is not set
- `package.json` — confirms `astro ^5.17.1` which includes `astro/loaders` and Content Layer API
- S02-RESEARCH.md — API reference for `defineCollection`, `glob`, Zod schema shape, common pitfalls

## Expected Output

- `src/content/config.ts` — new file; defines and exports the `blog` collection with glob loader and Zod schema
- `src/content/blog/ai-for-smbs-what-actually-works.md` — new file; real authored blog post with valid frontmatter
- `npm run build` exits 0 — data layer is schema-valid and Astro recognizes the collection
