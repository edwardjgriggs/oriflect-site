---
id: S01
milestone: M001
status: ready
---

# S01: About Page — Real Founder Content — Context

## Goal

Replace the three placeholder elements on `/about` — founder name, headshot photo, and the `[Founder Name]` title line — with real founder content, keeping the existing bio narrative intact.

## Why this Slice

The About page is the first thing a prospective client reads to decide whether to trust Oriflect. Placeholder content (`[Founder Name]`, grey SVG box) immediately signals the site is unfinished. This slice closes that credibility gap and unblocks S03 polish (which applies styling to real content) and the milestone's GitHub publish goal.

## Scope

### In Scope

- Replace `[Founder Name]` in the founder title line with the real founder name
- Replace the SVG photo placeholder with a real headshot image file
- Photo displayed as a square with rounded corners (`aspect-square`, `rounded-xl`) — matching the current layout
- Place the image file in `public/` for static serving (per D004)
- Existing bio narrative paragraphs are kept as-is — user confirmed they describe the right story

### Out of Scope

- Rewriting the bio paragraphs — user explicitly chose to keep the existing text
- Circular or natural-ratio photo crop — user chose square with rounded corners
- Any changes to Mission, Core Values, or CTA sections
- Social media URLs (deferred R011)
- Real phone number (deferred R012)

## Constraints

- Tailwind CSS v4 only — no `tailwind.config.js`; all styling via `@theme` in `global.css` (D001)
- Image in `public/` — no build-time optimization pipeline (D004)
- Dark mode must work on all new/modified elements — `.dark` class strategy (D003)
- Do not alter `BaseLayout.astro` structure
- Founder name and photo file must be collected from the user at the start of execution — this slice cannot begin without them

## Integration Points

### Consumes

- `src/pages/about.astro` — existing About page; the `[Founder Name]` placeholder and SVG photo block are the targets
- Founder name text — provided by user at execution time
- Headshot image file — provided by user at execution time; saved to `public/`

### Produces

- `src/pages/about.astro` — updated with real founder name and `<img>` tag pointing to the headshot
- `public/[founder-photo].[ext]` — real headshot image served as static asset
- Branch `gsd/M001/S01` squash-merged to main and pushed to origin

## Open Questions

- Founder name — not yet provided; must be collected at start of S01 execution
- Photo filename and extension — not yet provided; will be placed in `public/` whatever the user supplies
- Alt text for the photo — use founder name as alt text unless user specifies otherwise
