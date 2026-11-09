export const COOKIE_CONSENT_STORAGE_KEY = "vantuch_cookie_consent_v1";
export const COOKIE_CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;

/** Set on <html> before first paint when a valid choice is already stored. */
export const COOKIE_CONSENT_SAVED_ATTRIBUTE = "data-cookie-consent-saved";

/**
 * Runs inline in <head> before the statically rendered banner paints, so a
 * returning visitor never sees it flash while the client bundle hydrates.
 * Mirrors the validity check in `readConsent`.
 */
export const cookieConsentBootScript = `try{var r=JSON.parse(localStorage.getItem(${JSON.stringify(
  COOKIE_CONSENT_STORAGE_KEY,
)})||"null"),n=Date.now();if(r&&(r.choice==="accepted"||r.choice==="rejected")&&typeof r.savedAt==="number"&&r.savedAt<=n&&n-r.savedAt<${COOKIE_CONSENT_LIFETIME_MS})document.documentElement.setAttribute(${JSON.stringify(
  COOKIE_CONSENT_SAVED_ATTRIBUTE,
)},"")}catch(e){}`;
