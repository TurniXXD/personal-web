// Test-only stand-in for the public Content API (cms.vantuch.dev). It follows
// the OpenAPI contract of /api/public/v1/events* so E2E tests never contact
// the production CMS. Never used as a runtime fallback.
import { createServer } from "node:http";

const port = Number(process.env.CONTENT_API_FIXTURE_PORT ?? 4010);
const DAY = 24 * 60 * 60 * 1000;
const baseDay = new Date();
baseDay.setUTCHours(17, 0, 0, 0);

const at = (days, hours = 0) =>
  new Date(baseDay.getTime() + days * DAY + hours * 3_600_000).toISOString();

const base = {
  summary: null,
  description: null,
  endsAt: null,
  timezone: "Europe/Prague",
  city: "Brno",
  venueName: null,
  address: null,
  tags: [],
  organizerName: null,
  sourceUrl: "https://example.com/events",
  registrationUrl: null,
  imageUrl: null,
  isFree: null,
  price: null,
  currency: null,
  freeFood: "unknown",
  foodDetails: null,
  status: "scheduled",
  featured: false,
  lastVerifiedAt: null,
};

const named = [
  {
    slug: "brno-ai-meetup",
    title: "Brno AI meetup",
    summary: "Talks about retrieval-augmented generation & local LLMs.",
    description:
      "Two short talks followed by networking.\n\nBring your questions about RAG in production.",
    startsAt: at(5),
    endsAt: at(5, 2),
    venueName: "Impact Hub Brno",
    address: "Cyrilská 7, Brno",
    category: "ai",
    tags: ["meetup", "llm"],
    organizerName: "Brno AI Community",
    registrationUrl: "https://example.com/register/brno-ai-meetup",
    isFree: true,
    price: 0,
    freeFood: "yes",
    foodDetails: "Pizza po přednáškách",
  },
  {
    slug: "typescript-night",
    title: "TypeScript night",
    summary: "Type-level programming and pragmatic TypeScript at scale.",
    startsAt: at(8),
    venueName: "Red Hat Brno",
    category: "development",
    organizerName: "Brno JS",
    isFree: false,
    price: 250,
    currency: "CZK",
    freeFood: "no",
  },
  {
    slug: "startup-pitch-evening",
    title: "Startup pitch evening",
    summary: "Five early-stage startups pitch to investors.",
    startsAt: at(12),
    category: "startups",
    status: "cancelled",
    isFree: true,
    price: 0,
    freeFood: "yes",
  },
  {
    slug: "data-breakfast",
    title: "Data breakfast",
    summary: "Morning networking for data people.",
    startsAt: at(15, -9),
    endsAt: at(15, -7),
    category: "ai",
    status: "postponed",
    freeFood: "unknown",
  },
];

const filler = Array.from({ length: 26 }, (_, index) => ({
  slug: `networking-brno-${index + 1}`,
  title: `Networking Brno #${index + 1}`,
  summary: "Informal networking for the Brno tech community.",
  startsAt: at(20 + index),
  category: "networking",
  venueName: "Kavárna Místo",
}));

const events = [...named, ...filler].map((event, index) => ({
  ...base,
  id: `fixture-${index + 1}`,
  updatedAt: at(-index),
  ...event,
}));

const CATEGORY_LABELS = {
  ai: "Ai",
  development: "Development",
  startups: "Startups",
  networking: "Networking",
};

const fold = (value) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const dayStart = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00+01:00`).getTime()
    : Date.parse(value);
const dayEnd = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00+01:00`).getTime() + DAY
    : Date.parse(value);

const send = (response, status, body) => {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body));
};

const error = (response, status, code) =>
  send(response, status, {
    error: { code, message: code, requestId: "fixture" },
  });

const listEvents = (params) => {
  const limit = Number(params.get("limit") ?? 20);
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) return null;
  const q = params.get("q");
  if (q !== null && (q.length < 2 || q.length > 100)) return null;
  const from = params.get("from");
  const to = params.get("to");
  const sort = params.get("sort") ?? "startsAt";
  if (!["startsAt", "-startsAt", "-updatedAt"].includes(sort)) return null;

  const fromTime = from ? dayStart(from) : Date.now();
  let items = events.filter((event) => {
    const start = Date.parse(event.startsAt);
    const end = event.endsAt ? Date.parse(event.endsAt) : start;
    if (end < fromTime) return false;
    if (to && start >= dayEnd(to)) return false;
    if (params.get("category") && event.category !== params.get("category"))
      return false;
    if (params.get("free") === "true" && event.isFree !== true) return false;
    if (params.get("free") === "false" && event.isFree !== false) return false;
    if (params.get("freeFood") === "true" && event.freeFood !== "yes")
      return false;
    if (q) {
      const haystack = fold(
        [event.title, event.summary, event.venueName, event.organizerName]
          .filter(Boolean)
          .join(" "),
      );
      if (!haystack.includes(fold(q))) return false;
    }
    return true;
  });

  items = items.sort((a, b) => {
    if (sort === "-updatedAt") return b.updatedAt.localeCompare(a.updatedAt);
    const order = a.startsAt.localeCompare(b.startsAt);
    return sort === "-startsAt" ? -order : order;
  });

  const cursor = params.get("cursor");
  const offset = cursor
    ? Number(Buffer.from(cursor, "base64url").toString())
    : 0;
  if (!Number.isInteger(offset) || offset < 0) return "invalid_cursor";
  const page = items.slice(offset, offset + limit);
  const next = offset + limit < items.length ? offset + limit : null;
  return {
    data: page,
    nextCursor:
      next === null ? null : Buffer.from(String(next)).toString("base64url"),
    meta: { limit },
  };
};

createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://127.0.0.1:${port}`);
  if (url.pathname === "/health") return send(response, 200, { ok: true });

  if (url.pathname === "/api/public/v1/events/categories") {
    const slugs = [...new Set(events.map((event) => event.category))];
    return send(response, 200, {
      data: slugs.map((slug) => ({ slug, label: CATEGORY_LABELS[slug] })),
      meta: { city: url.searchParams.get("city") ?? "brno" },
    });
  }

  if (url.pathname === "/api/public/v1/events") {
    const result = listEvents(url.searchParams);
    if (result === null) return error(response, 400, "validation_failed");
    if (result === "invalid_cursor")
      return error(response, 400, "invalid_cursor");
    return send(response, 200, result);
  }

  const detail = url.pathname.match(/^\/api\/public\/v1\/events\/([^/]+)$/);
  if (detail) {
    const event = events.find((item) => item.slug === detail[1]);
    return event
      ? send(response, 200, { data: event })
      : error(response, 404, "not_found");
  }

  return error(response, 404, "not_found");
}).listen(port, "127.0.0.1", () => {
  console.log(`Content API fixture listening on http://127.0.0.1:${port}`);
});
