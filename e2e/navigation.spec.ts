import { expect, test } from "@playwright/test";

test("sets the app title", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page).toHaveTitle("Jakub Vantuch | Personal Web", { timeout: 20000 });
});

test("opens the work dialog from navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByTestId("nav-work")).toBeVisible();

  await page.getByTestId("nav-work").click();

  await expect(page.getByTestId("dialog-work")).toHaveAttribute("data-open", "true");
  await expect(page.getByText("My work")).toBeVisible();
  await expect(page.getByRole("link", { name: /Kinedok/i })).toBeVisible();
});

test("opens the capabilities and contact dialogs from navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByTestId("nav-skills")).toBeVisible();

  await page.getByTestId("nav-skills").click();
  await expect(page.getByTestId("dialog-skills")).toHaveAttribute("data-open", "true");
  await expect(page.getByTestId("dialog-skills").getByText("Capabilities")).toBeVisible();

  await page.getByTestId("nav-contact").click();
  await expect(page.getByTestId("dialog-contact")).toHaveAttribute("data-open", "true");
  await expect(page.getByText("Launch your project")).toBeVisible();
});
