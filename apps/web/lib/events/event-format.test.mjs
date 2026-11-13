import assert from "node:assert/strict";
import test from "node:test";

import {
  describeEventPrice,
  formatEventCardDateBadge,
  formatEventCardLocation,
  formatEventCardTime,
  formatEventCardDateRange,
  formatEventDateRange,
  formatEventDay,
  formatEventLocation,
  truncateText,
} from "./event-format.ts";

// Intl output uses narrow/regular no-break spaces; compare normalized text.
const plain = (value) => value?.replace(/[  ]/g, " ");

const event = {
  startsAt: "2026-11-20T17:00:00.000Z",
  endsAt: "2026-11-20T19:00:00.000Z",
  timezone: "Europe/Prague",
};

test("formats Czech dates in the event time zone", () => {
  assert.equal(
    plain(formatEventDateRange(event, "cs")),
    "pá 20. listopadu 2026 18:00–20:00",
  );
  assert.equal(
    plain(formatEventDateRange({ ...event, endsAt: null }, "cs")),
    "pá 20. listopadu 2026 v 18:00",
  );
  assert.equal(
    plain(formatEventDateRange(event, "en")),
    "Fri, 20 November 2026, 18:00–20:00",
  );
});

test("applies daylight saving time for Prague", () => {
  assert.equal(
    plain(
      formatEventDateRange(
        {
          startsAt: "2026-07-01T16:00:00.000Z",
          endsAt: null,
          timezone: "Europe/Prague",
        },
        "cs",
      ),
    ),
    "st 1. července 2026 v 18:00",
  );
  assert.equal(
    plain(
      formatEventDateRange(
        {
          startsAt: "2026-12-01T17:00:00.000Z",
          endsAt: null,
          timezone: "Europe/Prague",
        },
        "cs",
      ),
    ),
    "út 1. prosince 2026 v 18:00",
  );
});

test("formats multi-day ranges with both dates", () => {
  const value = plain(
    formatEventDateRange(
      { ...event, endsAt: "2026-11-21T19:00:00.000Z" },
      "cs",
    ),
  );
  assert.match(value, /20\. listopadu 2026.*21\. listopadu 2026/);
});

test("returns null for missing or invalid start dates", () => {
  assert.equal(formatEventDateRange({ ...event, startsAt: null }, "cs"), null);
  assert.equal(
    formatEventDateRange({ ...event, startsAt: "nope" }, "cs"),
    null,
  );
  assert.equal(formatEventDay({ ...event, startsAt: null }, "cs"), null);
});

test("formats the compact card date", () => {
  assert.deepEqual(formatEventDay(event, "cs"), { day: "20", month: "11" });
  assert.deepEqual(formatEventDay(event, "en"), { day: "20", month: "11" });
  // 23:30 UTC is already the next day in Prague.
  assert.equal(
    formatEventDay({ ...event, startsAt: "2026-11-20T23:30:00.000Z" }, "cs")
      .day,
    "21",
  );
});

test("formats numeric dates on cards in the event time zone", () => {
  assert.equal(
    plain(formatEventCardDateRange(event, "cs")),
    "pá 20.11.2026 18:00–20:00",
  );
  assert.equal(
    plain(formatEventCardDateRange({ ...event, endsAt: null }, "cs")),
    "pá 20.11.2026 18:00",
  );
  assert.doesNotMatch(formatEventCardDateRange(event, "en"), /November/);
});

test("card badges omit the current year and keep the event time zone", () => {
  assert.equal(
    formatEventCardDateBadge(event, "cs", new Date("2026-11-07T12:00:00Z")),
    "20.11.",
  );
  assert.equal(
    formatEventCardDateBadge(event, "cs", new Date("2027-01-01T12:00:00Z")),
    "20.11.2026",
  );
  assert.deepEqual(formatEventCardTime(event, "cs"), {
    kind: "range",
    start: "18:00",
    end: "20:00",
  });
  assert.deepEqual(formatEventCardTime({ ...event, endsAt: null }, "cs"), {
    kind: "at",
    start: "18:00",
  });
});

// A course from 14 Sep 12:00 until the end of 30 Nov (Prague time).
const course = {
  startsAt: "2026-09-14T10:00:00.000Z",
  endsAt: "2026-11-30T22:59:00.000Z",
  timezone: "Europe/Prague",
};

