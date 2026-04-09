"use client";

import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  Github,
  Linkedin,
  Menu,
  SearchSlash,
  Send,
  TerminalSquare,
  X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/navigation";
import {
  getRouteItems,
  getSectionFromNavigationParam,
  type SectionId,
} from "@/lib/site-data";
import { AppShellSceneContext } from "@/components/app-shell-scene-context";
import { FocusProvider, useFocus } from "@/components/focus-context";
import { PipelineVisual } from "@/components/pipeline-visual";
import { CommandTerminal } from "@/components/command-terminal";
import type {
  ChildrenProps,
  TerminalDialogRequest,
} from "@/components/scene/types";

const MAX_ZOOM = 2.15;
const MIN_ZOOM = 0.75;
const FOCUS_ZOOM = 1.15;
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || null;
const subtitle = "I turn ideas into working products — from design and development to deployment.";

export const AppShell = ({ children }: ChildrenProps) => {
  return (
    <FocusProvider>
      <ShellContent>{children}</ShellContent>
    </FocusProvider>
  );
};

const ShellContent = ({ children }: ChildrenProps) => {
  const tShell = useTranslations("AppShell");
  const tNavigation = useTranslations("Navigation");
  const tContact = useTranslations("ContactDialog");
  const locale = useLocale();
  const { activeSection, setActiveSection } = useFocus();
  const routeItems = getRouteItems(tNavigation);
  const [isHydrated, setIsHydrated] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [zoom, setZoom] = useState(MAX_ZOOM);
  const [viewResetToken, setViewResetToken] = useState(0);
  const [terminalDialogRequest, setTerminalDialogRequest] =
    useState<TerminalDialogRequest | null>(null);
  const [openDialogSection, setOpenDialogSection] = useState<SectionId | null>(
    null,
  );
  const [pendingNavigationSection, setPendingNavigationSection] =
    useState<SectionId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = locale === "cs" ? "cs" : "en";
  const nextLocale = currentLocale === "en" ? "cs" : "en";
  const currentHref = searchParams.toString()
    ? `${pathname || "/"}?${searchParams.toString()}`
    : pathname || "/";

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setTerminalOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (terminalOpen) {
      setMobileMenuOpen(false);
    }
  }, [terminalOpen]);

  const handleSelectSection = (section: SectionId) => {
    setMobileMenuOpen(false);
    setActiveSection(section);
    setZoom(FOCUS_ZOOM);
    setTerminalDialogRequest({ section, token: Date.now() });
  };

  useEffect(() => {
    const querySection = getSectionFromNavigationParam(
      searchParams.get("navigation"),
    );

    if (!querySection) {
      setPendingNavigationSection(null);
      return;
    }

    setPendingNavigationSection(querySection);
    setActiveSection(querySection);
    setZoom(FOCUS_ZOOM);
    setTerminalDialogRequest({ section: querySection, token: Date.now() });
  }, [searchParams, setActiveSection]);

  useEffect(() => {
    if (!pendingNavigationSection) {
      return;
    }

    if (openDialogSection !== pendingNavigationSection) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("navigation");

    const nextUrl = nextSearchParams.toString()
      ? `${pathname}?${nextSearchParams.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
    setPendingNavigationSection(null);
  }, [
    openDialogSection,
    pathname,
    pendingNavigationSection,
    router,
    searchParams,
  ]);

  const handleDialogSectionChange = useCallback(
    (section: SectionId | null) => {
      setOpenDialogSection((current) =>
        current === section ? current : section,
      );
    },
    [],
  );

  const dialogOpen = openDialogSection !== null;
  const handleOverview = () => {
    setActiveSection(null);
    setZoom(MAX_ZOOM);
    setViewResetToken((current) => current + 1);
    setMobileMenuOpen(false);
  };

  const handleTerminalToggle = () => {
    setTerminalOpen((current) => !current);
    setMobileMenuOpen(false);
  };

  return (
    <div
      className="app-shell"
      data-testid="app-shell"
      data-hydrated={isHydrated ? "true" : "false"}
    >
      <div
        className={classNames(
          "top-signature",
          dialogOpen && "top-signature--hidden",
        )}
        aria-hidden="true"
      >
        <h2>{tShell("name")}</h2>
        <p className={classNames("welcome-line", "welcome-line--visible")}>
          {subtitle}
        </p>
      </div>

      <AppShellSceneContext.Provider
        value={{
          activeSection,
          onSelectSection: handleSelectSection,
          zoom,
          onZoomChange: setZoom,
          minZoom: MIN_ZOOM,
          maxZoom: MAX_ZOOM,
          onDialogSectionChange: handleDialogSectionChange,
          viewResetToken,
          terminalDialogRequest,
        }}
      >
        <PipelineVisual />
      </AppShellSceneContext.Provider>

      <nav className="bottom-nav" aria-label={tShell("primaryNavLabel")}>
        {routeItems.map((item) => {
          const Icon = item.icon;
          const isActive = dialogOpen && item.id === activeSection;

          return (
            <button
              key={item.id}
              type="button"
              data-testid={`nav-${item.id}`}
              className={classNames(
                "bottom-nav__button",
                isActive && "bottom-nav__button--active",
              )}
              aria-label={item.title}
              onClick={() => handleSelectSection(item.id)}
            >
              <span className="bottom-nav__icon">
                <Icon size={18} strokeWidth={2.1} />
              </span>
              <span className="bottom-nav__label">{item.title}</span>
            </button>
          );
        })}
      </nav>

      <main className="content-frame">{children}</main>

      {!terminalOpen ? (
        <>
          {isHydrated && !dialogOpen ? (
            <>
              {calendlyUrl ? (
                <div className="mobile-cta">
                  <a
                    className="contact-dialog__consult"
                    href={calendlyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CalendarDays size={18} strokeWidth={2} />
                    <span>{tContact("consultCta")}</span>
                  </a>
                </div>
              ) : null}

              <button
                type="button"
                className="mobile-menu-toggle terminal-toggle"
                aria-label={
                  mobileMenuOpen
                    ? tShell("menuCloseAria")
                    : tShell("menuOpenAria")
                }
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((current) => !current)}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </>
          ) : null}

          <div className="app-corner-actions app-corner-actions--left">
            <button
              type="button"
              data-testid="overview-button"
              className="terminal-toggle terminal-toggle--secondary"
              aria-label={tShell("overviewAria")}
              onClick={handleOverview}
            >
              <SearchSlash size={18} />
            </button>

            <div
              className="locale-switcher"
              aria-label={tShell("languageSelectAria")}
            >
              <Link
                href={currentHref}
                locale={nextLocale}
                className="terminal-toggle terminal-toggle--secondary"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={
                  nextLocale === "en"
                    ? tShell("switchToEnglishAria")
                    : tShell("switchToCzechAria")
                }
              >
                {nextLocale === "en" ? tShell("localeEn") : tShell("localeCs")}
              </Link>
            </div>

            <button
              type="button"
              data-testid="terminal-toggle"
              className="terminal-toggle"
              aria-label={
                terminalOpen
                  ? tShell("terminalCloseAria")
                  : tShell("terminalOpenAria")
              }
              aria-expanded={terminalOpen}
              onClick={handleTerminalToggle}
            >
              {terminalOpen ? <X size={18} /> : <TerminalSquare size={18} />}
            </button>
          </div>

          <div className="app-corner-actions app-corner-actions--right">
            <div
              className="contact-dialog__socials"
              aria-label={tContact("socials.label")}
            >
              <a
                className="contact-dialog__social-icon"
                href="https://github.com/TurniXXD"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={tContact("socials.github")}
                title={tContact("socials.github")}
              >
                <Github size={18} strokeWidth={2} />
              </a>

              <a
                className="contact-dialog__social-icon"
                href="https://www.linkedin.com/in/jakub-vantuch-552514197/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={tContact("socials.linkedin")}
                title={tContact("socials.linkedin")}
              >
                <Linkedin size={18} strokeWidth={2} />
              </a>

              <a
                className="contact-dialog__social-icon"
                href="https://t.me/turnix"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={tContact("socials.telegram")}
                title={tContact("socials.telegram")}
              >
                <Send size={18} strokeWidth={2} />
              </a>
            </div>

            {calendlyUrl ? (
              <a
                className="contact-dialog__consult"
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <CalendarDays size={18} strokeWidth={2} />
                <span>{tContact("consultCta")}</span>
              </a>
            ) : null}
          </div>

          <div
            className={classNames(
              "mobile-menu",
              mobileMenuOpen && "mobile-menu--open",
            )}
          >
            <div className="mobile-menu__group mobile-menu__group--controls">
              <button
                type="button"
                className="mobile-menu__action terminal-toggle terminal-toggle--secondary"
                aria-label={tShell("overviewAria")}
                onClick={handleOverview}
              >
                <SearchSlash size={18} />
              </button>

              <Link
                href={currentHref}
                locale={nextLocale}
                className="mobile-menu__action terminal-toggle terminal-toggle--secondary"
                aria-label={
                  nextLocale === "en"
                    ? tShell("switchToEnglishAria")
                    : tShell("switchToCzechAria")
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {nextLocale === "en" ? tShell("localeEn") : tShell("localeCs")}
              </Link>

              <button
                type="button"
                className="mobile-menu__action terminal-toggle"
                aria-label={
                  terminalOpen
                    ? tShell("terminalCloseAria")
                    : tShell("terminalOpenAria")
                }
                aria-expanded={terminalOpen}
                onClick={handleTerminalToggle}
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
                onClick={() => setMobileMenuOpen(false)}
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
                onClick={() => setMobileMenuOpen(false)}
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
                onClick={() => setMobileMenuOpen(false)}
                aria-label={tContact("socials.telegram")}
                title={tContact("socials.telegram")}
              >
                <Send size={18} strokeWidth={2} />
              </a>
            </div>
          </div>
        </>
      ) : null}

      {terminalOpen ? (
        <button
          type="button"
          className="terminal-backdrop"
          aria-label={tShell("terminalCloseAria")}
          onClick={() => setTerminalOpen(false)}
        />
      ) : null}

      <div
        data-testid="terminal-dock"
        data-open={terminalOpen ? "true" : "false"}
        className={classNames(
          "terminal-dock",
          terminalOpen && "terminal-dock--open",
        )}
      >
        {terminalOpen ? (
          <div className="terminal-dock-actions">
            <button
              type="button"
              data-testid="terminal-toggle"
              className="terminal-toggle"
              aria-label={tShell("terminalCloseAria")}
              aria-expanded={terminalOpen}
              onClick={() => setTerminalOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
        ) : null}
        <CommandTerminal
          isOpen={terminalOpen}
          onFocusCommandAction={(section) =>
            setTerminalDialogRequest({ section, token: Date.now() })
          }
          onCloseCommandAction={() => setTerminalOpen(false)}
        />
      </div>
    </div>
  );
};
