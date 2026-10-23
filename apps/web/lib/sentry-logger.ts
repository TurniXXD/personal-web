import * as Sentry from "@sentry/nextjs";

export type SentryLoggerContext = Record<string, unknown>;

export type SentryLoggerOptions = {
  error?: unknown;
  type?: "debug" | "error" | "warning";
  message?: string;
  context?: SentryLoggerContext;
  tags?: Record<string, string>;
  fingerprint?: string[];
  throwError?: boolean;
};

const debugEnabled = () =>
  process.env.DEBUG_ERRORS === "true" ||
  process.env.NEXT_PUBLIC_DEBUG_ERRORS === "true";

const sentryConfigured = () =>
  Boolean(
    process.env.SENTRY_DSN?.trim() ||
    process.env.NEXT_PUBLIC_SENTRY_DSN?.trim(),
  );

const normalizeError = (error: unknown, message?: string): Error => {
  if (error instanceof Error) return error;
  if (typeof error === "string") return new Error(error);
  return new Error(message ?? "Unknown error");
};

/**
 * Reports handled failures without allowing diagnostics to break the request.
 * Context must contain operational metadata only, never form values or secrets.
 */
export const sentryLogger = ({
  error,
  type = "error",
  message,
  context,
  tags: providedTags,
  fingerprint,
  throwError = false,
}: SentryLoggerOptions): Error | undefined => {
  const tags = { source: "sentry-logger", ...providedTags };
  const shouldLogDebug = debugEnabled();
  const normalizedError =
    type === "error" ? normalizeError(error, message) : undefined;

  try {
    if (shouldLogDebug) {
      console.warn("[vantuch-web]", {
        type,
        tags,
        fingerprint: fingerprint ?? null,
        message: message ?? normalizedError?.message,
        context: context ?? null,
        error: normalizedError ?? null,
      });
    }

    if (type === "debug" && !shouldLogDebug) return normalizedError;
    if (!sentryConfigured()) return normalizedError;

    Sentry.withScope((scope) => {
      scope.setLevel(type);
      Object.entries(tags).forEach(([key, value]) => scope.setTag(key, value));
      if (context) scope.setContext("diagnostic", context);
      if (fingerprint) scope.setFingerprint(fingerprint);

      if (type === "error" && normalizedError) {
        if (message) scope.setExtra("message", message);
        Sentry.captureException(normalizedError);
        return;
      }

      if (message) Sentry.captureMessage(message);
    });
  } catch (loggerError) {
    if (throwError) throw loggerError;
  }

  return normalizedError;
};
