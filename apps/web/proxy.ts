import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Public pages have no Server Actions. Forms submit to /api/*, which the
  // matcher excludes; unexpected page POSTs should not reach the RSC handler.
  if (request.method === "POST") {
    return new NextResponse(null, {
      status: 405,
      headers: { Allow: "GET, HEAD" },
    });
  }

  const token = request.nextUrl.searchParams.get("ref");
  let response: NextResponse;
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/cs";
    response = NextResponse.rewrite(url);
  } else {
    response = intlMiddleware(request);
  }
  if (token !== null) {
    response.cookies.set("vantuch_referral", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: token && token.length <= 128 ? 60 * 60 * 24 * 30 : 0,
    });
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
