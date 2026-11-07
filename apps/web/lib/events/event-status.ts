import type { EventItem, EventStatus } from "./event-model.ts";

const SCHEMA_EVENT_STATUS: Record<EventStatus, string> = {
  scheduled: "https://schema.org/EventScheduled",
  cancelled: "https://schema.org/EventCancelled",
  postponed: "https://schema.org/EventPostponed",
};

export const toSchemaEventStatus = (status: EventStatus) =>
  SCHEMA_EVENT_STATUS[status];

/**
 * Calendar entries are offered only for events that will take place at a
 * verified time. Cancelled events and invalid dates disable the action.
 */
export const canAddEventToCalendar = (
  event: Pick<EventItem, "status" | "startsAt">,
) => event.status !== "cancelled" && event.startsAt !== null;

/** Indexing is limited to events with a verified start date. */
export const isIndexableEvent = (event: Pick<EventItem, "startsAt">) =>
  event.startsAt !== null;
