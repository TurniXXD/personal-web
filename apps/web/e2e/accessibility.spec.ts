import { expect } from "@playwright/test";
import { test } from "./site-fixture";
import AxeBuilder from "@axe-core/playwright";

test("public pages pass automated WCAG checks", async ({ page }) => {
  for (const path of ["/", "/sluzby/audit-ai-aplikaci", "/kontakt"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(
      results.violations,
      `${path}: ${results.violations
        .map((violation) => `${violation.id} (${violation.nodes.length})`)
        .join(", ")}`,
    ).toEqual([]);
  }
});
