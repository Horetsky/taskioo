"use client";

import { type Session } from "next-auth";
import { type PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

type ProvidersProps = {
    session: Session | null
}

export function Providers({ children, session }: PropsWithChildren<ProvidersProps>) {
    return (
        <>
            <SessionProvider session={session}>
                { children }
            </SessionProvider>
        </>
    );
}