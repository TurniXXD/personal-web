"use client";

import classNames from "classnames";
import {
  Github,
  Linkedin,
  SearchSlash,
  Send,
  TerminalSquare,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  open: boolean;
  terminalOpen: boolean;
  nextLocale: "cs" | "en";
  onOverview: () => void;
  onLocaleSwitch: () => void;
  onTerminalToggle: () => void;
  onClose: () => void;
};

export function AppShellMobileMenu({
  open,
  terminalOpen,
  nextLocale,
  onOverview,
  onLocaleSwitch,
  onTerminalToggle,
  onClose,
}: Props) {
  const tShell = useTranslations("AppShell");
  const tContact = useTranslations("ContactDialog");

  return (
    <div className={classNames("mobile-menu", open && "mobile-menu--open")}>
      <div className="mobile-menu__group mobile-menu__group--controls">
        <button
          type="button"
          className="mobile-menu__action terminal-toggle terminal-toggle--secondary"
          aria-label={tShell("overviewAria")}
          onClick={onOverview}
        >
          <SearchSlash size={18} />
        </button>

        <button
          type="button"
          className="mobile-menu__action terminal-toggle terminal-toggle--secondary"
          aria-label={
            nextLocale === "en"
              ? tShell("switchToEnglishAria")
              : tShell("switchToCzechAria")
          }
          onClick={onLocaleSwitch}
        >
          {nextLocale === "en" ? tShell("localeEn") : tShell("localeCs")}
        </button>

        <button
          type="button"
          className="mobile-menu__action terminal-toggle"
          aria-label={
            terminalOpen
              ? tShell("terminalCloseAria")
              : tShell("terminalOpenAria")
          }
          aria-expanded={terminalOpen}
          onClick={onTerminalToggle}
        >
          {terminalOpen ? <X size={18} /> : <TerminalSquare size={18} />}
        </button>
      </div>

      <div
        className="mobile-menu__group mobile-menu__group--socials contact-dialog__socials"
        aria-label={tContact("socials.label")}
      >
        <a
          className="mobile-menu__action contact-dialog__social-icon"
          href="https://github.com/TurniXXD"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          aria-label={tContact("socials.github")}
          title={tContact("socials.github")}
        >
          <Github size={18} strokeWidth={2} />
        </a>

        <a
          className="mobile-menu__action contact-dialog__social-icon"
          href="https://www.linkedin.com/in/jakub-vantuch-552514197/"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          aria-label={tContact("socials.linkedin")}
          title={tContact("socials.linkedin")}
        >
          <Linkedin size={18} strokeWidth={2} />
        </a>

        <a
          className="mobile-menu__action contact-dialog__social-icon"
          href="https://t.me/turnix"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          aria-label={tContact("socials.telegram")}
          title={tContact("socials.telegram")}
        >
          <Send size={18} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
