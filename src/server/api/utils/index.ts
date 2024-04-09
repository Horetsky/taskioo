"use server";

import db from "@/server/db";

import { UserModel } from "@/server/db/models/user";
import { ProfileModel } from "@/server/db/models/profile";

export async function getUserByEmail(email: string) {
    return db.user.findUnique({
        where: { email }
    }, UserModel.schema);
}

export async function getUserProfile(userId: string) {
    return db.profile.findUnique({
        where: { user_id: userId }
    }, ProfileModel.schema);
}
