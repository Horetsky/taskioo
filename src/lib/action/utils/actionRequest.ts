import type {
    ActionWithInput,
    ActionWithoutInput
} from "../types";
import {
    ActionResponse,
    type ActionResponseValues
} from "../response";
import {
    convertActionResponse
} from "./convertActionResponse";

/**
 * This function is used to make requests
 * from client components (useAction hook)
 */
export async function actionRequest<Input, Output>(
    input: Input,
    action: ActionWithInput<Input, Output> | ActionWithoutInput<Output>
): Promise<ActionResponseValues<Output>> {
    const clientResponse = await convertActionResponse(input, action);
    return new ActionResponse(clientResponse).response;
}