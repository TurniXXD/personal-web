# Testing and verification

Read this document when behavior changes or before handing off implementation work.

## Test ownership

- Add or update the closest test whenever behavior changes. Tests live with the owning app; commercial-site E2E coverage is in `apps/web/e2e`.
- Prefer roles, labels, URLs, stable behavior, and `data-*` state over DOM depth, generated classes, or pixel timing.
- UI coverage should match the risk: keyboard and accessibility, mobile and WebKit, reduced motion, locale routes, navigation, cards, or forms.
- Provider tests use simulated fetchers and cannot contact production services.

## Iteration cadence

1. Run the narrowest check that can disprove the current change.
2. Fix the issue and rerun that check.
3. After the last relevant edit, run each required final gate once.
4. Rerun a final gate only when affected code changed or to confirm a specific failure fix.

Do not run full lint, typecheck, build, or E2E after every small edit. Batch independent checks when possible.

## Output discipline

- Keep model-visible output below roughly 10,000 tokens or 40KB per command.
- On success, retain the exit code and a short summary.
- On failure, retain the useful beginning and end. Save the full log to a temporary file and carry its path forward.
- Narrow `rg`, lint, and test commands by application, file, project, or test name before expanding scope.
- Exclude `.next`, `.next-dev`, `node_modules`, `test-results`, and generated artifacts unless the task explicitly investigates them.

## Minimum checks for `apps/web`

Run focused checks while iterating, then after the last relevant edit run the affected application gates:

```sh
pnpm exec prettier --check <changed-files>
pnpm exec eslint <changed-files>
pnpm --filter @vantuch/web typecheck
pnpm --filter @vantuch/web test:e2e e2e/<relevant-spec>.spec.ts
git diff --check
```

Skip an inapplicable gate only when the change cannot affect it, and report that decision.

For a broad refactor, dependency update, or configuration change, run the relevant root gates once after focused checks pass:

```sh
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test --runInBand
pnpm build
pnpm test:e2e
```

A production web build validates required environment variables before compilation. Use `VALIDATE_PRODUCTION_ENV=true pnpm --filter @vantuch/web validate:production-env` only when intentionally checking that contract.

Do not commit `.next`, `.next-dev`, `test-results`, logs, local environment files, or other generated output.
