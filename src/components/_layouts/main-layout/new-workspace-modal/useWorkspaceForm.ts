import { type UseFormHookReturn } from "@/types";
import { type WorkspaceFormValues, workspaceFormSchema } from "./validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/lib/action/hooks";
import { createWorkspace } from "@/server/api/actions/workspace";
import { useSession } from "next-auth/react";


export function useWorkspaceForm(onSuccessAction: () => void): UseFormHookReturn<WorkspaceFormValues> {

    const defaultValues: WorkspaceFormValues = {
        title: ""
    };

    const form = useForm({
        defaultValues,
        mode: "onSubmit",
        resolver: zodResolver(workspaceFormSchema),
    });

    const {
        update: updateSession
    } = useSession();

    const {
        execute,
        loading
    } = useAction(createWorkspace, {
        async onSuccess(data) {
            form.reset();
            if(data) {
                await updateSession({
                    user: {
                        workspaceId: data.id,
                    }
                });
            }
            onSuccessAction();
        }
    });

    const handleSubmit = form.handleSubmit(execute);

    return {
        form,
        loading,
        handleSubmit
    };
}