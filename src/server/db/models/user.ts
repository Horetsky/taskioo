import type {
    DeleteOptions,
    Methods,
    MutateOptions,
    SelectOptions,
    SelectUniqueOptions
} from "@/server/types";
import { procedure } from "@/server/utils/procedure";
import { z } from "zod";

export namespace UserModel {
    export const userSchema = z.object({
        id: z.string(),
        email: z.string(),
        password: z.string().or(z.null()),
    });
    export type UserSchemaValue = z.infer<typeof userSchema>

    export class User implements Methods<UserSchemaValue> {
        private table = "user";

        async findUnique(options: SelectUniqueOptions<UserSchemaValue>) {
            const result = await procedure.select(this.table, options).returns(z.array(userSchema));
            return result[0];
        }

        async findMany(options: SelectOptions<UserSchemaValue>) {
            return await procedure.select(this.table, options).returns(z.array(userSchema));
        }

        async create(options: MutateOptions<UserSchemaValue>) {
            return await procedure.insert(this.table, options).returns();
        }

        async update(options: MutateOptions<UserSchemaValue>) {
            return await procedure.update(this.table, options).returns();
        }

        async delete(options: DeleteOptions<UserSchemaValue>) {
            return await procedure.delete(this.table, options).returns();
        }
    }
}