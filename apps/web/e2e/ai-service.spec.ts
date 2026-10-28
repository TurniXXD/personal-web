import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("AI service page presents an interactive use-case carousel", async ({
  page,
}) => {
  await page.goto("/sluzby/ai-reseni");

  await expect(page).toHaveTitle(
    "Praktická AI řešení pro firmy | Jakub Vantuch",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Umělá inteligence, která má praktické využití.",
  );
  await expect(page.locator(".service-offering-card")).toHaveCount(6);
  await expect(
    page.getByRole("heading", { name: "Chatboti pro web" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Personalizované e-maily" }),
  ).toBeVisible();
  await expect(page.locator(".service-flow--ai")).toHaveCount(0);
  const carousel = page.locator(".ai-use-case-carousel");
  await expect(carousel).toBeVisible();
  await expect(carousel).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(carousel).toHaveCSS("border-top-style", "none");
  await expect(page.locator(".ai-use-cases__heading")).toHaveCount(0);
  await expect(carousel.locator(".ai-use-case-carousel__controls")).toHaveCount(
    0,
  );
  await expect(page.locator(".ai-use-cases")).toHaveCSS(
    "background-color",
    "rgb(32, 40, 75)",
  );
  await expect(
    carousel.locator(".ai-use-case-carousel__tabs button"),
  ).toHaveCount(6);
  await expect(
    carousel.locator(
      '.ai-use-case-carousel__slide[data-active="true"] .ai-use-case__workflow li',
    ),
  ).toHaveCount(4);
  await expect(
    carousel.getByRole("heading", {
      name: "Mějte přehled o trendech ve vašem oboru",
    }),
  ).toBeVisible();
  await carousel
    .getByRole("button", {
      name: "Příklad 2: Připravujte obsah na sociální sítě rychleji",
    })
    .click();
  await expect(
    carousel.getByRole("heading", {
      name: "Připravujte obsah na sociální sítě rychleji",
    }),
  ).toBeVisible();
  await carousel.focus();
  await carousel.press("ArrowRight");
  await expect(
    carousel.getByRole("heading", {
      name: "Proměňte příchozí poptávky v přehledné obchodní příležitosti",
    }),
  ).toBeVisible();
  await expect(page.locator(".service-process-step")).toHaveCount(5);
  await expect(page.locator(".service-hero__actions .ui-action")).toHaveCount(
    1,
  );
  await expect(page.locator(".service-scenarios")).toHaveCount(0);
  await expect(page.locator(".service-approach")).toHaveCount(0);
  await expect(page.locator(".service-related")).toHaveCount(1);
  await expect(page.locator(".service-related__links a")).toHaveCount(1);
  await expect(page.locator("#projects")).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "Proberme, zda AI dává smysl právě u vás.",
    }),
  ).toBeVisible();
  await expect(page.locator("#contact .contact-form")).toBeVisible();
});

test("AI offering cards use a single readable column on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/sluzby/ai-reseni");

  const grid = page.locator(".service-page--ai .service-offering__grid");
  const cards = grid.locator(".service-offering-card");

  await expect(cards).toHaveCount(6);
  await expect(grid).toHaveCSS("grid-template-columns", "343px");

  const boxes = await cards.evaluateAll((items) =>
    items.map((item) => {
      const box = item.getBoundingClientRect();
      return { left: box.left, right: box.right, width: box.width };
    }),
  );

  for (const box of boxes) {
    expect(box.width).toBeGreaterThan(300);
    expect(box.left).toBeGreaterThanOrEqual(0);
    expect(box.right).toBeLessThanOrEqual(375);
  }
});

test("AI use-case carousel keeps only compact text content on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/sluzby/ai-reseni");

  const activeSlide = page.locator(
    '.ai-use-case-carousel__slide[data-active="true"]',
  );
  const workflowSteps = activeSlide.locator(".ai-use-case__workflow li");

  await expect(activeSlide.locator(".ai-use-case__content")).toBeVisible();
  await expect(activeSlide.locator(".ai-case-visual")).toBeHidden();
  await expect(workflowSteps.first()).toHaveCSS("min-height", "28px");
  expect(
    await workflowSteps
      .first()
      .evaluate((step) => Number.parseFloat(getComputedStyle(step).columnGap)),
  ).toBeLessThanOrEqual(7);
});

