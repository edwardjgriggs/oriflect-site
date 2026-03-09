# Project Research Summary

**Project:** Oriflect AI Consulting Website
**Domain:** B2B consulting marketing site (static, conversion-focused)
**Researched:** 2026-03-09
**Confidence:** HIGH

## Executive Summary

Oriflect needs a static marketing website that converts SMB decision-makers into discovery call bookings. This is a well-understood problem space: a content-driven brochure site with two interactive elements (Calendly booking widget and contact form) and a blog for long-term SEO. The expert approach is a zero-JavaScript-by-default static site generator with islands architecture for the two interactive widgets, deployed to a CDN. Astro 5.x is the clear winner for this use case -- it ships no JS by default, has first-class content collections for the blog, and is now backed by Cloudflare. Paired with Tailwind CSS 4.x for styling and Cloudflare Pages for hosting, the entire stack is free-tier friendly with zero backend infrastructure to maintain.

The primary risk is not technical -- it is messaging. The top pitfalls all center on copy and content: writing self-centered instead of pain-focused copy, using jargon that confuses SMB buyers, burying CTAs, and launching with no social proof or pricing transparency. These are the conversion killers that determine whether the site generates calls or sits idle. The technical build is straightforward with well-documented patterns, but the content strategy (especially the blog launch content and value proposition copy) must be treated as first-class deliverables, not afterthoughts.

The recommended approach is to nail the messaging and design system first, then build pages in dependency order (layout shell, homepage, services, contact, about, blog), treating content creation as a parallel workstream rather than a follow-up task. Transparent pricing on the services page is the single biggest competitive differentiator against other AI consulting sites. The architecture is intentionally simple -- no CMS, no auth, no server-side logic -- and should stay that way for v1.

## Key Findings

### Recommended Stack

The stack is optimized for speed, simplicity, and zero ongoing infrastructure cost. Every technology was chosen to avoid unnecessary complexity for what is fundamentally a 5-7 page static site with a blog.

**Core technologies:**
- **Astro 5.x:** Static site framework -- ships zero JS by default, Content Collections for type-safe blog management, islands architecture for Calendly/form widgets. Now owned by Cloudflare.
- **Tailwind CSS 4.2:** Utility-first CSS -- 5x faster builds than v3, zero-config setup, precise control for the "McKinsey meets tech" aesthetic. Use `@tailwindcss/vite` plugin (NOT the old `@astrojs/tailwind`).
- **TypeScript 5.x:** Type safety -- first-class Astro support, catches blog frontmatter errors at build time.
- **Cloudflare Pages:** Hosting -- free tier with unlimited bandwidth, git-based deploys, automatic HTTPS, preview deployments on PRs.
- **Web3Forms:** Contact form backend -- free API, no server needed, 250 submissions/month on free tier.
- **@fontsource packages:** Self-hosted fonts -- eliminates render-blocking Google Fonts requests, better privacy and performance.

**Critical version note:** Astro 5 requires Node.js 20+. Tailwind v4 uses `@tailwindcss/vite`, not the legacy `@astrojs/tailwind` integration.

### Expected Features

**Must have (table stakes):**
- Clear value proposition above the fold with pain-focused copy
- Primary CTA: "Book a Discovery Call" via Calendly, accessible from every page
- Services page with defined outcomes and transparent pricing indicators
- About/Team page with credentials
- Contact form (3 fields max) with Web3Forms backend
- Mobile-responsive layout (50%+ of traffic comes from mobile via LinkedIn/email)
- SEO fundamentals: semantic HTML, meta tags, Open Graph, sitemap, structured data
- Blog infrastructure with 3-5 seed articles at launch
- Process visualization (3-4 step visual showing Discovery -> Audit -> Recommendations -> Implementation)

**Should have (differentiators):**
- Transparent pricing indicators on services page -- the single biggest trust differentiator for SMB buyers
- Social proof scattered throughout pages (not siloed on a testimonials page)
- FAQ section addressing common objections
- Lead magnet with email capture (e.g., "AI Readiness Checklist" PDF)
- GEO-optimized content for AI search engine citation

**Defer (v2+):**
- Case studies page (no completed engagements yet)
- AI chatbot (complexity vs. value does not justify it for a small firm)
- Industry-specific landing pages (wait for niche patterns to emerge from clients)
- Client portal / login system (out of scope for a marketing site)
- Multi-language support

### Architecture Approach

The architecture is a four-layer static site: presentation (Astro pages, components, layouts, Markdown blog), build (Astro SSG + Vite), integration (Calendly embed, Web3Forms, optional analytics), and hosting (Cloudflare Pages CDN). There is no server-side logic, no database, and no authentication. The only runtime data flows are the contact form POST to Web3Forms and the Calendly booking widget -- both handled entirely by third-party services.

