import { type UseFormHookReturn } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/lib/action/hooks";
import { createUser } from "@/server/actions/auth";
import { useRouter } from "next/navigation";
import { signupFormSchema, type SignupFormValues } from "./validation";

export function useSignupForm(): UseFormHookReturn<SignupFormValues> {

    const router = useRouter();

    const {
        execute,
        loading,
        error,
    } = useAction(createUser, {
        onSuccess() {
            router.push("/login");
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