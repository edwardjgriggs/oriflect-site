# Phase 1: Foundation - Research

**Researched:** 2026-03-09
**Domain:** Astro 5.x static site scaffold with Tailwind CSS 4, design system, and Vercel deployment
**Confidence:** HIGH

## Summary

This phase creates a greenfield Astro 5.x static site with Tailwind CSS 4, a branded design system (colors, typography, spacing), responsive layout shell (header with sticky nav, footer, page wrapper), dark mode toggle, and Vercel deployment. The stack is mature and well-documented: Astro 5.17+ is stable, Tailwind CSS 4 has been GA since January 2025, and Vercel has zero-config Astro support for static sites.

The key technical shift from prior versions is that Tailwind CSS 4 uses CSS-first configuration via `@theme` directives instead of `tailwind.config.js`, and the old `@astrojs/tailwind` integration is deprecated in favor of the `@tailwindcss/vite` plugin (supported natively since Astro 5.2). Fonts are self-hosted via `@fontsource-variable` packages for all four font families.

**Primary recommendation:** Use `npm create astro@latest`, add Tailwind via `@tailwindcss/vite` plugin, define the complete design system in a single `src/styles/global.css` file using `@theme`, and deploy to Vercel via git integration with zero additional configuration.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Primary: Deep Sapphire (#0A2463) -- headers, buttons, logo backgrounds, key text accents
- Secondary: Radiant Gold (#D4A843) -- accents, highlights, dividers
- Accent: Ember Orange (#E8651A) -- CTA buttons, attention-grabbers. Use sparingly (max 10%)
- Text: Charcoal (#1C1C1E) -- body copy and headlines on light backgrounds
- Background: Soft Ivory (#F8F6F0) -- used instead of pure white for warmth
- Tints: Sapphire Tint (#E8EDF5), Gold Tint (#F5EDD8), Pure White (#FFFFFF)
- 60-30-10 ratio: 60% Soft Ivory/White backgrounds, 30% Deep Sapphire structural, 10% Gold + Ember Orange accents
- Headings: Montserrat (Bold, 700), Body: Inter (Regular 400, Medium 500), Accents: Playfair Display (Regular 400), Code: JetBrains Mono (Regular 400)
- Type scale: 48-64px hero down to 14px captions, body 16-18px with 1.6 line height
- Self-host all fonts via @fontsource
- Dark mode supported from the start with theme toggle
- Icons + minimal imagery approach
- Fixed/sticky nav bar, Deep Sapphire background, white text, logo left, links: Home/Services/About/Blog, CTA "Book a Discovery Call" inline after links
- Mobile: hamburger menu with nav collapse
- Footer: contact info (email, phone, location), social links (LinkedIn, Twitter/X), no nav/legal links in v1
- Hosting: Vercel, domain: oriflect.com
- Deploy immediately -- shell live on preview URL
- CI/CD via Vercel git integration

### Claude's Discretion
- CTA button color on dark nav (Ember Orange or Radiant Gold)
- Mobile CTA visibility without opening menu
- Mobile menu animation style
- Card style (shadow vs bordered)
- Footer background color and layout
- Content max width
- Whitespace/spacing scale

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Responsive navigation with mobile hamburger menu | Astro component architecture, Tailwind responsive utilities, sticky positioning |
| NAV-02 | Persistent "Book a Discovery Call" CTA visible on all pages | Layout component pattern ensures CTA in shared header; discretion on mobile visibility |
| NAV-03 | Footer with contact info, social links, and legal pages | Footer component in layout; user says no legal links in v1, just contact + social |
| SEO-04 | Fast load times with static site optimization | Astro static output (zero JS by default), self-hosted fonts, Tailwind CSS-only approach |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 5.17+ | Static site generator | Islands architecture, zero JS by default, perfect for content/marketing sites |
| @tailwindcss/vite | 4.x | CSS framework via Vite plugin | Official Tailwind v4 integration for Astro 5.2+, replaces deprecated @astrojs/tailwind |
| tailwindcss | 4.x | Utility-first CSS | CSS-first config via @theme, 5x faster builds, modern CSS features |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource-variable/montserrat | latest | Headings font (variable, weight 100-900) | Import in global layout for heading typography |
| @fontsource-variable/inter | latest | Body/UI font (variable, weight 100-900) | Import in global layout for body text |
| @fontsource-variable/playfair-display | latest | Accent/quote font (variable) | Import in global layout for testimonials/taglines |
| @fontsource-variable/jetbrains-mono | latest | Code font (variable, weight 100-800) | Import in global layout for code blocks |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @fontsource | Google Fonts CDN | User locked self-hosting for performance; @fontsource is the standard approach |
| @tailwindcss/vite | @astrojs/tailwind | @astrojs/tailwind is deprecated for Tailwind v4; do not use |
| Tailwind @theme | tailwind.config.js | Config file approach is v3; v4 uses CSS-first @theme exclusively |

**Installation:**
```bash
npm create astro@latest -- --template minimal
npm install @tailwindcss/vite tailwindcss
npm install @fontsource-variable/montserrat @fontsource-variable/inter @fontsource-variable/playfair-display @fontsource-variable/jetbrains-mono
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── Header.astro         # Sticky nav, hamburger, CTA button
│   ├── Footer.astro         # Contact info, social links
│   ├── ThemeToggle.astro    # Dark/light mode toggle button
│   ├── MobileMenu.astro     # Mobile nav drawer/overlay
│   └── Logo.astro           # SVG logo component
├── layouts/
│   └── BaseLayout.astro     # HTML shell, head, font imports, Header + Footer wrapper
├── pages/
│   ├── index.astro          # Homepage (placeholder for Phase 1)
│   ├── services.astro       # Placeholder
│   ├── about.astro          # Placeholder
│   └── blog.astro           # Placeholder
├── styles/
│   └── global.css           # @import "tailwindcss", @theme, @custom-variant dark
└── assets/
    └── logo.svg             # Brand logo
public/
├── favicon.svg
└── robots.txt               # Basic robots.txt
```

### Pattern 1: Tailwind v4 CSS-First Configuration
**What:** Define all design tokens (colors, fonts, spacing) in CSS using `@theme` instead of JavaScript config.
**When to use:** Always with Tailwind v4. There is no tailwind.config.js.
**Example:**
```css
/* src/styles/global.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Colors */
  --color-sapphire: #0A2463;
  --color-gold: #D4A843;
  --color-ember: #E8651A;
  --color-charcoal: #1C1C1E;
  --color-ivory: #F8F6F0;
  --color-sapphire-tint: #E8EDF5;
  --color-gold-tint: #F5EDD8;

  /* Fonts */
  --font-heading: "Montserrat Variable", sans-serif;
  --font-body: "Inter Variable", sans-serif;
  --font-accent: "Playfair Display Variable", serif;
  --font-code: "JetBrains Mono Variable", monospace;
}
```

### Pattern 2: Astro Layout with Font Imports
**What:** Single BaseLayout.astro that imports fonts, global CSS, and wraps all pages with Header/Footer.
**When to use:** Every page uses this layout.
**Example:**
```astro
---
// src/layouts/BaseLayout.astro
import '@fontsource-variable/montserrat';
import '@fontsource-variable/inter';
import '@fontsource-variable/playfair-display';
import '@fontsource-variable/jetbrains-mono';
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description?: string;
}
const { title, description = 'AI consulting for small businesses' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} | Oriflect</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="bg-ivory text-charcoal font-body dark:bg-gray-900 dark:text-gray-100">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Pattern 3: Dark Mode with Persistence
**What:** Toggle dark class on `<html>`, persist to localStorage, respect system preference.
**When to use:** Required -- user locked dark mode from the start.
**Example:**
```astro
<!-- Inline script in BaseLayout.astro <head> to prevent FOUC -->
<script is:inline>
  const theme = localStorage.getItem('theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

```astro
---
// src/components/ThemeToggle.astro
---
<button id="theme-toggle" aria-label="Toggle dark mode"
  class="p-2 rounded-md text-white hover:bg-sapphire/80">
  <span id="theme-icon-light" class="hidden dark:inline">☀️</span>
  <span id="theme-icon-dark" class="inline dark:hidden">🌙</span>
</button>

<script>
  const toggle = document.getElementById('theme-toggle');
  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
</script>
```

### Pattern 4: Astro Vite Plugin Configuration
**What:** Register Tailwind as a Vite plugin in astro.config.mjs.
**When to use:** Required for Tailwind v4 integration.
**Example:**
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Anti-Patterns to Avoid
- **Using @astrojs/tailwind integration:** Deprecated for Tailwind v4. Use `@tailwindcss/vite` plugin instead.
- **Creating tailwind.config.js:** Tailwind v4 uses CSS-first config via `@theme`. A JS config file is unnecessary and confusing.
- **Using @tailwind directives:** The old `@tailwind base; @tailwind components; @tailwind utilities;` is replaced by a single `@import "tailwindcss";`.
- **Adding dark: variant in JS config:** Tailwind v4 uses `@custom-variant dark (&:where(.dark, .dark *));` in CSS.
- **Loading fonts from Google CDN:** User specified self-hosting via @fontsource for performance.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive hamburger menu | Custom JS menu toggle from scratch | Astro component with Tailwind `hidden md:flex` + small toggle script | Battle-tested pattern, accessible |
| Font loading | Manual @font-face declarations | @fontsource-variable packages | Handles all font-face, weight ranges, formats automatically |
| Dark mode | Custom CSS variable theme system | Tailwind dark: variant + class toggle + localStorage | Standard pattern, one-line CSS setup |
| Sticky header | Custom scroll listener + position logic | Tailwind `sticky top-0 z-50` | Pure CSS, no JS needed |
| CSS reset/normalize | Custom reset stylesheet | Tailwind's built-in preflight (included with `@import "tailwindcss"`) | Comprehensive, maintained |

**Key insight:** Astro + Tailwind v4 handles almost everything via built-in features. The main custom code is the hamburger menu toggle (a few lines of JS) and the theme toggle.

## Common Pitfalls

### Pitfall 1: Flash of Unstyled Content (FOUC) with Dark Mode
**What goes wrong:** Page flashes white before dark mode is applied.
**Why it happens:** Dark mode class is toggled by a deferred script, so the initial render uses light mode.
**How to avoid:** Use `<script is:inline>` in the `<head>` of BaseLayout.astro to apply the dark class synchronously before the page renders. The `is:inline` directive prevents Astro from deferring the script.
**Warning signs:** Brief white flash when loading a page in dark mode.

### Pitfall 2: Using Deprecated @astrojs/tailwind
**What goes wrong:** Build errors or missing v4 features.
**Why it happens:** Many tutorials and guides still reference the old integration.
**How to avoid:** Use `@tailwindcss/vite` as a Vite plugin in `astro.config.mjs`. Do NOT run `npx astro add tailwind` if it installs the old integration (check which package it installs -- as of Astro 5.2+ it should install the Vite plugin).
**Warning signs:** Seeing `@astrojs/tailwind` in package.json.

### Pitfall 3: Font Variable Naming Mismatch
**What goes wrong:** Fonts don't apply; fallback system fonts render instead.
**Why it happens:** The CSS font-family name for @fontsource-variable packages uses "Variable" suffix (e.g., "Montserrat Variable", "Inter Variable").
**How to avoid:** Check the fontsource documentation for exact font-family string. Use the exact name in `@theme { --font-heading: "Montserrat Variable", sans-serif; }`.
**Warning signs:** Browser dev tools show a different font than expected.

### Pitfall 4: Mobile Menu Z-Index Conflicts
**What goes wrong:** Mobile menu appears behind other elements or doesn't overlay properly.
**Why it happens:** Sticky header and mobile menu overlay compete for stacking context.
**How to avoid:** Use consistent z-index scale: header `z-50`, mobile menu overlay `z-40`, mobile menu panel `z-50`.
**Warning signs:** Elements showing through the menu overlay.

### Pitfall 5: Tailwind v4 Color Format
**What goes wrong:** Colors don't work with opacity modifiers like `bg-sapphire/80`.
**Why it happens:** In Tailwind v4, hex colors defined in `@theme` work with opacity modifiers automatically via `color-mix()`. No special format needed.
**How to avoid:** Just use standard hex values in `@theme`. Tailwind v4 handles opacity via CSS `color-mix()` -- no need for the old RGB/HSL channel hack from v3.
**Warning signs:** N/A -- this just works in v4, but worth knowing it changed.

### Pitfall 6: Astro View Transitions and Dark Mode
**What goes wrong:** Dark mode resets when navigating between pages with View Transitions.
**Why it happens:** The `astro:after-swap` event replaces the DOM, losing the dark class.
**How to avoid:** If using View Transitions (not required for Phase 1), add a listener for `astro:after-swap` to reapply the dark class. For Phase 1 without View Transitions, the inline script approach is sufficient.
**Warning signs:** Theme resetting on navigation.

## Code Examples

### Complete global.css with Design System
```css
/* src/styles/global.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Brand Colors */
  --color-sapphire: #0A2463;
  --color-gold: #D4A843;
  --color-ember: #E8651A;
  --color-charcoal: #1C1C1E;
  --color-ivory: #F8F6F0;
  --color-sapphire-tint: #E8EDF5;
  --color-gold-tint: #F5EDD8;

  /* Dark mode colors */
  --color-dark-bg: #0F172A;
  --color-dark-surface: #1E293B;
  --color-dark-text: #E2E8F0;

  /* Font Families */
  --font-heading: "Montserrat Variable", sans-serif;
  --font-body: "Inter Variable", sans-serif;
  --font-accent: "Playfair Display Variable", serif;
  --font-code: "JetBrains Mono Variable", monospace;
}
```

### Sticky Header Component Pattern
```astro
---
// src/components/Header.astro
import ThemeToggle from './ThemeToggle.astro';
import Logo from './Logo.astro';
---
<header class="sticky top-0 z-50 bg-sapphire text-white">
  <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
    <Logo />

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-8">
      <a href="/" class="hover:text-gold transition-colors">Home</a>
      <a href="/services" class="hover:text-gold transition-colors">Services</a>
      <a href="/about" class="hover:text-gold transition-colors">About</a>
      <a href="/blog" class="hover:text-gold transition-colors">Blog</a>
      <a href="#book" class="bg-ember hover:bg-ember/90 text-white font-body font-medium px-5 py-2 rounded-md transition-colors">
        Book a Discovery Call
      </a>
      <ThemeToggle />
    </div>

    <!-- Mobile: CTA + Hamburger -->
    <div class="flex md:hidden items-center gap-3">
      <a href="#book" class="bg-ember text-white text-sm font-medium px-3 py-1.5 rounded-md">
        Book a Call
      </a>
      <button id="menu-toggle" aria-label="Open menu" class="p-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu Panel -->
  <div id="mobile-menu" class="hidden md:hidden bg-sapphire border-t border-white/10 px-4 pb-4">
    <a href="/" class="block py-2 hover:text-gold">Home</a>
    <a href="/services" class="block py-2 hover:text-gold">Services</a>
    <a href="/about" class="block py-2 hover:text-gold">About</a>
    <a href="/blog" class="block py-2 hover:text-gold">Blog</a>
    <ThemeToggle />
  </div>
</header>

<script>
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });
</script>
```

### Vercel Deployment (astro.config.mjs)
```javascript
// astro.config.mjs -- static site, no adapter needed
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://oriflect.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @astrojs/tailwind integration | @tailwindcss/vite plugin | Astro 5.2 (Feb 2025) | Must use vite plugin, not astro integration |
| tailwind.config.js | @theme in CSS | Tailwind v4 (Jan 2025) | All config in CSS, no JS config file |
| @tailwind directives | @import "tailwindcss" | Tailwind v4 (Jan 2025) | Single import replaces three directives |
| darkMode: 'class' in config | @custom-variant dark | Tailwind v4 (Jan 2025) | Dark mode configured in CSS |
| RGB channel hack for opacity | color-mix() automatic | Tailwind v4 (Jan 2025) | Hex colors work with opacity modifiers natively |
| @fontsource static packages | @fontsource-variable packages | 2023+ | Variable fonts = one file, all weights |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Deprecated for Tailwind v4, will eventually be removed
- `tailwind.config.js`: Not used in v4 CSS-first workflow
- `@tailwind base/components/utilities`: Replaced by `@import "tailwindcss"`

## Open Questions

1. **Logo SVG files**
   - What we know: User says "Logo files are ready (SVG/PNG) and will be provided"
   - What's unclear: Files not yet in the repo
   - Recommendation: Use a text placeholder ("Oriflect") until logo files are provided; make Logo.astro component easily swappable

2. **Dark mode color palette**
   - What we know: User wants dark mode from the start; light mode colors are fully specified
   - What's unclear: Exact dark mode equivalents for brand colors (sapphire bg in dark mode, ivory text alternatives, etc.)
   - Recommendation: Use standard dark palette (slate-900 bg, slate-100 text) as sensible defaults; brand accent colors (gold, ember) work on both backgrounds

3. **"Book a Discovery Call" link target**
   - What we know: CTA button text is specified; Calendly integration is Phase 3
   - What's unclear: What the button links to before Phase 3
   - Recommendation: Use `#book` anchor or `/contact` placeholder; update in Phase 3

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Playwright (Astro-recommended for e2e) |
| Config file | none -- see Wave 0 |
| Quick run command | `npx playwright test --project=chromium` |
| Full suite command | `npx playwright test` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-01 | Nav visible on desktop, hamburger on mobile | e2e | `npx playwright test tests/nav.spec.ts -x` | No -- Wave 0 |
| NAV-02 | CTA button visible on all viewports | e2e | `npx playwright test tests/nav.spec.ts -x` | No -- Wave 0 |
| NAV-03 | Footer shows contact + social links | e2e | `npx playwright test tests/footer.spec.ts -x` | No -- Wave 0 |
| SEO-04 | Page loads fast, no render-blocking resources | manual + Lighthouse | Manual: `npx lighthouse http://localhost:4321 --only-categories=performance` | Manual only |

### Sampling Rate
- **Per task commit:** `npx playwright test --project=chromium`
- **Per wave merge:** `npx playwright test`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `playwright.config.ts` -- Playwright configuration
- [ ] `tests/nav.spec.ts` -- NAV-01, NAV-02 coverage
- [ ] `tests/footer.spec.ts` -- NAV-03 coverage
- [ ] Framework install: `npm install -D @playwright/test && npx playwright install chromium`

## Sources

### Primary (HIGH confidence)
- [Astro Docs - Install and Setup](https://docs.astro.build/en/install-and-setup/) - Project creation, structure
- [Astro Docs - Deploy to Vercel](https://docs.astro.build/en/guides/deploy/vercel/) - Static deploy, no adapter needed
- [Astro Docs - Layouts](https://docs.astro.build/en/basics/layouts/) - Layout component pattern
- [Tailwind CSS v4 - Theme Variables](https://tailwindcss.com/docs/theme) - @theme directive, custom colors/fonts
- [Tailwind CSS v4 - Dark Mode](https://tailwindcss.com/docs/dark-mode) - Dark mode configuration
- [Tailwind CSS v4.0 Blog Post](https://tailwindcss.com/blog/tailwindcss-v4) - Release notes, new features
- [Fontsource - Montserrat Install](https://fontsource.org/fonts/montserrat/install) - Package name, font-family string
- [Fontsource - Playfair Display Install](https://fontsource.org/fonts/playfair-display/install) - Variable font package
- [Fontsource - JetBrains Mono Install](https://fontsource.org/fonts/jetbrains-mono/install) - Variable font package

### Secondary (MEDIUM confidence)
- [Astro + Tailwind v4 Setup Guide (Tailkits)](https://tailkits.com/blog/astro-tailwind-setup/) - Integration walkthrough
- [Theme Toggle in Astro 5 + Tailwind 4 (DEV)](https://dev.to/gdpp/theme-toggle-in-astro-5-tailwind-4-dme) - Dark mode implementation pattern
- [How to Upgrade Astro to Tailwind v4 (Brian Douglass)](https://bhdouglass.com/blog/how-to-upgrade-your-astro-site-to-tailwind-v4/) - Migration patterns

### Tertiary (LOW confidence)
- None -- all findings verified with primary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official docs confirm Astro 5.17+, Tailwind v4, @tailwindcss/vite, @fontsource
- Architecture: HIGH - Standard Astro project structure, well-documented layout patterns
- Pitfalls: HIGH - Common issues verified across multiple sources and official docs
- Dark mode: HIGH - Pattern confirmed via official Tailwind docs and Astro community examples

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable stack, 30-day validity)
