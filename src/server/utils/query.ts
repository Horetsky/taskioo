import type { ZodType } from "zod";
import type { QueryOptions, MutateOptions } from "@/server/types";

function selectQuery<Schema extends ZodType>({ select }: QueryOptions<Schema>, table: string, query: string) {
    if(!select) return `SELECT * FROM "${table}"`;

    const entries =
        Object.entries(select).filter(([_, value]) => value);
    if(entries.length === 0) return query;
    const fields = entries.map(([key]) => key);

    return `SELECT ${fields.join(", ")} FROM "${table}"`;
}

function insertQuery<Schema extends ZodType>({ data }: MutateOptions<Schema>, table: string, query: string) {
    if(!data) return query;

    const entries =
        Object.entries(data).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    const fields = entries.map(([key]) => key).join(", ");
    const values = entries.map(([_, value]) => `'${value}'`).join(", ");

    return `INSERT INTO "${table}" (${fields}) VALUES (${values})`;
}

function includeQuery<Schema extends ZodType>({ include }: QueryOptions<Schema>, table: string, query: string) {
    if(!include) return query;

    const entries =
        Object.entries(include).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    return entries.reduce((acc, [key, value]) => {
        return acc.concat(` JOIN "${key}" ON "${table}".id = "${key}".${value}`);
    }, query);
}

function whereQuery<Schema extends ZodType>({ where }: QueryOptions<Schema>, table: string, query: string) {
    if(!where) return query;

    const entries =
        Object.entries(where).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    return entries.reduce((acc, [key, value], index) => {
        if(index % 2 === 0) {
            return acc.concat(` WHERE "${table}".${key} = '${value}'`);
        } else {
            return acc.concat(` AND "${table}".${key} = '${value}'`);
        }
    }, query);
}

function orderQuery<Schema extends ZodType>({ order }: QueryOptions<Schema>, table: string, query: string) {
    if(!order) return query;

    const entries =
        Object.entries(order).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    return entries.reduce((acc, [key, value]) => {
        return acc.concat(` ORDER BY ${key} ${value}`);
    }, query);
}

function limitQuery<Schema extends ZodType>({ limit }: QueryOptions<Schema>, table: string, query: string) {
    if(!limit) return query;
    return query.concat(` LIMIT ${limit}`);
}

export {
    selectQuery,
    insertQuery,
    includeQuery,
    whereQuery,
    orderQuery,
    limitQuery
};