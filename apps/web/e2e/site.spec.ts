import { expect, test } from "@playwright/test";

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
    page.locator(".service-card").nth(2).locator("svg.lucide-bot"),
  ).toHaveCount(1);
  await expect(page.locator(".hero-art__floating")).toHaveCount(3);
  await expect(page.locator(".hero-art__floating--middle")).toContainText(
    "02 AUTOMATION",
  );
  await expect(page.locator(".site-header__services > summary")).toContainText(
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
    page.locator("#newsletter .social-platform-card span"),
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
    const description = card.querySelector("span")?.getBoundingClientRect();
    const arrow = card
      .querySelector(".social-platform-card__arrow")
      ?.getBoundingClientRect();
    return description && arrow
      ? {
          arrowIsRight: arrow.left > description.left,
          verticalDifference: Math.abs(
            arrow.top +
              arrow.height / 2 -
              (description.top + description.height / 2),
          ),
        }
      : null;
  });
  expect(socialCardAlignment?.arrowIsRight).toBe(true);
  expect(socialCardAlignment?.verticalDifference).toBeLessThan(4);
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
  await expect(page.locator(".site-header__services > summary")).toContainText(
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
});

test("contact actions follow the contact form on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");

  const form = page.locator("#contact .contact-form");
  const actions = page.locator("#contact .contact-section__actions");
  await expect(form).toBeVisible();
  await expect(actions).toBeVisible();
  const formBox = await form.boundingBox();
  const actionsBox = await actions.boundingBox();
  expect(formBox).not.toBeNull();
  expect(actionsBox).not.toBeNull();
  expect(actionsBox!.y).toBeGreaterThan(formBox!.y + formBox!.height);
});

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
});

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

test("services navigation groups all service routes in an accessible dropdown", async ({
  page,
}) => {
  await page.goto("/");

  const dropdown = page.locator(".site-header__services");
  const trigger = dropdown.locator("> summary");
  const serviceLinks = dropdown.locator(".site-header__services-menu a");

  await expect(trigger).toContainText("Služby");
  await expect(trigger.locator("svg")).toHaveCount(1);
  await expect(
    page.locator('.site-header__nav > a[href="/automatizace"]'),
  ).toHaveCount(0);

  await dropdown.hover();
  await expect(dropdown).toHaveAttribute("open", "");
  await page.locator(".site-logo").hover();
  await expect(dropdown).not.toHaveAttribute("open", "");

  await trigger.click();
  await expect(dropdown).toHaveAttribute("open", "");
  await page.locator(".site-logo").hover();
  await expect(dropdown).toHaveAttribute("open", "");
  await trigger.click();
  await expect(dropdown).not.toHaveAttribute("open", "");

  await trigger.focus();
  await trigger.press("Enter");
  await expect(dropdown).toHaveAttribute("open", "");
  await expect(serviceLinks).toHaveCount(3);
  expect(
    await serviceLinks.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href")),
    ),
  ).toEqual(["/sluzby/webove-aplikace", "/automatizace", "/sluzby/ai-reseni"]);

  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");
  await page.locator(".site-header__mobile > summary").click();
  const mobileServices = page.locator(".site-header__mobile-services");
  await mobileServices.locator("> summary").click();
  await expect(mobileServices).toHaveAttribute("open", "");
  await expect(mobileServices.locator("a")).toHaveCount(3);
});

test("web applications service page presents real work and contact flow", async ({
  page,
}) => {
  await page.goto("/sluzby/webove-aplikace");

  await expect(page).toHaveTitle(
    "Weby a webové aplikace na míru | Jakub Vantuch",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Digitální řešení, která rostou s vaším podnikáním.",
  );
  await expect(page.locator(".service-offering-card")).toHaveCount(5);
  await expect(
    page.getByRole("heading", { name: "E-shopy na Shoptetu" }),
  ).toBeVisible();
  await expect(page.locator(".service-benefits")).toHaveCount(0);
  await expect(page.locator("#projects .case-card")).toHaveCount(5);
  await expect(page.locator("#projects")).toHaveCSS(
    "background-color",
    "rgb(23, 30, 60)",
  );
  await expect(page.locator(".service-process-step")).toHaveCount(5);
  await expect(page.locator(".service-related__links a")).toHaveCount(2);
  await expect(
    page.getByRole("heading", { name: "Máte nápad na web nebo aplikaci?" }),
  ).toBeVisible();
  await expect(page.locator("#contact .contact-form")).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://vantuch.dev/sluzby/webove-aplikace",
  );
});

