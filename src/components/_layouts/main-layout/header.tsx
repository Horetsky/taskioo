import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Workspaces } from "./workspaces";
export const Header = ({ children, className, ...props }: ComponentProps<"header">) => {
    return (
        <header
            className={cn(
                "py-7 px-14",
                "flex items-center justify-between",
                className
            )}
            {...props}
        >

            <Workspaces />

            <div>
                <Button className={"font-normal rounded-lg"}>
                    New Area
                </Button>
            </div>
        </header>
    );
};