"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  children: ReactNode;
};

/**
 * Counts follows from the events page as a Clarity custom event. Clarity only
 * loads after analytics consent, so without it nothing is sent.
 */
export function EventsInstagramLink({ children, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={() => window.clarity?.("event", "events_instagram_click")}
    >
      {children}
    </a>
  );
}
