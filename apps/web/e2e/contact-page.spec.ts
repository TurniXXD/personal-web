import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("contact actions follow the contact form on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/");

  const form = page.locator("#contact .contact-form");
  const actions = page.locator("#contact .contact-section__actions");
  await expect(form).toBeVisible();
  await expect(actions).toBeVisible();
  await expect(form.getByRole("heading", { level: 3 })).toHaveCSS(
    "font-size",
    "18.4px",
  );
  await expect(form.locator("#contact-message")).toHaveCSS("font-size", "16px");
  await expect(form.locator(".form-privacy-notice")).toHaveCSS(
    "font-size",
    "10.88px",
  );
  const formBox = await form.boundingBox();
  const actionsBox = await actions.boundingBox();
  expect(formBox).not.toBeNull();
  expect(actionsBox).not.toBeNull();
  expect(actionsBox!.y).toBeGreaterThan(formBox!.y + formBox!.height);
});

test("contact fields use the brand border on hover", async ({ page }) => {
  await page.goto("/");
  const input = page.locator("#contact-name");
  await input.hover();
  await expect(input).toHaveCSS("border-color", "rgb(79, 93, 224)");
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

  await form.locator('[name="name"]').fill("Jakub Vantuch");
  await form.locator('[name="email"]').fill("hello@vantuch.dev");
  await form.locator('[name="phone"]').fill("+420 735 023 812");
  await form.locator('[name="message"]').fill("Potřebuji nový firemní web.");
  await expect(
    form.locator('[name="source"], [name="referrerEmail"]'),
  ).toHaveCount(0);

  await page.route("**/api/contact", async (route) => {
    const payload = route.request().postDataJSON();
    expect(payload).toMatchObject({
      name: "Jakub Vantuch",
      email: "hello@vantuch.dev",
      phone: "+420 735 023 812",
      message: "Potřebuji nový firemní web.",
      request: {
        type: "general",
        subject: "",
        sourcePath: "/",
      },
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
  await expect(page.locator(".contact-page__details")).toContainText(
    "Na mobilu jsem dostupný v pracovní dny od 8:00 do 18:00.",
  );
  await expect(page.locator(".site-header__lang")).toHaveAttribute(
    "href",
    "/en/kontakt",
  );

  await expect(
    page.getByRole("heading", { name: "Přímý kontakt" }),
  ).toHaveCount(0);

  await page.setViewportSize({ width: 375, height: 844 });
  const formBox = await page.locator(".contact-page__form").boundingBox();
  const directContactBox = await page
    .locator(".contact-page__direct")
    .boundingBox();
  expect(formBox).not.toBeNull();
  expect(directContactBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThan(directContactBox!.y);

  await page.goto("/en/kontakt");
  await expect(
    page.getByRole("heading", { name: "Direct contact" }),
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
