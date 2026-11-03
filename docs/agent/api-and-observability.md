# API routes, integrations, and observability

Read this document for API handlers, provider clients, forms, environment variables, security headers, or Sentry changes.

## Request boundaries

- Treat every API payload as untrusted. Validate and normalize it in a domain module before calling providers.
- Preserve Turnstile verification, honeypots, and rate limiting on public form endpoints.
- Never trust referral identity, source paths, or attribution supplied by a browser.
- Route handlers orchestrate work and translate failures into the shared API response contract. Provider details stay out of React components.

## Integrations and failures

- Provider clients belong in `apps/web/lib/integrations`.
- Use `apiErrorResponse` and `sentryLogger` for handled API failures. Do not add isolated `console.error` paths.
- External requests need an explicit timeout, intentional cache behavior, and useful redacted error context.
- Provider integration tests use simulated fetchers and never contact production services.

## Sensitive data

- Sentry diagnostics contain operational metadata only.
- Never attach form bodies, contact data, cookies, authorization headers, API keys, tokens, secrets, or raw provider response bodies.
- Expose safe diagnostics as flat, named fields when they need to appear in Sentry.
- Secrets remain server-only and never use a `NEXT_PUBLIC_` prefix. Public configuration must be safe to ship to every browser.
- Keep `.env` files out of Git. Example files contain placeholders only.

## Security configuration

- Preserve CSP and security headers in `apps/web/next.config.ts`.
- New external scripts, frames, images, or connections require the narrowest corresponding CSP change.
- Any environment-contract change must update validation, documentation, examples, and affected deployment environments together. A new required variable must be present in each environment before code relies on it.
- Keep secrets out of build output, client bundles, test artifacts, Sentry context, and command output.
