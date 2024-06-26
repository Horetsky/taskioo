import { z, type ZodSchema } from "zod";
import type {
    Create,
    Delete,
    Update,
    FindMany,
    FindUnique
} from "@/server/db/types";
import {
    deleteQuery,
    includeQuery,
    insertQuery,
    limitQuery,
    orderQuery,
    returnsQuery,
    selectQuery, updateQuery,
    whereQuery
} from "@/server/db/query/template";
import { createQueryStack } from "@/server/db/query/queryStack";
import { pg } from "@/lib/pool";

export class Query<Input> {

    constructor(
        protected readonly table: string,
        protected readonly input: ZodSchema<Input>
    ) {}

    async findMany<Output = any>(...args: FindMany.Args<Input, Output>): Promise<Output[]> {
        const [
            options,
            returns
        ] = args;

        const queryStack = [selectQuery, includeQuery, whereQuery, orderQuery, limitQuery];
        const query = createQueryStack(queryStack, options, this.table);

        const { rows } = await pg(query);

        if(!returns) return rows as Output[];
        return z.array(returns).parse(rows);
    }

    async findUnique<Output = any>(...args: FindUnique.Args<Input, Output>): Promise<Output | undefined> {
        const [
            options,
            returns
        ] = args;

        const queryStack = [selectQuery, includeQuery, whereQuery, orderQuery, limitQuery];
        const query = createQueryStack(queryStack, options, this.table);

        const { rows } = await pg(query);

        if(!returns) return rows[0] as Output;
        return returns.optional().parse(rows[0]);
    }

    async findFirst<Output = any>(...args: FindUnique.Args<Input, Output>): Promise<Output | undefined> {
        const [
            options,
            returns
        ] = args;

        const queryStack = [selectQuery, includeQuery, whereQuery, orderQuery, limitQuery];
        const query = createQueryStack(queryStack, options, this.table);

        const { rows } = await pg(query);

        if(!returns) return rows[0] as Output;
        return returns.optional().parse(rows[0]);
    }

    async create<Output = any>(...args: Create.Args<Input, Output>): Promise<Output> {
        const [
            options,
            returns
        ] = args;

        const queryStack = [insertQuery, returnsQuery];
        const query = createQueryStack(queryStack, options, this.table);

        const { rows } = await pg(query);

        if(!returns) return rows[0] as Output;
        return returns.parse(rows[0]);
    }

    async delete<Output = any>(...args: Delete.Args<Input, Output>): Promise<Output> {
        const [
            options,
            returns
        ] = args;

        const queryStack = [deleteQuery, whereQuery];
        const query = createQueryStack(queryStack, options, this.table);

        const { rows } = await pg(query);

        if(!returns) return rows[0] as Output;
        return returns.parse(rows[0]);
    }

    async update<Output = any>(...args: Update.Args<Input, Output>): Promise<Output> {
        const [
            options,
            returns
        ] = args;

        const queryStack = [updateQuery, whereQuery, returnsQuery];
        const query = createQueryStack(queryStack, options, this.table);

        const { rows } = await pg(query);

        if(!returns) return rows[0] as Output;
        return returns.parse(rows[0]);
    }
}