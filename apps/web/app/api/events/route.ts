import type { NextRequest } from "next/server";
import { apiErrorResponse } from "@/lib/api/error-response";
import {
  eventFiltersToSearchParams,
  parseEventListQuery,
} from "@/lib/events/event-filters";
import { getEvents } from "@/lib/events/events-data";
import { isContentApiError } from "@/lib/integrations/content-api";

const endpoint = "events";
const headers = { "Cache-Control": "no-store" };

/**
 * Next page of the events listing for in-place "more events" loading. The
 * query uses the listing URL parameters and is parsed by the same rules.
 */
export async function GET(request: NextRequest) {
  const { filters, cursor } = parseEventListQuery(request.nextUrl.searchParams);
  if (!cursor) {
    return apiErrorResponse({
      body: { message: "missingCursor" },
      status: 400,
      code: "missing_cursor",
      endpoint,
      message: "Events page request has no cursor",
      headers,
    });
  }

  try {
    const page = await getEvents({ filters, cursor });
    return Response.json(
      {
        events: page.events,
        nextSearch: page.nextCursor
          ? eventFiltersToSearchParams(filters, page.nextCursor).toString()
          : null,
      },
      { headers },
    );
  } catch (error) {
    // The data layer already reported the provider failure to Sentry.
    const invalid = isContentApiError(error) && error.status === 400;
    return apiErrorResponse({
      body: { message: invalid ? "invalidQuery" : "unavailable" },
      status: invalid ? 400 : 502,
      code: invalid ? "invalid_query" : "content_api_unavailable",
      endpoint,
      message: "Events page could not be loaded",
      error,
      headers,
      reported: true,
    });
  }
}
