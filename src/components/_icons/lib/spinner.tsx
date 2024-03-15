import { cva, type VariantProps } from "class-variance-authority";

import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { type ButtonProps } from "@/components/ui/button";

const spinnerVariants = cva(
    "inline-block rounded-full border-l-transparent border-r-transparent border-b-transparent box-border animate-spin", {
        variants: {
            size: {
                lg: "border-[0.094rem] w-5 h-5"
            },
            variant: {
                default: "border-t-white",
                destructive: "",
                outline: "border-t-primary",
                secondary: "",
                ghost: "",
                link: "",
                dark: "border-t-white"
            }
        },
        defaultVariants: {
            size: "lg"
        }
    }
);

type Props =
    Pick<ButtonProps, "variant"> &
    VariantProps<typeof spinnerVariants> &
    Omit<ComponentProps<"span">, "children">

export const Spinner = ({ size, className, variant, ...props }: Props) => {
    return <span
        className={cn(spinnerVariants({ size, variant, className }))}
    />;
};