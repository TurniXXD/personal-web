import assert from "node:assert/strict";
import test from "node:test";

import {
  hasVerifiedFreeFood,
  mapCmsCategory,
  mapCmsEvent,
} from "./event-mapping.ts";
import { canAddEventToCalendar } from "./event-status.ts";

/** Mirrors the documented example of `GET /public/v1/events`. */
const contractExample = {
  id: "0f8e2a52-7d2c-4c55-9e85-3b7f1f0a9c11",
  slug: "example-ai-meetup-2026-11-20",
  title: "Example AI meetup",
  summary: "An example listing used in documentation.",
  description: null,
  startsAt: "2026-11-20T17:00:00.000Z",
  endsAt: "2026-11-20T19:00:00.000Z",
  timezone: "Europe/Prague",
  city: "Brno",
  venueName: "Example venue",
  address: null,
  category: "ai",
  tags: ["meetup"],
  organizerName: "Example organiser",
  sourceUrl: "https://example.com/events/ai-meetup",
  registrationUrl: null,
  imageUrl: null,
  isFree: true,
  price: 0,
  currency: null,
  freeFood: "yes",
  foodDetails: "Free pizza after the talks",
  status: "scheduled",
  featured: false,
  lastVerifiedAt: "2026-11-06T08:00:00.000Z",
  updatedAt: "2026-11-06T08:00:00.000Z",
};

test("maps the documented contract example", () => {
  assert.deepEqual(mapCmsEvent(contractExample), {
    slug: "example-ai-meetup-2026-11-20",
    title: "Example AI meetup",
    summary: "An example listing used in documentation.",
    description: null,
    startsAt: "2026-11-20T17:00:00.000Z",
    endsAt: "2026-11-20T19:00:00.000Z",
    timezone: "Europe/Prague",
    city: "Brno",
    venueName: "Example venue",
    address: null,
    category: "ai",
    tags: ["meetup"],
    organizerName: "Example organiser",
    sourceUrl: "https://example.com/events/ai-meetup",
    registrationUrl: null,
    imageUrl: null,
    isFree: true,
    price: 0,
    currency: null,
    freeFood: "yes",
    foodDetails: "Free pizza after the talks",
    status: "scheduled",
    featured: false,
    updatedAt: "2026-11-06T08:00:00.000Z",
  });
});

test("keeps missing optional fields as unknown instead of inventing values", () => {
  const event = mapCmsEvent({
    slug: "minimal-event",
    title: "  Minimal event  ",
    startsAt: "2026-11-20T17:00:00.000Z",
  });
  assert.ok(event);
  assert.equal(event.title, "Minimal event");
  assert.equal(event.endsAt, null);
  assert.equal(event.summary, null);
  assert.equal(event.venueName, null);
  assert.equal(event.organizerName, null);
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
  assert.equal(event.registrationUrl, null);
  assert.equal(event.imageUrl, null);
  assert.equal(event.timezone, "Europe/Prague");
  assert.deepEqual(event.tags, []);
  assert.equal(event.status, "scheduled");
});

test("rejects items without a usable slug or title", () => {
  assert.equal(mapCmsEvent(null), null);
  assert.equal(mapCmsEvent([]), null);
  assert.equal(mapCmsEvent({ ...contractExample, slug: "../admin" }), null);
  assert.equal(mapCmsEvent({ ...contractExample, slug: "" }), null);
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
    registrationUrl: "javascript:alert(1)",
    sourceUrl: "not a url",
    imageUrl: "data:image/png;base64,AAAA",
    timezone: "Nowhere/City",
  });
  assert.equal(event.registrationUrl, null);
  assert.equal(event.sourceUrl, null);
  assert.equal(event.imageUrl, null);
  assert.equal(event.timezone, "Europe/Prague");

  const valid = mapCmsEvent({
    ...contractExample,
    registrationUrl: "https://tickets.example.com/e/1?ref=a b",
  });
  assert.equal(
    valid.registrationUrl,
    "https://tickets.example.com/e/1?ref=a%20b",
  );
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
  assert.deepEqual(mapCmsCategory({ slug: "ai", label: "Ai" }), {
    slug: "ai",
    label: "Ai",
  });
  assert.deepEqual(mapCmsCategory({ slug: "dev", label: "" }), {
    slug: "dev",
    label: "dev",
  });
  assert.equal(mapCmsCategory({ label: "No slug" }), null);
});
