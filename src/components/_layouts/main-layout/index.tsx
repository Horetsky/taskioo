import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { type Session } from "next-auth";

import { Aside } from "./aside";
import { Header } from "./header";
import { type AreaModel } from "@/server/db/models/area";

type MainLayoutProps =
    ComponentProps<"div"> & {
    session: Session;
    workspaces: AreaModel.SchemaValue[]
}

const MainLayout = ({ children, className, session, workspaces, ...props }: MainLayoutProps) => {
    return (
        <main
            className={cn(
                "relative h-[100vh] flex overflow-hidden",
                className
            )}
            {...props}
        >
            <Aside session={session} />
            <div className={"w-full relative overflow-y-scroll"}>
                <Header
                    workspaces={workspaces}
                    className={"sticky z-10 top-0 left-0 right-0 bg-background"}
                />
                <main className={"relative z-0 px-14 mt-4"}>
                    { children }
                </main>
            </div>
        </main>
    );
};

export {
    MainLayout
};