import { type Options } from "../types";

type QueryFunc<T> = (object: Options<T>, table: string, query: string) => string;
function createQueryStack<T>(
    queries: QueryFunc<T>[],
    options: Options<T>,
    table: string,
    query?: string,
    index = 0
): string {
    const currentFunction = queries[index];

    if(currentFunction) {
        const newQuery = currentFunction(options, table, query ?? "");
        return createQueryStack(queries, options, table, newQuery, index + 1);
    }

    return query ?? "";
}

export { createQueryStack };