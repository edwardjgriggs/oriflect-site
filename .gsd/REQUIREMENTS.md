# Requirements

This file is the explicit capability and coverage contract for the project.

## Active

### R005 — Animated hero background with AI visual motifs
- Class: differentiator
- Status: active
- Description: The homepage hero must have an animated background (floating particles, nodes, or morphing shapes) that evokes AI/technology. Reusable decorative AI motifs established for use across pages.
- Why it matters: First impression — an AI consulting company's hero should visually demonstrate technical sophistication, not just describe it.
- Source: user
- Primary owning slice: M002/S01
- Supporting slices: M002/S05
- Validation: unmapped
- Notes: Keep the current light/dark scheme. Animation should be subtle, not distracting from hero text and CTA.

### R006 — Scroll-reveal animations on all pages
- Class: quality-attribute
- Status: active
- Description: Content sections across all pages must fade/slide into view as the user scrolls down.
- Why it matters: Makes the site feel alive and dynamic instead of static. Standard expectation for modern tech sites.
- Source: user
- Primary owning slice: M002/S02
- Supporting slices: none
- Validation: unmapped
- Notes: Use Intersection Observer. Should be lightweight — no heavy animation library if avoidable.

### R007 — Animated metrics/counters section
- Class: differentiator
- Status: active
- Description: Homepage must include a metrics section with numbers that count up when scrolled into view (e.g. "150+ hours saved," "3.2x average ROI").
- Why it matters: Quantified results are the most persuasive element on a consulting site. Animation draws attention to them.
- Source: inferred
- Primary owning slice: M002/S02
- Supporting slices: M002/S04
- Validation: unmapped
- Notes: Numbers can be representative/projected for now. Counter animation triggers once on scroll-in.

### R008 — Astro View Transitions between pages
- Class: quality-attribute
- Status: active
- Description: Navigation between pages must use Astro View Transitions for smooth cross-fade/morph effects instead of hard page reloads.
- Why it matters: Eliminates the jarring flash between pages; makes the site feel like a polished app.
- Source: user
- Primary owning slice: M002/S03
- Supporting slices: none
- Validation: unmapped
- Notes: Astro has built-in View Transitions API support. Must handle dark mode persistence across transitions.

### R009 — Social proof & client results showcase
- Class: primary-user-loop
- Status: active
- Description: Homepage must include animated before/after client results cards and a testimonial rotation section.
- Why it matters: Social proof is the #1 conversion driver for consulting services. Abstract claims don't convert; specific results do.
- Source: inferred
- Primary owning slice: M002/S04
- Supporting slices: none
- Validation: unmapped
- Notes: Results can use representative scenarios. Testimonials can be placeholders initially — the structure and animation matter.

### R013 — Featured blog posts on homepage
- Class: core-capability
- Status: active
- Description: Homepage must display the latest 2-3 blog posts in a visually appealing section.
- Why it matters: Surfaces thought leadership content to homepage visitors; signals the company is actively producing insights.
- Source: inferred
- Primary owning slice: M002/S05
- Supporting slices: none
- Validation: unmapped
- Notes: Pulls from existing Astro content collection. Links to full blog posts.

### R014 — Polished micro-interactions & hover states
- Class: quality-attribute
- Status: active
- Description: Cards, buttons, and links across all pages must have refined hover states — smooth shadows, subtle scale, satisfying transitions.
- Why it matters: Micro-interactions signal attention to detail. For a tech company, sloppy hover states undermine the brand.
- Source: user
- Primary owning slice: M002/S06
- Supporting slices: none
- Validation: unmapped
- Notes: Restrained and professional, not flashy. Consistent across all interactive elements.

### R015 — Reduced-motion accessibility support
- Class: quality-attribute
- Status: active
- Description: All animations must respect `prefers-reduced-motion` media query — disabling or reducing motion for users who request it.
- Why it matters: Accessibility compliance and user comfort. Some users experience motion sickness from animations.
- Source: inferred
- Primary owning slice: M002/S06
- Supporting slices: M002/S01, M002/S02
- Validation: unmapped
- Notes: Each slice should implement reduced-motion as it goes, but S06 does the final audit.

