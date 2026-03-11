# T01: Collect founder content and update About page

**Slice:** S01
**Milestone:** M001

## Goal

Replace all placeholder content on the About page with the real founder name, real biography, and real headshot photo — then verify, commit, squash merge to main, and push to GitHub.

## Must-Haves

### Truths
- Navigating to `/about` (dev server) shows the real founder name where `[Founder Name]` was
- The biography section tells the founder's real story, not the generic placeholder paragraphs
- A real photo appears where the grey placeholder box was
- Dark mode on the About page looks correct
- `astro build` exits 0 with no errors

### Artifacts
- `src/pages/about.astro` — updated with real name, real bio, real `<img>` tag (replaces SVG placeholder)
- `public/[founder-photo].[ext]` — real headshot image file present in repo

### Key Links
- `about.astro` `<img src="/[founder-photo].[ext]">` resolves correctly from `public/`

## Steps
1. Create branch `gsd/M001/S01` from main
2. Ask user for: (a) founder's full name, (b) title/role text, (c) bio paragraphs, (d) path to the photo file
3. Copy photo file to `public/` with a clean filename (e.g. `founder.jpg`)
4. Edit `src/pages/about.astro` — replace `[Founder Name]`, title line, bio paragraphs, and photo placeholder with real content
5. Run `astro build` to verify no errors
6. Start dev server and verify `/about` visually (browser)
7. Commit: `feat(S01/T01): real founder content on About page`
8. Squash merge branch to main: `feat(M001/S01): About page — real founder content`
9. Push to origin

## Context
- Photo should go in `public/` — served as `/[filename]` at runtime, no import needed
- Existing About page structure is solid — only the content inside the founder section needs updating
- The photo placeholder is a `<div>` with an SVG icon inside — replace the whole div with a styled `<img>` tag
- Keep the same grid layout and section structure; just swap the content
