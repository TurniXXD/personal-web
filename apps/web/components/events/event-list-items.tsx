import { EventCard } from "@/components/events/event-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import type { EventLocale } from "@/lib/events/event-format";
import type { EventItem } from "@/lib/events/event-model";

type EventListItemsProps = {
  events: EventItem[];
  locale: EventLocale;
  categoryLabels: Record<string, string>;
};

/** Grid items for one API page; also rendered by the load-more action. */
export function EventListItems({
  events,
  locale,
  categoryLabels,
}: EventListItemsProps) {
  return events.map((event, index) => (
    <li key={event.slug} className="min-w-0">
      {/* Cards reveal per row, staggered by column (max four columns). */}
      <ScrollReveal className="h-full" delay={(index % 4) * 70}>
        <EventCard
          event={event}
          locale={locale}
          categoryLabels={categoryLabels}
        />
      </ScrollReveal>
    </li>
  ));
}
