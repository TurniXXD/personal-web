import { expect } from "@playwright/test";
import { test } from "./site-fixture";

test("signed referral lookup shows attribution without exposing referrer details", async ({
  page,
  context,
}) => {
  await page.route("**/api/referrer", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ referralApplied: true }),
    });
  });
  await page.goto("/?ref=example-token");
  const cookie = (await context.cookies()).find(
    (item) => item.name === "vantuch_referral",
  );
  expect(cookie).toMatchObject({
    value: "example-token",
    httpOnly: true,
    sameSite: "Lax",
  });
  const form = page.locator(".contact-form");
  await expect(form.locator(".contact-form__referral")).toContainText(
    "Doporučení z odkazu je přiřazeno",
  );
  await expect(
    form.locator('[name="source"], [name="referrerEmail"]'),
  ).toHaveCount(0);
});

test("Czech referral page directs referrers to share a link, not contacts", async ({
  page,
}) => {
  await page.goto("/doporuceni");

  await expect(page.locator("html")).toHaveAttribute("lang", "cs");
  await expect(page).toHaveTitle("Doporučte klienta | Jakub Vantuch");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Znáte firmu, které bych mohl pomoct?",
  );
  await expect(
    page.getByRole("heading", { name: "Jak doporučení funguje" }),
  ).toBeVisible();
  await expect(page.locator(".site-header__cta")).toContainText(
    "Probrat projekt",
  );
  await expect(page.locator(".site-header__cta")).toHaveAttribute(
    "href",
    "/#contact",
  );
  await expect(
    page.locator(".referral-hero .ui-action--primary"),
  ).toHaveAttribute("href", "#referral-link");
  await expect(
    page.locator(".referral-hero .ui-action--secondary"),
  ).toHaveAttribute("href", "#how-it-works");
  await expect(
    page.getByRole("link", { name: /Požádat o odkaz e-mailem/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Odeslat vlastní poptávku/ }),
  ).toHaveAttribute("href", "/#contact");
  await expect(page.locator(".referral-request-form")).toHaveCount(2);
  await expect(
    page.locator('.referral-request-form--link input[name="name"]'),
  ).toBeVisible();
  await expect(
    page.locator('.referral-request-form--link input[name="email"]'),
  ).toBeVisible();
  await expect(page.locator("#referral-link")).toContainText(
    "Poptávku pošle klient",
  );
  await expect(page.locator(".referral-hero")).toContainText(
    "Doporučte mě firmě, která potřebuje web, aplikaci nebo automatizaci",
  );
  await expect(page.locator("#referral-conditions")).toContainText(
    "Co když klient nepoužije můj odkaz?",
  );
  await expect(page.locator("#referral-conditions")).toContainText(
    "uvede jako člověka, který mě doporučil",
  );
  await expect(
    page.getByText("Mohu poslat kontakt na firmu sám?"),
  ).toBeVisible();
  await expect(page.locator(".referral-hero__visual")).toContainText("10%");
  const ringStyles = await page
    .locator(".referral-hero__visual")
    .evaluate((visual) => {
      const card = visual.querySelector(".referral-hero__reward-card");
      const rings = visual.querySelectorAll(".referral-hero__orbit-dot-track");
      if (!card || rings.length !== 2) return null;
      return {
        firstRing: getComputedStyle(rings[0]).borderTopStyle,
        secondRing: getComputedStyle(rings[1]).borderTopStyle,
        innerRing: getComputedStyle(card, "::after").content,
        cardBackground: getComputedStyle(card).backgroundColor,
      };
    });
  expect(ringStyles).toEqual({
    firstRing: "solid",
    secondRing: "solid",
    innerRing: "none",
    cardBackground: "rgb(255, 255, 255)",
  });
  const orbitDots = page.locator(".referral-hero__orbit-dot-track");
  await expect(orbitDots).toHaveCount(2);
  for (const dot of await orbitDots.all()) {
    await expect(dot).toHaveCSS(
      "animation-name",
      "referral-orbit-breathe, referral-orbit-dot",
    );
  }
  const orbitAlignment = await orbitDots.evaluateAll((tracks) =>
    tracks.map((track) => {
      const dot = track.querySelector("i");
      if (!dot) return null;
      const trackRect = track.getBoundingClientRect();
      const dotRect = dot.getBoundingClientRect();
      const scale = Number.parseFloat(getComputedStyle(track).scale) || 1;
      const distanceFromCenter = Math.hypot(
        dotRect.x + dotRect.width / 2 - (trackRect.x + trackRect.width / 2),
        dotRect.y + dotRect.height / 2 - (trackRect.y + trackRect.height / 2),
      );
      return {
        deviation: Math.abs(
          distanceFromCenter - (track.clientWidth * scale) / 2,
        ),
        dotColor: getComputedStyle(dot).backgroundColor,
        dotSize: getComputedStyle(dot).width,
      };
    }),
  );
  for (const orbit of orbitAlignment) {
    expect(orbit).not.toBeNull();
    expect(orbit?.deviation).toBeLessThan(1.5);
    expect(orbit?.dotColor).toBe("rgb(79, 93, 224)");
    expect(Number.parseFloat(orbit?.dotSize ?? "0")).toBeCloseTo(8.8, 1);
  }
  await expect(page.locator(".referral-hero__visual")).toContainText(
    "Provize za doporučení",
  );
  await expect(
    page.locator(".referral-hero .ui-action--primary"),
  ).toHaveAttribute("href", "#referral-link");
  await expect(
    page.getByRole("link", { name: /Podmínky doporučení/ }),
  ).toHaveAttribute("href", "#referral-conditions");
  await expect(
    page.locator(".site-footer a[href='/doporuceni']"),
  ).toBeVisible();
  await expect(
    page.locator('link[rel="alternate"][hreflang="en"]'),
  ).toHaveAttribute("href", "https://vantuch.dev/en/doporuceni");
});

