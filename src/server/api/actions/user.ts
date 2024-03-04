"use server";

import { action } from "@/lib/safe-action";

import { signupFormSchema } from "@/app/(auth)/_components/signup-form/useSignupForm";
import db from "@/server/db";

export const createUser = action(signupFormSchema, async (data) => {

});