# Vantuch sites

Two independently deployed Next.js applications in one pnpm workspace:

| App              | Domain                                                 | Purpose                                               |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| `apps/web`       | [vantuch.dev](https://vantuch.dev)                     | Commercial site for websites, automation, and systems |
| `apps/portfolio` | [portfolio.vantuch.dev](https://portfolio.vantuch.dev) | Original interactive portfolio                        |

`packages/ui` holds shared design tokens, UI primitives, and project images. Both apps support Czech at `/` and English at `/en`. The commercial app includes localized case-study routes and its own sitemap. The portfolio retains its existing interaction, contact API, and tests.

## Local development

Use Node.js 22 or newer and pnpm 11.6.0:

```sh
pnpm install --frozen-lockfile
pnpm dev:web
pnpm --filter @vantuch/portfolio dev --port 3001
```

Each `dev:*` command starts one app. The second command uses port 3001 so both can run together. Copy `apps/web/.env.example` to `apps/web/.env.local` and `apps/portfolio/.env.example` to `apps/portfolio/.env.local` when local environment variables are needed. The portfolio's existing local `.env` stays inside `apps/portfolio` and is not committed.

```sh
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test --runInBand
pnpm build
pnpm test:e2e
```

The E2E suites cover both applications. They start production servers after the build on ports 3000 (portfolio) and 3001 (commercial site); stop other servers on those ports first.

## Deploying on Vercel

Use **two Vercel projects from this repository**. The existing `personal-web` project currently owns `vantuch.dev` and `www.vantuch.dev`; move it to the portfolio only after this branch is committed and available to Vercel. Set the Root Directory independently:

1. Existing `personal-web` project: `apps/portfolio`; assign `portfolio.vantuch.dev` and verify its deployment.
2. New commercial project: `apps/web`; verify its preview deployment, then move `vantuch.dev` and `www.vantuch.dev` from the old project to it. Redirect `www` to the apex domain if desired.

Keep the monorepo setting **Include source files outside of the Root Directory** enabled so each app can import `packages/ui`. Use the default Next.js framework preset. Set `ENABLE_EXPERIMENTAL_COREPACK=1` in both projects so Vercel uses the root `packageManager` (`pnpm@11.6.0`). Configure environment variables separately per project: the commercial site uses `RESEND_API_KEY`, `TWENTY_BASE_URL`, `TWENTY_API_KEY`, `TWENTY_CF_ACCESS_CLIENT_ID`, `TWENTY_CF_ACCESS_CLIENT_SECRET`, and `TWENTY_REFERRAL_SECRET` (at least 32 random characters), plus optional `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL`. The Cloudflare Access pair is a service token authorized by a Service Auth policy for the protected Twenty hostname; the site sends it alongside the Twenty bearer key. Its public contact data comes from `SITE_CONTACT_EMAIL`, `SITE_CONTACT_PHONE_DISPLAY`, `SITE_CONTACT_PHONE_HREF`, `SITE_LINKEDIN_URL`, `SITE_GITHUB_URL`, `SITE_INSTAGRAM_URL`, and `SITE_TELEGRAM_URL`; set `NEWSLETTER_VISIBLE=true` only when the retained newsletter form should be shown. The portfolio uses `RESEND_API_KEY`, `NEXT_PUBLIC_CALENDLY_URL`, and optional `RESEND_FROM_EMAIL` and `RESEND_TO_EMAIL` for its contact form. Keep all API keys, referral secrets, and Access credentials server-only, never in `NEXT_PUBLIC_` variables. Use a verified sending domain for `RESEND_FROM_EMAIL` in production.

The commercial contact form saves a Twenty Person and a linked Note before sending the owner an email. Automatic referral attribution comes only from a verified signed link, not from user-supplied POST data. The form shows a confirmation when the referral has been verified; it does not reveal the referrer's details. A client without a link can name the referrer in their own message for manual review. Set `TWENTY_APP_FIELDS_ENABLED=true` only after installing the custom watcher-agents Twenty app to also create a `SalesReferral` relation. Without it, attribution remains in the Note. The `/doporuceni` page no longer accepts third-party contact submissions: referrers share a link, and the prospective client must submit their own inquiry.

To issue a shareable attribution link, copy the referrer's Person UUID from Twenty and run `cd apps/web && node --env-file=.env.local scripts/create-referral-link.mjs <person-uuid>`. The resulting `https://vantuch.dev/?ref=...` URL is signed with `TWENTY_REFERRAL_SECRET`; keep the same secret across deployments or existing links will stop working. The link sets an HttpOnly 30-day cookie so attribution persists while browsing the site. The server rechecks the Person before accepting a contact submission. Do not put the API key or signing secret in the link.

Attach the domains in the corresponding Vercel projects and apply the DNS records Vercel shows for this account. Domain and DNS changes are not performed by this repository change. Do not change the existing project's Root Directory before the code has been pushed; that would make the current production deployment build from a path absent in the old commit. After both deployments resolve, check `/`, `/en`, `/robots.txt`, and `/sitemap.xml` on each domain, plus the portfolio contact form and the commercial case-study and referral pages (`/doporuceni`, `/en/doporuceni`). Submit the new sitemaps to Search Console and retain the old site's search visibility by checking its indexed URLs after migration.

Vercel's [monorepo documentation](https://vercel.com/docs/monorepos) describes the separate Root Directory setup and shared-code setting.

## Commercial site: analytics and form protection

`apps/web/.env.example` lists all required variables. It contains placeholders only; no provider accounts or live tracking are enabled by this code change.

- **Turnstile:** set `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, server-only `TURNSTILE_SECRET_KEY`, and `TURNSTILE_ALLOWED_HOSTNAMES` (comma-separated hostnames, without scheme or path). Configure the same hostnames on the widget in Cloudflare. Every contact, referral-link, partnership, and retained newsletter form verifies the token, action, and hostname server-side. Production deployments fail closed when the keys are missing; set `TURNSTILE_REQUIRED=true` to exercise the same behavior outside Vercel production. Add preview hostnames explicitly when testing preview deployments. Rebuild after changing the public site key.
- **Microsoft Clarity:** set `CLARITY_PROJECT_ID`. Its script loads only after analytics consent; form contents are masked. Do not add another Clarity tag through a tag manager.
- **Cloudflare Web Analytics:** set `CLOUDFLARE_WEB_ANALYTICS_TOKEN` from the site's JS snippet. Choose manual JS snippet installation in Cloudflare rather than automatic injection, so the cookie controls govern loading and the beacon is not included twice.
- **Sentry:** set `NEXT_PUBLIC_SENTRY_DSN` for browser errors and optionally `SENTRY_DSN` for server/edge errors (the public DSN is the fallback). Set `NEXT_PUBLIC_SENTRY_ENVIRONMENT` to identify the deployment environment. For source maps, also set `SENTRY_ORG`, `SENTRY_PROJECT`, and server-only `SENTRY_AUTH_TOKEN` during builds. Controlled API failures use the shared Sentry logger and error-response helper. Diagnostics exclude request bodies, headers, cookies, query strings, user data, extras, and breadcrumbs. Session replay and performance sampling are not enabled. Set server-only `DEBUG_ERRORS=true` only when local handled-error diagnostics are needed.

Visitors can allow analytics, use essential features only, or reopen Cookie settings in the footer. Choices expire after 180 days. Withdrawing consent stops analytics on reload and removes Clarity's first-party cookies. Form protection and error reporting are separate from optional analytics. Complete an actual production delivery and error-reporting check after configuring real keys; tests use simulated services and do not send messages to real recipients.

Production builds on Vercel validate the complete form, monitoring, source-map, and analytics configuration before compiling. Run `VALIDATE_PRODUCTION_ENV=true pnpm --filter @vantuch/web validate:production-env` to perform the same check manually. API endpoints also apply a per-instance rate limit as defense in depth; retain Cloudflare or Vercel Firewall rate limiting at the edge so limits are shared across instances.

## Commercial site: events directory (`/akce`)

The events listing reads published events from the public, read-only Payload Content API (`GET /api/public/v1/events` and `/events/categories`, documented at `https://cms.vantuch.dev/api/public/docs`). No CMS credentials are used; all requests run server-side. There are no event detail pages: each card links straight to the organiser's registration URL, or to the event's source page when registration is not published, in a new window.

- **Configuration:** `CONTENT_API_BASE_URL` (defaults to `https://cms.vantuch.dev`; HTTPS only). Its hostname is also the only remote pattern allowed for `next/image`; cover images from other hosts fall back to the design-system placeholder.
- **Types:** `apps/web/lib/events/cms-api-schema.ts` is generated from the live OpenAPI contract. Regenerate after CMS contract changes with `pnpm --filter @vantuch/web generate:cms-types`.
- **Filtering:** search, city (autocomplete limited to Brno, Praha, Ostrava, Olomouc, Zlín; `?city=brno|praha|ostrava|olomouc|zlin`, every city when omitted; edit `EVENT_CITIES` in `apps/web/lib/events/event-filters.ts` to change the list), category, date range, admission, free food, and sort are URL parameters passed to the API, which filters server-side. Pagination uses the API's opaque cursor (`?cursor=`); filters are preserved across pages.
- **Caching:** event lists revalidate every 15 minutes, categories every hour (tags `content:events` and `content:event-categories`).
- **On-demand revalidation:** configure a CMS publish/update webhook to `POST https://vantuch.dev/api/revalidate/events` with header `Authorization: Bearer <CONTENT_REVALIDATE_SECRET>` (no body needed). Set server-only `CONTENT_REVALIDATE_SECRET` (at least 32 random characters) in Vercel. Without it the endpoint returns 503 and pages refresh on the 15-minute schedule. Cancellations expire caches immediately.
- **Tests:** unit tests (`pnpm --filter @vantuch/web test`) use simulated fetchers; E2E tests start a local contract fixture (`apps/web/e2e/fixtures/content-api-server.mjs`) and never contact the production CMS.
