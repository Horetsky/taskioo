import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type TitleProps = ComponentProps<"h1">

const PageTitle = ({ children, className, ...props }: ComponentProps<"section">) => {
    return (
        <section
            className={cn(
                "mb-9",
                className
            )}
            {...props}
        >
            { children }
        </section>
    );
};

const Title = ({ children, className, ...props }: TitleProps) => {
    return (
        <h1
            className={cn(
                "font-semibold text-4xl leading-[48px]",
                className
            )}
            {...props}
        >
            { children }
        </h1>
    );
};
const Subtitle = ({ children, className, ...props }: TitleProps) => {
    return (
        <h2
            className={cn(
                "font text-2xl opacity-60 mb-3",
                className
            )}
        >
            { children }
        </h2>
    );
};

PageTitle.Title = Title;
PageTitle.Subtitle = Subtitle;

export { PageTitle };