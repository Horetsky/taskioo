import { z } from "zod";
import { requiredString } from "@/lib/zod";

export const completeProfileFormSchema = z.object({
    name: requiredString("Name is required"),
    surname: requiredString("Surname is required"),
    picture: requiredString("Profile picture is required"),
});

export type CompleteProfileFormValue = z.infer<typeof completeProfileFormSchema>;