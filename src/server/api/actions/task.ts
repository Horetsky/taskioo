"use server";

import { action } from "@/lib/action";
import db from "@/server/db";
import { newTaskFormSchema } from "@/components/_modules/tasks/new-task-form/validation";

export const createTask = action(newTaskFormSchema, async ({ input, ctx }) => {
    const creatorId = ctx.session.user.profileId;

    if(!creatorId) {
        throw new Error("Session has expired. Try to log in again");
    }

    await db.task.create({
        data: {
            ...input,
            creator_id: creatorId
        }
    });
});