import { useForm } from "react-hook-form";
import { type UseFormHookReturn } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { completeProfileFormSchema,  type CompleteProfileFormValue } from "./validation";
import { useAction } from "@/lib/action/hooks";
import { useToaster } from "@/components/toaster";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { completeProfile } from "@/server/api/actions/profile";

export function useCompleteProfileForm(): UseFormHookReturn<CompleteProfileFormValue> {

    const toast = useToaster();
    const router = useRouter();
    const { update: updateSession } = useSession();

    const {
        execute,
        loading
    } = useAction(completeProfile, {
        onError(e) {
            toast.error(e.message);
        },
        async onSuccess(data) {
            if(data) {
                await updateSession({
                    profile: data
                });
                router.replace("/dashboard");
            }
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