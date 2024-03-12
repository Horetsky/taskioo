import { z } from "zod";

export const requiredString = (message?: string) =>
    z.string().min(1, message ?? "Required");

export const fileUploadSchema = z.object({
    file: z.any(),
    type: z.string(),
});