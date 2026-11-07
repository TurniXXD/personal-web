import {
  createContentApiClient,
  isContentApiError,
  type ContentApiClient,
  type ListEventsParams,
} from "@/lib/integrations/content-api";
import { sentryLogger } from "@/lib/observability/sentry-logger";
import type {
  EventCategory,
  EventItem,
  EventListPage,
} from "@/lib/events/event-model";

let client: ContentApiClient | undefined;

/** Server-only client; the base URL never reaches the browser bundle. */
const contentApi = () => {
  client ??= createContentApiClient({
    baseUrl: process.env.CONTENT_API_BASE_URL,
  });
  return client;
};

const reportFailure = (operation: string, error: unknown) => {
  sentryLogger({
    error,
    type:
      isContentApiError(error) && error.status !== null && error.status < 500
        ? "warning"
        : "error",
    message: `Content API ${operation} failed`,
    context: isContentApiError(error)
      ? {
          status: error.status,
          code: error.code,
          endpoint: error.endpoint,
          requestId: error.requestId,
        }
      : undefined,
    tags: { source: "content-api", operation },
    fingerprint: ["content-api", operation],
  });
};

const reportSkipped = (operation: string, skipped: number) => {
  if (!skipped) return;
  sentryLogger({
    type: "warning",
    message: "Content API returned events that violate the contract",
    context: { skipped },
    tags: { source: "content-api", operation },
    fingerprint: ["content-api", operation, "invalid-items"],
  });
};

/** Lists one page of events; failures are reported and re-thrown. */
export const getEvents = async (
  params: ListEventsParams,
): Promise<EventListPage> => {
  try {
    const page = await contentApi().getEvents(params);
    reportSkipped("getEvents", page.skipped);
    return page;
  } catch (error) {
    reportFailure("getEvents", error);
    throw error;
  }
};

/** Returns `null` for unknown or unpublished slugs (API 404). */
export const getEventBySlug = async (
  slug: string,
): Promise<EventItem | null> => {
  try {
    return await contentApi().getEventBySlug(slug);
  } catch (error) {
    reportFailure("getEventBySlug", error);
    throw error;
  }
};

/** Categories of upcoming events, optionally narrowed to one city. */
export const getEventCategories = async (
  city: string | null = null,
): Promise<EventCategory[]> => {
  try {
    return await contentApi().getEventCategories(city);
  } catch (error) {
    reportFailure("getEventCategories", error);
    throw error;
  }
};
