# Roadmap: Oriflect

## Overview

Oriflect is a static marketing website for an AI consulting business targeting SMBs. The build progresses from project scaffold and design system, through the core conversion pages (homepage, services, about), to the interactive conversion mechanisms (contact form, Calendly booking), then blog infrastructure with seed content, and finally SEO polish and analytics. Each phase delivers a coherent, verifiable capability that builds on the previous one, culminating in a live site that converts visitors into discovery call bookings.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project scaffold, design system, responsive layout shell, and deployment pipeline (completed 2026-03-09)
- [ ] **Phase 2: Core Pages** - Homepage, services, and about pages with conversion-focused content
- [ ] **Phase 3: Conversion Mechanisms** - Contact form, Calendly booking widget, and site-wide CTA integration
- [ ] **Phase 4: Blog** - Blog infrastructure with content collections and 3-5 seed articles
- [ ] **Phase 5: SEO and Launch Polish** - Meta tags, sitemap, analytics, and performance optimization

## Phase Details

### Phase 1: Foundation
**Goal**: Visitors see a professional, responsive site shell with consistent navigation, branding, and fast load times on any device
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, SEO-04
**Success Criteria** (what must be TRUE):
  1. Site loads in a browser with header navigation, footer, and consistent branding (logo, colors, fonts) across all viewport sizes
  2. Navigation collapses to a hamburger menu on mobile and expands on desktop
  3. A persistent "Book a Discovery Call" CTA button is visible on every page without opening the mobile menu
  4. Footer displays contact information, social links, and legal page links
  5. Site is deployed and accessible via a public URL with HTTPS
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold Astro project with Tailwind v4 design system, fonts, dark mode, and placeholder pages
- [x] 01-02-PLAN.md — Build Header, Footer, navigation components and wire into layout

### Phase 2: Core Pages
**Goal**: Visitors can learn what Oriflect does, see specific service offerings with pricing, and understand who is behind the business
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, SERV-01, SERV-02, SERV-03, SERV-04, ABOUT-01, ABOUT-02
**Success Criteria** (what must be TRUE):
  1. Homepage hero communicates a clear, pain-focused value proposition above the fold with a primary CTA to book a discovery call
  2. Homepage shows the three-stage service pipeline (Audit, Implementation, Training) with pricing ranges visible
  3. Services page presents each service (Audit, Implementation, Training) with detailed descriptions, pricing, and a step-by-step process breakdown
  4. About page tells the founder/team story with credentials and explains why Oriflect exists
  5. All CTAs on these pages link to the booking/contact mechanism (functional integration comes in Phase 3)
**Plans**: 3 plans

Plans:
- [ ] 02-01-PLAN.md — Homepage with hero, service pipeline cards, differentiators, and conversion CTAs
- [ ] 02-02-PLAN.md — Services page with detailed descriptions, pricing, process timelines, and deliverables
- [ ] 02-03-PLAN.md — About page with founder story, company mission, core values, and CTA

### Phase 3: Conversion Mechanisms
**Goal**: Visitors can book a discovery call via Calendly or submit an inquiry through a contact form from anywhere on the site
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02
**Success Criteria** (what must be TRUE):
  1. Contact page displays a form that collects name, email, company, and message, and successfully submits to a backend service
  2. Calendly popup widget opens when the "Book a Discovery Call" CTA is clicked on any page
  3. Form submission shows a confirmation state so the visitor knows their message was received
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Blog
**Goal**: Visitors can browse and read thought leadership articles that demonstrate Oriflect's AI expertise
**Depends on**: Phase 1
**Requirements**: BLOG-01, BLOG-02, BLOG-03
**Success Criteria** (what must be TRUE):
  1. Blog listing page displays article cards with titles, dates, and excerpts
  2. Individual blog posts render with clean, readable typography and proper formatting
  3. At least 3 seed blog posts are published and accessible at launch
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: SEO and Launch Polish
**Goal**: The site is discoverable by search engines, tracks visitor behavior, and meets performance benchmarks for launch
**Depends on**: Phase 2, Phase 3, Phase 4
**Requirements**: SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):
  1. Every page has unique meta title, meta description, and Open Graph tags that render correctly when shared on social media
  2. Sitemap.xml and robots.txt are generated and accessible at the site root
  3. Analytics tracks page views and conversion events (CTA clicks, form submissions, Calendly opens)
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5
Note: Phase 4 (Blog) depends only on Phase 1 and could run in parallel with Phases 2-3 if desired.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete    | 2026-03-09 |
| 2. Core Pages | 2/3 | In Progress|  |
| 3. Conversion Mechanisms | 0/1 | Not started | - |
| 4. Blog | 0/2 | Not started | - |
| 5. SEO and Launch Polish | 0/1 | Not started | - |
