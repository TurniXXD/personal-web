import type { ContactInput } from "@/lib/contact-submission";

type RecordData = { id: string; [key: string]: unknown };
type Person = RecordData & {
  name?: { firstName?: string; lastName?: string };
  emails?: { primaryEmail?: string };
};

const equals = (field: string, value: string) => `${field}[eq]:${value}`;
const and = (...filters: string[]) => `and(${filters.join(",")})`;

export class TwentyClient {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly fetcher: typeof fetch = fetch,
  ) {}

  private async request(
    path: string,
    init: RequestInit = {},
  ): Promise<unknown> {
    const response = await this.fetcher(
      `${this.baseUrl.replace(/\/$/, "")}/rest/${path}`,
      {
        ...init,
        headers: {
          accept: "application/json",
          authorization: `Bearer ${this.apiKey}`,
          ...(init.body ? { "content-type": "application/json" } : {}),
        },
        signal: init.signal ?? AbortSignal.timeout(20_000),
        cache: "no-store",
      },
    );
    if (!response.ok)
      throw new Error(
        `Twenty REST ${init.method ?? "GET"} ${path.split("?")[0]} returned HTTP ${response.status}`,
      );
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

  async findPersonById(id: string): Promise<Person | undefined> {
    return this.find("people", equals("id", id)) as Promise<Person | undefined>;
  }

  async findPersonByEmail(email: string): Promise<Person | undefined> {
    return this.find(
      "people",
      equals("emails.primaryEmail", email.toLowerCase()),
    ) as Promise<Person | undefined>;
  }

  async ensurePerson(name: string, email: string): Promise<Person> {
    const normalizedEmail = email.toLowerCase();
    const existing = await this.findPersonByEmail(normalizedEmail);
    if (existing) return existing;

    const parts = name.trim().split(/\s+/);
    return this.create("people", "person", {
      name: { firstName: parts[0], lastName: parts.slice(1).join(" ") },
      emails: { primaryEmail: normalizedEmail, additionalEmails: [] },
      ...(process.env.TWENTY_APP_FIELDS_ENABLED === "true"
        ? { personType: "LEAD", leadSource: "WEBSITE_CONTACT" }
        : {}),
    }) as Promise<Person>;
  }

  async saveContact(
    input: ContactInput,
    submissionId: string,
    referrer?: Person,
  ): Promise<void> {
    const email = input.email.toLowerCase();
    const person = await this.ensurePerson(input.name, email);

    const title = `[web-contact:${submissionId}] ${input.name.replaceAll(/[\r\n]+/g, " ")}`;
    let note = await this.find("notes", equals("title", title));
    if (!note) {
      const body = [
        `Name: ${input.name}`,
        `Email: ${email}`,
        `Phone: ${input.phone || "—"}`,
        `Source: ${referrer ? "Referral link" : "Website contact"}`,
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
  const baseUrl = process.env.TWENTY_BASE_URL;
  const apiKey = process.env.TWENTY_API_KEY;
  return baseUrl && apiKey ? new TwentyClient(baseUrl, apiKey) : null;
}

export type TwentyPerson = Person;
