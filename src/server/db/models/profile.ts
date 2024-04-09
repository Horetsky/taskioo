import { z } from "zod";
import { Query } from "@/server/db/query";

export namespace ProfileModel {
    export const schema = z.object({
        id: z.string(),
        name: z.string(),
        surname: z.string(),
        picture: z.string(),
        username: z.string(),
        user_id: z.string()
    });

    export type SchemaValue = z.infer<typeof schema>;

    export class Profile extends Query<SchemaValue> {
        constructor() {
            super("profile", schema);
        }
    }
}