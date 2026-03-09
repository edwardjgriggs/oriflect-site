# Phase 2: Core Pages - Research

**Researched:** 2026-03-09
**Domain:** Astro static page composition, Tailwind CSS v4 layout patterns, conversion-focused landing page architecture
**Confidence:** HIGH

## Summary

Phase 2 builds three content-rich pages (Homepage, Services, About) on top of the Astro + Tailwind v4 foundation established in Phase 1. The existing codebase provides BaseLayout, Header, Footer, ThemeToggle, and Logo components, plus a complete design token system in global.css. All three page files already exist as placeholders that import BaseLayout -- they need their placeholder content replaced with production sections.

This is primarily a content architecture and component composition task. No new dependencies are needed. The work involves creating reusable section components, drafting conversion-focused copy, and implementing responsive layouts using the established Tailwind design tokens. The homepage requires a unique full-viewport hero (breaking from the standard page pattern), while Services and About share a compact sapphire header banner pattern.

**Primary recommendation:** Structure work as page-level plans (Homepage, Services, About), extracting shared components (PageHeader, CTASection) early so Services and About can reuse them. Draft all copy inline rather than in separate content files -- these are static pages, not CMS-driven content.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Full-viewport hero with sapphire gradient background (linear-gradient 135deg, #0A2463 to lighter shade)
- White headline text, gold accent on subheadline, ember orange CTA button
- Opportunity-focused headline messaging (e.g., "Transform Your Operations with AI" not pain/fear-driven)
- Page flow: Hero -> Service Pipeline -> Why Oriflect -> Final CTA
- Service pipeline section: 3 connected cards with arrows showing Audit -> Implementation -> Training flow, with pricing ranges visible ($500-2K, $2K-10K, Custom)
- "Why Oriflect" section: 3 differentiator blocks with icons (SMB-focused, End-to-end, Measurable ROI)
- Each service card links to the corresponding anchor on the Services page
- Final CTA section at bottom: "Ready to get started?" with Book a Discovery Call button
- Full-section layout for services: each service gets its own full-width section with description, pricing, process steps, deliverables, and CTA
- Horizontal timeline for "What to Expect" process steps (numbered steps with connecting lines, stacks vertical on mobile)
- Alternating backgrounds between sections: ivory and sapphire-tint for visual separation
- "Start Here" badge on AI Discovery Audit section (gold accent badge)
- Anchor IDs for deep linking: #audit, #implementation, #training
- Specific deliverables listed per service (Audit, Implementation, Training -- details in CONTEXT.md)
- Each service section ends with its own CTA button
- Founder story + mission structure: founder section first, then company mission, then values
- Founder headshot/photo will be provided -- design includes photo placement
- Credentials focus: AI/tech expertise (not business consulting)
- 3-4 core values section with icon + title + one-liner
- Closing CTA at bottom of About page
- Warm consultant voice: empathetic, collaborative, "we'll walk you through it" energy
- Zero jargon: say "AI tools" and "automation", never "LLMs" or "neural networks"
- Opportunity-focused messaging (not fear/pain-driven)
- Claude drafts all copy based on business context
- Homepage: unique full-viewport hero (exception to shared pattern)
- Services & About: shared compact sapphire header banner with page title + 1-2 line intro

### Claude's Discretion
- Services page hero: whether compact sapphire banner or skip straight to content
- Exact copy for all headlines, descriptions, CTAs
- Specific icon choices for pipeline cards, differentiators, and values
- Typography sizing and spacing within sections
- Dark mode treatment for hero gradient and section backgrounds
- Card shadow/border styling
- Mobile responsive breakpoints and stacking behavior
- "Why Oriflect" differentiator content (final wording)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Hero section with clear value proposition headline and subheadline | Full-viewport sapphire gradient hero pattern, opportunity-focused copy approach |
| HOME-02 | Service overview showing Audit -> Implementation -> Training pipeline | Connected card component with arrows, deep links to Services page anchors |
| HOME-03 | Pricing transparency with ranges ($500-2K audit, $2K-10K implementation) | Pricing displayed on pipeline cards, visible without clicks |
| HOME-04 | Primary CTA driving visitors to book a discovery call | Ember orange CTA button linking to #book, repeated at hero and bottom |
| SERV-01 | Detailed AI Discovery Audit service description with pricing | Full-width section with #audit anchor, "Start Here" gold badge, deliverables list |
| SERV-02 | Detailed AI Implementation service description with pricing | Full-width section with #implementation anchor, deliverables list |
| SERV-03 | Detailed Staff Training service description | Full-width section with #training anchor, deliverables list |
| SERV-04 | "What to expect" process breakdown for each service | Horizontal timeline component (numbered steps, connecting lines, vertical on mobile) |
| ABOUT-01 | Founder/team story and credentials | Founder section with photo placeholder, AI/tech credentials focus |
| ABOUT-02 | Company mission and why Oriflect exists | Mission section + 3-4 core values with icons |
</phase_requirements>

## Standard Stack

### Core (already installed -- no new dependencies)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.17.x | Static site framework | Already installed, pages use .astro components |
| Tailwind CSS | 4.2.x | Utility-first styling | Already configured with @tailwindcss/vite plugin |

### Supporting (already available)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource-variable/* | 5.x | Self-hosted fonts | Already imported in BaseLayout |

### No New Dependencies Needed
This phase is purely Astro components + Tailwind classes. No additional npm packages required.

**Installation:**
```bash
# Nothing to install -- all dependencies already present
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── Header.astro          # Existing
│   ├── Footer.astro          # Existing
│   ├── Logo.astro            # Existing
│   ├── ThemeToggle.astro     # Existing
│   ├── PageHeader.astro      # NEW: shared compact sapphire banner for inner pages
│   ├── CTASection.astro      # NEW: reusable bottom CTA block
│   ├── ServiceCard.astro     # NEW: pipeline card for homepage
│   └── ProcessTimeline.astro # NEW: horizontal timeline for service process steps
├── layouts/
│   └── BaseLayout.astro      # Existing -- all pages use this
├── pages/
│   ├── index.astro           # Exists (placeholder) -- replace content
│   ├── services.astro        # Exists (placeholder) -- replace content
│   └── about.astro           # Exists (placeholder) -- replace content
└── styles/
    └── global.css            # Existing design tokens
```

### Pattern 1: Astro Component Props for Reusable Sections
**What:** Use Astro's typed props interface for reusable section components
**When to use:** Any component used more than once (PageHeader, CTASection, ServiceCard, ProcessTimeline)
**Example:**
```astro
---
// Source: Astro component pattern (established in project)
interface Props {
  title: string;
  subtitle?: string;
}
const { title, subtitle } = Astro.props;
---
<section class="bg-sapphire text-white py-16 px-6">
  <div class="max-w-7xl mx-auto">
    <h1 class="font-heading font-bold text-4xl md:text-5xl mb-4">{title}</h1>
    {subtitle && <p class="font-body text-lg text-white/80 max-w-2xl">{subtitle}</p>}
  </div>
</section>
```

### Pattern 2: Homepage Full-Viewport Hero (Exception Pattern)
**What:** Homepage breaks from standard layout with a full-viewport gradient hero that sits below the sticky header
**When to use:** Only on index.astro
**Example:**
```astro
<!-- min-h-screen minus header height (h-16 = 4rem) -->
<section class="min-h-[calc(100vh-4rem)] flex items-center justify-center"
  style="background: linear-gradient(135deg, #0A2463, #1a3a8a);">
  <div class="max-w-4xl mx-auto px-6 text-center text-white">
    <h1 class="font-heading font-bold text-5xl md:text-7xl mb-6">
      Transform Your Operations with AI
    </h1>
    <p class="font-accent text-xl md:text-2xl text-gold mb-10">
      Subheadline here
    </p>
    <a href="#book" class="inline-block bg-ember hover:bg-ember/90 text-white font-body font-semibold text-lg px-10 py-4 rounded-lg transition-colors">
      Book a Discovery Call
    </a>
  </div>
</section>
```

### Pattern 3: Alternating Section Backgrounds
**What:** Alternate between ivory (or white) and sapphire-tint backgrounds for visual rhythm
**When to use:** Services page sections, homepage sections below the hero
**Example:**
```astro
<!-- Section 1: default ivory background (inherited from body) -->
<section class="py-20 px-6">
  <div class="max-w-7xl mx-auto">...</div>
</section>

<!-- Section 2: sapphire-tint background -->
<section class="py-20 px-6 bg-sapphire-tint dark:bg-dark-surface">
  <div class="max-w-7xl mx-auto">...</div>
</section>
```

### Pattern 4: Connected Pipeline Cards with Arrows
**What:** Three service cards connected by arrow indicators showing progression
**When to use:** Homepage service pipeline section (HOME-02)
**Example:**
```astro
<div class="grid grid-cols-1 md:grid-cols-3 gap-0 items-stretch">
  <!-- Card -->
  <div class="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-md">
    <h3 class="font-heading font-bold text-xl text-sapphire dark:text-sapphire-tint mb-3">AI Discovery Audit</h3>
    <p class="text-gold font-heading font-semibold mb-4">$500 - $2,000</p>
    <p class="font-body text-charcoal/80 dark:text-dark-text/80">...</p>
    <a href="/services#audit" class="text-ember hover:underline font-medium mt-4 inline-block">Learn more</a>
  </div>
  <!-- Arrow (hidden on mobile, visible on desktop) -->
  <div class="hidden md:flex items-center justify-center">
    <svg><!-- arrow icon --></svg>
  </div>
  <!-- Next card... -->
</div>
```

### Pattern 5: Horizontal Process Timeline
**What:** Numbered steps with connecting lines, stacks vertically on mobile
**When to use:** "What to Expect" sections on Services page (SERV-04)
**Example:**
```astro
<div class="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0">
  {steps.map((step, i) => (
    <div class="flex md:flex-col items-center md:items-center flex-1">
      <div class="w-10 h-10 rounded-full bg-sapphire text-white flex items-center justify-center font-heading font-bold shrink-0">
        {i + 1}
      </div>
      <div class="hidden md:block h-0.5 w-full bg-sapphire/20 -order-1" />
      <p class="ml-4 md:ml-0 md:mt-3 font-body text-sm text-center">{step}</p>
    </div>
  ))}
</div>
```

### Pattern 6: Photo Placeholder for Founder
**What:** A placeholder div for founder headshot that can later accept an actual image
**When to use:** About page founder section
**Example:**
```astro
<!-- Placeholder until actual photo is provided -->
<div class="w-48 h-48 rounded-full bg-sapphire-tint dark:bg-dark-surface flex items-center justify-center mx-auto md:mx-0">
  <svg class="w-20 h-20 text-sapphire/30"><!-- person icon --></svg>
</div>
<!-- When photo is available, replace with: -->
<!-- <img src="/images/founder.jpg" alt="Founder name" class="w-48 h-48 rounded-full object-cover" /> -->
```

### Anti-Patterns to Avoid
- **Separate content files for static pages:** Do NOT create JSON/YAML data files for page content. These are one-off static pages, not CMS-driven. Keep copy inline in .astro files.
- **Client-side rendering for static content:** All page content should be server-rendered by Astro. No `client:load` directives needed for any Phase 2 components.
- **Overly granular components:** Do not create a separate component for every heading or paragraph. Extract components only when they are reused (PageHeader, CTASection, ServiceCard, ProcessTimeline).
- **Using max-w-4xl for full-width sections:** The existing placeholder pages use max-w-4xl. The new designs call for max-w-7xl for section containers to match the header width and allow fuller layouts.
- **Forgetting dark mode:** Every section must include dark: variants. The sapphire gradient hero, alternating backgrounds, and all text must handle dark mode. Use dark:bg-dark-bg, dark:bg-dark-surface, dark:text-dark-text as established.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive grid | Custom CSS grid from scratch | Tailwind grid/flex utilities | Already established pattern in project |
| Icon system | Icon library or sprite sheets | Inline SVGs | Established pattern -- Header/Footer already use inline SVGs |
| Dark mode toggle | Custom theme system | Existing .dark class + ThemeToggle | Already built in Phase 1 |
| Mobile menu | Custom hamburger logic | Existing Header component | Already handles mobile nav |
| Font loading | Custom font-face declarations | @fontsource-variable packages | Already set up in BaseLayout |

**Key insight:** Phase 1 already solved all infrastructure problems. Phase 2 should compose, not reinvent.

## Common Pitfalls

### Pitfall 1: Sticky Header Overlap with Full-Viewport Hero
**What goes wrong:** The sticky header (h-16, z-50) overlaps the hero section content, or hero doesn't account for header height, causing the hero to extend below the viewport fold.
**Why it happens:** The header is `sticky top-0` which stays in the normal document flow initially but the hero calculates 100vh without subtracting header height.
**How to avoid:** Use `min-h-[calc(100vh-4rem)]` for the hero section (4rem = h-16). The content after the hero will start exactly at the viewport bottom.
**Warning signs:** Hero CTA button is below the fold on standard laptop screens.

### Pitfall 2: Gradient Background in Dark Mode
**What goes wrong:** The sapphire gradient hero looks identical in light and dark mode, or the gradient clashes with the dark body background creating a jarring transition.
**Why it happens:** Gradients specified via inline `style` attributes cannot use Tailwind dark: variants.
**How to avoid:** Use a CSS class for the gradient and define both light and dark variants, OR accept that the sapphire gradient works in both modes (sapphire is already dark). The transition from hero to next section needs care -- ensure the first section after hero has appropriate dark:bg treatment.
**Warning signs:** Visual "flash" between hero and next section in dark mode.

### Pitfall 3: Arrow Connectors Breaking on Tablet
**What goes wrong:** The horizontal arrow connectors between pipeline cards work at desktop (md:) width but look broken at tablet sizes where cards are cramped.
**Why it happens:** Three cards + two arrow connectors in a row needs sufficient width.
**How to avoid:** Use responsive design: single column (stacked) on mobile, three columns on lg: breakpoint (not md:). At md: (tablet), either stack or use a 2+1 layout.
**Warning signs:** Cards appear too narrow at 768px-1024px widths.

### Pitfall 4: Inconsistent Section Widths
**What goes wrong:** Some sections use max-w-4xl (from placeholders), others use max-w-7xl, creating inconsistent content alignment.
**Why it happens:** Placeholder pages were built with max-w-4xl. New designs need wider containers.
**How to avoid:** Standardize on max-w-7xl for all section containers in Phase 2. Full-width background colors should extend edge-to-edge (no max-width on the section), with inner content constrained by max-w-7xl.
**Warning signs:** Content appears to "shift" width between sections.

### Pitfall 5: Missing Anchor IDs for Deep Linking
**What goes wrong:** Homepage service cards link to /services#audit but the Services page sections don't have matching id attributes.
**Why it happens:** Forgetting to add id="audit", id="implementation", id="training" to the service sections.
**How to avoid:** Add anchor IDs as the very first thing when building each service section. Test deep links from homepage.
**Warning signs:** Clicking "Learn more" on homepage goes to Services page but doesn't scroll to the right section.

### Pitfall 6: Founder Photo Placeholder Not Designed for Replacement
**What goes wrong:** The placeholder is built with fixed dimensions that don't match how a real photo would be inserted later.
**Why it happens:** Not thinking about the eventual replacement workflow.
**How to avoid:** Use a standard img tag pattern with a placeholder graphic. Include a comment showing the exact markup to swap in when the photo is ready. Use consistent sizing (e.g., w-48 h-48 rounded-full object-cover).
**Warning signs:** When the real photo is added, layout breaks or image is distorted.

## Code Examples

### Reusable PageHeader Component
```astro
---
interface Props {
  title: string;
  subtitle?: string;
}
const { title, subtitle } = Astro.props;
---
<section class="bg-sapphire py-16 px-6">
  <div class="max-w-7xl mx-auto">
    <h1 class="font-heading font-bold text-4xl md:text-5xl text-white mb-4">{title}</h1>
    {subtitle && (
      <p class="font-body text-lg text-white/80 max-w-2xl leading-relaxed">{subtitle}</p>
    )}
  </div>
</section>
```

### Reusable CTA Section
```astro
---
interface Props {
  headline?: string;
  buttonText?: string;
  buttonHref?: string;
}
const {
  headline = "Ready to get started?",
  buttonText = "Book a Discovery Call",
  buttonHref = "#book"
} = Astro.props;
---
<section class="bg-sapphire py-20 px-6 text-center">
  <div class="max-w-3xl mx-auto">
    <h2 class="font-heading font-bold text-3xl md:text-4xl text-white mb-8">{headline}</h2>
    <a
      href={buttonHref}
      class="inline-block bg-ember hover:bg-ember/90 text-white font-body font-semibold text-lg px-10 py-4 rounded-lg transition-colors"
    >
      {buttonText}
    </a>
  </div>
</section>
```

### Service Section with Timeline (Services Page)
```astro
---
interface Props {
  id: string;
  title: string;
  badge?: string;
  description: string;
  pricing: string;
  deliverables: string[];
  steps: string[];
  altBg?: boolean;
}
const { id, title, badge, description, pricing, deliverables, steps, altBg = false } = Astro.props;
---
<section id={id} class:list={["py-20 px-6", altBg ? "bg-sapphire-tint dark:bg-dark-surface" : ""]}>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center gap-3 mb-4">
      {badge && (
        <span class="bg-gold text-charcoal font-heading font-semibold text-sm px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
      <h2 class="font-heading font-bold text-3xl md:text-4xl text-sapphire dark:text-sapphire-tint">{title}</h2>
    </div>
    <p class="font-heading font-semibold text-xl text-gold mb-6">{pricing}</p>
    <p class="font-body text-lg text-charcoal/80 dark:text-dark-text/80 max-w-3xl mb-10 leading-relaxed">{description}</p>

    <!-- Deliverables -->
    <h3 class="font-heading font-semibold text-xl text-sapphire dark:text-sapphire-tint mb-4">What You Get</h3>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
      {deliverables.map(item => (
        <li class="flex items-start gap-2 font-body">
          <svg class="w-5 h-5 text-gold shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>

    <!-- Process Timeline -->
    <h3 class="font-heading font-semibold text-xl text-sapphire dark:text-sapphire-tint mb-6">What to Expect</h3>
    <!-- Timeline implementation here -->

    <!-- CTA -->
    <div class="mt-12">
      <a href="#book" class="inline-block bg-ember hover:bg-ember/90 text-white font-body font-semibold px-8 py-3 rounded-lg transition-colors">
        Get Started with {title}
      </a>
    </div>
  </div>
</section>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind config.js file | CSS-first @theme directive | Tailwind v4 (2025) | Already adopted -- tokens in global.css |
| @astrojs/tailwind integration | @tailwindcss/vite plugin | Tailwind v4 / Astro 5 | Already adopted in Phase 1 |
| class: conditional syntax | class:list directive | Astro 5.x | Use class:list={[...]} for conditional classes |

**Deprecated/outdated:**
- `@astrojs/tailwind` integration package: replaced by `@tailwindcss/vite` (already handled)
- `tailwind.config.js` / `tailwind.config.ts`: replaced by CSS-first `@theme` in global.css (already handled)

## Open Questions

1. **Founder photo availability**
   - What we know: CONTEXT.md says "Founder headshot/photo will be provided"
   - What's unclear: When the photo will be available, what format/resolution
   - Recommendation: Build with a styled placeholder div (circular, with person icon), include a comment showing the exact img tag to swap in. Does not block implementation.

2. **Exact business copy and credentials**
   - What we know: Claude drafts all copy based on PROJECT.md context. User reviews and tweaks after.
   - What's unclear: Founder's specific name, credentials, and personal story details
   - Recommendation: Draft compelling but generic copy that can be easily swapped. Use placeholder name if no founder name is in PROJECT.md. Focus on the AI/tech expertise angle as directed.

3. **Dark mode gradient treatment**
   - What we know: Homepage hero uses sapphire gradient (already dark). Other sections alternate ivory/sapphire-tint.
   - What's unclear: Whether the gradient should shift in dark mode or stay the same
   - Recommendation: Keep the sapphire gradient the same in both modes (it is already a dark color). Ensure sections after the hero transition smoothly to dark:bg-dark-bg.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Astro build (static output validation) |
| Config file | astro.config.mjs |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npm run preview` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| HOME-01 | Hero section renders with headline, subheadline, CTA | smoke | `npm run build` (build success) | N/A - static |
| HOME-02 | Pipeline cards render with 3 services and links | smoke | `npm run build` | N/A - static |
| HOME-03 | Pricing ranges visible on pipeline cards | manual-only | Visual inspection | N/A |
| HOME-04 | CTA buttons link to #book | manual-only | Visual inspection | N/A |
| SERV-01 | Audit section with #audit anchor, pricing, deliverables | smoke | `npm run build` | N/A - static |
| SERV-02 | Implementation section with #implementation anchor | smoke | `npm run build` | N/A - static |
| SERV-03 | Training section with #training anchor | smoke | `npm run build` | N/A - static |
| SERV-04 | Process timeline renders for each service | smoke | `npm run build` | N/A - static |
| ABOUT-01 | Founder section with photo placeholder and credentials | smoke | `npm run build` | N/A - static |
| ABOUT-02 | Mission section and values render | smoke | `npm run build` | N/A - static |

### Sampling Rate
- **Per task commit:** `npm run build` (validates all pages compile without errors)
- **Per wave merge:** `npm run build && npm run preview` (build + visual spot check)
- **Phase gate:** Full build green + manual visual review of all three pages in both light and dark mode

### Wave 0 Gaps
None -- existing build infrastructure covers all phase requirements. No test framework setup needed for static page content. The primary validation is successful `npm run build` (Astro will fail on syntax errors, missing imports, or broken component props) plus visual inspection.

## Sources

### Primary (HIGH confidence)
- Project codebase inspection: BaseLayout.astro, Header.astro, Footer.astro, global.css, package.json, existing placeholder pages
- .planning/phases/02-core-pages/02-CONTEXT.md -- all design decisions and constraints
- .planning/PROJECT.md -- business context, service descriptions, pricing

### Secondary (MEDIUM confidence)
- Astro component patterns (Props interface, class:list, slot) -- established in project codebase
- Tailwind v4 CSS-first patterns -- already implemented in global.css @theme

### Tertiary (LOW confidence)
- None -- this phase uses exclusively established project patterns with no new technology

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, everything already installed and proven in Phase 1
- Architecture: HIGH -- component patterns established in Phase 1, extending with same approach
- Pitfalls: HIGH -- based on direct inspection of existing code (sticky header, max-width inconsistency, dark mode patterns all observable)

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable -- no external dependencies or fast-moving APIs)
