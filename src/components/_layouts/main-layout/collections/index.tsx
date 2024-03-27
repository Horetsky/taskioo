import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ListItem } from "@/components/ui/list-item";
import Link from "next/link";

export const Collections = () => {
    return (
        <div className={"pl-4"}>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className={"font-normal pt-0"}>Collections</AccordionTrigger>
                    <AccordionContent className={"pl-2"}>
                        <ListItem>
                            <Link href={"/collection/123"} className={"hover:bg-primary/20 duration-100 relative z-10 px-4 py-2 flex items-center justify-between"}>
                                <div className={"flex items-center gap-x-1"}>
                                    <span>😃</span>
                                    Personal
                                </div>
                                <div className={"bg-foreground text-background w-5 h-5 flex items-center text-xs justify-center rounded leading-none"}>
                                    4
                                </div>
                            </Link>
                            <ListItem.ActiveView isActive={true}/>
                        </ListItem>
                    </AccordionContent>
                    <AccordionContent className={"pl-2"}>
                        <ListItem>
                            <Link href={"/collection/123"} className={"hover:bg-primary/20 duration-100 relative z-10 px-4 py-2 flex items-center justify-between"}>
                                <div className={"flex items-center gap-x-1"}>
                                    <span>😃</span>
                                    Personal
                                </div>
                                <div className={"border border-foreground opacity-50 w-5 h-5 flex items-center text-xs justify-center rounded leading-none"}>
                                    1
                                </div>
                            </Link>
                            <ListItem.ActiveView />
                        </ListItem>
                    </AccordionContent>
                    <AccordionContent className={"pl-2"}>
                        <ListItem>
                            <Link href={"/collection/123"} className={"hover:bg-primary/20 duration-100 relative z-10 px-4 py-2 flex items-center justify-between"}>
                                <div className={"flex items-center gap-x-1"}>
                                    <span>😃</span>
                                    Personal
                                </div>
                                <div className={"border border-foreground opacity-50 w-5 h-5 flex items-center text-xs justify-center rounded leading-none"}>
                                   6+
                                </div>
                            </Link>
                            <ListItem.ActiveView />
                        </ListItem>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    );
};