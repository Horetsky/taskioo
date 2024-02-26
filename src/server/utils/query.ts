import type { ZodType } from "zod";
import type { GetOptions } from "@/server/types";

function selectQuery<Schema extends ZodType>({ select }: GetOptions<Schema>, table: string, query: string) {
    if(!select) return query;

    const entries =
        Object.entries(select).filter(([_, value]) => value);
    if(entries.length === 0) return query;
    const fields = entries.map(([key]) => key);

    return `SELECT ${fields.join(", ")} FROM "${table}"`;
}

function includeQuery<Schema extends ZodType>({ include }: GetOptions<Schema>, table: string, query: string) {
    if(!include) return query;

    const entries =
        Object.entries(include).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    return entries.reduce((acc, [key, value]) => {
        return acc.concat(` JOIN "${key}" ON "${table}".id = "${key}".${value}`);
    }, query);
}

function whereQuery<Schema extends ZodType>({ where }: GetOptions<Schema>, table: string, query: string) {
    if(!where) return query;

    const entries =
        Object.entries(where).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    return entries.reduce((acc, [key, value], index) => {
        if(index % 2 === 0) {
            return acc.concat(` WHERE "${table}".${key} = ${value}`);
        } else {
            return acc.concat(` AND "${table}".${key} = ${value}`);
        }
    }, query);
}

function orderQuery<Schema extends ZodType>({ order }: GetOptions<Schema>, table: string, query: string) {
    if(!order) return query;

    const entries =
        Object.entries(order).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    return entries.reduce((acc, [key, value]) => {
        return acc.concat(` ORDER BY ${key} ${value}`);
    }, query);
}

function limitQuery<Schema extends ZodType>({ limit }: GetOptions<Schema>, table: string, query: string) {
    if(!limit) return query;
    return query.concat(` LIMIT ${limit}`);
}

export {
    selectQuery,
    includeQuery,
    whereQuery,
    orderQuery,
    limitQuery
};