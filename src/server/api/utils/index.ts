"use server";

import db from "@/server/db";

import { UserModel } from "@/server/db/models/user";
import { ProfileModel } from "@/server/db/models/profile";
import { AreaModel } from "@/server/db/models/area";

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

export async function getWorkspacesBuUserId(userId: string) {
    return db.area.findMany({
        where: { user_id: userId }
    }, AreaModel.schema);
}
