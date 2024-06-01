"use server";

import { action } from "@/lib/action";
import db from "@/server/db";
import { revalidatePath } from "next/cache";
import { ListModel } from "@/server/db/models/list";
import { TaskModel } from "@/server/db/models/task";
import { newProjectFormSchema } from "@/components/_modules/project/new-project-form/validation";

export const createList = action(newProjectFormSchema, async ({ input, ctx }) => {

    const {
        profileId,
        workspaceId,
        teamId
    } = ctx.session.user;

    if(!workspaceId) {
        throw new Error("You must create a workspace before creating the project.");
    }

    if(!profileId) {
        throw new Error("You must create a profile before creating the project.");
    }

    await db.list.create({
        data: {
            ...input,
            team_id: teamId,
            owner_id: profileId,
            area_id: workspaceId
        }
    });

    revalidatePath("/projects");
});

export const getUserLists = action(null, async ({ ctx }) => {
    const {
        profileId
    } = ctx.session.user;

    return await db.list.findMany({
        where: {
            owner_id: profileId,
        }
    }, ListModel.schema);
});

export const getUserTaskLists = action(null, async ({ ctx }) => {
    const {
        profileId
    } = ctx.session.user;


    const userLists = await db.list.findMany({
        where: {
            owner_id: profileId,
        }
    }, ListModel.schema);


    const tasksPromises = userLists.map(async list => {
        const tasks = await db.task.findMany({
            where: {
                list_id: list.id,
            }
        }, TaskModel.schema);

        return { list, tasks };
    });

    return await Promise.all(tasksPromises) as ListModel.TaskListValue;
});
