import { Ban, Clock, Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import type { EventItem } from "@/lib/events/event-model";
import { describeEventPrice } from "@/lib/events/event-format";
import { hasVerifiedFreeFood } from "@/lib/events/event-mapping";

// Plain join: tailwind-merge treats the custom `text-ui-*` size tokens as
// colors and would drop them next to a text color utility.
const classes = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

const badgeClasses =
  "inline-flex min-h-6 items-center gap-1 rounded-full px-2.5 py-1 text-ui-xs leading-none font-bold";

type EventCategoryBadgeProps = { label: string };

export function EventCategoryBadge({ label }: EventCategoryBadgeProps) {
  return (
    <span className={classes(badgeClasses, "bg-secondary text-primary")}>
      {label}
    </span>
  );
}

type EventStatusBadgeProps = { status: EventItem["status"] };

export function EventStatusBadge({ status }: EventStatusBadgeProps) {
  const t = useTranslations("events.card.status");
  if (status === "scheduled") return null;
  const Icon = status === "cancelled" ? Ban : Clock;
  return (
    <span
      data-event-status-badge={status}
      className={classes(
        badgeClasses,
        status === "cancelled"
          ? "bg-[#fdecef] text-destructive"
          : "bg-[#fff4e0] text-[#8a5300]",
      )}
    >
      <Icon size={12} aria-hidden="true" />
      {t(status)}
    </span>
  );
}

type EventPriceBadgeProps = {
  event: Pick<EventItem, "isFree">;
};

/** Cards only highlight free admission; paid or unknown pricing shows nothing. */
export function EventPriceBadge({ event }: EventPriceBadgeProps) {
  const t = useTranslations("events.card");
  if (describeEventPrice(event).kind !== "free") return null;
  return (
    <span
      data-event-price="free"
      className={classes(badgeClasses, "bg-[#e8f7ef] text-[#17673d]")}
    >
      <Ticket size={12} aria-hidden="true" />
      {t("free")}
    </span>
  );
}

type EventFreeFoodBadgeProps = { event: Pick<EventItem, "freeFood"> };

/** Shown only for `freeFood: "yes"`; unknown or "no" never renders a badge. */
export function EventFreeFoodBadge({ event }: EventFreeFoodBadgeProps) {
  const t = useTranslations("events.card");
  if (!hasVerifiedFreeFood(event)) return null;
  return (
    <span
      data-free-food-badge
      className={classes(badgeClasses, "bg-[#fff4e8] text-[#8a4b12]")}
    >
      <span aria-hidden="true">🍕</span>
      {t("freeFood")}
    </span>
  );
}
