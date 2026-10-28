import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("Czech homepage presents the offer and contact", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "cs");
  await expect(page).toHaveTitle(
    "Jakub Vantuch | Digital Solutions Consultant",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Navrhuji webové aplikace, automatizace a AI řešení, která firmám šetří čas a zjednodušují každodenní práci.",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Technologie, které firmám šetří čas a pomáhají růst.",
  );
  await expect(
    page.getByRole("heading", {
      name: "Weby a aplikace",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Automatizace procesů",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "AI řešení", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".service-card")).toHaveCount(3);
  await expect(
    page
      .locator(".service-card")
      .nth(2)
      .locator(".content-card__icon svg.lucide-bot"),
  ).toHaveCount(1);
  await expect(page.locator(".hero-art__floating")).toHaveCount(3);
  await expect(page.locator(".hero-art__floating--middle")).toContainText(
    "02 AUTOMATION",
  );
  await expect(page.locator(".site-header__services > button")).toContainText(
    "Služby",
  );
  await expect(page.locator(".site-header__nav > a")).toHaveText([
    "Projekty",
    "Spolupráce",
    "O mně",
    "Kontakt",
  ]);
  await expect(page.locator(".hero__proof > span")).toHaveText([
    "Osobní přístup",
    "Kompletní realizace",
    "Dlouhodobá podpora",
  ]);
  await expect(page.locator(".private-ai-section")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "Co můžete automatizovat?" }),
  ).toBeVisible();
  await expect(page.locator(".automation-category-card")).toHaveCount(6);
  await expect(page.locator(".case-card__meta")).toHaveCount(0);
  await expect(page.locator(".case-card__detail")).toHaveCount(0);
  await expect(page.locator(".case-card__partner")).toHaveCount(0);
  await expect(page.locator(".case-card__contribution")).toHaveCount(0);
  await expect(page.locator(".case-card__stack")).toHaveCount(0);
  await expect(page.locator("#work .case-card h3")).toHaveText([
    "Kinedok",
    "Robe",
    "Revizio",
    "My213",
    "Ondrášek",
  ]);
  await expect(page.locator("#work .project-timeline__milestone")).toHaveText([
    "2025 – dosud",
    "2024 – dosud",
    "2023 – 2025",
    "2022 – 2023",
    "2021 – 2022",
  ]);
  await expect(
    page.getByRole("heading", {
      name: "Projekty, na kterých jsem pracoval.",
    }),
  ).toBeVisible();
  await expect(page.locator(".site-header__cta")).toHaveAttribute(
    "href",
    "/#contact",
  );
  await expect(page.locator('a[href*="calendly"]')).toHaveCount(0);
  await expect(page.locator("#contact")).toContainText("Napsat e-mail");
  await expect(page.locator("#contact")).toContainText(
    "Probereme vaše cíle, možnosti řešení a další postup.",
  );
  await expect(page.locator("#contact")).not.toContainText(
    "Společně najdeme řešení, které bude dávat smysl.",
  );
  await expect(page.locator("#about")).toContainText(
    "Už více než 5 let se věnuji vývoji webů, aplikací a automatizací.",
  );
  await expect(page.locator("#process .process-step h3")).toHaveText([
    "Poznáme vaše potřeby",
    "Navrhnu postup",
    "Vývoj a zpětná vazba",
    "Spuštění a další rozvoj",
  ]);
  await expect(page.locator("#process .process-step p")).toHaveText([
    "Probereme, jak fungujete, co vás trápí a čeho chcete dosáhnout.",
    "Připravím návrh řešení, odhad ceny a harmonogram realizace.",
    "Průběžně vám ukazuji výsledky a společně ladíme detaily.",
    "Hotové řešení nasadím a podle potřeby zajistím podporu i další úpravy.",
  ]);
  await expect(page.locator("#about")).toContainText(
    "Na projektu spolupracujete přímo se mnou – od prvního rozhovoru až po spuštění.",
  );
  await expect(
    page.locator("#about").getByRole("link", { name: "Napsat mi" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "Za každým projektem stojím osobně.",
    }),
  ).toBeVisible();
  await expect(page.locator("#about .about-section__intro")).toHaveText(
    /Ahoj,\s*jsem Jakub Vantuch\.?/,
  );
  await expect(page.locator("#about .about-section__intro")).toHaveCSS(
    "white-space",
    "pre-line",
  );
  await expect(page.locator("#about")).not.toContainText(
    "Digital Solutions Consultant",
  );
  await expect(page.locator("#about figcaption")).toHaveCount(0);
  await expect(page.locator("#blog")).toHaveCount(0);
  await expect(page.locator("#newsletter .newsletter-card")).toHaveCount(0);
  await expect(page.locator("#newsletter .social-platform-card")).toHaveCount(
    3,
  );
  await expect(
    page.locator("#newsletter .social-platform-card strong"),
  ).toHaveText(["LinkedIn", "Instagram", "GitHub"]);
  await expect(
    page.locator(
      "#newsletter .social-platform-card .social-platform-card__description",
    ),
  ).toHaveText([
    "Projekty a zkušenosti",
    "Ze zákulisí vývoje",
    "Kód a open source",
  ]);
  const socialGrid = page.locator("#newsletter .social-platform-grid");
  await expect(
    socialGrid.getByRole("link", { name: /GitHub/ }),
  ).toHaveAttribute("href", "https://github.com/TurniXXD");
  const firstSocialCard = page
    .locator("#newsletter .social-platform-card")
    .first();
  const socialCardAlignment = await firstSocialCard.evaluate((card) => {
    const action = card.querySelector(
      ".social-platform-card__action",
    ) as HTMLElement | null;
    const arrow = action?.querySelector(".social-platform-card__arrow");
    const cardBounds = card.getBoundingClientRect();
    const actionBounds = action?.getBoundingClientRect();
    return action && arrow
      ? {
          actionText: action.textContent?.trim(),
          actionBottom: actionBounds?.bottom ?? null,
          descriptionBottom:
            card
              .querySelector(".social-platform-card__description")
              ?.getBoundingClientRect().bottom ?? null,
          arrowIsRight:
            arrow.getBoundingClientRect().left >
            action.getBoundingClientRect().left,
          actionRightGap: actionBounds
            ? cardBounds.right - actionBounds.right
            : null,
        }
      : null;
  });
  expect(socialCardAlignment?.arrowIsRight).toBe(true);
  expect(
    Math.abs(
      (socialCardAlignment?.actionBottom ?? 0) -
        (socialCardAlignment?.descriptionBottom ?? 0),
    ),
  ).toBeLessThanOrEqual(1);
  expect(socialCardAlignment?.actionRightGap).toBeLessThanOrEqual(40);
  expect(socialCardAlignment?.actionText).toContain("Zjistit více");
  const sectionOrder = await page
    .locator("main > section[id]")
    .evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionOrder).toEqual([
    "services",
    "automation",
    "work",
    "process",
    "about",
    "newsletter",
    "contact",
  ]);
  await expect(page.locator("#audit")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Prohlédnout příklady automatizací/ }),
  ).toHaveAttribute("href", "/automatizace");
  await expect(page.locator(".case-card__role")).toHaveCount(0);
  await expect(page.locator("main a[href='/doporuceni']")).toHaveCount(0);
  await expect(page.locator('a[href*="portfolio.vantuch.dev"]')).toHaveCount(0);

  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ??
      "{}",
  );
  const business = structuredData["@graph"].find(
    (item: { "@type": string }) => item["@type"] === "ProfessionalService",
  );
  expect(business.serviceType).toEqual([
    "Weby a aplikace",
    "Automatizace procesů",
    "AI řešení",
  ]);
});

