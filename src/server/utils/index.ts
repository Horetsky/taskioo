import { type ZodSchema, type ZodType } from "zod";
import { type GetOptions } from "@/server/types";
import { type QueryResult, type QueryResultRow } from "pg";

import { createQueryStack } from "@/server/utils/queryStack";
import { includeQuery, limitQuery, orderQuery, selectQuery, whereQuery } from "@/server/utils/query";

type CallbackResult = Promise<QueryResult<QueryResultRow>>;
type Callback = (text: string, params?: unknown[]) => CallbackResult;

const queryStack = [selectQuery, includeQuery, whereQuery, orderQuery, limitQuery];

export function procedure<Schema extends ZodType>(schema: ZodSchema<Schema>["_input"]) {

    function query<Schema extends ZodType>(options: GetOptions<Schema>, table: string): string;
    function query<Schema extends ZodType>(options: GetOptions<Schema>, table: string, callback?: Callback): CallbackResult;
    function query(options: GetOptions<typeof schema>, table: string, callback?: Callback) {

        let query: string = `SELECT * FROM "${table}"`;

        query = createQueryStack(queryStack, options, table, query);

        if(callback) return callback(query);
        return query;

    }

    return { query };
}