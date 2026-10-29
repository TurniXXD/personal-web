import { expect, test } from "@playwright/test";
import {
  createReferralToken,
  verifyReferralToken,
} from "../lib/referrals/token";
import {
  readContactRequestContext,
  validateContactInput,
} from "../lib/contact/submission";
import { validateReferralRequest } from "../lib/referrals/request";
import {
  TwentyClient,
  TwentyRequestError,
  twentyErrorContext,
} from "../lib/integrations/twenty";

test("referral links reject changed person IDs and signatures", () => {
  const id = "e191876c-7043-4e42-b644-234dbd43f43d";
  const otherId = "f191876c-7043-4e42-b644-234dbd43f43d";
  const secret = "this-is-a-test-signing-secret-over-thirty-two-chars";
  const token = createReferralToken(id, secret);
  expect(verifyReferralToken(token, secret)).toBe(id);
  expect(verifyReferralToken(token.replace(id, otherId), secret)).toBeNull();
  expect(verifyReferralToken(token, `${secret}-different`)).toBeNull();
});

test("contact validation ignores manually supplied attribution", () => {
  const { input, errors } = validateContactInput({
    name: "Anna",
    email: "anna@example.com",
    message: "Website project",
    source: "referral",
    referrerEmail: "someone@example.com",
  });
  expect(errors).toEqual({});
  expect(input).not.toHaveProperty("source");
  expect(input).not.toHaveProperty("referrerEmail");
});

test("contact request context is structured and bounded", () => {
  expect(
    readContactRequestContext({
      request: {
        type: "service",
        subject: "Audit AI aplikací\nInjected header",
        sourcePath: "/sluzby/audit-ai-aplikaci",
      },
    }),
  ).toEqual({
    type: "service",
    subject: "Audit AI aplikací Injected header",
    sourcePath: "/sluzby/audit-ai-aplikaci",
  });
  expect(
    readContactRequestContext({
      request: { type: "invalid", sourcePath: "https://attacker.example" },
    }),
  ).toEqual({ type: "general", subject: "", sourcePath: "" });
});

test("referral request validation keeps link and partnership purposes separate", () => {
  const link = validateReferralRequest({
    intent: "link",
    locale: "cs",
    name: "Jan Doporučitel",
    email: "JAN@example.com",
  });
  expect(link.errors).toEqual({});
  expect(link.input).toMatchObject({
    intent: "link",
    locale: "cs",
    email: "jan@example.com",
  });

  const partnership = validateReferralRequest({
    intent: "partnership",
    locale: "en",
    name: "Eva Partner",
    email: "eva@example.com",
    company: "Studio Eva",
  });
  expect(partnership.errors).toEqual({ message: "required" });
});

test("contact is saved to Twenty with person, note and SalesReferral", async () => {
  const previous = process.env.TWENTY_APP_FIELDS_ENABLED;
  process.env.TWENTY_APP_FIELDS_ENABLED = "true";
  const requests: {
    path: string;
    method: string;
    body?: Record<string, unknown>;
  }[] = [];
  const fetcher = (async (
    input: string | URL | Request,
    init?: RequestInit,
  ) => {
    const url = new URL(String(input));
    const path = url.pathname.replace("/rest/", "");
    const method = init?.method ?? "GET";
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    requests.push({ path, method, body });
    if (method === "GET") return Response.json({ data: { [path]: [] } });
    const singular = {
      people: "person",
      notes: "note",
      noteTargets: "noteTarget",
      salesReferrals: "salesReferral",
    }[path];
    return Response.json({
      data: { [singular ?? path]: { id: `${path}-id` } },
    });
  }) as typeof fetch;
  try {
    const client = new TwentyClient(
      "https://twenty.example",
      "test-key",
      fetcher,
    );
    await client.saveContact(
      {
        name: "Anna Novak",
        email: "anna@example.com",
        phone: "+420 735 023 812",
        message: "I need a website",
      },
      "a8bcc8f8-f7c2-4c74-9709-f85c06a67227",
      { id: "referrer-id", emails: { primaryEmail: "jan@example.com" } },
      {
        type: "service",
        subject: "Websites and applications",
        sourcePath: "/en/sluzby/webove-aplikace",
      },
    );
    expect(
      requests
        .filter((request) => request.method === "POST")
        .map((request) => request.path),
    ).toEqual(["people", "notes", "noteTargets", "salesReferrals"]);
    expect(
      requests.find(
        (request) => request.path === "people" && request.method === "POST",
      )?.body,
    ).toMatchObject({
      emails: { primaryEmail: "anna@example.com" },
      phones: {
        primaryPhoneNumber: "735023812",
        primaryPhoneCountryCode: "CZ",
        primaryPhoneCallingCode: "+420",
        additionalPhones: [],
      },
      personType: "LEAD",
      leadSource: "WEBSITE_CONTACT",
    });
    expect(
      requests.find(
        (request) => request.path === "notes" && request.method === "POST",
      )?.body,
    ).toMatchObject({
      bodyV2: {
        markdown: expect.stringMatching(
          /Request type: service[\s\S]*Requested service: Websites and applications[\s\S]*Source page: \/en\/sluzby\/webove-aplikace[\s\S]*Referrer email: jan@example.com/,
        ),
      },
    });
    expect(
      requests.find(
        (request) =>
          request.path === "salesReferrals" && request.method === "POST",
      )?.body,
    ).toMatchObject({
      referrerId: "referrer-id",
      referredPersonId: "people-id",
      status: "PENDING",
    });
  } finally {
    if (previous === undefined) delete process.env.TWENTY_APP_FIELDS_ENABLED;
    else process.env.TWENTY_APP_FIELDS_ENABLED = previous;
  }
});

