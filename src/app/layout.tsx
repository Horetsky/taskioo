import type { Metadata } from "next";
import { type PropsWithChildren } from "react";
import { fonts } from "@/fonts.config";
import { Providers } from "@/app/providers";
import "./globals.css";
import { getSession } from "@/server/auth";
import { Toaster } from "@/components/toaster";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children
}: Readonly<PropsWithChildren>) {

    const session = await getSession();

    return (
        <html lang="en">
            <body className={fonts}>
                <Providers session={session}>
                    { children }
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
