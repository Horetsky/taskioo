import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AiOutlineHolder } from "react-icons/ai";
import { Task } from "@/components/task";
import { type ReactNode } from "react";

type TaskListProps = {
    title: string | ReactNode
    count: string | number | ReactNode;
    tasks: any[]
}
export const TaskList = ({ title, count, tasks }: TaskListProps) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <div className={"grid grid-cols-[14px_1fr] pb-4 items-center gap-x-4"}>
                    <AiOutlineHolder className={" text-2xl opacity-50"} />
                    <AccordionTrigger className={"p-0 flex items-center [&_svg]:w-6 [&_svg]:h-6"}>
                        <span className={"text-lg font-medium"}>
                            { title }
                        </span>
                        <div className={"bg-foreground text-background w-5 h-5 flex items-center text-xs justify-center rounded leading-none"}>
                            { count }
                        </div>
                    </AccordionTrigger>
                </div>
                {
                    tasks.map((item, i) => (
                        <AccordionContent key={i} className={"pl-8 mb-3"}>
                            <Task/>
                        </AccordionContent>
                    ))
                }
            </AccordionItem>
        </Accordion>
    );
};