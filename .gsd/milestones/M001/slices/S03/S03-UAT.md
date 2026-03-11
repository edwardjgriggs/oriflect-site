# S03: Visual Design Polish — UAT

**Milestone:** M001
**Written:** 2026-03-11

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: S03 is a pure CSS/HTML polish pass with no new JavaScript, no new routes, and no new data flows. All changes produce deterministic class names in static HTML. `astro build` exit 0 proves Tailwind v4 compiled every utility class without error. grep checks against `dist/` built HTML prove each visual element was rendered by the correct template and survived the build pipeline. No runtime interaction, form submission, or dynamic behavior was introduced — artifact inspection is the complete contract.

## Preconditions

- `npm run build` has been run and `dist/` is populated (6 pages)
- No local uncommitted changes that could affect the build output

## Smoke Test

```bash
npm run build 2>&1 | tail -3
# → exit 0 with "6 page(s) built"
grep "antialiased" dist/index.html
# → found — confirms global rendering improvement is live
```

## Test Cases

### 1. BaseLayout — Global antialiased rendering

```bash
grep "antialiased" dist/index.html
```
**Expected:** Class `antialiased` present in the `<body>` class string of `dist/index.html`.

---

### 2. Home page — Service pipeline card hover lift and icon containers

```bash
grep "hover:-translate-y-1" dist/index.html
grep "bg-ember/10" dist/index.html
```
**Expected:**
- `hover:-translate-y-1` found (3 occurrences — one per pipeline card `<a>`)
- `bg-ember/10` found (3 occurrences — one per icon container)

---

### 3. Home page — "Why Oriflect" card elevation with dark mode

```bash
grep "dark:bg-dark-surface" dist/index.html | grep -c "rounded-xl"
```
**Expected:** Returns 6 (3 pipeline cards + 3 Why Oriflect cards — all with `rounded-xl dark:bg-dark-surface`).

---

### 4. Services page — Section border dividers

```bash
grep "border-sapphire" dist/services/index.html
grep "dark:border-white" dist/services/index.html
```
**Expected:** Both classes found on the Implementation and Training `<section>` elements.

---

### 5. About page — Founder photo gold ring

```bash
grep "ring-gold" dist/about/index.html
grep "ring-offset-ivory" dist/about/index.html
grep "dark:ring-offset-dark-bg" dist/about/index.html
```
**Expected:** All three found on the founder `<img>` element.

---

### 6. About page — Core Values card elevation

```bash
grep -c "dark:bg-dark-surface" dist/about/index.html
```
**Expected:** Returns 5 — 1 mission section + 4 Core Values cards.

---

### 7. Blog listing — Tag pills rendered from post.data.tags

```bash
grep "tracking-wider" dist/blog/index.html
grep "hover:border-sapphire" dist/blog/index.html
```
**Expected:**
- `tracking-wider` found — confirms tag pill classes compiled into listing HTML
- `hover:border-sapphire` found — confirms hover border treatment on card `<li>`

---

### 8. Blog post — Description uses accent font

```bash
grep "font-accent" dist/blog/ai-for-smbs-what-actually-works/index.html
```
**Expected:** `font-accent italic` found on the post header description `<p>`.

---

### 9. Prose readability improvement

```bash
grep "1.0625rem" src/styles/global.css
```
**Expected:** Found in `.prose p` rule (source check — CSS custom properties don't appear verbatim in built HTML).

---

### 10. Global prose improvement confirmed live on blog post

```bash
grep "prose" dist/blog/ai-for-smbs-what-actually-works/index.html
```
**Expected:** `.prose` class found on the content wrapper div — confirms the same global.css stylesheet applies to post pages.

---

### 11. Dark mode classes present across all modified pages

```bash
grep -c "dark:" dist/index.html
grep -c "dark:" dist/about/index.html
grep -o "dark:" dist/blog/index.html | wc -l
```
**Expected:**
- `dist/index.html` → ≥ 10 (actual: 11)
- `dist/about/index.html` → ≥ 10 (actual: 13)
- `dist/blog/index.html` → ≥ 5 occurrences (actual: 24 — minified HTML requires occurrence count not line count)

## Edge Cases

### Blog post with no tags

`blog.astro` renders tag pills only when `post.data.tags && post.data.tags.length > 0`. If a post has no tags field or an empty tags array, no pills section is rendered — just the date and description. The conditional guard prevents an empty `<div>` from appearing.

**Expected:** Posts without tags show date → description with no pills row between them.

---

### Dark mode ring offset on founder photo

The founder photo uses `ring-offset-ivory dark:ring-offset-dark-bg`. In dark mode the ring offset background must match `dark-bg` for the gold ring to be visible.

```bash
grep "dark:ring-offset-dark-bg" dist/about/index.html
```
**Expected:** Found — both light and dark ring offset classes present.

## Failure Signals

- `npm run build` exits non-zero → Tailwind v4 class compilation error or Astro/Zod schema error; check `npm run build 2>&1 | grep -i "error\|warn"` for file + line
- `grep "antialiased" dist/index.html` returns nothing → BaseLayout.astro change was not saved or was overwritten
- `grep "ring-gold" dist/about/index.html` returns nothing → about.astro `<img>` ring class was stripped or the file wasn't saved
- `grep "font-accent" dist/blog/*/index.html` returns nothing → `[slug].astro` description class change was not applied
- `grep "tracking-wider" dist/blog/index.html` returns nothing → blog.astro tag pill rendering block is missing or malformed
- Tag pills not appearing in browser on listing page → check `post.data.tags` has values in the blog post frontmatter; inspect `src/content/blog/*.md`
- Dark mode classes unexpectedly missing → `grep -o "dark:" dist/{page}/index.html | wc -l` to count occurrences in minified output

## Requirements Proved By This UAT

- R003 (Visual design polish) — All five content pages have received a targeted polish pass. `astro build` exit 0 + all 11 grep checks prove every named improvement is compiled and present in built HTML. Tailwind v4 compiled all new utility classes. Dark mode pairing verified across Home, About, and Blog. This closes R003.

## Not Proven By This UAT

- Live browser rendering with real fonts loaded (Montserrat, Playfair Display, Inter) — font fallback behavior is not tested
- Actual visual fidelity in a browser at various viewport sizes — card layouts, grid breakpoints, and hover states can only be fully assessed in a browser
- Dark mode toggle interaction (clicking ThemeToggle in browser) — functionality was not regrессed but is not re-tested here
- Calendly popup behavior — unrelated to S03; not retested
- Deployment pipeline (Vercel, Netlify, or GitHub Pages) behavior — R004 push to origin is the only deployment step tested; CDN/hosting rendering is out of scope
- Contact form submission — unrelated to S03

## Notes for Tester

- Tailwind v4 uses `bg-ember/10` opacity shorthand syntax — if you check the compiled CSS file directly, you will see a generated class with CSS `opacity` or `color-mix()`. The class name in HTML is the source of truth.
- The blog listing `dark:` line count will appear low (`grep -c` returns 4) because Astro minifies HTML. Use `grep -o "dark:" dist/blog/index.html | wc -l` for the real count (returns 24).
- The founder photo ring is most visible on the About page in light mode. In dark mode, `ring-offset-dark-bg` provides offset so the gold ring doesn't blend into the section background.
- `font-accent` maps to Playfair Display — the blog post description should render in a serif italic style visually distinguishable from the Inter body copy around it.
