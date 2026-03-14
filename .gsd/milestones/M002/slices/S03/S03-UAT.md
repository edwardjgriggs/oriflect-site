# S03: View Transitions & Page Flow — UAT

**Milestone:** M002
**Written:** 2026-03-14

## UAT Type

- UAT mode: live-runtime
- Why this mode is sufficient: View transitions, dark mode persistence, and script survival can only be verified by navigating in a real browser.

## Preconditions

- `npx astro dev` running and site accessible at localhost:4321
- Browser with JavaScript enabled
- Browser DevTools console accessible

## Smoke Test

Click the "Services" link in the nav from the homepage. The page should cross-fade smoothly to the Services page (no full page reload — no white flash, URL changes without hard refresh).

## Test Cases

### 1. Cross-fade transition between all pages

1. Start on homepage (/).
2. Click "Services" in the nav.
3. **Expected:** Page cross-fades smoothly to /services/. No full-page reload. No white flash.
4. Click "About" in the nav.
5. **Expected:** Smooth cross-fade to /about/.
6. Click "Blog" in the nav.
7. **Expected:** Smooth cross-fade to /blog/.
8. Click "Contact" in the nav.
9. **Expected:** Smooth cross-fade to /contact/.
10. Click the Oriflect logo to return home.
11. **Expected:** Smooth cross-fade back to /.

### 2. Dark mode persists across navigation

1. On any page, click the theme toggle to switch to dark mode.
2. Confirm the page is now dark (dark background, light text).
3. Navigate to a different page using the nav.
4. **Expected:** The new page renders in dark mode immediately — no flash of light mode.
5. Open DevTools console, run: `document.documentElement.classList.contains('dark')` → should return `true`.
6. Run: `localStorage.getItem('theme')` → should return `'dark'`.
7. Navigate to two more pages.
8. **Expected:** Dark mode persists on every navigation without any flash.

### 3. Light mode persists across navigation

1. If in dark mode, click the theme toggle to switch to light mode.
2. Navigate to three different pages.
3. **Expected:** Light mode persists on every navigation — no flash of dark mode.

### 4. Theme toggle works after navigation

1. Navigate from homepage to Services.
2. Click the theme toggle on the Services page.
3. **Expected:** Theme switches (dark↔light). The toggle icon updates correctly.
4. Navigate to About.
5. Click the theme toggle again.
6. **Expected:** Theme switches again. Toggle still fully functional.

### 5. Mobile menu works after navigation

1. Resize browser to mobile width (< 768px) or use DevTools responsive mode.
2. Tap/click the hamburger menu icon.
3. **Expected:** Mobile menu opens, showing nav links.
4. Tap a nav link (e.g., "About").
5. **Expected:** Page navigates to /about/ with cross-fade. Mobile menu is closed on the new page.
6. Tap the hamburger menu again.
7. **Expected:** Mobile menu opens normally — toggle still functional after navigation.

### 6. Browser back/forward with view transitions

1. Navigate: Home → Services → About → Blog.
2. Press browser Back button.
3. **Expected:** Returns to About with smooth transition. Dark/light mode state preserved.
4. Press Back again.
5. **Expected:** Returns to Services. Theme preserved.
6. Press Forward.
7. **Expected:** Goes to About. Theme preserved.

## Edge Cases

### Dark mode toggle rapid + navigate

1. Rapidly click the theme toggle 3-4 times.
2. Note the final state (dark or light).
3. Immediately navigate to another page.
4. **Expected:** The final theme state persists on the new page. No inconsistency.

### Navigate during transition

1. Click a nav link to start a transition.
2. Quickly click another nav link before the first transition completes.
3. **Expected:** Site navigates to the second target without crashing. Theme state preserved.

## Failure Signals

- Full page reload (white flash, browser loading indicator) instead of smooth cross-fade
- Flash of wrong theme color on navigation (light flash in dark mode or vice versa)
- Theme toggle stops working after navigating to a new page (click does nothing)
- Mobile menu doesn't open after navigating to a new page
- Mobile menu stays open after clicking a nav link
- Console errors related to `astro:page-load` or `astro:after-swap`

## Requirements Proved By This UAT

- R003 (Visual design polish) — smooth transitions improve overall site feel and polish

## Not Proven By This UAT

- `prefers-reduced-motion` compliance — deferred to S06
- Transition performance on low-end devices — visual check only, no benchmarking

## Notes for Tester

- The cross-fade is subtle by default — watch the content area (not the header) for the fade effect. If unsure, open DevTools Network tab and confirm no full document requests fire on nav clicks.
- Calendly popup buttons should still work after navigation — try clicking a "Book a Call" CTA after navigating.
