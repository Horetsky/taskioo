import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input, type InputProps } from "@/components/ui/input";
import { type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
import { type ReactNode } from "react";

type FormInputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> =
    Omit<ControllerProps<TFieldValues, TName>, "render"> &
    InputProps & {
    label?: string | ReactNode;
    description?: string | ReactNode
}

export const FormInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, defaultValue, shouldUnregister, label, description, ...props }: FormInputProps<TFieldValues, TName>) => {
    return (
        <FormField
            name={name}
            control={control}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        { label }
                    </FormLabel>
                    <FormControl>
                        <Input {...props} {...field} />
                    </FormControl>
                    {
                        description ?
                            <FormDescription>
                                { description }
                            </FormDescription> : null
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};