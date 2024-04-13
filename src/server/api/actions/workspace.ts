"use server";

import { action } from "@/lib/action";
import { getWorkspacesBuUserId } from "@/server/api/utils";
import { workspaceFormSchema } from "@/components/_layouts/main-layout/new-workspace-modal/validation";
import { AreaModel } from "@/server/db/models/area";
import db from "@/server/db";
import { revalidatePath } from "next/cache";

export const getUserWorkspaces = action(null, async ({ ctx }) => {

    const {
        userId
    } = ctx.session.user;

    return getWorkspacesBuUserId(userId);

});

export const createWorkspace = action(workspaceFormSchema, async ({ input, ctx }) => {
    const {
        userId
    } = ctx.session.user;

    const newWorkspace = await db.area.create({
        data: {
            ...input,
            user_id: userId
        },
        returns: "*"
    }, AreaModel.schema);

    revalidatePath("/dashboard");
    return newWorkspace;
});