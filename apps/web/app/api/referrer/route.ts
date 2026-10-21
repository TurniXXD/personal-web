import { cookies } from "next/headers";
import { referralCookie, verifyReferralToken } from "@/lib/referral-token";
import { configuredTwenty } from "@/lib/twenty";

export async function GET() {
  const token = (await cookies()).get(referralCookie)?.value;
  const headers = { "Cache-Control": "no-store" };
  if (!token) return Response.json({ referralApplied: false }, { headers });
  const secret = process.env.TWENTY_REFERRAL_SECRET;
  const client = configuredTwenty();
  if (!secret || !client) return Response.json({ referralApplied: false, message: "notConfigured" }, { status: 503, headers });
  const id = verifyReferralToken(token, secret);
  if (!id) {
    const response = Response.json({ referralApplied: false, message: "invalidReferral" }, { status: 400, headers });
    response.headers.append("Set-Cookie", `${referralCookie}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
    return response;
  }
  try {
    const person = await client.findPersonById(id);
    const email = person?.emails?.primaryEmail;
    if (!email) {
      const response = Response.json({ referralApplied: false, message: "invalidReferral" }, { status: 404, headers });
      response.headers.append("Set-Cookie", `${referralCookie}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`);
      return response;
    }
    return Response.json({ referralApplied: true }, { headers });
  } catch (error) {
    console.error("Twenty referrer lookup failed:", error);
    return Response.json({ referralApplied: false, message: "lookupFailed" }, { status: 502, headers });
  }
}
