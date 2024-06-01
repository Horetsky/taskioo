import { z } from "zod";
import { Query } from "@/server/db/query";
import { TaskModel } from "@/server/db/models/task";

export namespace ListModel {
    export const schema = z.object({
        id: z.string(),
        title: z.string(),
        subtitle: z.string(),
        owner_id: z.string(),
        area_id: z.string(),
        team_id: z.string().optional().nullable()
    });

    export const taskList = z.array(z.object({
        list: schema,
        tasks: z.array(TaskModel.schema),
    }));

    export type SchemaValue = z.infer<typeof schema>;
    export type TaskListValue = z.infer<typeof taskList>;

    export class List extends Query<SchemaValue> {
        constructor() {
            super("list", schema);
        }
    }
}