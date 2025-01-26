import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
const protectedRoutes = ["/", "/create", "/edit"];
const publicRoutes = ["/signin", "/signup"];

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path === route);
  const isPublicRoute = publicRoutes.some((route) => path === route);
  const cookieStore = await cookies();

  if (!isProtectedRoute && !isPublicRoute) {
    return NextResponse.next();
  }

  const sessionToken = cookieStore.get("session");

  if (isPublicRoute && sessionToken) {
    const response = await fetch(
      new URL("/api/auth/session/validate", request.url),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: sessionToken }),
      }
    );

    if (response.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isProtectedRoute) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const response = await fetch(
      new URL("/api/auth/session/validate", request.url),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: sessionToken }),
      }
    );

    if (!response.ok) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}
