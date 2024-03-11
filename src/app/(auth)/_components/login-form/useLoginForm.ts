import { type UseFormHookReturn } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormValues } from "./validation";
import { useLogin } from "./useLogin";

export function useLoginForm(): UseFormHookReturn<LoginFormValues> {

    const { handleLogin, loading, error } = useLogin();

    const defaultValues: LoginFormValues = {
        email: "",
        password: ""
    };

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues,
        mode: "onBlur"
    });

    const handleSubmit = form.handleSubmit(handleLogin);

    return {
        form,
        handleSubmit,
        loading,
        error
    };
}