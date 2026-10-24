import { createHash } from "node:crypto";

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

function clientKey(request: Request): string {
  const forwarded = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const address =
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    forwarded ||
    "unknown";

  return createHash("sha256").update(address.slice(0, 128)).digest("hex");
}

function pruneExpiredBuckets(now: number) {
  if (buckets.size < 1_000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(
  request: Request,
  scope: string,
  { limit, windowMs }: RateLimitOptions,
): Response | null {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const key = `${scope}:${clientKey(request)}`;
  const current = buckets.get(key);
  const bucket =
    current && current.resetAt > now
      ? current
      : { count: 0, resetAt: now + windowMs };
  bucket.count += 1;
  buckets.set(key, bucket);

  if (bucket.count <= limit) return null;

  const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1_000));
  return Response.json(
    { ok: false, message: "rateLimited" },
    {
      status: 429,
      headers: {
        "Cache-Control": "no-store",
        "Retry-After": String(retryAfter),
      },
    },
  );
}
