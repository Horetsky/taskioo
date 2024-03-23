import type { Options } from "../types";

function selectQuery<Schema>({ select }: Options<Schema>, table: string, query: string) {
    if(!select) return `SELECT * FROM "${table}"`;

    const entries =
        Object.entries(select).filter(([_, value]) => value);
    if(entries.length === 0) return query;
    const fields = entries.map(([key]) => key);

    return `SELECT ${fields.join(", ")} FROM "${table}"`;
}

function insertQuery<Schema>({ data }: Options<Schema>, table: string, query: string) {
    if(!data) return query;

    const entries =
        Object.entries(data).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    const fields = entries.map(([key]) => key).join(", ");
    const values = entries.map(([_, value]) => `'${value}'`).join(", ");

    return `INSERT INTO "${table}" (${fields}) VALUES (${values})`;
}

function returnsQuery<Schema>({ returns }: Options<Schema>, table: string, query: string) {
    if(!returns) return query;

    const entries =
        Object.entries(returns).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    const fields = entries.map(([key, value]) => {
        if(value) return key;
    }).join(", ");

    return query.concat(` RETURNING ${fields}`);
}

function updateQuery<Schema>({ data }: Options<Schema>, table: string, query: string) {
    if(!data) return query;

    const dataEntries =
        Object.entries(data).filter(([_, value]) => value);
    if(dataEntries.length === 0) return query;

    const values = dataEntries.map(([key, value]) => `"${key}" = '${value}'`).join(", ");

    return `UPDATE "${table}" SET ${values}`;
}

function deleteQuery<Schema>({}: Options<Schema>, table: string, query: string) {
    return `DELETE FROM "${table}"`;
}

function includeQuery<Schema>({ include }: Options<Schema>, table: string, query: string) {
    if(!include) return query;

    const entries =
        Object.entries(include).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    return entries.reduce((acc, [key, value]) => {
        return acc.concat(` JOIN "${key}" ON "${table}".id = "${key}".${value}`);
    }, query);
}

function whereQuery<Schema>({ where }: Options<Schema>, table: string, query: string) {
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

function orderQuery<Schema>({ order }: Options<Schema>, table: string, query: string) {
    if(!order) return query;

    const entries =
        Object.entries(order).filter(([_, value]) => value);
    if(entries.length === 0) return query;

    return entries.reduce((acc, [key, value]) => {
        return acc.concat(` ORDER BY ${key} ${value}`);
    }, query);
}

function limitQuery<Schema>({ limit }: Options<Schema>, table: string, query: string) {
    if(!limit) return query;
    return query.concat(` LIMIT ${limit}`);
}

export {
    selectQuery,
    insertQuery,
    updateQuery,
    returnsQuery,
    deleteQuery,
    includeQuery,
    whereQuery,
    orderQuery,
    limitQuery
};