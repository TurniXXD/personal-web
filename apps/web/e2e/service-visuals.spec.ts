import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("gift voucher demo clearly simulates payment, PDF and redemption states", async ({
  page,
}) => {
  await page.goto("/sluzby/darkove-poukazy", {
    waitUntil: "domcontentloaded",
  });

  const headline = page.getByRole("heading", {
    name: "Dárkové poukazy bez starostí.",
  });
  await expect(headline).toBeVisible();
  expect(
    await headline.evaluate((element) => {
      const style = getComputedStyle(element);
      return (
        Number.parseFloat(style.lineHeight) / Number.parseFloat(style.fontSize)
      );
    }),
  ).toBeGreaterThanOrEqual(1.07);
  await page.getByLabel("Jméno příjemce").fill("Jakub Vantuch");
  await expect(page.locator(".voucher-demo__paper")).toContainText(
    "Jakub Vantuch",
  );
  const confirmPayment = page.getByRole("button", {
    name: "Simulovat potvrzenou platbu",
  });
  await expect(confirmPayment).toBeEnabled();
  await confirmPayment.click();
  await expect(
    page.getByText("Platba potvrzena", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Připravit ukázkové PDF" }).click();
  await expect(page.getByText("PDF připraveno", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Simulovat uplatnění obsluhou" })
    .click();
  await expect(page.getByText("Uplatněno", { exact: true })).toBeVisible();
  await expect(page.locator(".service-detail-faq__items details")).toHaveCount(
    5,
  );
  await expect(page.locator(".service-detail-section")).toHaveCount(3);
  await expect(page.locator("#sprava .service-detail-card")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "Opětovné odeslání" }),
  ).toHaveCount(0);
  await expect(page.locator("#znacka-a-zazitek")).toHaveClass(
    /service-detail-section--navy/,
  );
  await expect(
    page.getByRole("heading", {
      name: "Poukaz, který působí jako přirozená součást vaší značky.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Ověřený webhook", { exact: true })).toHaveCount(
    0,
  );
  await expect(page.locator(".service-detail-workflow article")).toHaveCount(4);
  await expect(page.locator(".service-detail-use-cases")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Související služby", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("SOUVISEJÍCÍ SLUŽBY", { exact: true }),
  ).toHaveCount(0);
  await expect(page.getByText("Ověření platby", { exact: true })).toHaveCount(
    0,
  );
  await expect(page.locator(".service-detail-final-cta")).toHaveCount(0);
});

test("priority service detail pages stay usable without horizontal overflow on mobile", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 375, height: 844 });

  for (const path of [
    "/sluzby/vernostni-programy",
    "/sluzby/darkove-poukazy",
    "/sluzby/audit-ai-aplikaci",
  ]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main.service-detail")).toBeVisible();
    await expect(
      page.locator(".service-detail-hero .service-detail-visual"),
    ).toBeHidden();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `${path} should fit the mobile viewport`).toBe(0);
  }

  await page.goto("/sluzby/vernostni-programy", {
    waitUntil: "domcontentloaded",
  });
  const adminColumns = await page
    .locator(".loyalty-admin-preview")
    .evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.split(" "),
    );
  expect(adminColumns).toHaveLength(1);
  const firstFaq = page.locator(".service-detail-faq details").first();
  await firstFaq.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(firstFaq).toHaveAttribute("open", "");
});

test("service detail pages use distinct localized hero visuals", async ({
  page,
}) => {
  const serviceHeroes = [
    ["/sluzby/firemni-weby", ".service-core-hero--company"],
    ["/sluzby/webove-aplikace-na-miru", ".service-core-hero--web-app"],
    ["/sluzby/shoptet", ".service-core-hero--shoptet"],
    ["/sluzby/vernostni-programy", ".service-custom-hero--loyalty"],
    ["/sluzby/darkove-poukazy", ".service-custom-hero--voucher"],
    ["/sluzby/audit-ai-aplikaci", ".service-custom-hero--audit"],
  ] as const;

  for (const [path, selector] of serviceHeroes) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.locator(selector)).toBeVisible();
    await expect(page.locator(".service-detail-visual__window")).toHaveCount(0);
  }

  await page.goto("/en/sluzby/firemni-weby");
  await expect(page.locator(".service-core-hero--company")).toContainText(
    "Start an enquiry",
  );
  await page.goto("/en/sluzby/webove-aplikace-na-miru");
  await expect(page.locator(".service-core-hero--web-app")).toContainText(
    "Operations overview",
  );
  await page.goto("/en/sluzby/shoptet");
  await expect(page.locator(".service-core-hero--shoptet")).toContainText(
    "Add to basket",
  );
  await page.goto("/en/sluzby/vernostni-programy");
  await expect(page.locator(".service-custom-hero--loyalty")).toContainText(
    "My loyalty card",
  );
  await page.goto("/en/sluzby/darkove-poukazy");
  await expect(page.locator(".service-custom-hero--voucher")).toContainText(
    "Voucher issued",
  );
  await page.goto("/en/sluzby/audit-ai-aplikaci");
  await expect(page.locator(".service-custom-hero--audit")).toContainText(
    "Technical review",
  );
});

test("web application hero presents animated analytics charts", async ({
  page,
}) => {
  await page.goto("/sluzby/webove-aplikace");

  const visual = page.locator('[data-web-visual="animated-charts"]');
  await expect(visual.locator('[data-web-visual-part="metric"]')).toHaveCount(
    2,
  );
  await expect(
    visual.locator('[data-web-visual-part="line-chart"]'),
  ).toHaveCount(1);
  await expect(
    visual.locator('[data-web-visual-part="donut-card"]'),
  ).toHaveCount(1);
  await expect(
    visual.locator('[data-web-visual-part="bars"] > span'),
  ).toHaveCount(6);
  await expect(
    visual.locator('[data-web-visual-part="chart-line"]'),
  ).not.toHaveCSS("animation-name", "none");
  await expect(visual.locator('[data-web-visual-part="chart-line"]')).toHaveCSS(
    "animation-iteration-count",
    "infinite",
  );
  await expect(
    visual.locator('[data-web-visual-part="bars"] > span').first(),
  ).not.toHaveCSS("animation-name", "none");
  await expect(
    visual.locator('[data-web-visual-part="bars"] > span').first(),
  ).toHaveCSS("animation-iteration-count", "infinite");
  await expect(visual).not.toHaveAttribute("data-scroll-progress");
  await expect(visual.locator("[data-web-visual-tile]")).toHaveCount(0);
});

test("web application charts respect reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sluzby/webove-aplikace");

  await expect(page.locator('[data-web-visual-part="chart-line"]')).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(
    page.locator('[data-web-visual-part="bars"] > span').first(),
  ).toHaveCSS("transform", "none");
});
