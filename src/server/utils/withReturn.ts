/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ZodSchema } from "zod";
import { postgres } from "@/lib/pool";

export function withReturn(query: string) {
    return async function<Output = any>(schema?: ZodSchema<Output>) {
        const result = await postgres(query);

        if(schema) return schema.parse(result.rows);
        return result.rows;
    };
}