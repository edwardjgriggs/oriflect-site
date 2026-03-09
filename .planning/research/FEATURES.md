# Feature Research

**Domain:** AI Consulting Company Website (B2B, SMB-focused, conversion-oriented)
**Researched:** 2026-03-09
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features SMB decision-makers assume exist. Missing these and the site feels amateur or untrustworthy, and the visitor bounces.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear value proposition above the fold | Visitors decide in 3-5 seconds whether to stay. SMB buyers are time-poor and need to instantly understand "what do you do and why should I care." | LOW | One headline, one subhead, one CTA. No jargon. Speak to the pain ("struggling to adopt AI?") not the solution ("we offer consulting"). |
| Primary CTA: Book a Discovery Call | Every consulting site funnels to a conversation. Without a prominent booking CTA, there is no conversion mechanism. | LOW | Calendly embed or similar. Must be accessible from every page, not buried on a contact page. |
| Services page with defined outcomes | SMB buyers need to understand what they are buying and what results to expect. Vague "we do AI" pages do not convert. | MEDIUM | Each service tier (Audit, Implementation, Training) gets its own section or page. Lead with outcomes ("reduce manual data entry by 60%"), not process descriptions. |
| About/Team page | B2B buyers are buying people, not products. They need to see who they will work with and why those people are credible. | LOW | Photo, short bio, relevant credentials. For a small firm, authenticity beats corporate polish. |
| Mobile-responsive layout | 50%+ of initial visits come from mobile (LinkedIn clicks, email opens). Mobile conversion rates are already half of desktop -- a non-responsive site makes it worse. | LOW | Standard with any modern framework. Not a feature to build, just a constraint to enforce. |
| Contact form | Some visitors are not ready to book a call but want to ask a question or start a conversation at lower commitment. | LOW | Name, email, message. 3 fields maximum. Set response time expectation ("We reply within 24 hours"). |
| Fast page load (<2s) | Slow sites kill conversion. Every additional second of load time drops conversion by ~7%. Google also penalizes slow sites in search. | LOW | Static site architecture handles this by default. Optimize images, minimal JS. |
| SEO fundamentals | SMB buyers search "AI consulting for [industry]" or "how to use AI in my business." Without basic SEO, the site is invisible to organic traffic. | MEDIUM | Semantic HTML, meta tags, Open Graph, sitemap, structured data (LocalBusiness or ProfessionalService schema). Blog content feeds long-tail SEO over time. |
| SSL/HTTPS | Chrome flags non-HTTPS sites as "Not Secure." Instant trust killer for a consulting firm. | LOW | Default with any modern hosting (Vercel, Netlify, Cloudflare Pages). |
| Professional visual design | SMB buyers judge credibility by design quality. A consulting firm with a cheap-looking site signals cheap work. | MEDIUM | Clean, corporate-leaning but not sterile. Think whitespace, typography hierarchy, consistent brand colors. The "McKinsey meets tech startup" aesthetic from the project brief is the right target. |

### Differentiators (Competitive Advantage)

