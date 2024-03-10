"use client";

import { useState } from "react";

import {
    type ActionReturn,
    type SuccessResponse,
    type UseActionCallbacks,
    type UseActionReturn
} from "./types";

export function useAction<Input>(action: ActionReturn<Input>, callbacks?: UseActionCallbacks | undefined): UseActionReturn<Input> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<SuccessResponse | null>(null);

    async function execute(data: Input) {
        setLoading(true);

        if(callbacks?.onExecute) callbacks.onExecute();

        const response = await action(data);

        if(response.type === "error") {
            setError(response.message);
            if(callbacks?.onError) callbacks.onError(response);
        }

        if(response.type === "success") {
            setResult(response);
            if(callbacks?.onSuccess) callbacks.onSuccess(response);
        }

        if(callbacks?.onSettled) callbacks.onSettled(response);

        setLoading(false);
    }

    return { execute, result, loading, error };
}