import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
import { WorkAreas } from "./areas";
import { Button } from "@/components/ui/button";

export const Header = ({ children, className, ...props }: ComponentProps<"header">) => {
    return (
        <header
            className={cn(
                "py-7 px-14",
                "flex items-center justify-between"
            )}
            {...props}
        >

            <WorkAreas />

            <div>
                <Button variant={"dark"} className={"font-normal rounded-lg"}>
                    New Area
                </Button>
            </div>
        </header>
    );
};