import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_EVENT_FILTERS } from "../events/event-filters.ts";
import {
  CONTENT_CACHE_TAG,
  ContentApiError,
  createContentApiClient,
} from "./content-api.ts";

const event = (overrides = {}) => ({
  slug: "brno-ai-meetup",
  title: "Brno AI meetup",
  summary: null,
  startsAt: "2026-11-20T17:00:00.000Z",
  endsAt: null,
  timezone: "Europe/Prague",
  city: "Brno",
  venueName: null,
  address: null,
  category: "ai",
  sourceUrl: "https://example.com/e",
  registrationUrl: null,
  imageUrl: null,
  isFree: null,
  price: null,
  currency: null,
  freeFood: "unknown",
  status: "scheduled",
  ...overrides,
});

/** Simulated fetcher; tests never contact the production CMS. */
const simulatedFetcher = (handler) => {
  const calls = [];
  const fetcher = async (input, init) => {
    calls.push({ url: new URL(input), init });
    return handler(new URL(input));
  };
  return { calls, fetcher };
};

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });

test("requests one filtered page with cache tags and revalidation", async () => {
  const { calls, fetcher } = simulatedFetcher(() =>
    json({ data: [event()], nextCursor: "c2", meta: { limit: 20 } }),
  );
  const client = createContentApiClient({
    baseUrl: "https://cms.example.com/",
    fetcher,
  });

  const page = await client.getEvents({
    filters: {
      ...DEFAULT_EVENT_FILTERS,
      q: "ai",
      freeFood: true,
      price: "free",
    },
    cursor: "c1",
  });

  assert.equal(calls.length, 1);
  const { url, init } = calls[0];
  assert.equal(
    url.origin + url.pathname,
    "https://cms.example.com/api/public/v1/event-cards",
  );
  assert.deepEqual(Object.fromEntries(url.searchParams), {
    city: "all",
    limit: "15",
    sort: "startsAt",
    q: "ai",
    free: "true",
    freeFood: "true",
    cursor: "c1",
  });
  assert.deepEqual(init.next, {
    revalidate: 900,
    tags: [CONTENT_CACHE_TAG.events],
  });
  assert.ok(init.signal instanceof AbortSignal);
  assert.equal(page.nextCursor, "c2");
  assert.equal(page.events[0].slug, "brno-ai-meetup");
  assert.equal(page.skipped, 0);
});

test("follows cursor pagination until nextCursor is null", async () => {
  const pages = {
    "": { data: [event({ slug: "a" })], nextCursor: "p2" },
    p2: { data: [event({ slug: "b" })], nextCursor: "p3" },
    p3: { data: [event({ slug: "c" })], nextCursor: null },
  };
  const { fetcher } = simulatedFetcher((url) =>
    json({
      ...pages[url.searchParams.get("cursor") ?? ""],
      meta: { limit: 1 },
    }),
  );
  const client = createContentApiClient({ fetcher });

  const slugs = [];
  let cursor = null;
  do {
    const page = await client.getEvents({
      filters: DEFAULT_EVENT_FILTERS,
      cursor,
      limit: 1,
    });
    slugs.push(...page.events.map((item) => item.slug));
    cursor = page.nextCursor;
  } while (cursor);
  assert.deepEqual(slugs, ["a", "b", "c"]);
});

test("keeps events that already started or are still running", async () => {
  const { calls, fetcher } = simulatedFetcher(() =>
    json({
      data: [
        event({
          slug: "ongoing",
          startsAt: "2020-01-01T00:00:00.000Z",
          endsAt: "2099-12-31T00:00:00.000Z",
        }),
        event({ slug: "started-today", startsAt: "2020-01-01T08:00:00.000Z" }),
        event({ slug: "future", startsAt: "2099-01-01T00:00:00.000Z" }),
      ],
      nextCursor: "p2",
      meta: { limit: 15 },
    }),
  );

  const page = await createContentApiClient({ fetcher }).getEvents({
    filters: DEFAULT_EVENT_FILTERS,
  });

  assert.deepEqual(
    page.events.map((item) => item.slug),
    ["ongoing", "started-today", "future"],
  );
  assert.equal(page.nextCursor, "p2");
  assert.equal(calls.length, 1);
});

test("skips contract-violating items and reports how many", async () => {
  const { fetcher } = simulatedFetcher(() =>
    json({
      data: [event(), { slug: "broken" }, "junk"],
      nextCursor: null,
      meta: { limit: 20 },
    }),
  );
  const page = await createContentApiClient({ fetcher }).getEvents({
    filters: DEFAULT_EVENT_FILTERS,
  });
  assert.equal(page.events.length, 1);
  assert.equal(page.skipped, 2);
  assert.equal(page.nextCursor, null);
});

test("loads categories with a one hour revalidation", async () => {
  const { calls, fetcher } = simulatedFetcher(() =>
    json({
      data: [{ slug: "ai", label: "Ai" }, { label: "broken" }],
      meta: { city: "brno" },
    }),
  );
  const categories = await createContentApiClient({
    fetcher,
  }).getEventCategories();
  assert.deepEqual(categories, [{ slug: "ai", label: "Ai", labelCs: null }]);
  assert.equal(calls[0].url.pathname, "/api/public/v1/events/categories");
  assert.equal(calls[0].url.searchParams.get("city"), "all");
  assert.deepEqual(calls[0].init.next, {
    revalidate: 3600,
    tags: [CONTENT_CACHE_TAG.categories],
  });
});

test("turns HTTP failures into redacted ContentApiError values", async () => {
  const { fetcher } = simulatedFetcher(() =>
    json(
      {
        error: {
          code: "rate_limited",
          message: "Slow down",
          requestId: "req-1",
        },
      },
      429,
    ),
  );
  await assert.rejects(
    createContentApiClient({ fetcher }).getEvents({
      filters: DEFAULT_EVENT_FILTERS,
    }),
    (error) =>
      error instanceof ContentApiError &&
      error.status === 429 &&
      error.code === "rate_limited" &&
      error.requestId === "req-1" &&
      error.endpoint === "listEventCards",
  );
});

test("reports network errors, invalid JSON, and invalid shapes", async () => {
  const failing = createContentApiClient({
    fetcher: async () => {
      throw new TypeError("fetch failed");
    },
  });
  await assert.rejects(failing.getEventCategories(), {
    code: "network_error",
    status: null,
  });

  const html = createContentApiClient({
    fetcher: async () => new Response("<html>", { status: 200 }),
  });
  await assert.rejects(html.getEvents({ filters: DEFAULT_EVENT_FILTERS }), {
    code: "invalid_json",
  });

  const wrongShape = createContentApiClient({
    fetcher: async () => json({ items: [] }),
  });
  await assert.rejects(
    wrongShape.getEvents({ filters: DEFAULT_EVENT_FILTERS }),
    {
      code: "invalid_response",
    },
  );

  const http500 = createContentApiClient({
    fetcher: async () =>
      new Response("oops", { status: 500, headers: { "x-request-id": "r9" } }),
  });
  await assert.rejects(http500.getEventCategories(), {
    code: "http_500",
    requestId: "r9",
  });
});

test("rejects non-HTTPS base URLs", () => {
  assert.throws(
    () => createContentApiClient({ baseUrl: "http://cms.example.com" }),
    /HTTPS/,
  );
});
