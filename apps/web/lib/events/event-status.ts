import type { EventItem } from "./event-model.ts";

/**
 * Calendar entries are offered only for events that will take place at a
 * verified time. Cancelled events and invalid dates disable the action.
 */
export const canAddEventToCalendar = (
  event: Pick<EventItem, "status" | "startsAt">,
) => event.status !== "cancelled" && event.startsAt !== null;
