import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");
//Admin sayfasına erişim kontrolü
    if (isAdminPage && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    // JWT ayarları
    callbacks: {
      authorized: ({ token }) => !!token, 
    },
    pages: {
      signIn: "/login", 
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], 
};
