import type {
  ContactInput,
  ContactRequestContext,
} from "@/lib/contact/submission";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import { createHash } from "node:crypto";

type RecordData = { id: string; [key: string]: unknown };
type Phones = {
  primaryPhoneNumber: string;
  primaryPhoneCountryCode: string;
  primaryPhoneCallingCode: string;
  additionalPhones: string[];
};
type Person = RecordData & {
  name?: { firstName?: string; lastName?: string };
  emails?: { primaryEmail?: string };
  phones?: Partial<Phones>;
};
type CloudflareAccessCredentials = {
  clientId: string;
  clientSecret: string;
};

export type TwentyRequestDiagnostic = {
  method: string;
  resource: string;
  baseOrigin: string;
  requestPath: string;
  responseOrigin: string;
  responsePath: string;
  status: number;
  statusText: string;
  responseBody: string;
  responseHeaders: Record<string, string>;
  responseContentType: string;
  responseServer: string;
  cloudflareRay: string;
  cloudflareMitigation: string;
  cloudflareCacheStatus: string;
  apiKeyFingerprint: string;
  apiKeyLength: number;
  cloudflareAccessHeadersSent: boolean;
  cloudflareAccessClientIdFingerprint: string;
  cloudflareAccessClientIdLength: number;
  cloudflareAccessClientSecretLength: number;
};

export class TwentyRequestError extends Error {
  constructor(
    message: string,
    readonly diagnostic: TwentyRequestDiagnostic,
  ) {
    super(message);
    this.name = "TwentyRequestError";
  }
}

export function twentyErrorContext(
  error: unknown,
): Record<string, unknown> | undefined {
  return error instanceof TwentyRequestError
    ? { twenty: error.diagnostic }
    : undefined;
}

const equals = (field: string, value: string) => `${field}[eq]:${value}`;
const and = (...filters: string[]) => `and(${filters.join(",")})`;

