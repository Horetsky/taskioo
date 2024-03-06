import { z } from "zod";
import { Adapter } from "@/server/db/adapter";
import { procedure } from "@/server/utils/procedure";

export namespace UserModel {
    export const userSchema = z.object({
        id: z.string(),
        email: z.string(),
        password: z.string().or(z.null()),
    });

    export type UserSchemaValue = z.infer<typeof userSchema>

    export class User extends Adapter<UserSchemaValue> {
        constructor() {
            super("user", userSchema);
        }

        async getByEmail(email: string) {
            const q = this.query.select({
                where: { email }
            });
            return await procedure(q).returns(userSchema.optional());
        }
    }
}