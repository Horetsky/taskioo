import { withAuth } from "next-auth/middleware";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    authRoutes,
    completeProfileRoute
} from "@/routes";

export const authMiddleware = withAuth((request) => {

    const {
        nextauth: { token },
        nextUrl
    } = request;

    const isAuthed = !!token;
    const isProfileCompeted = !!token?.profileId;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isCompleteProfileRoute = completeProfileRoute.includes(nextUrl.pathname);

    /**
     * The code below prevents the middleware
     * from being triggered on API routes
     */
    if(isApiAuthRoute) return null;
    /**
     * The code below is responsible for redirecting the user
     * depending on whether user is logged in or not
     */
    if(isAuthRoute) {
        if(isAuthed) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }
    if(!isAuthed && !isPublicRoute) {
        return Response.redirect(new URL("/login", nextUrl));
    }
    /**
     * The code below is responsible for redirecting the user
     * depending on whether their profile is complete or not
     */
    if(isAuthed && !isProfileCompeted) {
        if(!isCompleteProfileRoute) {
            return Response.redirect(new URL("/complete-profile", nextUrl));
        }
        return null;
    }
    if(isCompleteProfileRoute) {
        if(isAuthed && isProfileCompeted) {
            return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return null;
    }

    return null;
}, {
    callbacks: {
        authorized: (token) => !!token
    }
});