
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
export type UseFormHookReturn<T extends FieldValues, Result> = {
    form: UseFormReturn<T>;
    handleSubmit: () => Promise<void>;
    loading: boolean;
    status: HookActionStatus;
    result?: ServerActionReturn<Result>
}