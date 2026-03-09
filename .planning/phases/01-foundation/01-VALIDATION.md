---
phase: 1
slug: foundation
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-09
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Build-time HTML verification (Astro build + Node.js assertions) |
| **Config file** | none needed — uses `npx astro build` + inline Node checks |
| **Quick run command** | `npx astro build && node -e "..."` (per-task inline checks) |
| **Full suite command** | `npx astro build` (zero-error static build) |
| **Estimated runtime** | ~10 seconds |

**Rationale:** Phase 1 produces static HTML with zero client-side JS (except inline dark mode/menu scripts). Build-time HTML content checks are sufficient and faster than Playwright e2e for this phase. Playwright is appropriate for later phases with interactive forms and dynamic content.

---

## Sampling Rate

- **After every task commit:** Run task-specific `<automated>` verify command
- **After every plan wave:** Run `npx astro build` (full static build, zero errors)
- **Before `/gsd:verify-work`:** All task verify commands must pass
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| 01-01-01 | 01 | 1 | SEO-04 | build+assert | `npx astro check && node -e "const pkg=require('./package.json'); ..." && grep -q '@theme' src/styles/global.css` | ⬜ pending |
| 01-01-02 | 01 | 1 | SEO-04 | build+assert | `npx astro build && ls dist/index.html dist/services/index.html dist/about/index.html dist/blog/index.html` | ⬜ pending |
| 01-02-01 | 02 | 2 | NAV-01, NAV-02 | build+assert | `npx astro build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); console.log(h.includes('sticky') && h.includes('Book a Discovery Call') && h.includes('Book a Call'));"` | ⬜ pending |
| 01-02-02 | 02 | 2 | NAV-03 | build+assert | `npx astro build && node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); console.log(h.includes('hello@oriflect.com') && h.includes('oriflect.com'));"` | ⬜ pending |
| 01-02-03 | 02 | 2 | — | build+assert | `npx astro build` (all pages have header+footer via shared layout) | ⬜ pending |
| 01-02-04 | 02 | 2 | SEO-04 | manual | `npx lighthouse http://localhost:4321 --only-categories=performance` | ⬜ pending |
| 01-02-05 | 02 | 2 | NAV-01,02,03 | human-verify | Visual inspection of responsive shell | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

No Wave 0 needed. All automated verification uses Astro's build output (`npx astro build`) combined with Node.js inline assertions against `dist/` HTML files. No additional test framework required for Phase 1's static content.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Page loads fast, no render-blocking resources | SEO-04 | Performance is a metric, not a pass/fail assertion | Run `npx lighthouse http://localhost:4321 --only-categories=performance` and verify score > 90 |
| Site deployed with HTTPS | SEO-04 | Requires live deployment | Visit Vercel preview URL, confirm HTTPS lock icon |
| Responsive layout looks professional | NAV-01, NAV-02, NAV-03 | Visual quality is subjective | checkpoint:human-verify in Plan 02 Task 3 |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify commands
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] No Wave 0 gaps — all verify commands use built-in tooling (astro build + node)
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** ready
