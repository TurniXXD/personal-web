import * as Sentry from "@sentry/browser";
import {
  getSentryClientDsn,
  sentryOptions,
} from "@/lib/observability/sentry-options";

const dsn = getSentryClientDsn();

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  ...sentryOptions,
});
