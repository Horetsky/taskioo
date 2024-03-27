import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Block = Omit<ComponentProps<"div">, "children">

type DecorProps =
    Block & Partial<{
    primary: Block;
    foreground: Block;
    isActive: boolean;
}>

const ListItem = ({ children, className, ...props }: ComponentProps<"li">) => {
    return (
        <li
            className={cn(
                "relative list-none",
                className
            )}
            {...props}
        >
            { children }
        </li>
    );
};

const Decor = ({ className, isActive = false, primary, foreground, ...props }: DecorProps) => {
    return (
        <>
            <div
                className={cn(
                    "absolute z-0 top-0 bottom-0 right-0 left-0 -translate-x-1 bg-black rounded-lg",
                    isActive ? "opacity-100" : "opacity-0",
                    className,
                    foreground?.className || ""
                )}
                {...props}
                {...foreground}
            />

            <div
                className={cn(
                    "absolute z-0 top-0 bottom-0 right-0 left-0 bg-primary rounded-lg",
                    isActive ? "opacity-100" : "opacity-0",
                    className,
                    primary?.className || ""
                )}
                {...props}
                {...primary}
            />
        </>
    );
};

ListItem.ActiveView = Decor;
export { ListItem };