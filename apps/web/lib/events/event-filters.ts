/** Content API value for "every city"; the listing is not limited to one city. */
export const ALL_CITIES = "all";
export const EVENTS_PAGE_SIZE = 24;

export const EVENT_SORTS = ["nearest", "latest"] as const;
export type EventSort = (typeof EVENT_SORTS)[number];

export const EVENT_PRICE_FILTERS = ["free", "paid"] as const;
export type EventPriceFilter = (typeof EVENT_PRICE_FILTERS)[number];

/** Filter state shared by the URL, the filter form, and the API query. */
export type EventFilters = {
  q: string | null;
  city: EventCity | null;
  category: string | null;
  from: string | null;
  to: string | null;
  price: EventPriceFilter | null;
  freeFood: boolean;
  sort: EventSort;
};

export type EventListQuery = {
  filters: EventFilters;
  cursor: string | null;
};

export type EventSearchParamsInput =
  URLSearchParams | Record<string, string | string[] | undefined>;

/** URL parameter names; also used as form control names. */
export const EVENT_FILTER_PARAM = {
  q: "q",
  city: "city",
  category: "category",
  from: "from",
  to: "to",
  price: "price",
  freeFood: "freeFood",
  sort: "sort",
  cursor: "cursor",
} as const;

export const DEFAULT_EVENT_FILTERS: EventFilters = {
  q: null,
  city: null,
  category: null,
  from: null,
  to: null,
  price: null,
  freeFood: false,
  sort: "nearest",
};

/** Maps UI sort names to the `sort` values documented by the Content API. */
const API_SORT: Record<EventSort, "startsAt" | "-updatedAt"> = {
  nearest: "startsAt",
  latest: "-updatedAt",
};

const SEARCH_MIN_LENGTH = 2;
const SEARCH_MAX_LENGTH = 100;
const CURSOR_MAX_LENGTH = 512;
const CATEGORY_PATTERN = /^[a-z0-9][a-z0-9-]{0,59}$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const firstValue = (
  input: EventSearchParamsInput,
  name: string,
): string | null => {
  if (input instanceof URLSearchParams) return input.get(name);
  const value = input[name];
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
};

export const normalizeSearchQuery = (value: string | null): string | null => {
  if (!value) return null;
  const normalized = value
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, SEARCH_MAX_LENGTH)
    .trim();
  return normalized.length >= SEARCH_MIN_LENGTH ? normalized : null;
};

/** Accepts only real calendar days in `YYYY-MM-DD` form. */
export const normalizeDateParam = (value: string | null): string | null => {
  const match = value?.trim().match(DATE_PATTERN);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  const valid =
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === Number(month) - 1 &&
    date.getUTCDate() === Number(day);
  return valid ? `${year}-${month}-${day}` : null;
};

/**
 * Cities offered by the filter (URL and API value). Labels live in the
 * `events.cities` message catalog. The Content API matches city names case
 * and diacritics insensitively, so ASCII slugs select e.g. "Zlín".
 */
export const EVENT_CITIES = [
  "brno",
  "praha",
  "ostrava",
  "olomouc",
  "zlin",
] as const;
export type EventCity = (typeof EVENT_CITIES)[number];

/** Case and diacritics insensitive comparison key. */
export const foldText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

/** Accepts only the offered cities (by slug or name); anything else means every city. */
export const normalizeCity = (value: string | null): EventCity | null => {
  if (!value) return null;
  const folded = foldText(value);
  return EVENT_CITIES.find((city) => city === folded) ?? null;
};

const normalizeCategory = (value: string | null): string | null => {
  const candidate = value?.trim().toLowerCase();
  return candidate && CATEGORY_PATTERN.test(candidate) ? candidate : null;
};

const normalizeCursor = (value: string | null): string | null => {
  const candidate = value?.trim();
  return candidate && candidate.length <= CURSOR_MAX_LENGTH ? candidate : null;
};

const isOneOf = <Value extends string>(
  value: string | null,
  allowed: readonly Value[],
): value is Value => value !== null && allowed.includes(value as Value);

