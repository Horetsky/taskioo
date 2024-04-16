/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { type DefaultSession } from "next-auth";

type SessionUser = {
    userId: string;
    email: string;
    workspaceId?: string;
    teamId?: string;
    username?: string;
    profileId?: string;
    name?: string | null;
    surname?: string;
    image?: string | null;
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: SessionUser
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends SessionUser {}
}