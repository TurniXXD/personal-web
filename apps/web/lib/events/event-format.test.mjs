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
  assert.deepEqual(
    formatEventCardTime(course, "cs", new Date("2026-09-01T12:00:00Z")),
    { kind: "from", start: "12:00" },
  );
  assert.equal(
    formatEventCardTime(course, "cs", new Date("2026-11-11T12:00:00Z")),
    null,
  );
  // Matching start and end times across days are not daily hours.
  const exhibition = {
    startsAt: "2026-10-21T13:03:00.000Z",
    endsAt: "2026-12-07T14:03:00.000Z",
    timezone: "Europe/Prague",
  };
  assert.deepEqual(
    formatEventCardTime(exhibition, "cs", new Date("2026-10-01T12:00:00Z")),
    { kind: "from", start: "15:03" },
  );
  assert.equal(
    formatEventCardTime(exhibition, "cs", new Date("2026-11-11T12:00:00Z")),
    null,
  );
});

test("card location uses structured venue and city without full address", () => {
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

test("describes price only from verified fields", () => {
  assert.deepEqual(
    describeEventPrice({ isFree: true, price: 0, currency: null }, "cs"),
    { kind: "free" },
  );
  assert.deepEqual(
    describeEventPrice({ isFree: null, price: 200, currency: "CZK" }, "cs"),
    { kind: "unknown" },
  );
  assert.deepEqual(
    describeEventPrice({ isFree: false, price: null, currency: null }, "cs"),
    { kind: "paid", amount: null },
  );
  assert.equal(
    plain(
      describeEventPrice({ isFree: false, price: 250, currency: "CZK" }, "cs")
        .amount,
    ),
    "250 Kč",
  );
  assert.equal(
    plain(
      describeEventPrice({ isFree: false, price: 12.5, currency: "EUR" }, "en")
        .amount,
    ),
    "€12.50",
  );
  assert.equal(
    plain(
      describeEventPrice({ isFree: false, price: 300, currency: null }, "cs")
        .amount,
    ),
    "300",
  );
  assert.equal(
    plain(
      describeEventPrice({ isFree: false, price: 5, currency: "XX1" }, "cs")
        .amount,
    ),
    "5 XX1",
  );
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
