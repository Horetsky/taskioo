import { z } from "zod";
import { requiredString } from "@/lib/zod";

export const signupFormSchema = z.object({
    email: requiredString("Email is required").email("Email format is not valid"),
    password: requiredString("Password is required"),
    agreement:
        z.boolean()
            .refine(val => val, "Agreement is required")
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;