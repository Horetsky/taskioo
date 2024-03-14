import { withAuth } from "next-auth/middleware";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    authRoutes,
    completeAuthRoutes
} from "@/routes";

export const authMiddleware = withAuth((request) => {

    const {
        nextauth: { token },
        nextUrl
    } = request;

    const isAuthed = !!token;
    const isProfileCompeted = !!token?.profile;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isCompleteAuthRoute = completeAuthRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute) return null;

    // if(isAuthRoute) {
    //     if(isAuthed) {
    //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //     }
    //     return null;
    // }
    //
    // if(!isAuthed && !isPublicRoute) {
    //     return Response.redirect(new URL("/login", nextUrl));
    // }
    //
    // if(isAuthed && !isProfileCompeted) {
    //     if(!isCompleteAuthRoute) {
    //         return Response.redirect(new URL("/complete-profile", nextUrl));
    //     }
    // }

    return null;
}, {
    callbacks: {
        authorized: (token) => !!token
    }
});