test("web application hero presents animated analytics charts", async ({
  page,
}) => {
  await page.goto("/sluzby/webove-aplikace");

  const visual = page.locator('[data-web-visual="animated-charts"]');
  await expect(visual.locator(".web-visual__metric")).toHaveCount(2);
  await expect(visual.locator(".web-visual__line-chart")).toHaveCount(1);
  await expect(visual.locator(".web-visual__donut-card")).toHaveCount(1);
  await expect(visual.locator(".web-visual__bars > span")).toHaveCount(6);
  await expect(visual.locator(".web-visual__chart-line")).not.toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(visual.locator(".web-visual__chart-line")).toHaveCSS(
    "animation-iteration-count",
    "infinite",
  );
  await expect(
    visual.locator(".web-visual__bars > span").first(),
  ).not.toHaveCSS("animation-name", "none");
  await expect(visual.locator(".web-visual__bars > span").first()).toHaveCSS(
    "animation-iteration-count",
    "infinite",
  );
  await expect(visual).not.toHaveAttribute("data-scroll-progress");
  await expect(visual.locator("[data-web-visual-tile]")).toHaveCount(0);
});

test("web application charts respect reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sluzby/webove-aplikace");

  await expect(page.locator(".web-visual__chart-line")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".web-visual__bars > span").first()).toHaveCSS(
    "transform",
    "none",
  );
});

test("AI service page keeps a concise five-section conversion flow", async ({
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
  await expect(page.locator(".service-flow__step")).toHaveCount(4);
  await expect(page.locator(".service-flow--ai")).toHaveCSS(
    "background-color",
    "rgb(32, 40, 75)",
  );
  await expect(page.locator(".service-process-step")).toHaveCount(5);
  await expect(page.locator(".service-hero__actions .ui-action")).toHaveCount(
    1,
  );
  await expect(page.locator(".service-scenarios")).toHaveCount(0);
  await expect(page.locator(".service-approach")).toHaveCount(0);
  await expect(page.locator(".service-related")).toHaveCount(0);
  await expect(page.locator(".service-final-cta")).toHaveCount(0);
  await expect(page.locator("#projects")).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "Proberme, zda AI dává smysl právě u vás.",
    }),
  ).toBeVisible();
  await expect(page.locator("#contact .contact-form")).toBeVisible();
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

test("service pages remain visible with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sluzby/ai-reseni");

  const reveals = page.locator('[data-scroll-reveal="true"]');
  const hiddenContent = await reveals.evaluateAll((elements) =>
    elements.filter((element) => getComputedStyle(element).opacity === "0"),
  );
  expect(hiddenContent).toHaveLength(0);
  await expect(page.locator(".service-hero-visual")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator("[data-ai-visual-part]").first()).toHaveCSS(
    "transform",
    "none",
  );
  await expect(page.locator(".ai-pipeline__input").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});

test("automation page filters non-clickable examples", async ({ page }) => {
  await page.goto("/automatizace");

  await expect(page).toHaveTitle(
    "Automatizace procesů a AI řešení na míru | Jakub Vantuch",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Jedna objednávka. Několik automatických kroků.",
  );
  await expect(page.locator(".automation-closing")).toHaveCount(0);
  await expect(
    page.getByRole("heading", {
      name: "Nevíte, co by šlo automatizovat právě u vás?",
    }),
  ).toBeVisible();
  await expect(page.locator(".automation-example")).toHaveCount(9);
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
  await expect(page.locator(".automation-story-tile__line")).toHaveCount(0);
  await expect(page.getByText("Naplánování dalších kroků")).toHaveCount(0);
  await expect(page.getByText("Podmínky ověřeny")).toHaveCount(0);
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

  await page.getByRole("button", { name: "AI a dokumenty" }).click();
  await expect(page.locator(".automation-example")).toHaveCount(3);

  const first = page.locator(".automation-example").first();
  await expect(first).not.toHaveAttribute("href");
  await expect(first.locator("a, button")).toHaveCount(0);
  await expect(page.locator(".automation-example__contact")).toHaveCount(0);
  await expect(page.getByText("Chci podobnou automatizaci")).toHaveCount(0);
});

