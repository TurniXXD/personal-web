import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { cn } from "cn";
import type { EventItem } from "@/lib/events/event-model";
import { formatEventDay, type EventLocale } from "@/lib/events/event-format";
import { optimizableEventImage } from "@/lib/events/event-images";

type EventCoverProps = {
  event: EventItem;
  locale: EventLocale;
  /** Empty for cards, where the title already names the image. */
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * CMS cover image (publication-cleared, per the API contract) or a quiet
 * placeholder built from the design system and the verified start date.
 */
export function EventCover({
  event,
  locale,
  alt,
  sizes,
  priority = false,
  className,
}: EventCoverProps) {
  const image = optimizableEventImage(event.imageUrl);
  const day = formatEventDay(event, locale);

  return (
    <div
      className={cn(
        "relative aspect-[16/9] overflow-hidden bg-surface-soft",
        event.status === "cancelled" && "opacity-70 grayscale",
        className,
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          className="grid h-full place-items-center border-b border-border-soft bg-[radial-gradient(circle,#dfe3fb_1px,transparent_1px)] bg-size-[1.1rem_1.1rem] text-primary"
          aria-hidden="true"
          data-event-cover-fallback
        >
          {day ? (
            <span className="grid min-w-[4.5rem] justify-items-center gap-0.5 rounded-[0.9rem] border border-border-card bg-card px-3 py-2 shadow-[0_10px_24px_rgba(47,59,125,0.06)]">
              <span className="text-[1.6rem] leading-none font-extrabold tracking-[-0.04em] text-ink-strong">
                {day.day}
              </span>
              <span className="font-mono text-ui-2xs font-bold tracking-ui text-[#4654d4] uppercase">
                {day.month}
              </span>
            </span>
          ) : (
            <CalendarDays size={28} />
          )}
        </div>
      )}
    </div>
  );
}
