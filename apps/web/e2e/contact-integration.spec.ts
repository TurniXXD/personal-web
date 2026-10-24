import { expect, test } from "@playwright/test";
import {
  createReferralToken,
  verifyReferralToken,
} from "../lib/referral-token";
import {
  readContactRequestContext,
  validateContactInput,
} from "../lib/contact-submission";
import { validateReferralRequest } from "../lib/referral-request";
import { TwentyClient } from "../lib/twenty";

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
              emails: { primaryEmail: "contact@vantuch.dev" },
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
      email: "contact@vantuch.dev",
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
