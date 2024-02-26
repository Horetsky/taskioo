import { Pool, type QueryResultRow } from "pg";

const connectionString = process.env.DATABASE_URL;
// Creates a global connection pool
const pool = new Pool({
    connectionString
});

export const db = <Result extends QueryResultRow>(
    text: string,
    params: unknown[] = []
) => {
    return pool.query<Result>(text, params);
};