const redactDiagnosticText = (value: string, secrets: string[] = []): string =>
  secrets
    .filter(Boolean)
    .reduce((result, secret) => result.replaceAll(secret, "[redacted]"), value)
    .replaceAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
    .replaceAll(/\+?\d[\d\s().-]{5,}\d/g, "[redacted-phone]")
    .replaceAll(/(bearer\s+)[^\s"',}]+/gi, "$1[redacted]")
    .slice(0, 2_000);

const diagnosticHeaders = (
  headers: Headers,
  secrets: string[],
): Record<string, string> =>
  Object.fromEntries(
    [
      "content-type",
      "cf-cache-status",
      "cf-mitigated",
      "cf-ray",
      "server",
      "x-request-id",
      "x-correlation-id",
      "traceparent",
      "www-authenticate",
    ]
      .map(
        (name) =>
          [
            name,
            headers.get(name)
              ? redactDiagnosticText(headers.get(name)!, secrets)
              : null,
          ] as const,
      )
      .filter((entry): entry is readonly [string, string] => Boolean(entry[1])),
  );

function toTwentyPhones(value: string): Phones | undefined {
  const input = value.trim();
  if (!input) return undefined;

  const parsed = parsePhoneNumberFromString(input, "CZ");
  if (parsed?.isPossible())
    return {
      primaryPhoneNumber: parsed.nationalNumber,
      primaryPhoneCountryCode: parsed.country ?? "",
      primaryPhoneCallingCode: `+${parsed.countryCallingCode}`,
      additionalPhones: [],
    };

  return {
    primaryPhoneNumber: input,
    primaryPhoneCountryCode: "",
    primaryPhoneCallingCode: "",
    additionalPhones: [],
  };
}

export class TwentyClient {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly fetcher: typeof fetch = fetch,
    private readonly cloudflareAccess?: CloudflareAccessCredentials,
  ) {}

  private async request(
    path: string,
    init: RequestInit = {},
  ): Promise<unknown> {
    const method = init.method ?? "GET";
    const resource = path.split("?")[0];
    const requestUrl = `${this.baseUrl.replace(/\/$/, "")}/rest/${path}`;
    const response = await this.fetcher(requestUrl, {
      ...init,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${this.apiKey}`,
        ...(this.cloudflareAccess
          ? {
              "CF-Access-Client-Id": this.cloudflareAccess.clientId,
              "CF-Access-Client-Secret": this.cloudflareAccess.clientSecret,
            }
          : {}),
        ...(init.body ? { "content-type": "application/json" } : {}),
      },
      signal: init.signal ?? AbortSignal.timeout(20_000),
      cache: "no-store",
    });
    if (!response.ok) {
      const parsedRequestUrl = new URL(requestUrl);
      const parsedResponseUrl = response.url ? new URL(response.url) : null;
      let responseBody = "";
      const secrets = [
        this.apiKey,
        this.cloudflareAccess?.clientId ?? "",
        this.cloudflareAccess?.clientSecret ?? "",
      ];
      try {
        responseBody = redactDiagnosticText(await response.text(), secrets);
      } catch {
        responseBody = "[unavailable]";
      }

      throw new TwentyRequestError(
        `Twenty REST ${method} ${resource} returned HTTP ${response.status}`,
        {
          method,
          resource,
          baseOrigin: parsedRequestUrl.origin,
          requestPath: parsedRequestUrl.pathname,
          responseOrigin: parsedResponseUrl?.origin ?? "",
          responsePath: parsedResponseUrl?.pathname ?? "",
          status: response.status,
          statusText: response.statusText,
          responseBody,
          responseHeaders: diagnosticHeaders(response.headers, secrets),
          responseContentType: response.headers.get("content-type") ?? "",
          responseServer: response.headers.get("server") ?? "",
          cloudflareRay: response.headers.get("cf-ray") ?? "",
          cloudflareMitigation: response.headers.get("cf-mitigated") ?? "",
          cloudflareCacheStatus: response.headers.get("cf-cache-status") ?? "",
          apiKeyFingerprint: createHash("sha256")
            .update(this.apiKey)
            .digest("hex")
            .slice(0, 12),
          apiKeyLength: this.apiKey.length,
          cloudflareAccessHeadersSent: Boolean(this.cloudflareAccess),
          cloudflareAccessClientIdFingerprint: this.cloudflareAccess
            ? createHash("sha256")
                .update(this.cloudflareAccess.clientId)
                .digest("hex")
                .slice(0, 12)
            : "",
          cloudflareAccessClientIdLength:
            this.cloudflareAccess?.clientId.length ?? 0,
          cloudflareAccessClientSecretLength:
            this.cloudflareAccess?.clientSecret.length ?? 0,
        },
      );
    }
    return response.status === 204 ? {} : response.json();
  }

  async find(plural: string, filter: string): Promise<RecordData | undefined> {
    const query = new URLSearchParams({ filter, limit: "1" });
    const payload = (await this.request(`${plural}?${query}`)) as Record<
      string,
      unknown
    >;
    const data = payload.data as
      Record<string, unknown> | unknown[] | undefined;
    const records = Array.isArray(data)
      ? data
      : Array.isArray(payload[plural])
        ? payload[plural]
        : data && !Array.isArray(data)
          ? data[plural]
          : undefined;
    const first = Array.isArray(records) ? records[0] : undefined;
    return first && typeof first === "object" && typeof first.id === "string"
      ? (first as RecordData)
      : undefined;
  }

  async create(
    plural: string,
    singular: string,
    value: Record<string, unknown>,
  ): Promise<RecordData> {
    const payload = (await this.request(plural, {
      method: "POST",
      body: JSON.stringify(value),
    })) as Record<string, unknown>;
    const data = payload.data as Record<string, unknown> | undefined;
    const candidate =
      data?.[`create${singular[0].toUpperCase()}${singular.slice(1)}`] ??
      data?.[singular] ??
      data ??
      payload[singular] ??
      payload;
    if (
      !candidate ||
      typeof candidate !== "object" ||
      typeof (candidate as RecordData).id !== "string"
    )
      throw new Error(`Twenty ${singular} response did not include an ID`);
    return candidate as RecordData;
  }

  async update(
    plural: string,
    id: string,
    value: Record<string, unknown>,
  ): Promise<void> {
    await this.request(`${plural}/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(value),
    });
  }

  async findPersonById(id: string): Promise<Person | undefined> {
    return this.find("people", equals("id", id)) as Promise<Person | undefined>;
  }

  async findPersonByEmail(email: string): Promise<Person | undefined> {
    return this.find(
      "people",
      equals("emails.primaryEmail", email.toLowerCase()),
    ) as Promise<Person | undefined>;
  }

  async ensurePerson(name: string, email: string, phone = ""): Promise<Person> {
    const normalizedEmail = email.toLowerCase();
    const phones = toTwentyPhones(phone);
    const existing = await this.findPersonByEmail(normalizedEmail);
    if (existing) {
      if (phones && !existing.phones?.primaryPhoneNumber) {
        await this.update("people", existing.id, { phones });
        return { ...existing, phones };
      }
      return existing;
    }

    const parts = name.trim().split(/\s+/);
    return this.create("people", "person", {
      name: { firstName: parts[0], lastName: parts.slice(1).join(" ") },
      emails: { primaryEmail: normalizedEmail, additionalEmails: [] },
      ...(phones ? { phones } : {}),
      ...(process.env.TWENTY_APP_FIELDS_ENABLED === "true"
        ? { personType: "LEAD", leadSource: "WEBSITE_CONTACT" }
        : {}),
    }) as Promise<Person>;
  }

  async saveContact(
    input: ContactInput,
    submissionId: string,
    referrer?: Person,
    requestContext?: ContactRequestContext,
  ): Promise<void> {
    const email = input.email.toLowerCase();
    const person = await this.ensurePerson(input.name, email, input.phone);

    const title = `[web-contact:${submissionId}] ${input.name.replaceAll(/[\r\n]+/g, " ")}`;
    let note = await this.find("notes", equals("title", title));
    if (!note) {
      const body = [
        `Name: ${input.name}`,
        `Email: ${email}`,
        `Phone: ${input.phone || "—"}`,
        `Source: ${referrer ? "Referral link" : "Website contact"}`,
        `Request type: ${requestContext?.type ?? "general"}`,
        `Requested service: ${requestContext?.subject || "—"}`,
        `Source page: ${requestContext?.sourcePath || "—"}`,
        `Referrer email: ${referrer?.emails?.primaryEmail || "—"}`,
        `Referrer Twenty ID: ${referrer?.id || "—"}`,
        "",
        "Message:",
        input.message,
      ].join("\n");
      note = await this.create("notes", "note", {
        title,
        bodyV2: { markdown: body, blocknote: "" },
      });
    }
    const noteTarget = await this.find(
      "noteTargets",
      and(equals("noteId", note.id), equals("targetPersonId", person.id)),
    );
    if (!noteTarget)
      await this.create("noteTargets", "noteTarget", {
        noteId: note.id,
        targetPersonId: person.id,
      });

    if (
      referrer &&
      referrer.id !== person.id &&
      process.env.TWENTY_APP_FIELDS_ENABLED === "true"
    ) {
      const filter = and(
        equals("referrerId", referrer.id),
        equals("referredPersonId", person.id),
      );
      const existing = await this.find("salesReferrals", filter);
      if (!existing)
        await this.create("salesReferrals", "salesReferral", {
          name: `Referral:${referrer.id}:${person.id}`,
          referrerId: referrer.id,
          referredPersonId: person.id,
          commissionType: "PERCENTAGE",
          status: "PENDING",
        });
    }
  }
}

export function configuredTwenty(): TwentyClient | null {
  const baseUrl = process.env.TWENTY_BASE_URL?.trim();
  const apiKey = process.env.TWENTY_API_KEY?.trim();
  const clientId = process.env.TWENTY_CF_ACCESS_CLIENT_ID?.trim();
  const clientSecret = process.env.TWENTY_CF_ACCESS_CLIENT_SECRET?.trim();
  return baseUrl && apiKey && clientId && clientSecret
    ? new TwentyClient(baseUrl, apiKey, fetch, { clientId, clientSecret })
    : null;
}

export type TwentyPerson = Person;
