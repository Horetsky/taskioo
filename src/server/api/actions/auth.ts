"use server";

import bcrypt from "bcryptjs";
import db from "@/server/db";
import { procedure } from "@/server/utils/procedure";
import { action, Response } from "@/lib/action";
import { signupFormSchema } from "@/app/(auth)/_components/signup-form/validation";

export const createUser = action(signupFormSchema, async (data) => {

    const { password, email} = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.getByEmail(email);
    if(existingUser) {
        return new Response().error("USER_ALREADY_EXIST");
    }

    const createUserQuery = db.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    await procedure(createUserQuery).returns();

    return new Response().success("Success");
});