### R016 — Interactive animated service pipeline
- Class: differentiator
- Status: active
- Description: The homepage service pipeline (Audit → Implementation → Training) must animate as a flow with pulsing connections between stages.
- Why it matters: Transforms a static card grid into a visual narrative of the client journey. Shows the process is connected, not siloed.
- Source: inferred
- Primary owning slice: M002/S05
- Supporting slices: none
- Validation: unmapped
- Notes: Replaces the current static 3-card grid with arrow connectors.

## Validated

### R001 — Blog system with real posts
- Class: core-capability
- Status: validated
- Description: The blog page must display real posts written as Markdown files using Astro content collections, with individual post pages, metadata (title, date, description), and a post listing.
- Why it matters: The blog is the primary SEO and thought-leadership channel.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: none
- Validation: validated
- Notes: Proved by M001/S02.

### R002 — About page with real founder content
- Class: primary-user-loop
- Status: validated
- Description: The About page must show the founder's real name, real biography, and a real headshot photo.
- Why it matters: Credibility and trust.
- Source: user
- Primary owning slice: M001/S01
- Supporting slices: none
- Validation: validated
- Notes: Proved by M001/S01.

### R003 — Visual design polish
- Class: quality-attribute
- Status: validated
- Description: The site's overall visual design should feel polished and distinctive.
- Why it matters: First impressions drive conversion.
- Source: user
- Primary owning slice: M001/S03
- Supporting slices: M001/S01, M001/S02
- Validation: validated
- Notes: Proved by M001/S03.

### R004 — All changes published to GitHub
- Class: operability
- Status: validated
- Description: Every completed slice must be committed and pushed to the GitHub remote (main branch).
- Why it matters: GitHub is the source of truth and deployment trigger.
- Source: user
- Primary owning slice: all slices
- Supporting slices: none
- Validation: validated
- Notes: Continues for M002.

## Deferred

### R010 — Headless CMS for blog
- Class: admin/support
- Status: deferred
- Description: Replace markdown file authoring with a GUI CMS for non-technical content editing.
- Why it matters: Easier content management without a code editor.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: User chose markdown files for now.

### R011 — Social media links (real URLs)
- Class: integration
- Status: deferred
- Description: Replace the `#` placeholder hrefs in the footer's LinkedIn and Twitter links with real profile URLs.
- Why it matters: Visitors following social links get a dead click.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Blocked on user providing real social URLs.

### R012 — Real phone number
- Class: core-capability
- Status: deferred
- Description: Replace the placeholder `(555) 123-4567` with a real phone number.
- Why it matters: Placeholder looks unprofessional.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: Blocked on user providing real number.

## Out of Scope

### R020 — E-commerce / payments
- Class: anti-feature
- Status: out-of-scope
- Description: No payment processing, invoicing, or checkout flows.
- Why it matters: Prevents scope creep; sales happen off-site via discovery call.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: All service purchases are handled through the Calendly → personal follow-up flow.

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | core-capability | validated | M001/S02 | none | validated |
| R002 | primary-user-loop | validated | M001/S01 | none | validated |
| R003 | quality-attribute | validated | M001/S03 | M001/S01, M001/S02 | validated |
| R004 | operability | validated | all slices | none | validated |
| R005 | differentiator | active | M002/S01 | M002/S05 | unmapped |
| R006 | quality-attribute | active | M002/S02 | none | unmapped |
| R007 | differentiator | active | M002/S02 | M002/S04 | unmapped |
| R008 | quality-attribute | active | M002/S03 | none | unmapped |
| R009 | primary-user-loop | active | M002/S04 | none | unmapped |
| R010 | admin/support | deferred | none | none | unmapped |
| R011 | integration | deferred | none | none | unmapped |
| R012 | core-capability | deferred | none | none | unmapped |
| R013 | core-capability | active | M002/S05 | none | unmapped |
| R014 | quality-attribute | active | M002/S06 | none | unmapped |
| R015 | quality-attribute | active | M002/S06 | M002/S01, M002/S02 | unmapped |
| R016 | differentiator | active | M002/S05 | none | unmapped |
| R020 | anti-feature | out-of-scope | none | none | n/a |

## Coverage Summary

- Active requirements: 8 (R005–R009, R013–R016)
- Mapped to slices: 8
- Validated: 4 (R001–R004)
- Unmapped active requirements: 0
