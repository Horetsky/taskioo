import { z } from "zod";
import { Query } from "@/server/db/query";

export namespace AreaModel {
    export const schema = z.object({
        id: z.string(),
        title: z.string(),
        user_id: z.string()
    });

    export type SchemaValue = z.infer<typeof schema>;

    export class Area extends Query<SchemaValue> {
        constructor() {
            super("area", schema);
        }
    }
}