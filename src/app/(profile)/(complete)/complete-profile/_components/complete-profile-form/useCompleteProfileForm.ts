import { useForm } from "react-hook-form";
import { type UseFormHookReturn } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { completeProfileFormSchema,  type CompleteProfileFormValue } from "./validation";
import { useAction } from "@/lib/action/hooks";
import { completeProfile } from "@/server/actions/profile";
import { useToaster } from "@/components/toaster";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function useCompleteProfileForm(): UseFormHookReturn<CompleteProfileFormValue> {

    const toast = useToaster();
    const router = useRouter();
    const { update: updateSession } = useSession();

    const {
        execute,
        loading
    } = useAction(completeProfile, {
        onError(res) {
            toast.error(res.message);
        },
        async onSuccess() {
            await updateSession();
            router.replace("/dashboard");
        }
    });

    const defaultValues: CompleteProfileFormValue = {
        name: "",
        surname: "",
        username: "",
        picture: ""
    };

    const form = useForm({
        defaultValues,
        mode: "onSubmit",
        resolver: zodResolver(completeProfileFormSchema)
    });

    const handleSubmit = form.handleSubmit(execute);

    return {
        form,
        handleSubmit,
        loading
    };
}