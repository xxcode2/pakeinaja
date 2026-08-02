import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const cookie = req.cookies.get(SESSION_COOKIE)?.value;
    if (!cookie || cookie !== process.env.ADMIN_PASSWORD) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
