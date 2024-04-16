import { type UseFormHookReturn } from "@/types";
import {
    newProjectFormSchema,
    type NewProjectFormValues
} from "./validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/lib/action/hooks";
import { createList } from "@/server/api/actions/list";
import { useToaster } from "@/components/toaster";

export function useNewProjectForm(onSuccessAction: () => void): UseFormHookReturn<NewProjectFormValues> {

    const toast = useToaster();

    const {
        execute,
        loading,
    } = useAction(createList, {
        onSuccess() {
            onSuccessAction();
            form.reset();
        },
        onError(e) {
            toast.error(e.message);
        }
    });

    const defaultValues: NewProjectFormValues = {
        title: "",
        subtitle: "",
    };

    const form = useForm({
        defaultValues,
        mode: "onBlur",
        resolver: zodResolver(newProjectFormSchema)
    });

    const handleSubmit = form.handleSubmit(execute);

    return {
        form,
        handleSubmit,
        loading
    };
}