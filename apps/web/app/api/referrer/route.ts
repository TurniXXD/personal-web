import { apiErrorResponse } from "@/lib/api/error-response";
import { readReferralToken, verifyReferralToken } from "@/lib/referrals/token";
import {
  configuredTwenty,
  twentyErrorContext,
  twentyErrorTags,
} from "@/lib/integrations/twenty";

const endpoint = "referrer";

/**
 * Confirms a referral token from the visitor's `?ref` link. The token arrives
 * in the request body (never a cookie or query string) and is only verified.
 */
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const token = readReferralToken(await request.json().catch(() => null));
  if (!token) return Response.json({ referralApplied: false }, { headers });
  const secret = process.env.TWENTY_REFERRAL_SECRET;
  const client = configuredTwenty();
  if (!secret || !client)
    return apiErrorResponse({
      body: { referralApplied: false, message: "notConfigured" },
      status: 503,
      code: "not_configured",
      endpoint,
      message: "Referrer lookup is not configured",
      context: {
        hasReferralSecret: Boolean(secret),
        hasTwentyClient: Boolean(client),
      },
      headers,
    });
  const id = verifyReferralToken(token, secret);
  if (!id) {
    return apiErrorResponse({
      body: { referralApplied: false, message: "invalidReferral" },
      status: 400,
      code: "invalid_referral",
      endpoint,
      message: "Referrer token is invalid",
      headers,
    });
  }
  try {
    const person = await client.findPersonById(id);
    const email = person?.emails?.primaryEmail;
    if (!email) {
      return apiErrorResponse({
        body: { referralApplied: false, message: "invalidReferral" },
        status: 404,
        code: "referrer_not_found",
        endpoint,
        message: "Referrer was not found",
        headers,
      });
    }
    return Response.json({ referralApplied: true }, { headers });
  } catch (error) {
    return apiErrorResponse({
      body: { referralApplied: false, message: "lookupFailed" },
      status: 502,
      code: "lookup_failed",
      endpoint,
      message: "Twenty referrer lookup failed",
      error,
      context: twentyErrorContext(error),
      tags: twentyErrorTags(error),
      headers,
    });
  }
}
