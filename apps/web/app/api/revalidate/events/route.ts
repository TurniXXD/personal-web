import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { apiErrorResponse } from "@/lib/api/error-response";
import { CONTENT_CACHE_TAG } from "@/lib/integrations/content-api";

const endpoint = "revalidate-events";
const headers = { "Cache-Control": "no-store" };
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUGS = 50;

const authorized = (request: Request, secret: string) => {
  const header = request.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const expected = Buffer.from(secret);
  const received = Buffer.from(token);
  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  );
};

const readSlugs = async (request: Request): Promise<string[] | null> => {
  const text = await request.text();
  if (!text.trim()) return [];
  try {
    const body: unknown = JSON.parse(text);
    if (typeof body !== "object" || body === null) return null;
    const { slug, slugs } = body as { slug?: unknown; slugs?: unknown };
    const values = [
      ...(slug === undefined ? [] : [slug]),
      ...(Array.isArray(slugs) ? slugs : []),
    ];
    if (
      values.length > MAX_SLUGS ||
      !values.every(
        (value) => typeof value === "string" && SLUG_PATTERN.test(value),
      )
    ) {
      return null;
    }
    return [...new Set(values as string[])];
  } catch {
    return null;
  }
};

/**
 * CMS publish webhook. Expires the event caches immediately so cancellations
 * and important updates do not wait for the 15 minute revalidation window.
 *
 * POST /api/revalidate/events
 * Authorization: Bearer <CONTENT_REVALIDATE_SECRET>
 * Body (optional): { "slug": "event-slug" } or { "slugs": ["a", "b"] }
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

  const slugs = await readSlugs(request);
  if (slugs === null) {
    return apiErrorResponse({
      body: { revalidated: false, message: "invalidBody" },
      status: 400,
      code: "invalid_body",
      endpoint,
      message: "Event revalidation webhook received an invalid body",
      headers,
    });
  }

  // `expire: 0` makes the next request fetch fresh data instead of serving
  // stale content, which matters for cancellations.
  const tags = [
    CONTENT_CACHE_TAG.events,
    CONTENT_CACHE_TAG.categories,
    ...slugs.map(CONTENT_CACHE_TAG.event),
  ];
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return Response.json({ revalidated: true, tags }, { headers });
}
