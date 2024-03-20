import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type Session } from "next-auth";
import Link from "next/link";
import { type IconType } from "react-icons";
import { LuCalendar, LuLayoutDashboard } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import { HiOutlineUserGroup } from "react-icons/hi2";

type Block =
    ComponentProps<"div"> & {
    session: Session
};
type SidebarProps =
    Omit<Block, "children">

export const Sidebar = ({ className, session, ...props }: SidebarProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-y-16",
                className
            )}
            {...props}
        >
            <Profile session={session} />
            <Navigation session={session} />
        </div>
    );
};

const Profile = ({ className, session, ...props }: Block) => {
    return (
        <div
            className={cn(
                "grid grid-cols-[38px_1fr] grid-rows-[38px] items-center gap-x-2",
                "",
                className
            )}
            {...props}
        >
            <div className={"relative rounded-full overflow-hidden size-full"}>
                <Image
                    fill
                    src={session.user.image || ""}
                    className={"object-cover"}
                    alt={"user image"}
                />
            </div>
            <div className={"font-poppins"}>
                <div className={"font-medium leading-none"}>
                    { session.user.name } { session.user.surname }
                </div>
                <div className={"leading-none text-sm text-muted-foreground"}>
                    { session.user.email }
                </div>
            </div>
        </div>
    );
};

const Navigation = ({ session, ...props }: Block) => {

    const navigation: { label: string; href: string; Icon: IconType; isActive: boolean }[] = [
        { label: "Dashboard", href: "/dashboard", Icon: LuLayoutDashboard, isActive: true },
        { label: "Notification", href: "/dashboard", Icon: IoMdNotificationsOutline, isActive: false },
        { label: "Calendar", href: "/dashboard", Icon: LuCalendar, isActive: false },
        { label: "Teams", href: "/dashboard", Icon: HiOutlineUserGroup, isActive: false },
        { label: "Inbox", href: "/dashboard", Icon: TbMessageCircle, isActive: false },
    ];

    return (
        <nav {...props}>
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