test("automation story stays complete after reaching the end", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/automatizace");

  const story = page.locator(".automation-scroll-story");
  const frame = story.locator(".automation-scroll-story__frame");
  const catalog = page.locator("#examples");

  const sectionPositions = await Promise.all(
    [story, catalog].map((section) =>
      section.evaluate((element) => element.getBoundingClientRect().top),
    ),
  );
  expect(sectionPositions[0]).toBeLessThan(sectionPositions[1]);
  await expect(page.locator("main > .automation-scroll-story")).toHaveCount(1);
  await expect(page.locator(".automation-page-hero")).toHaveCount(0);

  const scrollStoryTo = async (progress: number) => {
    await story.evaluate((element, targetProgress) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      const range = Math.max(
        (element as HTMLElement).offsetHeight - window.innerHeight,
        1,
      );
      window.scrollTo({
        top: top + range * targetProgress,
        behavior: "instant",
      });
    }, progress);
  };

  for (const [progress, stage] of [
    [0, "1"],
    [0.25, "2"],
    [0.5, "3"],
    [0.75, "4"],
    [1, "5"],
  ] as const) {
    await scrollStoryTo(progress);
    await expect(frame).toHaveAttribute("data-stage", stage);
    await expect
      .poll(() =>
        story.evaluate((element) =>
          Number((element as HTMLElement).dataset.storyProgress),
        ),
      )
      .toBeCloseTo(progress, 2);
  }

  await expect(story).toHaveAttribute("data-story-complete", "true");
  await expect(story.locator(".automation-scroll-story__sticky")).toHaveCSS(
    "position",
    "relative",
  );
  const completedHeight = await story.evaluate(
    (element) => element.getBoundingClientRect().height,
  );
  expect(completedHeight).toBeLessThan(1200);
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 300);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(scrollBefore + 250);

  const finalLineOffsets = await frame
    .locator("[data-story-line]")
    .evaluateAll((lines) =>
      lines.map((line) =>
        Number((line as SVGPathElement).style.strokeDashoffset),
      ),
    );
  for (const offset of finalLineOffsets) {
    expect(offset).toBeLessThan(0.002);
  }
  await expect(
    frame.locator('[data-story-tile][data-connected="true"]'),
  ).toHaveCount(5);

  await scrollStoryTo(0.5);
  await expect(frame).toHaveAttribute("data-stage", "5");
  await scrollStoryTo(0);
  await expect(frame).toHaveAttribute("data-stage", "5");
  await expect(story).toHaveAttribute("data-story-progress", "1.000");
});

test("automation story becomes a complete static flow on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/automatizace");

  const story = page.locator(".automation-scroll-story");
  await expect(story).toHaveAttribute("data-story-static", "true");
  await expect(story.locator(".automation-scroll-story__sticky")).toHaveCSS(
    "position",
    "relative",
  );
  await expect(
    story.locator(".automation-scroll-story__connectors"),
  ).toBeHidden();
  await expect(story.locator(".automation-story-tile")).toHaveCount(5);
  await expect(
    story.locator(".automation-scroll-story__mobile-steps li"),
  ).toHaveCount(5);
  await expect(story.locator(".automation-story-tile").last()).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBe(0);
});

test("automation story respects reduced motion without a redundant CTA", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/automatizace");

  const story = page.locator(".automation-scroll-story");
  const frame = story.locator(".automation-scroll-story__frame");
  await expect(story).toHaveAttribute("data-story-static", "true");
  await expect(frame).toHaveAttribute("data-stage", "5");
  await expect(story.locator(".automation-scroll-story__sticky")).toHaveCSS(
    "position",
    "relative",
  );
  await expect(
    frame.locator('[data-story-tile][data-connected="true"]'),
  ).toHaveCount(5);
  await expect(story.locator(".automation-scroll-story__cta")).toHaveCount(0);
  await expect(
    story.getByRole("link", { name: "Chci podobnou automatizaci" }),
  ).toHaveCount(0);
});

test("automation page is localized, indexed and fits mobile width", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/en/automatizace");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "One order. Several automated steps.",
  );
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBe(0);

  const sitemap = await request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain("https://vantuch.dev/en/automatizace");
});

test("homepage reveals cards once and keeps them visible", async ({ page }) => {
  await page.goto("/");

  const serviceCards = page.locator(".service-card");
  await expect(serviceCards).toHaveCount(3);
  await serviceCards.first().scrollIntoViewIfNeeded();
  await expect(page.locator(".service-grid")).toHaveAttribute(
    "data-reveal-state",
    "visible",
  );
  await expect(serviceCards.nth(0)).toHaveCSS("opacity", "1");

  const caseCard = page.locator(".case-card").first();
  await caseCard.scrollIntoViewIfNeeded();
  await expect(page.locator(".case-grid")).toHaveAttribute(
    "data-reveal-state",
    "visible",
  );
  await expect(caseCard).toHaveCSS("opacity", "1");

  await page.locator(".hero").scrollIntoViewIfNeeded();
  await expect(page.locator(".case-grid")).toHaveAttribute(
    "data-reveal-state",
    "visible",
  );
});

test("technical backgrounds become static with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator(".technical-background")).toHaveCount(2);
  await expect(page.locator('[data-scroll-reveal="true"]')).toHaveCount(15);
  await expect(
    page.locator(
      ".technical-background--services .technical-background__lines path",
    ),
  ).toHaveCount(2);
  const lineBottom = await page
    .locator(".technical-background--services .technical-background__lines")
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).bottom));
  expect(lineBottom).toBeGreaterThan(0);
  await expect(
    page.locator(
      ".technical-background--automation .technical-background__lines path",
    ),
  ).toHaveCount(0);
  await expect(
    page.locator(
      ".technical-background--automation .technical-background__node",
    ),
  ).toHaveCount(0);

  const states = await page
    .locator(".technical-background")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-technical-state")),
    );
  expect(states).toEqual(Array(3).fill("static"));

  const hiddenContent = await page
    .locator('[data-scroll-reveal="true"]')
    .evaluateAll(
      (elements) =>
        elements.filter((element) => getComputedStyle(element).opacity === "0")
          .length,
    );
  expect(hiddenContent).toBe(0);
});

