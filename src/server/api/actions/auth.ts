"use server";

import bcrypt from "bcryptjs";
import db from "@/server/db";
import { action } from "@/lib/safe-action";
import { signupFormSchema } from "@/app/(auth)/_components/signup-form/useSignupForm";
import { loginFormSchema } from "@/app/(auth)/_components/login-form/useLoginForm";
import { procedure } from "@/server/utils/procedure";

export const createUser = action(signupFormSchema, async (data) => {

    const { password, email} = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.getByEmail(email);
    if(existingUser) {
        throw new Error("USER_ALREADY_EXIST");
    }

    const createUserQuery = db.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });

    await procedure(createUserQuery).returns();
});

export const loginUser = action(loginFormSchema, async (data) => {

});