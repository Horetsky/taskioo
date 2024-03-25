import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

import { Aside } from "./modules/aside";
import { Header } from "./modules/header";
import { type Session } from "next-auth";

type MainLayoutProps =
    ComponentProps<"div"> & {
    session: Session;
}
const MainLayout = ({ children, className, session, ...props }: MainLayoutProps) => {
    return (
        <main
            className={cn(
                "relative min-h-[100vh] flex",
                className
            )}
            {...props}
        >
            <Aside session={session} />
            <div className={"w-full"}>
                <Header />
                <main className={"px-14 mt-4"}>
                    { children }
                </main>
            </div>
        </main>
    );
};

export {
    MainLayout
};