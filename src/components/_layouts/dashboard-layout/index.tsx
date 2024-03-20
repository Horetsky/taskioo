import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Block =
    ComponentProps<"div">

const DashboardLayout = ({ children, className, ...props }: Block) => {
    return (
        <div
            className={cn(
                "grid grid-cols-[280px_1fr] min-h-[100vh]",
                className
            )}
            {...props}
        >
            { children }
        </div>
    );
};

const Body = ({ children, className, ...props }: Block) => {
    return (
        <div
            className={cn(
                "md:py-11",
                className
            )}
            {...props}
        >
            { children }
        </div>
    );
};

const Aside = ({ children, className, ...props }: Block) => {
    return (
        <aside
            className={cn(
                "md:py-11 md:px-7 bg-paper"
            )}
            {...props}
        >
            { children }
        </aside>
    );
};

DashboardLayout.Body = Body;
DashboardLayout.Aside = Aside;
export { DashboardLayout };