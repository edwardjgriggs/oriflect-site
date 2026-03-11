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
