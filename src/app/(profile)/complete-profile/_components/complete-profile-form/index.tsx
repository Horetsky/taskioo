"use client";

import { Form } from "@/components/ui/form";
import { useCompleteProfileForm } from "./useCompleteProfileForm";
import { FormInput } from "@/components/form/form-input";
import { FormFileInput } from "@/components/form/form-file-input";
import { type Session } from "next-auth";

type Props = {
    session: Session | null;
}
export const CompleteProfileForm = ({ session }: Props) => {
    const {
        form,
        handleSubmit
    } = useCompleteProfileForm();

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit}
                className={"grid grid-cols-[2fr_1fr] gap-x-14 p-20"}
            >
                <div className={"flex flex-col gap-y-6"}>
                    <FormInput
                        name={"name"}
                        label={"Name"}
                        control={form.control}
                        placeholder={"Enter your name"}
                    />
                    <FormInput
                        name={"surname"}
                        label={"Surname"}
                        control={form.control}
                        placeholder={"Enter your surname"}
                    />
                </div>
                <div>
                    <FormFileInput
                        name={"picture"}
                        label={"Email"}
                        control={form.control}
                        uploadUrl={"/profile/user228"}
                        placeholder={"Enter your email"}
                    />
                </div>
            </form>
        </Form>
    );
};