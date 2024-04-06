"use server";

import type {
    ActionWithInput,
    ActionWithoutInput,
} from "@/lib/action/types";
import type { ActionResponseValues } from "@/lib/action/response";

/**
 * This function is used to convert the server response
 * into a plain object to pass it to the client component
 */

export async function getClientResponse<Input, Output>(
    input: Input,
    action: ActionWithInput<Input, Output> | ActionWithoutInput<Output>
): Promise<ActionResponseValues<Output>> {
    try {
        const response = await action(input);
        return { data: response };
    } catch (e: any) {
        return { message: e.message };
    }
}