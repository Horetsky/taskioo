import { type ZodSchema } from "zod";
import { type Options } from "@/server/types";
import {
    deleteQuery,
    includeQuery,
    insertQuery,
    limitQuery,
    orderQuery,
    selectQuery,
    updateQuery,
    whereQuery
} from "@/server/utils/query";
import { createQueryStack } from "@/server/utils/queryStack";
import { withReturn } from "@/server/utils/withReturn";

type ProcedureReturn<T> = {
    query: string;
    returns: (schema?: ZodSchema<T>) => Promise<T> | unknown;
}
type Query<T, V> = (table: string, options: Options<T>) => ProcedureReturn<V>;

type ProcedureMethods<Input, Output> = {
    select: Query<Input, Output>;
    insert: Query<Input, Output>;
    update: Query<Input, Output>;
    delete: Query<Input, Output>;
}

class Procedure<Input, Output> implements ProcedureMethods<Input, Output>{

    select(table: string, options: Options<Input>) {
        const queryStack = [selectQuery, includeQuery, whereQuery, orderQuery, limitQuery];
        const query = createQueryStack(queryStack, options, table);

        return { returns: withReturn(query), query };
    }
    insert(table: string, options: Options<Input>) {
        const queryStack = [insertQuery];
        const query = createQueryStack(queryStack, options, table);

        return { returns: withReturn(query), query };
    }

    update(table: string, options: Options<Input>) {
        const queryStack = [updateQuery, whereQuery];
        const query = createQueryStack(queryStack, options, table);

        return { returns: withReturn(query), query };
    }

    delete(table: string, options: Options<Input>) {
        const queryStack = [deleteQuery, whereQuery];
        const query = createQueryStack(queryStack, options, table);

        return { returns: withReturn(query), query };
    }

}

const procedure = new Procedure();
export { procedure };