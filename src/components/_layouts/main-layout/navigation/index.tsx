import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
import { type Session } from "next-auth";
import { useNavigation, navigationItems, type NavigationItem } from "./useNavigation";
import { ListItem } from "@/components/ui/list-item";

type NavigationProps =
    ComponentProps<"nav"> & {
    session: Session;
}

export const Navigation = ({}: NavigationProps) => {

    const isActivePage = useNavigation();

    return (
        <nav>
            <ul className={"flex flex-col gap-y-2"}>
                {
                    navigationItems.map(item => (
                        <NavigationItem
                            key={item.href}
                            isActive={isActivePage(item.href)}
                            {...item}
                        />
                    ))
                }
            </ul>
        </nav>
    );
};

const NavigationItem = ({ href, label, isActive, Icon, IconActive}: NavigationItem & { isActive: boolean }) => {
    return (
        <ListItem>
            <Link
                href={href}
                className={cn(
                    "relative z-10 text-base rounded-lg",
                    "flex items-center gap-x-2 duration-100",
                    "px-4 py-2",
                    !isActive && "hover:bg-primary/20"
                )}
            >
                {
                    isActive ?
                        <IconActive className={"shrink-0"}/> :
                        <Icon className={"shrink-0 opacity-50"}/>
                }
                {label}
            </Link>
            <ListItem.ActiveView isActive={isActive} />
        </ListItem>
    );
};