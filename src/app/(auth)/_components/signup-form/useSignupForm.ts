import { z } from "zod";
import { type UseFormHookReturn } from "@/types";
import { requiredString } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/server/api";

export const signupFormSchema = z.object({
    email: requiredString("Email is required"),
    password: requiredString("Password is required"),
    agreement:
        z.boolean()
            .refine(val => val, "Agreement is required")
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;

export function useSignupForm(): UseFormHookReturn<SignupFormValues> {

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

    const handleSubmit = form.handleSubmit((data) => createUser(data));

    return { form, handleSubmit };
}