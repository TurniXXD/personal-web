import { expect, type Page } from "@playwright/test";
import { test } from "./site-fixture";

// site-fixture disables the robot for all other specs; re-enable it here.
const enableRobot = async (page: Page) => {
  await page.addInitScript(() => localStorage.removeItem("vantuch_card_robot"));
};

test("robot grabs a card edge, peeks out, and greets on hover", async ({
  page,
}) => {
  await enableRobot(page);
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.addInitScript(() => {
    Math.random = () => 0.4;
  });
  await page.addInitScript(() => {
    // Record every phase the robot passes through.
    const phases: string[] = [];
    Object.assign(window, { robotPhases: phases });
    new MutationObserver(() => {
      const phase = document
        .querySelector("[data-card-robot]")
        ?.getAttribute("data-phase");
      if (phase && phases.at(-1) !== phase) phases.push(phase);
    }).observe(document, {
      subtree: true,
      attributes: true,
      childList: true,
      attributeFilter: ["data-phase"],
    });
  });
  await page.goto("/akce");

  const robot = page.locator("[data-card-robot]");
  await expect(robot).toHaveAttribute("data-phase", "peek", {
    timeout: 18_000,
  });
  await expect(robot).toHaveAttribute("aria-hidden", "true");
  const edge = await robot.getAttribute("data-edge");
  expect(["top", "left", "right"]).toContain(edge);
  const phases = await page.evaluate(
    () => (window as unknown as { robotPhases: string[] }).robotPhases,
  );
  expect(phases.slice(0, 2)).toEqual(["grab", "peek"]);

  // The robot sits on an exposed edge of one of the event cards.
  const robotBox = await robot.boundingBox();
  const cardBoxes = await page
    .locator("[data-event-card]")
    .evaluateAll((cards) =>
      cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return { top: rect.top, left: rect.left, right: rect.right };
      }),
    );
  expect(robotBox).not.toBeNull();
  expect(
    cardBoxes.some((box) =>
      edge === "top"
        ? Math.abs(robotBox!.y + robotBox!.height - box.top) < 2
        : edge === "left"
          ? Math.abs(robotBox!.x + robotBox!.width - box.left) < 10
          : Math.abs(robotBox!.x - box.right) < 10,
    ),
  ).toBe(true);

  const bubble = robot.getByText("Ahoj!");
  await expect(bubble).toHaveCSS("opacity", "0");
  await page.locator("[data-card-robot-head]").hover();
  await expect(robot).toHaveAttribute("data-greeting", "true");
  await expect(bubble).toHaveCSS("opacity", "1");

  // Decorative only: no horizontal overflow and cards stay clickable.
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
  await page.mouse.move(0, 0);
  await page
    .context()
    .route("https://example.com/**", (route) =>
      route.fulfill({ contentType: "text/html", body: "ok" }),
    );
  const popup = page.waitForEvent("popup");
  await page.locator("[data-event-card-link]").first().click();
  expect((await popup).url()).toMatch(/^https:\/\/example\.com\//);
});

test("robot stays still for reduced motion", async ({ page }) => {
  await enableRobot(page);
  // Tablet width: on phones stacked cards leave no room above for the head.
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/akce");
  const robot = page.locator("[data-card-robot]");
  await expect(robot).toHaveAttribute("data-phase", "peek");
  await expect(robot).toHaveAttribute("data-edge", "top");
  await page.waitForTimeout(1500);
  await expect(robot).toHaveAttribute("data-phase", "peek");
});

test("robot moves to another visible card on the next peek", async ({
  page,
}) => {
  test.setTimeout(80_000);
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.addInitScript(() => {
    localStorage.removeItem("vantuch_card_robot");
    Math.random = () => 0;
  });
  await page.goto("/akce");

  const robot = page.locator("[data-card-robot]");
  await expect(robot).toHaveAttribute("data-phase", "peek", {
    timeout: 18_000,
  });
  const first = await robot.boundingBox();
  await expect(robot).toHaveAttribute("data-phase", "hidden", {
    timeout: 7_000,
  });
  await page.waitForTimeout(15_000);
  await expect(robot).toHaveAttribute("data-phase", "hidden");
  await expect(robot).toHaveAttribute("data-phase", "peek", {
    timeout: 40_000,
  });
  const second = await robot.boundingBox();

  expect(first).not.toBeNull();
  expect(second).not.toBeNull();
  expect(second!.x).not.toBe(first!.x);
});

