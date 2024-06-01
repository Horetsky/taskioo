import { AiOutlineHolder } from "react-icons/ai";
import { HiEllipsisVertical } from "react-icons/hi2";
import { Checkbox } from "@/components/ui/checkbox";
import { type PropsWithChildren } from "react";

export const Task = ({ children }: PropsWithChildren) => {
    return (
        <li className={"grid grid-cols-[14px_20px_1fr_120px_75px_20px] gap-x-4 items-center leading-none py-2.5 px-3 rounded-lg hover:bg-card duration-200"}>
            <div>
                <AiOutlineHolder className={"text-xl opacity-50"} />
            </div>
            <Checkbox className={"data-[state=checked]:border-foreground data-[state=checked]:bg-foreground data-[state=checked]:text-background"} />
            <div>
                { children }
            </div>
            <div className={"flex items-center"}>
                <div className={"w-8 h-8 bg-blue-accent rounded-full flex items-center justify-center text-xl"}>

                </div>
                <div className={"-ml-3 w-8 h-8 bg-yellow-accent rounded-full flex items-center justify-center text-xl"}>

                </div>
                <div className={"-ml-3 w-8 h-8 bg-destructive rounded-full flex items-center justify-center text-xl"}>

                </div>
            </div>
            <div className={"bg-yellow-accent/20 rounded-lg py-2.5 text-center text-yellow-accent"}>
                Today
            </div>
            <div>
                <HiEllipsisVertical className={"text-xl opacity-50"} />
            </div>
        </li>
    );
};