import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;

    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminPage && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // sadece giriş yapmış kullanıcılar geçebilir
    },
    pages: {
      signIn: "/login", // giriş yapmamışsa yönlendir
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // korunan tüm route'lar burada
};
