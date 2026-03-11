# GSD State

**Active Milestone:** M001 — Site Enhancement v1
**Active Slice:** — (all slices complete)
**Last Completed:** S03 — Visual Design Polish ✅

## Recent Decisions

- D001: Tailwind CSS v4 CSS-first config (already in use)
- D002: Blog uses Astro content collections with Markdown files (user choice)
- D003: Dark mode via `.dark` class on `<html>` (already working)
- D004: Static assets (photos) go in `public/`
- D005: Squash merge per slice to main, push to origin after each slice
- D006: Founder photo stored as `public/founder.png` (clean stable filename)
- D007: Blog prose styling via hand-crafted `.prose` CSS in `global.css` (no @tailwindcss/typography)
- D008: `post.id` (not `post.slug`) used as slug param — Astro 5 Content Layer API
- D009: Blog post kebab-case filename = URL slug (filename without extension is `post.id`)
- D010: S03 visual polish verified via grep against `dist/` built HTML + `astro build` exit 0
- D011: Prose font-size improvement extends `.prose p` in-place in `global.css`
- D012: Blog listing tag pills render from `post.data.tags` using same pill style as post header

## Blockers

None.

## Milestone Progress

- S01: About Page — Real Founder Content ✅ complete
- S02: Blog System ✅ complete
  - `src/content/config.ts` — Astro 5 Content Layer config with glob() loader and Zod schema
  - `src/content/blog/ai-for-smbs-what-actually-works.md` — first real authored post
  - `src/pages/blog.astro` — real listing page from getCollection('blog'), sorted newest-first
  - `src/pages/blog/[slug].astro` — dynamic post page with getStaticPaths + render
  - `src/styles/global.css` — .prose CSS block with dark mode variants
  - `astro build` exits 0; 6 pages in dist/ including listing and individual post page
  - All changes squash-merged to main and pushed to origin
- S03: Visual Design Polish ✅ COMPLETE
  - T01 ✅ — antialiased body, prose improvements (1.0625rem / line-height 1.8), pipeline card hover lift + icon containers, Why Oriflect card elevation, Final CTA border separator
  - T02 ✅ — section dividers on Services, gold ring on founder photo, Core Values card elevation
  - T03 ✅ — Blog tag pills + hover border + font-accent italic + full slice verification passed
  - S03-SUMMARY.md written ✅
  - S03-UAT.md written ✅
  - R003 validated ✅
  - M001-ROADMAP.md S03 marked [x] ✅
  - feat(gsd): complete S03 commit pending

## Requirements Validated

- R001 — Blog system with real posts ✅ (proved by S02)
- R002 — About page with real founder content ✅ (proved by S01)
- R003 — Visual design polish ✅ (proved by S03 — astro build exit 0 + all 11 grep checks)

## Next Action

S03 unit complete. GSD extension to squash-merge `gsd/M001/S03` → main and push to origin (R004 closure for S03, completing M001).
