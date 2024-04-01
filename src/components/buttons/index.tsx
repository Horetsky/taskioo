import { Button, type ButtonProps } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { cn } from "@/lib/utils";

export const AddNewItemButton = ({ children, className, ...props }: ButtonProps) => {
    return (
        <Button
            variant={"dashed"}
            size={"xl"}
            className={cn(
                "gap-x-6",
                className
            )}
            {...props}
        >
            <div className={"bg-primary rounded-md p-0.5"}>
                <LuPlus className={"text-lg"} />
            </div>
            { children }
        </Button>
    );
};