import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("privacy page is localized and reflects client-submitted referrals", async ({
  page,
}) => {
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Zpracování osobních údajů",
  );
  await expect(
    page.getByRole("heading", {
      name: "Doporučení klienta",
    }),
  ).toBeVisible();
  await expect(
    page.locator('link[rel="alternate"][hreflang="en"]'),
  ).toHaveAttribute("href", "https://vantuch.dev/en/privacy");
  const turnstilePrivacy = page.getByRole("link", {
    name: "Cloudflare Turnstile Privacy Addendum",
  });
  await expect(turnstilePrivacy).toHaveAttribute(
    "href",
    "https://www.cloudflare.com/en-gb/turnstile-privacy-policy/",
  );
  await page.goto("/en/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy notice",
  );
  await expect(page.locator(".site-header__lang")).toHaveAttribute(
    "href",
    "/privacy",
  );
  await expect(
    page.getByRole("link", {
      name: "Cloudflare Turnstile Privacy Addendum",
    }),
  ).toHaveAttribute(
    "href",
    "https://www.cloudflare.com/en-gb/turnstile-privacy-policy/",
  );
  await page.goto("/doporuceni");
  await expect(page.locator(".referral-form")).toHaveCount(0);
});

test("privacy page fits mobile width and appears in sitemap", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/privacy");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBe(0);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("https://vantuch.dev/en/privacy");
  expect(await sitemap.text()).toContain(
    "https://vantuch.dev/sluzby/webove-aplikace",
  );
  expect(await sitemap.text()).toContain(
    "https://vantuch.dev/en/sluzby/ai-reseni",
  );
});
