"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import { Pizza, RotateCcw, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "cn";
import { CityCombobox } from "@/components/events/city-combobox";
import type { EventCategory } from "@/lib/events/event-model";
import {
  DEFAULT_EVENT_FILTERS,
  EVENT_FILTER_PARAM,
  eventListHref,
  hasActiveEventFilters,
  EVENT_CITIES,
  normalizeSearchQuery,
  type EventFilters,
  type EventPriceFilter,
  type EventSort,
} from "@/lib/events/event-filters";

const SEARCH_DEBOUNCE_MS = 350;

type EventFiltersFormProps = {
  /** Localized listing path, e.g. `/akce/brno` or `/en/akce/brno`. */
  basePath: string;
  filters: EventFilters;
  categories: EventCategory[];
};

const fieldClasses = "grid min-w-0 content-start gap-[0.4rem]";
const labelClasses = "text-[0.75rem] leading-[1.4] font-bold text-[#434d70]";
const controlClasses =
  "min-h-11 w-full min-w-0 rounded-[0.7rem] border border-[#dce2f5] bg-background px-[0.8rem] py-[0.6rem] text-[0.84rem] leading-normal text-ink transition-colors duration-150 hover:border-primary focus-visible:border-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]";

/**
 * Filter state lives in the URL. Without JavaScript the form submits as a
 * normal GET request; with JavaScript, changes apply immediately and search
 * is debounced. Filtering always happens server-side through the API.
 */
