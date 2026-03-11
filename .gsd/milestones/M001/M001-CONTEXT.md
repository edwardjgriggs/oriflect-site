# M001: Site Enhancement v1 — Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

## Project Description

Oriflect is an Astro + Tailwind CSS v4 marketing website for an AI consulting firm. The existing site has five pages (Home, Services, About, Blog placeholder, Contact) and is hosted on GitHub at `https://github.com/edwardjgriggs/oriflect-site.git`. This milestone completes the site's first real content pass: real About page content, a working blog, and visual polish.

## Why This Milestone

The site is functional but has two gaps a real visitor would immediately notice:
1. The About page shows placeholder content (no founder name, no photo, no real bio)
2. The Blog page is a "coming soon" stub — dead for SEO and credibility
3. Visual design can be elevated to feel more polished and professional

This milestone closes all three gaps and publishes every change to GitHub.

## User-Visible Outcome

### When this milestone is complete, the user can:

- Open `/about` and see the real founder name, real bio, and real headshot photo
- Open `/blog` and see a listing of actual posts; click a post and read it
- Show the site to a potential client and have it look polished and complete
- Every change is committed and pushed to `origin/main` on GitHub

### Entry point / environment

- Entry point: `astro dev` at `http://localhost:4321` for local verification; GitHub for final publish
- Environment: Local dev for all implementation and verification; `git push origin main` for publish
- Live dependencies involved: Calendly embed (external), Web3Forms (external, contact page only)

## Completion Class

- Contract complete means: Blog posts render at their URLs; About page shows real content; no placeholder text visible
- Integration complete means: `astro build` succeeds with no errors; all pages render
- Operational complete means: All changes pushed to GitHub main branch

## Final Integrated Acceptance

To call this milestone complete, we must prove:

- `/about` shows real founder name, real bio paragraph(s), and real photo
- `/blog` lists at least one post; clicking the post loads the full post at `/blog/[slug]`
- `astro build` completes without errors
- `git log --oneline origin/main` shows all slice commits

## Risks and Unknowns

- Astro content collections schema — must define correctly for type safety; known stable API
- Photo format / size — user provides the image file; needs to be placed in `src/assets/` or `public/`
- Founder name and bio text — must be provided by user during S01 execution
- Visual polish is subjective — anchor to the existing brand system (colors, fonts) and elevate detail, not replace the design

## Existing Codebase / Prior Art

- `src/pages/about.astro` — existing About page layout with placeholder founder section
- `src/pages/blog.astro` — existing Blog page, currently just a "coming soon" stub
- `src/layouts/BaseLayout.astro` — wraps all pages; handles fonts, dark mode, Calendly
- `src/styles/global.css` — Tailwind v4 CSS-first config with brand color/font variables
- `src/components/Header.astro` — nav with mobile menu; already has Blog link
- `astro.config.mjs` — site URL set to `https://oriflect.com`

> See `.gsd/DECISIONS.md` for all architectural and pattern decisions.

## Relevant Requirements

- R001 — Blog system is the primary new capability in S02
- R002 — About page real content is the primary goal of S01
- R003 — Visual polish applied throughout in S03
- R004 — GitHub publish happens at end of every slice

## Scope

### In Scope

- About page: replace founder name, bio, photo placeholder with real content
- Blog: Astro content collections setup, blog post listing page, individual post page layout
- At least one real blog post authored as a Markdown file
- Visual design polish across Home, Services, About, and Blog pages
- Commit and push every slice to GitHub main

### Out of Scope / Non-Goals

- CMS integration (deferred R010)
- Real social media URLs (deferred R011 — blocked on user providing URLs)
- Real phone number (deferred R012 — blocked on user providing number)
- New pages beyond what exists
- E-commerce or payment flows

## Technical Constraints

- Tailwind CSS v4 only — CSS-first config via `@theme` in `global.css`, no `tailwind.config.js`
- Astro 5 content collections API — use `defineCollection` + `z` schema in `src/content/config.ts`
- Dark mode via `.dark` class on `<html>` (already working) — all new UI must support dark variants
- No new npm packages unless clearly necessary — project already has all fonts and Tailwind
- Keep existing `BaseLayout.astro` structure intact

## Integration Points

- Calendly — external embed; no changes needed
- Web3Forms — contact form submission; no changes needed
- GitHub — `git push origin main` after each slice squash merge

## Open Questions

- Founder name and bio text — to be provided by user at start of S01 execution
- Photo file — user will provide; save to `public/` for simplest Astro static asset handling
- Number of initial blog posts — minimum 1 real post; additional stubs optional
