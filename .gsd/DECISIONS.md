# Decisions Register

<!-- Append-only. Never edit or remove existing rows.
     To reverse a decision, add a new row that supersedes it.
     Read this file at the start of any planning or research phase. -->

| # | When | Scope | Decision | Choice | Rationale | Revisable? |
|---|------|-------|----------|--------|-----------|------------|
| D001 | M001 | arch | CSS framework config | Tailwind CSS v4 CSS-first (`@theme` in global.css) | Already in use; v4 has no tailwind.config.js | No |
| D002 | M001 | arch | Blog content authoring | Astro content collections with Markdown files | User chose markdown over headless CMS; no external dependency | Yes — if CMS needed later |
| D003 | M001 | pattern | Dark mode strategy | `.dark` class on `<html>` via localStorage | Already implemented and working across all pages | No |
| D004 | M001 | convention | Static assets | Photos and images in `public/` for simple static serving | Simplest Astro pattern; no image optimization pipeline needed now | Yes — if build-time optimization added |
| D005 | M001 | convention | Git publish strategy | Squash merge per slice to main, push to origin after each slice | Clean main history, one commit per slice, immediately published | No |
| D006 | S01 | convention | Founder photo filename | `public/founder.png` (clean generic name) | Avoids spaces/special chars in URL; stable reference if photo is updated | Yes — rename if multiple founders added |
| D007 | S02 | pattern | Blog prose styling | Hand-crafted `.prose` CSS in `global.css` (no `@tailwindcss/typography`) | Avoids a new npm dependency; custom styles are small, targeted, and fully controllable within the Tailwind v4 CSS-first setup | Yes — install typography plugin if post volume grows |
| D008 | S02 | convention | Blog post slug source | `post.id` (Content Layer API, Astro 5) used as slug param in `getStaticPaths` | `post.slug` was the Astro v4 pattern; Astro 5 Content Layer uses `post.id` (filename without extension) | No — tied to Astro 5 Content Layer API |
| D009 | S02 | convention | Blog post filename convention | Kebab-case filename as slug (e.g. `ai-for-smbs-what-actually-works.md`) | `post.id` = filename without extension; filename IS the URL slug — keep them readable and URL-safe | Yes — if slug override needed, add `slug` field to schema |
| D010 | S03 | pattern | Visual polish verification strategy | grep against `dist/` built HTML + `astro build` exit 0 | No test framework needed for a pure CSS/HTML polish pass; built output is the contract artifact; specific class names in dist/ prove Tailwind compiled and the template rendered | Yes — if JS interactions added, a browser test runner would be appropriate |
| D011 | S03 | convention | Prose font-size improvement | Extend `.prose p` in-place in `global.css` (add `font-size: 1.0625rem`) | Keeps all prose styles in the established `.prose` block; avoids adding a new CSS class; consistent with D007 (hand-crafted prose, no typography plugin) | Yes — adjust value if design direction changes |
| D012 | S03 | pattern | Blog listing tag pills | Render directly from `post.data.tags` in `blog.astro` using same pill style as `[slug].astro` header | Tags already in Content Layer schema and rendered on post pages; reusing the same visual pattern on listing cards is consistent and requires no schema change | No — tied to Content Layer schema shape |
| D013 | M002 | arch | Animation approach | CSS animations + vanilla JS Intersection Observer; no heavy animation library | Static Astro site — minimize JS bundle; CSS keyframes are performant and sufficient for scroll reveals, counters, and hero effects | Yes — add library if complex sequences needed |
| D014 | M002 | pattern | Visual language direction | Clean & kinetic — keep light/dark scheme, add motion and scroll effects | User chose this over dark/glowy or 3D approaches | No |
| D015 | M002 | arch | Page transitions | Astro View Transitions API (built-in) | Native Astro feature, no external dependency, smooth cross-fade between pages | No |
| D016 | M002 | pattern | Micro-interaction style | Polished but restrained — smooth hovers, subtle scale/glow, no magnetic cursor or tilt effects | User chose professional over playful | No |
