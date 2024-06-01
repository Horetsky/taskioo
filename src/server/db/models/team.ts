import { z } from "zod";
import { Query } from "@/server/db/query";

export namespace TeamModel {
    export const schema = z.object({
        id: z.string(),
        title: z.string(),
    });

    export type SchemaValue = z.infer<typeof schema>;

    export class Team extends Query<SchemaValue> {
        constructor() {
            super("team", schema);
        }
    }
}