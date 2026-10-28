import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("automation cards stay compact with icons aligned to their titles", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");

  const cards = page.locator(".automation-category-card");
  await expect(cards).toHaveCount(6);
  const heights = await cards.evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().height),
  );
  for (const height of heights) expect(height).toBeLessThanOrEqual(150);

  const firstTitle = await cards.first().locator("h3").boundingBox();
  const firstIcon = await cards
    .first()
    .locator(".content-card__icon")
    .boundingBox();
  expect(firstTitle).not.toBeNull();
  expect(firstIcon).not.toBeNull();
  const titleCenter = firstTitle!.y + firstTitle!.height / 2;
  const iconCenter = firstIcon!.y + firstIcon!.height / 2;
  expect(Math.abs(titleCenter - iconCenter)).toBeLessThanOrEqual(1);
  expect(firstIcon!.width).toBeLessThanOrEqual(43);
});

test("automation page filters non-clickable examples", async ({ page }) => {
  await page.goto("/automatizace");

  await expect(page).toHaveTitle(
    "Automatizace procesů a AI řešení na míru | Jakub Vantuch",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Rutinu nechte běžet. Soustřeďte se na růst.",
  );
  await expect(page.locator(".automation-scroll-story")).toHaveCount(0);
  await expect(page.locator(".automation-page-hero__visual li")).toHaveCount(3);
  await expect(page.locator(".automation-closing")).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "Nevíte, co by šlo automatizovat právě u vás?",
    }),
  ).toBeVisible();
  await expect(page.locator(".automation-example")).toHaveCount(9);
  for (const filter of await page.locator(".automation-filters button").all()) {
    await expect(filter).toHaveCSS("cursor", "pointer");
  }
  await expect(page.locator(".automation-catalog__count")).toHaveCount(0);
  await expect(page.locator(".automation-catalog__notice")).toHaveCount(0);
  await expect(page.locator(".automation-example__facts")).toHaveCount(0);
  await expect(page.getByText("Kdy se spustí", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Přínos", { exact: true })).toHaveCount(0);
  await expect(
    page.locator(
      ".automation-example__top > span:not(.automation-example__icon)",
    ),
  ).toHaveCount(0);
  const relatedProducts = page.locator(".automation-example").filter({
    hasText: "Automaticky doporučujte související produkty",
  });
  await expect(relatedProducts).toBeVisible();
  await expect(
    relatedProducts.locator(".content-card__tag").first(),
  ).toHaveText("E-shop");
  await expect(
    relatedProducts.locator(".content-card__tag--accent"),
  ).toHaveText("AI");
  const cardHeights = await page
    .locator(".automation-example")
    .evaluateAll((cards) =>
      cards.map((card) => card.getBoundingClientRect().height),
    );
  expect(Math.max(...cardHeights) - Math.min(...cardHeights)).toBeLessThan(1);

  const more = page.getByRole("button", { name: "Zobrazit další příklady" });
  await more.click();
  await more.click();
  await more.click();
  await expect(page.locator(".automation-example")).toHaveCount(23);

  await page.getByRole("button", { name: "E-shop", exact: true }).click();
  await expect(page.locator(".automation-example")).toHaveCount(6);
  await expect(relatedProducts).toBeVisible();

  await page.getByRole("button", { name: "Dokumenty a AI" }).click();
  await expect(page.locator(".automation-example")).toHaveCount(5);
  await expect(page.locator(".content-card__tag--accent")).toHaveCount(4);

  const first = page.locator(".automation-example").first();
  await expect(first).not.toHaveAttribute("href");
  await expect(first.locator("a, button")).toHaveCount(0);
  await expect(page.locator(".automation-example__contact")).toHaveCount(0);
  await expect(page.getByText("Chci podobnou automatizaci")).toHaveCount(0);
});

test("automation page is localized, indexed and fits mobile width", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/en/automatizace");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Let routine work run itself. Focus on growth.",
  );
  await expect(page.locator(".automation-scroll-story")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Documents and AI" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Automatically recommend related products",
    }),
  ).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBe(0);

  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("https://vantuch.dev/en/automatizace");
});
