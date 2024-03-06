"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { action } from "@/lib/safe-action";
import bcrypt from "bcryptjs";

import { signupFormSchema } from "@/app/(auth)/_components/signup-form/useSignupForm";
import db from "@/server/db";
import { procedure } from "@/server/utils/procedure";
import { UserModel } from "@/server/db/models/user";
import userSchema = UserModel.userSchema;
import { z } from "zod";
import { type AuthServerError } from "@/server/types";
import { type ServerActionReturn } from "@/types";

export const createUser = action(signupFormSchema, async (data): Promise<ServerActionReturn<AuthServerError>> => {

    const { password, email} = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.getByEmail(email);
    if(existingUser) {
        return { error: "USER_ALREADY_EXIST" };
    }

    const createUser = db.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    await procedure(createUser).returns();

    return { success: "OK" };
});