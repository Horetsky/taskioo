import { z } from "zod";
import { Query } from "@/server/db/query";

export namespace ListModel {
    export const schema = z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        owner_id: z.string(),
        area_id: z.string(),
        team_id: z.string().optional()
    });

    export type SchemaValue = z.infer<typeof schema>;

    export class List extends Query<SchemaValue> {
        constructor() {
            super("list", schema);
        }
    }
}