"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { AuthButtons } from "@/app/(auth)/_components/auth-buttons";

export const LoginForm = () => {

    const form = useForm({});
    return (
        <Form {...form}>
            <form className={"flex flex-col gap-y-6"}>
                <FormInput
                    name={"name"}
                    label={"Email"}
                    control={form.control}
                    placeholder={"Enter your email"}
                />
                <FormInput
                    name={"name"}
                    label={"Password"}
                    control={form.control}
                    placeholder={"Enter your password"}
                />

                <AuthButtons>
                    <AuthButtons.Credentials>
                        Login
                    </AuthButtons.Credentials>
                    <AuthButtons.Google>
                        Google
                    </AuthButtons.Google>
                    <AuthButtons.Gitgub>
                        Github
                    </AuthButtons.Gitgub>
                </AuthButtons>
            </form>
        </Form>
    );
};