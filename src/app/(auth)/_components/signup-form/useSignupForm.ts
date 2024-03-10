import { type UseFormHookReturn } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/server/api";
import { useAction } from "@/lib/action/hooks";
import { signupFormSchema, type SignupFormValues } from "./validation";

export function useSignupForm(): UseFormHookReturn<SignupFormValues> {

    const {
        execute,
        loading,
        error,
    } = useAction(createUser);

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
        loading,
        error
    };
}