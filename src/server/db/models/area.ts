import { z } from "zod";
import { Query } from "@/server/db/query";

export namespace AreaModel {
    export const areaSchema = z.object({
        id: z.string(),
        title: z.string(),
        user_id: z.string()
    });

    export type AreaSchemaValue = z.infer<typeof areaSchema>;

    export class Area extends Query<AreaSchemaValue> {
        constructor() {
            super("area", areaSchema);
        }
    }
}