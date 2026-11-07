import assert from "node:assert/strict";
import test from "node:test";

import {
  datePresetForRange,
  dateRangeForPreset,
  todayInPrague,
} from "./event-date-presets.ts";

test("quick ranges use Prague calendar days without UTC date drift", () => {
  assert.equal(todayInPrague(new Date("2026-11-07T23:30:00Z")), "2026-11-08");
  assert.deepEqual(dateRangeForPreset("week", "2026-11-09"), {
    from: "2026-11-09",
    to: "2026-11-15",
  });
  assert.deepEqual(dateRangeForPreset("month", "2026-11-30"), {
    from: "2026-11-30",
    to: "2026-11-30",
  });
  assert.deepEqual(dateRangeForPreset("week", "2026-12-31"), {
    from: "2026-12-31",
    to: "2027-01-03",
  });
  assert.deepEqual(dateRangeForPreset("all", "2026-11-09"), {
    from: null,
    to: null,
  });
});

test("preset selection follows shareable from/to URL values", () => {
  assert.equal(datePresetForRange(null, null, "2026-11-09"), "all");
  assert.equal(
    datePresetForRange("2026-11-09", "2026-11-15", "2026-11-09"),
    "week",
  );
  assert.equal(
    datePresetForRange("2026-11-09", "2026-11-30", "2026-11-09"),
    "month",
  );
  assert.equal(
    datePresetForRange("2026-11-01", "2026-11-30", "2026-11-09"),
    "custom",
  );
});
