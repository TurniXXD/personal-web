import * as Sentry from "@sentry/nextjs";
import {
  getSentryServerDsn,
  sentryOptions,
} from "@/lib/observability/sentry-options";

const dsn = getSentryServerDsn();

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  ...sentryOptions,
});
