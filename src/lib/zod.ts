import { z } from "zod";

export const requiredString = (message?: string) =>
    z.string().min(1, message ?? "Required");