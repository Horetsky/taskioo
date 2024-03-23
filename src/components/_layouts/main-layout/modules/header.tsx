import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

export const Header = ({ children, className, ...props }: ComponentProps<"header">) => {
    return (
        <header
            className={cn(
            )}
            {...props}
        >
            header
        </header>
    );
};