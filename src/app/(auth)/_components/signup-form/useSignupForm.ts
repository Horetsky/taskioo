import { z } from "zod";
import { type AuthServerError, type UseFormHookReturn } from "@/types";
import { requiredString } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/server/api";
import { useAction } from "next-safe-action/hooks";

export const signupFormSchema = z.object({
    email: requiredString("Email is required").email("Email format is not valid"),
    password: requiredString("Password is required"),
    agreement:
        z.boolean()
            .refine(val => val, "Agreement is required")
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;

export function useSignupForm(): UseFormHookReturn<SignupFormValues, AuthServerError> {

    const { execute, result, status } = useAction(createUser);

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
        status,
        loading: status === "executing",
        handleSubmit,
        result: result.data
    };
}