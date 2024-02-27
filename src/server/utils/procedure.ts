/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ZodSchema, type ZodType } from "zod";
import { type Options } from "@/server/types";
import {
    includeQuery,
    insertQuery,
    limitQuery,
    orderQuery,
    selectQuery,
    updateQuery,
    whereQuery
} from "@/server/utils/query";
import { createQueryStack } from "@/server/utils/queryStack";
import { postgres } from "@/lib/pool";

type ProcedureReturn<T> = {
    query: string;
    returns: (schema?: ZodSchema<T>) => Promise<T> | unknown;
}
type Query<T extends ZodType, V> = (table: string, options: Options<T>) => ProcedureReturn<V>;

type ProcedureMethods<Input extends ZodType, Output> = {
    select: Query<Input, Output>;
    insert: Query<Input, Output>;
}

function withReturn(query: string) {
    return async function<Output = any>(schema?: ZodSchema<Output>) {
        const result = await postgres(query);

        if(schema) return schema.parse(result.rows);
        return result.rows;
    };
}

class Procedure<Input extends ZodType, Output> implements ProcedureMethods<Input, Output>{

    select(table: string, options: Options<Input>) {
        const queryStack = [selectQuery, includeQuery, whereQuery, orderQuery, limitQuery];
        const query = createQueryStack(queryStack, options, table, "");

        console.log(query);

        return { returns: withReturn(query), query };
    }
    insert(table: string, options: Options<Input>) {
        const queryStack = [insertQuery];
        const query = createQueryStack(queryStack, options, table, "");

        console.log(query);

        return { returns: withReturn(query), query };
    }

    update(table: string, options: Options<Input>) {
        const queryStack = [updateQuery, whereQuery];
        const query = createQueryStack(queryStack, options, table, "");

        return { returns: withReturn(query), query };
    }
}

const procedure = new Procedure();
export { procedure };