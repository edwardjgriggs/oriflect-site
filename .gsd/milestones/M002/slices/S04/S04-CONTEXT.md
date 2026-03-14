---
id: S04
milestone: M002
status: ready
---

# S04: Social Proof & Results Showcase — Context

## Goal

Add a before/after client results showcase section to the homepage with 3 animated cards using hardcoded placeholder data.

## Why this Slice

Social proof is the strongest trust signal for an AI consulting site. The results section sits between "Why Oriflect" and the CTA, giving prospects concrete evidence of impact right before the conversion point. S05 depends on this section being placed so it can arrange the full homepage flow around it.

## Scope

### In Scope

- `ResultsShowcase.astro` component — 3 before/after results cards
- Before/after format: each card shows a "before" state and "after" state (e.g. "12hrs/week manual data entry → 2hrs with AI automation")
- 3 cards in a row on desktop, stacked on mobile — matches existing "Why Oriflect" 3-column grid pattern
- Hardcoded plausible placeholder data — agent picks believable client outcomes across different business scenarios
- Section inserted on homepage between "Why Oriflect" and the final CTA section
- Scroll-reveal entrance animation using S02's ScrollReveal wrapper
- Works in both light and dark mode
- `prefers-reduced-motion`: cards appear immediately without animation

### Out of Scope

- **Testimonials section — deferred** (user has no testimonials yet; will be added in a future slice/milestone when real quotes are available)
- Real client data — placeholders only for now
- Click-through to case study pages (no case study pages exist)
- Any content changes to existing homepage sections

## Constraints

- CSS animations + vanilla JS only (D013)
- Tailwind CSS v4 CSS-first config (D001)
- Must work in both light and dark mode (D003)
- Must not break existing homepage sections or Calendly CTA
- `astro build` must exit 0

## Integration Points

### Consumes

- `src/components/ScrollReveal.astro` (from S02) — scroll-triggered entrance animation wrapper
- `src/pages/index.astro` — insert new section between "Why Oriflect" and CTA
- `src/styles/global.css` — brand color tokens

### Produces

- `src/components/ResultsShowcase.astro` — before/after results cards component with scroll-reveal animation
- New homepage section positioned between "Why Oriflect" and final CTA

## Open Questions

- Exact placeholder scenarios — agent picks 3 plausible SMB AI transformation stories during implementation; user can swap in real data later
- Card visual treatment (icons, color accents, before/after divider style) — decide during planning/implementation to match existing card style
