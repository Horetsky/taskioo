import { type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props =
    ComponentProps<"div"> & {
    actionText: string | ReactNode;
    href: string;
}
export const HaveAnAccount = ({
    children,
    className,
    actionText, href,
    ...props
}: Props) => {
    return (
        <div
            className={cn(
                "text-base text-muted-foreground text-center",
                className
            )}
            {...props}
        >
            { children }
            <Link className={"text-black ml-1.5 hover:underline"} href={href}>
                { actionText }
            </Link>
        </div>
    );
};