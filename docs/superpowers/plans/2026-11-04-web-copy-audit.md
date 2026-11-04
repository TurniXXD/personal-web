# Commercial Website Copy Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite and correct all audited Czech and English copy in `apps/web`, without changing `apps/portfolio`.

**Architecture:** Keep user-visible text in the existing bilingual message sources and preserve matching Czech/English content structures. The only behavior change is a small locale resolver used by the root global error boundary so it renders one language at a time.

**Tech Stack:** Next.js, React, TypeScript, next-intl, Playwright, pnpm 11.6.0.

**Spec:** User request and copy audit in this chat; no separate repository spec.

## Global Constraints

- Work only in `apps/web` and this plan; do not edit `apps/portfolio`.
- Update Czech and English together and preserve catalog parity.
- Do not invent project metrics, client outcomes, or legal claims.
- Preserve form security, validation behavior, static generation, routes, metadata structure, and accessibility.
- Prefer natural Czech and consistent British English.

## Review Focus

- `/en` global failures must render English only; Czech routes must render Czech only.
- Every primary CTA must describe the contact action it triggers.
- Referral wording must keep attribution and payment conditions legally unchanged.
- Case-study revisions must remain supported by existing project facts and avoid invented outcomes.
- Czech and English catalog shapes and all public localized routes must remain valid.

---

### Task 1: Locale-aware global error copy

**Files:**

- Create: `apps/web/lib/site/locale-from-pathname.ts`
- Create: `apps/web/lib/site/locale-from-pathname.test.mjs`
- Modify: `apps/web/app/global-error.tsx`
- Modify: `apps/web/messages/global-error.json`

**Interfaces:**

- Produces: `localeFromPathname(pathname: string | null): Locale`
- Consumes: the existing Czech-root/English-`/en` routing contract.

- [ ] Write and run a failing Node test for Czech root paths, English root paths, nested English paths, and false prefixes such as `/energy`.
- [ ] Implement the resolver and render only the matching global-error catalog.
- [ ] Run the focused test and typecheck the affected app.

### Task 2: Navigation, CTAs, and form microcopy

**Files:**

- Modify: `apps/web/messages/cs.json`, `apps/web/messages/en.json`
- Modify: `apps/web/messages/contact/form.ts`
- Modify: `apps/web/messages/referrals/request.ts`
- Modify: relevant public service detail and landing message files.

**Interfaces:**

- Produces: aligned Czech and English labels and action-oriented validation messages.
- Consumes: existing message types and CTA targets.

- [ ] Replace undefined jargon and misleading action labels in both locales.
- [ ] Make validation messages concise, specific, and recovery-oriented.
- [ ] Verify message types and public service-page E2E behavior.

### Task 3: Homepage, proof, and service copy

**Files:**

- Modify: `apps/web/messages/site/cs.ts`, `apps/web/messages/site/en.ts`
- Modify: public service detail files under `apps/web/messages/services/details/{cs,en}`.
- Modify: `apps/web/messages/automation/**` and `apps/web/messages/services/landing/cs/web.ts` where audited wording appears.

**Interfaces:**

- Produces: specific, human homepage/service copy without unsupported claims.
- Consumes: existing `SiteCopy`, `ServiceDetailCopy`, and automation-copy types.

- [ ] Sharpen the offer and proof language while preserving the solo-consultant voice.
- [ ] Correct Czech grammar and replace avoidable English jargon.
- [ ] Remove awkward English constructions and repetitive generic final CTAs.
- [ ] Verify homepage, service, automation, and project routes in both locales.

### Task 4: Referral and privacy copy

**Files:**

- Modify: `apps/web/messages/referrals/page.ts`
- Modify: `apps/web/messages/privacy.ts`

**Interfaces:**

- Produces: readable referral and privacy content with unchanged conditions and facts.
- Consumes: existing `ReferralCopy` and `PrivacyCopy` types.

- [ ] Replace Czech `call` wording and use British `programme` consistently.
- [ ] Clarify the referral CTA and reduce repetition without changing eligibility rules.
- [ ] Split dense privacy paragraphs while preserving providers, legal bases, retention, and rights.
- [ ] Verify referral and privacy route E2E behavior in both locales.

### Task 5: Final quality gates

**Files:**

- Verify all changed files.

**Interfaces:**

- Consumes: Tasks 1–4.
- Produces: a formatting-, lint-, type-, and route-verified patch.

- [ ] Run Prettier and ESLint on changed files.
- [ ] Run `pnpm --filter @vantuch/web typecheck`.
- [ ] Run the relevant commercial-site E2E specs.
- [ ] Run catalog-parity checks, copy-pattern scans, and `git diff --check`.
- [ ] Review the complete diff against the audit and confirm no portfolio files changed.
