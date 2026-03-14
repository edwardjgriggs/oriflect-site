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
| D007 | M002/S02 | pattern | Scroll-reveal observer strategy | Single shared IntersectionObserver per component type | Avoids creating N observers for N elements; better performance | No |
| D008 | M002/S02 | pattern | No-JS fallback approach | `<noscript><style>` block per page forces visibility | Simpler than `.no-js` class approach; works without any JS execution | Yes — if centralized in layout |
| D009 | M002/S02 | arch | View transition forward-compat | `astro:after-swap` listener in ScrollReveal | Re-initializes observers after view transitions without S03 dependency | No |
| D010 | M002/S03 | pattern | Script re-init for view transitions | `astro:page-load` event + remove `is:inline` for interactive scripts | `is:inline` scripts don't re-run after ClientRouter swaps; `astro:page-load` re-binds listeners. Dark mode uses `astro:after-swap` (before paint) separately. | No |
| D011 | M002/S04 | pattern | Testimonial slide transitions | CSS opacity transitions (not JS animation) | Simpler implementation; inherently respects reduced-motion CSS rules; graceful degradation shows first slide if JS fails | No |
| D012 | M002/S04 | pattern | Results card data approach | Map over data array rather than hand-coded cards | Easier to update content; consistent styling guaranteed across all cards | Yes — if cards need unique layouts |
| D013 | M002/S05 | pattern | Pipeline arrow animation | CSS-only pulse keyframe on arrow containers (no JS) | Simplest approach; inherently respects reduced-motion; no runtime cost | No |
| D014 | M002/S05 | pattern | Homepage section order | hero → pipeline → metrics → results → testimonials → why oriflect → blog → CTA | Keeps all existing sections; blog naturally leads into CTA; results/testimonials grouped as social proof | Yes — if sections added/removed |
| D015 | M002/S06 | pattern | Global CSS for focus/active states | Global selectors (`a`, `button`, `[role="button"]`) in global.css | Minimizes file touches; covers all current and future interactive elements automatically | Yes — if component-scoped styles preferred |
