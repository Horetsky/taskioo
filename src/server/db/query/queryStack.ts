import { type Options, type QueryFunction } from "@/server/db/types";
function createQueryStack<T>(
    templates: QueryFunction.Type<T>[],
    options: Options<T>,
    table: string,
    query?: string,
    index = 0
): string {
    const currentFunction = templates[index];

    if(currentFunction) {
        const newQuery = currentFunction(options, table, query ?? "");
        return createQueryStack(templates, options, table, newQuery, index + 1);
    }

    return query || "";
}

export { createQueryStack };