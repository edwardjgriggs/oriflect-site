# S05: Service Pipeline & Blog Feature

**Goal:** Homepage service pipeline animates as a connected flow with pulsing connections; latest blog posts are featured on homepage below testimonials.
**Demo:** Pipeline arrows pulse/animate between cards on desktop; FeaturedPosts section shows latest blog post(s) with responsive layout; homepage section order is hero → pipeline → metrics → results → testimonials → why oriflect → blog → CTA.

## Must-Haves

- Pipeline arrow SVGs animate with a pulsing/flowing effect (CSS keyframes)
- `prefers-reduced-motion` disables pipeline animations
- `FeaturedPosts.astro` component shows up to 3 latest blog posts
- FeaturedPosts handles 1 post gracefully (centered, not broken grid)
- FeaturedPosts handles 0 posts (doesn't render or shows graceful fallback)
- Homepage sections reordered: hero → pipeline → metrics → results → testimonials → why oriflect → blog → CTA
- Blog section wrapped in ScrollReveal
- `astro build` exits 0

## Verification

- `npx astro build` exits 0
- `grep "pulse\|pipelineFlow" src/pages/index.astro src/styles/global.css` — animation CSS exists
- `grep "prefers-reduced-motion" src/styles/global.css` — covers pipeline animation
- `test -f src/components/FeaturedPosts.astro` — component exists
- `grep "FeaturedPosts" src/pages/index.astro` — wired into homepage
- Homepage section order verified by grep sequence: pipeline before metrics before results before testimonials before "Why Oriflect" before FeaturedPosts before CTA
- `npx astro build 2>&1 | grep -i "error"` — no build errors in output

## Tasks

- [x] **T01: Animate pipeline arrows, create FeaturedPosts, and reorder homepage sections** `est:25m`
  - Why: Delivers the full slice — pipeline animation, blog feature, and section reorder
  - Files: `src/pages/index.astro`, `src/components/FeaturedPosts.astro`, `src/styles/global.css`
  - Do: (1) Add CSS keyframe animation to pipeline arrow SVGs — pulsing opacity + optional traveling dot effect, with `prefers-reduced-motion` guard. (2) Create `FeaturedPosts.astro` accepting `posts` prop, showing up to 3 posts in responsive card grid (centers single post), handles 0 posts by not rendering. (3) In `index.astro`, import FeaturedPosts, fetch blog posts with `getCollection('blog')`, reorder sections to target order, insert FeaturedPosts between Why Oriflect and CTA wrapped in ScrollReveal.
  - Verify: `npx astro build` exits 0; grep confirms animation CSS, FeaturedPosts import, and correct section order
  - Done when: Pipeline arrows animate, blog posts appear on homepage, sections in correct order, build passes

## Files Likely Touched

- `src/pages/index.astro`
- `src/components/FeaturedPosts.astro`
- `src/styles/global.css`

## Observability / Diagnostics

- **Pipeline animation**: Inspect arrow elements in browser DevTools → Animations panel to verify `pipeline-pulse` keyframe runs. Check computed `animation` property on `.pipeline-arrow-pulse` elements.
- **Reduced motion**: Toggle `prefers-reduced-motion: reduce` in DevTools → Rendering panel; arrows should stop animating.
- **FeaturedPosts**: If 0 blog posts exist, the section renders nothing (no empty container in DOM). Verify with DevTools Elements panel.
- **Build failure diagnostics**: `npx astro build` outputs errors to stderr with file/line references. Check for import resolution or template syntax errors.
- **No sensitive data**: Blog posts are public content; no redaction constraints apply.