test("card time hides end-of-day placeholders", () => {
  const allDay = {
    startsAt: "2026-11-19T23:00:00.000Z",
    endsAt: "2026-11-20T22:59:00.000Z",
    timezone: "Europe/Prague",
  };
  assert.deepEqual(formatEventCardTime(allDay, "cs"), { kind: "allDay" });
  assert.deepEqual(
    formatEventCardTime(
      { ...allDay, endsAt: "2026-11-20T23:00:00.000Z" },
      "cs",
    ),
    { kind: "allDay" },
  );
  assert.deepEqual(
    formatEventCardTime({ ...event, endsAt: "2026-11-20T22:59:00.000Z" }, "cs"),
    { kind: "from", start: "18:00" },
  );
});

test("card time hides a date-only midnight start", () => {
  assert.equal(
    formatEventCardTime(
      {
        startsAt: "2026-11-13T23:00:00.000Z",
        endsAt: null,
        timezone: "Europe/Prague",
      },
      "cs",
    ),
    null,
  );
});

test("multi-day card time shows only the first and last day", () => {
  const multiDayAllDay = {
    startsAt: "2026-11-12T23:00:00.000Z",
    endsAt: "2026-12-20T22:59:00.000Z",
    timezone: "Europe/Prague",
  };
  assert.deepEqual(
    formatEventCardTime(multiDayAllDay, "cs", new Date("2026-11-13T12:00:00Z")),
    { kind: "dates", start: "13.11.", end: "20.12." },
  );
  // A midnight end belongs to the previous day.
  assert.deepEqual(
    formatEventCardTime(
      { ...multiDayAllDay, endsAt: "2026-12-20T23:00:00.000Z" },
      "cs",
      new Date("2026-11-13T12:00:00Z"),
    ),
    { kind: "dates", start: "13.11.", end: "20.12." },
  );
  // Upcoming and ongoing courses or exhibitions keep the same range.
  for (const now of ["2026-09-01T12:00:00Z", "2026-11-11T12:00:00Z"]) {
    assert.deepEqual(formatEventCardTime(course, "cs", new Date(now)), {
      kind: "dates",
      start: "14.9.",
      end: "30.11.",
    });
  }
  const exhibition = {
    startsAt: "2026-10-21T13:03:00.000Z",
    endsAt: "2027-01-07T14:03:00.000Z",
    timezone: "Europe/Prague",
  };
  assert.deepEqual(
    formatEventCardTime(exhibition, "cs", new Date("2026-10-01T12:00:00Z")),
    { kind: "dates", start: "21.10.", end: "7.1.2027" },
  );
});

test("card location uses venue and city without full address", () => {
  assert.equal(
    formatEventCardLocation({
      venueName: "Hotel International Brno",
      city: "Brno",
      address: "Husova 200/16, 602 00 Brno-střed",
    }),
    "Hotel International Brno",
  );
  assert.equal(
    formatEventCardLocation({
      venueName: "CEITEC",
      city: "Brno",
      address: "205/B11, Brno",
    }),
    "CEITEC, Brno",
  );
});

test("describes admission from the free flag", () => {
  assert.deepEqual(describeEventPrice({ isFree: true }), {
    kind: "free",
  });
  assert.deepEqual(describeEventPrice({ isFree: null }), {
    kind: "unknown",
  });
  assert.deepEqual(describeEventPrice({ isFree: false }), {
    kind: "paid",
    amount: null,
  });
});

test("joins location parts without duplicates", () => {
  assert.equal(
    formatEventLocation({
      venueName: "Impact Hub",
      address: "Cyrilská 7, Brno",
      city: "Brno",
    }),
    "Impact Hub, Cyrilská 7, Brno",
  );
  assert.equal(
    formatEventLocation({ venueName: null, address: null, city: "Brno" }),
    "Brno",
  );
  assert.equal(
    formatEventLocation({ venueName: null, address: null, city: "" }),
    null,
  );
});

test("truncates summaries", () => {
  assert.equal(truncateText("short", 10), "short");
  const truncated = truncateText("one two three four five six", 15);
  assert.ok(truncated.length <= 15);
  assert.ok(truncated.endsWith("…"));
});