test("robot peeks from the outer side of a desktop card", async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.addInitScript(() => {
    localStorage.removeItem("vantuch_card_robot");
    Math.random = () => 0;
  });
  await page.goto("/akce");

  const robot = page.locator("[data-card-robot]");
  await expect(robot).toHaveAttribute("data-phase", "peek", {
    timeout: 18_000,
  });
  await expect(robot).toHaveAttribute("data-edge", "left");
  const robotBox = await robot.boundingBox();
  const cardBox = await page.locator("[data-event-card]").first().boundingBox();
  expect(robotBox).not.toBeNull();
  expect(cardBox).not.toBeNull();
  expect(Math.abs(robotBox!.x + robotBox!.width - cardBox!.x)).toBeLessThan(10);
  expect(robotBox!.y).toBeGreaterThan(cardBox!.y);
  expect(robotBox!.y + robotBox!.height).toBeLessThan(
    cardBox!.y + cardBox!.height,
  );
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    ),
  ).toBe(false);
});

test("robot can peek from the right edge of a desktop card", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.addInitScript(() => {
    localStorage.removeItem("vantuch_card_robot");
    Math.random = () => 0.99;
  });
  await page.goto("/akce");

  const robot = page.locator("[data-card-robot]");
  await expect(robot).toHaveAttribute("data-phase", "peek", {
    timeout: 18_000,
  });
  await expect(robot).toHaveAttribute("data-edge", "right");
  const robotBox = await robot.boundingBox();
  const cardBox = await page.locator("[data-event-card]").nth(2).boundingBox();
  expect(robotBox).not.toBeNull();
  expect(cardBox).not.toBeNull();
  expect(Math.abs(robotBox!.x - (cardBox!.x + cardBox!.width))).toBeLessThan(
    10,
  );
});

test("robot disappears when filters leave no events", async ({ page }) => {
  await enableRobot(page);
  await page.goto("/akce?category=networking");

  const robot = page.locator("[data-card-robot]");
  await expect(robot).toHaveAttribute("data-phase", "peek", {
    timeout: 18_000,
  });
  await page.getByRole("checkbox", { name: "Jídlo zdarma" }).check();
  await expect(
    page.locator('[data-events-state="filtered-empty"]'),
  ).toBeVisible();
  await expect(page.locator("[data-event-card]")).toHaveCount(0);
  await expect(robot).toHaveCount(0);
});

test("robot never covers the section heading above the first card", async ({
  page,
}) => {
  await enableRobot(page);
  await page.setViewportSize({ width: 441, height: 860 });
  await page.goto("/");

  const heading = page.getByRole("heading", {
    name: "Co pro vás můžu vytvořit.",
  });
  await heading.scrollIntoViewIfNeeded();
  await page.evaluate(() =>
    window.scrollBy({ top: -250, behavior: "instant" }),
  );
  // The first peek is due after 10 s; give the retry loop a few rounds.
  await page.waitForTimeout(14_000);

  const robot = page.locator("[data-card-robot]");
  if ((await robot.count()) === 0) return;
  const robotBox = await robot.boundingBox();
  const headingBox = await heading.boundingBox();
  expect(robotBox).not.toBeNull();
  expect(headingBox).not.toBeNull();
  const overlaps =
    robotBox!.x < headingBox!.x + headingBox!.width &&
    robotBox!.x + robotBox!.width > headingBox!.x &&
    robotBox!.y < headingBox!.y + headingBox!.height &&
    robotBox!.y + robotBox!.height > headingBox!.y;
  expect(overlaps).toBe(false);
});
