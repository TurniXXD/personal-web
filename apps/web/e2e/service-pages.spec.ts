import { expect } from "@playwright/test";
import { test } from "./site-fixture";
import {
  serviceDetailCopy,
  serviceDetailSlugs,
} from "../lib/services/detail-content";

test("web applications service page presents real work and contact flow", async ({
  page,
}) => {
  await page.goto("/sluzby/webove-aplikace");

  await expect(page).toHaveTitle(
    "Weby a webové aplikace na míru | Jakub Vantuch",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Webové aplikace na míru.",
  );
  await expect(page.locator(".service-offering-card")).toHaveCount(4);
  await expect(
    page.getByRole("heading", { name: "Audit vibecoded aplikací" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "E-shopy na Shoptetu" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Digitální věrnostní programy" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Dárkové poukazy" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "API a integrace" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "CMS a správa obsahu" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Webová analytika" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "CRM a práce se zákazníky" }),
  ).toHaveCount(0);
  await expect(page.locator(".service-benefits")).toHaveCount(0);
  await expect(page.locator("#projects .case-card")).toHaveCount(5);
  await expect(
    page.locator("#projects + .service-pipeline-divider"),
  ).toHaveCount(0);
  const related = page.locator(".service-related--with-divider");
  const divider = related.locator(".service-pipeline-divider");
  await expect(divider).toHaveCount(1);
  await related.locator(".service-related__content").scrollIntoViewIfNeeded();
  await expect(
    related.locator(".service-related__links a").first(),
  ).toBeInViewport();
  const dividerPosition = await related.evaluate((section) => {
    const content = section.querySelector(".service-related__content");
    const line = section.querySelector(".service-pipeline-divider");
    if (!content || !line) return null;
    return {
      spaceAbove:
        line.getBoundingClientRect().top -
        content.getBoundingClientRect().bottom,
      spaceBelow:
        section.getBoundingClientRect().bottom -
        line.getBoundingClientRect().bottom,
    };
  });
  expect(dividerPosition?.spaceAbove).toBeGreaterThan(80);
  expect(dividerPosition?.spaceBelow).toBeLessThan(1);
  await expect(
    page.locator(".service-hero + .service-pipeline-divider"),
  ).toHaveCount(0);
  await expect(page.locator("#projects")).toHaveCSS(
    "background-color",
    "rgb(23, 30, 60)",
  );
  await expect(page.locator(".service-process-step")).toHaveCount(5);
  await expect(page.locator(".service-related__links a")).toHaveCount(3);
  await expect(
    page.getByRole("heading", {
      name: "Potřebujete pomoci i s marketingem?",
    }),
  ).toBeVisible();
  await expect(page.locator("#contact .contact-form")).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://vantuch.dev/sluzby/webove-aplikace",
  );
});

test("related solutions keep the data line at their end on mobile and in English", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/sluzby/webove-aplikace", {
    waitUntil: "domcontentloaded",
  });

  const related = page.locator(".service-related--with-divider");
  await related.scrollIntoViewIfNeeded();
  const positions = await related.evaluate((section) => {
    const content = section.querySelector(".service-related__content");
    const line = section.querySelector(".service-pipeline-divider");
    if (!content || !line) return null;
    return {
      spaceAbove:
        line.getBoundingClientRect().top -
        content.getBoundingClientRect().bottom,
      spaceBelow:
        section.getBoundingClientRect().bottom -
        line.getBoundingClientRect().bottom,
    };
  });

  expect(positions?.spaceAbove).toBeGreaterThan(60);
  expect(positions?.spaceBelow).toBeLessThan(1);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    ),
  ).toBe(0);
});

