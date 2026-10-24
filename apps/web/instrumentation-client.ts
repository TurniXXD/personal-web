import * as Sentry from "@sentry/browser";
import { getSentryClientDsn, sentryOptions } from "@/lib/sentry-options";

const dsn = getSentryClientDsn();

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  ...sentryOptions,
});
