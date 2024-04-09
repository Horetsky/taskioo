"use server";

import { type ActionWithInput, type ActionWithoutInput } from "../types";
import { type ActionResponseValues } from "../response";

/**
 * This function is used to convert the server response
 * into a plain object to pass it to the client component
 */
export async function convertActionResponse<Input, Output>(
    input: Input,
    action: ActionWithInput<Input, Output> | ActionWithoutInput<Output>
): Promise<ActionResponseValues<Output>> {
    try {
        const response = await action(input);
        return response ? { data: response } : undefined;
    } catch (e: any) {
        return { message: e.message };
    }
}