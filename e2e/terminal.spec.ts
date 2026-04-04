import { expect, test } from "@playwright/test";

const modK = process.platform === "darwin" ? "Meta+k" : "Control+k";

test("opens the terminal with the keyboard shortcut", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByTestId("terminal-toggle")).toBeVisible();

  await page.keyboard.press(modK);

  await expect(page.getByTestId("terminal-dock")).toHaveAttribute("data-open", "true");
  await expect(page.getByLabel("Navigation terminal")).toBeVisible();
});

test("focuses a section from the terminal command input", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByTestId("terminal-toggle")).toBeVisible();

  await page.getByTestId("terminal-toggle").click();
  await page.getByLabel("Navigation terminal").getByPlaceholder("open work").fill("open contact");
  await page.keyboard.press("Enter");

  await expect(page.getByTestId("dialog-contact")).toHaveAttribute("data-open", "true");
  await expect(page.getByText("Launch your project")).toBeVisible();
});
