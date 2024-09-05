// middleware.js
import { NextResponse } from "next/server";
import { parse } from "url";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_SECRET_KEY,
  });
  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