test("contact fills a missing phone on an existing Twenty person", async () => {
  const requests: {
    path: string;
    method: string;
    body?: Record<string, unknown>;
  }[] = [];
  const fetcher = (async (
    input: string | URL | Request,
    init?: RequestInit,
  ) => {
    const url = new URL(String(input));
    const path = url.pathname.replace("/rest/", "");
    const method = init?.method ?? "GET";
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    requests.push({ path, method, body });

    if (method === "PATCH") return new Response(null, { status: 204 });
    if (method === "GET" && path === "people")
      return Response.json({
        data: {
          people: [
            {
              id: "existing-person-id",
              emails: { primaryEmail: "hello@vantuch.dev" },
              phones: { primaryPhoneNumber: "" },
            },
          ],
        },
      });
    if (method === "GET") return Response.json({ data: { [path]: [] } });

    const singular = { notes: "note", noteTargets: "noteTarget" }[path];
    return Response.json({
      data: { [singular ?? path]: { id: `${path}-id` } },
    });
  }) as typeof fetch;

  const client = new TwentyClient(
    "https://twenty.example",
    "test-key",
    fetcher,
  );
  await client.saveContact(
    {
      name: "Jakub Vantuch",
      email: "hello@vantuch.dev",
      phone: "+420735023812",
      message: "Test",
    },
    "53abb452-ce0d-4577-998c-59aeebaaf230",
  );

  expect(
    requests.find(
      (request) =>
        request.path === "people/existing-person-id" &&
        request.method === "PATCH",
    )?.body,
  ).toEqual({
    phones: {
      primaryPhoneNumber: "735023812",
      primaryPhoneCountryCode: "CZ",
      primaryPhoneCallingCode: "+420",
      additionalPhones: [],
    },
  });
  expect(
    requests.some(
      (request) => request.path === "people" && request.method === "POST",
    ),
  ).toBe(false);
});

test("Twenty authenticates through the protected Cloudflare Access hostname", async () => {
  const requestHeaders = new Headers();
  const fetcher = (async (
    _input: string | URL | Request,
    init?: RequestInit,
  ) => {
    new Headers(init?.headers).forEach((value, name) => {
      requestHeaders.set(name, value);
    });
    return Response.json({ data: { people: [] } });
  }) as typeof fetch;
  const client = new TwentyClient(
    "https://twenty.example",
    "twenty-api-key",
    fetcher,
    {
      clientId: "access-client-id",
      clientSecret: "access-client-secret",
    },
  );

  await client.findPersonByEmail("contact@example.com");

  expect(requestHeaders.get("authorization")).toBe("Bearer twenty-api-key");
  expect(requestHeaders.get("cf-access-client-id")).toBe("access-client-id");
  expect(requestHeaders.get("cf-access-client-secret")).toBe(
    "access-client-secret",
  );
});

test("Twenty failures expose useful diagnostics without contact data or credentials", async () => {
  const apiKey = "super-secret-key";
  const accessClientId = "access-client-id";
  const accessClientSecret = "access-client-secret";
  const fetcher = (async () =>
    new Response(
      JSON.stringify({
        statusCode: 403,
        message:
          "Forbidden for private@example.com, +420 735 023 812 and Bearer leaked-token",
        echoedCredential: apiKey,
        echoedAccessClientId: accessClientId,
        echoedAccessClientSecret: accessClientSecret,
      }),
      {
        status: 403,
        statusText: "Forbidden",
        headers: {
          "content-type": "application/json",
          "cf-cache-status": "DYNAMIC",
          "cf-mitigated": "challenge",
          "x-request-id": "req-123",
          "cf-ray": "ray-456",
        },
      },
    )) as typeof fetch;
  const client = new TwentyClient(
    "https://twenty.example/api-path",
    apiKey,
    fetcher,
    { clientId: accessClientId, clientSecret: accessClientSecret },
  );

  let failure: unknown;
  try {
    await client.findPersonByEmail("private@example.com");
  } catch (error) {
    failure = error;
  }

  expect(failure).toBeInstanceOf(TwentyRequestError);
  expect(twentyErrorContext(failure)).toMatchObject({
    twenty: {
      method: "GET",
      resource: "people",
      baseOrigin: "https://twenty.example",
      requestPath: "/api-path/rest/people",
      responseOrigin: "",
      responsePath: "",
      status: 403,
      statusText: "Forbidden",
      responseHeaders: {
        "content-type": "application/json",
        "cf-cache-status": "DYNAMIC",
        "cf-mitigated": "challenge",
        "x-request-id": "req-123",
        "cf-ray": "ray-456",
      },
      apiKeyFingerprint: expect.stringMatching(/^[a-f0-9]{12}$/),
      apiKeyLength: apiKey.length,
      cloudflareAccessHeadersSent: true,
      cloudflareAccessClientIdFingerprint:
        expect.stringMatching(/^[a-f0-9]{12}$/),
      cloudflareAccessClientIdLength: accessClientId.length,
      cloudflareAccessClientSecretLength: accessClientSecret.length,
    },
  });

  const serialized = JSON.stringify(twentyErrorContext(failure));
  expect(serialized).toContain("[redacted-email]");
  expect(serialized).toContain("[redacted-phone]");
  expect(serialized).not.toContain(apiKey);
  expect(serialized).not.toContain(accessClientId);
  expect(serialized).not.toContain(accessClientSecret);
  expect(serialized).not.toContain("private@example.com");
  expect(serialized).not.toContain("+420");
  expect(serialized).not.toContain("leaked-token");
});
