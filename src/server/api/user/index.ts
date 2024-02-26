import { type GetOptions } from "@/server/types";
import { Schemas } from "@/server/db/schemas";
import userSchema = Schemas.userSchema;
import { procedure } from "@/server/utils";
import { db } from "@/lib/pool";
export class User {
    async findUnique(opt: GetOptions<typeof userSchema>) {
        await procedure(userSchema).query(opt, "user", db);
        return "resp";
    }
}