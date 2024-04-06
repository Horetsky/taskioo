import type {
    ActionWithInput,
    ActionWithoutInput
} from "../types";
import {
    ActionResponse,
    type ActionResponseValues
} from "../response";
import {
    getClientResponse
} from "./getClientResponse";

export async function actionRequest<Input, Output>(
    input: Input,
    action: ActionWithInput<Input, Output> | ActionWithoutInput<Output>
): Promise<ActionResponseValues<Output>> {
    const clientResponse = await getClientResponse(input, action);
    return new ActionResponse(clientResponse).response;
}