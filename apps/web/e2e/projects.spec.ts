import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("project data line connects milestones outside the cards", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const timeline = page.locator("#work .case-grid--timeline");
  await timeline.scrollIntoViewIfNeeded();
  await expect(timeline.locator(".project-timeline__node")).toHaveCount(5);
  await expect(
    timeline.locator(".case-card .project-timeline__milestone"),
  ).toHaveCount(0);

  for (const item of await timeline.locator(".project-timeline__item").all()) {
    const positions = await item.evaluate((element) => {
      const milestone = element
        .querySelector(".project-timeline__milestone")!
        .getBoundingClientRect();
      const card = element.querySelector(".case-card")!.getBoundingClientRect();
      return { milestoneBottom: milestone.bottom, cardTop: card.top };
    });
    expect(positions.milestoneBottom).toBeLessThanOrEqual(
      positions.cardTop + 1,
    );
  }
});

test("project cards become a vertical timeline on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");

  const timeline = page.locator("#work .case-grid--timeline");
  await timeline.scrollIntoViewIfNeeded();
  await expect(page.locator(".technical-background--work")).toHaveCount(0);
  await expect(timeline.locator(".case-card")).toHaveCount(5);

  const timelineRule = await timeline.evaluate((element) => {
    const style = getComputedStyle(element, "::before");
    return {
      content: style.content,
      width: style.width,
      backgroundColor: style.backgroundColor,
    };
  });
  expect(timelineRule).toEqual({
    content: '\"\"',
    width: "1px",
    backgroundColor: "rgb(135, 148, 255)",
  });
});

test("English case study has localized metadata and language alternate", async ({
  page,
}) => {
  await page.goto("/en/work/robe");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Robe");
  await expect(page.getByRole("heading", { name: "My role" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Result" })).toBeVisible();
  await expect(page.locator(".case-detail__partner")).toHaveText(
    "In collaboration with Appio",
  );
  await expect(page.locator(".case-detail__partner a")).toHaveAttribute(
    "href",
    "https://appio.dev/",
  );
  await expect(page.locator(".case-detail__partner a")).toHaveAttribute(
    "rel",
    "noopener noreferrer",
  );
  await expect(page.locator(".case-detail__closing a")).toHaveCount(3);
  await expect(page.locator('a[href*="portfolio.vantuch.dev"]')).toHaveCount(0);
  const technologyTags = page.locator(".case-detail__stack-tags .ui-pill");
  await expect(technologyTags).toHaveCount(3);
  const tagHeights = await technologyTags.evaluateAll((tags) =>
    tags.map((tag) => tag.getBoundingClientRect().height),
  );
  for (const height of tagHeights) expect(height).toBeLessThanOrEqual(32);
  await expect(
    page.locator('link[rel="alternate"][hreflang="cs"]'),
  ).toHaveAttribute("href", "https://vantuch.dev/work/robe");

  await page.goto("/en/work/my213");
  await expect(page.locator(".case-detail__partner a")).toHaveAttribute(
    "href",
    "https://www.prorocketeers.com/",
  );
});
