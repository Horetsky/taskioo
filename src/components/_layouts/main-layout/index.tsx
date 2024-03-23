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
                "min-h-[100vh] flex gap-x-14",
                className
            )}
            {...props}
        >
            <Aside session={session} />
            <div>
                <Header />
                <main>
                    { children }
                </main>
            </div>
        </main>
    );
};

export {
    MainLayout
};