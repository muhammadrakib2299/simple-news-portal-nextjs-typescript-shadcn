import type { NextAuthConfig } from "next-auth"

/**
 * Edge-compatible auth config — no Prisma imports here.
 * Used by middleware and as the base for the full auth config.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  providers: [], // Providers are added in auth.ts (server-side only)
  callbacks: {
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const { pathname } = request.nextUrl

      // Protect all admin routes except login
      if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        if (!isLoggedIn) {
          return Response.redirect(new URL("/admin/login", request.nextUrl))
        }
        return true
      }

      // Redirect logged-in users away from login page
      if (pathname === "/admin/login" && isLoggedIn) {
        return Response.redirect(new URL("/admin", request.nextUrl))
      }

      return true
    },
  },
} satisfies NextAuthConfig
