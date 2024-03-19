"use client";

import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/toaster/toast";
import { type ToasterToast, useToast } from "./use-toast";
export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && (
                                <ToastDescription>{description}</ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}

export function useToaster() {

    const { toast } = useToast();

    class Toast {

        error(props: Omit<ToasterToast, "id"> | string): void {
            if(typeof props === "string") {
                toast({ variant: "destructive", title: "Uh oh! Something went wrong.", description: props});
            } else {
                toast({ variant: "destructive", ...props});
            }
        }

    }

    return new Toast();
}