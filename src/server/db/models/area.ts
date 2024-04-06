import { z } from "zod";
import { Adapter } from "@/server/db/adapter";

export namespace AreaModel {
    export const areaSchema = z.object({
        id: z.string(),
        title: z.string(),
        user_id: z.string()
    });

    export type AreaSchemaValue = z.infer<typeof areaSchema>;

    export class Area extends Adapter<AreaSchemaValue> {
        constructor() {
            super("area", areaSchema);
        }
    }
}