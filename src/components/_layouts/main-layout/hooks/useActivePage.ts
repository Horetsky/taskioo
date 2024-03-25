import { usePathname } from "next/navigation";
import { type ComponentType, useCallback } from "react";
import type { IconType } from "react-icons";
import {
    AiFillAppstore,
    AiFillBell,
    AiFillMessage,
    AiOutlineAppstore,
    AiOutlineBell,
    AiOutlineMessage
} from "react-icons/ai";
import { RiGroupFill, RiGroupLine } from "react-icons/ri";

export function useActivePage() {
    const pathname = usePathname();

    return useCallback((url: string) => {
        return url === pathname;
    }, [pathname]);
}

export type NavigationItem = {
    label: string;
    href: string;
    Icon: IconType | ComponentType;
    IconActive: IconType | ComponentType;
}

export const navigationItems: NavigationItem[] = [
    { label: "Dashboard", href: "/dashboard", Icon: AiOutlineAppstore, IconActive: AiFillAppstore },
    { label: "Notification", href: "/notifications", Icon: AiOutlineBell, IconActive: AiFillBell },
    { label: "Teams", href: "/team", Icon: RiGroupLine,  IconActive: RiGroupFill },
    { label: "Inbox", href: "/inbox", Icon: AiOutlineMessage, IconActive: AiFillMessage },
];