import { type PropsWithChildren } from "react";
import { MainLayout } from "@/components/_layouts";
import { getSession } from "@/server/auth";
import { getUserWorkspaces } from "@/server/api/actions/workspace";

export default async function Layout({ children }: PropsWithChildren) {

    const session = await getSession();

    const workspaces = await getUserWorkspaces();

    return (
        <MainLayout session={session} workspaces={workspaces}>
            { children }
        </MainLayout>
    );
}