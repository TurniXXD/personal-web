import { expect, test } from "@playwright/test";
import { verifyTurnstile } from "../lib/turnstile";
import { sanitizeSentryEvent } from "../lib/sentry-options";

test("Turnstile rejects forged, expired, cross-form and foreign-host tokens", async () => {
  const previousSecret = process.env.TURNSTILE_SECRET_KEY;
  const previousSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const previousHosts = process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  const originalFetch = globalThis.fetch;
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site-key";
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = "vantuch.dev,www.vantuch.dev";
  let result: object = {
    success: true,
    action: "contact",
    hostname: "vantuch.dev",
  };
  const requests: Record<string, unknown>[] = [];
  globalThis.fetch = (async (_url, options) => {
    requests.push(JSON.parse(String(options?.body)));
    return Response.json(result);
  }) as typeof fetch;
  try {
    delete process.env.TURNSTILE_SECRET_KEY;
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    expect(await verifyTurnstile(undefined, "contact")).toEqual({ ok: true });
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "test-site-key";
    expect(await verifyTurnstile(undefined, "contact")).toEqual({
      ok: false,
      reason: "notConfigured",
    });
    process.env.TURNSTILE_SECRET_KEY = "test-secret";
    expect(await verifyTurnstile(undefined, "contact")).toEqual({
      ok: false,
      reason: "failed",
    });
    expect(requests).toHaveLength(0);
    expect(await verifyTurnstile("valid-token", "contact")).toEqual({
      ok: true,
    });
    expect(requests[0]).toMatchObject({
      secret: "test-secret",
      response: "valid-token",
    });
    result = {
      success: true,
      action: "referral_link",
      hostname: "vantuch.dev",
    };
    expect(await verifyTurnstile("wrong-form", "contact")).toEqual({
      ok: false,
      reason: "failed",
    });
    result = { success: true, hostname: "vantuch.dev" };
    expect(await verifyTurnstile("no-action", "contact")).toEqual({
      ok: false,
      reason: "failed",
    });
    result = { success: true, action: "contact", hostname: "attacker.example" };
    expect(await verifyTurnstile("wrong-host", "contact")).toEqual({
      ok: false,
      reason: "failed",
    });
    result = { success: false, "error-codes": ["timeout-or-duplicate"] };
    expect(await verifyTurnstile("spent-token", "contact")).toEqual({
      ok: false,
      reason: "failed",
    });
    globalThis.fetch = (async () => {
      throw new Error("network unavailable");
    }) as typeof fetch;
    expect(await verifyTurnstile("network-error", "contact")).toEqual({
      ok: false,
      reason: "failed",
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (previousSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
    else process.env.TURNSTILE_SECRET_KEY = previousSecret;
    if (previousSiteKey === undefined)
      delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    else process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = previousSiteKey;
    if (previousHosts === undefined)
      delete process.env.TURNSTILE_ALLOWED_HOSTNAMES;
    else process.env.TURNSTILE_ALLOWED_HOSTNAMES = previousHosts;
  }
});

test("Sentry diagnostics strip form bodies, cookies, credentials and referral signatures", () => {
  const event = sanitizeSentryEvent({
    type: undefined,
    user: { email: "private@example.test" },
    extra: { message: "Private inquiry" },
    breadcrumbs: [{ message: "Private activity" }],
    request: {
      url: "https://vantuch.dev/?ref=signed-token#contact",
      query_string: "ref=signed-token",
      data: { email: "private@example.test" },
      headers: { authorization: "Bearer private-key" },
      cookies: { session: "private-session" },
    },
    exception: { values: [{ type: "Error", value: "Unexpected error" }] },
  });
  expect(event.request).toEqual({ url: "https://vantuch.dev/" });
  expect(event.user).toBeUndefined();
  expect(event.extra).toBeUndefined();
  expect(event.breadcrumbs).toBeUndefined();
  expect(event.exception?.values?.[0]?.value).toBe("Unexpected error");
});

test("cookie choices persist, can be reopened, and block analytics before consent", async ({
  page,
}) => {
  const analytics: string[] = [];
  await page.route(/clarity\.ms|cloudflareinsights\.com/, (route) => {
    analytics.push(route.request().url());
    return route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: "",
    });
  });
  await page.goto("/");
  const banner = page.getByRole("complementary", { name: "Nastavení cookies" });
  await expect(banner).toBeVisible();
  expect(analytics).toEqual([]);
  await banner.getByRole("button", { name: "Pouze nezbytné" }).click();
  await page.reload();
  await expect(banner).toHaveCount(0);
  expect(analytics).toEqual([]);
  await page
    .getByRole("button", { name: "Nastavení cookies", exact: true })
    .click();
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: "Povolit analytiku" }).click();
  await expect(banner).toHaveCount(0);
  const preference = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("vantuch_cookie_consent_v1")!),
  );
  expect(preference.choice).toBe("accepted");
  await page
    .getByRole("button", { name: "Nastavení cookies", exact: true })
    .click();
  await banner.getByRole("button", { name: "Pouze nezbytné" }).click();
  await expect(banner).toHaveCount(0);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("vantuch_cookie_consent_v1")!).choice,
      ),
    )
    .toBe("rejected");
});
