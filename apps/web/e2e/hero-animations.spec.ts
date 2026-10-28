import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("hero animations on every page resolve to real keyframes", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const heroes = [
    { path: "/", selector: ".hero-art", minimumAnimatedParts: 2 },
    {
      path: "/sluzby/webove-aplikace",
      selector: ".service-hero",
      minimumAnimatedParts: 6,
    },
    {
      path: "/sluzby/ai-reseni",
      selector: ".service-hero",
      minimumAnimatedParts: 3,
    },
    {
      path: "/automatizace",
      selector: ".automation-page-hero",
      minimumAnimatedParts: 5,
    },
    {
      path: "/doporuceni",
      selector: ".referral-hero",
      minimumAnimatedParts: 5,
    },
    { path: "/kontakt", selector: ".contact-page", minimumAnimatedParts: 4 },
    { path: "/privacy", selector: ".privacy-page", minimumAnimatedParts: 3 },
    { path: "/work/robe", selector: ".case-detail", minimumAnimatedParts: 2 },
    {
      path: "/sluzby/firemni-weby",
      selector: ".service-detail-hero",
      minimumAnimatedParts: 5,
    },
    {
      path: "/sluzby/webove-aplikace-na-miru",
      selector: ".service-detail-hero",
      minimumAnimatedParts: 5,
    },
    {
      path: "/sluzby/shoptet",
      selector: ".service-detail-hero",
      minimumAnimatedParts: 5,
    },
    {
      path: "/sluzby/vernostni-programy",
      selector: ".service-detail-hero",
      minimumAnimatedParts: 5,
    },
    {
      path: "/sluzby/darkove-poukazy",
      selector: ".service-detail-hero",
      minimumAnimatedParts: 5,
    },
    {
      path: "/sluzby/audit-ai-aplikaci",
      selector: ".service-detail-hero",
      minimumAnimatedParts: 5,
    },
  ] as const;

  for (const { path, selector, minimumAnimatedParts } of heroes) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const root = page.locator(selector).first();
    await expect(root).toBeVisible();

    const animations = await root.evaluate((element) => {
      const definedKeyframes = new Set<string>();
      const inspectRules = (rules: CSSRuleList) => {
        for (const rule of rules) {
          if (rule instanceof CSSKeyframesRule) {
            definedKeyframes.add(rule.name);
          } else if ("cssRules" in rule) {
            inspectRules((rule as CSSGroupingRule).cssRules);
          }
        }
      };

      for (const sheet of document.styleSheets) {
        try {
          inspectRules(sheet.cssRules);
        } catch {
          // A third-party stylesheet may be inaccessible; app CSS is local.
        }
      }

      const names = Array.from(
        element.querySelectorAll<HTMLElement | SVGElement>("*"),
      ).flatMap((part) =>
        getComputedStyle(part)
          .animationName.split(",")
          .map((name) => name.trim())
          .filter((name) => name !== "none"),
      );

      return {
        count: names.length,
        missing: names.filter((name) => !definedKeyframes.has(name)),
      };
    });

    expect(
      animations.count,
      `${path} should retain its hero animations`,
    ).toBeGreaterThanOrEqual(minimumAnimatedParts);
    expect(animations.missing, `${path} has undefined keyframes`).toEqual([]);
  }
});

test("the web application chart actually draws and stops for reduced motion", async ({
  page,
}) => {
  await page.goto("/sluzby/webove-aplikace");
  const chartLine = page.locator('[data-web-visual-part="chart-line"]');
  const offsets = await chartLine.evaluate((element) => {
    const animation = element.getAnimations()[0];
    if (!animation) return null;
    animation.pause();
    animation.currentTime = 0;
    const start = getComputedStyle(element).strokeDashoffset;
    animation.currentTime = 2800;
    const middle = getComputedStyle(element).strokeDashoffset;
    animation.play();
    return { start, middle };
  });

  expect(offsets).not.toBeNull();
  expect(offsets?.start).not.toBe(offsets?.middle);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(chartLine).toHaveCSS("animation-name", "none");
  await expect(chartLine).toHaveCSS("stroke-dashoffset", "0px");
});

test("the AI hero pipeline moves and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/sluzby/ai-reseni");
  const input = page
    .locator(".service-hero-visual--ai .ai-pipeline__input")
    .first();
  const transforms = await input.evaluate((element) => {
    const animation = element.getAnimations()[0];
    if (!animation) return null;
    animation.pause();
    animation.currentTime = 0;
    const start = getComputedStyle(element).transform;
    animation.currentTime = 3600;
    const middle = getComputedStyle(element).transform;
    animation.play();
    return { start, middle };
  });

  expect(transforms).not.toBeNull();
  expect(transforms?.start).not.toBe(transforms?.middle);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(input).toHaveCSS("animation-name", "none");
});

test("service details and referral visuals animate real states", async ({
  page,
}) => {
  const samples = [
    [
      "/sluzby/firemni-weby",
      '[data-core-hero-animation="website-cursor"]',
      "transform",
      0.5,
    ],
    [
      "/sluzby/webove-aplikace-na-miru",
      '[data-core-hero-animation="app-case"]',
      "borderColor",
      0.18,
    ],
    [
      "/sluzby/shoptet",
      '[data-core-hero-animation="cart-toast"]',
      "opacity",
      0.65,
    ],
    [
      "/sluzby/vernostni-programy",
      ".loyalty-hero__stamps i.is-active",
      "scale",
      0.27,
    ],
    ["/sluzby/darkove-poukazy", ".voucher-hero__status > span", "scale", 0.5],
    [
      "/sluzby/audit-ai-aplikaci",
      ".audit-hero__findings > div",
      "borderColor",
      0.27,
    ],
    ["/doporuceni", ".referral-hero__percentage strong", "color", 0.5],
  ] as const;

  for (const [path, selector, property, progress] of samples) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const values = await page
      .locator(selector)
      .first()
      .evaluate(
        (element, sample) => {
          const animation = element.getAnimations()[0];
          if (!animation) return null;
          const duration = Number(
            (animation.effect?.getComputedTiming().duration as number) ?? 0,
          );
          animation.pause();
          animation.currentTime = 0;
          const start = getComputedStyle(element)[sample.property];
          animation.currentTime = duration * sample.progress;
          const middle = getComputedStyle(element)[sample.property];
          animation.play();
          return { start, middle };
        },
        { property, progress },
      );

    expect(values, `${path} should animate ${selector}`).not.toBeNull();
    expect(values?.middle, `${path} should visibly change`).not.toBe(
      values?.start,
    );

    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(selector).first()).toHaveCSS(
      "animation-name",
      "none",
    );
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
});