test("all web service cards are stable accessible links to valid detail pages", async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  const expectedPaths = [
    "/sluzby/firemni-weby",
    "/sluzby/webove-aplikace-na-miru",
    "/sluzby/shoptet",
    "/sluzby/vernostni-programy",
    "/sluzby/audit-ai-aplikaci",
    "/sluzby/darkove-poukazy",
  ];
  const expectedOfferingPaths = [
    "/sluzby/firemni-weby",
    "/sluzby/webove-aplikace-na-miru",
    "/sluzby/shoptet",
    "/sluzby/audit-ai-aplikaci",
  ];
  expect(serviceDetailSlugs.map((slug) => `/sluzby/${slug}`)).toEqual(
    expectedPaths,
  );
  for (const locale of ["cs", "en"] as const) {
    for (const slug of serviceDetailSlugs) {
      const related = serviceDetailCopy[locale][slug].related;
      expect(related).not.toContain(slug);
      expect(new Set(related).size).toBe(related.length);
      related.forEach((relatedSlug) => {
        expect(serviceDetailSlugs).toContain(relatedSlug);
      });
    }
  }

  await page.goto("/sluzby/webove-aplikace", {
    waitUntil: "domcontentloaded",
  });
  const cards = page.locator(".service-offering-card");
  await expect(cards).toHaveCount(4);
  expect(
    await cards.evaluateAll((items) => items.map((item) => item.tagName)),
  ).toEqual(Array(4).fill("A"));
  expect(
    await cards.evaluateAll((items) =>
      items.map((item) => item.getAttribute("href")),
    ),
  ).toEqual(expectedOfferingPaths);
  await expect(
    page.getByRole("heading", { name: "Dárkové poukazy" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Digitální věrnostní programy" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "E-mailing a automatizace" }),
  ).toHaveCount(0);

  const first = cards.first();
  await first.scrollIntoViewIfNeeded();
  await expect(page.locator(".service-offering__grid")).toHaveAttribute(
    "data-reveal-state",
    "visible",
  );
  await expect
    .poll(() =>
      first.evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
      }),
    )
    .toBeCloseTo(0, 1);
  const measureDocumentBox = () =>
    first.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      };
    });
  const before = await measureDocumentBox();
  await expect(first.locator(".content-card__action")).toHaveCSS(
    "opacity",
    "0",
  );
  await first.hover();
  await expect(first.locator(".content-card__action")).toHaveCSS(
    "opacity",
    "1",
  );
  const after = await measureDocumentBox();
  expect(after.top).toBeCloseTo(before.top, 1);
  expect(after.left).toBeCloseTo(before.left, 1);
  expect(after.width).toBeCloseTo(before.width, 1);
  expect(after.height).toBeCloseTo(before.height, 1);
  await first.focus();
  await expect(first).toBeFocused();
  await expect(first.locator(".content-card__action")).toContainText(
    "Zjistit více",
  );

  const localizedPaths = expectedPaths.flatMap((path) => [path, `/en${path}`]);
  const responses = await Promise.all(
    localizedPaths.map((path) => request.get(path)),
  );
  responses.forEach((response, index) => {
    expect(
      response.ok(),
      `${localizedPaths[index]} should return a successful response`,
    ).toBe(true);
  });

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const sitemapXml = await sitemap.text();
  expectedPaths.forEach((path) => {
    expect(sitemapXml).toContain(`https://vantuch.dev${path}`);
    expect(sitemapXml).toContain(`https://vantuch.dev/en${path}`);
  });
  for (const removedPath of [
    "/sluzby/cms",
    "/sluzby/api-integrace",
    "/sluzby/webova-analytika",
    "/sluzby/crm",
  ]) {
    expect(sitemapXml).not.toContain(`https://vantuch.dev${removedPath}`);
    expect(sitemapXml).not.toContain(`https://vantuch.dev/en${removedPath}`);
    expect((await request.get(removedPath)).status()).toBe(404);
    expect((await request.get(`/en${removedPath}`)).status()).toBe(404);
  }

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain(
    "Sitemap: https://vantuch.dev/sitemap.xml",
  );
});

