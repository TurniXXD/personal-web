import type { paths } from "../events/cms-api-schema.ts";
import {
  toEventsApiQuery,
  ALL_CITIES,
  type EventFilters,
} from "../events/event-filters.ts";
import { mapCmsCategory, mapCmsEvent } from "../events/event-mapping.ts";
import type { CmsEventCategory, EventListPage } from "../events/event-model.ts";

export const DEFAULT_CONTENT_API_BASE_URL = "https://cms.vantuch.dev";

/** Revalidation windows (seconds) for the public Content API. */
export const CONTENT_API_REVALIDATE = {
  events: 900,
  categories: 3600,
} as const;

/** Cache tags; the revalidation webhook invalidates the same tags. */
export const CONTENT_CACHE_TAG = {
  events: "content:events",
  categories: "content:event-categories",
} as const;

const REQUEST_TIMEOUT_MS = 8_000;

type ListEventsResponse =
  paths["/public/v1/event-cards"]["get"]["responses"]["200"]["content"]["application/json"];
type CategoriesResponse =
  paths["/public/v1/events/categories"]["get"]["responses"]["200"]["content"]["application/json"];
type ApiErrorBody =
  paths["/public/v1/event-cards"]["get"]["responses"]["400"]["content"]["application/json"];

export type ContentApiFetchInit = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] };
};

export type ContentApiFetcher = (
  input: string,
  init: ContentApiFetchInit,
) => Promise<Response>;

export type ContentApiClientParams = {
  baseUrl?: string;
  fetcher?: ContentApiFetcher;
  timeoutMs?: number;
};

export type ListEventsParams = {
  filters: EventFilters;
  cursor?: string | null;
  limit?: number;
};

/** Safe, redacted failure details (never response bodies or URLs with PII). */
export class ContentApiError extends Error {
  readonly status: number | null;
  readonly code: string;
  readonly requestId: string | null;
  readonly endpoint: string;

  constructor(
    message: string,
    details: {
      status: number | null;
      code: string;
      endpoint: string;
      requestId?: string | null;
      cause?: unknown;
    },
  ) {
    super(message, { cause: details.cause });
    this.name = "ContentApiError";
    this.status = details.status;
    this.code = details.code;
    this.endpoint = details.endpoint;
    this.requestId = details.requestId ?? null;
  }
}

export const isContentApiError = (error: unknown): error is ContentApiError =>
  error instanceof ContentApiError;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readErrorBody = async (response: Response) => {
  try {
    const body = (await response.json()) as Partial<ApiErrorBody>;
    return {
      code: typeof body.error?.code === "string" ? body.error.code : null,
      requestId:
        typeof body.error?.requestId === "string" ? body.error.requestId : null,
    };
  } catch {
    return { code: null, requestId: null };
  }
};

export const normalizeContentApiBaseUrl = (value: string | undefined) => {
  const candidate = value?.trim() || DEFAULT_CONTENT_API_BASE_URL;
  const url = new URL(candidate);
  const loopback = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  // Plain HTTP is accepted only for local fixtures (E2E Content API stand-in).
  if (url.protocol !== "https:" && !loopback) {
    throw new Error("CONTENT_API_BASE_URL must use HTTPS");
  }
  return url.origin;
};

export const createContentApiClient = ({
  baseUrl = DEFAULT_CONTENT_API_BASE_URL,
  // Resolve the global lazily so Next.js' patched, cache-aware fetch is used.
  fetcher = (input, init) => fetch(input, init),
  timeoutMs = REQUEST_TIMEOUT_MS,
}: ContentApiClientParams = {}) => {
  const origin = normalizeContentApiBaseUrl(baseUrl);

  const request = async <Body>(
    endpoint: string,
    path: string,
    query: URLSearchParams | null,
    next: NonNullable<ContentApiFetchInit["next"]>,
  ): Promise<Body> => {
    const search = query?.toString();
    const url = `${origin}/api${path}${search ? `?${search}` : ""}`;
    let response: Response;
    try {
      response = await fetcher(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(timeoutMs),
        next,
      });
    } catch (error) {
      const timedOut =
        error instanceof Error &&
        (error.name === "TimeoutError" || error.name === "AbortError");
      throw new ContentApiError("Content API request failed", {
        status: null,
        code: timedOut ? "timeout" : "network_error",
        endpoint,
        cause: error,
      });
    }

    if (!response.ok) {
      const { code, requestId } = await readErrorBody(response);
      throw new ContentApiError(
        `Content API responded with HTTP ${response.status}`,
        {
          status: response.status,
          code: code ?? `http_${response.status}`,
          endpoint,
          requestId: requestId ?? response.headers.get("x-request-id"),
        },
      );
    }

    try {
      return (await response.json()) as Body;
    } catch (error) {
      throw new ContentApiError("Content API returned invalid JSON", {
        status: response.status,
        code: "invalid_json",
        endpoint,
        requestId: response.headers.get("x-request-id"),
        cause: error,
      });
    }
  };

  const invalidShape = (endpoint: string) =>
    new ContentApiError("Content API response does not match the contract", {
      status: 200,
      code: "invalid_response",
      endpoint,
    });

  return {
    async getEvents({
      filters,
      cursor = null,
      limit,
    }: ListEventsParams): Promise<EventListPage> {
      const endpoint = "listEventCards";
      const now = Date.now();
      const visitedCursors = new Set<string | null>();
      let pageCursor = cursor;
      let skipped = 0;

      while (!visitedCursors.has(pageCursor)) {
        visitedCursors.add(pageCursor);
        const body = await request<ListEventsResponse>(
          endpoint,
          "/public/v1/event-cards",
          toEventsApiQuery(filters, { cursor: pageCursor, limit }),
          {
            revalidate: CONTENT_API_REVALIDATE.events,
            tags: [CONTENT_CACHE_TAG.events],
          },
        );
        if (!isRecord(body) || !Array.isArray(body.data)) {
          throw invalidShape(endpoint);
        }
        const mapped = body.data.flatMap((item) => mapCmsEvent(item) ?? []);
        skipped += body.data.length - mapped.length;
        const events = mapped.filter(
          (event) => event.startsAt && Date.parse(event.startsAt) >= now,
        );
        const nextCursor =
          typeof body.nextCursor === "string" && body.nextCursor
            ? body.nextCursor
            : null;
        if (events.length > 0 || !nextCursor) {
          return { events, nextCursor, skipped };
        }
        pageCursor = nextCursor;
      }
      throw invalidShape(endpoint);
    },

    async getEventCategories(
      city: string | null = null,
    ): Promise<CmsEventCategory[]> {
      const endpoint = "listEventCategories";
      const body = await request<CategoriesResponse>(
        endpoint,
        "/public/v1/events/categories",
        new URLSearchParams({ city: city ?? ALL_CITIES }),
        {
          revalidate: CONTENT_API_REVALIDATE.categories,
          tags: [CONTENT_CACHE_TAG.categories],
        },
      );
      if (!isRecord(body) || !Array.isArray(body.data)) {
        throw invalidShape(endpoint);
      }
      return body.data.flatMap((item) => mapCmsCategory(item) ?? []);
    },
  };
};

export type ContentApiClient = ReturnType<typeof createContentApiClient>;
