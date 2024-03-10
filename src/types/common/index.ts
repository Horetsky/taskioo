
import { type HTMLAttributes } from "react";
import { type FieldValues, type UseFormReturn } from "react-hook-form";

export type IcoProps = Partial<{
    svg: HTMLAttributes<SVGElement>;
    path: HTMLAttributes<SVGPathElement>;
}>
export type UseFormHookReturn<T extends FieldValues> = {
    form: UseFormReturn<T>;
    handleSubmit: () => Promise<void>;
    loading: boolean;
    error?: string | null;
    message?: string | null;
}