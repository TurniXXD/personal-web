# Project instructions

## Repository contract

- This pnpm monorepo contains two independently deployed Next.js apps:
  - `apps/web`: commercial site at `vantuch.dev`.
  - `apps/portfolio`: portfolio at `portfolio.vantuch.dev`.
  - `packages/ui`: assets and UI with proven consumers in both apps.
- Use Node.js 22 or newer and the pinned `pnpm@11.6.0`. Do not use npm or Yarn.
- Keep changes inside the owning app unless a shared contract genuinely changes.
- Read the nearest `AGENTS.md` before editing. The generated block in `apps/web/AGENTS.md` must remain intact.

## Read only what the task needs

- Repository structure, naming, React, and TypeScript: `docs/agent/repository-layout.md`.
- Components, Tailwind, motion, accessibility, and responsive UI: `docs/agent/ui-and-css.md`.
- Localized routes, static generation, metadata, sitemap, and structured data: `docs/agent/localization-and-seo.md`.
- API routes, providers, security, environment variables, and observability: `docs/agent/api-and-observability.md`.
- Focused and final verification: `docs/agent/testing.md`.
- CI, dependencies, builds, and deployment boundaries: `docs/agent/release-and-dependencies.md`.
- Long or tool-heavy Codex work: `docs/agent/codex-workflow.md`.

Do not preload every reference. Open the documents relevant to the files or behavior being changed.

## Durable rules

- Prefer Server Components. Put `"use client"` on the smallest interactive leaf.
- Keep route files thin and put domain UI in `apps/web/components/<domain>` and non-UI code in `apps/web/lib/<domain>`.
- Reuse project shadcn-style primitives first, Radix for interaction behavior, Tailwind v4 for ordinary styling, and Lucide for icons.
- Store all user-visible copy in `next-intl` catalogs and update Czech and English together.
- Keep public content statically generated. Localized routes, metadata, alternates, structured data, and sitemap entries must use the same route/content sources.
- Preserve form validation, Turnstile, honeypots, rate limits, safe provider boundaries, redacted Sentry diagnostics, CSP, and server-only secrets.
- Never add decorative pipeline connectors around heroes or move UI upward on hover or focus.
- Preserve visible focus, semantic HTML, keyboard and touch behavior, reduced motion, and mobile-first reflow.
- Preserve unrelated user changes. Prefer the smallest coherent diff; do not create compatibility layers, backups, or speculative shared abstractions.

## Verification discipline

- Run the narrowest relevant check while iterating.
- After the last relevant edit, run each required final gate once. Rerun a gate only after affected code changes or to confirm a specific failure fix.
- Keep command output bounded. Summarize successful output; for failures retain the useful beginning and end and store the full log outside conversation context.
- Never commit `.next`, `.next-dev`, `test-results`, logs, local environment files, or other generated output.
