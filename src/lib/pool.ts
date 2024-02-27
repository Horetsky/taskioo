import { Pool, type QueryResultRow } from "pg";

const connectionString = process.env.DATABASE_URL;
// Creates a global connection pool
const pool = new Pool({
    connectionString
});

export const postgres = <Result extends QueryResultRow>(
    text: string,
    params: unknown[] = []
) => {
    return pool.query<Result>(text, params);
};