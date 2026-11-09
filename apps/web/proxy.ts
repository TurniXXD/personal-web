import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);
const legacyReferralCookie = "vantuch_referral";

export default function proxy(request: NextRequest) {
  // Public pages have no Server Actions. Forms submit to /api/*, which the
  // matcher excludes; unexpected page POSTs should not reach the RSC handler.
  if (request.method === "POST") {
    return new NextResponse(null, {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  let response: NextResponse;
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/cs";
    response = NextResponse.rewrite(url);
  } else {
    response = intlMiddleware(request);
  }
  // Referral attribution no longer stores anything on the device (the token
  // travels with the contact form); remove the cookie earlier versions set.
  if (request.cookies.has(legacyReferralCookie)) {
    response.cookies.delete(legacyReferralCookie);
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
