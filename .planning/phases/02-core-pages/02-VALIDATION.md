---
phase: 2
slug: core-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro build (static output validation) |
| **Config file** | astro.config.mjs |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | HOME-01 | smoke | `npm run build` | N/A - static | ⬜ pending |
| 02-01-02 | 01 | 1 | HOME-02 | smoke | `npm run build` | N/A - static | ⬜ pending |
| 02-01-03 | 01 | 1 | HOME-03 | manual | Visual inspection | N/A | ⬜ pending |
| 02-01-04 | 01 | 1 | HOME-04 | manual | Visual inspection | N/A | ⬜ pending |
| 02-02-01 | 02 | 1 | SERV-01 | smoke | `npm run build` | N/A - static | ⬜ pending |
| 02-02-02 | 02 | 1 | SERV-02 | smoke | `npm run build` | N/A - static | ⬜ pending |
| 02-02-03 | 02 | 1 | SERV-03 | smoke | `npm run build` | N/A - static | ⬜ pending |
| 02-02-04 | 02 | 1 | SERV-04 | smoke | `npm run build` | N/A - static | ⬜ pending |
| 02-03-01 | 03 | 1 | ABOUT-01 | smoke | `npm run build` | N/A - static | ⬜ pending |
| 02-03-02 | 03 | 1 | ABOUT-02 | smoke | `npm run build` | N/A - static | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework setup needed for static page content. The primary validation is successful `npm run build` (Astro will fail on syntax errors, missing imports, or broken component props) plus visual inspection.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Pricing ranges visible on cards | HOME-03 | Visual content verification | Check homepage pipeline cards show $500-2K, $2K-10K, Custom |
| CTA buttons link to #book | HOME-04 | Link target verification | Click all CTA buttons, verify href="#book" |
| Full-viewport hero renders correctly | HOME-01 | Visual layout verification | Check hero fills viewport with sapphire gradient, white text, gold subhead |
| Alternating section backgrounds | SERV-01-04 | Visual styling verification | Check services page alternates ivory/sapphire-tint backgrounds |
| Founder photo placeholder visible | ABOUT-01 | Visual content verification | Check about page has photo placeholder in founder section |
| Dark mode renders all pages correctly | ALL | Visual styling verification | Toggle dark mode, check all 3 pages for proper contrast and styling |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
