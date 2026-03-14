# S05: Service Pipeline & Blog Feature — UAT

**Milestone:** M002
**Written:** 2026-03-14

## UAT Type

- UAT mode: mixed
- Why this mode is sufficient: Pipeline animation and section order can be verified via artifact inspection (grep, build); visual quality and blog card layout require browser check.

## Preconditions

- `npx astro dev` running at localhost:4321
- At least 1 blog post exists in `src/content/blog/`

## Smoke Test

Open `http://localhost:4321/` — page loads, pipeline arrows between service cards visibly pulse, scrolling down reveals a "Latest Insights" / blog section with at least one post card before the final CTA.

## Test Cases

### 1. Pipeline arrows animate on desktop

1. Open homepage at ≥768px viewport width
2. Observe the arrow elements between the three service cards
3. **Expected:** Arrows smoothly pulse (opacity fades in/out) in a continuous 2-second cycle

### 2. Pipeline arrows hidden on mobile

1. Resize viewport below 768px (or use mobile emulation)
2. **Expected:** Arrow elements between service cards are not visible (`hidden md:flex`)

### 3. Reduced motion disables pipeline animation

1. Open DevTools → Rendering → check "Emulate CSS media feature prefers-reduced-motion: reduce"
2. Observe pipeline arrows
3. **Expected:** Arrows are static — no pulsing animation

### 4. FeaturedPosts shows blog cards

1. Scroll to the blog section (between "Why Oriflect" and final CTA)
2. **Expected:** Up to 3 blog post cards displayed with title, date, description, and "Read more →" link
3. Click a "Read more" link
4. **Expected:** Navigates to the individual blog post page

### 5. Homepage section order

1. Scroll through the full homepage top to bottom
2. **Expected:** Sections appear in order: Hero → Service Pipeline → Metrics counters → Results Showcase → Testimonials → Why Oriflect → Blog (FeaturedPosts) → CTA

### 6. Blog section has scroll-reveal animation

1. Refresh page, scroll slowly to the blog section
2. **Expected:** Blog section fades/slides into view when scrolled into viewport

## Edge Cases

### 0 blog posts

1. Temporarily rename/remove all files in `src/content/blog/`
2. Rebuild and load homepage
3. **Expected:** No blog section renders — no empty container, no heading, no broken grid

### 1 blog post

1. Ensure only 1 post exists in `src/content/blog/`
2. Load homepage
3. **Expected:** Single blog card is centered (not left-aligned in a 3-column grid)

## Failure Signals

- Pipeline arrows are static on desktop (animation not applied)
- Blog section shows with 0 posts (empty container in DOM)
- Section order doesn't match target sequence
- `npx astro build` fails
- "Read more" link 404s or navigates to wrong page

## Requirements Proved By This UAT

- R003 (Visual design polish) — pipeline animation and blog feature enhance homepage visual quality (partial proof; full proof requires S06 audit)

## Not Proven By This UAT

- Performance impact of pipeline animation on low-end devices
- Blog post content quality (editorial concern, not technical)
- Full reduced-motion audit (deferred to S06)

## Notes for Tester

- Only 1 blog post currently exists, so the 3-card grid won't be fully populated. The layout should still look clean.
- Pipeline arrows use `hidden md:flex` — they only appear on medium+ viewports.
