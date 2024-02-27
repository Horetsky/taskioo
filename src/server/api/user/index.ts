import { type QueryOptions, type Methods, type MutateOptions, type UniqueQueryOptions } from "@/server/types";
import { Schemas } from "@/server/db/schemas";
import { procedure } from "@/server/utils";
import { postgres } from "@/lib/pool";

import userSchema = Schemas.userSchema;
type TUser = typeof userSchema;

export class User implements Methods<TUser> {
    async findUnique(opt: UniqueQueryOptions<TUser>) {
        return await procedure(userSchema).select("user", opt, postgres);
    }

    async create(opt: MutateOptions<TUser>) {
        return await procedure(userSchema).create("user", opt, postgres);
    }

    async findMany(opt: QueryOptions<TUser>) {
        return await procedure(userSchema).select("user", opt, postgres);
    }
}