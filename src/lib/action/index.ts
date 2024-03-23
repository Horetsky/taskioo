/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZodError, type ZodSchema } from "zod";

import {
    Response as ActionResponse,
    type Callback,
    type ActionReturn
} from "./types";
import { createActionContext } from "@/lib/action/context";

const Response = new ActionResponse();

function action<Input>(schema: ZodSchema<Input>, callback: Callback<Input>): ActionReturn<Input> {

    return async (data: Input) => {
        try {
            const validatedFields = schema.parse(data);
            const ctx = await createActionContext();
            return await callback(validatedFields, ctx);
        } catch (e: any) {
            if(e instanceof ZodError) {
                return Response.error("Invalid fields!");
            }
            return Response.error(e.message);
        }
    };
}

export { action, Response };