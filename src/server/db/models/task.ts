import { z } from "zod";
import { Query } from "@/server/db/query";
import { taskPriority } from "@/lib/zod";

export namespace TaskModel {
    export const schema = z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional().nullable(),
        priority: taskPriority,
        creator_id: z.string(),
        assignee_id: z.string().optional().nullable(),
        list_id: z.string(),
        createdAt: z.number().optional().nullable(),
        deadline: z.date().optional().nullable()
    });

    export type SchemaValue = z.infer<typeof schema>;

    export class Task extends Query<SchemaValue> {
        constructor() {
            super("task", schema);
        }
    }
}