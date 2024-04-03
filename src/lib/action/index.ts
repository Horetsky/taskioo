import { type ZodSchema } from "zod";

import type {
    ActionCallback,
    ActionReturn,
    ActionReturnWithoutInput
} from "./types";

import { createActionContext } from "@/lib/action/context";

function action<Input, Output>(
    schema: ZodSchema<Input>,
    callback: ActionCallback<Input, Output>
): ActionReturn<Input, Output>
function action<Input, Output>(
    schema: null,
    callback: ActionCallback<null, Output>
): ActionReturnWithoutInput<Output>
function action<Input, Output>(
    schema: ZodSchema<Input> | null,
    callback: ActionCallback<Input | null, Output>
) {
    if(schema) {
        return async (data: Input) => {
            const validatedFields = schema.parse(data);
            const ctx = await createActionContext();
            return await callback(validatedFields, ctx);
        };
    }
    return async () => {
        const ctx = await createActionContext();
        return await callback(null, ctx);
    };
}

export { action };