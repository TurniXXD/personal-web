import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("service cards are semantic links with complete-card navigation", async ({
  page,
}) => {
  await page.goto("/");

  const cards = page.locator(".service-card");
  await expect(cards).toHaveCount(3);
  expect(
    await cards.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href")),
    ),
  ).toEqual(["/sluzby/webove-aplikace", "/automatizace", "/sluzby/ai-reseni"]);
  await expect(cards).toHaveText([
    /Weby a aplikace.*Zjistit více/,
    /Automatizace procesů.*Zjistit více/,
    /AI řešení.*Zjistit více/,
  ]);
  expect(await cards.first().evaluate((element) => element.tagName)).toBe("A");

  await expect(cards.first().locator("h3")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(cards.first().locator(".content-card__icon")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(cards.first().locator(".content-card__tag").first()).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(cards.first().locator(".content-card__description")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(cards.first().locator(".content-card__action")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(cards.first().locator(".content-card__action")).toHaveCSS(
    "transition-delay",
    "0s",
  );
  await expect(cards.first().locator(".content-card__action svg")).toHaveCSS(
    "transition-duration",
    "0s",
  );

  await cards.first().focus();
  await expect(cards.first()).toBeFocused();
  await expect(cards.first()).toHaveCSS("outline-style", "solid");

  for (const [index, path] of [
    "/sluzby/webove-aplikace",
    "/automatizace",
    "/sluzby/ai-reseni",
  ].entries()) {
    await page.goto("/");
    await page.locator(".service-card").nth(index).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
  }
});

test("service cards stay compact with icons aligned to their titles", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");

  const cards = page.locator(".service-card");
  const heights = await cards.evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().height),
  );
  for (const height of heights) expect(height).toBeLessThanOrEqual(250);

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
  await expect(cards.first().locator(".content-card__tags")).toBeHidden();
  await expect(cards.first().locator(".content-card__action")).toHaveCSS(
    "visibility",
    "visible",
  );
  await expect(cards.first().locator(".content-card__action")).toHaveCSS(
    "opacity",
    "1",
  );
});

test("learn more links stay visible on tablet without hover", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto("/sluzby/webove-aplikace");

  const actions = page.locator(".service-offering-card .content-card__action");
  const firstCard = page.locator(".service-offering-card").first();
  const backgroundBeforeHover = await firstCard.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );

  await expect(actions).toHaveCount(4);
  await expect(actions.first()).toHaveCSS("visibility", "visible");
  await expect(actions.first()).toHaveCSS("opacity", "1");
  await firstCard.hover();
  await expect(firstCard).toHaveCSS("background-color", backgroundBeforeHover);
  await expect(firstCard.locator(".content-card__watermark")).toHaveCSS(
    "opacity",
    "0",
  );
});

test("project cards update foreground instantly without a fallback watermark", async ({
  page,
}) => {
  await page.goto("/");

  const card = page.locator(".case-card").first();
  await expect(card.locator(".case-card__watermark")).toHaveCount(0);
  await expect(card.locator(".case-card__description")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(card.locator(".case-card__action")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(card.locator(".case-card__action")).toHaveCSS(
    "transition-delay",
    "0s",
  );
  await expect(card.locator(".case-card__action svg")).toHaveCSS(
    "transition-duration",
    "0s",
  );
});

test("related service cards switch every hover layer instantly", async ({
  page,
}) => {
  await page.goto("/sluzby/webove-aplikace-na-miru");

  const card = page.locator(".service-detail-related__card").first();
  for (const part of [
    card,
    card.locator(".service-detail-related__watermark"),
    card.locator("h3"),
    card.locator("p"),
    card.locator("strong"),
    card.locator("strong svg"),
  ]) {
    await expect(part).toHaveCSS("transition-duration", "0s");
    await expect(part).toHaveCSS("transition-delay", "0s");
  }
});

test("content cards share one component across service and automation pages", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".service-card.content-card")).toHaveCount(3);
  await expect(
    page.locator(".automation-category-card.content-card"),
  ).toHaveCount(6);

  await page.goto("/sluzby/ai-reseni");
  await expect(page.locator(".service-offering-card.content-card")).toHaveCount(
    6,
  );

  await page.goto("/automatizace");
  await expect(page.locator(".automation-example.content-card")).toHaveCount(9);
});

test("every user-facing card title uses regular font weight", async ({
  page,
}) => {
  const expectRegularTitles = async (selectors: string[]) => {
    for (const selector of selectors) {
      const titles = page.locator(selector);
      await expect(titles.first(), selector).toBeVisible();
      await expect(titles.first(), selector).toHaveCSS("font-weight", "400");
    }
  };

  await page.goto("/");
  await expectRegularTitles([
    ".service-card h3",
    ".automation-category-card h3",
    ".case-card h3",
    ".process-step h3",
    ".social-platform-card > strong",
  ]);

  await page.goto("/sluzby/webove-aplikace");
  await expectRegularTitles([
    ".service-offering-card h3",
    ".service-process-step h3",
    ".service-related__links strong",
  ]);

  await page.goto("/sluzby/webove-aplikace-na-miru");
  await expectRegularTitles([
    ".service-detail-card h3",
    ".service-detail-workflow__grid h3",
    ".service-detail-use-cases__list h3",
    ".service-detail-related__card h3",
  ]);
});
