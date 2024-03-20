import { type UseFormHookReturn } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/lib/action/hooks";
import { createUser } from "@/server/actions/auth";
import { useRouter } from "next/navigation";
import { signupFormSchema, type SignupFormValues } from "./validation";
import { useToaster } from "@/components/toaster";

export function useSignupForm(): UseFormHookReturn<SignupFormValues> {

    const router = useRouter();
    const toast = useToaster();

    const {
        execute,
        loading,
        error,
    } = useAction(createUser, {
        onSuccess() {
            toast.success({ title: "Log in to your account.", description: "Your account has been created successfully."});
            router.replace("/login");
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
        loading,
        error
    };
}