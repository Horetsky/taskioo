import { z } from "zod";
import { Adapter } from "@/server/db/adapter";

export namespace ProfileModel {
    export const profileSchema = z.object({
        id: z.string(),
        name: z.string(),
        surname: z.string(),
        picture: z.string(),
        username: z.string(),
        user_id: z.string()
    });

    export type ProfileSchemaValue = z.infer<typeof profileSchema>;

    export class Profile extends Adapter<ProfileSchemaValue> {
        constructor() {
            super("profile", profileSchema);
        }
    }
}