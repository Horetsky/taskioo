"use client";

import { type BaseSyntheticEvent, useState } from "react";

import {
    type ActionError,
    type ActionReturn,
    type UseActionCallbacks,
    type UseActionReturn
} from "./types";

export function useAction<Input, Output>(
    action: ActionReturn<Input, Output>, callbacks?: UseActionCallbacks<Input, Output> | undefined
): UseActionReturn<Input, Output> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ActionError | null>(null);
    const [result, setResult] = useState<Output | null>(null);

    async function execute(input: Input, event?: BaseSyntheticEvent) {
        try {
            setLoading(true);
            setError(null);
            setResult(null);

            if(callbacks?.onExecute) callbacks.onExecute(input);

            const response = await action(input);

            if(!response) {
                setLoading(false);
                if(callbacks?.onError) callbacks.onError({ message: "Internal Server Error." }, input);
                return setError({ message: "Internal Server Error." });
            }

            setResult(response);
            if(callbacks?.onSuccess) callbacks.onSuccess(response, input);

            if(callbacks?.onSettled) callbacks.onSettled(response);
        } catch (e: any) {
            if(callbacks?.onError) callbacks.onError({ message: e.message }, input);
            console.log(e.message);
            return setError({ message: e.message });
        } finally {
            setLoading(false);
        }
    }

    return { execute, result, loading, error };
}