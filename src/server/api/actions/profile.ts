"use server";

import { action } from "@/lib/action";
import {
    completeProfileFormSchema
} from "@/app/(profile)/(complete)/complete-profile/_components/complete-profile-form/validation";
import db from "@/server/db";
import { procedure } from "@/server/procedure";

export const completeProfile = action(completeProfileFormSchema, async ({ input, ctx }) => {

    const session = ctx.session;

    if(!session || !session.user) {
        throw new Error("Session has expired. Try to log in again");
    }

    const dbProfileQuery = db.profile.select({
        where: { username: input.username },
        select: { username: true }
    });

    const dbProfile = await procedure(dbProfileQuery).returns();

    if(dbProfile) {
        throw new Error("The provided username is already in use.");
    }

    const completeProfileQuery = db.profile.create({
        data: {
            user_id: session.user.userId,
            ...input
        }
    });

    await procedure(completeProfileQuery).returns();
});