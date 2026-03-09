# Phase 1: Foundation - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Project scaffold with Astro 5.x + Tailwind CSS 4.2, responsive layout shell (header, footer, page wrapper), design system (colors, typography, spacing), and deployment pipeline to Vercel. Delivers a professional, branded site shell that all subsequent pages build on.

</domain>

<decisions>
## Implementation Decisions

### Brand & Color System
- Primary: Deep Sapphire (#0A2463) — headers, buttons, logo backgrounds, key text accents
- Secondary: Radiant Gold (#D4A843) — accents, highlights, dividers
- Accent: Ember Orange (#E8651A) — CTA buttons, attention-grabbers. Use sparingly (max 10%)
- Text: Charcoal (#1C1C1E) — body copy and headlines on light backgrounds
- Background: Soft Ivory (#F8F6F0) — used instead of pure white for warmth
- Tints: Sapphire Tint (#E8EDF5) for highlights/table rows, Gold Tint (#F5EDD8) for callout boxes/testimonial cards, Pure White (#FFFFFF) for content cards on ivory
- 60-30-10 ratio: 60% Soft Ivory/White backgrounds, 30% Deep Sapphire structural elements, 10% Gold + Ember Orange accents/CTAs

### Typography
- Headings: Montserrat (Bold, 700 weight)
- Body/UI: Inter (Regular 400 for body, Medium 500 for buttons/labels/nav/captions)
- Accents/Quotes: Playfair Display (Regular, 400 weight) — taglines, testimonials, special callouts
- Code: JetBrains Mono (Regular, 400 weight)
- Type scale: 48-64px hero → 14px small captions. Body at 16-18px with 1.6 line height
- Self-host all fonts via @fontsource packages for performance

### Dark Mode
- Dark mode supported from the start
- Implement a theme toggle

### Imagery
- Icons + minimal imagery approach — clean, icon-driven design
- Hero may include an image but overall aesthetic is typographic

### Navigation
- Fixed/sticky navigation bar at top of page
- Background: Deep Sapphire (#0A2463) with white text
- Logo on the left side
- Nav links: Home, Services, About, Blog
- CTA button ("Book a Discovery Call") positioned inline after nav links, styled as Ember Orange button
- Mobile: hamburger menu icon with nav collapse
- CTA button color on dark nav: Claude's discretion (Ember Orange or Radiant Gold)
- Mobile CTA visibility without opening menu: Claude's discretion
- Mobile menu animation: Claude's discretion

### Footer
- Contact info (email, phone, location)
- Social links: LinkedIn, Twitter/X
- No nav links or legal links in footer for v1
- Background color: Claude's discretion
- Layout: Claude's discretion

### Page Layout
- Content max width: Claude's discretion
- Whitespace/spacing: Claude's discretion (generous preferred given consulting aesthetic)

### Deployment
- Hosting: Vercel
- Domain: oriflect.com (already owned)
- Deploy immediately — get the shell live on a preview URL, add content progressively
- CI/CD via Vercel's git integration

### Claude's Discretion
- Card style (shadow vs bordered)
- Footer background color and layout
- Content max width
- Whitespace/spacing scale
- Mobile menu animation style
- Mobile CTA visibility behavior
- Nav CTA accent color on dark background

</decisions>

<specifics>
## Specific Ideas

- "McKinsey meets tech" aesthetic — professional and clean, corporate-leaning but not stuffy
- Logo files are ready (SVG/PNG) and will be provided
- Playfair Display pairs nicely with Radiant Gold accents for testimonial/quote sections

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project

### Established Patterns
- None — patterns will be established in this phase

### Integration Points
- Astro project scaffold creates the structure all subsequent phases build on
- Tailwind config will define the design tokens (colors, fonts, spacing) used everywhere
- Layout components (Header, Footer, PageWrapper) will be shared across all pages

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-09*
