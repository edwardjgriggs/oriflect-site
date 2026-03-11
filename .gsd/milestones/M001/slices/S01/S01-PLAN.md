# S01: About Page — Real Founder Content

**Goal:** Replace all placeholder content on the About page with real founder name, biography, and headshot photo.
**Demo:** Open `/about` — real name, real bio, real photo. No placeholders visible.

## Must-Haves

- The `[Founder Name]` placeholder is replaced with the real founder name
- The three biography paragraphs tell the real founder story (not the generic placeholder text)
- The photo placeholder div is replaced with a real `<img>` tag pointing to the founder's headshot
- Dark mode still works correctly on the About page
- `astro build` completes without errors
- Slice squash-merged to main and pushed to origin

## Tasks

- [x] **T01: Collect founder content and update About page**
  Collect founder name, bio text, and photo from user; place photo in `public/`; update `src/pages/about.astro` with all real content; build and verify; commit, squash merge, and push.

## Files Likely Touched

- `src/pages/about.astro` — replace placeholder name, bio, and photo section
- `public/[founder-photo].[ext]` — added: real headshot image
