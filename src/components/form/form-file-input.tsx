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
import { FileUploader } from "@/components/file-uploader";
import { type FileInputProps } from "@/components/ui/file-input";

type FormFileInputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, "render"> &
    FileInputProps & {
    uploadUrl: string;
    label?: string | ReactNode;
    description?: string | ReactNode
}

export const FormFileInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, defaultValue, shouldUnregister, label, description, uploadUrl, ...props }: FormFileInputProps<TFieldValues, TName>) => {
    return (
        <FormField
            name={name}
            control={control}
            defaultValue={defaultValue}
            shouldUnregister={shouldUnregister}
            render={({ field, fieldState }) => (
                <FormItem>
                    <FormLabel>
                        { label }
                    </FormLabel>
                    <FormControl>
                        <FileUploader
                            onChange={field.onChange}
                            uploadUrl={uploadUrl}
                            fieldState={fieldState}
                            {...props}
                        />
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