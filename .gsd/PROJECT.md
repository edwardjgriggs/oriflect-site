# Project

## What This Is

Oriflect is a marketing website for an AI consulting firm targeting small and medium businesses. The site is built with Astro + Tailwind CSS v4 and deployed to GitHub (oriflect-site). It has five main pages — Home, Services, About, Blog, and Contact — plus a shared header, footer, and base layout.

## Core Value

The site must clearly communicate Oriflect's three services (AI Discovery Audit, AI Implementation, Staff Training) and drive visitors to book a discovery call via Calendly.

## Current State

- Home page: full hero, service pipeline cards, "Why Oriflect" section, CTA
- Services page: full three-service layout with timelines, deliverables, CTAs
- About page: real content — Edward Griggs, real bio, real headshot (`/founder.png`)
- Blog page: real post listing at `/blog` + individual post pages at `/blog/[slug]` — Astro 5 Content Layer, one authored post
- Contact page: Web3Forms contact form + Calendly inline embed + FAQ
- Header: sticky nav with desktop + mobile responsive menu and theme toggle
- Footer: brand, contact info, social links
- Dark mode: fully wired via localStorage + CSS variable theme
- Calendly: popup on all CTAs, inline embed on Contact page
- GitHub remote: https://github.com/edwardjgriggs/oriflect-site.git (main branch)

## Architecture / Key Patterns

- Astro 5 with TypeScript
- Tailwind CSS v4 (CSS-first config via `@theme` in global.css)
- `BaseLayout.astro` wraps all pages — handles fonts, dark mode init, Calendly assets
- Component pattern: `Header.astro`, `Footer.astro`, `Logo.astro`, `ThemeToggle.astro`
- No CMS — content is inline in `.astro` files; blog posts will use Astro content collections
- Brand colors defined as CSS variables: sapphire, gold, ember, charcoal, ivory, dark-bg, etc.
- Font stack: Montserrat (heading), Inter (body), Playfair Display (accent), JetBrains Mono (code)

## Capability Contract

See `.gsd/REQUIREMENTS.md` for the explicit capability contract, requirement status, and coverage mapping.

## Milestone Sequence

- [x] M001: Site Enhancement v1 — S01 ✅, S02 ✅, S03 ✅ all complete; squash-merge S03 → main pending
