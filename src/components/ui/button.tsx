import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Spinner } from "@/components/_icons";

const buttonVariants = cva(
    "inline-flex gap-x-2 items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-foreground text-background hover:bg-foreground/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                dark: "bg-dark text-dark-foreground shadow hover:bg-dark/90",
                outline: "border border-border bg-background hover:bg-muted",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-foreground underline-offset-4 hover:underline",
                dashed: "w-full bg-background border border-dashed border-border hover:border-foreground duration-100"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-14 rounded-lg px-8",
                xl: "h-16 rounded-lg px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export type ButtonProps = {
  asChild?: boolean;
  icon?: ReactNode;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, icon, loading, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, className })
                )}
                ref={ref}
                {...props}
            >
                { loading && <Spinner variant={variant} /> }
                { !loading && icon }
                { children }
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
