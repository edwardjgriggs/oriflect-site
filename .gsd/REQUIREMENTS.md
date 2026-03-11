# Requirements

This file is the explicit capability and coverage contract for the project.

## Active

### R001 — Blog system with real posts
- Class: core-capability
- Status: validated
- Description: The blog page must display real posts written as Markdown files using Astro content collections, with individual post pages, metadata (title, date, description), and a post listing.
- Why it matters: The blog is the primary SEO and thought-leadership channel; a "coming soon" placeholder is a dead end for visitors and search engines.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: none
- Validation: proved by S02 — /blog lists real posts from getCollection('blog'); /blog/ai-for-smbs-what-actually-works renders full post with title, date, description, and prose body; astro build exits 0 with 6 pages
- Notes: Posts authored as .md files in src/content/blog/; no external CMS required.

### R002 — About page with real founder content
- Class: primary-user-loop
- Status: validated
- Description: The About page must show the founder's real name, real biography, and a real headshot photo instead of the current placeholders.
- Why it matters: Credibility and trust — visitors evaluating an AI consultant want to know who they're hiring.
- Source: user
- Primary owning slice: M001/S01
- Supporting slices: none
- Validation: proved by S01 — Edward Griggs name, bio, and headshot render on /about; astro build exits 0
- Notes: Founder name: Edward Griggs. Photo: public/founder.png.

### R003 — Visual design polish
- Class: quality-attribute
- Status: validated
- Description: The site's overall visual design should feel polished and distinctive — improvements to typography, spacing, section transitions, component detail, and overall feel across all pages.
- Why it matters: First impressions drive whether a potential client books a call; the site is the primary sales tool.
- Source: user
- Primary owning slice: M001/S03
- Supporting slices: M001/S01, M001/S02
- Validation: proved by S03 — antialiased global rendering; prose readability improvements; pipeline card hover lift + icon containers; Why Oriflect + Core Values card elevation; section border dividers on Services; gold ring frame on founder photo; tag pills on blog listing; font-accent italic on blog post description; astro build exits 0; all 11 grep checks pass against dist/
- Notes: Prioritize the Home and Services pages. Keep brand color system intact.

### R004 — All changes published to GitHub
- Class: operability
- Status: active
- Description: Every completed slice must be committed and pushed to the GitHub remote (main branch).
- Why it matters: GitHub is the source of truth and deployment trigger.
- Source: user
- Primary owning slice: all slices
- Supporting slices: none
- Validation: partially proved — S01 and S02 branches squash-merged to main and pushed to origin; S03 commit exists on gsd/M001/S03 branch; squash-merge to main pending (GSD extension step)
- Notes: Each slice squash-merges to main and pushes to origin.

## Deferred

### R010 — Headless CMS for blog
- Class: admin/support
- Status: deferred
- Description: Replace markdown file authoring with a GUI CMS (Contentful, Sanity, etc.) for non-technical content editing.
- Why it matters: Easier content management without a code editor.
- Source: inferred
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: User chose markdown files for now. Can migrate later without changing Astro page structure.

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
- Description: Replace the placeholder `(555) 123-4567` in the footer and contact page with a real phone number.
- Why it matters: Placeholder looks unprofessional to visitors.
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
| R001 | core-capability | validated | M001/S02 | none | S02 build + dist/ inspection |
| R002 | primary-user-loop | validated | M001/S01 | none | S01 build + visual |
| R003 | quality-attribute | validated | M001/S03 | M001/S01, M001/S02 | S03 build + dist/ inspection |
| R004 | operability | active | all slices | none | S01+S02 pushed; S03 squash-merge pending |
| R010 | admin/support | deferred | none | none | unmapped |
| R011 | integration | deferred | none | none | unmapped |
| R012 | core-capability | deferred | none | none | unmapped |
| R020 | anti-feature | out-of-scope | none | none | n/a |

## Coverage Summary

- Active requirements: 4
- Mapped to slices: 4
- Validated: 3 (R001, R002, R003)
- Unmapped active requirements: 0
