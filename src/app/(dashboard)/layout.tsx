import { type PropsWithChildren } from "react";
import { DashboardLayout } from "@/components/_layouts";
import { Sidebar } from "@/components/sidebar";
import { getSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: PropsWithChildren) {

    const session = await getSession();

    if(!session) return redirect("/login");

    return (
        <DashboardLayout>
            <DashboardLayout.Aside>
                <Sidebar session={session} />
            </DashboardLayout.Aside>
            <DashboardLayout.Body>
                { children }
            </DashboardLayout.Body>
        </DashboardLayout>
    );
}