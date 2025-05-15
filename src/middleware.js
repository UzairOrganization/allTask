import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cookie from 'cookie'; // Ensure cookie is imported correctly
import { API } from './lib/data-service';

export async function middleware(req) {
    try {
        // Ensure the cookies are defined before parsing
        const cookiesHeader = req.headers.get('cookie');
        // Safely parse cookies or create an empty object if no cookies are present
        const cookies = cookiesHeader ? cookie.parse(cookiesHeader) : {};
        const token = cookies.token || '';

        // Define routes
        const authPages = [
            '/login', '/professional-login', '/register-email',
            '/register-professional', '/forget-password'
        ];
        const isAuthPage = authPages.includes(req.nextUrl.pathname);

        const userRoutes = [
            '/about', '/user-profile', '/user-requests', '/user-chat',
        ];

        const providerRoutes = [
            '/professional-dashboard',
            '/leads',
            '/my-responses',
            '/purchased-leads'
        ];

        const isUserRoute = userRoutes.some(route => req.nextUrl.pathname.startsWith(route));
        const isProviderRoute = providerRoutes.some(route => req.nextUrl.pathname.startsWith(route));
        const isRoot = req.nextUrl.pathname === '/';

        // Redirect if no token and trying to access protected route
        if (!token && (isUserRoute || isProviderRoute)) {
            const redirectTo = isProviderRoute ? '/professional-login' : '/login';
            return NextResponse.redirect(new URL(redirectTo, req.url));
        }

        if (token) {
            try {
                let isUserValid = false;
                let isProviderValid = false;

                // Validate user token
                try {
                    const userRes = await axios.get(`${API}/api/users/verify-route`, {
                        headers: {
                            cookie: cookiesHeader || '',
                        },
                        withCredentials: true,  // Ensure cookies are sent in the request
                    });
                    isUserValid = userRes.data?.valid || false;
                } catch (error) { 
                    console.error("User validation error:", error.message);
                }

                // Validate provider token
                try {
                    const providerRes = await axios.get(`${API}/api/service-provider/verify-route`, {
                        headers: {
                            cookie: cookiesHeader || '',
                        },
                        withCredentials: true,  // Ensure cookies are sent in the request
                    });
                    isProviderValid = providerRes.data?.valid || false;
                } catch (error) { 
                    console.error("Provider validation error:", error.message);
                }

                // Redirect if provider tries to access the root page
                if (isRoot && isProviderValid) {
                    return NextResponse.redirect(new URL('/professional-dashboard', req.url));
                }

                // Allow access to user routes if valid
                if (isUserRoute && isUserValid) return NextResponse.next();
                if (isProviderRoute && isProviderValid) return NextResponse.next();

                // Redirect already authenticated users on auth pages
                if (isAuthPage) {
                    if (isUserValid) return NextResponse.redirect(new URL('/', req.url));
                    if (isProviderValid) return NextResponse.redirect(new URL('/professional-dashboard', req.url));
                }

                // Unauthorized access to provider route
                if (isProviderRoute && !isProviderValid) {
                    return NextResponse.redirect(new URL('/professional-login', req.url));
                }

                // Unauthorized access to user route
                if (isUserRoute && !isUserValid) {
                    return NextResponse.redirect(new URL('/login', req.url));
                }

            } catch (error) {
                console.error("Middleware Error:", error);
                const response = NextResponse.redirect(new URL('/login', req.url));
                return response;
            }
        }

        return NextResponse.next();
    } catch (error) {
        // Global error handler to prevent middleware crashes
        console.error("Fatal middleware error:", error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/',
        '/about', '/user-profile', '/user-requests',
        '/professional-dashboard',
        '/login', '/professional-login', '/register-email', '/register-professional', '/forget-password', '/user-chat', '/leads', '/my-responses', '/purchased-leads'
    ],
};