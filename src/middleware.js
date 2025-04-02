import { NextResponse } from "next/server";

// Middleware to check if user is authenticated
export function middleware(request) {
    const token = request.cookies.get("token"); // Get token from cookies
    const url = request.nextUrl.clone(); // Clone the URL for redirection

    // Protected routes that require authentication (like /account, /about)
    const protectedRoutes = ["/account", "/about"];
    
    // If no token and user tries to access a protected route
    if (!token && protectedRoutes.some((route) => url.pathname.startsWith(route))) {
        url.pathname = "/login"; // Redirect to login page
        return NextResponse.redirect(url);
    }

    // If token exists but user tries to access login/register page, redirect to home page
    if (token && (url.pathname === "/login" || url.pathname === "/register")) {
        url.pathname = "/"; // Redirect to home page or dashboard
        return NextResponse.redirect(url);
    }

    // Continue to the requested page if everything is fine
    return NextResponse.next();
}

// Apply middleware to all routes, but can limit this to login/register as needed
export const config = {
    matcher: ["/account", "/about", "/login", "/register"], // Protect these routes
};
