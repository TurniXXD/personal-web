export type EventInteractionType = "outbound_click" | "calendar_click";

const recent = new Map<string, number>();
const REPEAT_WINDOW_MS = 2_000;
const endpoint = "https://cms.vantuch.dev/api/public/v1/events";

/** Best-effort measurement: never delay an external navigation. */
export function sendEventInteraction(
  slug: string,
  type: EventInteractionType,
  fetcher: typeof fetch = fetch,
  now = Date.now(),
): void {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 120) return;
  const key = `${slug}:${type}`;
  if (now - (recent.get(key) ?? -Infinity) < REPEAT_WINDOW_MS) return;
  recent.set(key, now);
  if (recent.size > 200) {
    for (const [entry, at] of recent) {
      if (now - at >= REPEAT_WINDOW_MS) recent.delete(entry);
    }
  }
  void Promise.resolve()
    .then(() =>
      fetcher(`${endpoint}/${slug}/interactions`, {
        method: "POST",
        body: JSON.stringify({ type }),
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        keepalive: true,
        credentials: "omit",
        referrerPolicy: "no-referrer",
      }),
    )
    .catch(() => undefined);
}
