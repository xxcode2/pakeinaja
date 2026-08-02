import { NextResponse } from "next/server";
import { checkPassword, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req) {
  const { password } = await req.json();

  if (!checkPassword(password)) {
    return NextResponse.json(
      { error: "Password salah." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });
  return res;
}
