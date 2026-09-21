import type { NextAuthConfig } from 'next-auth';

// Edge-safe config shared with middleware. No database or bcrypt here.
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const path = nextUrl.pathname;

      // Protect the meeting management (admin) routes.
      const isProtected =
        path === '/meetings/new' ||
        (path.startsWith('/meetings/') && path.endsWith('/edit'));

      if (isProtected) {
        return isLoggedIn; // unauthenticated → redirected to signIn page
      }
      return true;
    },
  },
  providers: [], // real providers are added in auth.ts (Node runtime)
} satisfies NextAuthConfig;
