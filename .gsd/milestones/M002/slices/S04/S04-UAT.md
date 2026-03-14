# S04: Social Proof & Results Showcase — UAT

**Milestone:** M002
**Written:** 2026-03-14

## UAT Type

- UAT mode: mixed
- Why this mode is sufficient: Contract checks verify build and file structure; live-runtime needed for testimonial rotation, scroll-reveal animations, and dark mode styling

## Preconditions

- `npm run dev` running at localhost:4321
- Browser with DevTools available

## Smoke Test

Navigate to homepage, scroll down — you should see a "Results That Speak" section with 3 before/after cards and a "What Our Clients Say" section with a quote and navigation dots.

## Test Cases

### 1. Results Showcase renders correctly

1. Open homepage at localhost:4321
2. Scroll to "Results That Speak" section
3. **Expected:** 3 cards visible in a row (stacking on mobile). Each card shows a scenario title, before metric (muted), arrow, and after metric (ember-colored). Metrics: "40hrs→4hrs", "2-day→instant", "15%→67%".

### 2. Testimonials display and rotate

1. Scroll to "What Our Clients Say" section
2. Observe the initial quote displayed
3. Wait 5+ seconds
4. **Expected:** Quote transitions to the next one with a smooth opacity fade. Active dot indicator changes to match current slide.

### 3. Testimonial dot navigation

1. On the testimonials section, click a non-active dot
2. **Expected:** The testimonial immediately transitions to the corresponding quote. The clicked dot becomes active (ember color).

### 4. Dark mode styling

1. Toggle dark mode via the theme toggle
2. Scroll to both new sections
3. **Expected:** Cards have dark background (dark-surface), text is readable, ember accents remain visible. No white flashes or broken contrast.

### 5. Scroll-reveal entrance animation

1. Reload the page
2. Scroll slowly toward the Results section
3. **Expected:** Cards fade/slide into view as they enter the viewport, with slight stagger between cards.

### 6. View transition cleanup

1. From the homepage, click "Services" in the nav
2. Click back to "Home"
3. Scroll to testimonials
4. **Expected:** Testimonial rotation restarts correctly. No console errors about stale DOM references.

## Edge Cases

### Reduced motion preference

1. In DevTools, enable "Emulate CSS media feature prefers-reduced-motion: reduce"
2. Reload homepage, scroll to testimonials
3. Wait 10 seconds
4. **Expected:** No auto-rotation occurs. Dot navigation still works for manual switching. Quotes should appear without transition animation.

### JavaScript disabled

1. Disable JavaScript in browser
2. Load homepage
3. **Expected:** First testimonial quote is visible. Results cards display normally (no JS dependency). No broken layout.

### Mobile viewport

1. Set viewport to 375px width
2. Scroll through both sections
3. **Expected:** Results cards stack vertically. Testimonial section remains readable with dots centered below.

## Failure Signals

- Cards show no content or broken layout
- Testimonials stuck on one slide (auto-rotation broken)
- Console errors after page transitions (interval cleanup failed)
- White/unstyled flash in dark mode on either section
- Dots don't respond to clicks

## Requirements Proved By This UAT

- R005 — Social proof sections exist on homepage with scroll-reveal animations

## Not Proven By This UAT

- Real client data (placeholder content used)
- Performance under load (static site, not applicable)

## Notes for Tester

- Testimonial content is realistic but fictional — focus on behavior, not copy accuracy
- The 5-second auto-advance interval means you need to wait at least 5s to observe rotation
- Staggered reveal delays on results cards are subtle (100ms apart) — watch carefully on first scroll
