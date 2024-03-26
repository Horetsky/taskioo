import { type PropsWithChildren } from "react";
import { MainLayout } from "@/components/_layouts";
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: PropsWithChildren) {

    const session = await getSession();

    if(!session || !session.user) return redirect("/login");

    return (
        <MainLayout session={session}>
            { children }
        </MainLayout>
    );
}