Features that separate Oriflect from the sea of generic AI consulting sites. These are where conversion rate moves from 3% to 8%+.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Transparent pricing indicators | Most consulting firms hide pricing entirely, forcing prospects to "contact us to learn more." SMB buyers hate this -- 70%+ will leave for a competitor who is upfront. Showing "starting at $500" or pricing tiers builds trust and pre-qualifies leads. | LOW | Does not need to be exact. "AI Discovery Audit: Starting at $500" with a note that final pricing depends on scope. This alone will differentiate from 90% of competitors. |
| Step-by-step process visualization | SMBs are intimidated by "AI consulting" because it feels like a black box. A clear 3-4 step process (Discovery Call -> Audit -> Recommendations -> Implementation) demystifies the engagement and reduces anxiety. | LOW | Visual timeline or numbered steps on the homepage and services page. Shows the buyer exactly what happens after they click "Book a Call." |
| Benefit-driven service framing with specificity | Instead of "We implement AI solutions," say "We automated invoice processing for a 50-person accounting firm, saving 20 hours/week." Specific, quantifiable outcomes in the language of SMB operations. | MEDIUM | Requires crafting compelling copy even without formal case studies. Use hypothetical but realistic scenarios: "Imagine cutting your email response time from 4 hours to 15 minutes." |
| Blog/Resources section with genuine thought leadership | Most AI consulting blogs are generic ChatGPT explainers. Publishing practical, opinionated content ("5 AI tools your 20-person marketing team should adopt this quarter") builds authority and drives organic traffic. | MEDIUM | 3-5 launch articles minimum. Focus on practical, actionable advice for SMBs, not academic AI theory. This is the long-term SEO engine. |
| Social proof scattered throughout (not siloed) | Testimonials, client logos, and results metrics placed contextually near CTAs and service descriptions, not hidden on a separate testimonials page nobody visits. | LOW | Even without formal case studies, pull quotes and "trusted by X companies" counters work. Can start with 2-3 testimonials and expand. Place near every CTA. |
| FAQ section addressing objections | SMB buyers have predictable objections: "Is this too expensive for my size?", "How long does it take?", "Do we need technical staff?", "What if AI is not right for us?" Answering these proactively removes friction. | LOW | 6-8 questions on the services page or a dedicated section. Each answer should end by reinforcing the CTA ("That is exactly what the Discovery Audit answers -- book yours today"). |
| Lead magnet / resource download | A free "AI Readiness Checklist" or "5 AI Quick Wins for SMBs" PDF in exchange for an email address captures visitors who are not ready to book a call but are interested. Builds an email nurture list. | MEDIUM | Requires creating the asset and setting up email capture (could be as simple as a Mailchimp or ConvertKit form). High ROI for a small effort. |
| GEO-optimized content (Generative Engine Optimization) | In 2026, SMB buyers increasingly ask ChatGPT/Perplexity "find me an AI consultant for my small business." Structured, entity-rich, statistically dense content makes the site more likely to be cited by AI search engines. | MEDIUM | Structured data markup, clear entity definitions, authoritative content with specific statistics. This is the new SEO and most competitors are not doing it yet. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but actively hurt a conversion-focused SMB consulting site.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| AI chatbot on the site | "We are an AI company, we should have AI on our site." | For a small consulting firm, a chatbot that gives wrong answers is worse than no chatbot. It adds complexity, maintenance burden, and can feel gimmicky. SMB visitors want to talk to a human, not a bot. The Calendly link IS the conversion mechanism. | Prominent "Book a Call" button. If async communication is needed, the contact form handles it. Add a chatbot later when there is enough FAQ data to train it properly. |
| Client portal / login system | "Clients need a place to track their project." | Out of scope for a marketing site. Adds massive complexity (auth, sessions, data storage) for zero conversion value. Clients are managed through existing tools (email, Notion, etc.). | Link to external project management tool if needed. Keep the website focused on one job: converting visitors to calls. |
| CMS backend (WordPress, Strapi, etc.) | "We need to easily update content." | For a site with 5-8 pages updated monthly at most, a CMS adds hosting complexity, security surface area, and slower performance. The "easy editing" promise becomes "now I need to maintain a database and admin panel." | Static site with content in markdown or code files. For blog posts, a simple git-based workflow or a headless CMS like Contentlayer if update frequency justifies it later. |
| Animated hero videos / heavy motion design | "It will look more impressive and modern." | Slows page load (the #1 conversion killer), distracts from the value proposition, and often looks dated within 6 months. SMB buyers want clarity, not spectacle. | Subtle CSS animations (fade-ins, hover states). One hero image maximum. Let the copy do the heavy lifting. |
| Multi-language support | "We want to reach international clients." | Doubles content creation and maintenance burden for a v1 site. Oriflect should nail one market first. | English only for v1. Add i18n infrastructure later if international demand materializes. |
| Comprehensive case studies page in v1 | "Social proof is critical." | No case study content exists yet. A empty or thin case studies page is worse than no page at all -- it signals the firm has no clients. | Use testimonial quotes, results metrics, and "engagement snapshots" scattered throughout the site. Add a dedicated case studies section in a future milestone when real content exists. |
| E-commerce / payment processing | "Let clients pay for the audit online." | Adds payment provider integration, tax handling, refund logic. The Discovery Audit is a consultative sale -- it benefits from a conversation first to qualify the lead and set expectations. | Keep the flow: Book Call -> Scope Engagement -> Invoice via Stripe/QuickBooks. The website's job ends at booking the call. |
| Newsletter signup without content strategy | "We should collect emails." | A signup form with no planned cadence or content leads to dead subscribers and potential spam complaints. Collecting emails you never use erodes trust. | Only add email capture when paired with a lead magnet and a commitment to at least monthly sends. The blog RSS feed can serve as a lightweight alternative. |

## Feature Dependencies

```
[Value Proposition Copy]
    |--required-by--> [Homepage]
    |--required-by--> [Services Page]
    |--required-by--> [SEO / Meta Tags]

[Brand Assets (logo, colors, fonts)]
    |--required-by--> [Visual Design System]
        |--required-by--> [All Pages]

[Calendly Account Setup]
    |--required-by--> [Booking Embed]
        |--enhances--> [Homepage CTA]
        |--enhances--> [Services Page CTA]
        |--enhances--> [Contact Page]

[Blog Infrastructure (routing, templates, markdown)]
    |--required-by--> [Blog Posts]
        |--enhances--> [SEO]
        |--enhances--> [Thought Leadership Credibility]

[Contact Form Backend (email delivery)]
    |--required-by--> [Contact Form]

[Service Descriptions + Pricing]
    |--required-by--> [Services Page]
    |--enhances--> [FAQ Section]

[Testimonial Content]
    |--enhances--> [Homepage Social Proof]
    |--enhances--> [Services Page Social Proof]
```

### Dependency Notes

- **Value Proposition Copy requires strategic work before development:** The copy is the highest-leverage element. Starting to code before the messaging is nailed means rework. Draft the headline, subhead, and service descriptions first.
- **Blog Infrastructure is independent of core pages:** Can be built in parallel or deferred to a second phase without blocking the main conversion funnel.
- **Contact Form Backend is a runtime dependency:** Needs a form submission handler (Formspree, Netlify Forms, or similar). Must be set up before the contact page is functional.
- **Testimonial Content enhances but does not block:** Pages work without testimonials. Add them as they become available. Design the layout to accommodate them from day one.

## MVP Definition

### Launch With (v1)

Minimum viable site -- what is needed to start converting visitors to discovery calls.

- [ ] Homepage with value proposition, process steps, social proof area, and primary CTA (Book a Discovery Call)
- [ ] Services page with three tiers (Audit, Implementation, Training), outcome-focused descriptions, and pricing indicators
- [ ] About page with team bio and company story
- [ ] Contact page with form and Calendly embed
- [ ] Blog infrastructure with 2-3 seed articles
- [ ] Site-wide responsive layout and consistent design system
- [ ] SEO fundamentals (meta tags, sitemap, structured data, Open Graph)
- [ ] Analytics (Plausible or simple GA4 setup to track conversions)

### Add After Validation (v1.x)

Features to add once the site is live and generating some traffic.

- [ ] FAQ section on services page -- add when you hear the same 5 questions from prospects repeatedly
- [ ] Lead magnet with email capture -- add when blog is generating consistent traffic (100+ monthly visitors)
- [ ] Testimonials and results metrics -- add as real client engagements complete
- [ ] Additional blog content (target: 2 posts/month) -- add once publishing cadence is sustainable
- [ ] GEO optimization (structured data enrichment, entity markup) -- add when organic/AI search traffic becomes a measurable channel

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] Case studies page with detailed engagement narratives -- defer until 3+ completed engagements with measurable results
- [ ] Resource library / downloadable tools -- defer until there is a content backlog to organize
- [ ] Industry-specific landing pages ("AI for accounting firms," "AI for marketing agencies") -- defer until niche specialization emerges from client patterns
- [ ] AI chatbot for pre-qualification -- defer until FAQ data is robust enough to train it and call volume justifies automation
- [ ] Client testimonial video embeds -- defer until video content exists

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Value proposition + homepage | HIGH | MEDIUM | P1 |
| Services page with pricing indicators | HIGH | MEDIUM | P1 |
| Calendly booking embed | HIGH | LOW | P1 |
| Contact form | HIGH | LOW | P1 |
| Mobile-responsive design | HIGH | LOW | P1 |
| About/Team page | MEDIUM | LOW | P1 |
| SEO fundamentals | HIGH | LOW | P1 |
| Blog infrastructure | MEDIUM | MEDIUM | P1 |
| Process visualization | MEDIUM | LOW | P1 |
| Analytics setup | HIGH | LOW | P1 |
| Seed blog content (2-3 articles) | MEDIUM | MEDIUM | P1 |
| FAQ section | MEDIUM | LOW | P2 |
| Lead magnet + email capture | MEDIUM | MEDIUM | P2 |
| Social proof / testimonials | HIGH | LOW (design) / HIGH (content) | P2 |
| GEO optimization | MEDIUM | MEDIUM | P2 |
| Case studies page | HIGH | HIGH (content) | P3 |
| Industry landing pages | MEDIUM | HIGH | P3 |
| AI chatbot | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch -- the site does not function as a conversion tool without these
- P2: Should have, add as content and traffic justify -- these amplify conversion but do not enable it
- P3: Nice to have, future consideration -- these require content or data that does not exist yet

