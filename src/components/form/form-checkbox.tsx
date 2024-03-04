import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form";
import { type ReactNode } from "react";
import { type CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox";

type FormCheckboxProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> =
    Omit<ControllerProps<TFieldValues, TName>, "render"> &
    CheckboxProps & {
    children?: string | ReactNode;
    description?: string | ReactNode
}

export const FormCheckbox = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, defaultValue, shouldUnregister, description, children, ...props }: FormCheckboxProps<TFieldValues, TName>) => {
    return (
        <FormField
            name={name}
            control={control}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                    <div className={"flex items-center gap-x-3 space-y-0"}>
                        <FormControl>
                            <Checkbox
                                value={value}
                                onCheckedChange={onChange}
                                {...props}
                                {...field}
                            />
                        </FormControl>
                        <div className={""}>
                            <FormLabel className={"text-black font-normal [&_a]:text-input"}>
                                { children }
                            </FormLabel>
                            {
                                description ?
                                    <FormDescription>
                                        { description }
                                    </FormDescription> : null
                            }
                        </div>
                    </div>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
};