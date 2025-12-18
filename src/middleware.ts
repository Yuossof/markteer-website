import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Routes
const protectedRoutes = ["/dashboard", "/profile", "/account"];
const adminRoutes = ["/admin"];
const publicRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("authToken")?.value;
    const { pathname } = request.nextUrl;

    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    const isAdminRoute = adminRoutes.some(route =>
        pathname.startsWith(route)
    );

    const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route)
    );

    if ((isProtectedRoute || isAdminRoute) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token) {

        try {
            const { payload } = await jwtVerify(token, secret);
            const user = payload as { isAdmin?: boolean };

            if (isAdminRoute && !user.isAdmin) {
                return NextResponse.redirect(new URL("/", request.url));
            }

            if (isPublicRoute) {
                return NextResponse.redirect(new URL("/", request.url));
            }

        } catch (err) {
            const res = NextResponse.redirect(new URL("/login", request.url));
            res.cookies.delete("authToken");
            return res;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/dashboard/:path*",
        "/profile/:path*",
        "/account/:path*",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/api/:path*",
    ],
};
