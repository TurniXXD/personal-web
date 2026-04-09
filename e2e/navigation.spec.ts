import { expect, test } from "@playwright/test";

test("opens the work dialog from navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByTestId("nav-work")).toBeVisible();

  await page.getByTestId("nav-work").click();

  await expect(page).toHaveURL(/\/(en|cs)\/?$/);
  await expect(page.getByTestId("dialog-work")).toHaveAttribute("data-open", "true");
  await expect(page.getByText("My work")).toBeVisible();
  await expect(page.getByRole("link", { name: /Kinedok/i })).toBeVisible();
});

test("opens the work dialog from the navigation query param and clears it", async ({ page }) => {
  await page.goto("/?navigation=work", { waitUntil: "networkidle" });

  await expect(page).toHaveURL(/\/(en|cs)\/?$/);
  await expect(page.getByTestId("dialog-work")).toHaveAttribute("data-open", "true");
  await expect(page.getByText("My work")).toBeVisible();
});

test("opens the capabilities and contact dialogs from navigation", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByTestId("nav-capabilities")).toBeVisible();

  await page.getByTestId("nav-capabilities").click();
  await expect(page.getByTestId("dialog-capabilities")).toHaveAttribute("data-open", "true");
  await expect(page.getByTestId("dialog-capabilities").getByText("Capabilities")).toBeVisible();

  await page.getByTestId("nav-contact").click();
  await expect(page.getByTestId("dialog-contact")).toHaveAttribute("data-open", "true");
  await expect(page.getByText("Let's talk about your project")).toBeVisible();
});
