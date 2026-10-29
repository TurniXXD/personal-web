import type { ErrorEvent } from "@sentry/nextjs";

export const getSentryClientDsn = () =>
  process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

export const getSentryServerDsn = () =>
  process.env.SENTRY_DSN?.trim() || getSentryClientDsn();

export function sanitizeSentryEvent(event: ErrorEvent): ErrorEvent {
  // Form contents, referral signatures, and credentials never belong in diagnostics.
  delete event.user;
  delete event.extra;
  delete event.breadcrumbs;
  if (event.request) {
    delete event.request.data;
    delete event.request.cookies;
    delete event.request.headers;
    delete event.request.query_string;
    if (event.request.url)
      event.request.url = event.request.url.split(/[?#]/)[0];
  }
  return event;
}

export const sentryOptions = {
  sendDefaultPii: false,
  tracesSampleRate: 0,
  attachStacktrace: true,
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT?.trim() ||
    process.env.NODE_ENV ||
    "development",
  beforeSend: sanitizeSentryEvent,
};
