import * as Sentry from "@sentry/nextjs";
import { getSentryClientDsn, sentryOptions } from "@/lib/sentry-options";

const dsn = getSentryClientDsn();

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  ...sentryOptions,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
