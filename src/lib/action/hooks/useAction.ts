"use client";

import { type BaseSyntheticEvent, useState } from "react";
import type {
    ActionWithInput,
    ActionWithoutInput,
    UseActionCallbacks,
    UseActionReturn,
} from "@/lib/action/types";
import {
    type ErrorResponse,
    SuccessResponse
} from "../response";
import { actionRequest } from "../utils/actionRequest";

export function useAction<Input, Output>(
    action: ActionWithInput<Input, Output> | ActionWithoutInput<Output>,
    callbacks?: UseActionCallbacks<Input, Output> | undefined
): UseActionReturn<Input, Output> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorResponse | null>(null);
    const [result, setResult] = useState<Output | null>(null);

    async function execute(input: Input, event?: BaseSyntheticEvent) {
        setLoading(true);
        setError(null);
        setResult(null);

        if(callbacks?.onExecute) callbacks.onExecute(input);

        const response = await actionRequest(input, action);

        if(response instanceof SuccessResponse) {
            setLoading(false);
            setResult(response.data);
            if(callbacks?.onSuccess) callbacks.onSuccess(response.data, input);
            if(callbacks?.onSettled) callbacks.onSettled(response.data, input);
        } else {
            setLoading(false);
            setError(response);
            if(callbacks?.onError) callbacks.onError(response, input);
            if(callbacks?.onSettled) callbacks.onSettled(null, input, response);
        }
    }

    return { execute, result, loading, error };
}