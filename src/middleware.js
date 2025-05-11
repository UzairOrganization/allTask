import { NextResponse } from 'next/server';
import axios from 'axios';
import cookie from 'cookie';

export async function middleware(req) {
    // Parse cookies and get the token
    const cookies = cookie.parse(req.headers.get('cookie') || '');
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
                const userRes = await axios.get('https://api.alltasko.com/api/users/verify-route', {
                    headers: {
                        cookie: req.headers.get('cookie') || '',
                    },
                    withCredentials: true,  // Ensure cookies are sent in the request
                });
                isUserValid = userRes.data.valid;
            } catch (_) { /* Handle user validation failure */ }

            // Validate provider token
            try {
                const providerRes = await axios.get('https://api.alltasko.com/api/service-provider/verify-route', {
                    headers: {
                        cookie: req.headers.get('cookie') || '',
                    },
                    withCredentials: true,  // Ensure cookies are sent in the request
                });
                isProviderValid = providerRes.data.valid;
            } catch (_) { /* Handle provider validation failure */ }

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
}

export const config = {
    matcher: [
        '/',
        '/about', '/user-profile', '/user-requests',
        '/professional-dashboard',
        '/login', '/professional-login', '/register-email', '/register-professional', '/forget-password', '/user-chat', '/leads', '/my-responses', '/purchased-leads'
    ],
};
