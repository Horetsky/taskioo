import { z } from "zod";
import { Adapter } from "@/server/db/adapter";
import { procedure } from "@/server/utils/procedure";


export namespace ProfileModel {
    export const profileSchema = z.object({
        id: z.string(),
        name: z.string(),
        surname: z.string(),
        avatar: z.string(),
        user_id: z.string()
    });
    export type ProfileSchemaValue = z.infer<typeof profileSchema>;

    export class Profile extends Adapter<ProfileSchemaValue> {
        constructor() {
            super("profile", profileSchema);
        }

        async getByUserId(userId: string) {
            const q = this.query.select({
                where: { user_id: userId }
            });
            return await procedure(q).returns(profileSchema.optional());
        }
    }
}