import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware çalıştı, yol:", req.nextUrl.pathname);
    const { token } = req.nextauth;
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    if (req.nextUrl.pathname.startsWith("/admin")) {
      console.log("Admin sayfası erişimi, role:", token?.role);
      if (token?.role !== "admin") {
        console.log("Yetkisiz erişim engellendi");
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
    
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
