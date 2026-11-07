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
    timeout: 10_000,
  });
  await expect(robot).toHaveAttribute("aria-hidden", "true");
  const phases = await page.evaluate(
    () => (window as unknown as { robotPhases: string[] }).robotPhases,
  );
  expect(phases.slice(0, 2)).toEqual(["grab", "peek"]);

  // The robot sits on the top edge of one of the event cards.
  const robotBox = await robot.boundingBox();
  const cardTops = await page
    .locator("[data-event-card]")
    .evaluateAll((cards) =>
      cards.map((card) => card.getBoundingClientRect().top),
    );
  expect(robotBox).not.toBeNull();
  expect(
    cardTops.some((top) => Math.abs(robotBox!.y + robotBox!.height - top) < 2),
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
  await page.locator("[data-event-card-link]").first().click();
  await expect(page).toHaveURL(/\/akce\/[a-z0-9-]+$/);
});

test("robot stays still for reduced motion", async ({ page }) => {
  await enableRobot(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/akce");
  const robot = page.locator("[data-card-robot]");
  await expect(robot).toHaveAttribute("data-phase", "peek");
  await page.waitForTimeout(1500);
  await expect(robot).toHaveAttribute("data-phase", "peek");
});
