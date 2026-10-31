import { cookies } from "next/headers";
import { apiErrorResponse } from "@/lib/api/error-response";
import { referralCookie, verifyReferralToken } from "@/lib/referrals/token";
import {
  configuredTwenty,
  twentyErrorContext,
  twentyErrorTags,
} from "@/lib/integrations/twenty";

const endpoint = "referrer";

export async function GET() {
  const token = (await cookies()).get(referralCookie)?.value;
  const headers = { "Cache-Control": "no-store" };
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
    const response = apiErrorResponse({
      body: { referralApplied: false, message: "invalidReferral" },
      status: 400,
      code: "invalid_referral",
      endpoint,
      message: "Referrer token is invalid",
      headers,
    });
    response.headers.append(
      "Set-Cookie",
      `${referralCookie}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
    );
    return response;
  }
  try {
    const person = await client.findPersonById(id);
    const email = person?.emails?.primaryEmail;
    if (!email) {
      const response = apiErrorResponse({
        body: { referralApplied: false, message: "invalidReferral" },
        status: 404,
        code: "referrer_not_found",
        endpoint,
        message: "Referrer was not found",
        headers,
      });
      response.headers.append(
        "Set-Cookie",
        `${referralCookie}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
      );
      return response;
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
