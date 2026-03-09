---
phase: 3
slug: conversion-mechanisms
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser testing (no automated test framework) |
| **Config file** | none — Wave 0 sets up .env placeholders |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview`
- **Before `/gsd:verify-work`:** Full suite must be green + manual browser verification
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | CONT-01 | build | `npm run build` | ✅ | ⬜ pending |
| 03-01-02 | 01 | 1 | CONT-01 | manual | N/A (browser) | N/A | ⬜ pending |
| 03-01-03 | 01 | 1 | CONT-02 | manual | N/A (Calendly) | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `.env` file with `PUBLIC_WEB3FORMS_KEY=placeholder` and `PUBLIC_CALENDLY_URL=placeholder`
- [ ] `.env.example` documenting required variables

*No automated test framework needed — static marketing site with external service integrations. Build checks catch syntax/import errors.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Contact form collects name/email/company/message and submits to Web3Forms | CONT-01 | Requires external API call | Fill form, submit, verify success message appears |
| Form inline validation on blur | CONT-01 | Requires browser interaction | Leave required fields empty, tab out, verify red borders + error messages |
| Form confirmation state | CONT-01 | Requires successful API response | Submit valid form, verify inline success message replaces form |
| Calendly popup opens on CTA click | CONT-02 | Requires Calendly external script | Click "Book a Discovery Call" on each page, verify popup opens |
| Calendly inline embed on contact page | CONT-02 | Requires Calendly external script | Visit /contact, verify Calendly scheduler visible in right column |
| Brand colors applied to Calendly | CONT-02 | Visual verification | Check Calendly widget uses sapphire/ember/gold colors |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
