import { type Session } from "next-auth";

export type ActionReturn<Input, Output> = (data: Input) => Promise<Output>
export type ActionReturnWithoutInput<Output> = () => Promise<Output>

export type ActionCallback<Input, Output> = (input: Input, ctx: ActionContext) => Promise<Output>;

export type ActionContext = {
    session: Session | null;
    headers: Readonly<Headers>;
}

export type ActionError = {
    message?: string;
}

export type UseActionCallbacks<Input, Output, Error = ActionError> = Partial<{
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
export type UseActionReturn<Input, Output> = {
    execute: (data: Input) => Promise<void>;
    result: Output | null;
    loading: boolean;
    error: ActionError | null
};
