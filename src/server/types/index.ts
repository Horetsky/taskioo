/* eslint-disable @typescript-eslint/no-explicit-any */

type Order = "DESC" | "ASC";

export type Options<T> = Partial<{
    where: Partial<T>;
    returns: Partial<
        Record<keyof T, boolean>
    >;
    data: Partial<T>
    select: Partial<
        Record<keyof T, boolean>
    >;
    include: Partial<{
        [key: string]: string;
    }>;
    order: Partial<
        Record<keyof T, Order>
    >;
    limit: number;
}>

export type SelectOptions<T> = Omit<Options<T>, "data">;
export type SelectUniqueOptions<T> = SelectOptions<T> & {
    where: Options<T>["where"]
};
export type DeleteOptions<T> = Pick<Options<T>, "where">

export type MutateOptions<T> = {
    where?: Options<T>["where"];
    returns?: Options<T>["returns"];
    data: Options<T>["data"];
}

export type Methods<T> = {
    findUnique: (options: SelectUniqueOptions<T>) => unknown;
    findMany: (options: SelectOptions<T>) => unknown;
    create: (options: MutateOptions<T>) => unknown;
    update: (options: MutateOptions<T>) => unknown;
    delete: (options: DeleteOptions<T>) => unknown;
}