test("AI use-case carousel is localized in English", async ({ page }) => {
  await page.goto("/en/sluzby/ai-reseni");

  const carousel = page.locator(".ai-use-case-carousel");
  await expect(
    carousel.getByRole("heading", {
      name: "Stay on top of trends in your industry",
    }),
  ).toBeVisible();
  await carousel
    .getByRole("button", {
      name: "Example 2: Prepare social media content faster",
    })
    .click();
  await expect(
    carousel.getByRole("heading", {
      name: "Prepare social media content faster",
    }),
  ).toBeVisible();
});

test("AI use-case carousel keeps one height across every slide", async ({
  page,
}) => {
  for (const viewport of [
    { width: 1280, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/sluzby/ai-reseni");

    const carousel = page.locator(".ai-use-case-carousel");
    const tabs = carousel.locator(".ai-use-case-carousel__tabs button");
    const heights: number[] = [];

    for (let index = 0; index < 6; index += 1) {
      await tabs.nth(index).click();
      await expect(
        carousel.locator(
          `.ai-use-case-carousel__slide[data-active="true"]#ai-use-case-panel-${
            [
              "trends",
              "social-content",
              "enquiries",
              "quotations",
              "reviews",
              "recommendations",
            ][index]
          }`,
        ),
      ).toBeVisible();
      heights.push(
        await carousel.evaluate((element) =>
          Math.round(element.getBoundingClientRect().height),
        ),
      );
    }

    expect(new Set(heights).size).toBe(1);
  }
});

test("AI use-case carousel advances every six seconds until a step is clicked", async ({
  page,
}) => {
  await page.goto("/sluzby/ai-reseni");

  const carousel = page.locator(".ai-use-case-carousel");
  const thirdSlide = carousel.locator("#ai-use-case-panel-enquiries");
  const activeSlide = carousel.locator(
    '.ai-use-case-carousel__slide[data-active="true"]',
  );

  await carousel.hover();
  const initialSlideId = await activeSlide.getAttribute("id");
  await expect
    .poll(() => activeSlide.getAttribute("id"), { timeout: 8_000 })
    .not.toBe(initialSlideId);
  const intervalStartSlideId = await activeSlide.getAttribute("id");
  await page.waitForTimeout(5_000);
  await expect(activeSlide).toHaveAttribute("id", intervalStartSlideId ?? "");
  await expect
    .poll(() => activeSlide.getAttribute("id"), { timeout: 2_000 })
    .not.toBe(intervalStartSlideId);

  await carousel
    .getByRole("button", {
      name: "Příklad 3: Proměňte příchozí poptávky v přehledné obchodní příležitosti",
    })
    .click();
  await expect(thirdSlide).toHaveAttribute("data-active", "true");
  await page.waitForTimeout(6_500);
  await expect(thirdSlide).toHaveAttribute("data-active", "true");
});

test("AI hero diagram stays legible and separates with scroll", async ({
  page,
}) => {
  await page.goto("/sluzby/ai-reseni");

  const visual = page.locator('[data-ai-visual="scroll-apart"]');
  const inputs = visual.locator(".ai-pipeline__input");
  const outputs = visual.locator(".ai-pipeline__output");
  const inputGroup = visual.locator(".ai-pipeline__inputs");

  await expect(inputs).toHaveCount(3);
  await expect(outputs).toHaveCount(4);
  await expect(outputs.locator("strong")).toHaveText([
    "Faktura",
    "Smlouva",
    "Analýza",
    "Dokumentace",
  ]);
  await expect(inputs.first()).not.toHaveCSS("animation-name", "none");
  await expect(outputs.first()).not.toHaveCSS("animation-name", "none");
  await expect
    .poll(async () => Number(await visual.getAttribute("data-scroll-progress")))
    .toBeLessThan(0.03);

  await page.evaluate(() => window.scrollTo(0, 480));
  await expect
    .poll(async () => Number(await visual.getAttribute("data-scroll-progress")))
    .toBeGreaterThan(0.55);
  await expect(inputGroup).not.toHaveCSS("transform", "none");

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect
    .poll(async () => Number(await visual.getAttribute("data-scroll-progress")))
    .toBeLessThan(0.03);
});
