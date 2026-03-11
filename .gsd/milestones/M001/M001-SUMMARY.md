---
id: M001
provides:
  - About page with real founder identity — Edward Griggs name, 3-paragraph bio, headshot photo at /founder.png with gold ring frame
  - Astro 5 Content Layer blog system — src/content/config.ts with glob() loader and Zod schema, one authored post at src/content/blog/ai-for-smbs-what-actually-works.md
  - Blog listing page at /blog rendering real posts from getCollection('blog') sorted newest-first with tag pills and hover treatment
  - Dynamic blog post pages at /blog/[slug] with prose-styled markdown, sapphire header, tag pills, and back link
  - Hand-crafted .prose CSS block in global.css (20 selectors) covering all markdown output elements with dark mode variants
  - Visual polish pass across all five pages — antialiased global rendering, card elevation, hover lift, icon containers, section dividers, prose readability improvements, font-accent italic on blog post descriptions
  - All changes pushed to origin/main on GitHub (R004 fully satisfied)
key_decisions:
  - D002: Blog uses Astro content collections with Markdown files (user chose over headless CMS)
  - D007: Hand-crafted .prose CSS in global.css (no @tailwindcss/typography) — full brand token control
  - D008: post.id (not post.slug) used as slug — Astro 5 Content Layer API
  - D009: Kebab-case blog post filename = URL slug (filename without extension is post.id)
  - D010: Visual polish verified via grep against dist/ built HTML + astro build exit 0
  - D012: Blog listing tag pills render from post.data.tags using same pill style as post header
patterns_established:
  - Content Layer pattern: defineCollection with glob() loader + Zod schema in src/content/config.ts; getStaticPaths maps post.id → slug param; render() extracts Content component
  - Value-prop card style: bg-white dark:bg-dark-surface rounded-xl shadow-sm flex flex-col items-center text-center (reusable for any feature/value grid)
  - Icon container pattern: inline-flex items-center justify-center w-14 h-14 bg-{color}/10 rounded-lg (ember-tinted for service pipeline, reusable)
  - Ring frame pattern: ring-2 ring-gold ring-offset-2 ring-offset-ivory dark:ring-offset-dark-bg (for framed elements on light/dark section backgrounds)
  - Tag pill style: inline-block px-2 py-0.5 text-xs font-body font-semibold uppercase tracking-wider bg-sapphire/10 dark:bg-sapphire-tint/10 text-sapphire dark:text-sapphire-tint rounded-full
  - Polish verification: grep specific compiled class names from dist/ HTML after astro build exit 0 (no test runner needed for pure CSS/HTML work)
observability_surfaces:
  - npm run build 2>&1 | grep -i "error|warn" — build health; Zod errors name file+field for any post frontmatter failure
  - ls dist/blog/ — each .md in src/content/blog/ produces one subdirectory; count mismatch = schema error silently dropped a post
  - grep -c '<a href="/blog/' dist/blog/index.html — count of post links (0 = collection not discovered)
  - grep "antialiased" dist/index.html — confirms BaseLayout body class regression check
  - grep -o "dark:" dist/blog/index.html | wc -l — use occurrence count (not line count) for minified HTML dark mode audit
requirement_outcomes:
  - id: R001
    from_status: active
    to_status: validated
    proof: "astro build exits 0; dist/blog/index.html contains post title link to /blog/ai-for-smbs-what-actually-works; dist/blog/ai-for-smbs-what-actually-works/index.html contains full rendered post with title, date, description, and prose-wrapped body; getCollection('blog') wired in blog.astro; getStaticPaths in [slug].astro generates the slug page"
  - id: R002
    from_status: active
    to_status: validated
    proof: "dist/about/index.html contains 'Edward Griggs' name, img src='/founder.png', and real 3-paragraph bio; public/founder.png exists; astro build exits 0; no [Founder Name] placeholder remains"
  - id: R003
    from_status: active
    to_status: validated
    proof: "astro build exits 0; all 11 S03 grep checks pass against dist/: antialiased in body class, hover:-translate-y-1 on pipeline cards, bg-ember/10 icon containers, ring-gold on founder photo, dark:bg-dark-surface on value cards, border-sapphire on services sections, tracking-wider on blog tag pills, font-accent on blog post description, 1.0625rem in global.css; dark: occurrence counts ≥ 10 across all pages"
  - id: R004
    from_status: active
    to_status: validated
    proof: "git push origin main succeeded; origin/main HEAD is e601574 feat(M001/S03) — all four slice commits (S01, S01-reassess, S02, S02-reassess, S03) present on origin/main; git log --oneline origin/main confirms full history"
duration: ~3h (S01: ~30m, S02: ~40m, S03: ~25m, milestone close: ~15m)
verification_result: passed
completed_at: 2026-03-11
---

# M001: Site Enhancement v1

**Real founder content on /about, a working Astro 5 Content Layer blog at /blog and /blog/[slug], and a focused visual polish pass across all five pages — astro build exits 0 with 6 pages, all changes pushed to origin/main on GitHub.**

