import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ListItem } from "@/components/ui/list-item";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LuPlus } from "react-icons/lu";
import { projectItem, useProjects } from "./useProjects";
import { useNavigation } from "@/components/_layouts/main-layout/navigation/useNavigation";
import { NewProjectModal } from "@/components/_modules/project/new-project-form";

export const Projects = () => {

    const lists = useProjects();
    return (
        <div>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <Trigger />
                    {
                        lists ?
                            lists.map(({ list, tasks }) => (
                                <AccordionContent key={list.id} className={"pl-6"}>
                                    <ListItem>
                                        <Link href={"/collection/123"} className={"hover:bg-primary/20 duration-100 relative z-10 px-4 py-2 flex items-center justify-between"}>
                                            <div className={"flex items-center gap-x-1"}>
                                                { list.title }
                                            </div>
                                            <div className={"bg-foreground text-background w-5 h-5 flex items-center text-xs justify-center rounded leading-none"}>
                                                { tasks.length }
                                            </div>
                                        </Link>
                                        <ListItem.ActiveView isActive={false}/>
                                    </ListItem>
                                </AccordionContent>
                            )) : null
                    }
                </AccordionItem>
            </Accordion>

        </div>
    );
};

const Trigger = () => {

    const isActivePage = useNavigation();

    return (
        <>
            {
                projectItem.map(({href, label, Icon, IconActive }) => (
                    <ListItem key={href}>
                        <div
                            className={cn(
                                "relative z-10 text-base rounded-lg",
                                "flex items-center justify-between gap-x-2 duration-100",
                                "px-4 py-2"
                            )}>
                            <Link
                                href={href}
                                className={"flex items-center gap-x-2 w-full"}
                            >
                                {
                                    isActivePage(href) ?
                                        <IconActive /> :
                                        <Icon className={"opacity-50"} />
                                }
                                { label }
                            </Link>
                            <div className={"flex items-center gap-x-2"}>
                                <NewProjectModal
                                    triger={<LuPlus className={"cursor-pointer"} />}
                                />

                                <AccordionTrigger
                                    className={"font-normal [&_svg]:w-5 [&_svg]:h-5 [&_svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0 p-0"}
                                />
                            </div>
                        </div>
                        <ListItem.ActiveView isActive={isActivePage(href)} />
                    </ListItem>
                ))
            }
        </>
    );
};