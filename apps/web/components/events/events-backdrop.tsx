import { TechnicalBackground } from "@/components/shared/technical-background";

type EventsBackdropProps = { className?: string };

/**
 * Decorative header backdrop shared by the events pages: the site's masked
 * grid (as in homepage sections) plus the ambient technical shapes that
 * slide in on scroll. Place inside a positioned container.
 */
export function EventsBackdrop({ className }: EventsBackdropProps) {
  return (
    <div
      aria-hidden="true"
      data-events-backdrop
      className={[
        "pointer-events-none absolute inset-x-0 top-0 z-0 [mask-image:linear-gradient(#000_65%,transparent)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(95,108,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(95,108,255,0.1)_1px,transparent_1px)] bg-size-[4.5rem_4.5rem] opacity-65 [mask-composite:intersect] [mask-image:linear-gradient(90deg,#000,transparent_40%,transparent_60%,#000),linear-gradient(#000_55%,transparent)]" />
      <TechnicalBackground variant="events" />
    </div>
  );
}
