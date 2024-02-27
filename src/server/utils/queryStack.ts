/* eslint-disable @typescript-eslint/no-explicit-any */

type QueryFunc = (object: any, table: string, query: string) => string;
function createQueryStack(
    queries: QueryFunc[],
    options: any,
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