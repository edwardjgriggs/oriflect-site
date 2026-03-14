---
estimated_steps: 5
estimated_files: 3
---

# T01: Animate pipeline arrows, create FeaturedPosts, and reorder homepage sections

**Slice:** S05 — Service Pipeline & Blog Feature
**Milestone:** M002

## Description

Deliver both S05 deliverables in one pass: (1) animate the existing static SVG arrows in the service pipeline section with CSS pulsing/flowing effects, (2) create a FeaturedPosts component for the homepage, and (3) reorder homepage sections to the target order with blog posts inserted before CTA.

## Steps

1. Add pipeline arrow animation CSS to `global.css` — keyframe animation (pulse opacity 0.4→1→0.4 over ~2s infinite) applied to the arrow SVG containers. Add `prefers-reduced-motion` rule to disable.
2. Apply animation class to both arrow `<div>` elements in `index.astro`'s pipeline section.
3. Create `src/components/FeaturedPosts.astro` — accepts `posts` prop (array of blog collection entries). Renders section with heading + responsive card grid (1 col mobile, up to 3 col desktop). Each card: title, formatted date, description, "Read more →" link. If 0 posts, render nothing. If 1 post, center it. Style consistent with existing card patterns (bg-white dark:bg-dark-surface rounded-xl shadow).
4. In `index.astro`: import FeaturedPosts, add `getCollection('blog')` + sort in frontmatter. Move Results and Testimonials above Why Oriflect. Insert `<FeaturedPosts posts={posts.slice(0, 3)} />` wrapped in ScrollReveal between Why Oriflect and CTA.
5. Verify: `npx astro build` exits 0, grep for animation classes and section order.

## Must-Haves

- [ ] Pipeline arrows have CSS pulse animation
- [ ] `prefers-reduced-motion` disables pipeline animation
- [ ] FeaturedPosts component created and handles 0, 1, and 3 posts
- [ ] Homepage section order: hero → pipeline → metrics → results → testimonials → why oriflect → blog → CTA
- [ ] Blog section wrapped in ScrollReveal
- [ ] `astro build` exits 0

## Verification

- `npx astro build` → exit 0
- `grep -n "pipeline-pulse\|pipelinePulse\|arrow-pulse" src/pages/index.astro src/styles/global.css` — animation exists
- `grep -n "FeaturedPosts" src/pages/index.astro` — component wired in
- In index.astro, verify "Service Pipeline" appears before "Metrics", before "Results", before "Testimonials", before "Why Oriflect", before "FeaturedPosts", before "CTA"

## Inputs

- `src/pages/index.astro` — current homepage with pipeline section (arrows at lines ~66-70, ~92-96) and all existing sections
- `src/pages/blog.astro` — `getCollection('blog')` pattern to reuse
- `src/components/ScrollReveal.astro` — wrapper for entrance animations
- `src/styles/global.css` — add animation keyframes here

## Expected Output

- `src/components/FeaturedPosts.astro` — created, blog posts card grid component
- `src/pages/index.astro` — modified: animated arrow classes, reordered sections, FeaturedPosts integrated
- `src/styles/global.css` — modified: pipeline pulse animation keyframes + reduced-motion guard

## Observability Impact

- **New CSS animation**: `.pipeline-arrow-pulse` class applies `pipeline-pulse` keyframe. Inspectable via DevTools Animations panel on arrow `<div>` elements.
- **Reduced motion guard**: `prefers-reduced-motion: reduce` disables pipeline animation. Testable via DevTools Rendering → Emulate CSS media feature.
- **FeaturedPosts conditional render**: When 0 posts, no DOM element is rendered. When posts exist, a `<section>` with heading "Latest from the Blog" appears. Grep for this heading in built HTML to verify.
- **Build signals**: `npx astro build` exit code and stderr are the primary diagnostic surface.
