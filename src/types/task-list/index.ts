import { type ListModel } from "@/server/db/models/list";
import { type TaskModel } from "@/server/db/models/task";

export type TaskList = ListModel.SchemaValue & {
    tasks: TaskModel.SchemaValue[];
}