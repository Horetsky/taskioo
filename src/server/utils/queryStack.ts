import type { ZodType } from "zod";
import type { GetOptions } from "@/server/types";

type QueryFunc<Schema extends ZodType> = (object: GetOptions<Schema>, table: string, query: string) => string;
function createQueryStack<Schema extends ZodType>(
    queries: QueryFunc<Schema>[],
    options: GetOptions<Schema>,
    table: string,
    q: string,
    index = 0
): string {
    const currentFunction = queries[index];

    if(currentFunction) {
        const newQuery = currentFunction(options, table, q);
        return createQueryStack(queries, options, table, newQuery, index + 1);
    }

    return q;
}

export { createQueryStack };