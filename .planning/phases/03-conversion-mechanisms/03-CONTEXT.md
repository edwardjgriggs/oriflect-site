# Phase 3: Conversion Mechanisms - Context

**Gathered:** 2026-03-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Visitors can book a discovery call via Calendly or submit an inquiry through a contact form from anywhere on the site. This phase creates the contact page, integrates Calendly (popup sitewide + inline embed on contact page), wires all existing CTA buttons to Calendly, and connects the contact form to Web3Forms.

</domain>

<decisions>
## Implementation Decisions

### Contact page layout
- New `/contact` page with shared compact sapphire header banner (consistent with Services and About)
- Side-by-side layout: contact form on the left, inline Calendly scheduler embed on the right
- Stacks vertically on mobile (form first, then Calendly)
- Contact details (email, phone) and expected response time ("We respond within 24 hours") displayed on page
- FAQ section below the form/Calendly area with 2-3 common questions (What's a discovery call? How long does an audit take?)
- "Contact" added to main navigation bar as a text link (alongside Home, Services, About, Blog)
- "Contact" link also added to footer

### Form fields and validation
- Four fields: name, email, company, message (matches CONT-01 requirement exactly)
- Real-time inline validation — validate on blur, red border + error message below invalid fields
- Submit button disabled until all required fields are valid
- Honeypot field for anti-spam (Web3Forms native support, no CAPTCHA)
- Web3Forms API access key stored as environment variable (import.meta.env)

### Form submission behavior
- Inline success message replaces the form after successful submission
- Friendly confirmation: "Thanks! We'll be in touch within 24 hours."
- No page redirect — visitor stays on the contact page

### Calendly integration
- Popup widget triggered by all "Book a Discovery Call" CTA buttons across the site (replaces #book placeholder links)
- Inline embed on the contact page (right side of the side-by-side layout)
- Use placeholder Calendly URL for now — configurable constant or env variable to swap before launch
- Brand colors passed to Calendly customization: sapphire (#0A2463), ember (#E8651A), gold (#D4A843)

### CTA wiring strategy
- All "Book a Discovery Call" buttons (header, homepage, services, about) trigger Calendly popup — not page navigation
- Contact page is a separate nav destination for written inquiries
- Clear separation: CTA button = book a call, Contact page = send a message (with Calendly embed as bonus)

### Claude's Discretion
- FAQ content and exact wording
- Calendly embed height and responsive sizing
- Form field sizing and spacing
- Loading/submitting states during form submission
- Dark mode treatment for form and Calendly embed
- Contact details layout within the page

</decisions>

<specifics>
## Specific Ideas

- Side-by-side layout gives visitors both conversion paths at a glance — "message us" or "book directly"
- FAQ reduces friction for hesitant visitors who aren't sure what a discovery call involves
- Response time promise ("within 24 hours") builds trust and sets expectations

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- BaseLayout.astro: Layout with Header/Footer, accepts title and description props
- Header.astro: Fixed sapphire nav with mobile hamburger, ember CTA button — needs "Contact" nav link added
- Footer.astro: Sapphire footer with contact info and social links — needs "Contact" link added
- Shared compact sapphire header banner pattern (used by Services and About pages)
- Design tokens in global.css: sapphire, gold, ember, charcoal, ivory, sapphire-tint colors

### Established Patterns
- Tailwind v4 with CSS-first @theme config
- Inline SVG icons (no icon library)
- Dark mode via .dark class
- Alternating section backgrounds (ivory/sapphire-tint) from Phase 2
- All existing CTA buttons use: `bg-ember hover:bg-ember/90 text-white font-body font-medium`

### Integration Points
- All pages have `href="#book"` CTA links — need to be converted to Calendly popup triggers
- Header.astro has both desktop ("Book a Discovery Call") and mobile ("Book a Call") CTA buttons
- Nav currently: Home, Services, About, Blog — needs "Contact" added
- Footer needs "Contact" link added
- No contact.astro exists yet — new page creation required

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-conversion-mechanisms*
*Context gathered: 2026-03-09*
