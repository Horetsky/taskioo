/* eslint-disable @typescript-eslint/no-explicit-any */

export type ActionResponseType = "error" | "success";
export type SuccessResponse = {
    type: "success";
    data?: unknown;
    message?: string;
}
export type ErrorResponse = {
    type: "error";
    message: string;
}

export class Response {
    success(message?: string): SuccessResponse {
        return { type: "success", message };
    }
    error(message: string): ErrorResponse {
        return { type: "error", message };
    }
    json(data: unknown): SuccessResponse {
        return { type: "success", data };
    }
}

export type ActionReturn<Input> = (data: Input) => Promise<ActionResponse>
export type ActionResponse = SuccessResponse | ErrorResponse;
export type Callback<Input> = (data: Input) => Promise<ActionResponse>;
export type UseActionCallbacks = {
    onExecute?: () => void;
    onSuccess?: (response: SuccessResponse) => void;
    onError?: (response: ErrorResponse) => void;
    onSettled?: (response: ActionResponse) => void;
};
export type UseActionReturn<Input> = {
    execute: (data: Input) => Promise<void>;
    result: SuccessResponse | null;
    loading: boolean;
    error: string | null
};
