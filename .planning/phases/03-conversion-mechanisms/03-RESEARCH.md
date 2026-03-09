# Phase 3: Conversion Mechanisms - Research

**Researched:** 2026-03-09
**Domain:** Contact form (Web3Forms API) + Calendly scheduling embed/popup
**Confidence:** HIGH

## Summary

Phase 3 adds two conversion paths: a contact form powered by Web3Forms and Calendly scheduling integration (popup sitewide + inline embed on the contact page). The technical surface is small -- Web3Forms is a simple POST endpoint requiring zero backend, and Calendly provides a drop-in JavaScript widget. The main work is building the contact page layout, wiring the form with fetch-based submission and validation, loading Calendly's external script, and converting all existing `href="#book"` links to Calendly popup triggers.

There are 9 existing `href="#book"` links across 4 files (Header.astro has 2, index.astro has 2, services.astro has 4, about.astro has 1) that must all be converted to trigger `Calendly.initPopupWidget()`. The contact page itself is a new `src/pages/contact.astro` file following established patterns (BaseLayout, compact sapphire header banner, alternating sections).

**Primary recommendation:** Use vanilla JavaScript `fetch()` for Web3Forms submission (no libraries needed) and Calendly's official widget.js script loaded in BaseLayout for sitewide availability. Keep the Calendly URL and Web3Forms access key in `import.meta.env` public variables.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Contact page: side-by-side layout (form left, Calendly inline embed right), stacks vertically on mobile (form first)
- Shared compact sapphire header banner consistent with Services and About pages
- Four form fields: name, email, company, message
- Real-time inline validation on blur, red border + error message, submit disabled until valid
- Honeypot field for anti-spam (Web3Forms native, no CAPTCHA)
- Web3Forms API access key stored as environment variable (import.meta.env)
- Inline success message replaces the form (no redirect), "Thanks! We'll be in touch within 24 hours."
- Calendly popup triggered by ALL "Book a Discovery Call" CTA buttons (replaces #book links)
- Inline Calendly embed on contact page (right side)
- Placeholder Calendly URL, configurable constant or env variable
- Brand colors passed to Calendly: sapphire (#0A2463), ember (#E8651A), gold (#D4A843)
- "Contact" added to main nav and footer
- Contact details (email, phone) and response time promise displayed on page
- FAQ section with 2-3 questions below form/Calendly area

### Claude's Discretion
- FAQ content and exact wording
- Calendly embed height and responsive sizing
- Form field sizing and spacing
- Loading/submitting states during form submission
- Dark mode treatment for form and Calendly embed
- Contact details layout within the page

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Contact form collecting name, email, company, and message | Web3Forms API integration with fetch, honeypot anti-spam, inline validation, success state |
| CONT-02 | Calendly popup widget for direct call booking | Calendly widget.js loaded in BaseLayout, initPopupWidget for CTA buttons, initInlineWidget for contact page embed |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Web3Forms API | N/A (hosted) | Form submission backend | Zero-dependency, no server needed, free tier, native honeypot support |
| Calendly Widget | widget.js (hosted) | Scheduling embed + popup | Official Calendly embed solution, no npm package needed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Astro env (import.meta.env) | Built-in | Store API keys and Calendly URL | PUBLIC_ prefix for client-side access |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Web3Forms | Formspree, Netlify Forms | Web3Forms already decided; free, works on any host including Cloudflare Pages |
| Calendly widget.js | react-calendly npm | Unnecessary dependency; vanilla widget.js works perfectly with Astro |

**Installation:**
No npm packages to install. Both Web3Forms and Calendly are external services loaded via API calls / script tags.

## Architecture Patterns

### Recommended Project Structure
```
src/
  pages/
    contact.astro          # New contact page
  components/
    Header.astro           # Modified: add Contact nav link + Calendly popup onclick
    Footer.astro           # Modified: add Contact link
  layouts/
    BaseLayout.astro       # Modified: add Calendly script/CSS in <head>
```

### Pattern 1: Web3Forms Fetch Submission
**What:** Client-side form submission using fetch API to Web3Forms endpoint
**When to use:** Contact form submission
**Example:**
```javascript
// Source: Web3Forms official docs + Astro integration guide
const form = document.getElementById('contact-form');
const resultEl = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: json,
    });
    const data = await response.json();
    if (data.success) {
      // Replace form with success message
      form.classList.add('hidden');
      resultEl.classList.remove('hidden');
    } else {
      // Show error inline
      console.error('Submission error:', data);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  } catch (error) {
    console.error('Network error:', error);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});
```

### Pattern 2: Web3Forms Honeypot Anti-Spam
**What:** Hidden checkbox field that bots fill but humans don't
**When to use:** Every Web3Forms form
**Example:**
```html
<!-- Source: Web3Forms docs - honeypot field -->
<input type="hidden" name="access_key" value={import.meta.env.PUBLIC_WEB3FORMS_KEY} />
<input type="checkbox" name="botcheck" class="hidden" style="display: none;" />
```

### Pattern 3: Calendly Popup Widget (for CTA buttons)
**What:** Opens Calendly scheduler in a modal overlay
**When to use:** All "Book a Discovery Call" buttons sitewide
**Example:**
```html
<!-- Load in BaseLayout <head> -->
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>

<!-- Button onclick -->
<button onclick="Calendly.initPopupWidget({url: 'https://calendly.com/PLACEHOLDER', color: '#E8651A', textColor: '#0A2463'}); return false;">
  Book a Discovery Call
</button>
```

### Pattern 4: Calendly Inline Embed (for contact page)
**What:** Renders Calendly scheduler directly in a container
**When to use:** Contact page right column
**Example:**
```html
<div id="calendly-inline" class="min-h-[650px]"></div>
<script is:inline>
  window.addEventListener('load', function() {
    Calendly.initInlineWidget({
      url: 'https://calendly.com/PLACEHOLDER',
      parentElement: document.getElementById('calendly-inline'),
      prefill: {},
      utm: {}
    });
  });
</script>
```

### Pattern 5: CTA Button Conversion (href="#book" to Calendly)
**What:** Replace anchor links with onclick Calendly popup triggers
**When to use:** All 9 existing CTA buttons across the site
**Example:**
```html
<!-- BEFORE (current pattern) -->
<a href="#book" class="bg-ember hover:bg-ember/90 text-white ...">
  Book a Discovery Call
</a>

<!-- AFTER -->
<a href="#book" onclick="Calendly.initPopupWidget({url: 'https://calendly.com/PLACEHOLDER'}); return false;" class="bg-ember hover:bg-ember/90 text-white ...">
  Book a Discovery Call
</a>
```
Note: Keep `href="#book"` as fallback for no-JS, but `return false` prevents navigation.

### Anti-Patterns to Avoid
- **Installing npm packages for Calendly or Web3Forms:** Both services provide hosted scripts/APIs. Adding npm dependencies adds bundle weight and maintenance burden for zero benefit.
- **Using form action POST (full page submit):** This causes a page redirect. Use fetch API for seamless inline submission/success state.
- **Hardcoding API keys in source:** Use `import.meta.env.PUBLIC_WEB3FORMS_KEY` and `import.meta.env.PUBLIC_CALENDLY_URL` to keep values configurable.
- **Loading Calendly script only on contact page:** The popup widget is needed sitewide (all CTA buttons), so load in BaseLayout head.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form submission backend | Custom API endpoint | Web3Forms API | Handles email delivery, spam filtering, rate limiting |
| Anti-spam | Custom CAPTCHA | Web3Forms honeypot field | Invisible to users, no friction, built-in |
| Scheduling UI | Custom calendar picker | Calendly embed | Handles timezone, availability, confirmations, reminders |
| Form validation | Custom validation library | Native HTML5 + vanilla JS on blur | 4 simple fields don't warrant a library |

**Key insight:** Both Web3Forms and Calendly are hosted services that eliminate all backend complexity. The entire phase is client-side HTML/JS with no server code needed.

## Common Pitfalls

### Pitfall 1: Calendly Script Not Loaded When Button Clicked
**What goes wrong:** User clicks CTA button before Calendly widget.js finishes loading, causing `Calendly is not defined` error.
**Why it happens:** The script is loaded async and may not be ready on fast clicks.
**How to avoid:** Add the `async` attribute to the script tag (already non-blocking) and guard the onclick: `if (typeof Calendly !== 'undefined') Calendly.initPopupWidget({...})`. Or, wrap in a helper function that checks availability.
**Warning signs:** Console errors on first page load with fast CTA clicks.

### Pitfall 2: Web3Forms Access Key as Secret vs Public
**What goes wrong:** Developer treats the access key as a secret and doesn't expose it client-side.
**Why it happens:** Instinct to hide API keys. Web3Forms access key is explicitly a PUBLIC key designed to be in client HTML.
**How to avoid:** Use `PUBLIC_WEB3FORMS_KEY` env var prefix (Astro requires PUBLIC_ prefix for client-side env vars). The key is meant to be visible in source.
**Warning signs:** Form fails because env var is undefined client-side (missing PUBLIC_ prefix).

### Pitfall 3: Astro Environment Variable Prefix
**What goes wrong:** Environment variables without `PUBLIC_` prefix are undefined on the client.
**Why it happens:** Astro (like Vite) only exposes env vars prefixed with `PUBLIC_` to client-side code.
**How to avoid:** Name variables `PUBLIC_WEB3FORMS_KEY` and `PUBLIC_CALENDLY_URL` in `.env` file.
**Warning signs:** `import.meta.env.WEB3FORMS_KEY` returns `undefined` in browser.

### Pitfall 4: Calendly Inline Embed Height
**What goes wrong:** Inline embed appears cut off or has a tiny height.
**Why it happens:** The inline widget needs explicit height on its parent container.
**How to avoid:** Set `min-h-[650px]` or similar on the parent div. The Calendly iframe needs room.
**Warning signs:** Embed shows but is squished or has scrollbars within a small box.

### Pitfall 5: Form Validation UX - Premature Validation
**What goes wrong:** Error messages flash on page load or on empty fields before user types.
**Why it happens:** Validating on input event instead of on blur, or initializing validation state as invalid.
**How to avoid:** Only validate on blur (after user leaves field). Track "touched" state per field. Don't show errors until field has been visited.
**Warning signs:** Red borders appear on first page render.

### Pitfall 6: Dark Mode for Calendly Embed
**What goes wrong:** Calendly embed has white background that clashes with dark mode.
**Why it happens:** Calendly iframe content is controlled by Calendly, not your CSS.
**How to avoid:** Accept the Calendly embed will have its own styling. Can pass `backgroundColor` parameter to `initInlineWidget` but options are limited. Consider wrapping in a border/card that transitions cleanly.
**Warning signs:** Bright white iframe box in otherwise dark page.

## Code Examples

### Complete Form HTML Structure
```html
<!-- Source: Web3Forms docs + CONTEXT.md field requirements -->
<form id="contact-form" class="space-y-6">
  <input type="hidden" name="access_key" value={import.meta.env.PUBLIC_WEB3FORMS_KEY} />
  <input type="hidden" name="subject" value="New Inquiry from Oriflect Website" />
  <input type="checkbox" name="botcheck" class="hidden" style="display: none;" />

  <div>
    <label for="name" class="block font-body font-medium text-charcoal dark:text-dark-text mb-1">Name</label>
    <input type="text" name="name" id="name" required
      class="w-full px-4 py-3 rounded-lg border border-charcoal/20 dark:border-dark-text/20 bg-white dark:bg-dark-surface font-body focus:ring-2 focus:ring-sapphire focus:border-sapphire outline-none" />
    <p class="text-red-500 text-sm mt-1 hidden" data-error="name">Please enter your name.</p>
  </div>

  <div>
    <label for="email" class="block font-body font-medium text-charcoal dark:text-dark-text mb-1">Email</label>
    <input type="email" name="email" id="email" required
      class="w-full px-4 py-3 rounded-lg border border-charcoal/20 dark:border-dark-text/20 bg-white dark:bg-dark-surface font-body focus:ring-2 focus:ring-sapphire focus:border-sapphire outline-none" />
    <p class="text-red-500 text-sm mt-1 hidden" data-error="email">Please enter a valid email address.</p>
  </div>

  <div>
    <label for="company" class="block font-body font-medium text-charcoal dark:text-dark-text mb-1">Company</label>
    <input type="text" name="company" id="company" required
      class="w-full px-4 py-3 rounded-lg border border-charcoal/20 dark:border-dark-text/20 bg-white dark:bg-dark-surface font-body focus:ring-2 focus:ring-sapphire focus:border-sapphire outline-none" />
    <p class="text-red-500 text-sm mt-1 hidden" data-error="company">Please enter your company name.</p>
  </div>

  <div>
    <label for="message" class="block font-body font-medium text-charcoal dark:text-dark-text mb-1">Message</label>
    <textarea name="message" id="message" rows="4" required
      class="w-full px-4 py-3 rounded-lg border border-charcoal/20 dark:border-dark-text/20 bg-white dark:bg-dark-surface font-body focus:ring-2 focus:ring-sapphire focus:border-sapphire outline-none resize-y"></textarea>
    <p class="text-red-500 text-sm mt-1 hidden" data-error="message">Please enter a message.</p>
  </div>

  <button type="submit" disabled
    class="w-full bg-ember hover:bg-ember/90 text-white font-body font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
    Send Message
  </button>
</form>

<!-- Success state (hidden by default) -->
<div id="form-success" class="hidden text-center py-12">
  <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
  <h3 class="font-heading text-2xl font-bold mt-4 text-sapphire dark:text-sapphire-tint">Message Sent!</h3>
  <p class="font-body text-charcoal/70 dark:text-dark-text/70 mt-2">Thanks! We'll be in touch within 24 hours.</p>
</div>
```

### Inline Validation Script
```javascript
// Source: Vanilla JS blur validation pattern
(function() {
  const form = document.getElementById('contact-form');
  const fields = form.querySelectorAll('input[required], textarea[required]');
  const submitBtn = form.querySelector('button[type="submit"]');
  const touched = new Set();

  function validateField(field) {
    const errorEl = form.querySelector(`[data-error="${field.name}"]`);
    let valid = field.validity.valid;

    if (touched.has(field.name)) {
      if (valid) {
        field.classList.remove('border-red-500');
        field.classList.add('border-charcoal/20');
        errorEl?.classList.add('hidden');
      } else {
        field.classList.add('border-red-500');
        field.classList.remove('border-charcoal/20');
        errorEl?.classList.remove('hidden');
      }
    }
    return valid;
  }

  function checkFormValidity() {
    const allValid = Array.from(fields).every(f => f.validity.valid);
    submitBtn.disabled = !allValid;
  }

  fields.forEach(field => {
    field.addEventListener('blur', () => {
      touched.add(field.name);
      validateField(field);
      checkFormValidity();
    });
    field.addEventListener('input', () => {
      if (touched.has(field.name)) {
        validateField(field);
      }
      checkFormValidity();
    });
  });
})();
```

### Calendly Helper Function (sitewide)
```javascript
// Source: Calendly widget.js API
function openCalendly() {
  if (typeof Calendly !== 'undefined') {
    Calendly.initPopupWidget({
      url: 'https://calendly.com/PLACEHOLDER'
    });
  }
  return false;
}
```

### Environment Variables (.env file)
```bash
# Web3Forms - public key (safe for client-side)
PUBLIC_WEB3FORMS_KEY=your_access_key_here

# Calendly - scheduling page URL (placeholder until account ready)
PUBLIC_CALENDLY_URL=https://calendly.com/oriflect/discovery-call
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Server-side form handlers | Client-side API services (Web3Forms, Formspree) | ~2020+ | No backend needed for static sites |
| reCAPTCHA for spam | Honeypot fields | Ongoing | Better UX, no user friction |
| Calendly iframe embeds | Calendly widget.js with initPopupWidget/initInlineWidget | ~2022+ | Cleaner API, better popup UX |
| Astro `VITE_` env prefix | Astro `PUBLIC_` env prefix | Astro 1.0+ | Astro-specific convention, not Vite |

**Deprecated/outdated:**
- `@astrojs/tailwind` integration: replaced by `@tailwindcss/vite` (already handled in Phase 1)
- Calendly `data-url` attribute pattern: still works but `initPopupWidget()` gives more control

## Open Questions

1. **Web3Forms access key availability**
   - What we know: STATE.md lists "Web3Forms API key needed before Phase 3" as a blocker
   - What's unclear: Whether the key has been obtained yet
   - Recommendation: Create `.env` file with placeholder; instructions to replace. The key is free and instant from web3forms.com

2. **Calendly account and event type**
   - What we know: STATE.md lists "Calendly account and event type must be configured before Phase 3" as a blocker
   - What's unclear: Whether the account exists
   - Recommendation: Use a placeholder URL (`https://calendly.com/oriflect/discovery-call`); easily swapped via env variable before launch

3. **Calendly color customization on free plan**
   - What we know: Calendly help docs mention color customization may require a paid plan
   - What's unclear: Whether brand color params work on free tier
   - Recommendation: Pass brand colors in the widget config; if they don't render on free plan, the default Calendly styling is acceptable

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual browser testing (no automated test framework detected) |
| Config file | none -- see Wave 0 |
| Quick run command | `npm run build` (validates no build errors) |
| Full suite command | `npm run build && npm run preview` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Contact form collects name/email/company/message and submits to Web3Forms | manual | `npm run build` (build check only) | N/A |
| CONT-01 | Form shows confirmation state after submission | manual | N/A (requires API call) | N/A |
| CONT-01 | Inline validation on blur with red border + error messages | manual | N/A (requires browser interaction) | N/A |
| CONT-02 | Calendly popup opens when CTA clicked on any page | manual | N/A (requires Calendly script) | N/A |
| CONT-02 | Inline Calendly embed renders on contact page | manual | N/A (requires Calendly script) | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` (catches syntax/import errors)
- **Per wave merge:** `npm run build && npm run preview` (manual visual check)
- **Phase gate:** Build succeeds + manual verification of form submission and Calendly popup

### Wave 0 Gaps
- [ ] `.env` file with `PUBLIC_WEB3FORMS_KEY` and `PUBLIC_CALENDLY_URL` placeholders
- [ ] No automated test framework -- all validation is build-check + manual browser testing (appropriate for a static marketing site with external service integrations)

## Sources

### Primary (HIGH confidence)
- [Web3Forms official docs](https://docs.web3forms.com) - API endpoint, honeypot, JSON submission
- [Web3Forms Astro guide](https://web3templates.com/blog/how-to-build-a-contact-form-in-astro) - Astro-specific fetch pattern
- [Calendly developer docs](https://developer.calendly.com/how-to-display-the-scheduling-page-for-users-of-your-app) - initPopupWidget, initInlineWidget API
- [Calendly help center](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview) - embed options overview

### Secondary (MEDIUM confidence)
- [Calendly advanced embed](https://help.calendly.com/hc/en-us/articles/31618265722775-Advanced-Calendly-embed-for-developers) - color customization params (could not fetch full content due to 403)

### Tertiary (LOW confidence)
- Calendly color customization on free vs paid plans -- could not verify definitively

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Web3Forms and Calendly are well-documented, widely used services
- Architecture: HIGH - Simple client-side integrations with established Astro patterns
- Pitfalls: HIGH - Common issues documented across multiple sources and verified against codebase

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable services, unlikely to change)
