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

type Method<T> = (options: Options<T>) => string;

type ProcedureMethods<Input> = {
    select: Method<Input>;
    insert: Method<Input>;
    update: Method<Input>;
    delete: Method<Input>;
}

class Query<Input> implements ProcedureMethods<Input>{

    protected input: ZodSchema<Input>;
    protected table: string;

    constructor(table: string, input: ZodSchema<Input>) {
        this.table = table;
        this.input = input;
    }

    select(options: Options<Input>) {
        const queryStack = [selectQuery, includeQuery, whereQuery, orderQuery, limitQuery];
        return createQueryStack(queryStack, options, this.table);
    }
    insert(options: Options<Input>) {
        const queryStack = [insertQuery];
        return createQueryStack(queryStack, options, this.table);
    }

    update(options: Options<Input>) {
        const queryStack = [updateQuery, whereQuery];
        return createQueryStack(queryStack, options, this.table);
    }

    delete(options: Options<Input>) {
        const queryStack = [deleteQuery, whereQuery];
        return createQueryStack(queryStack, options, this.table);
    }
}

export { Query };