/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Options } from "@/server/types";
import { type ZodType } from "zod";


type QueryFunc = (object: any, table: string, query: string) => string;
function createQueryStack<T extends ZodType>(
    queries: QueryFunc[],
    options: Options<T>,
    table: string,
    query: string,
    index = 0
): string {
    const currentFunction = queries[index];

    if(currentFunction) {
        const newQuery = currentFunction(options, table, query);
        return createQueryStack(queries, options, table, newQuery, index + 1);
    }

    return query;
}

export { createQueryStack };