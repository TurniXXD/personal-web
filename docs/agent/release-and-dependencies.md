# CI, dependencies, and deployment boundaries

Read this document for dependency, build, CI, environment-contract, or deployment changes.

- `.github/workflows/ci.yml` is the source of truth for merge checks. Keep local scripts and CI commands aligned.
- CI uses Node.js 22, pnpm 11.6.0, a frozen lockfile, lint, Prettier, strict type checking, unit tests, and production builds.
- Add or update a dependency in the correct workspace package and commit the root `pnpm-lock.yaml`.
- Do not duplicate a dependency across packages without a real consumer in each package.
- Keep the development server on `.next-dev` and production or E2E builds on `.next`.
- Use the development server for visual iteration and production builds for final verification.
- The two apps deploy as separate Vercel projects with `apps/web` and `apps/portfolio` as their Root Directories.
- Preserve monorepo access to `packages/ui` from both Vercel projects.
- Do not change domains, Vercel Root Directories, DNS, production environment variables, or provider configuration unless the task explicitly authorizes that external change.
- New required environment variables must update validation, documentation, and every affected deployment environment before use.
- Never commit generated build output, local environment files, logs, or test artifacts.
