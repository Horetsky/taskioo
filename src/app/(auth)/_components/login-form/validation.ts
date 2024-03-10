import { z } from "zod";
import { requiredString } from "@/lib/zod";

export const loginFormSchema = z.object({
    email: requiredString("Email is required"),
    password: requiredString("Password is required")
});
export type LoginFormValues = z.infer<typeof loginFormSchema>;