test("English referral page and locale switch are available", async ({
  page,
}) => {
  await page.goto("/en/doporuceni");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("Refer a client | Jakub Vantuch");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Know a business I could help?",
  );
  await expect(page.locator(".site-header__lang")).toHaveAttribute(
    "href",
    "/doporuceni",
  );
  await expect(
    page.getByRole("link", { name: /Send your own inquiry/ }),
  ).toHaveAttribute("href", "/en#contact");
  await expect(
    page.getByRole("form", { name: "Where should I send your link?" }),
  ).toBeVisible();
  await expect(
    page.getByRole("form", { name: "Tell me about a partnership" }),
  ).toBeVisible();
});

test("referral fields and floating labels match each form background", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 844 });
  await page.goto("/doporuceni");

  for (const { selector, color } of [
    { selector: ".referral-request-form--link", color: "rgb(248, 249, 255)" },
    {
      selector: ".referral-request-form--partnership",
      color: "rgb(255, 255, 255)",
    },
  ]) {
    const form = page.locator(selector);
    await expect(form).toHaveCSS("background-color", color);
    await expect(form.locator("input").first()).toHaveCSS(
      "background-color",
      color,
    );
    await expect(form.locator("label").first()).toHaveCSS(
      "background-color",
      color,
    );
  }
});

test("referral and partnership forms submit their dedicated intent", async ({
  page,
}) => {
  await page.goto("/doporuceni");
  const requests: Array<Record<string, string>> = [];
  await page.route("**/api/referral-request", async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  const linkForm = page.locator(".referral-request-form--link");
  await linkForm.locator('[name="name"]').fill("Jan Doporučitel");
  await linkForm.locator('[name="email"]').fill("jan@example.com");
  await linkForm.getByRole("button", { name: "Poslat můj odkaz" }).click();
  await expect(linkForm.getByRole("status")).toContainText(
    "Osobní doporučovací odkaz jsem vám poslal e-mailem",
  );

  const partnerForm = page.locator(".referral-request-form--partnership");
  await partnerForm.locator('[name="name"]').fill("Eva Partnerová");
  await partnerForm.locator('[name="email"]').fill("eva@example.com");
  await partnerForm.locator('[name="company"]').fill("Studio Eva");
  await partnerForm
    .locator('[name="message"]')
    .fill("Pravidelně spolupracuji s klienty, kteří potřebují vývoj.");
  await partnerForm
    .getByRole("button", { name: "Odeslat zájem o partnerství" })
    .click();
  await expect(partnerForm.getByRole("status")).toContainText(
    "partnerství společně probereme",
  );

  expect(requests).toHaveLength(2);
  expect(requests[0]).toMatchObject({
    intent: "link",
    locale: "cs",
    name: "Jan Doporučitel",
    email: "jan@example.com",
  });
  expect(requests[1]).toMatchObject({
    intent: "partnership",
    locale: "cs",
    company: "Studio Eva",
  });
});

test("third-party referral submission is unavailable; clients inquire themselves", async ({
  page,
  request,
}) => {
  await page.goto("/doporuceni");
  await expect(page.locator('[name="referralEmail"]')).toHaveCount(0);
  await expect(page.locator("#referral-conditions")).toContainText(
    "Ozvat se musí sám",
  );

  const response = await request.post("/api/referral", {
    data: { referral: { email: "someone@example.com" } },
  });
  expect(response.status()).toBe(404);

  await page.goto("/");
  await expect(page.locator(".contact-form__hint")).toHaveCount(0);
  await expect(page.locator("#contact-referral-hint")).toHaveCount(0);
});
