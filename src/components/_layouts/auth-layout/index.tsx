import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import logo from "@/../public/assets/logo.svg";

type Block =
    ComponentProps<"div">

const AuthLayout = ({ children, className, ...props }: Block) => {
    return (
        <div
            className={cn(
                "min-h-[100vh] relative",
                "grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-x-24",
                "p-4 pl-4 lg:pl-20",
                className
            )}
            {...props}
        >
            { children }
        </div>
    );
};

const Form = ({ children, className, ...props }: Block) => {
    return (
        <div
            className={cn(
                "grid grid-rows-[33px_1fr]",
                className
            )}
            {...props}
        >
            <Image
                src={logo}
                alt={"logo"}
            />
            { children }
        </div>
    );
};

const Slider = ({children, className, ...props}: Block) => {
    return (
        <div
            className={cn(
                "h-full hidden lg:block",
                className
            )}
            {...props}
        >
            { children }
        </div>
    );
};

AuthLayout.Form = Form;
AuthLayout.Slider = Slider;
export { AuthLayout };