test("large ambient shapes slide in and out from their nearest side", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const automationSection = page.locator(".automation-section");
  const automationBackground = page.locator(
    ".technical-background--automation",
  );
  const automationShape = automationBackground.locator(
    ".technical-background__shape",
  );
  const servicesShape = page.locator(
    ".technical-background--services .technical-background__shape",
  );

  await expect(automationShape).toHaveAttribute("data-side", "left");
  await expect(servicesShape).toHaveAttribute("data-side", "right");
  await expect(automationShape).toHaveCSS("--technical-shape-offset", "-24vw");
  await expect(servicesShape).toHaveCSS("--technical-shape-offset", "24vw");

  await automationSection.scrollIntoViewIfNeeded();
  await expect(automationBackground).toHaveAttribute(
    "data-shape-state",
    "visible",
  );
  await expect(automationShape).toHaveCSS("opacity", "1");
  const visibleX = await automationShape.evaluate(
    (element) => element.getBoundingClientRect().x,
  );

  await page.locator(".hero").scrollIntoViewIfNeeded();
  await expect(automationBackground).toHaveAttribute(
    "data-shape-state",
    "pending",
  );
  await expect(automationShape).toHaveCSS("opacity", "0");
  const hiddenX = await automationShape.evaluate(
    (element) => element.getBoundingClientRect().x,
  );
  expect(hiddenX).toBeLessThan(visibleX - 100);
  await expect(automationBackground).toHaveAttribute(
    "data-technical-state",
    "visible",
  );

  await automationSection.scrollIntoViewIfNeeded();
  await expect(automationBackground).toHaveAttribute(
    "data-shape-state",
    "visible",
  );
  await expect(automationShape).toHaveCSS("opacity", "1");
});

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

