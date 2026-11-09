import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { apiErrorResponse } from "@/lib/api/error-response";
import { CONTENT_CACHE_TAG } from "@/lib/integrations/content-api";

const endpoint = "revalidate-events";
const headers = { "Cache-Control": "no-store" };

const authorized = (request: Request, secret: string) => {
  // The CMS sends `X-Revalidate-Secret`; a Bearer token is accepted as well.
  const header = request.headers.get("authorization") ?? "";
  const token =
    request.headers.get("x-revalidate-secret")?.trim() ||
    (header.startsWith("Bearer ") ? header.slice(7).trim() : "");
  const expected = Buffer.from(secret);
  const received = Buffer.from(token);
  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  );
};

/**
 * CMS publish webhook. Expires the event caches immediately so cancellations
 * and important updates do not wait for the 15 minute revalidation window.
 *
 * POST /api/revalidate/events
 * X-Revalidate-Secret: <CONTENT_REVALIDATE_SECRET>
 * (or Authorization: Bearer <CONTENT_REVALIDATE_SECRET>)
 */
export async function POST(request: Request) {
  const secret = process.env.CONTENT_REVALIDATE_SECRET?.trim();
  if (!secret || secret.length < 32) {
    return apiErrorResponse({
      body: { revalidated: false, message: "notConfigured" },
      status: 503,
      code: "not_configured",
      endpoint,
      message: "Event revalidation webhook is not configured",
      headers,
    });
  }
  if (!authorized(request, secret)) {
    return apiErrorResponse({
      body: { revalidated: false, message: "unauthorized" },
      status: 401,
      code: "unauthorized",
      endpoint,
      message: "Event revalidation webhook rejected an invalid token",
      headers,
    });
  }

  // `expire: 0` makes the next request fetch fresh data instead of serving
  // stale content, which matters for cancellations.
  const tags = [CONTENT_CACHE_TAG.events, CONTENT_CACHE_TAG.categories];
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return Response.json({ revalidated: true, tags }, { headers });
}
