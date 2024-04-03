"use server";

import { action } from "@/lib/action";
import {
    completeProfileFormSchema
} from "@/app/(profile)/(complete)/complete-profile/_components/complete-profile-form/validation";
import { getSession } from "@/server/auth";
import db from "@/server/db";
import { procedure } from "@/server/procedure";

export const completeProfile = action(completeProfileFormSchema, async (data) => {

    const session = await getSession();

    if(!session || !session.user) {
        throw new Error("Session has expired. Try to log in again");
    }

    const dbProfile = await db.profile.getByUsername(data.username);

    if(dbProfile) {
        throw new Error("The provided username is already in use.");
    }

    const completeProfileQuery = db.profile.create({
        data: {
            user_id: session.user.userId,
            ...data
        }
    });

    await procedure(completeProfileQuery).returns();
});