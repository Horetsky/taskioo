/* eslint-disable @typescript-eslint/no-explicit-any */

import { type ZodType } from "zod";
import type { QueryResult, QueryResultRow } from "pg";

type Order = "DESC" | "ASC";
type Output<T extends ZodType> = T["_output"];

export type MethodResult = Promise<QueryResult<QueryResultRow>>;

export type QueryOptions<T extends ZodType> =
    Partial<{
        where: Partial<Output<T>>;
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
export type UniqueQueryOptions<T extends ZodType> =
    QueryOptions<T> & {
    where: Partial<Output<T>>;
}
export type MutateOptions<T extends ZodType> = {
    data: Partial<T["_output"]>
}

export type Methods<T extends ZodType> = {
    findUnique: (options: UniqueQueryOptions<T>) => any;
    findMany: (options: QueryOptions<T>) => MethodResult;
    create: (options: MutateOptions<T>) => MethodResult;
}