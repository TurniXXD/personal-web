"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, CornerDownLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  executeTerminalCommand,
  getInitialTerminalHistory,
  getTerminalSuggestions,
} from "@/lib/terminal";
import { useFocus } from "@/components/focus-context";
import { getRouteItems } from "@/lib/site-data";
import type { SectionChangeHandler } from "@/components/scene/types";

type HistoryLine = {
  id: number;
  command: string;
  output: string[];
};

type CommandTerminalProps = {
  isOpen?: boolean;
  onFocusCommandAction?: SectionChangeHandler;
};

export const CommandTerminal = ({
  isOpen = false,
  onFocusCommandAction,
}: CommandTerminalProps) => {
  const tNavigation = useTranslations("Navigation");
  const tTerminal = useTranslations("Terminal");
  const { setActiveSection } = useFocus();
  const routeItems = useMemo(() => getRouteItems(tNavigation), [tNavigation]);
  const initialHistory = useMemo(
    () => getInitialTerminalHistory(tTerminal),
    [tTerminal],
  );
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>(initialHistory);
  const historyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory(initialHistory);
  }, [initialHistory]);

  const suggestions = useMemo(
    () => getTerminalSuggestions(input, routeItems, tTerminal),
    [input, routeItems, tTerminal],
  );
  const inlineSuggestion = useMemo(() => {
    const normalizedInput = input.trim().toLowerCase();

    if (!normalizedInput) {
      return "";
    }

    return (
      suggestions.find((suggestion) =>
        suggestion.value.toLowerCase().startsWith(normalizedInput),
      )?.value ?? ""
    );
  }, [input, suggestions]);

  useEffect(() => {
    const historyElement = historyRef.current;

    if (!historyElement) {
      return;
    }

    historyElement.scrollTop = historyElement.scrollHeight;
  }, [history]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [isOpen]);

  const applyAutocomplete = () => {
    if (!inlineSuggestion) {
      return;
    }

    setInput(inlineSuggestion);
  };

  const submit = (commandValue: string) => {
    const result = executeTerminalCommand(commandValue, routeItems, tTerminal);

    if (result.type === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory((current) => [
      ...current,
      {
        id: Date.now(),
        command: commandValue,
        output: result.output,
      },
    ]);

    if (result.type === "focus") {
      setActiveSection(result.target);
      onFocusCommandAction?.(result.target);
    }

    setInput("");
  };

  return (
    <section className="terminal-panel" aria-label={tTerminal("label")}>
      <div className="terminal-panel__body">
        <div
          className="terminal-history"
          role="log"
          aria-live="polite"
          ref={historyRef}
        >
          {history.map((entry) => (
            <div key={entry.id} className="terminal-line-group">
              <div className="terminal-line terminal-line--command">
                <ChevronRight size={14} />
                <span>{entry.command}</span>
              </div>
              {entry.output.map((line, index) => (
                <div key={`${entry.id}-${index}`} className="terminal-line">
                  <span>{line}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <form
          className="terminal-input-wrap"
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
        >
          <label className="terminal-prompt" htmlFor="terminal-input">
            <CornerDownLeft size={14} />
          </label>
          <div className="terminal-input-shell">
            {inlineSuggestion && inlineSuggestion !== input ? (
              <div className="terminal-input-ghost" aria-hidden="true">
                <span className="terminal-input-ghost__typed">{input}</span>
                <span>{inlineSuggestion.slice(input.length)}</span>
              </div>
            ) : null}
            <input
              id="terminal-input"
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (
                  (event.key === "Tab" || event.key === "ArrowRight") &&
                  inlineSuggestion &&
                  inlineSuggestion !== input
                ) {
                  event.preventDefault();
                  applyAutocomplete();
                }
              }}
              placeholder={tTerminal("placeholder")}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </form>

        {input.trim() ? (
          <div className="terminal-suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.label}
                type="button"
                className="terminal-suggestion"
                onClick={() => submit(suggestion.value)}
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};
