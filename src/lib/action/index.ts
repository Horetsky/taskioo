/* eslint-disable @typescript-eslint/no-explicit-any */

import { ZodError, type ZodSchema } from "zod";

import {
    Response,
    type Callback,
    type ActionReturn
} from "./types";

function action<Input>(schema: ZodSchema<Input>, callback: Callback<Input>): ActionReturn<Input> {
    return async (data: Input) => {
        try {
            const validatedFields = schema.parse(data);
            return await callback(validatedFields);
        } catch (e: any) {
            if(e instanceof ZodError) {
                return new Response().error("Invalid fields!");
            }
            return new Response().error(e.message);
        }
    };
}

export { action, Response };