test("about portrait outline slides out from behind the image", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const reveal = page.locator(".about-section__portrait-reveal");
  const portrait = reveal.locator(".about-section__portrait");
  await expect(reveal).toHaveAttribute("data-reveal-state", "pending");

  await expect
    .poll(() =>
      portrait.evaluate(
        (element) => getComputedStyle(element, "::before").opacity,
      ),
    )
    .toBe("0");

  const hiddenOutline = await portrait.evaluate((element) => {
    const style = getComputedStyle(element, "::before");
    return { opacity: style.opacity, transform: style.transform };
  });
  expect(hiddenOutline.opacity).toBe("0");
  expect(hiddenOutline.transform).not.toBe("none");

  await reveal.scrollIntoViewIfNeeded();
  await expect(reveal).toHaveAttribute("data-reveal-state", "visible");
  await expect
    .poll(() =>
      portrait.evaluate(
        (element) => getComputedStyle(element, "::before").opacity,
      ),
    )
    .toBe("1");

  const visibleTransform = await portrait.evaluate(
    (element) => getComputedStyle(element, "::before").transform,
  );
  expect(visibleTransform).not.toBe(hiddenOutline.transform);
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

test("button micro-interactions and decorative cleanup are preserved", async ({
  page,
}) => {
  await page.goto("/");

  const primary = page.locator(".hero__actions .ui-action--primary");
  const primaryIcon = primary.locator("svg");
  const primaryTransform = await primary.evaluate(
    (action) => getComputedStyle(action).transform,
  );
  const primaryPosition = await primary.evaluate(
    (action) => getComputedStyle(action).backgroundPosition,
  );
  const primaryIconTransform = await primaryIcon.evaluate(
    (icon) => getComputedStyle(icon).transform,
  );
  await primary.hover();
  await expect
    .poll(() =>
      primary.evaluate((action) => getComputedStyle(action).transform),
    )
    .toBe(primaryTransform);
  await expect
    .poll(() =>
      primaryIcon.evaluate((icon) => getComputedStyle(icon).transform),
    )
    .toBe(primaryIconTransform);
  await expect(primaryIcon.locator("path").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(primaryIcon).toHaveCSS("filter", "none");
  await expect
    .poll(() =>
      primary.evaluate((action) => getComputedStyle(action).backgroundPosition),
    )
    .not.toBe(primaryPosition);

  const secondary = page.locator(".hero__actions .ui-action--secondary");
  const secondaryIcon = secondary.locator("svg");
  const secondaryTransform = await secondary.evaluate(
    (action) => getComputedStyle(action).transform,
  );
  const secondaryPosition = await secondary.evaluate(
    (action) => getComputedStyle(action).backgroundPosition,
  );

  await secondary.hover();
  await expect
    .poll(() =>
      secondary.evaluate((action) => getComputedStyle(action).transform),
    )
    .toBe(secondaryTransform);
  await expect(secondaryIcon).toHaveCSS("transform", "none");
  await expect(secondaryIcon.locator("path").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(secondaryIcon).toHaveCSS("filter", "none");
  await expect
    .poll(() =>
      secondary.evaluate(
        (action) => getComputedStyle(action).backgroundPosition,
      ),
    )
    .not.toBe(secondaryPosition);

  for (const selector of [
    ".hero__scroll",
    ".contact-section__actions > a:not(.ui-action)",
  ]) {
    const link = page.locator(selector).first();
    await link.hover();
    await expect(link.locator("svg > *").first()).toHaveCSS(
      "animation-name",
      "none",
    );
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  const reducedMotionAction = page.locator(
    ".hero__actions .ui-action--primary",
  );
  await reducedMotionAction.hover();
  await expect(reducedMotionAction).toHaveCSS("transform", "none");
  await expect(reducedMotionAction.locator("svg")).toHaveCSS(
    "transform",
    "none",
  );
  await expect(reducedMotionAction.locator("svg path").first()).toHaveCSS(
    "animation-name",
    "none",
  );

  const cardBackgrounds = await page
    .locator(".automation-category-card")
    .first()
    .evaluate((card) => ({
      card: getComputedStyle(card).backgroundImage,
      color: getComputedStyle(card).backgroundColor,
      overlay: getComputedStyle(card, "::before").backgroundImage,
    }));

  expect(cardBackgrounds).toEqual({
    card: "none",
    color: "rgb(255, 255, 255)",
    overlay: "none",
  });

  const processDecorations = await page
    .locator(".process-section")
    .evaluate((section) => ({
      grid: getComputedStyle(section, "::before").backgroundImage,
      orbit: getComputedStyle(section, "::after").backgroundImage,
    }));

  expect(processDecorations).toEqual({ grid: "none", orbit: "none" });

  const sectionBoundary = await page.evaluate(() => ({
    heroOverflow: getComputedStyle(document.querySelector(".hero")!).overflow,
    servicesGrid: getComputedStyle(
      document.querySelector(".services-section")!,
      "::before",
    ).backgroundImage,
  }));

  expect(sectionBoundary).toEqual({
    heroOverflow: "visible",
    servicesGrid: "none",
  });

  await expect
    .poll(() =>
      page
        .locator(".work-section")
        .evaluate(
          (section) => getComputedStyle(section, "::after").backgroundImage,
        ),
    )
    .toBe("none");
});

test("hero illustration reacts to pointer and decorative planets orbit", async ({
  page,
}) => {
  await page.goto("/");

  const heroWindowLayer = page.locator(".hero-art__window-layer");
  const initialTransform = await heroWindowLayer.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  const box = await page.locator(".hero__content").boundingBox();
  if (!box) throw new Error("Hero illustration is not visible");

  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.25);
  await expect
    .poll(() =>
      heroWindowLayer.evaluate(
        (element) => getComputedStyle(element).transform,
      ),
    )
    .not.toBe(initialTransform);

  await expect(page.locator(".hero-art__orbit")).toHaveCount(2);
  await expect(page.locator(".hero-art__orbit").first()).toHaveCSS(
    "animation-name",
    "orbit-spin",
  );
  await expect(page.locator(".contact-section__planet")).toHaveCount(2);
  await expect(page.locator(".contact-section__planet--two")).toHaveCSS(
    "opacity",
    "1",
  );
  const contactOrbit = page.locator(".contact-section__orbit");
  await expect(contactOrbit).toHaveCSS("animation-play-state", "paused");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(contactOrbit).toHaveAttribute("data-orbit-active", "true");
  await expect(contactOrbit).toHaveCSS("animation-play-state", "running");
});

test("contact fields use the brand border on hover", async ({ page }) => {
  await page.goto("/");
  const input = page.locator("#contact-name");
  await input.hover();
  await expect(input).toHaveCSS("border-color", "rgb(95, 108, 255)");
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

test("contact form validates and sends only contact details", async ({
  page,
}) => {
  await page.goto("/");
  const form = page.locator(".contact-form");

  await expect(
    form.getByRole("heading", { name: "Pojďme probrat váš projekt" }),
  ).toBeVisible();
  await expect(form.getByLabel("S čím vám mohu pomoci?")).toBeVisible();
  await expect(form.locator('[name="message"]')).toHaveAttribute(
    "placeholder",
    "Napište mi pár slov o svém projektu nebo nápadu. Více probereme při úvodním hovoru.",
  );

  await form.getByRole("button", { name: "Odeslat zprávu" }).click();
  await expect(page.locator("#contact-name-error")).toContainText(
    "Vyplňte toto pole",
  );
  await expect(page.locator("#contact-email-error")).toContainText(
    "Vyplňte toto pole",
  );
  await expect(page.locator("#contact-message-error")).toContainText(
    "Vyplňte toto pole",
  );

  await form.locator('[name="name"]').fill("Anna Nováková");
  await form.locator('[name="email"]').fill("anna@example.com");
  await form.locator('[name="phone"]').fill("+420 735 023 812");
  await form.locator('[name="message"]').fill("Potřebuji nový firemní web.");
  await expect(
    form.locator('[name="source"], [name="referrerEmail"]'),
  ).toHaveCount(0);

  await page.route("**/api/contact", async (route) => {
    const payload = route.request().postDataJSON();
    expect(payload).toMatchObject({
      name: "Anna Nováková",
      email: "anna@example.com",
      phone: "+420 735 023 812",
      message: "Potřebuji nový firemní web.",
    });
    expect(payload).not.toHaveProperty("source");
    expect(payload).not.toHaveProperty("referrerEmail");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await form.getByRole("button", { name: "Odeslat zprávu" }).click();
  await expect(form.getByRole("status")).toContainText("Děkuji za zprávu");
});

test("English contact form is localized", async ({ page }) => {
  await page.goto("/en");
  const form = page.locator(".contact-form");
  await expect(
    form.getByRole("heading", {
      name: "Let’s discuss your project",
    }),
  ).toBeVisible();
  await expect(form.locator("#contact-message")).toHaveAttribute(
    "placeholder",
    "Tell me a little about your project or idea. We can discuss the details during an introductory call.",
  );
  await expect(
    form.locator('[name="source"], [name="referrerEmail"]'),
  ).toHaveCount(0);
  await expect(
    form.getByRole("link", { name: "Privacy notice" }),
  ).toHaveAttribute("href", "/en/privacy");
});

test("contact page combines direct and business details with the shared form", async ({
  page,
}) => {
  await page.goto("/kontakt");

  await expect(page).toHaveTitle("Kontakt | Jakub Vantuch");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Pojďme probrat váš projekt.",
    }),
  ).toBeVisible();
  await expect(page.locator(".site-header__nav > a").last()).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.locator(".contact-page__form .contact-form")).toHaveCount(
    1,
  );
  const business = page.locator(".contact-page__business");
  await expect(business.getByText("IČO", { exact: true })).toBeVisible();
  await expect(business.getByText("19462590", { exact: true })).toBeVisible();
  await expect(
    business.getByText("Zapsán v živnostenském rejstříku", { exact: true }),
  ).toBeVisible();
  await expect(
    business.getByText("Frýdek-Místek", { exact: true }),
  ).toBeVisible();
  await expect(
    business.getByText("M. Chasáka 3142, Frýdek-Místek, 738 01", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".contact-page__intro")).toContainText(
    "Na mobilu jsem dostupný v pracovní dny od 8:00 do 18:00.",
  );
  await expect(page.locator(".site-header__lang")).toHaveAttribute(
    "href",
    "/en/kontakt",
  );
});

test("compact footer keeps core destinations and referrals understated", async ({
  page,
}) => {
  await page.goto("/");
  const footer = page.locator(".site-footer");
  for (const href of [
    "/",
    "/#services",
    "/#work",
    "/#process",
    "/#about",
    "/kontakt",
    "/doporuceni",
    "/privacy",
    "mailto:contact@vantuch.dev",
    "https://github.com/TurniXXD",
    "https://www.linkedin.com/in/jakub-vantuch-552514197/",
    "https://www.instagram.com/vantuch.dev/",
  ]) {
    await expect(footer.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
  await expect(footer.locator(".site-footer__nav a")).toHaveCount(5);
  const footerEmail = footer.locator(".site-footer__email");
  await expect(footerEmail).toBeVisible();
  await expect(footerEmail).toHaveText("contact@vantuch.dev");
  await expect(footerEmail).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(
    footer.getByText("Digital Solutions Consultant", { exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByText(/Weby, automatizace, systémy a praktická AI pro firmy/),
  ).toHaveCount(0);
  const footerBottomMargin = await footer
    .locator(".site-footer__bottom")
    .evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).marginTop),
    );
  expect(footerBottomMargin).toBeGreaterThanOrEqual(24);
  await expect(
    footer.getByRole("link", { name: "Doporučit klienta" }),
  ).not.toHaveClass(/ui-action|button|highlight/);
  await expect(
    page
      .locator(".contact-form")
      .getByRole("link", { name: "Zpracování osobních údajů" }),
  ).toHaveAttribute("href", "/privacy");
});

test("blog and RSS are not publicly available", async ({ page, request }) => {
  const blog = await page.goto("/blog");
  expect(blog?.status()).toBe(404);

  const englishBlog = await request.get("/en/blog");
  expect(englishBlog.status()).toBe(404);

  const rss = await request.get("/rss.xml");
  expect(rss.status()).toBe(404);
});

test("privacy page is localized and reflects client-submitted referrals", async ({
  page,
}) => {
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Zpracování osobních údajů",
  );
  await expect(
    page.getByRole("heading", {
      name: "Doporučení klienta",
    }),
  ).toBeVisible();
  await expect(
    page.locator('link[rel="alternate"][hreflang="en"]'),
  ).toHaveAttribute("href", "https://vantuch.dev/en/privacy");
  await page.goto("/en/privacy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy notice",
  );
  await expect(page.locator(".site-header__lang")).toHaveAttribute(
    "href",
    "/privacy",
  );
  await page.goto("/doporuceni");
  await expect(page.locator(".referral-form")).toHaveCount(0);
});

test("privacy page fits mobile width and appears in sitemap", async ({
  page,
  request,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/privacy");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBe(0);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain("https://vantuch.dev/en/privacy");
  expect(await sitemap.text()).toContain(
    "https://vantuch.dev/sluzby/webove-aplikace",
  );
  expect(await sitemap.text()).toContain(
    "https://vantuch.dev/en/sluzby/ai-reseni",
  );
});

for (const servicePath of ["/sluzby/webove-aplikace", "/sluzby/ai-reseni"]) {
  test(`${servicePath} hides the decorative hero visual on mobile`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 844 });
    await page.goto(servicePath);

    await expect(page.locator(".service-hero__content")).toBeVisible();
    await expect(page.locator(".service-hero-visual")).toBeHidden();
  });

  for (const width of [320, 360, 768, 1440, 1600]) {
    test(`${servicePath} has no horizontal overflow at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(servicePath);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
}

test("signed referral lookup shows attribution without exposing referrer details", async ({
  page,
  context,
}) => {
  await page.route("**/api/referrer", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ referralApplied: true }),
    });
  });
  await page.goto("/?ref=example-token");
  const cookie = (await context.cookies()).find(
    (item) => item.name === "vantuch_referral",
  );
  expect(cookie).toMatchObject({
    value: "example-token",
    httpOnly: true,
    sameSite: "Lax",
  });
  const form = page.locator(".contact-form");
  await expect(form.locator(".contact-form__referral")).toContainText(
    "Doporučení z odkazu je přiřazeno",
  );
  await expect(
    form.locator('[name="source"], [name="referrerEmail"]'),
  ).toHaveCount(0);
});

test("contact API rejects incomplete submissions", async ({ request }) => {
  const empty = await request.post("/api/contact", { data: {} });
  expect(empty.status()).toBe(400);
  expect((await empty.json()).formErrors).toMatchObject({
    name: "required",
    email: "required",
    message: "required",
  });
});

test("hover states do not lift cards or related links", async ({ page }) => {
  const expectStableVerticalPosition = async (selector: string) => {
    const element = page.locator(selector).first();
    await element.scrollIntoViewIfNeeded();
    const initialTranslate = await element.evaluate(
      (node) => getComputedStyle(node).translate,
    );

    await element.hover();
    await expect
      .poll(() => element.evaluate((node) => getComputedStyle(node).translate))
      .toBe(initialTranslate);
  };

  await page.goto("/");
  await expectStableVerticalPosition(".service-card");

  const projectGrid = page.locator(".case-grid").first();
  const projectCard = projectGrid.locator(".case-card").first();
  await projectCard.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      projectGrid.evaluate((element) => getComputedStyle(element).alignItems),
    )
    .toBe("start");
  await projectCard.hover();
  await expect(projectCard).toHaveCSS("border-color", "rgb(95, 108, 255)");
  await expectStableVerticalPosition(".case-card");

  await page.goto("/sluzby/ai-reseni");
  await expectStableVerticalPosition(".service-offering-card");

  await page.goto("/sluzby/webove-aplikace");
  await expectStableVerticalPosition(".service-related__links a");
});

for (const width of [375, 768, 1024, 1440]) {
  test(`homepage has no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");

    if (width <= 900) {
      await expect(
        page.locator(".site-header__mobile > summary"),
      ).toBeVisible();
    }
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBe(0);
  });
}

test("Czech referral page directs referrers to share a link, not contacts", async ({
  page,
}) => {
  await page.goto("/doporuceni");

  await expect(page.locator("html")).toHaveAttribute("lang", "cs");
  await expect(page).toHaveTitle("Doporučte klienta | Jakub Vantuch");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Znáte firmu, které bych mohl pomoct?",
  );
  await expect(
    page.getByRole("heading", { name: "Jak doporučení funguje" }),
  ).toBeVisible();
  await expect(page.locator(".site-header__cta")).toContainText(
    "Probrat projekt",
  );
  await expect(page.locator(".site-header__cta")).toHaveAttribute(
    "href",
    "/#contact",
  );
  await expect(
    page.locator(".referral-hero .ui-action--primary"),
  ).toHaveAttribute("href", "#referral-link");
  await expect(
    page.locator(".referral-hero .ui-action--secondary"),
  ).toHaveAttribute("href", "#how-it-works");
  await expect(
    page.getByRole("link", { name: /Požádat o odkaz e-mailem/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Odeslat vlastní poptávku/ }),
  ).toHaveAttribute("href", "/#contact");
  await expect(page.locator(".referral-request-form")).toHaveCount(2);
  await expect(
    page.locator('.referral-request-form--link input[name="name"]'),
  ).toBeVisible();
  await expect(
    page.locator('.referral-request-form--link input[name="email"]'),
  ).toBeVisible();
  await expect(page.locator("#referral-link")).toContainText(
    "Poptávku pošle klient",
  );
  await expect(page.locator(".referral-hero")).toContainText(
    "přes váš odkaz nebo vás výslovně zmíní jako doporučitele na úvodním callu",
  );
  await expect(page.locator("#referral-conditions")).toContainText(
    "Co když klient nepoužije můj odkaz?",
  );
  await expect(page.locator("#referral-conditions")).toContainText(
    "uvede jako člověka, který mě doporučil",
  );
  await expect(
    page.getByText("Mohu poslat kontakt na firmu sám?"),
  ).toBeVisible();
  await expect(page.locator(".referral-hero__incentive")).toContainText("10 %");
  await expect(
    page.getByRole("link", { name: /Podmínky doporučení/ }),
  ).toHaveAttribute("href", "#referral-conditions");
  await expect(
    page.locator(".site-footer a[href='/doporuceni']"),
  ).toBeVisible();
  await expect(
    page.locator('link[rel="alternate"][hreflang="en"]'),
  ).toHaveAttribute("href", "https://vantuch.dev/en/doporuceni");
});