## What Happened

M001 executed in three sequential slices, each producing a concrete, verifiable deliverable. The milestone closed all three gaps identified at planning time (About placeholders, Blog stub, visual roughness) and published every change to GitHub.

**S01 — About Page Real Founder Content:** Replaced all placeholder content on `about.astro` with real material collected from the user at the start of execution: Edward Griggs as Founder & AI Consultant, a 3-paragraph real biography, and a headshot photo copied to `public/founder.png`. The photo placeholder `<div>` was replaced with an `<img>` tag. Dark mode class parity was preserved throughout. Build exited 0 on first attempt; committed to `gsd/M001/S01`.

**S02 — Blog System:** Built an end-to-end Astro 5 Content Layer blog system from scratch. `src/content/config.ts` uses the `glob()` loader from `astro/loaders` with a Zod schema (title, description, pubDate via z.coerce.date(), optional tags). One real ~900-word authored post was written (`ai-for-smbs-what-actually-works.md`) covering AI adoption for SMBs. `blog.astro` was rewritten to call `getCollection('blog')`, sort by pubDate descending, and render post cards with title links, formatted dates, and descriptions. `blog/[slug].astro` was created new with `getStaticPaths` mapping `post.id` → slug (Astro 5 Content Layer API, not legacy `post.slug`), a sapphire header with tag pills, and a `.prose`-wrapped `<Content />` body. A hand-crafted 20-selector `.prose` CSS block was added to `global.css` with 8 `.dark .prose` overrides — no `@tailwindcss/typography` dependency (D007). Build exited 0 with 6 pages including listing and post pages; committed to `gsd/M001/S02`.

**S03 — Visual Design Polish:** Applied targeted improvements across all seven surfaces using existing brand tokens and Tailwind utilities. `BaseLayout.astro` gained `antialiased` on the `<body>`. `.prose p` in `global.css` was updated to `font-size: 1.0625rem` and `line-height: 1.8`. On `index.astro`: pipeline card `<a>` elements received `hover:-translate-y-1 hover:shadow-xl transition-all duration-200` lift; pipeline icons were wrapped in `bg-ember/10 rounded-lg` icon containers; the three "Why Oriflect" bare columns became `bg-white dark:bg-dark-surface rounded-xl p-8 shadow-sm` cards; the Final CTA section gained a `border-t border-white/10` separator. On `services.astro`: Implementation and Training sections received `border-t border-sapphire/10 dark:border-white/5` dividers. On `about.astro`: the founder photo received a `ring-2 ring-gold ring-offset-2 ring-offset-ivory dark:ring-offset-dark-bg` gold frame; the four Core Values bare `<div>` columns became elevated `bg-white dark:bg-dark-surface rounded-xl p-6 shadow-sm` cards. On `blog.astro`: tag pills from `post.data.tags` were added between the date and description on listing cards; card `<li>` elements gained `hover:border-sapphire/30 dark:hover:border-sapphire-tint/30 transition-colors`. On `blog/[slug].astro`: the description `<p>` switched to `font-accent italic` (Playfair Display) for typographic distinction. Build exited 0; all 11 slice verification checks passed; committed to `gsd/M001/S03`.

The three slice commits plus two auto-commits from roadmap reassessments were squash-ready on `main` and pushed to `origin/main` at milestone close, fully satisfying R004.

## Cross-Slice Verification

All five milestone success criteria verified against observable artifacts:

| Criterion | Evidence | Result |
|-----------|----------|--------|
| `/about` shows real founder name, real bio, and real headshot | `dist/about/index.html` contains "Edward Griggs", `img src="/founder.png"`, and 3-paragraph bio text; no `[Founder Name]` placeholder present | ✅ Pass |
| `/blog` lists at least one real post; individual post pages render at `/blog/[slug]` | `dist/blog/index.html` contains `<a href="/blog/ai-for-smbs-what-actually-works">`; `dist/blog/ai-for-smbs-what-actually-works/index.html` exists with full rendered post (title, date, description, prose body) | ✅ Pass |
| Visual design noticeably more polished across Home, Services, About, and Blog | All 11 S03 grep checks pass: antialiased, hover:-translate-y-1, bg-ember/10, ring-gold, dark:bg-dark-surface, border-sapphire, tracking-wider, font-accent, 1.0625rem; dark: occurrence counts ≥ 10 on all pages | ✅ Pass |
| `astro build` completes without errors | Exit 0, 6 pages built in 917ms — verified at S01, S02, S03, and milestone close (re-run) | ✅ Pass |
| All slice changes committed and pushed to `origin/main` | `git push origin main` → `23b4e77..e601574 main -> main`; `git log --oneline origin/main` shows S01, S02, S03 commits at HEAD | ✅ Pass |

