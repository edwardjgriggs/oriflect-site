# S05: Service Pipeline & Blog Feature — Research

**Date:** 2026-03-14

## Summary

S05 has two deliverables: (1) animate the existing service pipeline section with pulsing/flowing connections between the 3 cards, and (2) add a FeaturedPosts component showing latest blog posts on the homepage. Both are low-risk — the pipeline section already exists with static SVG arrows that just need animation, and the blog content collection is already working with an established `getCollection('blog')` pattern.

The current homepage section order is: hero → pipeline → metrics → why oriflect → results → testimonials → CTA. The boundary map says the target order should be: hero → pipeline → metrics → results → testimonials → blog → CTA. This means we need to move results/testimonials above "Why Oriflect" or remove "Why Oriflect" — but since the roadmap says "no content changes to existing copy," we should keep Why Oriflect and insert blog between testimonials and CTA. The S04 forward intelligence says "S05 needs to reorder to: hero → services pipeline → metrics → results → testimonials → blog → CTA" — this drops Why Oriflect from the listed order but doesn't say to remove it. Safest approach: keep Why Oriflect but move it, or keep current order and just insert blog before CTA.

## Recommendation

1. **Service pipeline animation:** Replace the static SVG arrows between cards with animated pulsing connector elements — CSS-only using keyframe animations on the existing arrow SVGs (pulse opacity, add a traveling dot or gradient). Add `prefers-reduced-motion` guard. No JS needed.

2. **FeaturedPosts component:** Create `src/components/FeaturedPosts.astro` that accepts posts as a prop (fetched in index.astro). Show up to 3 latest posts in a card grid with title, date, description, and "Read more" link. Style consistent with existing card patterns.

3. **Section reorder:** Reorder to: hero → pipeline (animated) → metrics → results → testimonials → why oriflect → blog → CTA. This keeps all existing sections and adds blog in a natural spot before the final CTA.

## Don't Hand-Roll

| Problem | Existing Solution | Why Use It |
|---------|------------------|------------|
| Scroll-triggered entrance | `ScrollReveal.astro` | Already used across all pages; wrap new blog section |
| Blog data fetching | `getCollection('blog')` from Astro | Already working in blog.astro; proven pattern |
| Card styling | Existing card patterns in index.astro | Consistent dark/light mode support |

## Existing Code and Patterns

- `src/pages/index.astro` — current homepage; pipeline section at lines 37-118 with 3 cards and static SVG arrows in a 5-column grid (`1fr auto 1fr auto 1fr`). Arrows are hidden on mobile (`hidden md:flex`).
- `src/pages/blog.astro` — `getCollection('blog')` + sort by pubDate descending. Card layout with title, date, tags, description. Reuse this data-fetching pattern.
- `src/content/blog/ai-for-smbs-what-actually-works.md` — only 1 blog post exists. FeaturedPosts must handle 0-3 posts gracefully.
- `src/components/ScrollReveal.astro` — wrap new sections; accepts `direction` and `delay` props.
- `src/components/ResultsShowcase.astro` / `Testimonials.astro` — S04 components already placed on homepage.
- `src/content/config.ts` — blog schema: title, description, pubDate, tags (optional).

## Constraints

- Only 1 blog post exists — FeaturedPosts must look good with 1 post (not just 3-column grid with 2 empty slots)
- Static site, no SSR — blog posts fetched at build time via `getCollection`
- Pipeline is a 5-column CSS grid on desktop — animation must work within this layout
- All animations must have `prefers-reduced-motion` fallback
- Must not break existing Calendly integration or dark mode
- Tailwind v4 CSS-first config — custom CSS goes in `global.css` or component `<style>` blocks

## Common Pitfalls

- **Breaking section order during reorder** — index.astro has many sections; carefully cut/paste. Verify all sections present after edit.
- **Pipeline animation on mobile** — arrows are `hidden md:flex` on mobile; animation CSS must not cause layout issues when arrows are hidden.
- **Empty blog state** — if no posts exist, FeaturedPosts should either not render or show a graceful message.

## Open Risks

- With only 1 blog post, the featured section may look sparse — mitigate with responsive layout that centers a single card.

## Skills Discovered

| Technology | Skill | Status |
|------------|-------|--------|
| Astro | frontend-design | installed (available_skills) |

No additional skills needed — this is straightforward CSS animation + Astro component work.

## Sources

- Existing codebase files (index.astro, blog.astro, content/config.ts) — primary source of truth
- S02 and S04 summaries — established patterns for ScrollReveal usage and component integration
