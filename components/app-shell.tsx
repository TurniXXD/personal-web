"use client";

import { useEffect, useState } from "react";
import { SearchSlash, TerminalSquare, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { getRouteItems, type SectionId } from "@/lib/site-data";
import { AppShellSceneContext } from "@/components/app-shell-scene-context";
import { FocusProvider, useFocus } from "@/components/focus-context";
import { PipelineVisual } from "@/components/pipeline-visual";
import { CommandTerminal } from "@/components/command-terminal";
import type {
  ChildrenProps,
  TerminalDialogRequest,
} from "@/components/pipeline/types";
import { subtitleWelcomeMessages } from "@/lib/constants";

const MAX_ZOOM = 2.15;
const MIN_ZOOM = 0.75;
const FOCUS_ZOOM = 1.15;
const WELCOME_MESSAGE_COUNT = subtitleWelcomeMessages.length;

export function AppShell({ children }: ChildrenProps) {
  return (
    <FocusProvider>
      <ShellContent>{children}</ShellContent>
    </FocusProvider>
  );
}

function ShellContent({ children }: ChildrenProps) {
  const tShell = useTranslations("AppShell");
  const tNavigation = useTranslations("Navigation");
  const { activeSection, setActiveSection } = useFocus();
  const routeItems = getRouteItems(tNavigation);
  const [isHydrated, setIsHydrated] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [zoom, setZoom] = useState(MAX_ZOOM);
  const [viewResetToken, setViewResetToken] = useState(0);
  const [terminalDialogRequest, setTerminalDialogRequest] =
    useState<TerminalDialogRequest | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setTerminalOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function syncViewportState() {
      setIsCompactViewport(window.innerWidth <= 768);
    }

    syncViewportState();
    window.addEventListener("resize", syncViewportState);

    return () => window.removeEventListener("resize", syncViewportState);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWelcomeIndex((current) => (current + 1) % WELCOME_MESSAGE_COUNT);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, []);

  function handleSelectSection(section: SectionId) {
    setActiveSection(section);
    setZoom(FOCUS_ZOOM);
    setTerminalDialogRequest({ section, token: Date.now() });
  }

  return (
    <div
      className="app-shell"
      data-testid="app-shell"
      data-hydrated={isHydrated ? "true" : "false"}
    >
      <div
        className={`top-signature${dialogOpen ? " top-signature--hidden" : ""}`}
        aria-hidden="true"
      >
        <h2>{tShell("name")}</h2>
        <p key={welcomeIndex} className="welcome-line">
          {subtitleWelcomeMessages[welcomeIndex]}
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
          onDialogOpenChange: setDialogOpen,
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
              className={`bottom-nav__button${isActive ? " bottom-nav__button--active" : ""}`}
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

      {(!dialogOpen || !isCompactViewport) && !terminalOpen ? (
        <div className="floating-actions">
          <button
            type="button"
            data-testid="overview-button"
            className="terminal-toggle terminal-toggle--secondary"
            aria-label={tShell("overviewAria")}
            onClick={() => {
              setActiveSection(null);
              setZoom(MAX_ZOOM);
              setViewResetToken((current) => current + 1);
            }}
          >
            <SearchSlash size={18} />
          </button>

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
            onClick={() => setTerminalOpen((current) => !current)}
          >
            {terminalOpen ? <X size={18} /> : <TerminalSquare size={18} />}
          </button>
        </div>
      ) : null}

      <div
        data-testid="terminal-dock"
        data-open={terminalOpen ? "true" : "false"}
        className={`terminal-dock${terminalOpen ? " terminal-dock--open" : ""}`}
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
          onFocusCommand={(section) =>
            setTerminalDialogRequest({ section, token: Date.now() })
          }
        />
      </div>
    </div>
  );
}