test("English referral page and locale switch are available", async ({
  page,
}) => {
  await page.goto("/en/doporuceni");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("Refer a client | Jakub Vantuch");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Know a business I could help?",
  );
  await expect(page.locator(".site-header__lang")).toHaveAttribute(
    "href",
    "/doporuceni",
  );
  await expect(
    page.getByRole("link", { name: /Send your own inquiry/ }),
  ).toHaveAttribute("href", "/en#contact");
  await expect(
    page.getByRole("form", { name: "Where should I send your link?" }),
  ).toBeVisible();
  await expect(
    page.getByRole("form", { name: "Tell me about a partnership" }),
  ).toBeVisible();
});

test("referral and partnership forms submit their dedicated intent", async ({
  page,
}) => {
  await page.goto("/doporuceni");
  const requests: Array<Record<string, string>> = [];
  await page.route("**/api/referral-request", async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  const linkForm = page.locator(".referral-request-form--link");
  await linkForm.locator('[name="name"]').fill("Jan Doporučitel");
  await linkForm.locator('[name="email"]').fill("jan@example.com");
  await linkForm.getByRole("button", { name: "Poslat můj odkaz" }).click();
  await expect(linkForm.getByRole("status")).toContainText(
    "Osobní doporučovací odkaz jsem vám poslal e-mailem",
  );

  const partnerForm = page.locator(".referral-request-form--partnership");
  await partnerForm.locator('[name="name"]').fill("Eva Partnerová");
  await partnerForm.locator('[name="email"]').fill("eva@example.com");
  await partnerForm.locator('[name="company"]').fill("Studio Eva");
  await partnerForm
    .locator('[name="message"]')
    .fill("Pravidelně spolupracuji s klienty, kteří potřebují vývoj.");
  await partnerForm
    .getByRole("button", { name: "Odeslat zájem o partnerství" })
    .click();
  await expect(partnerForm.getByRole("status")).toContainText(
    "partnerství společně probereme",
  );

  expect(requests).toHaveLength(2);
  expect(requests[0]).toMatchObject({
    intent: "link",
    locale: "cs",
    name: "Jan Doporučitel",
    email: "jan@example.com",
  });
  expect(requests[1]).toMatchObject({
    intent: "partnership",
    locale: "cs",
    company: "Studio Eva",
  });
});

test("third-party referral submission is unavailable; clients inquire themselves", async ({
  page,
  request,
}) => {
  await page.goto("/doporuceni");
  await expect(page.locator('[name="referralEmail"]')).toHaveCount(0);
  await expect(page.locator("#referral-conditions")).toContainText(
    "Ozvat se musí sám",
  );

  const response = await request.post("/api/referral", {
    data: { referral: { email: "someone@example.com" } },
  });
  expect(response.status()).toBe(404);

  await page.goto("/");
  await expect(page.locator(".contact-form__hint")).toHaveCount(0);
  await expect(page.locator("#contact-referral-hint")).toHaveCount(0);
});

for (const width of [375, 768, 1024, 1440]) {
  test(`referral page has no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/doporuceni");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBe(0);
  });
}
