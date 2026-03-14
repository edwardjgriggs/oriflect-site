---
id: T01
parent: S05
milestone: M002
provides:
  - Pipeline arrow CSS pulse animation with reduced-motion guard
  - FeaturedPosts.astro component (0/1/3 post handling)
  - Homepage section reorder to target sequence
key_files:
  - src/styles/global.css
  - src/components/FeaturedPosts.astro
  - src/pages/index.astro
key_decisions:
  - Used `pipeline-pulse` keyframe with opacity 0.4→1→0.4 over 2s infinite, applied via `.pipeline-arrow-pulse` class
  - FeaturedPosts renders nothing when 0 posts (conditional section), centers single post with max-w-md
patterns_established:
  - Blog collection fetch pattern reused from blog.astro in homepage frontmatter
observability_surfaces:
  - DevTools Animations panel shows pipeline-pulse keyframe on arrow divs
  - prefers-reduced-motion toggle in DevTools Rendering disables animation
  - FeaturedPosts conditional render: no DOM when 0 posts
duration: 8m
verification_result: passed
completed_at: 2026-03-14
blocker_discovered: false
---

# T01: Animate pipeline arrows, create FeaturedPosts, and reorder homepage sections

**Added CSS pulse animation to pipeline arrows, created FeaturedPosts blog card grid, and reordered homepage to hero→pipeline→metrics→results→testimonials→why oriflect→blog→CTA.**

## What was done

1. Added `@keyframes pipeline-pulse` (opacity 0.4→1→0.4, 2s infinite) and `.pipeline-arrow-pulse` class to `global.css`. Added `prefers-reduced-motion` guard that disables the animation.
2. Applied `pipeline-arrow-pulse` class to both arrow `<div>` elements in `index.astro`.
3. Created `src/components/FeaturedPosts.astro` — accepts `posts` prop, renders responsive card grid (1→3 cols). Handles 0 posts (renders nothing), 1 post (centered), 3 posts (full grid). Styled consistently with existing card patterns.
4. Updated `index.astro` frontmatter: imported `FeaturedPosts`, added `getCollection('blog')` + sort. Moved Results and Testimonials above Why Oriflect. Inserted FeaturedPosts wrapped in ScrollReveal between Why Oriflect and CTA.

## Verification

| Check | Result |
|-------|--------|
| `npx astro build` exit 0 | ✅ |
| grep pipeline-arrow-pulse in index.astro + global.css | ✅ Found at lines 73, 99, 171, 180, 181 |
| grep prefers-reduced-motion in global.css | ✅ Line 210, covers pipeline animation |
| FeaturedPosts.astro exists | ✅ |
| grep FeaturedPosts in index.astro | ✅ Import line 9, usage line 224 |
| Section order: pipeline(43)→metrics(127)→results(149)→testimonials(154)→why oriflect(159)→blog(224)→CTA(227) | ✅ |

## Slice-level verification (final task — all must pass)

| Slice check | Result |
|-------------|--------|
| `npx astro build` exits 0 | ✅ |
| grep pulse/pipelineFlow in index.astro + global.css | ✅ |
| grep prefers-reduced-motion in global.css | ✅ |
| FeaturedPosts.astro exists | ✅ |
| grep FeaturedPosts in index.astro | ✅ |
| Section order verified | ✅ |
| No build errors | ✅ |

All slice-level checks pass. Slice S05 is complete.

## Diagnostics

- **Pipeline animation**: Inspect `.pipeline-arrow-pulse` elements in DevTools → Animations panel; `pipeline-pulse` keyframe should show 2s infinite cycle (opacity 0.4→1→0.4).
- **Reduced motion**: Toggle `prefers-reduced-motion: reduce` in DevTools → Rendering; `.pipeline-arrow-pulse` should have `animation: none`.
- **FeaturedPosts**: With 0 blog posts, no blog section DOM node renders. With 1 post, card is centered via `max-w-md mx-auto`. Inspect with Elements panel.
- **Section order**: `grep -n "pipeline\|metrics\|results\|testimonial\|Why Oriflect\|FeaturedPosts\|CTA" src/pages/index.astro` confirms sequence by line number.
