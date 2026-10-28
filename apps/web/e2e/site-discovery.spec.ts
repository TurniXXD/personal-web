import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("compact footer keeps core destinations and referrals understated", async ({
  page,
}) => {
  await page.goto("/");
  const footer = page.locator(".site-footer");
  for (const href of [
    "/",
    "/#services",
    "/#work",
    "/#process",
    "/#about",
    "/kontakt",
    "/doporuceni",
    "/privacy",
    "mailto:contact@vantuch.dev",
    "https://github.com/TurniXXD",
    "https://www.linkedin.com/in/jakub-vantuch-552514197/",
    "https://www.instagram.com/vantuch.dev/",
  ]) {
    await expect(footer.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
  await expect(footer.locator(".site-footer__nav a")).toHaveCount(5);
  const footerEmail = footer.locator(".site-footer__email");
  await expect(footerEmail).toBeVisible();
  await expect(footerEmail).toHaveText("contact@vantuch.dev");
  await expect(footerEmail).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(
    footer.getByText("Digital Solutions Consultant", { exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByText(/Weby, automatizace, systémy a praktická AI pro firmy/),
  ).toHaveCount(0);
  const footerBottomMargin = await footer
    .locator(".site-footer__bottom")
    .evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).marginTop),
    );
  expect(footerBottomMargin).toBeGreaterThanOrEqual(24);
  await expect(
    footer.getByRole("link", { name: "Doporučit klienta" }),
  ).not.toHaveClass(/ui-action|button|highlight/);
  await expect(
    page
      .locator(".contact-form")
      .getByRole("link", { name: "Zpracování osobních údajů" }),
  ).toHaveAttribute("href", "/privacy");
});

test("blog and RSS are not publicly available", async ({ page, request }) => {
  const blog = await page.goto("/blog");
  expect(blog?.status()).toBe(404);

  const englishBlog = await request.get("/en/blog");
  expect(englishBlog.status()).toBe(404);

  const rss = await request.get("/rss.xml");
  expect(rss.status()).toBe(404);
});
