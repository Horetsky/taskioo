import { type UseFormHookReturn } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/lib/action/hooks";
import { signupFormSchema, type SignupFormValues } from "./validation";
import { useLogin } from "@/app/(auth)/_components/login-form/useLogin";
import { createUser } from "@/server/actions/auth";

export function useSignupForm(): UseFormHookReturn<SignupFormValues> {

    const { handleLogin, loading: loginLoading } = useLogin();

    const {
        execute,
        loading,
        error,
    } = useAction(createUser, {
        async onSuccess(_, input) {
            await handleLogin(input);
        }
    });

    const defaultValues: SignupFormValues = {
        email: "",
        password: "",
        agreement: false
    };

    const form = useForm({
        defaultValues,
        mode: "onSubmit",
        resolver: zodResolver(signupFormSchema),
    });

    const handleSubmit = form.handleSubmit(execute);

    return {
        form,
        handleSubmit,
        loading: loading || loginLoading,
        error: error?.message
    };
}