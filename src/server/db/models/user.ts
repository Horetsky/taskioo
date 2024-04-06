import { z } from "zod";
import { Adapter } from "@/server/db/adapter";

export namespace UserModel {
    export const userSchema = z.object({
        id: z.string(),
        email: z.string(),
        password: z.string().or(z.null()),
    });

    export type UserSchemaValue = z.infer<typeof userSchema>

    export class User extends Adapter<UserSchemaValue> {
        constructor() {
            super("user", userSchema);
        }
    }
}