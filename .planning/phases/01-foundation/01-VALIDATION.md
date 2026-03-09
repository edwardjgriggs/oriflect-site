---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-09
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright (Astro-recommended for e2e) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npx playwright test --project=chromium` |
| **Full suite command** | `npx playwright test` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx playwright test --project=chromium`
- **After every plan wave:** Run `npx playwright test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 0 | — | setup | `npx playwright test --project=chromium` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | NAV-01 | e2e | `npx playwright test tests/nav.spec.ts` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | NAV-02 | e2e | `npx playwright test tests/nav.spec.ts` | ❌ W0 | ⬜ pending |
| 01-02-03 | 02 | 1 | NAV-03 | e2e | `npx playwright test tests/footer.spec.ts` | ❌ W0 | ⬜ pending |
| 01-02-04 | 02 | 1 | SEO-04 | manual | Manual: `npx lighthouse http://localhost:4321 --only-categories=performance` | Manual only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `playwright.config.ts` — Playwright configuration
- [ ] `tests/nav.spec.ts` — NAV-01, NAV-02 coverage
- [ ] `tests/footer.spec.ts` — NAV-03 coverage
- [ ] Framework install: `npm install -D @playwright/test && npx playwright install chromium`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Page loads fast, no render-blocking resources | SEO-04 | Performance is a metric, not a pass/fail assertion | Run `npx lighthouse http://localhost:4321 --only-categories=performance` and verify score > 90 |
| Site deployed with HTTPS | SEO-04 | Requires live deployment | Visit Vercel preview URL, confirm HTTPS lock icon |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