**Major components:**
1. **BaseLayout + Nav/Header/Footer** -- shared page shell, global styles, meta tags. Everything renders inside this.
2. **Page components** -- route-based `.astro` files (Home, Services, About, Contact, Blog index).
3. **Section components** -- reusable blocks (Hero, ServiceCard, CTA, ProcessSteps) shared across pages.
4. **Content Collections** -- type-safe Markdown blog with schema-validated frontmatter.
5. **Integration islands** -- Calendly popup widget and ContactForm as the only JS-shipping components.

### Critical Pitfalls

1. **Self-centered copy** -- Lead with the visitor's pain, not Oriflect's capabilities. Apply the "So what?" test to every headline. If the hero starts with "We" or "Oriflect," it is wrong.
2. **Vague/jargon value proposition** -- Write at a 6th-grade reading level. Use concrete numbers: "cut response time from 4 hours to 4 minutes." Ban words like "solutions," "leverage," "transform."
3. **Weak or buried CTAs** -- Place a CTA in every scroll-depth section. Calendly booking is PRIMARY (filled button), contact form is SECONDARY (ghost button). Keep booking CTA visible on mobile without opening hamburger menu.
4. **No social proof at launch** -- Include founder credentials, process descriptions, and specific methodology numbers even without case studies. Design placeholder sections for testimonials from day one.
5. **Pricing opacity** -- Show starting prices or ranges on the services page. SMB buyers comparison-shop like consumers. This is a competitive advantage, not a vulnerability.
6. **Empty blog** -- Either launch with 3-5 substantive posts or remove the blog from v1 entirely. An empty or near-empty blog hurts credibility.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation (Project Scaffold + Design System)
**Rationale:** Everything depends on the layout shell, global styles, and design tokens. The Astro project structure, Tailwind configuration, typography, color palette, and component patterns must be established before any page can be built. This phase also sets up deployment pipeline (Cloudflare Pages) so every subsequent phase can be previewed.
**Delivers:** Working Astro project with BaseLayout (header, footer, nav), global styles, responsive breakpoints, Tailwind config, font setup, deployment to Cloudflare Pages, and a design system of reusable components (buttons, cards, section containers).
**Addresses:** Mobile-responsive layout, professional visual design, fast page loads, SSL/HTTPS.
**Avoids:** Poor mobile experience pitfall (by going mobile-first from the start), performance traps (by configuring image optimization and font loading correctly from day one).

### Phase 2: Core Pages (Homepage + Services + About)
**Rationale:** These three pages form the conversion funnel's content foundation. The homepage defines the visual vocabulary (hero, CTA patterns, service cards, process steps) that all other pages reuse. Services and About pages are the primary trust-building content. Copy must be written BEFORE this phase -- layout follows messaging hierarchy.
**Delivers:** Homepage with value proposition, process visualization, social proof placeholders, and CTA sections. Services page with outcome-focused descriptions, pricing indicators, and per-service CTAs. About page with team credentials.
**Addresses:** Value proposition, services with pricing, about/team page, process visualization, social proof areas.
**Avoids:** Self-centered copy (by requiring copy review before build), vague value proposition (by enforcing the "bar test"), pricing opacity (by including price ranges).

### Phase 3: Conversion Mechanisms (Contact + Calendly + Forms)
**Rationale:** The contact page introduces the only external integrations (Web3Forms and Calendly). These are the conversion endpoints the entire site funnels toward. Building them as a focused phase allows proper integration testing, mobile testing of the Calendly embed, and form submission verification.
**Delivers:** Contact page with Web3Forms contact form and Calendly popup widget. Calendly widget accessible as a persistent CTA across all pages. Form spam protection (honeypot fields). Confirmation/thank-you states.
**Addresses:** Contact form, Calendly booking embed, dual CTA hierarchy.
**Avoids:** Calendly iframe issues (use popup widget, not inline embed), form without spam protection, weak CTAs (by establishing CTA hierarchy site-wide).

### Phase 4: Blog Infrastructure + Content
**Rationale:** The blog is architecturally independent from the core pages -- no other pages depend on it, and it has no dependencies beyond the base layout. Building it last avoids the pitfall of shipping an empty blog. Content should be written in parallel with earlier phases so posts are ready when the infrastructure is.
**Delivers:** Content Collections schema, blog listing page, individual post template, RSS feed, sitemap generation via @astrojs/sitemap. 3-5 launch articles covering awareness and consideration topics.
**Addresses:** Blog infrastructure, seed blog content, SEO fundamentals (sitemap, structured data).
**Avoids:** Empty blog pitfall (by requiring content readiness as a gate), overengineered blog (start with date-sorted listing only, no tags/categories until 10+ posts).

