import { type UseFormHookReturn } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/lib/action/hooks";
import { useToaster } from "@/components/toaster";
import { newTaskFormSchema, type NewTaskFormValues } from "./validation";
import { createTask } from "@/server/api/actions/task";

export function useNewTaskForm(onSuccessAction: () => void): UseFormHookReturn<NewTaskFormValues> {

    const toast = useToaster();

    const {
        execute,
        loading,
    } = useAction(createTask, {
        onSuccess() {
            onSuccessAction();
            form.reset();
        },
        onError(e) {
            toast.error(e.message);
        }
    });

    const defaultValues: NewTaskFormValues = {
        title: "",
        description: "",
        priority: "MEDIUM",
        list_id: ""
    };

    const form = useForm({
        defaultValues,
        resolver: zodResolver(newTaskFormSchema)
    });

    const handleSubmit = form.handleSubmit(execute);

    return {
        form,
        handleSubmit,
        loading
    };
}