export type EventDatePreset = "all" | "week" | "month" | "custom";
type EventDateRange = { from: string | null; to: string | null };

const dateParts = (value: string) => value.split("-").map(Number);
const utcDay = (value: string) => {
  const [year, month, day] = dateParts(value);
  return new Date(Date.UTC(year, month - 1, day));
};
const dateString = (date: Date) => date.toISOString().slice(0, 10);

/** Civil date in the site's Prague time zone, independent of browser locale. */
export const todayInPrague = (now: Date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
};

/** Presets reuse the existing inclusive `from`/`to` URL and API fields. */
export const dateRangeForPreset = (
  preset: Exclude<EventDatePreset, "custom">,
  today: string,
): EventDateRange => {
  if (preset === "all") return { from: null, to: null };
  const start = utcDay(today);
  if (preset === "week") {
    const end = new Date(start);
    end.setUTCDate(start.getUTCDate() + ((7 - start.getUTCDay()) % 7));
    return { from: today, to: dateString(end) };
  }
  const [year, month] = dateParts(today);
  return {
    from: today,
    to: dateString(new Date(Date.UTC(year, month, 0))),
  };
};

export const datePresetForRange = (
  from: string | null,
  to: string | null,
  today: string,
): EventDatePreset => {
  if (!from && !to) return "all";
  for (const preset of ["week", "month"] as const) {
    const range = dateRangeForPreset(preset, today);
    if (from === range.from && to === range.to) return preset;
  }
  return "custom";
};
