import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidEmail } from "./lib/utils/auth";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/confirm") {
    const email = request.nextUrl.searchParams.get("email");
    const password = request.nextUrl.searchParams.get("password");
    const confirmToken = request.nextUrl.searchParams.get("token");

    if (!email || !password || !isValidEmail(email) || !confirmToken) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
