import { NextResponse } from "next/server";
import axios from "axios";
import cookie from 'cookie';
import { getCookie } from "cookies-next";

export async function middleware(req) {
    const cookies = cookie.parse(req.headers.get('cookie') || '');
    const token = cookies.token || '';

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

    if (!token && (isUserRoute || isProviderRoute)) {
        const redirectTo = isProviderRoute ? '/professional-login' : '/login';
        return NextResponse.redirect(new URL(redirectTo, req.url));
    }

    if (token) {
        try {
            let isUserValid = false;
            let isProviderValid = false;

            // Check user token
            try {
                const userRes = await fetch('https://api.alltasko.com/api/users/verify-route', {
                    headers: {
                        cookie: req.headers.get('cookie') || '',
                    },
                    credentials: 'include'
                });
                const userData = await userRes.json();
                isUserValid = userData.valid;
            } catch (_) { }

            // Check provider token
            try {
                const providerRes = await fetch('https://api.alltasko.com/api/service-provider/verify-route', {
                    headers: {
                        cookie: req.headers.get('cookie') || '',
                    },
                });
                const providerData = await providerRes.json();
                isProviderValid = providerData.valid;
            } catch (_) { }

            // Redirect providers away from /
            if (isRoot && isProviderValid) {
                return NextResponse.redirect(new URL('/professional-dashboard', req.url));
            }

            // Restrict user routes
            if (isUserRoute && isUserValid) return NextResponse.next();
            if (isProviderRoute && isProviderValid) return NextResponse.next();

            // Auth pages — redirect if already authenticated
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
