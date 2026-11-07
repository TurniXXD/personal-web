import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_EVENT_FILTERS,
  eventListHref,
  hasActiveEventFilters,
  parseEventListQuery,
  toEventsApiQuery,
} from "./event-filters.ts";

const BASE = "/akce/brno";

test("parses an empty query into the default listing", () => {
  const { filters, cursor } = parseEventListQuery({});
  assert.deepEqual(filters, DEFAULT_EVENT_FILTERS);
  assert.equal(cursor, null);
  assert.equal(hasActiveEventFilters(filters), false);
  assert.equal(eventListHref(BASE, filters), BASE);
});

test("parses the documented example URLs", () => {
  assert.equal(parseEventListQuery({ category: "ai" }).filters.category, "ai");
  assert.equal(
    parseEventListQuery({ q: "typescript" }).filters.q,
    "typescript",
  );
  const range = parseEventListQuery({
    from: "2026-11-01",
    to: "2026-11-30",
  }).filters;
  assert.equal(range.from, "2026-11-01");
  assert.equal(range.to, "2026-11-30");
  assert.equal(
    parseEventListQuery({ freeFood: "true" }).filters.freeFood,
    true,
  );
});

test("drops invalid or unsafe parameter values", () => {
  const { filters, cursor } = parseEventListQuery({
    q: " a ",
    category: "AI & data",
    from: "2026-02-30",
    to: "30.11.2026",
    price: "cheap",
    freeFood: "yes",
    sort: "random",
    cursor: "x".repeat(600),
  });
  assert.deepEqual(filters, DEFAULT_EVENT_FILTERS);
  assert.equal(cursor, null);
});

test("normalizes search text and takes the first repeated value", () => {
  const { filters } = parseEventListQuery({
    q: ["  Next.js    meetup ", "ignored"],
    category: ["DEV", "ai"],
  });
  assert.equal(filters.q, "Next.js meetup");
  assert.equal(filters.category, "dev");
  assert.equal(
    parseEventListQuery({ q: "x".repeat(150) }).filters.q.length,
    100,
  );
});

test("reads URLSearchParams from the client the same way", () => {
  const params = new URLSearchParams(
    "q=ai&price=free&sort=latest&freeFood=true",
  );
  const { filters } = parseEventListQuery(params);
  assert.deepEqual(filters, {
    ...DEFAULT_EVENT_FILTERS,
    q: "ai",
    price: "free",
    sort: "latest",
    freeFood: true,
  });
});

test("combines every filter into one API query", () => {
  const { filters, cursor } = parseEventListQuery({
    q: "rust",
    category: "development",
    from: "2026-11-01",
    to: "2026-11-30",
    price: "paid",
    freeFood: "true",
    sort: "latest",
    cursor: "abc123",
  });
  const query = toEventsApiQuery(filters, { cursor });
  assert.deepEqual(Object.fromEntries(query), {
    city: "brno",
    limit: "24",
    sort: "-updatedAt",
    q: "rust",
    category: "development",
    from: "2026-11-01",
    to: "2026-11-30",
    free: "false",
    freeFood: "true",
    cursor: "abc123",
  });
});

test("maps price and sort values to the documented API enums", () => {
  const free = toEventsApiQuery({ ...DEFAULT_EVENT_FILTERS, price: "free" });
  assert.equal(free.get("free"), "true");
  assert.equal(free.get("sort"), "startsAt");
  assert.equal(toEventsApiQuery(DEFAULT_EVENT_FILTERS).has("free"), false);
  assert.equal(
    toEventsApiQuery(DEFAULT_EVENT_FILTERS, { limit: 500 }).get("limit"),
    "100",
  );
  assert.equal(
    toEventsApiQuery(DEFAULT_EVENT_FILTERS, { limit: 0 }).get("limit"),
    "1",
  );
});

test("never sends freeFood=false, so unknown food stays visible when off", () => {
  const off = toEventsApiQuery({ ...DEFAULT_EVENT_FILTERS, freeFood: false });
  assert.equal(off.has("freeFood"), false);
  const on = toEventsApiQuery({
    ...DEFAULT_EVENT_FILTERS,
    freeFood: true,
    category: "ai",
  });
  assert.equal(on.get("freeFood"), "true");
  assert.equal(on.get("category"), "ai");
});

test("pagination links keep active filters and replace the cursor", () => {
  const { filters } = parseEventListQuery({
    q: "ai",
    category: "ai",
    freeFood: "true",
    price: "free",
    cursor: "old",
  });
  const next = new URL(
    eventListHref(BASE, filters, "next-cursor"),
    "https://vantuch.dev",
  );
  assert.equal(next.pathname, BASE);
  assert.deepEqual(Object.fromEntries(next.searchParams), {
    q: "ai",
    category: "ai",
    price: "free",
    freeFood: "true",
    cursor: "next-cursor",
  });

  const first = new URL(eventListHref(BASE, filters), "https://vantuch.dev");
  assert.equal(first.searchParams.has("cursor"), false);
  assert.equal(first.searchParams.get("freeFood"), "true");
});

test("filter links round-trip through the parser", () => {
  const original = {
    ...DEFAULT_EVENT_FILTERS,
    q: "AI & data",
    from: "2026-11-01",
    sort: "latest",
  };
  const href = eventListHref(BASE, original, "c1");
  const reparsed = parseEventListQuery(
    new URL(href, "https://vantuch.dev").searchParams,
  );
  assert.deepEqual(reparsed.filters, original);
  assert.equal(reparsed.cursor, "c1");
  assert.equal(hasActiveEventFilters(reparsed.filters), true);
});
