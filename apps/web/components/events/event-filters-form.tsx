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
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Pizza,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { DateRange } from "react-day-picker";
import { cs, enUS } from "react-day-picker/locale";
import { cn } from "cn";
import { CityCombobox } from "@/components/events/city-combobox";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EventCategory } from "@/lib/events/event-model";
import {
  datePresetForRange,
  dateRangeForPreset,
  todayInPrague,
  type EventDatePreset,
} from "@/lib/events/event-date-presets";
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

/** `YYYY-MM-DD` URL values to local calendar dates and back. */
const toLocalDate = (value: string | null) => {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};
const toDateValue = (date: Date | undefined) =>
  date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : null;

type AdvancedFilters = Pick<EventFilters, "category" | "price" | "sort">;
const pickAdvanced = ({ category, price, sort }: EventFilters) => ({
  category,
  price,
  sort,
});

const DATE_SHORT_LABEL = {
  all: "dateAllShort",
  week: "dateWeekShort",
  month: "dateMonthShort",
  custom: "dateCustomShort",
} as const satisfies Record<EventDatePreset, string>;

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
  const locale = useLocale();
  const router = useRouter();
  const id = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingHrefRef = useRef<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [draft, setDraft] = useState<EventFilters>(filters);
  const [searchText, setSearchText] = useState(filters.q ?? "");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [dateMode, setDateMode] = useState<EventDatePreset>(() =>
    datePresetForRange(filters.from, filters.to, todayInPrague()),
  );
  const [rangeOpen, setRangeOpen] = useState(false);
  const [rangeDraft, setRangeDraft] = useState<DateRange | undefined>();
  const [advancedDraft, setAdvancedDraft] = useState<AdvancedFilters>(() =>
    pickAdvanced(filters),
  );
  const filtersKey = eventListHref(basePath, filters);
  const today = todayInPrague();

  // Follow URL changes (back/forward, reset) without overwriting active typing.
  useEffect(() => {
    const localNavigation = pendingHrefRef.current === filtersKey;
    if (pendingHrefRef.current && !localNavigation) return;
    pendingHrefRef.current = null;
    setDraft(filters);
    if (!localNavigation) {
      setDateMode(
        datePresetForRange(filters.from, filters.to, todayInPrague()),
      );
    }
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
    pendingHrefRef.current = href;
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
    setDateMode("all");
    navigate(DEFAULT_EVENT_FILTERS);
  };

  const onDatePresetChange = (value: EventDatePreset) => {
    if (value === "custom") {
      openRangeDialog();
      return;
    }
    setDateMode(value);
    navigate({ ...draft, q: typedQuery, ...dateRangeForPreset(value, today) });
  };

  const openRangeDialog = () => {
    const from = toLocalDate(draft.from);
    setRangeDraft(from ? { from, to: toLocalDate(draft.to) } : undefined);
    setRangeOpen(true);
  };

  const applyRange = () => {
    if (!rangeDraft?.from) return;
    setDateMode("custom");
    setRangeOpen(false);
    navigate({
      ...draft,
      q: typedQuery,
      from: toDateValue(rangeDraft.from),
      // A single picked day filters just that day.
      to: toDateValue(rangeDraft.to ?? rangeDraft.from),
    });
  };

  const openAdvancedDialog = () => {
    setAdvancedDraft(pickAdvanced(draft));
    setAdvancedOpen(true);
  };

  const applyAdvanced = () => {
    setAdvancedOpen(false);
    navigate({ ...draft, q: typedQuery, ...advancedDraft });
  };

  const formatDate = (value: Date | string | null | undefined) => {
    const date = typeof value === "string" ? toLocalDate(value) : value;
    return date
      ? new Intl.DateTimeFormat(locale, {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }).format(date)
      : t("rangeNotSet");
  };

  const active = hasActiveEventFilters(draft) || typedQuery !== null;
  const advancedCount =
    Number(Boolean(draft.category)) +
    Number(Boolean(draft.price)) +
    Number(draft.sort !== DEFAULT_EVENT_FILTERS.sort);
  const collator = new Intl.Collator(locale, { sensitivity: "base" });
  const cityOptions = EVENT_CITIES.map((city) => ({
    value: city,
    label: tCities(city),
  })).sort((a, b) => collator.compare(a.label, b.label));
  // Keep a category that is selected but missing from the CMS list usable.
  const categoryOptions = [...categories];
  if (
    draft.category &&
    !categories.some((category) => category.slug === draft.category)
  ) {
    categoryOptions.push({ slug: draft.category, label: draft.category });
  }
  categoryOptions.sort((a, b) => collator.compare(a.label, b.label));
  const selectedCategory = categoryOptions.find(
    (category) => category.slug === draft.category,
  )?.label;

  return (
    <form
      action={basePath}
      method="get"
      role="search"
      aria-label={t("legend")}
      aria-busy={isPending}
      onSubmit={onSubmit}
      data-event-filters
      className="mt-6 grid gap-3 rounded-[1.35rem] border border-border-card bg-card p-4 shadow-[0_16px_40px_rgba(47,59,125,0.045)] sm:p-5"
    >
      <div className="flex min-w-0 items-center gap-2">
        <label htmlFor={`${id}-q`} className="sr-only">
          {t("searchLabel")}
        </label>
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
            value={searchText}
            onChange={(event) => onSearchChange(event.target.value)}
            className={cn(controlClasses, "pr-12 pl-9")}
          />
          <button
            type="submit"
            aria-label={t("searchSubmit")}
            className="cursor-pointer absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-[0.55rem] bg-secondary text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={advancedOpen}
          onClick={openAdvancedDialog}
          className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-[0.7rem] border border-border-card bg-background px-3 text-ui-sm font-bold text-ink-strong transition-colors hover:border-primary hover:text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]"
        >
          <SlidersHorizontal size={16} aria-hidden="true" />
          {t("advanced")}
          {advancedCount ? (
            <span className="grid size-5 place-items-center rounded-full bg-primary text-[0.65rem] leading-none text-white">
              {advancedCount}
            </span>
          ) : null}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
        <div className="min-w-0">
          <label
            id={`${id}-city-label`}
            htmlFor={`${id}-city`}
            className="sr-only"
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
              placeholderShort: t("cityPlaceholderShort"),
              allCities: t("cityPlaceholder"),
              noResults: t("cityNoResults"),
              clear: t("cityClear"),
            }}
            onChange={(city) => update("city", city)}
          />
        </div>
        <div className="relative min-w-0">
          <label htmlFor={`${id}-date-preset`} className="sr-only">
            {t("dateLabel")}
          </label>
          <CalendarDays
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-ink-muted sm:left-3"
          />
          <select
            id={`${id}-date-preset`}
            value={rangeOpen ? "custom" : dateMode}
            onChange={(event) =>
              onDatePresetChange(event.target.value as EventDatePreset)
            }
            className={cn(
              controlClasses,
              // Phones show a short overlay label; the full label needs more room.
              "cursor-pointer appearance-none truncate pr-7 pl-8 text-[0.75rem] max-sm:text-transparent sm:pl-9 sm:text-[0.84rem] [&>option]:text-ink",
            )}
          >
            <option value="all">{t("dateAll")}</option>
            <option value="week">{t("dateWeek")}</option>
            <option value="month">{t("dateMonth")}</option>
            <option value="custom">{t("dateCustom")}</option>
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-7 left-8 -translate-y-1/2 truncate text-[0.75rem] text-ink sm:hidden"
          >
            {t(DATE_SHORT_LABEL[rangeOpen ? "custom" : dateMode])}
          </span>
          <ChevronDown
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-ink-muted"
          />
        </div>
        <label
          htmlFor={`${id}-free-food`}
          className="col-span-2 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-border-card bg-background px-3 text-ui-sm font-bold text-ink-strong transition-colors hover:border-primary has-checked:border-primary has-checked:bg-secondary has-checked:text-primary has-focus-visible:outline-[3px] has-focus-visible:outline-offset-2 has-focus-visible:outline-[#5f6cff40] lg:col-span-1"
        >
          <input
            id={`${id}-free-food`}
            name={EVENT_FILTER_PARAM.freeFood}
            type="checkbox"
            value="true"
            checked={draft.freeFood}
            onChange={(event) => update("freeFood", event.target.checked)}
            className="size-4 cursor-pointer accent-primary"
          />
          <Pizza size={16} aria-hidden="true" />
          {t("freeFoodLabel")}
        </label>
      </div>

      {/* Carry the date range for GET submits without JavaScript. */}
      <input
        type="hidden"
        name={EVENT_FILTER_PARAM.from}
        value={draft.from ?? ""}
      />
      <input
        type="hidden"
        name={EVENT_FILTER_PARAM.to}
        value={draft.to ?? ""}
      />
      {/* The dialog selects are portaled out of the form; these carry them. */}
      <input
        type="hidden"
        name={EVENT_FILTER_PARAM.category}
        value={draft.category ?? ""}
      />
      <input
        type="hidden"
        name={EVENT_FILTER_PARAM.price}
        value={draft.price ?? ""}
      />
      <input type="hidden" name={EVENT_FILTER_PARAM.sort} value={draft.sort} />

      <Dialog open={rangeOpen} onOpenChange={setRangeOpen}>
        <DialogContent
          closeLabel={t("rangeClose")}
          data-custom-date-range
          // Start on the dialog itself instead of the previous-month button.
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            (event.currentTarget as HTMLElement).focus();
          }}
        >
          <div className="grid gap-1 pr-10">
            <DialogTitle className="m-0 text-[1.2rem] leading-[1.25] font-bold tracking-[-0.03em] text-ink-strong">
              {t("rangeTitle")}
            </DialogTitle>
            <DialogDescription className="m-0 text-ui-sm text-ink-muted">
              {t("rangeDescription")}
            </DialogDescription>
          </div>
          <div className="grid grid-cols-2 gap-2" aria-live="polite">
            {(
              [
                ["from", t("fromLabel"), rangeDraft?.from],
                ["to", t("toLabel"), rangeDraft?.to ?? rangeDraft?.from],
              ] as const
            ).map(([key, label, value]) => (
              <div
                key={key}
                data-range-value={key}
                className={cn(
                  "grid gap-0.5 rounded-[0.9rem] border px-3.5 py-2.5 transition-colors",
                  value
                    ? "border-primary bg-secondary"
                    : "border-border-card bg-background",
                )}
              >
                <span className="text-[0.68rem] font-bold tracking-[0.06em] text-ink-soft uppercase">
                  {label}
                </span>
                <span
                  className={cn(
                    "text-[0.95rem] font-bold",
                    value ? "text-primary" : "text-ink-soft",
                  )}
                >
                  {formatDate(value)}
                </span>
              </div>
            ))}
          </div>
          <Calendar
            mode="range"
            resetOnSelect
            selected={rangeDraft}
            onSelect={setRangeDraft}
            locale={locale === "cs" ? cs : enUS}
            weekStartsOn={1}
            defaultMonth={rangeDraft?.from ?? toLocalDate(today)}
            disabled={{ before: toLocalDate(today)! }}
          />
          <div className="flex items-center justify-end gap-2 border-t border-border-soft pt-4">
            <DialogClose className="cursor-pointer inline-flex min-h-11 items-center rounded-full px-4 text-ui-sm font-bold text-ink-muted transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]">
              {t("rangeCancel")}
            </DialogClose>
            <button
              type="button"
              onClick={applyRange}
              disabled={!rangeDraft?.from}
              className="cursor-pointer inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-ui-sm font-bold text-white transition-colors hover:bg-[#4656cb] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {t("rangeApply")}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <DialogContent closeLabel={t("advancedClose")} data-advanced-filters>
          <div className="grid gap-1 pr-10">
            <DialogTitle className="m-0 text-[1.2rem] leading-[1.25] font-bold tracking-[-0.03em] text-ink-strong">
              {t("advancedTitle")}
            </DialogTitle>
            <DialogDescription className="m-0 text-ui-sm text-ink-muted">
              {t("advancedDescription")}
            </DialogDescription>
          </div>
          <div className="grid gap-3">
            <div className={fieldClasses}>
              <label htmlFor={`${id}-category`} className={labelClasses}>
                {t("categoryLabel")}
              </label>
              <select
                id={`${id}-category`}
                value={advancedDraft.category ?? ""}
                onChange={(event) =>
                  setAdvancedDraft((current) => ({
                    ...current,
                    category: event.target.value || null,
                  }))
                }
                className={cn(controlClasses, "cursor-pointer")}
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
              <label htmlFor={`${id}-price`} className={labelClasses}>
                {t("priceLabel")}
              </label>
              <select
                id={`${id}-price`}
                value={advancedDraft.price ?? ""}
                onChange={(event) =>
                  setAdvancedDraft((current) => ({
                    ...current,
                    price: (event.target.value ||
                      null) as EventPriceFilter | null,
                  }))
                }
                className={cn(controlClasses, "cursor-pointer")}
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
                value={advancedDraft.sort}
                onChange={(event) =>
                  setAdvancedDraft((current) => ({
                    ...current,
                    sort: event.target.value as EventSort,
                  }))
                }
                className={cn(controlClasses, "cursor-pointer")}
              >
                <option value="nearest">{t("sortNearest")}</option>
                <option value="latest">{t("sortLatest")}</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-border-soft pt-4">
            <DialogClose className="cursor-pointer inline-flex min-h-11 items-center rounded-full px-4 text-ui-sm font-bold text-ink-muted transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]">
              {t("advancedCancel")}
            </DialogClose>
            <button
              type="button"
              onClick={applyAdvanced}
              className="cursor-pointer inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-ui-sm font-bold text-white transition-colors hover:bg-[#4656cb] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]"
            >
              {t("advancedApply")}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-wrap items-center gap-2 empty:hidden">
        {dateMode === "custom" && (draft.from || draft.to) ? (
          <button
            type="button"
            onClick={openRangeDialog}
            aria-label={`${t("rangeEdit")}: ${formatDate(draft.from)} – ${formatDate(draft.to)}`}
            className="cursor-pointer inline-flex min-h-9 items-center gap-1.5 rounded-full bg-secondary px-3 text-ui-xs font-bold text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]"
          >
            <CalendarDays size={13} aria-hidden="true" />
            {formatDate(draft.from)} – {formatDate(draft.to)}
          </button>
        ) : null}
        {draft.category ? (
          <button
            type="button"
            onClick={() => update("category", null)}
            aria-label={`${t("removeFilter")} ${t("categoryLabel")}`}
            className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full bg-secondary px-3 text-ui-xs font-bold text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]"
          >
            {t("categoryLabel")}: {selectedCategory}
            <X size={12} aria-hidden="true" />
          </button>
        ) : null}
        {draft.price ? (
          <button
            type="button"
            onClick={() => update("price", null)}
            aria-label={`${t("removeFilter")} ${t("priceLabel")}`}
            className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full bg-secondary px-3 text-ui-xs font-bold text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]"
          >
            {t("priceLabel")}:{" "}
            {draft.price === "free" ? t("priceFree") : t("pricePaid")}
            <X size={12} aria-hidden="true" />
          </button>
        ) : null}
        {draft.sort !== DEFAULT_EVENT_FILTERS.sort ? (
          <button
            type="button"
            onClick={() => update("sort", DEFAULT_EVENT_FILTERS.sort)}
            aria-label={`${t("removeFilter")} ${t("sortLabel")}`}
            className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full bg-secondary px-3 text-ui-xs font-bold text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]"
          >
            {t("sortLabel")}: {t("sortLatest")}
            <X size={12} aria-hidden="true" />
          </button>
        ) : null}
        {isPending ? (
          <span
            role="status"
            aria-live="polite"
            className="text-ui-xs text-ink-muted"
          >
            {t("updating")}
          </span>
        ) : null}
        {active ? (
          <a
            href={basePath}
            onClick={(event) => {
              event.preventDefault();
              onReset();
            }}
            className="ml-auto inline-flex min-h-9 items-center gap-1.5 text-ui-sm font-bold text-[#4656cb] underline underline-offset-[0.18em] hover:text-primary"
          >
            <RotateCcw size={14} aria-hidden="true" />
            {t("reset")}
          </a>
        ) : null}
      </div>
      {searchText.trim().length === 1 ? (
        <small className="text-ui-xs text-ink-muted">{t("searchHint")}</small>
      ) : null}
    </form>
  );
}
