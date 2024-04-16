"use server";

import { action } from "@/lib/action";
import { newProjectFormSchema } from "@/app/(main)/projects/_components/new-project-form/validation";
import db from "@/server/db";
import { revalidatePath } from "next/cache";

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