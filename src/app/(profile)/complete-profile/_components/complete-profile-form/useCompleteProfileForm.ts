import { useForm } from "react-hook-form";
import { type UseFormHookReturn } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

import { completeProfileFormSchema,  type CompleteProfileFormValue } from "./validation";

export function useCompleteProfileForm(): UseFormHookReturn<CompleteProfileFormValue> {

    const defaultValues: CompleteProfileFormValue = {
        name: "",
        surname: "",
        picture: ""
    };

    const form = useForm({
        resolver: zodResolver(completeProfileFormSchema),
        defaultValues,
        mode: "onBlur"
    });

    const handleSubmit = form.handleSubmit((d) => { console.log(d); });

    return {
        form,
        handleSubmit,
        loading: false
    };
}