import { z } from "zod";
import { Adapter } from "@/server/db/adapter";
import { procedure } from "@/server/utils/procedure";


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

        async getByUser(userId: string) {
            const q = this.query.select({
                where: { user_id: userId }
            });
            return await procedure(q).returns(areaSchema.optional());
        }
    }
}