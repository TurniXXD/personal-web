import { verifyReferralToken } from "@/lib/referrals/token";

export type ContactReferrer = {
  id: string;
  emails?: { primaryEmail?: string };
};

export type ContactReferralIssue =
  "notConfigured" | "invalidToken" | "notFound" | "lookupFailed";

type ResolveContactReferralOptions = {
  token?: string;
  secret?: string;
  findPersonById: (id: string) => Promise<ContactReferrer | undefined>;
};

type ContactReferralResult = {
  referrer?: ContactReferrer;
  issue?: ContactReferralIssue;
  error?: unknown;
};

/** Referral attribution is optional and must never block a contact request. */
export async function resolveContactReferral({
  token,
  secret,
  findPersonById,
}: ResolveContactReferralOptions): Promise<ContactReferralResult> {
  if (!token) return {};
  if (!secret) return { issue: "notConfigured" };

  const referrerId = verifyReferralToken(token, secret);
  if (!referrerId) return { issue: "invalidToken" };

  try {
    const referrer = await findPersonById(referrerId);
    if (!referrer?.emails?.primaryEmail) return { issue: "notFound" };
    return { referrer };
  } catch (error) {
    return { issue: "lookupFailed", error };
  }
}
