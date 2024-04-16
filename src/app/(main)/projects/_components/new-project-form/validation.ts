import { z } from "zod";

export const newProjectFormSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
});

export type NewProjectFormValues = z.infer<typeof newProjectFormSchema>