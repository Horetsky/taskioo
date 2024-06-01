import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AiOutlineHolder } from "react-icons/ai";
import { Task } from "@/components/_modules/tasks/task-list/task";
import { type ListModel } from "@/server/db/models/list";

export const TaskList = ({ data: { list, tasks } }: { data: ListModel.TaskListValue[number] }) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <div className={"grid grid-cols-[14px_1fr] pb-4 items-center gap-x-4"}>
                    <AiOutlineHolder className={" text-2xl opacity-50"} />
                    <AccordionTrigger className={"p-0 flex items-center [&_svg]:w-6 [&_svg]:h-6"}>
                        <span className={"text-lg font-medium"}>
                            { list.title }
                        </span>
                        <div className={"bg-foreground text-background w-5 h-5 flex items-center text-xs justify-center rounded leading-none"}>
                            { tasks.length }
                        </div>
                    </AccordionTrigger>
                </div>
                {
                    tasks.map((item, i) => (
                        <AccordionContent key={i} className={"pl-8 mb-3"}>
                            <Task>
                                { item.title }
                            </Task>
                        </AccordionContent>
                    ))
                }
            </AccordionItem>
        </Accordion>
    );
};