test("AI application audit page is complete, localized and production-oriented", async ({
  page,
}) => {
  await page.goto("/sluzby/audit-ai-aplikaci");

  await expect(page).toHaveTitle(
    "Audit AI aplikací a vibecoded MVP | Jakub Vantuch",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Vibe coded?",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Nechte to prověřit.",
  );
  await expect(page.locator(".service-detail-workflow article")).toHaveCount(6);
  await expect(page.locator(".service-detail-section")).toHaveCount(1);
  await expect(
    page.locator(".service-detail-use-cases__list article"),
  ).toHaveCount(0);
  await expect(page.locator(".service-detail-faq details")).toHaveCount(4);
  await expect(page.locator(".service-detail-benefits article")).toHaveCount(3);
  await expect(page.locator(".service-detail-section article")).toHaveCount(3);
  await expect(page.locator(".service-pipeline-divider")).toHaveCount(1);
  const auditMessage = page.locator("#contact-message");
  await expect(auditMessage).toHaveValue("");
  await expect(auditMessage).toHaveAttribute(
    "placeholder",
    "Napište mi pár slov o svém projektu nebo nápadu. Více probereme při úvodním hovoru.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://vantuch.dev/sluzby/audit-ai-aplikaci",
  );
  await expect
    .poll(() =>
      page.locator('script[type="application/ld+json"]').textContent(),
    )
    .toContain("Audit vibecoded aplikací");

  let servicePayload: Record<string, unknown> | undefined;
  await page.route("**/api/contact", async (route) => {
    servicePayload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });
  await expect(
    page.getByRole("complementary", { name: "Nastavení cookies" }),
  ).toHaveCount(0);
  const auditForm = page.locator(".contact-form");
  await auditForm.locator('[name="name"]').fill("Jakub Vantuch");
  await auditForm.locator('[name="email"]').fill("contact@vantuch.dev");
  await auditForm
    .locator('[name="message"]')
    .fill("Prosím o kontrolu aplikace.");
  await auditForm.getByRole("button", { name: "Odeslat zprávu" }).click();
  await expect
    .poll(() => servicePayload)
    .toMatchObject({
      message: "Prosím o kontrolu aplikace.",
      request: {
        type: "service",
        subject: "Audit vibecoded aplikací",
        sourcePath: "/sluzby/audit-ai-aplikaci",
      },
    });

  await page.goto("/en/sluzby/audit-ai-aplikaci");
  await expect(page).toHaveTitle(
    "AI application and vibecoded MVP audits | Jakub Vantuch",
  );
  await expect(page.locator(".service-detail-section article")).toHaveCount(3);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Built an application with AI?",
  );
  await expect(page.locator("#contact-message")).toHaveValue("");
  await expect(page.locator("#contact-message")).toHaveAttribute(
    "placeholder",
    "Tell me a little about your project or idea. We can discuss the details during an introductory call.",
  );
});

test("loyalty programme page omits the interactive card demo", async ({
  page,
}) => {
  await page.goto("/sluzby/vernostni-programy", {
    waitUntil: "domcontentloaded",
  });

  await expect(
    page.getByRole("heading", { name: "Dejte zákazníkům důvod se vracet." }),
  ).toBeVisible();
  await expect(page.getByText("7 z 10 návštěv")).toBeVisible();
  await expect(page.locator(".service-detail-demo")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Potvrdit návštěvu obsluhou" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Přehled věrnostního programu" }),
  ).toBeVisible();
  await expect(
    page.locator(".service-detail-hero + .service-detail-benefits"),
  ).toHaveCount(1);
  await expect(page.getByText("Aktivní zákazníci")).toBeVisible();
  const loyaltyMessage = page.locator("#contact-message");
  await expect(loyaltyMessage).toHaveValue("");
  await expect(loyaltyMessage).toHaveAttribute(
    "placeholder",
    "Napište mi pár slov o svém projektu nebo nápadu. Více probereme při úvodním hovoru.",
  );
  await expect(page.locator(".service-detail-faq__items details")).toHaveCount(
    5,
  );
  await expect(page.locator(".service-detail-section")).toHaveCount(2);
  await expect(page.locator(".service-detail-workflow article")).toHaveCount(4);
  await expect(page.locator(".service-detail-use-cases")).toHaveCount(0);
  await expect(page.locator(".service-detail-final-cta")).toHaveCount(0);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#administrace .service-detail-card")).toHaveCount(
    4,
  );
  await expect(
    page.getByRole("heading", { name: "Opravy a audit" }),
  ).toHaveCount(0);
  await expect(page.locator(".loyalty-admin-preview")).toBeHidden();
});
