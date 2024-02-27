import { type ZodSchema, type ZodType } from "zod";
import { type QueryOptions, type MethodResult, type MutateOptions } from "@/server/types";

import { createQueryStack } from "@/server/utils/queryStack";
import { includeQuery, insertQuery, limitQuery, orderQuery, selectQuery, whereQuery } from "@/server/utils/query";

type Database = (text: string, params?: unknown[]) => MethodResult;

export function procedure<Input extends ZodType>(schema: ZodSchema<Input["_input"]>) {

    function select(table: string, options: QueryOptions<Input>): string;
    function select(table: string, options: QueryOptions<Input>, database: Database): MethodResult;
    function select(table: string, options: QueryOptions<Input>, database?: Database) {
        let query: string = "";
        const queryStack = [selectQuery, includeQuery, whereQuery, orderQuery, limitQuery];
        query = createQueryStack(queryStack, options, table, query);

        if(database) return database(query);
        return query;
    }

    function create(table: string, options: MutateOptions<Input>): string;
    function create(table: string, options: MutateOptions<Input>, database?: Database): MethodResult;
    function create(table: string, options: MutateOptions<Input>, database?: Database) {

        let query: string = "";
        const queryStack = [insertQuery];
        query = createQueryStack(queryStack, options, table, query);

        if(database) return database(query);
        return query;
    }

    return { select, create };
}