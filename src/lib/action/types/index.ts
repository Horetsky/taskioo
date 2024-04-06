import { type ErrorResponse } from "../response";
import type { Session } from "next-auth";

export type ActionWithInput<Input, Output> = (input: Input) => Promise<Output>;
export type ActionWithoutInput<Output> = () => Promise<Output>;

export type CallbackWithInput<Input, Output> = (args: CallbackArgs<Input>) => Promise<Output>;
export type CallbackWithoutInput<Output> = (args: CallbackArgs<null>) => Promise<Output>;

export type ActionContext = {
    session: Session | null;
    headers: Readonly<Headers>;
}
export type CallbackArgs<Input> = {
    input: Input;
    ctx: ActionContext
}


export type UseActionReturn<Input, Output> = {
    execute: (data: Input) => Promise<void>;
    result: Output | null;
    loading: boolean;
    error: ErrorResponse | null
};
export type UseActionCallbacks<Input, Output, Error = ErrorResponse> = Partial<{
    onExecute: (
        input: Input
    ) => void;
    onSuccess: (
        data: Output,
        input: Input
    ) => void;
    onError: (
        error: Error,
        input: Input
    ) => void;
    onSettled: (
        data?: Output | null,
        input?: Input | null,
        error?: Error | null
    ) => void;
}>