import { z } from "zod";
import { requiredString, taskPriority } from "@/lib/zod";

export const newTaskFormSchema = z.object({
    title: requiredString(),
    description: z.string().optional(),
    priority: taskPriority,
    assignee_id: z.string().optional(),
    list_id: requiredString(),
    deadline: z.date().optional()
});

export type NewTaskFormValues = z.infer<typeof newTaskFormSchema>