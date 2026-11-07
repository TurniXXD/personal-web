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
  await expect(navLink).toHaveAttribute("href", "/akce");
  await navLink.click();
  await expect(page).toHaveURL(/\/akce$/);
  await expect(
    page.locator('.site-header__nav a[aria-current="page"]'),
  ).toHaveText("Akce");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Akce");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});

test("listing shows a three-column grid and paginates with filters", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1000 });
  await page.goto("/akce?category=networking");
  const grid = page.locator("[data-events-grid]");
  await expect(grid).toBeVisible();
  const columns = await grid.evaluate(
    (element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").length,
  );
  expect(columns).toBe(3);

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
  await page.goto("/akce");
  await expect(
    page.locator('[data-event-card="data-breakfast"]'),
  ).toBeVisible();

  await page.getByRole("checkbox", { name: "Jídlo zdarma" }).check();
  await expect(page).toHaveURL(/freeFood=true/);
  await expect(page.locator("[data-event-card]")).toHaveCount(3);
  await expect(page.locator("[data-free-food-badge]")).toHaveCount(3);

  await page.getByRole("button", { name: /Filtry/ }).click();
  await page.getByLabel("Kategorie", { exact: true }).selectOption("ai");
  await expect(page).toHaveURL(/freeFood=true/);
  await expect(page).toHaveURL(/category=ai/);
  await expect(page.locator("[data-event-card]")).toHaveCount(1);
  await expect(
    page.locator('[data-event-card="brno-ai-meetup"]'),
  ).toBeVisible();

  await page.getByRole("link", { name: "Zrušit filtry" }).click();
  await expect(page).toHaveURL(/\/akce$/);
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

test("city autocomplete offers only the supported cities and filters by URL", async ({
  page,
}) => {
  await page.goto("/akce");
  // Without a city the listing covers every city.
  await expect(
    page.locator('[data-event-card="praha-product-meetup"]'),
  ).toBeVisible();
  await expect(
    page.locator('[data-event-card="brno-ai-meetup"]'),
  ).toBeVisible();

  const city = page.getByRole("combobox", { name: "Město" });
  const cityOptions = page
    .getByRole("listbox", { name: "Město" })
    .getByRole("option");
  await city.click();
  await expect(cityOptions).toHaveText([
    "Všechna města",
    "Brno",
    "Praha",
    "Ostrava",
    "Olomouc",
    "Zlín",
  ]);

  // Typing narrows the list (diacritics-insensitive).
  await city.fill("pra");
  await expect(cityOptions).toHaveText(["Praha"]);
  await cityOptions.filter({ hasText: "Praha" }).click();
  await expect(page).toHaveURL(/city=praha/);
  await expect(city).toHaveValue("Praha");
  await expect(page.locator("[data-event-card]")).toHaveCount(2);

  await page.getByRole("checkbox", { name: "Jídlo zdarma" }).check();
  await expect(page).toHaveURL(/city=praha.*freeFood=true/);
  await expect(page.locator("[data-event-card]")).toHaveCount(1);

  // Keyboard: type, move, and confirm without submitting the form.
  await city.fill("zl");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/city=zlin/);
  await expect(city).toHaveValue("Zlín");

  // Unsupported text is not applied and reverts on blur.
  await city.fill("Plzeň");
  await expect(page.getByText("Město není v nabídce")).toBeVisible();
  await page.getByLabel("Hledat akce").click();
  await expect(city).toHaveValue("Zlín");

  await page.getByRole("button", { name: "Zrušit výběr města" }).click();
  await expect(page).not.toHaveURL(/city=/);

  // Unknown URL values fall back to every city.
  await page.goto("/akce?city=plzen&category=ai");
  await expect(city).toHaveValue("");
  await page.goto("/akce?city=brno&category=ai");
  await expect(city).toHaveValue("Brno");
  await expect(
    page.locator('[data-event-card="brno-ai-meetup"]'),
  ).toBeVisible();
  await expect(
    page.locator('[data-event-card="praha-product-meetup"]'),
  ).toHaveCount(0);
});

test("search is debounced into the URL and shows an empty state", async ({
  page,
}) => {
  await page.goto("/akce");
  await page.getByLabel("Hledat akce").fill("typescript");
  await expect(page).toHaveURL(/q=typescript/);
  await expect(page.locator("[data-event-card]")).toHaveCount(1);

  await page.goto("/akce?q=nothing-matches&price=paid");
  await expect(
    page.locator('[data-events-state="filtered-empty"]'),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Filtry/ })).toContainText("1");
  await page.getByRole("button", { name: /Filtry/ }).click();
  await expect(page.getByLabel("Vstupné", { exact: true })).toHaveValue("paid");
});

