"use client";

import { z } from "zod";
import { type UseFormHookReturn } from "@/types";
import { requiredString } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/server/api";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

export const signupFormSchema = z.object({
    email: requiredString("Email is required").email("Email format is not valid"),
    password: requiredString("Password is required"),
    agreement:
        z.boolean()
            .refine(val => val, "Agreement is required")
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;

export function useSignupForm(): UseFormHookReturn<SignupFormValues> {

    const router = useRouter();

    const {
        execute,
        result,
        status
    } = useAction(createUser, {
        onSuccess(data, input) {
            router.push(`/login?user=${input.email}`);
        }
    });

    const defaultValues: SignupFormValues = {
        email: "",
        password: "",
        agreement: false
    };

    const form = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: zodResolver(signupFormSchema),
    });

    const handleSubmit = form.handleSubmit(execute);

    return {
        form,
        handleSubmit,
        loading: status === "executing",
        error: result.serverError
    };
}