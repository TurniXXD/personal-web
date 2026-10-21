import * as Sentry from "@sentry/nextjs";
import { sentryOptions } from "@/lib/sentry-options";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  ...sentryOptions,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
