import { NextResponse } from "next/server";
import axios from "axios";
import cookie from 'cookie';
import { getCookie } from "cookies-next";

// Middleware to check if user is authenticated
// export async function middleware(req) {
//     // const token = request.cookies.get("token"); // Get token from cookies
//     // const url = request.nextUrl.clone(); // Clone the URL for redirection

//     // // Protected routes that require authentication (like /account, /about)
//     // const protectedRoutes = ["/account", "/about", "/user-profile", "/user-requests"];

//     // // If no token and user tries to access a protected route
//     // if (!token && protectedRoutes.some((route) => url.pathname.startsWith(route))) {
//     //     url.pathname = "/login"; // Redirect to login page
//     //     return NextResponse.redirect(url);
//     // }

//     // // If token exists but user tries to access login/register page, redirect to home page
//     // if (token && (url.pathname === "/login" || url.pathname === "/register")) {
//     //     url.pathname = "/"; // Redirect to home page or dashboard
//     //     return NextResponse.redirect(url);
//     // }

//     // return NextResponse.next();


// }
export async function middleware(req) {
    // Get the cookies from the request
    const cookies = cookie.parse(req.headers.get('cookie') || '');
    const token = cookies.token || ''; // Replace 'token' with your actual cookie name

    // Check if the user is trying to access the login or register page
    const isLoginOrRegisterPage = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register-email';

    // If the user has a token and is trying to access login or register page, redirect them to the homepage
    if (token && isLoginOrRegisterPage) {
        return NextResponse.redirect(new URL('/', req.url));  // Or '/dashboard' if that’s where you want to redirect
    }

    // If there is no token and the user is trying to access a protected page, redirect them to the login page
    const isProtectedPage = req.nextUrl.pathname.startsWith('/account') ||
        req.nextUrl.pathname.startsWith('/user-profile') ||
        req.nextUrl.pathname.startsWith('/user-requests') ||
        req.nextUrl.pathname.startsWith('/about'); // Add more protected routes as needed

    if (!token && isProtectedPage) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If the token exists, verify it with the backend
    if (token) {
        try {
            const response = await axios.get('http://localhost:5000/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token for verification
                },
            });

            if (!response.data.isAuthenticated) {
                return NextResponse.redirect(new URL('/login', req.url));
            }

            // Allow the request to proceed if the user is authenticated
            return NextResponse.next();
        } catch (error) {
            console.error('Token verification failed:', error);
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Default: Allow access to non-protected pages (like login and register) without token verification
    return NextResponse.next();
}

export const config = {
    matcher: ["/account", "/login", "/register-email", "/about", "/user-profile", "/user-requests"], // Protect these routes
};
