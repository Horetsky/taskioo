"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, useState } from "react";
import { type Session } from "next-auth";
import Image from "next/image";

import { Navigation } from "./navigation";
import { Collections } from "./collections";

type AsideProps =
    ComponentProps<"aside"> & {
    session: Session;
}

type Block =
    ComponentProps<"div"> & {
    session: Session;
}

export const Aside = ({ children, className, session, ...props }: AsideProps) => {

    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen(state => !state);

    return (
        <>
            <aside
                className={cn(
                    "bg-card overflow-hidden shrink-0 transition-all duration-300",
                    open ? "basis-72" : "basis-20",
                    className
                )}
                {...props}
            >
                <div className={"md:px-6 md:py-7 h-full"}>
                    <div className={"flex flex-col gap-y-11 h-full"}>

                        <Profile session={session}/>
                        
                        <Navigation session={session}/>

                        <Collections />

                        <div className={"mt-auto"}>
                            action button
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

const Profile = ({ className, session }: Block) => {
    return (
        <div
            className={cn(
                "grid grid-cols-[44px_1fr] grid-rows-[44px] items-center gap-x-2",
                className
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
                    {session.user.name} {session.user.surname}
                </div>
                <div
                    className={cn(
                        "leading-none text-sm text-muted-foreground",
                        "cursor-pointer hover:text-primary duration-100"
                    )}
                >
                    {session.user.email}
                </div>
            </div>
        </div>
    );
};