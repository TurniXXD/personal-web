"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "cn";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      data-slot="calendar"
      showOutsideDays={showOutsideDays}
      className={cn("w-full", className)}
      classNames={{
        root: "relative",
        months: "relative flex flex-col gap-6 sm:flex-row",
        month: "grid w-full gap-3",
        month_caption:
          "flex h-10 items-center justify-center px-12 text-[0.95rem] font-bold tracking-[-0.02em] text-ink-strong capitalize",
        caption_label: "",
        nav: "absolute inset-x-0 top-0 z-[1] flex h-10 items-center justify-between",
        button_previous:
          "grid size-10 place-items-center rounded-full border border-border-card bg-background text-ink-strong transition-colors hover:border-primary hover:text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40] disabled:opacity-40",
        button_next:
          "grid size-10 place-items-center rounded-full border border-border-card bg-background text-ink-strong transition-colors hover:border-primary hover:text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40] disabled:opacity-40",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "flex-1 pb-2 text-center text-[0.7rem] font-bold tracking-[0.08em] text-ink-soft uppercase",
        weeks: "grid gap-1",
        week: "flex",
        day: "group/day relative flex h-10 flex-1 items-center sm:h-11 justify-center p-0 text-center",
        day_button:
          "relative z-[1] grid size-10 place-items-center sm:size-11 rounded-full text-[0.86rem] text-ink transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40] group-data-[selected=true]/day:font-bold",
        today:
          "[&>button]:font-bold [&>button]:text-primary [&>button]:after:absolute [&>button]:after:bottom-1.5 [&>button]:after:size-1 [&>button]:after:rounded-full [&>button]:after:bg-current",
        selected: "",
        range_start:
          "before:absolute before:inset-y-0.5 before:right-0 before:left-1/2 before:bg-secondary [&>button]:bg-primary [&>button]:text-white [&>button]:shadow-[0_8px_20px_rgba(95,108,255,0.35)] [&>button]:hover:bg-primary [&>button]:hover:text-white",
        range_end:
          "before:absolute before:inset-y-0.5 before:right-1/2 before:left-0 before:bg-secondary [&>button]:bg-primary [&>button]:text-white [&>button]:shadow-[0_8px_20px_rgba(95,108,255,0.35)] [&>button]:hover:bg-primary [&>button]:hover:text-white",
        range_middle:
          "before:absolute before:inset-x-0 before:inset-y-0.5 before:bg-secondary [&>button]:text-primary",
        outside: "[&>button]:text-ink-soft/60",
        disabled: "[&>button]:pointer-events-none [&>button]:opacity-35",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName }) =>
          orientation === "left" ? (
            <ChevronLeft
              size={18}
              aria-hidden="true"
              className={chevronClassName}
            />
          ) : (
            <ChevronRight
              size={18}
              aria-hidden="true"
              className={chevronClassName}
            />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };
