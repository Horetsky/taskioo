"use server";

import db from "@/server/db";
import { procedure } from "@/server/procedure";

import { UserModel } from "@/server/db/models/user";
import { ProfileModel } from "@/server/db/models/profile";

import userSchema = UserModel.userSchema;
import profileSchema = ProfileModel.profileSchema;

export async function getUserByEmail(email: string) {
    const q = db.user.select({
        where: { email }
    });
    return await procedure(q).returns(
        userSchema.optional()
    );
}

export async function getUserProfile(userId: string) {
    const q = db.profile.select({
        where: { user_id: userId }
    });
    return await procedure(q).returns(
        profileSchema.optional()
    );
}