### Phase 5: SEO, Analytics, and Launch Polish
**Rationale:** Final polish phase ensures nothing from the "looks done but isn't" checklist is missed. SEO meta tags, Open Graph images, analytics setup, 404 page, Lighthouse audit, and cross-device testing. This is a verification phase, not a feature phase.
**Delivers:** Unique meta tags per page, Open Graph images, structured data (ProfessionalService schema), analytics with conversion event tracking, custom 404 page, Lighthouse score above 90 on mobile.
**Addresses:** SEO fundamentals, analytics setup, GEO optimization foundations.
**Avoids:** Missing meta tags, no analytics tracking, missing conversion events, untested mobile experience.

### Phase Ordering Rationale

- **Foundation first** because every component renders inside the layout shell and uses the design system. Getting deployment working early means every phase produces a reviewable preview.
- **Core pages before conversion mechanisms** because the CTA patterns, messaging, and visual hierarchy must exist before integrating the booking and form endpoints they funnel toward.
- **Blog last among features** because it is fully independent and the biggest risk is launching it empty. Deferring the build while writing content in parallel avoids this.
- **Polish last** because SEO, analytics, and QA work is most efficient when all content and pages are in place.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Conversion Mechanisms):** Calendly embed has documented gotchas (popup vs. inline, mobile sizing, UTM passthrough). Web3Forms integration needs API key setup and confirmation flow design. Worth a focused research pass.
- **Phase 4 (Blog):** Content Collections schema design and dynamic routing (`[...slug].astro`) have specific Astro 5.x patterns. Research the exact Content Collections API if the team is unfamiliar with Astro.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Astro project scaffold, Tailwind setup, and Cloudflare Pages deployment are extremely well-documented with official guides.
- **Phase 2 (Core Pages):** Standard static page builds with Astro components. No novel patterns.
- **Phase 5 (Polish):** SEO meta tags, sitemap, analytics are commodity tasks with established checklists.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommendations from official documentation and verified release notes. Astro 5.x, Tailwind 4.2, Cloudflare Pages are all production-stable with extensive docs. |
| Features | HIGH | Feature landscape grounded in B2B conversion research, competitor analysis, and consulting-specific best practices from multiple sources. |
| Architecture | HIGH | Standard static site architecture with well-established patterns. Astro's project structure and Content Collections are thoroughly documented. |
| Pitfalls | HIGH | Pitfalls drawn from B2B CRO research, consulting website best practices, and documented integration issues. Actionable prevention strategies provided. |

**Overall confidence:** HIGH

### Gaps to Address

- **Copy and content readiness:** Research identifies messaging as the top risk, but no copy exists yet. Value proposition, service descriptions, pricing language, and blog articles must be written before or during early phases. This is a content gap, not a technical gap.
- **Brand assets:** Logo, color palette, and font choices are not specified in the research. These must be decided before Phase 1 can finalize the design system.
- **Calendly account configuration:** The specific Calendly event type, availability settings, and UTM tracking setup need to be configured outside the website build. This is an operational dependency.
- **Web3Forms API key:** Requires account signup and key generation before the contact form can be tested. Minor but must happen before Phase 3.
- **Analytics choice:** Research suggests Cloudflare Web Analytics (free, no cookie banner) or Plausible (paid, more features). This decision affects Phase 5 implementation.
- **Social proof content:** Even minimal testimonials or endorsements need to be sourced from the founder's network before Phase 2 builds the homepage.

## Sources

### Primary (HIGH confidence)
- [Astro official site](https://astro.build/) -- framework capabilities, Cloudflare acquisition
- [Astro GitHub releases](https://github.com/withastro/astro/releases) -- version confirmation
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- v4 features and migration
- [Cloudflare Pages](https://pages.cloudflare.com/) -- hosting capabilities and free tier
- [Web3Forms Astro guide](https://web3forms.com/platforms/astro-contact-form) -- form integration
- [Astro Content Collections docs](https://docs.astro.build/en/guides/markdown-content/) -- blog architecture
- [Calendly Embed Options](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview) -- widget integration patterns

### Secondary (MEDIUM confidence)
- [B2B Website Best Practices 2026](https://websmitherz.com/business-solutions-performance/b2b-website-best-practices-2026/) -- conversion patterns
- [Consulting Success: Client-Generating Website](https://www.consultingsuccess.com/consulting-website) -- consulting-specific strategy
- [Directive Consulting: B2B CRO Playbook](https://directiveconsulting.com/blog/blog-b2b-conversion-rate-optimization-guide/) -- CRO best practices
- [Cieden: AI Consulting Firms for Small Businesses](https://cieden.com/ai-consulting-firms-for-small-businesses) -- competitor landscape

---
*Research completed: 2026-03-09*
*Ready for roadmap: yes*