test("English homepage explains the offer and automation categories", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Technology that helps businesses save time and grow.",
  );
  await expect(
    page.getByRole("heading", {
      name: "What can you automate?",
    }),
  ).toBeVisible();
  await expect(page.locator(".automation-category-card")).toHaveCount(6);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator(".site-header__services > button")).toContainText(
    "Services",
  );
  await expect(page.locator(".site-header__nav > a")).toHaveText([
    "Projects",
    "Collaboration",
    "About",
    "Contact",
  ]);
  await expect(page.locator("#process .process-step h3")).toHaveText([
    "We understand your needs",
    "I propose the approach",
    "Development and feedback",
    "Launch and further development",
  ]);
  await expect(page.locator(".hero__proof > span")).toHaveText([
    "Personal approach",
    "Complete delivery",
    "Long-term support",
  ]);
  await expect(page.locator("#about .about-section__intro")).toHaveText(
    "Hello, I am Jakub Vantuch.",
  );
});

test("social cards stay compact on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");

  const cards = page.locator("#newsletter .social-platform-card");
  await expect(cards).toHaveCount(3);
  const heights = await cards.evaluateAll((items) =>
    items.map((item) => item.getBoundingClientRect().height),
  );
  for (const height of heights) expect(height).toBeLessThanOrEqual(96);

  const firstCard = cards.first();
  const titleBox = await firstCard.locator("strong").boundingBox();
  const actionBox = await firstCard
    .locator(".social-platform-card__action")
    .boundingBox();
  expect(titleBox).not.toBeNull();
  expect(actionBox).not.toBeNull();
  expect(actionBox!.x - titleBox!.x).toBeGreaterThanOrEqual(14);
});