test("compact date presets and custom range preserve URL filters", async ({
  page,
}) => {
  await page.goto("/akce?city=brno");
  const date = page.getByRole("combobox", { name: "Datum" });
  await expect(date).toBeVisible();
  await expect(page.getByLabel("Od data")).toBeHidden();
  await date.selectOption("week");
  await expect(page).toHaveURL(/city=brno.*from=.*to=/);
  const week = new URL(page.url());
  expect(week.searchParams.get("from")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(week.searchParams.get("to")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  await expect(date).toHaveValue("week");

  await date.selectOption("month");
  await expect(date).toHaveValue("month");
  await date.selectOption("custom");
  await expect(page.getByLabel("Od data")).toBeVisible();
  await expect(page.getByLabel("Od data")).toHaveValue("");
  await expect(page.getByLabel("Do data")).toHaveValue("");
  await page.getByLabel("Od data").fill("2030-02-01");
  await page.getByLabel("Do data").fill("2030-02-28");
  await expect(page).toHaveURL(/city=brno.*from=2030-02-01.*to=2030-02-28/);
  await date.selectOption("all");
  await expect(page).toHaveURL(/city=brno$/);
});

test("advanced filters disclose, count and clear without losing quick filters", async ({
  page,
}) => {
  await page.goto("/akce?city=brno");
  const toggle = page.getByRole("button", { name: /Filtry/ });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByLabel("Kategorie", { exact: true })).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.getByLabel("Kategorie", { exact: true }).selectOption("ai");
  await page.getByLabel("Vstupné", { exact: true }).selectOption("free");
  await expect(page).toHaveURL(/city=brno.*category=ai.*price=free/);
  await expect(toggle).toContainText("2");
  await toggle.click();
  await expect(page.getByLabel("Kategorie", { exact: true })).toBeHidden();
  await expect(
    page.getByRole("button", { name: /Odebrat filtr.*Kategorie/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Odebrat filtr.*Kategorie/ }).click();
  await expect(page).toHaveURL(/city=brno.*price=free/);
  await page.getByRole("link", { name: "Zrušit filtry" }).click();
  await expect(page).toHaveURL(/\/akce$/);
});

test("card opens the organiser's event page while the calendar link stays independent", async ({
  page,
  context,
}) => {
  // Never leave the test environment: answer organiser URLs locally.
  await context.route("https://example.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Organiser</title>",
    }),
  );
  await page.goto("/akce");
  const card = page.locator('[data-event-card="brno-ai-meetup"]');
  const link = card.locator("[data-event-card-link]");
  const calendar = card.locator("[data-calendar-action]");

  // Registration URL wins over the source page.
  await expect(link).toHaveAttribute(
    "href",
    "https://example.com/register/brno-ai-meetup",
  );
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  await expect(link).toContainText("v novém okně");

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
    "https://example.com/register/brno-ai-meetup",
  );
  // No interactive element is nested inside another.
  await expect(card.locator("a a, a button")).toHaveCount(0);

  const calendarPopup = page.waitForEvent("popup");
  await calendar.click();
  await (await calendarPopup).close();
  await expect(page).toHaveURL(/\/akce$/);

  const eventPopup = page.waitForEvent("popup");
  await link.focus();
  await page.keyboard.press("Enter");
  const organiser = await eventPopup;
  expect(organiser.url()).toBe("https://example.com/register/brno-ai-meetup");
  await organiser.close();
  await expect(page).toHaveURL(/\/akce$/);
});

test("cards fall back to the source page and stay links when cancelled", async ({
  page,
}) => {
  await page.goto("/akce");
  // No registration URL: the card links to the organiser's source page.
  await expect(
    page.locator('[data-event-card="typescript-night"] [data-event-card-link]'),
  ).toHaveAttribute("href", "https://example.com/events");

  const cancelled = page.locator('[data-event-card="startup-pitch-evening"]');
  await expect(cancelled.locator("[data-event-card-link]")).toHaveAttribute(
    "href",
    "https://example.com/events",
  );
  await expect(cancelled.locator("[data-calendar-disabled]")).toHaveAttribute(
    "aria-disabled",
    "true",
  );
  await expect(cancelled.locator("[data-calendar-action]")).toHaveCount(0);
});

