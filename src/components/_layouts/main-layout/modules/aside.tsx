"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, useState } from "react";
import { type Session } from "next-auth";
import Image from "next/image";
import type { IconType } from "react-icons";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbMessageCircle } from "react-icons/tb";
import Link from "next/link";

type AsideProps =
    ComponentProps<"aside"> & {
    session: Session;
}

type Block = {
    session: Session;
}

export const Aside = ({ children, className, session, ...props }: AsideProps) => {

    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(state => !state);

    return (
        <aside
            className={cn(
                "bg-paper overflow-hidden shrink-0 transition-all duration-300",
                open ? "basis-72" : "basis-20",
                className
            )}
            // onClick={handleOpen}
            {...props}
        >
            <div className={"md:px-7 md:py-11 h-full"}>
                <div className={"flex flex-col gap-y-28 h-full"}>
                    <Profile session={session} />
                    <Navigation session={session} />

                    <div className={"mt-auto"}>
                        some action button
                    </div>
                </div>
            </div>
        </aside>
    );
};

const Profile = ({ session }: Block) => {
    return (
        <div
            className={cn(
                "grid grid-cols-[38px_1fr] grid-rows-[38px] items-center gap-x-2"
            )}
        >
            <div className={"relative rounded-full overflow-hidden size-full"}>
                <Image
                    fill
                    src={session.user.image || ""}
                    className={"object-cover"}
                    alt={"user image"}
                />
            </div>
            <div>
                <div className={"font-medium leading-none mb-0"}>
                    { session.user.name } { session.user.surname }
                </div>
                <div
                    className={cn(
                        "leading-none text-sm text-muted-foreground",
                        "cursor-pointer hover:text-primary duration-100"
                    )}
                >
                    { session.user.email }
                </div>
            </div>
        </div>
    );
};

const Navigation = ({ session }: Block) => {

    const navigation: { label: string; href: string; Icon: IconType; isActive: boolean }[] = [
        { label: "Dashboard", href: "/dashboard", Icon: LuLayoutDashboard, isActive: true },
        { label: "Notification", href: "/dashboard", Icon: IoMdNotificationsOutline, isActive: false },
        // { label: "Calendar", href: "/dashboard", Icon: LuCalendar, isActive: false },
        { label: "Teams", href: "/dashboard", Icon: HiOutlineUserGroup, isActive: false },
        { label: "Inbox", href: "/dashboard", Icon: TbMessageCircle, isActive: false },
    ];

    return (
        <nav>
            <ul className={"flex flex-col gap-y-2"}>
                {
                    navigation.map(({ href, label, isActive, Icon }) => (
                        <li
                            key={href}
                            className={"relative"}
                        >
                            <Link
                                href={href}
                                className={cn(
                                    "relative z-10 font-poppins text-base text-black rounded-xl",
                                    "flex items-center gap-x-2",
                                    "px-7 py-3",
                                    isActive && "bg-accent"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "shrink-0 opacity-50",
                                        isActive && "opacity-100"
                                    )}
                                />
                                { label }
                            </Link>

                            {
                                isActive &&
                                <div className={"absolute top-0 bottom-0 w-11 -translate-x-2 bg-black rounded-xl"} />
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};