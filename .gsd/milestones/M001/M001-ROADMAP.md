# M001: Site Enhancement v1

**Vision:** Complete the Oriflect website's first real content pass — a credible About page with real founder content, a working blog powered by Astro content collections, and a visual design polish pass — then publish every change to GitHub.

## Success Criteria

- `/about` shows real founder name, real bio, and real headshot photo (no placeholders)
- `/blog` lists at least one real post; individual post pages render at `/blog/[slug]`
- Visual design across Home, Services, About, and Blog pages is noticeably more polished
- `astro build` completes without errors
- All slice changes are committed and pushed to `origin/main` on GitHub

## Key Risks / Unknowns

- Founder content (name, bio, photo) must be provided by user — S01 is blocked until this is collected
- Astro content collections configuration must be correct for build to succeed — known stable API, low risk
- Visual polish is subjective — anchor to the existing brand system to avoid scope creep

## Proof Strategy

- Founder content dependency → retire in S01 by collecting from user and rendering it on the live About page
- Content collections API → retire in S02 by `astro build` succeeding with real posts rendered

## Verification Classes

- Contract verification: `astro build` with no errors; all pages generate without 404s; blog post frontmatter schema validates
- Integration verification: dev server renders `/about`, `/blog`, and `/blog/[slug]` correctly; dark mode works on all new UI
- Operational verification: `git push origin main` succeeds for each slice
- UAT / human verification: user visually confirms About and Blog pages look correct; polish feels like an improvement

## Milestone Definition of Done

This milestone is complete only when all are true:

- S01 is complete: About page shows real founder name, bio, and photo
- S02 is complete: Blog listing and individual post pages work with real Markdown posts
- S03 is complete: Visual polish applied and verifiable on all main pages
- `astro build` completes without errors after all changes
- All slice squash commits are on `origin/main`

## Requirement Coverage

- Covers: R001, R002, R003, R004
- Partially covers: none
- Leaves for later: R010 (CMS), R011 (social URLs), R012 (real phone)
- Orphan risks: none

## Slices

- [x] **S01: About Page — Real Founder Content** `risk:medium` `depends:[]`
  > After this: `/about` shows the real founder name, bio, and headshot photo — no placeholders.

- [ ] **S02: Blog System** `risk:medium` `depends:[S01]`
  > After this: `/blog` lists real posts and individual post pages render at `/blog/[slug]`.

- [ ] **S03: Visual Design Polish** `risk:low` `depends:[S02]`
  > After this: the site looks noticeably more polished across Home, Services, About, and Blog.

## Boundary Map

### S01 → S02

Produces:
- `src/pages/about.astro` — updated with real founder name, bio, and photo (replaces placeholders)
- `public/[founder-photo].[ext]` — real headshot image served as static asset
- Branch `gsd/M001/S01` squash-merged to main and pushed to origin

Consumes:
- nothing (first slice)

### S02 → S03

Produces:
- `src/content/config.ts` — Astro content collections schema for blog posts (title, date, description, optional tags)
- `src/content/blog/*.md` — at least one real authored blog post
- `src/pages/blog.astro` — updated to list all posts from content collection, sorted by date
- `src/pages/blog/[slug].astro` — dynamic route rendering individual post pages with title, date, and content
- Branch `gsd/M001/S02` squash-merged to main and pushed to origin

Consumes from S01:
- nothing (S01 doesn't affect blog; depends ordering is for sequential publishing)

### S03 → (milestone end)

Produces:
- Updated visual design across `src/pages/index.astro`, `src/pages/services.astro`, `src/pages/about.astro`, `src/pages/blog.astro`
- Refined styles in `src/styles/global.css` if needed
- Branch `gsd/M001/S03` squash-merged to main and pushed to origin

Consumes from S02:
- `src/pages/blog.astro` and `src/pages/blog/[slug].astro` — polish applied to blog UI
- `src/pages/about.astro` — polish applied with real content in place
