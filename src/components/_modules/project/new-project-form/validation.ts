import { z } from "zod";

export const newProjectFormSchema = z.object({
    title: z.string().min(1, "Required"),
    subtitle: z.string().min(1, "Required"),
});

export type NewProjectFormValues = z.infer<typeof newProjectFormSchema>