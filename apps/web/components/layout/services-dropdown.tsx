"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export function ServicesDropdown({
  active,
  label,
  links,
}: ServicesDropdownProps) {
  const [open, setOpen] = useState(false);
  const hoverOpened = useRef(false);
  const suppressCloseAutoFocus = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleHoverClose = () => {
    if (!hoverOpened.current) return;
    cancelClose();
    closeTimer.current = setTimeout(() => {
      if (
        hoverOpened.current &&
        document.activeElement?.getAttribute("data-slot") !==
          "dropdown-menu-trigger"
      ) {
        suppressCloseAutoFocus.current = true;
        setOpen(false);
      }
      hoverOpened.current = false;
    }, 100);
  };

  return (
    <div
      className="site-header__services relative"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        cancelClose();
        if (!open) {
          suppressCloseAutoFocus.current = false;
          hoverOpened.current = true;
          setOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleHoverClose();
      }}
    >
      <DropdownMenu
        open={open}
        onOpenChange={(next) => {
          cancelClose();
          if (!next && hoverOpened.current) {
            suppressCloseAutoFocus.current = true;
          }
          setOpen(next);
          if (!next) hoverOpened.current = false;
        }}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            data-active={active ? "true" : undefined}
            onFocus={() => {
              cancelClose();
              hoverOpened.current = false;
            }}
            className="inline-flex cursor-pointer items-center gap-[0.3rem] py-[0.8rem] [font:inherit] text-inherit transition-colors duration-200 hover:text-primary focus:!ring-0 focus:!outline-none focus-visible:text-primary focus-visible:!ring-0 focus-visible:!outline-none data-[active=true]:text-primary data-[state=open]:text-primary data-[state=open]:[&_svg]:rotate-180 [&_svg]:transition-transform [&_svg]:duration-200"
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" && hoverOpened.current) {
                event.preventDefault();
                hoverOpened.current = false;
              }
            }}
          >
            {label}
            <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          sideOffset={5}
          className="z-[100] grid w-[23rem] gap-0 rounded-2xl border-[#dfe4f8] bg-white p-2 text-[#313a5f] shadow-[0_20px_55px_rgba(39,48,100,0.16)] data-[state=open]:animate-none"
          onPointerEnter={cancelClose}
          onPointerLeave={scheduleHoverClose}
          onCloseAutoFocus={(event) => {
            if (!suppressCloseAutoFocus.current) return;
            event.preventDefault();
            suppressCloseAutoFocus.current = false;
          }}
        >
          {links.map((item, index) => (
            <DropdownMenuItem
              asChild
              key={item.href}
              className="min-h-[3.75rem] rounded-[0.65rem] p-0 focus:bg-[#f3f4ff] focus:!outline-none focus-visible:!outline-none data-[highlighted]:!outline-none"
            >
              <a
                href={item.href}
                className="grid grid-cols-[1.8rem_minmax(0,1fr)] items-start gap-[0.55rem] px-[0.7rem] py-[0.55rem]"
              >
                <span className="pt-[0.12rem] font-mono text-[0.58rem] font-extrabold tracking-ui text-[#8b95c1]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid min-w-0 gap-[0.2rem]">
                  <strong className="flex items-center gap-[0.4rem] text-ui-sm leading-[1.35] text-[#313a5f]">
                    {item.label}
                    {item.icon === "shield" ? (
                      <ShieldCheck
                        size={15}
                        className="shrink-0 text-primary"
                        aria-hidden="true"
                      />
                    ) : null}
                  </strong>
                  <small className="text-[0.62rem] leading-[1.4] font-medium text-ink-soft">
                    {item.description}
                  </small>
                </span>
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
