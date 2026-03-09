# Phase 2: Core Pages - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Homepage, Services page, and About page with conversion-focused content. Visitors can learn what Oriflect does, see specific service offerings with pricing, and understand who is behind the business. All CTAs link to booking/contact (functional integration comes in Phase 3).

</domain>

<decisions>
## Implementation Decisions

### Homepage hero & layout
- Full-viewport hero with sapphire gradient background (linear-gradient 135deg, #0A2463 to lighter shade)
- White headline text, gold accent on subheadline, ember orange CTA button
- Opportunity-focused headline messaging (e.g., "Transform Your Operations with AI" not pain/fear-driven)
- Page flow: Hero → Service Pipeline → Why Oriflect → Final CTA
- Service pipeline section: 3 connected cards with arrows showing Audit → Implementation → Training flow, with pricing ranges visible ($500-2K, $2K-10K, Custom)
- "Why Oriflect" section: 3 differentiator blocks with icons (SMB-focused, End-to-end, Measurable ROI)
- Each service card links to the corresponding anchor on the Services page
- Final CTA section at bottom: "Ready to get started?" with Book a Discovery Call button

### Service presentation
- Full-section layout: each service gets its own full-width section with description, pricing, process steps, deliverables, and CTA
- Horizontal timeline for "What to Expect" process steps (numbered steps with connecting lines, stacks vertical on mobile)
- Alternating backgrounds between sections: ivory and sapphire-tint for visual separation
- "Start Here" badge on AI Discovery Audit section (gold accent badge) — it's the entry point to the pipeline
- Anchor IDs for deep linking: #audit, #implementation, #training
- Specific deliverables listed per service:
  - Audit: AI Opportunity Report, ROI projections, prioritized roadmap, tool recommendations
  - Implementation: Working automations/integrations, technical documentation, admin training session
  - Training: Custom curriculum, hands-on workshops, reference materials, recorded sessions
- Each service section ends with its own CTA button

### About page
- Founder story + mission structure: founder section first, then company mission, then values
- Founder headshot/photo will be provided — design includes photo placement
- Credentials focus: AI/tech expertise (not business consulting)
- 3-4 core values section with icon + title + one-liner (e.g., ROI-First, Transparency, SMB-Native)
- Closing CTA at bottom

### Copy & tone
- Warm consultant voice: empathetic, collaborative, "we'll walk you through it" energy
- Zero jargon: say "AI tools" and "automation", never "LLMs" or "neural networks" — speak outcomes, not technology
- Opportunity-focused messaging (not fear/pain-driven)
- Claude drafts all copy based on business context from PROJECT.md and decisions here — user reviews and tweaks after

### Page header pattern
- Homepage: unique full-viewport hero (exception)
- Services & About: shared compact sapphire header banner with page title + 1-2 line intro
- Consistent inner page pattern creates visual cohesion

### Claude's Discretion
- Services page hero: whether compact sapphire banner or skip straight to content
- Exact copy for all headlines, descriptions, CTAs
- Specific icon choices for pipeline cards, differentiators, and values
- Typography sizing and spacing within sections
- Dark mode treatment for hero gradient and section backgrounds
- Card shadow/border styling
- Mobile responsive breakpoints and stacking behavior
- "Why Oriflect" differentiator content (final wording)

</decisions>

<specifics>
## Specific Ideas

- "McKinsey meets tech" aesthetic carried from Phase 1 — professional, clean, not stuffy
- Stripe's website as a tone reference point (confident but accessible)
- Pipeline visualization should clearly communicate that Audit is the entry point leading to Implementation and Training
- Inner pages should feel like a cohesive family with the shared header pattern
- Connected cards with arrows (not just standalone cards) to show service progression

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- BaseLayout.astro: Layout with Header/Footer already wired, accepts title and description props
- Header.astro: Fixed sapphire nav bar with mobile hamburger, ember orange CTA button
- Footer.astro: Sapphire background footer with contact info and social links
- Logo.astro: SVG logo component
- ThemeToggle.astro: Dark mode toggle

### Established Patterns
- Tailwind v4 with CSS-first @theme config (no tailwind.config.js)
- Design tokens in global.css: sapphire, gold, ember, charcoal, ivory, sapphire-tint, gold-tint, dark-bg, dark-surface, dark-text
- Font families: font-heading (Montserrat), font-body (Inter), font-accent (Playfair Display), font-code (JetBrains Mono)
- Self-hosted fonts via @fontsource-variable packages
- Dark mode via .dark class with inline head script to prevent FOUC
- Inline SVG icons (no icon library)

### Integration Points
- Placeholder pages already exist: index.astro, services.astro, about.astro (need content replacement)
- BaseLayout slot pattern: pages just need to provide content within <BaseLayout> tags
- Header nav already links to /services, /about, /blog
- CTA buttons link to #book placeholder (will be connected to Calendly in Phase 3)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-core-pages*
*Context gathered: 2026-03-09*
