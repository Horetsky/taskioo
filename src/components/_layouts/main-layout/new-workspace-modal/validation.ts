import { z } from "zod";
import { requiredString } from "@/lib/zod";

export const workspaceFormSchema = z.object({
    title: requiredString()
});

export type WorkspaceFormValues = z.infer<typeof workspaceFormSchema>;