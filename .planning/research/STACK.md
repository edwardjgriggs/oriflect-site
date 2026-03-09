# Stack Research

**Domain:** AI consulting company marketing/conversion website (static site with blog)
**Researched:** 2026-03-09
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.x (current stable: ~5.17) | Static site framework | Built for content-driven marketing sites. Ships zero JS by default, resulting in sub-second page loads and perfect Lighthouse scores. Content Collections provide type-safe Markdown/MDX blog management out of the box. Islands architecture means interactive widgets (Calendly embed, contact form) load only where needed. Acquired by Cloudflare in Jan 2026 -- long-term investment is guaranteed. |
| Tailwind CSS | 4.2 | Utility-first CSS framework | v4 is a ground-up rewrite: 5x faster full builds, 100x faster incremental builds. Zero-config setup -- just `@import "tailwindcss"` in CSS. Built on modern CSS features (cascade layers, @property, color-mix). Professional, consistent design without writing custom CSS. Perfect for "McKinsey meets tech" aesthetic with precise spacing and typography control. |
| TypeScript | 5.x | Type safety | Astro has first-class TypeScript support. Content Collections use TypeScript schemas for frontmatter validation -- catches blog post errors at build time, not production. |

### Hosting & Deployment

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Cloudflare Pages | - | Static hosting & CDN | Free tier: unlimited bandwidth, unlimited sites, 500 builds/month. Global edge network for fast load times worldwide. Automatic HTTPS, custom domains included. Git-based deploys from GitHub -- push to main = live site. Astro is now owned by Cloudflare, so first-class integration. Preview deployments on every PR. |

### Blog & Content

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro Content Collections | Built-in (Astro 5.x) | Blog post management | Type-safe Markdown/MDX with schema validation. Frontmatter fields (title, date, tags, description) validated at build time. Automatic slug generation. No external CMS dependency -- blog posts are `.md` files in `src/content/blog/`. |
| Markdown | - | Blog post authoring | Simple, portable, version-controlled. Non-developers can write posts in any text editor. No vendor lock-in. |