**Definition of Done:**
- S01 complete: ✅ (About shows real founder name, bio, photo)
- S02 complete: ✅ (Blog listing and individual post pages work with real Markdown posts)
- S03 complete: ✅ (Visual polish applied and verifiable on all main pages)
- `astro build` completes without errors after all changes: ✅
- All slice squash commits on `origin/main`: ✅

## Requirement Changes

- R001: active → validated — Blog system proved by `astro build` exit 0 and `dist/blog/` inspection (listing + post pages both present with correct content)
- R002: active → validated — About page proved by `dist/about/index.html` containing real Edward Griggs name, photo, and bio
- R003: active → validated — Visual polish proved by `astro build` exit 0 + all 11 S03 grep checks passing against `dist/` built output
- R004: active → validated — All changes pushed to `origin/main`; confirmed by `git log --oneline origin/main` showing S01 through S03 commits

## Forward Intelligence

### What the next milestone should know
- The blog infrastructure is entirely in place — adding new posts requires only dropping a `.md` file with valid frontmatter in `src/content/blog/`. No code changes needed for post addition.
- All five content pages share a consistent card pattern (`bg-white dark:bg-dark-surface rounded-xl shadow-sm`) — any new value-prop or feature grid should reuse this for visual coherence.
- The `ring-offset-ivory dark:ring-offset-dark-bg` ring frame pattern is now established; use it for any framed element that sits on a light/dark section background.
- Tag pills use the sapphire/sapphire-tint palette (`bg-sapphire/10 dark:bg-sapphire-tint/10`); if new taxonomies (categories, types) need a second color, establish that decision in DECISIONS.md before implementing.
- Brand color tokens are all CSS variables defined in `@theme` in `global.css` (Tailwind v4 CSS-first) — no `tailwind.config.js` exists. All new UI must use these tokens.
- Three deferred requirements remain open: R010 (headless CMS), R011 (real social URLs), R012 (real phone number). R011 and R012 are blocked on user providing the values.

### What's fragile
- `dark:prose-dark` class on the prose wrapper in `[slug].astro` — this is a custom class referencing `.dark .prose` selectors in `global.css`, NOT the Tailwind Typography plugin's dark mode. If `.dark .prose` is ever removed from `global.css`, dark mode prose breaks silently.
- `ring-offset-ivory` on the founder photo is hardcoded to the current section background color — if the About page layout changes and the photo moves into a dark section, this class must be updated manually.
- Empty-state guard on `blog.astro` (`posts.length === 0`) can mask a broken collection — if posts go missing, check `export const collections` in `src/content/config.ts` first.
- Blog post slug is the filename without `.md` extension (`post.id` in Astro 5 Content Layer) — never use `post.slug` (Astro v4 pattern, does not exist in this project).

### Authoritative diagnostics
- `npm run build 2>&1 | grep -i "error|zod|invalid"` — primary build health check; Zod validation errors name the file and field when any post's frontmatter doesn't match the schema
- `ls dist/blog/` — each `.md` in `src/content/blog/` produces exactly one subdirectory; count mismatch means a post was silently dropped (schema error)
- `grep -c '<a href="/blog/' dist/blog/index.html` — count of post links in built listing; 0 when posts exist = collection not being discovered (check `export const collections` in `config.ts`)
- `grep "antialiased" dist/index.html` — single source of truth for BaseLayout body class regression
- `grep -o "dark:" dist/blog/index.html | wc -l` — use occurrence count (not line count) for dark mode audit in minified HTML

### What assumptions changed
- No significant assumptions changed during execution. The Astro 5 Content Layer API behaved exactly as documented. The one pattern clarification discovered was that `grep -c "dark:"` on minified HTML returns line count (always 1 for a minified file), not occurrence count — use `grep -o "dark:" | wc -l` for occurrence-based dark mode auditing.

## Files Created/Modified

- `src/pages/about.astro` — replaced placeholder name, photo div, bio with real Edward Griggs content; added gold ring frame and Core Values card elevation in S03
- `public/founder.png` — added: real headshot image (static asset at /founder.png)
- `src/content/config.ts` — new: Astro 5 Content Layer collection config with glob() loader and Zod schema
- `src/content/blog/ai-for-smbs-what-actually-works.md` — new: ~900-word real authored post on AI adoption for SMBs
- `src/pages/blog.astro` — rewritten: real listing page from getCollection('blog') with tag pills, hover treatment, empty-state guard, dark mode
- `src/pages/blog/[slug].astro` — new: dynamic post page with getStaticPaths, render, sapphire header, tag pills, prose body, back link, full dark mode
- `src/styles/global.css` — augmented: .prose CSS block (20 selectors + 8 dark variants); .prose p font-size 1.0625rem / line-height 1.8
- `src/layouts/BaseLayout.astro` — added antialiased to body class
- `src/pages/index.astro` — pipeline card hover lift + icon containers; Why Oriflect card elevation; Final CTA border separator
- `src/pages/services.astro` — border-t dividers on Implementation and Training sections
