"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Menu } from "lucide-react";

type MobileNavigationProps = {
  menuButtonLabel: string;
  navigationLabel: string;
  servicesLabel: string;
  links: Array<{
    href: string;
    label: string;
    ariaCurrent?: "page";
    hrefLang?: string;
    lang?: string;
  }>;
  serviceLinks: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

export function MobileNavigation({
  menuButtonLabel,
  navigationLabel,
  servicesLabel,
  links,
  serviceLinks,
}: MobileNavigationProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const servicesRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOnOutsidePress = (event: PointerEvent) => {
      const target = event.target;
      const menu = menuRef.current;
      const services = servicesRef.current;

      if (!(target instanceof Node) || !menu?.open) return;

      if (!menu.contains(target)) {
        menu.open = false;
        if (services) services.open = false;
        return;
      }

      if (services?.open && !services.contains(target)) {
        services.open = false;
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, []);

  return (
    <details className="site-header__mobile hidden" ref={menuRef}>
      <summary aria-label={menuButtonLabel}>
        <Menu size={21} aria-hidden="true" />
      </summary>
      <nav aria-label={navigationLabel}>
        <details className="site-header__mobile-services" ref={servicesRef}>
          <summary>
            {servicesLabel}
            <ChevronDown size={15} strokeWidth={2.2} aria-hidden="true" />
          </summary>
          <div>
            {serviceLinks.map((item) => (
              <a href={item.href} key={item.href}>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
              </a>
            ))}
          </div>
        </details>
        {links.map((item) => (
          <a
            aria-current={item.ariaCurrent}
            href={item.href}
            hrefLang={item.hrefLang}
            key={`${item.href}-${item.label}`}
            lang={item.lang}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
