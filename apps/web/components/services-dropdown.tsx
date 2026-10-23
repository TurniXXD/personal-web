"use client";

import { useRef } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";

type ServicesDropdownProps = {
  active: boolean;
  label: string;
  links: Array<{
    href: string;
    label: string;
    description: string;
    icon?: "shield";
  }>;
};

export const ServicesDropdown = ({
  active,
  label,
  links,
}: ServicesDropdownProps) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const openFromHover = () => {
    const details = detailsRef.current;
    if (!details || details.open) return;

    details.open = true;
    details.dataset.hoverOpen = "true";
  };

  const closeFromHover = () => {
    const details = detailsRef.current;
    if (!details || details.dataset.hoverOpen !== "true") return;

    details.open = false;
    delete details.dataset.hoverOpen;
  };

  return (
    <details
      ref={detailsRef}
      className="site-header__services"
      data-active={active ? "true" : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") openFromHover();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") closeFromHover();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !detailsRef.current?.open) return;

        detailsRef.current.open = false;
        delete detailsRef.current.dataset.hoverOpen;
        detailsRef.current.querySelector("summary")?.focus();
      }}
    >
      <summary
        onClick={(event) => {
          const details = detailsRef.current;
          if (details?.dataset.hoverOpen !== "true") return;

          event.preventDefault();
          delete details.dataset.hoverOpen;
          details.open = true;
        }}
      >
        {label}
        <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
      </summary>
      <div className="site-header__services-menu">
        {links.map((item, index) => (
          <a href={item.href} key={item.href}>
            <span className="site-header__services-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="site-header__services-copy">
              <strong>
                {item.label}
                {item.icon === "shield" ? (
                  <ShieldCheck size={15} aria-hidden="true" />
                ) : null}
              </strong>
              <small>{item.description}</small>
            </span>
          </a>
        ))}
      </div>
    </details>
  );
};
