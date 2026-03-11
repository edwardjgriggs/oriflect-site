---
estimated_steps: 5
estimated_files: 2
---

# T03: Polish Blog listing and post pages, verify build, commit

**Slice:** S03 — Visual Design Polish
**Milestone:** M001

## Description

Apply visual improvements to both blog pages and close the slice. Blog listing cards gain tag pill rendering (the `post.data.tags` field already exists in the Content Layer schema but is not currently shown on the listing) and a stronger hover border treatment. The blog post header's description line switches from `font-body` to `font-accent italic` for typographic distinction — this leverages Playfair Display, already loaded by BaseLayout. After both edits, run the full slice verification suite and commit.

## Steps

1. **blog.astro, tag pills on listing cards** — Inside the `<article>` element in the post loop, between the date `<p>` and the description `<p>`, add conditional tag pill rendering:
   ```astro
   {post.data.tags && post.data.tags.length > 0 && (
     <div class="flex flex-wrap gap-2 mb-3">
       {post.data.tags.map((tag) => (
         <span class="inline-block px-2 py-0.5 text-xs font-body font-semibold uppercase tracking-wider bg-sapphire/10 dark:bg-sapphire-tint/10 text-sapphire dark:text-sapphire-tint rounded-full">
           {tag}
         </span>
       ))}
     </div>
   )}
   ```
2. **blog.astro, card hover border** — On the post card `<li>` element, add `hover:border-sapphire/30 dark:hover:border-sapphire-tint/30 transition-colors` to its class (alongside the existing `hover:shadow-md transition-shadow`).
3. **blog/[slug].astro, description accent font** — In the post header section, update the description `<p>` tag: replace `font-body` with `font-accent italic` in its class list. Keep all other classes (`text-white/80 text-lg mt-4 max-w-2xl mx-auto leading-relaxed`) unchanged.
4. **Full slice verification suite** — Run all checks:
   ```bash
   npm run build
   # Must exit 0
   
   grep "font-accent" dist/blog/ai-for-smbs-what-actually-works/index.html
   # → found
   
   grep "tracking-wider" dist/blog/index.html
   # → found (tag pill class in listing)
   
   grep "antialiased" dist/index.html
   # → found (T01 regression check)
   
   grep "ring-gold" dist/about/index.html
   # → found (T02 regression check)
   
   grep -c "dark:" dist/index.html
   # → must be ≥ 10
   ```
5. **Commit** — Stage all changes and commit:
   ```bash
   git add -A
   git commit -m "feat(M001/S03): visual design polish — antialiased, card elevation, tag pills, photo ring, prose improvements"
   ```

## Must-Haves

- [ ] `blog.astro` renders tag pills from `post.data.tags` with sapphire/sapphire-tint colors and `dark:` variants
- [ ] `blog.astro` card `<li>` has `hover:border-sapphire/30 dark:hover:border-sapphire-tint/30`
- [ ] `blog/[slug].astro` description `<p>` uses `font-accent italic` (not `font-body`)
- [ ] `astro build` exits 0 after all three changes
- [ ] S03 commit exists on the branch with the specified commit message

## Verification

- `npm run build` → exit 0
- `grep "font-accent" dist/blog/ai-for-smbs-what-actually-works/index.html` → found
- `grep "tracking-wider" dist/blog/index.html` → found (tag pill class)
- `grep "antialiased" dist/index.html` → found (T01 regression)
- `grep "ring-gold" dist/about/index.html` → found (T02 regression)
- `git log --oneline -1` → shows `feat(M001/S03)` commit message

## Observability Impact

- Signals added/changed: none (static site)
- How a future agent inspects this:
  - Tag pills: `grep "tracking-wider" dist/blog/index.html` confirms pills compiled into listing; `grep "post.data.tags" src/pages/blog.astro` confirms source wiring
  - Description font: `grep "font-accent" dist/blog/*/index.html` confirms font class in all post pages
  - Regression check: same greps used in T01/T02 verification catch any build regression before commit
- Failure state exposed: if tag pills don't appear in built HTML, the JSX conditional in the Astro template wasn't rendered — check that `post.data.tags` is defined in the Content Layer schema (it is: optional `z.array(z.string())` in `src/content/config.ts`); if font-accent is absent, verify the description `<p>` class was updated in `[slug].astro`

## Inputs

- `src/pages/blog.astro` — current post card markup with `<article>` element; `post.data` has `.tags` available (from Content Layer schema in `src/content/config.ts`)
- `src/pages/blog/[slug].astro` — current post header description `<p class="font-body text-white/80 ...">` to update
- T01 complete: `antialiased` + prose changes + Home page polished; build passing
- T02 complete: Services dividers + About photo ring + About values cards; build passing
- S02 Forward Intelligence: `post.data.tags` is optional `z.array(z.string())` in schema; tags already render as pills in the post header — the listing page just needs the same treatment

## Expected Output

- `src/pages/blog.astro` — listing cards show tag pills from `post.data.tags`; cards have hover border treatment
- `src/pages/blog/[slug].astro` — description `<p>` uses `font-accent italic`
- `dist/blog/index.html` — contains `tracking-wider` (tag pill class)
- `dist/blog/ai-for-smbs-what-actually-works/index.html` — contains `font-accent` (description styling)
- Git: one squash-ready commit `feat(M001/S03): visual design polish — ...` on branch `gsd/M001/S03`
