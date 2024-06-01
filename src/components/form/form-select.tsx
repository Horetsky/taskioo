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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { type SelectProps } from "@radix-ui/react-select";

type FormSelectProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> =
    Omit<ControllerProps<TFieldValues, TName>, "render"> &
    SelectProps & {
    label?: string | ReactNode;
    description?: string | ReactNode;
    options: SelectOption[]
    placeholder?: string;
    disabled?: boolean;
}

export type SelectOption = {
    label: string | ReactNode;
    value: string;
}

export const FormSelect = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, defaultValue, shouldUnregister, label, description, placeholder, options, ...props }: FormSelectProps<TFieldValues, TName>) => {
    return (
        <FormField
            name={name}
            control={control}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({ field: { onChange, ...field }}) => (
                <FormItem>
                    <FormLabel>
                        { label }
                    </FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={onChange}
                            defaultValue={defaultValue}
                            {...field}
                            {...props}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>{label}</SelectLabel>
                                </SelectGroup>
                                {
                                    options.map((item, index) => (
                                        <SelectItem
                                            key={index}
                                            value={item.value}
                                        >
                                            { item.label }
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>

                        </Select>
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