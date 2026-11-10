"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  sendEventInteraction,
  type EventInteractionType,
} from "@/lib/events/event-interaction";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  eventSlug: string;
  interactionType: EventInteractionType;
  children: ReactNode;
};

export function EventInteractionLink({
  eventSlug,
  interactionType,
  children,
  ...props
}: Props) {
  return (
    <a
      {...props}
      onClick={() => sendEventInteraction(eventSlug, interactionType)}
    >
      {children}
    </a>
  );
}
