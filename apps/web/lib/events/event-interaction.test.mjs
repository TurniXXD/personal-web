import assert from "node:assert/strict";
import test from "node:test";
import { sendEventInteraction } from "./event-interaction.ts";

test("sends a bounded event interaction without blocking the caller", async () => {
  const calls = [];
  sendEventInteraction(
    "brno-ai-meetup",
    "outbound_click",
    async (url, options) => {
      calls.push({ url, options });
      throw new Error("tracking unavailable");
    },
    1000,
  );
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].url,
    "https://cms.vantuch.dev/api/public/v1/events/brno-ai-meetup/interactions",
  );
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    type: "outbound_click",
  });
  assert.equal(calls[0].options.keepalive, true);
});

test("suppresses immediate repeats of the same event action", async () => {
  let count = 0;
  const fetcher = async () => {
    count += 1;
    return new Response(null, { status: 204 });
  };
  sendEventInteraction("repeat-meetup", "calendar_click", fetcher, 1000);
  sendEventInteraction("repeat-meetup", "calendar_click", fetcher, 1100);
  sendEventInteraction("repeat-meetup", "calendar_click", fetcher, 4000);
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(count, 2);
});
