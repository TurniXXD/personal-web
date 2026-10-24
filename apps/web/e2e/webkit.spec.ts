import { expect, test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    localStorage.setItem(
      "vantuch_cookie_consent_v1",
      JSON.stringify({ choice: "rejected", savedAt: Date.now() }),
    );
  });
});

test("mobile Safari keeps contact inputs readable and usable", async ({
  page,
}) => {
  await page.goto("/kontakt");

  const form = page.locator(".contact-form");
  await expect(form).toBeVisible();

  const fields = form.locator(
    ".contact-form__field input, .contact-form__field select, .contact-form__field textarea",
  );
  for (let index = 0; index < (await fields.count()); index += 1) {
    await expect(fields.nth(index)).toHaveCSS("font-size", "16px");
  }

  await form.getByLabel("Jméno").fill("Safari Test");
  await form.getByLabel("Váš e-mail").fill("safari@example.com");
  await form
    .getByLabel("S čím vám mohu pomoci?")
    .fill("Kontrola mobilního formuláře.");
  await expect(form.getByLabel("S čím vám mohu pomoci?")).toHaveValue(
    "Kontrola mobilního formuláře.",
  );

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("mobile Safari exposes localized form validation", async ({ page }) => {
  await page.goto("/en/kontakt");

  const form = page.locator(".contact-form");
  await form.getByRole("button", { name: "Send message" }).click();
  await expect(
    form.getByText("Please fill in this field.").first(),
  ).toBeVisible();
  await expect(form.getByLabel("Name")).toBeFocused();
});
