import { type Options } from "@/server/db/types";

export function selectQuery<T>(
    { select }: Options<T>,
    table: string,
    prevQuery: string
) {
    if(!select) return `SELECT * FROM "${table}"`;

    const entries =
        Object.entries(select).filter(([_, value]) => value);
    if(entries.length === 0) return prevQuery;
    const fields = entries.map(([key]) => key);

    return `SELECT ${fields.join(", ")} FROM "${table}"`;
}

export function insertQuery<T>(
    { data }: Options<T>,
    table: string,
    prevQuery: string
) {
    if(!data) return prevQuery;

    const entries =
        Object.entries(data).filter(([_, value]) => value);
    if(entries.length === 0) return prevQuery;

    const fields = entries.map(([key]) => key).join(", ");
    const values = entries.map(([_, value]) => `'${value}'`).join(", ");

    return `INSERT INTO "${table}" (${fields}) VALUES (${values})`;
}

export function returnsQuery<T>(
    { returns }: Options<T>,
    table: string,
    prevQuery: string
) {
    if(!returns) return prevQuery;

    if(typeof returns === "string") return prevQuery.concat(" RETURNING *");

    const entries =
        Object.entries(returns).filter(([_, value]) => value);
    if(entries.length === 0) return prevQuery;

    const fields = entries.map(([key, value]) => {
        if(value) return key;
    }).join(", ");

    return prevQuery.concat(` RETURNING ${fields}`);
}

export function updateQuery<T>(
    { data }: Options<T>,
    table: string,
    prevQuery: string
) {
    if(!data) return prevQuery;

    const dataEntries =
        Object.entries(data).filter(([_, value]) => value);
    if(dataEntries.length === 0) return prevQuery;

    const values = dataEntries.map(([key, value]) => `"${key}" = '${value}'`).join(", ");

    return `UPDATE "${table}" SET ${values}`;
}

export function deleteQuery<T>(
    { select }: Options<T>,
    table: string,
    prevQuery: string
) {
    return `DELETE FROM "${table}"`;
}

export function includeQuery<T>(
    { include }: Options<T>,
    table: string,
    prevQuery: string
) {
    if(!include) return prevQuery;

    const entries =
        Object.entries(include).filter(([_, value]) => value);
    if(entries.length === 0) return prevQuery;

    return entries.reduce((acc, [key, value]) => {
        return acc.concat(` JOIN "${key}" ON "${table}".id = "${key}".${value}`);
    }, prevQuery);
}

export function whereQuery<T>(
    { where }: Options<T>,
    table: string,
    prevQuery: string
) {
    if(!where) return prevQuery;

    const entries =
        Object.entries(where).filter(([_, value]) => value);
    if(entries.length === 0) return prevQuery;

    return entries.reduce((acc, [key, value], index) => {
        if(index % 2 === 0) {
            return acc.concat(` WHERE "${table}".${key} = '${value}'`);
        } else {
            return acc.concat(` AND "${table}".${key} = '${value}'`);
        }
    }, prevQuery);
}

export function orderQuery<T>(
    { order }: Options<T>,
    table: string,
    prevQuery: string
) {
    if(!order) return prevQuery;

    const entries =
        Object.entries(order).filter(([_, value]) => value);
    if(entries.length === 0) return prevQuery;

    return entries.reduce((acc, [key, value]) => {
        return acc.concat(` ORDER BY ${key} ${value}`);
    }, prevQuery);
}

export function limitQuery<T>(
    { limit }: Options<T>,
    table: string,
    prevQuery: string
) {
    if(!limit) return prevQuery;
    return prevQuery.concat(` LIMIT ${limit}`);
}