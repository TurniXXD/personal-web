"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";

type TurnstileOptions = {
  sitekey: string;
  action: string;
  theme: "light";
  size: "flexible";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
let scriptPromise: Promise<void> | undefined;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-turnstile-script="true"]',
    );
    const handleLoad = () => resolve();
    const handleError = () => {
      document.querySelector('script[data-turnstile-script="true"]')?.remove();
      scriptPromise = undefined;
      reject(new Error("turnstile_script_failed"));
    };

    if (existing) {
      existing.addEventListener("load", handleLoad, { once: true });
      existing.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = "true";
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.append(script);
  });

  return scriptPromise;
}

export const turnstileEnabled = Boolean(siteKey);

export function TurnstileWidget({
  locale,
  action,
  onTokenChange,
  resetKey = 0,
}: {
  locale: Locale;
  action: string;
  onTokenChange: (token: string) => void;
  resetKey?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  onTokenChangeRef.current = onTokenChange;

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;
    setFailed(false);

    void loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          theme: "light",
          size: "flexible",
          callback: (token) => {
            setFailed(false);
            onTokenChangeRef.current(token);
          },
          "expired-callback": () => onTokenChangeRef.current(""),
          "error-callback": () => {
            setFailed(true);
            onTokenChangeRef.current("");
          },
        });
      })
      .catch(() => {
        if (cancelled) return;
        setFailed(true);
        onTokenChangeRef.current("");
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [action, attempt]);

  useEffect(() => {
    if (!resetKey || !widgetIdRef.current || !window.turnstile) return;
    window.turnstile.reset(widgetIdRef.current);
    onTokenChangeRef.current("");
  }, [resetKey]);

  if (!siteKey) return null;

  return (
    <div className="turnstile-widget">
      <div ref={containerRef} aria-label="Cloudflare Turnstile" />
      {failed ? (
        <p role="alert">
          {locale === "cs"
            ? "Ověření se nepodařilo načíst. "
            : "Verification could not load. "}
          <button
            type="button"
            onClick={() => {
              onTokenChangeRef.current("");
              setAttempt((value) => value + 1);
            }}
          >
            {locale === "cs" ? "Zkusit znovu" : "Try again"}
          </button>
        </p>
      ) : null}
    </div>
  );
}
