# Project

## What This Is

Oriflect is a marketing website for an AI consulting firm targeting small and medium businesses. The site is built with Astro + Tailwind CSS v4 and deployed to GitHub (oriflect-site). It has five main pages — Home, Services, About, Blog, and Contact — plus a shared header, footer, and base layout.

## Core Value

The site must clearly communicate Oriflect's three services (AI Discovery Audit, AI Implementation, Staff Training) and drive visitors to book a discovery call via Calendly.

## Current State

- Home page: animated hero with AI-themed floating nodes, service pipeline with pulsing connectors, animated metrics counters, before/after results showcase, rotating testimonials, featured blog posts, CTA — all with scroll-reveal animations
- Services page: full three-service layout with timelines, deliverables, CTAs, scroll-reveal animations
- About page: real content — Edward Griggs, real bio, real headshot (`/founder.png`), scroll-reveal animations
- Blog page: content collection listing with scroll-reveal animations
- Contact page: Web3Forms contact form + Calendly inline embed + FAQ, scroll-reveal animations
- Header: sticky nav with desktop + mobile responsive menu and theme toggle (view-transition safe)
- Footer: brand, contact info, social links
- Dark mode: fully wired via localStorage + CSS variable theme, persists across view transitions
- View Transitions: smooth cross-fade navigation between all pages via Astro ClientRouter
- Micro-interactions: focus-visible rings, active press feedback on all interactive elements
- Accessibility: prefers-reduced-motion disables/reduces all animations site-wide
- Calendly: popup on all CTAs, inline embed on Contact page
- GitHub remote: https://github.com/edwardjgriggs/oriflect-site.git (main branch)

## Architecture / Key Patterns

- Astro 5 with TypeScript
- Tailwind CSS v4 (CSS-first config via `@theme` in global.css)
- `BaseLayout.astro` wraps all pages — handles fonts, dark mode init, Calendly assets, ClientRouter view transitions
- Component pattern: `Header.astro`, `Footer.astro`, `Logo.astro`, `ThemeToggle.astro`, `ScrollReveal.astro`, `MetricsCounter.astro`, `HeroAnimation.astro`, `ResultsShowcase.astro`, `Testimonials.astro`, `FeaturedPosts.astro`
- Interactive scripts use `astro:page-load` for re-initialization after view transitions
- `astro:after-swap` used for pre-paint DOM state (dark mode, menu close)
- No CMS — content is inline in `.astro` files; blog posts use Astro content collections
- Brand colors defined as CSS variables: sapphire, gold, ember, charcoal, ivory, dark-bg, etc.
- Font stack: Montserrat (heading), Inter (body), Playfair Display (accent), JetBrains Mono (code)

## Capability Contract

See `.gsd/REQUIREMENTS.md` for the explicit capability contract, requirement status, and coverage mapping.

## Milestone Sequence

- ✅ M001: Site Enhancement v1
- ✅ M002: Site Enhancement v2 — Kinetic & Polished
