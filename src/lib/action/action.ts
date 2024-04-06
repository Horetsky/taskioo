import { type ZodSchema } from "zod";
import type {
    ActionWithInput,
    ActionWithoutInput,
    CallbackWithInput,
    CallbackWithoutInput
} from "./types";
import { createActionContext } from "./context";
import { errorHandler } from "./utils/errorHandler";

function action<Input, Output>(
    schema: ZodSchema<Input>,
    callback: CallbackWithInput<Input, Output>
): ActionWithInput<Input, Output>;
function action<Input, Output>(
    schema: null,
    callback: CallbackWithoutInput<Output>
): ActionWithoutInput<Output>
function action<Input, Output>(
    schema: ZodSchema<Input> | null,
    callback: CallbackWithInput<Input, Output> | CallbackWithoutInput<Output>
) {
    if(schema) {
        return actionReturnWithInput(schema, callback as CallbackWithInput<Input, Output>);
    } else {
        return actionReturnWithoutInput(callback as CallbackWithoutInput<Output>);
    }
}
function actionReturnWithInput<Input, Output>(
    schema: ZodSchema<Input>,
    callback: CallbackWithInput<Input, Output>
): ActionWithInput<Input, Output> {
    return async (input) => {
        try {
            const validatedFields = schema.parse(input);
            const ctx = await createActionContext();
            return await callback({ input: validatedFields, ctx });
        } catch (e) {
            throw errorHandler(e);
        }
    };
}
function actionReturnWithoutInput<Output>(
    callback: CallbackWithoutInput<Output>
): ActionWithoutInput<Output> {
    return async () => {
        try {
            const ctx = await createActionContext();
            return await callback({ input: null, ctx });
        } catch (e) {
            throw errorHandler(e);
        }
    };
}

export { action };