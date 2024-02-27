/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ZodSchema, type ZodType } from "zod";
import { type QueryOptions, type MutateOptions } from "@/server/types";

import { createQueryStack } from "@/server/utils/queryStack";
import { includeQuery, insertQuery, limitQuery, orderQuery, selectQuery, whereQuery } from "@/server/utils/query";
import { postgres } from "@/lib/pool";

type ProcedureReturn<T> = {
    query: string;
    returns: (schema?: ZodSchema<T>) => Promise<T> | unknown;
}
type Query<T extends ZodType, V> = (table: string, options: QueryOptions<T>) => ProcedureReturn<V>;
type Mutation<T extends ZodType, V> = (table: string, options: MutateOptions<T>) => ProcedureReturn<V>;

type ProcedureMethods<Input extends ZodType, Output> = {
    select: Query<Input, Output>;
    insert: Mutation<Input, Output>;
}


function withReturn(query: string) {
    return async function<Output = any>(schema?: ZodSchema<Output>) {
        const result = await postgres(query);

        if(schema) return schema.parse(result.rows);
        return result.rows;
    };
}

class Procedure<Input extends ZodType, Output> implements ProcedureMethods<Input, Output>{

    select(table: string, options: QueryOptions<Input>) {
        const queryStack = [selectQuery, includeQuery, whereQuery, orderQuery, limitQuery];
        const query = createQueryStack(queryStack, options, table, "");

        return { returns: withReturn(query), query };
    }
    insert(table: string, options: MutateOptions<Input>) {
        const queryStack = [insertQuery];
        const query = createQueryStack(queryStack, options, table, "");

        return { returns: withReturn(query), query };
    }
}

const procedure = new Procedure();
export { procedure };