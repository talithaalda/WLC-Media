// middleware.js
import { NextResponse } from "next/server";
export function middleware(req) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  };

  console.log(requestForNextAuth);
  if (requestForNextAuth) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}
export const config = {
  matcher: "/dashboard/:path*",
};
