import assert from "node:assert/strict";
import test from "node:test";

import {
  hasVerifiedFreeFood,
  localizeEventCategory,
  mapCmsCategory,
  mapCmsEvent,
} from "./event-mapping.ts";
import { canAddEventToCalendar } from "./event-status.ts";

/** Mirrors the documented example of `GET /public/v1/event-cards`. */
const contractExample = {
  title: "Example AI meetup",
  startsAt: "2026-11-20T17:00:00.000Z",
  endsAt: "2026-11-20T19:00:00.000Z",
  timezone: "Europe/Prague",
  city: "Brno",
  venueName: "Example venue",
  address: null,
  category: "ai",
  categories: ["ai", "workshop"],
  sourceUrl: "https://example.com/events/ai-meetup",
  imageUrl: null,
  imageSource: null,
  isFree: true,
  freeFood: "yes",
  status: "scheduled",
};

test("maps the documented contract example", () => {
  assert.deepEqual(mapCmsEvent(contractExample), {
    title: "Example AI meetup",
    startsAt: "2026-11-20T17:00:00.000Z",
    endsAt: "2026-11-20T19:00:00.000Z",
    timezone: "Europe/Prague",
    city: "Brno",
    venueName: "Example venue",
    address: null,
    category: "ai",
    categories: ["ai", "workshop"],
    sourceUrl: "https://example.com/events/ai-meetup",
    isFree: true,
    freeFood: "yes",
    status: "scheduled",
  });
});

test("keeps missing optional fields as unknown instead of inventing values", () => {
  const event = mapCmsEvent({
    title: "  Minimal event  ",
    startsAt: "2026-11-20T17:00:00.000Z",
  });
  assert.ok(event);
  assert.equal(event.title, "Minimal event");
  assert.equal(event.endsAt, null);
  assert.equal(event.venueName, null);
  assert.equal(
    event.isFree,
    null,
    "unknown price must not become free or paid",
  );
  assert.equal(
    event.freeFood,
    "unknown",
    "missing food info must not become 'no'",
  );
  assert.equal(event.timezone, "Europe/Prague");
  assert.equal(event.status, "scheduled");
});

test("rejects items without a usable title", () => {
  assert.equal(mapCmsEvent(null), null);
  assert.equal(mapCmsEvent([]), null);
  assert.equal(mapCmsEvent({ ...contractExample, title: " " }), null);
});

test("invalidates bad dates and end times before the start", () => {
  const invalidStart = mapCmsEvent({ ...contractExample, startsAt: "soon" });
  assert.equal(invalidStart.startsAt, null);
  assert.equal(invalidStart.endsAt, null);
  assert.equal(canAddEventToCalendar(invalidStart), false);

  const reversed = mapCmsEvent({
    ...contractExample,
    endsAt: "2026-11-20T16:00:00.000Z",
  });
  assert.equal(reversed.endsAt, null);

  const offset = mapCmsEvent({
    ...contractExample,
    startsAt: "2026-11-20T18:00:00+01:00",
  });
  assert.equal(offset.startsAt, "2026-11-20T17:00:00.000Z");
});

test("drops unsafe URLs and unknown time zones", () => {
  const event = mapCmsEvent({
    ...contractExample,
    sourceUrl: "not a url",
    timezone: "Nowhere/City",
  });
  assert.equal(event.sourceUrl, null);
  assert.equal(event.timezone, "Europe/Prague");
});

test("handles every documented event status", () => {
  const scheduled = mapCmsEvent(contractExample);
  const cancelled = mapCmsEvent({ ...contractExample, status: "cancelled" });
  const postponed = mapCmsEvent({ ...contractExample, status: "postponed" });

  assert.equal(canAddEventToCalendar(scheduled), true);
  assert.equal(canAddEventToCalendar(postponed), true);
  assert.equal(canAddEventToCalendar(cancelled), false);
});

test("shows free food only when explicitly confirmed", () => {
  for (const [freeFood, expected] of [
    ["yes", true],
    ["no", false],
    ["unknown", false],
    [undefined, false],
    ["maybe", false],
  ]) {
    const event = mapCmsEvent({ ...contractExample, freeFood });
    assert.equal(hasVerifiedFreeFood(event), expected, String(freeFood));
  }
  assert.equal(
    mapCmsEvent({ ...contractExample, freeFood: "maybe" }).freeFood,
    "unknown",
  );
});

test("maps categories and falls back to the slug as label", () => {
  assert.deepEqual(
    mapCmsCategory({ slug: "maker", label: "Maker", labelCs: "Tvůrci" }),
    { slug: "maker", label: "Maker", labelCs: "Tvůrci" },
  );
  assert.deepEqual(mapCmsCategory({ slug: "dev", label: "" }), {
    slug: "dev",
    label: "dev",
    labelCs: null,
  });
  assert.equal(mapCmsCategory({ label: "No slug" }), null);
});

test("localizes category labels from the CMS translation", () => {
  const maker = { slug: "maker", label: "Maker", labelCs: "Tvůrci" };
  assert.deepEqual(localizeEventCategory(maker, "cs"), {
    slug: "maker",
    label: "Tvůrci",
  });
  assert.deepEqual(localizeEventCategory(maker, "en"), {
    slug: "maker",
    label: "Maker",
  });
  assert.equal(
    localizeEventCategory({ ...maker, labelCs: null }, "cs").label,
    "Maker",
  );
});

test("keeps all categories and falls back to the primary one", () => {
  assert.deepEqual(
    mapCmsEvent({ ...contractExample, categories: ["ai", " ", "ai", "maker"] })
      .categories,
    ["ai", "maker"],
  );
  assert.deepEqual(
    mapCmsEvent({ ...contractExample, categories: undefined }).categories,
    ["ai"],
  );
});