## Competitor Feature Analysis

| Feature | Generic AI Consulting Sites | Enterprise Firms (IBM, Accenture) | SMB-Focused Firms (Opinosis, Xcelacore) | Oriflect Approach |
|---------|----------------------------|-----------------------------------|------------------------------------------|-------------------|
| Pricing visibility | Almost never shown | Never shown | Rarely shown | Show starting prices -- this is the single biggest differentiator for SMB trust |
| Process transparency | Vague "contact us" flow | Complex methodology pages | Sometimes shown | Clear 3-4 step visual process on homepage |
| Service specificity | Generic "AI solutions" | Enterprise jargon heavy | Moderate specificity | Hyper-specific to SMB operations with concrete examples |
| Booking friction | Contact form only, slow response | "Talk to sales" funnels | Mixed (form + some booking) | Dual path: Calendly for ready buyers, form for researchers |
| Blog/Content | Sparse or generic | Heavy content marketing | Moderate | Practical, opinionated, SMB-focused from launch |
| Social proof | Logos if enterprise clients exist | Major brand logos everywhere | Limited | Start with what exists, design for growth. Scattered placement, not siloed. |
| Mobile experience | Often poor | Professional but heavy | Variable | Mobile-first given LinkedIn/email traffic patterns |

## Sources

- [B2B Website Best Practices 2026](https://websmitherz.com/business-solutions-performance/b2b-website-best-practices-2026/) - B2B design and conversion patterns
- [Consulting Success: 10 Steps to Client-Generating Website](https://www.consultingsuccess.com/consulting-website) - Consulting-specific website strategy
- [Knapsack Creative: Consulting Service Page Design](https://knapsackcreative.com/blog-industry/consulting-service-page-design) - Service page conversion elements
- [Unbounce B2B Conversion Rate Benchmarks](https://unbounce.com/conversion-rate-optimization/b2b-conversion-rates/) - Conversion rate data
- [Directive Consulting: B2B CRO Playbook 2026](https://directiveconsulting.com/blog/blog-b2b-conversion-rate-optimization-guide/) - CRO best practices
- [First Page Sage: B2B CRO Best Practices](https://firstpagesage.com/seo-blog/b2b-conversion-rate-optimization-cro-best-practices-for-2025/) - Form optimization and trust signals
- [Cieden: AI Consulting Firms for Small Businesses 2026](https://cieden.com/ai-consulting-firms-for-small-businesses) - Competitor landscape
- [AI Journal: Top 10 AI Consulting Firms 2026](https://aijourn.com/top-10-ai-consulting-firms-helping-companies-scale-in-2026/) - Market landscape

---
*Feature research for: AI Consulting Company Website (Oriflect)*
*Researched: 2026-03-09*
