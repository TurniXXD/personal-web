import type { ReactNode } from "react";
import { CalendarDays, CircleAlert, SearchX } from "lucide-react";

type EventsStateProps = {
  kind: "empty" | "filtered-empty" | "error";
  title: string;
  description: string;
  action?: ReactNode;
};

const ICONS = {
  empty: CalendarDays,
  "filtered-empty": SearchX,
  error: CircleAlert,
} as const;

/** Shared empty and failure message for event listings. */
export function EventsState({
  kind,
  title,
  description,
  action,
}: EventsStateProps) {
  const Icon = ICONS[kind];
  return (
    <div
      data-events-state={kind}
      role={kind === "error" ? "alert" : undefined}
      className="grid justify-items-center gap-3 rounded-[1.35rem] border border-dashed border-border-card bg-card px-6 py-12 text-center"
    >
      <span className="grid size-12 place-items-center rounded-[0.9rem] bg-secondary text-primary">
        <Icon size={22} aria-hidden="true" />
      </span>
      <h3 className="m-0 text-[1.15rem] font-semibold tracking-[-0.03em] text-ink-strong">
        {title}
      </h3>
      <p className="m-0 max-w-[32rem] text-body-sm leading-copy text-[#596484]">
        {description}
      </p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