test("the audit code scan and finding highlights stay synchronized", async ({
  page,
}) => {
  await page.goto("/sluzby/audit-ai-aplikaci");

  const codeScan = page.locator("[data-audit-code-scan]");
  const scanStates = await codeScan.evaluate((element) => {
    const style = getComputedStyle(element, "::before");
    const transforms = new Set<string>();
    const inspectRules = (rules: CSSRuleList) => {
      for (const rule of rules) {
        if (
          rule instanceof CSSKeyframesRule &&
          rule.name === style.animationName
        ) {
          for (const keyframe of rule.cssRules) {
            transforms.add((keyframe as CSSKeyframeRule).style.transform);
          }
        } else if ("cssRules" in rule) {
          inspectRules((rule as CSSGroupingRule).cssRules);
        }
      }
    };

    for (const sheet of document.styleSheets) {
      try {
        inspectRules(sheet.cssRules);
      } catch {
        // A third-party stylesheet may be inaccessible; app CSS is local.
      }
    }

    return {
      animationName: style.animationName,
      duration: style.animationDuration,
      iterationCount: style.animationIterationCount,
      transforms: Array.from(transforms),
    };
  });

  expect(scanStates).toEqual({
    animationName: "hero-audit-code-scan",
    duration: "6s",
    iterationCount: "infinite",
    transforms: ["translateY(0px)", "translateY(100%)", "translateY(200%)"],
  });

  const findingTimings = await page
    .locator("[data-audit-finding]")
    .evaluateAll((findings) =>
      findings.map((finding) => {
        const style = getComputedStyle(finding);
        return {
          duration: style.animationDuration,
          delay: style.animationDelay,
        };
      }),
    );

  expect(findingTimings).toEqual([
    { duration: "6s", delay: "0s" },
    { duration: "6s", delay: "-4s" },
    { duration: "6s", delay: "-2s" },
  ]);

  await page.emulateMedia({ reducedMotion: "reduce" });
  const reducedMotionState = await codeScan.evaluate((element) => ({
    animationName: getComputedStyle(element, "::before").animationName,
    transform: getComputedStyle(element, "::before").transform,
  }));
  expect(reducedMotionState.animationName).toBe("none");
  expect(reducedMotionState.transform).not.toBe("none");
  await expect(page.locator('[data-audit-finding="warning"]')).toHaveCSS(
    "border-color",
    "rgba(239, 176, 102, 0.54)",
  );
});

test("AI use-case animations also have working keyframes", async ({ page }) => {
  const hasKeyframes = (element: Element) =>
    element
      .getAnimations()
      .some(
        (animation) =>
          animation.effect instanceof KeyframeEffect &&
          animation.effect.getKeyframes().length > 0,
      );

  await page.goto("/sluzby/ai-reseni");
  const carousel = page.locator(".ai-use-case-carousel");
  await expect(carousel).toBeVisible();
  const trendsBar = carousel.locator(".ai-case-trends__chart span").first();
  await expect(trendsBar).toBeVisible();
  expect(await trendsBar.evaluate(hasKeyframes)).toBe(true);

  await carousel.locator(".ai-use-case-carousel__tabs button").nth(2).click();
  const enquiryConnector = carousel
    .locator(
      '.ai-use-case-carousel__slide[data-active="true"] .ai-case-enquiry__connector i',
    )
    .first();
  await expect(enquiryConnector).toBeVisible();
  expect(await enquiryConnector.evaluate(hasKeyframes)).toBe(true);

  await carousel.locator(".ai-use-case-carousel__tabs button").nth(4).click();
  const reviewConnector = carousel
    .locator(
      '.ai-use-case-carousel__slide[data-active="true"] .ai-case-reviews__topics i',
    )
    .first();
  await expect(reviewConnector).toBeVisible();
  expect(await reviewConnector.evaluate(hasKeyframes)).toBe(true);
});

test("new hero motion stops when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const [path, selector] of [
    ["/automatizace", ".automation-page-hero__visual-check"],
    ["/sluzby/firemni-weby", ".service-detail-hero__content h1"],
    ["/sluzby/vernostni-programy", ".loyalty-hero__glow"],
    ["/sluzby/darkove-poukazy", ".voucher-hero__backdrop"],
    ["/sluzby/audit-ai-aplikaci", ".audit-hero__code-heading > i"],
    ["/kontakt", ".contact-page__intro h1"],
    ["/privacy", ".privacy-page h1"],
    ["/work/robe", ".case-detail__intro"],
  ] as const) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.locator(selector).first()).toHaveCSS(
      "animation-name",
      "none",
    );
  }

  await page.goto("/doporuceni", { waitUntil: "domcontentloaded" });
  for (const orbitPart of await page
    .locator(".referral-hero__orbit-dot-track")
    .all()) {
    await expect(orbitPart).toHaveCSS("animation-name", "none");
  }
});
