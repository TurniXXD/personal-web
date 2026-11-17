"use client";

import { useId, type Dispatch, type SetStateAction } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { DateRange } from "react-day-picker";
import { cs, enUS } from "react-day-picker/locale";
import { cn } from "cn";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { EventCategory } from "@/lib/events/event-model";
import { toLocalDate } from "@/lib/events/event-date-values";
import type {
  EventFilters,
  EventPriceFilter,
  EventSort,
} from "@/lib/events/event-filters";

const fieldClasses = "grid min-w-0 content-start gap-[0.4rem]";
const labelClasses = "text-[0.75rem] leading-[1.4] font-bold text-[#434d70]";
export const controlClasses =
  "min-h-11 w-full min-w-0 rounded-[0.7rem] border border-[#dce2f5] bg-background px-[0.8rem] py-[0.6rem] text-[0.84rem] leading-normal text-ink transition-colors duration-150 hover:border-primary focus-visible:border-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]";

export type AdvancedFilters = Pick<EventFilters, "category" | "price" | "sort">;

/** Formats a calendar value for the filter summary, or the "not set" label. */
export function useEventDateFormatter() {
  const t = useTranslations("events.filters");
  const locale = useLocale();
  return (value: Date | string | null | undefined) => {
    const date = typeof value === "string" ? toLocalDate(value) : value;
    return date
      ? new Intl.DateTimeFormat(locale, {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }).format(date)
      : t("rangeNotSet");
  };
}

type EventDateRangeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  /** Today in Prague as `YYYY-MM-DD`; earlier days are disabled. */
  today: string;
  onApply: () => void;
};

export function EventDateRangeDialog({
  open,
  onOpenChange,
  range,
  onRangeChange,
  today,
  onApply,
}: EventDateRangeDialogProps) {
  const t = useTranslations("events.filters");
  const locale = useLocale();
  const formatDate = useEventDateFormatter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              ["from", t("fromLabel"), range?.from],
              ["to", t("toLabel"), range?.to ?? range?.from],
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
          selected={range}
          onSelect={onRangeChange}
          locale={locale === "cs" ? cs : enUS}
          weekStartsOn={1}
          defaultMonth={range?.from ?? toLocalDate(today)}
          disabled={{ before: toLocalDate(today)! }}
        />
        <div className="flex items-center justify-end gap-2 border-t border-border-soft pt-4">
          <DialogClose className="cursor-pointer inline-flex min-h-11 items-center rounded-full px-4 text-ui-sm font-bold text-ink-muted transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]">
            {t("rangeCancel")}
          </DialogClose>
          <button
            type="button"
            onClick={onApply}
            disabled={!range?.from}
            className="cursor-pointer inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-ui-sm font-bold text-white transition-colors hover:bg-[#4656cb] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {t("rangeApply")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type EventAdvancedFiltersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: AdvancedFilters;
  onFiltersChange: Dispatch<SetStateAction<AdvancedFilters>>;
  categoryOptions: EventCategory[];
  onApply: () => void;
};

export function EventAdvancedFiltersDialog({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  categoryOptions,
  onApply,
}: EventAdvancedFiltersDialogProps) {
  const t = useTranslations("events.filters");
  const id = useId();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              value={filters.category ?? ""}
              onChange={(event) =>
                onFiltersChange((current) => ({
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
              value={filters.price ?? ""}
              onChange={(event) =>
                onFiltersChange((current) => ({
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
              value={filters.sort}
              onChange={(event) =>
                onFiltersChange((current) => ({
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
            onClick={onApply}
            className="cursor-pointer inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-ui-sm font-bold text-white transition-colors hover:bg-[#4656cb] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]"
          >
            {t("advancedApply")}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
