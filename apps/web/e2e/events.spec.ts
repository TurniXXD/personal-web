import { expect } from "@playwright/test";
import { test } from "./site-fixture";

// Runs against e2e/fixtures/content-api-server.mjs (see playwright.config.ts).

test("navigation links to the events listing and marks it active", async ({
  page,
}) => {
  await page.goto("/");
  const navLink = page
    .locator(".site-header__nav")
    .getByRole("link", { name: "Akce", exact: true });
  await expect(navLink).toHaveAttribute("href", "/akce/brno");
  await navLink.click();
  await expect(page).toHaveURL(/\/akce\/brno$/);
  await expect(
    page.locator('.site-header__nav a[aria-current="page"]'),
  ).toHaveText("Akce");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Tech & networking akce v Brně",
    }),
  ).toBeVisible();
});

test("listing shows a grid of at most four columns and paginates with filters", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1000 });
  await page.goto("/akce/brno?category=networking");
  const grid = page.locator("[data-events-grid]");
  await expect(grid).toBeVisible();
  const columns = await grid.evaluate(
    (element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").length,
  );
  expect(columns).toBe(4);

  const next = page.locator("[data-events-next]");
  await expect(next).toBeVisible();
  const href = new URL(
    (await next.getAttribute("href")) ?? "",
    "http://localhost",
  );
  expect(href.searchParams.get("category")).toBe("networking");
  expect(href.searchParams.get("cursor")).toBeTruthy();

  await next.click();
  await expect(page).toHaveURL(/category=networking.*cursor=/);
  await expect(page.locator("[data-event-card]")).toHaveCount(2);
  await expect(page.locator("[data-event-card]").first()).toContainText(
    "Networking Brno #25",
  );
});

test("free food filter combines with other filters and keeps unknown food visible when off", async ({
  page,
}) => {
  await page.goto("/akce/brno");
  await expect(
    page.locator('[data-event-card="data-breakfast"]'),
  ).toBeVisible();

  await page.getByRole("checkbox", { name: "Jídlo zdarma" }).check();
  await expect(page).toHaveURL(/freeFood=true/);
  await expect(page.locator("[data-event-card]")).toHaveCount(2);
  await expect(page.locator("[data-free-food-badge]")).toHaveCount(2);

  await page.getByLabel("Kategorie").selectOption("ai");
  await expect(page).toHaveURL(/freeFood=true/);
  await expect(page).toHaveURL(/category=ai/);
  await expect(page.locator("[data-event-card]")).toHaveCount(1);
  await expect(
    page.locator('[data-event-card="brno-ai-meetup"]'),
  ).toBeVisible();

  await page.getByRole("link", { name: "Zrušit filtry" }).click();
  await expect(page).toHaveURL(/\/akce\/brno$/);
  await expect(
    page.locator('[data-event-card="data-breakfast"]'),
  ).toBeVisible();
  // Only verified free food shows the badge.
  await expect(
    page.locator('[data-event-card="typescript-night"] [data-free-food-badge]'),
  ).toHaveCount(0);
  await expect(
    page.locator('[data-event-card="data-breakfast"] [data-free-food-badge]'),
  ).toHaveCount(0);
});

test("search is debounced into the URL and shows an empty state", async ({
  page,
}) => {
  await page.goto("/akce/brno");
  await page.getByLabel("Hledat akce").fill("typescript");
  await expect(page).toHaveURL(/q=typescript/);
  await expect(page.locator("[data-event-card]")).toHaveCount(1);

  await page.goto("/akce/brno?q=nothing-matches&price=paid");
  await expect(
    page.locator('[data-events-state="filtered-empty"]'),
  ).toBeVisible();
  await expect(page.getByLabel("Vstupné")).toHaveValue("paid");
});

test("card navigates to the detail page while the calendar link stays independent", async ({
  page,
}) => {
  await page.goto("/akce/brno");
  const card = page.locator('[data-event-card="brno-ai-meetup"]');
  const calendar = card.locator("[data-calendar-action]");

  await expect(calendar).toHaveAttribute("target", "_blank");
  await expect(calendar).toHaveAttribute("rel", "noopener noreferrer");
  const calendarUrl = new URL((await calendar.getAttribute("href")) ?? "");
  expect(calendarUrl.origin + calendarUrl.pathname).toBe(
    "https://calendar.google.com/calendar/render",
  );
  expect(calendarUrl.searchParams.get("action")).toBe("TEMPLATE");
  expect(calendarUrl.searchParams.get("text")).toBe("Brno AI meetup");
  expect(calendarUrl.searchParams.get("ctz")).toBe("Europe/Prague");
  expect(calendarUrl.searchParams.get("details")).toContain(
    "https://vantuch.dev/akce/brno/brno-ai-meetup",
  );
  // No interactive element is nested inside another.
  await expect(card.locator("a a, a button")).toHaveCount(0);

  const popup = page.waitForEvent("popup");
  await calendar.click();
  await (await popup).close();
  await expect(page).toHaveURL(/\/akce\/brno$/);

  await card.locator("[data-event-card-link]").focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/akce\/brno\/brno-ai-meetup$/);
});

test("detail page renders registration, structured data, and metadata", async ({
  page,
}) => {
  await page.goto("/akce/brno/brno-ai-meetup");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Brno AI meetup",
  );
  await expect(
    page.getByRole("link", { name: /Registrovat se na akci/ }),
  ).toHaveAttribute("href", "https://example.com/register/brno-ai-meetup");
  await expect(
    page.locator('.site-header__nav a[aria-current="true"]'),
  ).toHaveText("Akce");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://vantuch.dev/akce/brno/brno-ai-meetup",
  );

  const jsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  );
  expect(jsonLd["@type"]).toBe("Event");
  expect(jsonLd.eventStatus).toBe("https://schema.org/EventScheduled");
  expect(jsonLd.location.name).toBe("Impact Hub Brno");
  expect(jsonLd.organizer.name).toBe("Brno AI Community");
  expect(jsonLd.offers.price).toBe(0);
  expect(jsonLd).not.toHaveProperty("image");
});

test("cancelled events hide registration and disable the calendar", async ({
  page,
}) => {
  await page.goto("/akce/brno/startup-pitch-evening");
  await expect(
    page.locator('[data-event-status-notice="cancelled"]'),
  ).toBeVisible();
  await expect(page.locator("[data-event-registration]")).toHaveCount(0);
  await expect(page.locator("[data-calendar-disabled]")).toHaveAttribute(
    "aria-disabled",
    "true",
  );
  await expect(page.locator("aside [data-calendar-action]")).toHaveCount(0);
  const jsonLd = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  );
  expect(jsonLd.eventStatus).toBe("https://schema.org/EventCancelled");
});

test("unknown events return the event not-found state", async ({ page }) => {
  const response = await page.goto("/akce/brno/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.locator("[data-event-not-found]")).toBeVisible();
});

test("events pages reflow on phones without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  for (const path of ["/akce/brno", "/en/akce/brno/brno-ai-meetup"]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflow, path).toBe(false);
  }
});
