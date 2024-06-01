import { z } from "zod";

export const requiredString = (message?: string) =>
    z.string().min(1, message ?? "Required");

export const taskPriority = z.union([
    z.literal("LOWEST"),
    z.literal("LOW"),
    z.literal("MEDIUM"),
    z.literal("HIGH"),
    z.literal("HIGHEST"),
]);

export const teamMemberRole = z.union([
    z.literal("EXECUTOR"),
    z.literal("MAINTAINER"),
    z.literal("OWNER"),
]);