test("listing cards keep only the title and show an icon-only calendar action", async ({
  page,
}) => {
  await page.goto("/akce");
  const card = page.locator('[data-event-card="brno-ai-meetup"]');
  const calendar = card.locator("[data-calendar-action]");

  await expect(
    card.getByRole("heading", { name: "Brno AI meetup" }),
  ).toBeVisible();
  await expect(card.locator("[data-event-cover-fallback]")).toHaveCount(0);
  await expect(card.locator("[data-event-date-badge]")).toBeVisible();
  await expect(card.getByText("AI", { exact: true })).toBeVisible();
  await expect(card.getByText("Impact Hub Brno")).toBeVisible();
  await expect(card.getByText("Cyrilská 7, Brno")).toHaveCount(0);
  await expect(card.getByText("Brno AI Community")).toHaveCount(0);
  await expect(card.locator("[data-event-card-link]")).toHaveAttribute(
    "title",
    "Brno AI meetup",
  );
  await expect(
    card.getByText("Talks about retrieval-augmented generation & local LLMs."),
  ).toHaveCount(0);
  await expect(calendar).toHaveAccessibleName(/Přidat do kalendáře/);
  await expect(calendar.locator("svg")).toBeVisible();
  expect(
    await calendar.evaluate((element) =>
      [...element.childNodes].some(
        (node) =>
          node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim(),
      ),
    ),
  ).toBe(false);
  const price = await card.locator('[data-event-price="free"]').boundingBox();
  const action = await calendar.boundingBox();
  expect(price).not.toBeNull();
  expect(action).not.toBeNull();
  expect(action!.x).toBeGreaterThan(price!.x + price!.width);
  expect(
    Math.abs(action!.y + action!.height / 2 - (price!.y + price!.height / 2)),
  ).toBeLessThan(8);
  await expect(page.getByText("Přehled akcí připravuje")).toHaveCount(0);

  await card.hover();
  await expect(card).toHaveCSS("background-color", "rgb(98, 91, 223)");
  await expect(card.getByRole("heading")).toHaveCSS(
    "color",
    "rgb(255, 255, 255)",
  );
  await page.mouse.move(0, 0);
  await card.locator("[data-event-card-link]").focus();
  await expect(card).toHaveCSS("background-color", "rgb(98, 91, 223)");
});

test("listing cards anchor venue details and reveal the calendar tooltip", async ({
  page,
}) => {
  await page.goto("/akce");
  await expect(page.locator("[data-events-grid]")).toBeVisible();
  const gaps = await page.locator("[data-event-card]").evaluateAll((cards) =>
    cards.flatMap((card) => {
      const details = card.querySelector("dl");
      const calendar = card.querySelector(
        "[data-calendar-action], [data-calendar-disabled]",
      );
      return details && calendar
        ? [
            calendar.getBoundingClientRect().top -
              details.getBoundingClientRect().bottom,
          ]
        : [];
    }),
  );
  expect(gaps.length).toBeGreaterThan(0);
  expect(gaps.every((gap) => gap < 80)).toBe(true);

  const card = page.locator('[data-event-card="brno-ai-meetup"]');
  const calendar = card.locator("[data-calendar-action]");
  const tooltip = card.locator("[data-calendar-tooltip]");
  await expect(card.locator("[data-event-date-badge]")).toContainText(
    /\d{1,2}\.\d{1,2}\./,
  );
  await expect(card.locator("[data-event-time]")).toContainText(/\d{2}:\d{2}/);
  await expect(tooltip).toHaveText("Přidat do kalendáře");
  await expect(tooltip).toBeHidden();
  await calendar.hover();
  await expect(tooltip).toBeVisible();
  await page.mouse.move(0, 0);
  await calendar.focus();
  await expect(tooltip).toBeVisible();
});

test("event detail pages no longer exist", async ({ page }) => {
  for (const path of ["/akce/brno-ai-meetup", "/en/akce/brno-ai-meetup"]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(404);
  }
});

test("events pages reflow on phones without horizontal overflow", async ({
  page,
}) => {
  await page.goto("/akce");
  await expect(page.locator("[data-events-grid]")).toBeVisible();
  for (const [width, columns] of [
    [360, 1],
    [800, 2],
    [1280, 3],
    [1920, 3],
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => window.innerWidth)).toBe(width);
    await expect
      .poll(() =>
        page
          .locator("[data-events-grid]")
          .evaluate(
            (element) =>
              getComputedStyle(element).gridTemplateColumns.split(" ").length,
          ),
      )
      .toBe(columns);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(overflow, `${width}px`).toBe(false);
  }
});
