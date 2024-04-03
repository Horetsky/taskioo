"use server";

import bcrypt from "bcryptjs";
import db from "@/server/db";
import { procedure } from "@/server/procedure";
import { action } from "@/lib/action";
import { signupFormSchema } from "@/app/(auth)/_components/signup-form/validation";
import { z } from "zod";

export const createUser = action(signupFormSchema, async (input) => {

    const { password, email} = input;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.getByEmail(email);
    if(existingUser) {
        throw new Error("User with provided email already exist.");
    }

    const createUserQuery = db.user.create({
        data: {
            email,
            password: hashedPassword
        },
        returns: {
            id: true,
            email: true,
        }
    });

    const newUser = await procedure(createUserQuery).returns(
        z.object({
            id: z.string(),
            email: z.string()
        })
    );

    const createAreaQuery = db.area.create({
        data: {
            title: "New area",
            user_id: newUser.id
        }
    });

    await procedure(createAreaQuery).returns();
});