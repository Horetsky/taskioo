"use server";

import bcrypt from "bcryptjs";
import db from "@/server/db";
import { action } from "@/lib/action";
import { signupFormSchema } from "@/app/(auth)/_components/signup-form/validation";
import { getUserByEmail } from "@/server/api/utils";
import { UserModel } from "@/server/db/models/user";

export const createUser = action(signupFormSchema, async ({ input }) => {

    const { password, email} = input;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if(existingUser) {
        throw new Error("User with provided email already exist.");
    }

    const newUser =  await db.user.create({
        data: {
            email,
            password: hashedPassword
        },
        returns: "*"
    }, UserModel.schema);

    await db.area.create({
        data: {
            title: "New area",
            user_id: newUser.id
        }
    });
});