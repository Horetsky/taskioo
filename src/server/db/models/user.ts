import { z } from "zod";
import { Query } from "@/server/db/query";

export namespace UserModel {
    export const schema = z.object({
        id: z.string(),
        email: z.string(),
        password: z.string().or(z.null()),
    });

    export type SchemaValue = z.infer<typeof schema>

    export class User extends Query<SchemaValue>{
        constructor() {
            super("user", schema);
        }
    }
}