/**
 * Parses untrusted URL search parameters. Invalid values are dropped so a
 * malformed shared link degrades to a broader listing instead of an error.
 */
export const parseEventListQuery = (
  input: EventSearchParamsInput,
): EventListQuery => {
  const price = firstValue(input, EVENT_FILTER_PARAM.price);
  const sort = firstValue(input, EVENT_FILTER_PARAM.sort);

  return {
    filters: {
      q: normalizeSearchQuery(firstValue(input, EVENT_FILTER_PARAM.q)),
      city: normalizeCity(firstValue(input, EVENT_FILTER_PARAM.city)),
      category: normalizeCategory(
        firstValue(input, EVENT_FILTER_PARAM.category),
      ),
      from: normalizeDateParam(firstValue(input, EVENT_FILTER_PARAM.from)),
      to: normalizeDateParam(firstValue(input, EVENT_FILTER_PARAM.to)),
      price: isOneOf(price, EVENT_PRICE_FILTERS) ? price : null,
      freeFood: firstValue(input, EVENT_FILTER_PARAM.freeFood) === "true",
      sort: isOneOf(sort, EVENT_SORTS) ? sort : DEFAULT_EVENT_FILTERS.sort,
    },
    cursor: normalizeCursor(firstValue(input, EVENT_FILTER_PARAM.cursor)),
  };
};

export const hasActiveEventFilters = (filters: EventFilters) =>
  Boolean(
    filters.q ||
    filters.city ||
    filters.category ||
    filters.from ||
    filters.to ||
    filters.price ||
    filters.freeFood ||
    filters.sort !== DEFAULT_EVENT_FILTERS.sort,
  );

/**
 * Serializes filters for page URLs. Defaults are omitted so the canonical,
 * unfiltered listing keeps a clean URL. The cursor is appended last and only
 * for pagination links.
 */
export const eventFiltersToSearchParams = (
  filters: EventFilters,
  cursor: string | null = null,
): URLSearchParams => {
  const params = new URLSearchParams();
  if (filters.q) params.set(EVENT_FILTER_PARAM.q, filters.q);
  if (filters.city) params.set(EVENT_FILTER_PARAM.city, filters.city);
  if (filters.category)
    params.set(EVENT_FILTER_PARAM.category, filters.category);
  if (filters.from) params.set(EVENT_FILTER_PARAM.from, filters.from);
  if (filters.to) params.set(EVENT_FILTER_PARAM.to, filters.to);
  if (filters.price) params.set(EVENT_FILTER_PARAM.price, filters.price);
  if (filters.freeFood) params.set(EVENT_FILTER_PARAM.freeFood, "true");
  if (filters.sort !== DEFAULT_EVENT_FILTERS.sort)
    params.set(EVENT_FILTER_PARAM.sort, filters.sort);
  if (cursor) params.set(EVENT_FILTER_PARAM.cursor, cursor);
  return params;
};

export const eventListHref = (
  basePath: string,
  filters: EventFilters,
  cursor: string | null = null,
) => {
  const query = eventFiltersToSearchParams(filters, cursor).toString();
  return query ? `${basePath}?${query}` : basePath;
};

type EventsApiQueryParams = {
  cursor?: string | null;
  limit?: number;
};

/** Builds the documented `GET /public/v1/events` query. */
export const toEventsApiQuery = (
  filters: EventFilters,
  { cursor = null, limit = EVENTS_PAGE_SIZE }: EventsApiQueryParams = {},
): URLSearchParams => {
  const params = new URLSearchParams({
    city: filters.city ?? ALL_CITIES,
    limit: String(Math.min(Math.max(Math.trunc(limit), 1), 100)),
    sort: API_SORT[filters.sort],
  });
  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category);
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.price)
    params.set("free", filters.price === "free" ? "true" : "false");
  // Only `true` is sent: `freeFood=false` would hide events whose food
  // availability is unknown, which must stay visible when the filter is off.
  if (filters.freeFood) params.set("freeFood", "true");
  if (cursor) params.set("cursor", cursor);
  return params;
};
