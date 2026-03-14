# S01: Animated Hero & AI Visual Language — UAT

**Milestone:** M002
**Written:** 2026-03-14

## UAT Type

- UAT mode: human-experience
- Why this mode is sufficient: Animation quality, visual layering, and dark mode appearance require human visual judgment in a browser

## Preconditions

- Dev server running (`npx astro dev`) or production build served locally
- Browser with DevTools available (Chrome/Firefox recommended)
- System supports `prefers-reduced-motion` toggle (macOS: System Settings → Accessibility → Display → Reduce motion)

## Smoke Test

Open `http://localhost:4321/` — floating dot nodes should be visible drifting behind the hero text within 2 seconds of page load.

## Test Cases

### 1. Animation visible in light mode

1. Open homepage in light mode (default)
2. Observe the hero section background
3. **Expected:** ~15 small translucent dots (opacity 0.15–0.3) float gently up/down with slight horizontal drift. 4 faint connecting lines pulse in opacity. Animation is subtle and doesn't distract from hero text.

### 2. Hero text and CTA remain usable

1. On the homepage, read the hero heading and subtext
2. Click the "Schedule Your Free AI Discovery Call" button
3. **Expected:** Text is fully readable over the animation. CTA button is clickable and opens the Calendly popup. Animation dots do not intercept clicks.

### 3. Dark mode adaptation

1. Toggle dark mode using the theme toggle in the header
2. Observe the hero animation
3. **Expected:** Node dots shift to a lighter/blue-white tint visible against the dark background. Animation continues smoothly. No flash or re-render glitch during toggle.

### 4. Reduced motion support

1. Enable "Reduce motion" in OS accessibility settings (or use DevTools: Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`)
2. Reload the homepage
3. **Expected:** All floating dot and line animations are paused — nodes visible but static, lines visible but not pulsing.

### 5. Existing hero content preserved

1. Open homepage and inspect the hero section
2. **Expected:** Hero gradient background still present. Heading text ("Intelligent Solutions..."), subheading, and CTA button all present and unchanged from before this slice.

## Edge Cases

### Narrow viewport (mobile)

1. Resize browser to 375px width or use mobile emulation
2. **Expected:** Animation nodes still visible but don't cause horizontal overflow or scrollbar. Hero text remains readable and CTA button remains accessible.

### Page scroll

1. Scroll down past the hero section
2. Scroll back up to the hero
3. **Expected:** Animation continues running smoothly. No janky restart or position reset on scroll return.

## Failure Signals

- No floating dots visible in hero section — component not rendering
- CTA button unclickable — animation layer has pointer-events or z-index issue
- Horizontal scrollbar appears — nodes positioned outside viewport bounds
- Animation runs with `prefers-reduced-motion: reduce` enabled — media query not working
- Dots invisible in dark mode — dark mode color adaptation missing

## Requirements Proved By This UAT

- R005 — Animated hero background with AI visual motifs (visual confirmation of floating nodes and connecting lines)
- R015 — prefers-reduced-motion support for hero animations (test case 4)

## Not Proven By This UAT

- R005 full coverage — AI motifs reused across other pages (deferred to S05/S06)
- R015 full coverage — reduced-motion for all site animations (final audit in S06)
- Mobile performance under CPU throttling (risk retirement deferred to S06)

## Notes for Tester

- Animation is intentionally very subtle (low opacity). Look carefully — the dots are translucent, not bold.
- The connecting SVG lines are even more subtle than the dots — they pulse between very low opacity values.
- If you don't see animation after 5 seconds, check that `prefers-reduced-motion` is NOT enabled in your OS/browser.
