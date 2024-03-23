import type { ZodSchema } from "zod";
import { pg } from "@/lib/pool";

// type Returns<Output = any> = (schema?: ZodSchema<Output>) => Promise<Output>
// export type Procedure = (query: string) => { returns: Returns }

export function procedure(query: string) {
    async function returns<Output = any>(schema?: ZodSchema<Output>): Promise<Output> {
        const result = await pg(query);

        if(schema) return schema.parse(result.rows[0]);

        return result.rows[0] as Output;
    }

    return { returns };
}