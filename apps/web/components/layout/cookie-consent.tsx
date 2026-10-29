"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { localizedPath, type Locale } from "@/lib/site/content";

const storageKey = "vantuch_cookie_consent_v1";
const openEvent = "vantuch:open-cookie-preferences";
const consentLifetime = 180 * 24 * 60 * 60 * 1000;
type Consent = "accepted" | "rejected";

type CookieConsentProps = {
  clarityProjectId?: string;
  cloudflareAnalyticsToken?: string;
  locale: Locale;
};

function readConsent(): Consent | null {
  try {
    const record = JSON.parse(
      window.localStorage.getItem(storageKey) ?? "null",
    );
    return record &&
      (record.choice === "accepted" || record.choice === "rejected") &&
      typeof record.savedAt === "number" &&
      record.savedAt <= Date.now() &&
      Date.now() - record.savedAt < consentLifetime
      ? record.choice
      : null;
  } catch {
    return null;
  }
}

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  }
}

function loadClarity(projectId: string) {
  if (document.querySelector('script[data-analytics="clarity"]')) return;
  window.clarity =
    window.clarity ??
    ((...args: unknown[]) => {
      const clarity = window.clarity;
      if (!clarity) return;
      clarity.q = clarity.q ?? [];
      clarity.q.push(args);
    });
  window.clarity("consentv2", {
    ad_Storage: "denied",
    analytics_Storage: "granted",
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
  script.dataset.analytics = "clarity";
  document.head.append(script);
}

function loadCloudflareAnalytics(token: string) {
  if (document.querySelector('script[data-analytics="cloudflare"]')) return;
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.dataset.cfBeacon = JSON.stringify({ token });
  script.dataset.analytics = "cloudflare";
  document.head.append(script);
}

export function CookiePreferencesButton() {
  const t = useTranslations("cookieSettings");
  return (
    <button
      className="cookie-preferences-button"
      type="button"
      onClick={() => window.dispatchEvent(new Event(openEvent))}
    >
      {t("settings")}
    </button>
  );
}

export function CookieConsent({
  locale,
  clarityProjectId,
  cloudflareAnalyticsToken,
}: CookieConsentProps) {
  const t = useTranslations("cookieSettings");
  const [consent, setConsent] = useState<Consent | null>(null);
  // Render the first-visit notice in the initial HTML. Besides avoiding a
  // layout shift, this keeps the banner from becoming a late LCP candidate
  // after the client bundle hydrates.
  const [open, setOpen] = useState(true);

  useLayoutEffect(() => {
    const initial = readConsent();
    setConsent(initial);
    setOpen(initial === null);
  }, []);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(openEvent, handleOpen);
    return () => window.removeEventListener(openEvent, handleOpen);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (clarityProjectId) loadClarity(clarityProjectId);
    if (cloudflareAnalyticsToken) {
      loadCloudflareAnalytics(cloudflareAnalyticsToken);
    }
  }, [clarityProjectId, cloudflareAnalyticsToken, consent]);

  const saveConsent = (value: Consent) => {
    const changedFromAccepted = consent === "accepted" && value === "rejected";
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({ choice: value, savedAt: Date.now() }),
      );
    } catch {
      // The visitor's choice still applies for this page when storage is blocked.
    }
    setConsent(value);
    setOpen(false);
    if (value === "rejected" && window.clarity) {
      window.clarity("consentv2", {
        ad_Storage: "denied",
        analytics_Storage: "denied",
      });
      window.clarity("consent", false);
    }
    if (value === "rejected") {
      // Remove Clarity first-party cookies immediately, including parent-domain cookies.
      const parts = window.location.hostname.split(".");
      for (const name of ["_clck", "_clsk"]) {
        document.cookie = `${name}=; Max-Age=0; Path=/`;
        for (let index = 0; index < parts.length - 1; index++) {
          document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${parts.slice(index).join(".")}`;
        }
      }
    }
    if (changedFromAccepted) window.location.reload();
  };

  if (!open) return null;

  return (
    <aside className="cookie-consent" aria-label={t("settings")}>
      <div>
        <strong>{t("title")}</strong>
        <p>
          {t("description")}{" "}
          <a href={localizedPath(locale, "/privacy")}>{t("details")}</a>
        </p>
      </div>
      <div className="cookie-consent__actions">
        <button type="button" onClick={() => saveConsent("rejected")}>
          {t("essentialOnly")}
        </button>
        <button
          className="cookie-consent__accept"
          type="button"
          onClick={() => saveConsent("accepted")}
        >
          {t("allowAnalytics")}
        </button>
      </div>
    </aside>
  );
}
