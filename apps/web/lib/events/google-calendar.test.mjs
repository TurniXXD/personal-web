import assert from "node:assert/strict";
import test from "node:test";

import {
  CALENDAR_FALLBACK_DURATION_MINUTES,
  buildGoogleCalendarUrl,
  toGoogleCalendarDate,
} from "./google-calendar.ts";

const paramsOf = (url) => {
  assert.ok(url, "expected a calendar URL");
  const parsed = new URL(url);
  assert.equal(
    parsed.origin + parsed.pathname,
    "https://calendar.google.com/calendar/render",
  );
  return parsed.searchParams;
};

test("builds a prefilled Google Calendar template link", () => {
  const params = paramsOf(
    buildGoogleCalendarUrl({
      title: "Brno AI meetup",
      startsAt: "2026-11-12T17:00:00.000Z",
      endsAt: "2026-11-12T19:00:00.000Z",
      timezone: "Europe/Prague",
      summary: "Talks about RAG.",
      eventUrl: "https://vantuch.dev/akce/brno-ai-meetup",
      location: "Impact Hub, Cyrilská 7, Brno",
    }),
  );

  assert.equal(params.get("action"), "TEMPLATE");
  assert.equal(params.get("text"), "Brno AI meetup");
  assert.equal(params.get("dates"), "20261112T170000Z/20261112T190000Z");
  assert.equal(params.get("ctz"), "Europe/Prague");
  assert.equal(
    params.get("details"),
    "Talks about RAG.\n\nhttps://vantuch.dev/akce/brno-ai-meetup",
  );
  assert.equal(params.get("location"), "Impact Hub, Cyrilská 7, Brno");
});

test("encodes reserved characters through URLSearchParams", () => {
  const url = buildGoogleCalendarUrl({
    title: "AI & Data: Q&A #3 / 100% ?",
    startsAt: "2026-11-12T17:00:00.000Z",
    location: "Kávovarna „U Kočky“, Brno",
  });
  assert.ok(url);
  assert.ok(!url.includes(" "), "spaces must be encoded");
  assert.ok(url.includes("text=AI+%26+Data%3A+Q%26A+%233+%2F+100%25+%3F"));
  const params = paramsOf(url);
  assert.equal(params.get("text"), "AI & Data: Q&A #3 / 100% ?");
  assert.equal(params.get("location"), "Kávovarna „U Kočky“, Brno");
});

test("uses a 90 minute fallback only when the end is missing or invalid", () => {
  assert.equal(CALENDAR_FALLBACK_DURATION_MINUTES, 90);
  for (const endsAt of [
    null,
    undefined,
    "not-a-date",
    "2026-11-12T16:00:00.000Z",
  ]) {
    const params = paramsOf(
      buildGoogleCalendarUrl({
        title: "Meetup",
        startsAt: "2026-11-12T17:00:00.000Z",
        endsAt,
      }),
    );
    assert.equal(
      params.get("dates"),
      "20261112T170000Z/20261112T183000Z",
      String(endsAt),
    );
  }
});

test("returns null without a valid start or title", () => {
  assert.equal(
    buildGoogleCalendarUrl({ title: "Meetup", startsAt: null }),
    null,
  );
  assert.equal(
    buildGoogleCalendarUrl({ title: "Meetup", startsAt: "2026-13-45" }),
    null,
  );
  assert.equal(
    buildGoogleCalendarUrl({
      title: "   ",
      startsAt: "2026-11-12T17:00:00.000Z",
    }),
    null,
  );
});

test("omits empty optional fields and defaults the time zone", () => {
  const params = paramsOf(
    buildGoogleCalendarUrl({
      title: "Meetup",
      startsAt: "2026-11-12T17:00:00.000Z",
      timezone: "Mars/Olympus",
      summary: "  ",
      location: null,
    }),
  );
  assert.equal(params.get("ctz"), "Europe/Prague");
  assert.equal(params.has("details"), false);
  assert.equal(params.has("location"), false);
});

test("keeps the instant across daylight-saving transitions", () => {
  // 18:00 Prague in summer (CEST, UTC+2) and winter (CET, UTC+1).
  const summer = paramsOf(
    buildGoogleCalendarUrl({
      title: "Summer",
      startsAt: "2026-07-01T18:00:00+02:00",
    }),
  );
  const winter = paramsOf(
    buildGoogleCalendarUrl({
      title: "Winter",
      startsAt: "2026-12-01T18:00:00+01:00",
    }),
  );
  assert.equal(summer.get("dates"), "20260701T160000Z/20260701T173000Z");
  assert.equal(winter.get("dates"), "20261201T170000Z/20261201T183000Z");

  // An event spanning the 25 Oct 2026 switch keeps its real 2 h duration.
  const overnight = paramsOf(
    buildGoogleCalendarUrl({
      title: "Hackathon night",
      startsAt: "2026-10-25T01:30:00+02:00",
      endsAt: "2026-10-25T02:30:00+01:00",
      timezone: "Europe/Prague",
    }),
  );
  assert.equal(overnight.get("dates"), "20261024T233000Z/20261025T013000Z");
});

test("formats dates as UTC basic format", () => {
  assert.equal(
    toGoogleCalendarDate(new Date("2026-01-02T03:04:05.678Z")),
    "20260102T030405Z",
  );
});

test("truncates very long summaries in calendar details", () => {
  const params = paramsOf(
    buildGoogleCalendarUrl({
      title: "Meetup",
      startsAt: "2026-11-12T17:00:00.000Z",
      summary: "a".repeat(2000),
    }),
  );
  assert.ok(params.get("details").length <= 800);
  assert.ok(params.get("details").endsWith("…"));
});
