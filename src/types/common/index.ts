
import { type HTMLAttributes } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { type HookActionStatus } from "next-safe-action/hooks";

export type IcoProps = Partial<{
    svg: HTMLAttributes<SVGElement>;
    path: HTMLAttributes<SVGPathElement>;
}>
export type ServerActionReturn<T> = {
    error?: T;
    success?: string
}
export type UseFormHookReturn<T extends FieldValues, Error = string> = {
    form: UseFormReturn<T>;
    handleSubmit: () => Promise<void>;
    loading: boolean;
    error?: Error;
    message?: string;
}