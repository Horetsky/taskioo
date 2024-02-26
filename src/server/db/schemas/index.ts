import { z } from "zod";

export namespace Schemas {
    export const userSchema = z.object({
        id: z.string(),
        email: z.string(),
        password: z.string(),
    });
}