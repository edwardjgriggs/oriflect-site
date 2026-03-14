# S06: Micro-interactions & Final Polish — UAT

**Milestone:** M002
**Written:** 2026-03-14

## UAT Type

- UAT mode: mixed
- Why this mode is sufficient: Focus-visible and active states require visual/keyboard verification; reduced-motion and build health are artifact-verifiable

## Preconditions

- Site built successfully (`npx astro build` exits 0)
- Dev server running (`npx astro dev`) for interactive testing
- Modern browser with DevTools (Chrome/Firefox recommended)

## Smoke Test

Tab through the homepage — every button and link should show an ember-colored focus ring. Click any CTA button — it should visually compress slightly on press.

## Test Cases

### 1. Focus-visible ring on keyboard navigation

1. Open the homepage in a browser
2. Press Tab repeatedly to move focus through interactive elements
3. **Expected:** Each focused button, link, and interactive element shows a 2px ember-colored outline ring with 2px offset
4. Navigate to /services, /about, /blog, /contact and repeat
5. **Expected:** Focus ring appears consistently on all pages

### 2. Active press feedback on buttons

1. On the homepage, click and hold any CTA button (e.g., "Book Your Free Discovery Call")
2. **Expected:** Button scales down slightly (0.97) while pressed, returns to normal on release
3. Click and hold a navigation link in the header
4. **Expected:** Same subtle scale-down effect

### 3. Reduced-motion suppresses card hover lifts

1. Open browser DevTools → Rendering → check "Emulate CSS media feature prefers-reduced-motion: reduce"
2. Hover over service pipeline cards on the homepage (they normally lift with `-translate-y-1`)
3. **Expected:** Cards do NOT lift/translate on hover — transform is suppressed
4. Hover over blog post cards in the Featured Posts section
5. **Expected:** Same — no translate movement on hover

### 4. Reduced-motion suppresses active scale

1. With reduced-motion still emulated, click and hold a CTA button
2. **Expected:** No scale-down effect occurs — active transform is suppressed

### 5. Build health and size

1. Run `npx astro build`
2. **Expected:** Exits 0, 6 pages built
3. Run `du -sh dist/`
4. **Expected:** Total size under 5MB (currently ~2.3MB)

## Edge Cases

### Mouse click does not show focus ring

1. Click a button with the mouse (not keyboard)
2. **Expected:** No focus ring appears (`:focus-visible` only triggers on keyboard navigation, not mouse clicks)

### Focus ring on form inputs

1. Navigate to /contact page
2. Tab into the contact form fields
3. **Expected:** Each input and textarea shows the ember focus ring

## Failure Signals

- No visible focus ring when tabbing through elements
- Buttons don't compress on click
- Cards still lift on hover when reduced-motion is enabled
- `npx astro build` fails with non-zero exit code
- Build size exceeds 5MB

## Requirements Proved By This UAT

- R005 (hover/focus/active states) — Tests 1-2 prove interactive polish
- R013 (prefers-reduced-motion) — Tests 3-4 prove motion suppression
- R003 (visual design polish) — All tests collectively prove polish quality

## Not Proven By This UAT

- Lighthouse performance score (not measured, only build size)
- Screen reader compatibility of focus management
- Mobile touch interaction quality (active states may behave differently on touch)

## Notes for Tester

- The focus ring color is ember (the brand accent color) — it should be visible in both light and dark modes
- Active scale effect is subtle (3% reduction) — look carefully or use DevTools to confirm the transform
- Reduced-motion testing requires DevTools emulation — there's no UI toggle for it
