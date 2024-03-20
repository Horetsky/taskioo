"use server";

import { action, Response } from "@/lib/action";
import {
    completeProfileFormSchema
} from "@/app/(profile)/complete-profile/_components/complete-profile-form/validation";
import { getSession } from "@/server/auth";
import db from "@/server/db";
import { procedure } from "@/server/utils/procedure";

export const completeProfile = action(completeProfileFormSchema, async (data) => {

    const session = await getSession();

    if(!session || !session.user) {
        throw new Error("Session has expired. Try to log in again");
    }

    const completeProfileQuery = db.profile.create({
        data: {
            user_id: session.user.userId,
            ...data
        }
    });

    await procedure(completeProfileQuery).returns();

    return new Response().success();
});