---
id: S05
milestone: M002
status: ready
---

# S05: Service Pipeline & Blog Feature — Context

## Goal

Animate the existing service pipeline section with pulsing connection lines showing flow between stages, and add a featured blog posts section to the homepage.

## Why this Slice

This slice completes the homepage content story. After S04 placed results cards, S05 adds the animated pipeline (upgrading an existing static section) and featured blog posts — filling in the final homepage sections before S06's polish pass. The updated homepage ordering after this slice: hero → pipeline → metrics → results → blog → CTA.

## Scope

### In Scope

- **Pipeline animation:** Keep existing 3-card layout (Audit → Implementation → Training) but replace static SVG arrows with animated connection lines — pulsing/glowing dots that travel along the connections showing flow direction
- Pipeline cards stagger in via scroll-reveal (from S02), then connection animation plays continuously
- Connection animation works on desktop (horizontal arrows) and degrades gracefully on mobile (vertical stacked layout — simplified or no connection animation)
- `prefers-reduced-motion`: connections shown as static lines, no pulsing/movement
- **Featured blog posts:** `FeaturedPosts.astro` component showing up to 3 latest posts
- Each blog card shows: title, publication date, short description excerpt, "Read more" link
- If fewer than 3 posts exist, show what's available (even just 1) — no empty slots or "coming soon"
- Section positioned on homepage between results showcase (S04) and final CTA
- Scroll-reveal entrance animation using S02's ScrollReveal wrapper
- Works in both light and dark mode
- `astro build` exits 0

### Out of Scope

- Changes to pipeline card content or pricing
- Changes to blog post content or schema
- New blog posts — uses whatever exists in the content collection
- Testimonials section (deferred from S04)
- Blog listing page changes — this only adds a homepage feature section
- Click-through filtering or pagination

## Constraints

- CSS animations + vanilla JS only (D013)
- Tailwind CSS v4 CSS-first config (D001)
- Blog content collection unchanged — query with Astro Content Layer API using `post.id` for slugs (D008)
- Must not break existing pipeline card links to `/services#audit`, etc.
- Must not break existing Calendly CTA
- `astro build` must exit 0

## Integration Points

### Consumes

- `src/components/ScrollReveal.astro` (from S02) — scroll-triggered entrance animations
- `src/components/ResultsShowcase.astro` (from S04) — already placed on homepage; S05 arranges blog section around it
- `src/content/config.ts` + blog markdown files — blog content collection for featured posts query
- `src/pages/index.astro` — existing pipeline section to enhance + insert blog section

### Produces

- Redesigned service pipeline section in `index.astro` with animated pulsing connection lines between cards
- `src/components/FeaturedPosts.astro` — latest blog posts section for homepage
- Updated homepage section ordering: hero → pipeline → metrics → results → blog → CTA

## Open Questions

- Exact pulsing animation style (dot traveling along a line vs line glow pulse) — decide during implementation; should feel technical/data-flowing, not decorative
- Mobile pipeline connection treatment — may simplify to vertical dots or remove animation entirely on small screens; decide during implementation based on what looks good