### Form Handling

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Web3Forms | Free tier | Contact form backend | Free API for static sites -- sends form submissions to email. No server needed. Works with plain HTML forms (no JS required). Free tier stores submissions for 30 days. Simple: add an API key as a hidden field, point form action to their endpoint. Astro-specific documentation available. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/sitemap | Latest (auto-matched to Astro) | SEO sitemap generation | Always -- generates sitemap-index.xml and sitemap-0.xml at build time. Install via `npx astro add sitemap`. |
| @astrojs/mdx | Latest | MDX support in blog | Only if blog posts need interactive components (charts, embedded demos). Pure Markdown is sufficient for text+image posts. Start without it, add when needed. |
| sharp | Latest | Image optimization | Always -- Astro uses sharp by default for image processing. Auto-converts to WebP/AVIF, resizes, and optimizes. Use Astro's built-in `<Image>` component for automatic optimization. |
| astro-seo | Latest | SEO meta tag management | Always -- simplifies per-page meta tags, Open Graph, Twitter cards. Cleaner than manually writing `<meta>` tags in every layout. |
| @fontsource/* | Latest | Self-hosted web fonts | Always -- eliminates render-blocking Google Fonts requests. Import fonts as npm packages. Better privacy, faster load. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Node.js 20 LTS | Runtime | Required by Astro. Use LTS for stability. |
| pnpm | Package manager | Faster than npm, strict dependency resolution, disk-efficient. Astro docs recommend it. |
| Prettier | Code formatting | Use with `prettier-plugin-astro` for `.astro` file formatting. |
| prettier-plugin-astro | Astro file formatting | Formats `.astro` files correctly (HTML + frontmatter). |
| prettier-plugin-tailwindcss | Tailwind class sorting | Auto-sorts Tailwind classes in consistent order. Install after prettier-plugin-astro. |

## Installation

```bash
# Initialize project
pnpm create astro@latest oriflect-site -- --template basics --typescript strict

# Core dependencies
pnpm add tailwindcss @tailwindcss/vite

# Astro integrations
pnpm add @astrojs/sitemap
pnpm add astro-seo

# Image optimization (usually included, verify)
pnpm add sharp

# Fonts (example -- replace with actual brand fonts)
pnpm add @fontsource/inter @fontsource/plus-jakarta-sans

# Dev dependencies
pnpm add -D prettier prettier-plugin-astro prettier-plugin-tailwindcss
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro | Next.js | Only if you need server-side rendering, authentication, or a full-stack app. Massive overkill for a static marketing site -- ships way more JS, slower page loads, more complex deployment. |
| Astro | Hugo | Only if you need to build 10,000+ pages in under a second. Hugo is faster for massive content sites but has a steeper learning curve (Go templates), weaker component model, and no island architecture for interactive widgets. |
| Astro | Eleventy (11ty) | Only if you want maximum simplicity and zero framework opinions. Eleventy is lighter but lacks Astro's component model, image optimization, and Content Collections. More manual setup for everything. |
| Tailwind CSS | Plain CSS / CSS Modules | Only if team strongly prefers writing traditional CSS. Tailwind is faster for consistent, professional designs and eliminates bikeshedding on class names and spacing values. |
| Cloudflare Pages | Vercel | Only if already invested in the Vercel ecosystem. Vercel's free tier has bandwidth limits (100GB/month) while Cloudflare is unlimited. Both have excellent DX. |
| Cloudflare Pages | Netlify | Only if already using Netlify for other projects. Netlify's free tier has 100GB bandwidth limit and 300 build minutes. Cloudflare is more generous. |
| Web3Forms | Formspree | Formspree has no free tier. Web3Forms free plan is sufficient for a consulting site's contact form volume. Switch to Formspree only if you need advanced features (file uploads, conditional logic). |
| Web3Forms | Resend + Astro Server Actions | Only if you want full control over email delivery and already have SSR set up. Adds server-side complexity that defeats the purpose of a static site. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Gatsby | Effectively abandoned. React-based, ships heavy JS bundles, GraphQL data layer adds unnecessary complexity for a marketing site. Build times are slow. | Astro |
| WordPress | Server-side CMS is overkill. Requires hosting, security patches, plugin updates, database management. Slow without heavy caching. Attack surface for a simple marketing site. | Astro + Markdown |
| Create React App | Deprecated. Single-page app architecture is terrible for SEO and initial load performance. Not designed for content sites. | Astro |
| Bootstrap | Opinionated component styles lead to generic-looking sites. Fighting Bootstrap defaults wastes more time than building with Tailwind utilities. Hard to achieve the premium "McKinsey meets tech" look. | Tailwind CSS |
| Google Fonts (CDN) | Render-blocking external requests. Privacy concerns (GDPR). Slower than self-hosted fonts. | @fontsource packages |
| Netlify Forms | Tied to Netlify hosting. 100 submissions/month on free tier is limiting. | Web3Forms |
| Heavy animation libraries (GSAP, Framer Motion) | Unnecessary JS weight for a consulting site. Professional sites don't need flashy animations -- they need fast loads and clear information. | CSS transitions/animations, or Astro View Transitions API for page transitions |

## Stack Patterns by Variant

**If blog grows beyond 50 posts:**
- Add tag/category pages with dynamic routes
- Consider adding `pagefind` for client-side search (zero-server search index, built at build time)
- Content Collections handle this scale well

**If you later need a CMS for non-technical editors:**
- Add Decap CMS (formerly Netlify CMS) -- Git-based CMS that works with Markdown files
- Or use Astro's Content Layer API to connect to an external headless CMS (Sanity, Contentful)
- No architecture changes needed -- just add a content source

**If you need analytics:**
- Use Cloudflare Web Analytics (free, privacy-friendly, no cookie banner needed)
- Or Plausible/Fathom for more features (paid)
- Avoid Google Analytics -- requires cookie consent banner, heavy script, privacy concerns

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Astro 5.x | Tailwind CSS 4.x | Use `@tailwindcss/vite` plugin. Astro 5 uses Vite under the hood, so the Vite plugin is the correct integration path. Do NOT use the old `@astrojs/tailwind` integration -- it's for Tailwind v3. |
| Astro 5.x | Node.js 20+ | Node 18 support was dropped in Astro 5. Use Node 20 LTS or Node 22. |
| Tailwind CSS 4.x | PostCSS | Tailwind v4 includes its own CSS processing -- you may not need a separate PostCSS config. |
| prettier-plugin-tailwindcss | prettier-plugin-astro | Both work together but `prettier-plugin-tailwindcss` must be listed LAST in the plugins array. |

## Calendly Integration Note

Calendly provides a standard embed script (`<script src="https://assets.calendly.com/assets/external/widget.js">`). In Astro, load this in a `<script>` tag within the component that renders the booking widget. Use Astro's `is:inline` directive or place the script in the component's frontmatter. No npm package needed -- use Calendly's official embed code directly.

## Sources

- [Astro official site](https://astro.build/) -- framework capabilities, Cloudflare acquisition (HIGH confidence)
- [Astro GitHub releases](https://github.com/withastro/astro/releases) -- version 5.17 confirmed as current stable, v6 in beta (HIGH confidence)
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- v4 features and performance (HIGH confidence)
- [Tailwind CSS v4.2 release](https://laravel-news.com/tailwindcss-4-2-0) -- latest patch version confirmed (HIGH confidence)
- [Cloudflare Pages](https://pages.cloudflare.com/) -- free tier details, unlimited bandwidth (HIGH confidence)
- [Cloudflare Pages pricing](https://www.cloudflare.com/plans/developer-platform/) -- 500 builds/month free tier (HIGH confidence)
- [Web3Forms Astro guide](https://web3forms.com/platforms/astro-contact-form) -- form integration approach (HIGH confidence)
- [Astro Content Collections docs](https://docs.astro.build/en/guides/markdown-content/) -- Markdown/MDX content management (HIGH confidence)
- [@astrojs/sitemap docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/) -- SEO sitemap generation (HIGH confidence)
- [Astro image optimization guide](https://docs.astro.build/en/guides/images/) -- sharp integration, Image component (HIGH confidence)

---
*Stack research for: Oriflect AI consulting marketing website*
*Researched: 2026-03-09*