export function EventFiltersForm({
  basePath,
  filters,
  categories,
}: EventFiltersFormProps) {
  const t = useTranslations("events.filters");
  const tCities = useTranslations("events.cities");
  const router = useRouter();
  const id = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPending, startTransition] = useTransition();
  const [draft, setDraft] = useState<EventFilters>(filters);
  const [searchText, setSearchText] = useState(filters.q ?? "");
  const filtersKey = eventListHref(basePath, filters);

  // Follow URL changes (back/forward, reset) without overwriting active typing.
  useEffect(() => {
    setDraft(filters);
    if (document.activeElement !== searchRef.current) {
      setSearchText(filters.q ?? "");
    }
    // `filtersKey` captures every filter value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey]);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  const navigate = (next: EventFilters, mode: "push" | "replace" = "push") => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setDraft(next);
    // Any filter change starts again from the first page (no cursor).
    const href = eventListHref(basePath, next);
    if (href === filtersKey) return;
    startTransition(() => {
      if (mode === "replace") router.replace(href, { scroll: false });
      else router.push(href, { scroll: false });
    });
  };

  const typedQuery = normalizeSearchQuery(searchText);

  const update = <Key extends keyof EventFilters>(
    key: Key,
    value: EventFilters[Key],
  ) => navigate({ ...draft, q: typedQuery, [key]: value });

  const onSearchChange = (value: string) => {
    setSearchText(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      navigate({ ...draft, q: normalizeSearchQuery(value) }, "replace");
    }, SEARCH_DEBOUNCE_MS);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate({ ...draft, q: typedQuery });
  };

  const onReset = () => {
    setSearchText("");
    navigate(DEFAULT_EVENT_FILTERS);
  };

  const active = hasActiveEventFilters(draft) || typedQuery !== null;
  const cityOptions = EVENT_CITIES.map((city) => ({
    value: city,
    label: tCities(city),
  }));
  // Keep a category that is selected but missing from the CMS list usable.
  const categoryOptions =
    draft.category &&
    !categories.some((category) => category.slug === draft.category)
      ? [...categories, { slug: draft.category, label: draft.category }]
      : categories;

  return (
    <form
      action={basePath}
      method="get"
      role="search"
      aria-label={t("legend")}
      aria-busy={isPending}
      onSubmit={onSubmit}
      data-event-filters
      className="mt-8 grid gap-4 rounded-[1.35rem] border border-border-card bg-card p-4 shadow-[0_16px_40px_rgba(47,59,125,0.045)] sm:p-5"
    >
      <div className={fieldClasses}>
        <label htmlFor={`${id}-q`} className={labelClasses}>
          {t("searchLabel")}
        </label>
        <div className="flex min-w-0 gap-2">
          <div className="relative min-w-0 flex-1">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-muted"
            />
            <input
              ref={searchRef}
              id={`${id}-q`}
              name={EVENT_FILTER_PARAM.q}
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              maxLength={100}
              placeholder={t("searchPlaceholder")}
              aria-describedby={`${id}-q-hint`}
              value={searchText}
              onChange={(event) => onSearchChange(event.target.value)}
              className={cn(controlClasses, "pl-9")}
            />
          </div>
          <button
            type="submit"
            className="ui-action ui-action--primary min-h-11 shrink-0 px-4 text-ui-sm"
          >
            {t("searchSubmit")}
          </button>
        </div>
        <small id={`${id}-q-hint`} className="text-ui-xs text-ink-muted">
          {t("searchHint")}
        </small>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 lg:grid-cols-6">
        <div className={fieldClasses}>
          <label
            id={`${id}-city-label`}
            htmlFor={`${id}-city`}
            className={labelClasses}
          >
            {t("cityLabel")}
          </label>
          {/* The visible combobox has no name; this carries the slug for GET submits. */}
          <input
            type="hidden"
            name={EVENT_FILTER_PARAM.city}
            value={draft.city ?? ""}
          />
          <CityCombobox
            id={`${id}-city`}
            value={draft.city}
            options={cityOptions}
            labels={{
              placeholder: t("cityPlaceholder"),
              allCities: t("cityPlaceholder"),
              noResults: t("cityNoResults"),
              clear: t("cityClear"),
            }}
            onChange={(city) => update("city", city)}
          />
        </div>
        <div className={fieldClasses}>
          <label htmlFor={`${id}-category`} className={labelClasses}>
            {t("categoryLabel")}
          </label>
          <select
            id={`${id}-category`}
            name={EVENT_FILTER_PARAM.category}
            value={draft.category ?? ""}
            onChange={(event) => update("category", event.target.value || null)}
            className={controlClasses}
          >
            <option value="">{t("categoryAll")}</option>
            {categoryOptions.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div className={fieldClasses}>
          <label htmlFor={`${id}-from`} className={labelClasses}>
            {t("fromLabel")}
          </label>
          <input
            id={`${id}-from`}
            name={EVENT_FILTER_PARAM.from}
            type="date"
            value={draft.from ?? ""}
            max={draft.to ?? undefined}
            onChange={(event) => update("from", event.target.value || null)}
            className={controlClasses}
          />
        </div>
        <div className={fieldClasses}>
          <label htmlFor={`${id}-to`} className={labelClasses}>
            {t("toLabel")}
          </label>
          <input
            id={`${id}-to`}
            name={EVENT_FILTER_PARAM.to}
            type="date"
            value={draft.to ?? ""}
            min={draft.from ?? undefined}
            onChange={(event) => update("to", event.target.value || null)}
            className={controlClasses}
          />
        </div>
        <div className={fieldClasses}>
          <label htmlFor={`${id}-price`} className={labelClasses}>
            {t("priceLabel")}
          </label>
          <select
            id={`${id}-price`}
            name={EVENT_FILTER_PARAM.price}
            value={draft.price ?? ""}
            onChange={(event) =>
              update(
                "price",
                (event.target.value || null) as EventPriceFilter | null,
              )
            }
            className={controlClasses}
          >
            <option value="">{t("priceAll")}</option>
            <option value="free">{t("priceFree")}</option>
            <option value="paid">{t("pricePaid")}</option>
          </select>
        </div>
        <div className={fieldClasses}>
          <label htmlFor={`${id}-sort`} className={labelClasses}>
            {t("sortLabel")}
          </label>
          <select
            id={`${id}-sort`}
            name={EVENT_FILTER_PARAM.sort}
            value={draft.sort}
            onChange={(event) =>
              update("sort", event.target.value as EventSort)
            }
            className={controlClasses}
          >
            <option value="nearest">{t("sortNearest")}</option>
            <option value="latest">{t("sortLatest")}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label
          htmlFor={`${id}-free-food`}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-[#dce2f5] bg-background py-2 pr-4 pl-3 text-ui-sm font-bold text-[#434d70] transition-colors duration-150 hover:border-primary has-checked:border-primary has-checked:bg-secondary has-checked:text-primary has-focus-visible:outline-[3px] has-focus-visible:outline-offset-2 has-focus-visible:outline-[#5f6cff40]"
        >
          <input
            id={`${id}-free-food`}
            name={EVENT_FILTER_PARAM.freeFood}
            type="checkbox"
            value="true"
            checked={draft.freeFood}
            onChange={(event) => update("freeFood", event.target.checked)}
            className="size-4 accent-primary"
          />
          <Pizza size={16} aria-hidden="true" />
          {t("freeFoodLabel")}
        </label>
        <div className="flex items-center gap-4">
          <span
            role="status"
            aria-live="polite"
            className="text-ui-xs text-ink-muted"
          >
            {isPending ? t("updating") : ""}
          </span>
          {active ? (
            <a
              href={basePath}
              onClick={(event) => {
                event.preventDefault();
                onReset();
              }}
              className="inline-flex min-h-11 items-center gap-1.5 text-ui-sm font-bold text-[#4656cb] underline underline-offset-[0.18em] hover:text-primary"
            >
              <RotateCcw size={14} aria-hidden="true" />
              {t("reset")}
            </a>
          ) : null}
        </div>
      </div>
    </form>
  );
}
