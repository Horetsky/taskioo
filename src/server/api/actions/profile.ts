"use server";

import { action } from "@/lib/action";
import {
    completeProfileFormSchema
} from "@/app/(profile)/(complete)/complete-profile/_components/complete-profile-form/validation";
import db from "@/server/db";
import { ProfileModel } from "@/server/db/models/profile";

export const completeProfile = action(completeProfileFormSchema, async ({ input, ctx }) => {

    const session = ctx.session;

    if(!session || !session.user) {
        throw new Error("Session has expired. Try to log in again");
    }

    const dbProfile = await db.profile.findUnique({
        where: { username: input.username },
        select: { username: true }
    }, ProfileModel.schema);

    if(dbProfile) {
        throw new Error("The provided username is already in use.");
    }

    return await db.profile.create({
        data: {
            user_id: session.user.userId,
            ...input
        },
        returns: "*"
    }, ProfileModel.schema);
});