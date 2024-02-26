import { type ZodType } from "zod";

type Output<T extends ZodType> = T["_output"];
type Order = "DESC" | "ASC";

export type GetOptions<T extends ZodType> =
    Partial<{
    where: Partial<Output<T>>;
    select: Partial<Record<keyof T["_output"], boolean>>;
    include: Partial<{
        [key: string]: string;
    }>;
    order: Partial<Record<keyof T["_output"], Order>>;
    limit: number;
}>
export type PostOptions<T extends ZodType> = {
    data: T["_output"]
}