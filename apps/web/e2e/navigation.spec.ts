import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("services navigation groups all service routes in an accessible dropdown", async ({
  page,
}) => {
  await page.goto("/");

  const desktopLanguageToggle = page.locator(
    ".site-header__actions .site-header__language-toggle",
  );
  await expect(desktopLanguageToggle).toHaveText("EN");
  await expect(desktopLanguageToggle).toHaveAttribute("href", "/en");
  await expect(desktopLanguageToggle).toHaveAccessibleName(
    "Přepnout do angličtiny",
  );

  const dropdown = page.locator(".site-header__services");
  const trigger = dropdown.getByRole("button", { name: "Služby" });
  const serviceLinks = page.locator('[data-slot="dropdown-menu-content"] a');

  await expect(trigger).toContainText("Služby");
  await expect(trigger.locator("svg")).toHaveCount(1);
  await expect(
    page.locator('.site-header__nav > a[href="/automatizace"]'),
  ).toHaveCount(0);

  await dropdown.hover();
  await expect(trigger).toHaveAttribute("data-state", "open");
  await expect(trigger).toHaveCSS("outline-style", "none");
  await serviceLinks.first().hover();
  await expect(serviceLinks.first()).toHaveCSS("outline-style", "none");
  await page.locator(".site-logo").hover();
  await expect(trigger).toHaveAttribute("data-state", "closed");

  await trigger.click();
  await expect(trigger).toHaveAttribute("data-state", "open");
  await expect(trigger).toHaveCSS("outline-style", "none");
  await page.locator("main").click({ position: { x: 5, y: 5 } });
  await expect(trigger).toHaveAttribute("data-state", "closed");

  await trigger.click();
  await expect(trigger).toHaveAttribute("data-state", "open");
  await page.locator(".site-logo").hover();
  await expect(trigger).toHaveAttribute("data-state", "open");
  await trigger.click();
  await expect(trigger).toHaveAttribute("data-state", "closed");

  // Start keyboard navigation with a fresh menu state, independent of the
  // preceding mouse hover/click sequence and its delayed close timer.
  await page.reload();
  await trigger.focus();
  await trigger.press("Enter");
  await expect(trigger).toHaveAttribute("data-state", "open");
  await expect
    .poll(() =>
      serviceLinks.evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("href")),
      ),
    )
    .toEqual([
      "/sluzby/webove-aplikace",
      "/automatizace",
      "/sluzby/ai-reseni",
      "/sluzby/vernostni-programy",
      "/sluzby/darkove-poukazy",
      "/sluzby/audit-ai-aplikaci",
    ]);
  await expect(serviceLinks.last()).toContainText(
    "Bezpečnost, výkon a dokončení AI aplikací",
  );
  await expect(serviceLinks.last().locator("svg")).toHaveCount(1);
  for (const serviceLink of await serviceLinks.all()) {
    await expect(serviceLink).toHaveCSS("cursor", "pointer");
  }

  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");
  const mobileLanguageToggle = page.locator(
    ".site-header__mobile-controls .site-header__language-toggle",
  );
  await expect(mobileLanguageToggle).toBeVisible();
  await expect(mobileLanguageToggle).toHaveText("EN");
  await expect(mobileLanguageToggle).toHaveAttribute("href", "/en");
  await page.locator(".site-header__mobile > summary").click();
  await expect(
    page.locator(".site-header__mobile > nav").getByText("English", {
      exact: true,
    }),
  ).toHaveCount(0);
  const mobileServices = page.locator(".site-header__mobile-services");
  await mobileServices.locator("> summary").click();
  await expect(mobileServices).toHaveAttribute("open", "");
  await expect(mobileServices.locator("a")).toHaveCount(6);
  await expect(mobileServices.locator("small").first()).toBeHidden();

  const mobilePanel = page.locator(".site-header__mobile > nav");
  const panelBox = await mobilePanel.boundingBox();
  const servicesBox = await mobileServices.boundingBox();
  const servicesSummaryBox = await mobileServices
    .locator("> summary")
    .boundingBox();
  const firstServiceTitleBox = await mobileServices
    .locator("a strong")
    .first()
    .boundingBox();
  expect(panelBox).not.toBeNull();
  expect(servicesBox).not.toBeNull();
  expect(servicesSummaryBox).not.toBeNull();
  expect(firstServiceTitleBox).not.toBeNull();
  expect(panelBox!.width).toBeGreaterThanOrEqual(340);
  expect(servicesBox!.width).toBeGreaterThanOrEqual(320);
  expect(
    firstServiceTitleBox!.x - servicesSummaryBox!.x,
  ).toBeGreaterThanOrEqual(18);

  await page
    .locator(".site-header__mobile > nav")
    .getByRole("link", { name: "Projekty" })
    .click();
  await expect(mobileServices).not.toHaveAttribute("open", "");
  await expect(page.locator(".site-header__mobile")).toHaveAttribute(
    "open",
    "",
  );

  await page.locator("main").click({ position: { x: 5, y: 5 } });
  await expect(page.locator(".site-header__mobile")).not.toHaveAttribute(
    "open",
    "",
  );

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/en");
  const englishLanguageToggle = page.locator(
    ".site-header__actions .site-header__language-toggle",
  );
  await expect(englishLanguageToggle).toHaveText("CZ");
  await expect(englishLanguageToggle).toHaveAttribute("href", "/");
  await expect(englishLanguageToggle).toHaveAccessibleName("Switch to Czech");
});

test("mobile header and hero use the compact presentation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");

  const menu = page.getByLabel("Otevřít menu");
  await expect(menu).toBeVisible();
  await expect(menu.locator("svg")).toHaveCount(1);
  await expect(menu).not.toContainText("Menu");
  await expect(page.locator(".hero-art")).toBeHidden();
  await expect(page.locator(".hero__proof")).toBeHidden();

  const projectCard = page.locator(".case-card").first();
  await projectCard.evaluate((card) =>
    card.scrollIntoView({ block: "center" }),
  );
  await expect(projectCard).not.toHaveAttribute("data-card-entrance", /.+/);
  await expect(projectCard.locator(".case-card__link")).toBeVisible();
  await expect(projectCard.locator(".case-card__meta")).toHaveCount(0);
  await expect(projectCard.locator(".case-card__detail")).toHaveCount(0);
  await expect(projectCard.locator(".case-card__contribution")).toHaveCount(0);

  const titleSize = await page
    .locator("#hero-title")
    .evaluate((title) => parseFloat(getComputedStyle(title).fontSize));
  expect(titleSize).toBeLessThan(47);
});

test("mobile heroes show copy only and hide right-side visuals", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });

  for (const [path, visual, heading] of [
    ["/", ".hero-art", "#hero-title"],
    ["/sluzby/webove-aplikace", ".service-hero-visual", "#service-hero-title"],
    [
      "/automatizace",
      ".automation-page-hero__visual",
      "#automation-page-hero-title",
    ],
    [
      "/sluzby/webove-aplikace-na-miru",
      ".service-detail-visual",
      "#service-detail-title",
    ],
    ["/doporuceni", ".referral-hero__visual", "#referral-title"],
  ] as const) {
    await page.goto(path);
    await expect(page.locator(heading)).toBeVisible();
    await expect(page.locator(visual)).toBeHidden();
  }
});
