/* eslint-disable @typescript-eslint/no-explicit-any */

import { z, type ZodType } from "zod";

type Order = "DESC" | "ASC";
type Output<T extends ZodType> = T["_output"];

export type Options<T extends ZodType> = Partial<{
    where: Partial<Output<T>>;
    returns: Partial<
        Record<keyof T["_output"], boolean>
    >;
    data: Partial<T["_output"]>
    select: Partial<
        Record<keyof T["_output"], boolean>
    >;
    include: Partial<{
        [key: string]: string;
    }>;
    order: Partial<
        Record<keyof T["_output"], Order>
    >;
    limit: number;
}>

export type QueryOptions<T extends ZodType> = Omit<Options<T>, "data">;
export type UniqueQueryOptions<T extends ZodType> = QueryOptions<T> & {
    where: Options<T>["where"]
};

export type MutateOptions<T extends ZodType> = {
    where?: Options<T>["where"];
    returns?: Options<T>["returns"];
    data: Options<T>["data"];
}

export type Methods<T extends ZodType> = {
    findUnique: (options: UniqueQueryOptions<T>) => unknown;
    findMany: (options: QueryOptions<T>) => unknown;
    create: (options: MutateOptions<T>) => any;
    update: (options: MutateOptions<T>) => any;
}