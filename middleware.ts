import NextAuth from "next-auth";

import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  const pathname = req.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/campaign",
  ];

  const requiresAuth =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

  if (requiresAuth && !isLoggedIn) {
    return Response.redirect(
      new URL("/login", req.url)
    );
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/campaign/:path*",
  ],
};