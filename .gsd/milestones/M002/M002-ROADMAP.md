# M002: Site Enhancement v2 — Kinetic & Polished

**Vision:** Transform the Oriflect website from a static brochure into a dynamic, technically impressive site that visually demonstrates AI expertise through motion, social proof, and interactive elements — keeping the existing light/dark brand scheme while making every page feel alive.

## Success Criteria

- Homepage hero has an animated background with AI-themed visual motifs
- Every page has scroll-reveal animations on content sections
- Page navigation uses smooth Astro View Transitions
- Homepage includes animated metrics counters, client results showcase, and featured blog posts
- Service pipeline animates as a connected flow
- All interactive elements have polished hover/press states
- All animations respect `prefers-reduced-motion`
- `astro build` exits 0 with no performance regressions

## Key Risks / Unknowns

- Hero animation performance on mobile — canvas/particle effects can be heavy on low-end devices
- View Transitions + dark mode — state must persist across transitions without flash
- Animation weight — must stay lightweight without pulling in heavy JS libraries

## Proof Strategy

- Hero performance → retire in S01 by proving animation runs smooth on mobile viewport (throttled CPU test or real device)
- View Transitions + dark mode → retire in S03 by proving dark mode persists across all page navigations
- Animation weight → retire in S06 by proving build size hasn't ballooned and Lighthouse performance stays green

## Verification Classes

- Contract verification: `astro build` exits 0; grep dist/ for animation classes/scripts; file existence checks
- Integration verification: browser verification of animations, transitions, dark mode persistence
- Operational verification: none (static site)
- UAT / human verification: visual quality judgment on animations, overall feel

## Milestone Definition of Done

This milestone is complete only when all are true:

- All 6 slices complete with summaries
- Homepage tells complete story: animated hero → scroll reveals → metrics → results → pipeline → blog → CTA
- View Transitions work on all page navigations
- Dark mode persists across transitions without flash
- `prefers-reduced-motion` disables/reduces all animations
- `astro build` exits 0
- All changes pushed to origin/main

## Requirement Coverage

- Covers: R005, R006, R007, R008, R009, R013, R014, R015, R016
- Partially covers: none
- Leaves for later: R010 (CMS), R011 (social URLs), R012 (phone number)
- Orphan risks: none

## Slices

- [x] **S01: Animated Hero & AI Visual Language** `risk:medium` `depends:[]`
  > After this: Homepage hero has a subtle animated background with floating nodes/shapes evoking AI; reusable CSS animation patterns established for downstream slices.

- [x] **S02: Scroll Reveal & Metrics Animations** `risk:low` `depends:[]`
  > After this: All pages have sections that fade/slide into view on scroll; homepage has a metrics section with numbers that count up when scrolled into view.

- [x] **S03: View Transitions & Page Flow** `risk:low` `depends:[]`
  > After this: Navigating between any pages cross-fades smoothly; dark mode state persists across transitions; no flash of wrong theme.

- [x] **S04: Social Proof & Results Showcase** `risk:medium` `depends:[S02]`
  > After this: Homepage has animated before/after client results cards and a rotating testimonial section, all with scroll-reveal animations.

- [x] **S05: Service Pipeline & Blog Feature** `risk:low` `depends:[S02,S04]`
  > After this: Homepage service pipeline animates as a connected flow with pulsing connections; latest blog posts are featured on homepage below the results section.

- [x] **S06: Micro-interactions & Final Polish** `risk:low` `depends:[S01,S02,S03,S04,S05]`
  > After this: All cards, buttons, and links have polished hover states; `prefers-reduced-motion` verified; performance audited; site builds clean.

## Boundary Map

### S01 → downstream

Produces:
- `src/components/HeroAnimation.astro` — animated background component for homepage hero
- CSS animation patterns in `global.css` or component styles — keyframes, timing functions reusable by other slices
- AI visual motif elements (node dots, connecting lines, gradient shifts) as CSS/inline SVG patterns

Consumes:
- nothing (first slice)

### S02 → S04, S05, S06

Produces:
- `src/components/ScrollReveal.astro` (or equivalent JS utility) — reusable scroll-triggered animation wrapper using Intersection Observer
- `src/components/MetricsCounter.astro` — animated counting number component
- Scroll-reveal CSS classes applicable to any section

Consumes:
- nothing (independent of S01)

### S03 → S06

Produces:
- View Transitions wired into `BaseLayout.astro` via Astro's `<ClientRouter />` (or `<ViewTransitions />`)
- Dark mode persistence logic that survives transitions
- `transition:animate` directives on key shared elements (header, main content)

Consumes:
- nothing (independent of S01, S02)

### S04 → S05

Produces:
- `src/components/ResultsShowcase.astro` — before/after results cards with animation
- `src/components/Testimonials.astro` — rotating testimonial section
- New homepage sections inserted between existing "Why Oriflect" and CTA sections

Consumes from S02:
- ScrollReveal wrapper for entrance animations on results and testimonial sections

### S05 → S06

Produces:
- Redesigned service pipeline section in `index.astro` with animated flow connections
- `src/components/FeaturedPosts.astro` — latest blog posts section for homepage
- Updated homepage section ordering: hero → services pipeline → metrics → results → testimonials → blog → CTA

Consumes from S02:
- ScrollReveal wrapper for section entrance animations
Consumes from S04:
- Results and testimonials sections already placed on homepage (S05 adds pipeline + blog around them)

### S06 → (final)

Produces:
- Refined hover/press states across all interactive elements site-wide
- `prefers-reduced-motion` media query coverage for all animations
- Performance verification (build size, Lighthouse)

Consumes from S01–S05:
- All animation components, view transitions, new homepage sections — S06 polishes and audits everything
