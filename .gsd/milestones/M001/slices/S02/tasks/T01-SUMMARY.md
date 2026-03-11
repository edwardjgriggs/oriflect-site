---
id: T01
parent: S02
milestone: M001
provides:
  - Astro 5 Content Layer config at src/content/config.ts with glob() loader and Zod schema
  - First real authored blog post at src/content/blog/ai-for-smbs-what-actually-works.md
key_files:
  - src/content/config.ts
  - src/content/blog/ai-for-smbs-what-actually-works.md
key_decisions:
  - Used glob() loader from astro/loaders (Content Layer API) — not legacy type-only collections
  - post.id is the slug identifier (not post.slug) — consistent with Astro 5 Content Layer
patterns_established:
  - Blog posts live in src/content/blog/*.md; schema enforced at build time via Zod
  - z.coerce.date() handles ISO date string → JS Date conversion in frontmatter
observability_surfaces:
  - astro build emits Zod validation errors naming file and field when frontmatter is invalid
  - "npm run build 2>&1 | grep -i 'content|zod|invalid|error'" to inspect schema validation
duration: ~10m
verification_result: passed
completed_at: 2026-03-11
blocker_discovered: false
---

# T01: Content infrastructure — config, schema, and first real blog post

**Created the Astro 5 Content Layer foundation: `src/content/config.ts` with `glob()` loader + Zod schema, and one substantive authored blog post about AI for SMBs — `astro build` exits 0 with no errors.**

## What Happened

Created `src/content/config.ts` using `defineCollection` from `astro:content` and `glob` from `astro/loaders`. The schema defines four fields: `title` (string), `description` (string), `pubDate` (coerced date), `tags` (optional string array). The named export `export const collections = { blog }` is present so Astro discovers the collection.

Created `src/content/blog/` directory and authored `ai-for-smbs-what-actually-works.md` — a ~900 word practical guide covering where SMBs should start with AI (repetitive operational tasks), which tools deliver real ROI (email assistants, meeting transcription, document drafting, support triage), three common adoption mistakes, and a 90-day rollout plan. All frontmatter fields match the schema exactly.

## Verification

```
npm run build → exit 0 (5 pages built in 861ms, no Zod errors)
grep "export const collections" src/content/config.ts → PASS
grep "glob" src/content/config.ts → PASS (import and loader usage)
head -10 src/content/blog/ai-for-smbs-what-actually-works.md → all required frontmatter fields visible
grep -r "legacy" src/content/config.ts astro.config.mjs → PASS: no legacy flag
```

## Diagnostics

- **Schema validation errors:** Run `npm run build 2>&1 | grep -i "content\|zod\|invalid\|error"` — Astro emits structured Zod errors naming the file and field when frontmatter is invalid.
- **Collection discovery check:** If `getCollection('blog')` returns empty in T02/T03, verify `export const collections` is present in `src/content/config.ts` and the glob base path matches the actual directory.
- **Post ID:** The `post.id` for this post is `ai-for-smbs-what-actually-works` (filename without `.md`). T03 must use `post.id` (not `post.slug`) in `getStaticPaths`.

## Deviations

None. All steps executed exactly as planned.

## Known Issues

None. Build is clean.

## Files Created/Modified

- `src/content/config.ts` — new; defines `blog` collection with `glob()` loader and Zod schema; exports `collections`
- `src/content/blog/ai-for-smbs-what-actually-works.md` — new; ~900 word real authored post on AI adoption for SMBs with valid frontmatter
