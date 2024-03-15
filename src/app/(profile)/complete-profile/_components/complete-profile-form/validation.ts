import { z } from "zod";
import { requiredString } from "@/lib/zod";
import db from "@/server/db";

export const completeProfileFormSchema = z.object({
    name: requiredString("Name is required"),
    surname: requiredString("Surname is required"),
    username: requiredString("Username is required"),
    picture: requiredString("Profile picture is required")
});

export type CompleteProfileFormValue = z.infer<typeof completeProfileFormSchema>;