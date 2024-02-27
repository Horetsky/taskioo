import { type Methods, type MutateOptions, type QueryOptions, type UniqueQueryOptions } from "@/server/types";
import { Schemas } from "@/server/db/schemas";
import { procedure } from "@/server/utils/procedure";
import { z } from "zod";
import userSchema = Schemas.userSchema;
type TUser = typeof userSchema;

export class User implements Methods<TUser> {
    async findUnique(options: UniqueQueryOptions<TUser>) {
        const result = await procedure.select("user", options).returns(z.array(userSchema));
        return result[0];
    }

    async findMany(options: QueryOptions<TUser>) {
        return await procedure.select("user", options).returns(z.array(userSchema));
    }

    async create(options: MutateOptions<TUser>) {
        return await procedure.insert("user", options).returns();
    }
}