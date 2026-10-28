import { expect } from "@playwright/test";
import { test } from "./site-fixture";

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
  await expect(
    page.locator('.ai-use-case-carousel__slide[data-active="true"]'),
  ).toHaveCSS("animation-name", "none");
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
  await expect(page.locator('[data-scroll-reveal="true"]')).toHaveCount(16);
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
  expect(states).toEqual(Array(2).fill("static"));

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
  const orbits = page.locator(".hero-art__orbit");
  for (const orbit of await orbits.all()) {
    await expect(orbit).toHaveCSS("animation-name", /orbit-spin$/);
    const initialTransform = await orbit.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    await expect
      .poll(() =>
        orbit.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe(initialTransform);
  }
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

  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const orbit of await orbits.all()) {
    await expect(orbit).toHaveCSS("animation-name", "none");
  }
});

test("loyalty and voucher hero visuals follow the pointer", async ({
  page,
}) => {
  for (const [path, movingPart] of [
    ["/sluzby/vernostni-programy", ".loyalty-hero__phone"],
    ["/sluzby/darkove-poukazy", ".voucher-hero__ticket"],
  ] as const) {
    await page.goto(path);

    const visual = page.locator("[data-pointer-reactive-hero]");
    await expect(visual).toHaveCount(1);
    const part = page.locator(movingPart);
    const initialTransform = await part.evaluate(
      (element) => getComputedStyle(element).transform,
    );
    const heroBox = await page.locator(".service-detail-hero").boundingBox();
    if (!heroBox) throw new Error(`Hero is not visible on ${path}`);

    await page.mouse.move(
      heroBox.x + heroBox.width * 0.18,
      heroBox.y + heroBox.height * 0.24,
    );
    await expect
      .poll(() =>
        part.evaluate((element) => getComputedStyle(element).transform),
      )
      .not.toBe(initialTransform);
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/sluzby/vernostni-programy");
  const phone = page.locator(".loyalty-hero__phone");
  const stableTransform = await phone.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  const heroBox = await page.locator(".service-detail-hero").boundingBox();
  if (!heroBox) throw new Error("Reduced-motion hero is not visible");
  await page.mouse.move(heroBox.x + 10, heroBox.y + 10);
  await page.waitForTimeout(250);
  await expect(phone).toHaveCSS("transform", stableTransform);
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
  await expect(projectCard).toHaveCSS("border-color", "rgb(79, 93, 224)");
  await expectStableVerticalPosition(".case-card");

  await page.goto("/sluzby/ai-reseni");
  await expectStableVerticalPosition(".service-offering-card");

  await page.goto("/sluzby/webove-aplikace");
  await expectStableVerticalPosition(".service-related__links a");
});
