"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { AuthButtons } from "@/app/(auth)/_components/auth-buttons";
import { useLoginForm } from "@/app/(auth)/_components/login-form/useLoginForm";
import { AuthAlert } from "@/app/(auth)/_components/auth-alert";

export const LoginForm = () => {

    const {
        form,
        handleSubmit,
        loading,
        error,
        message
    } = useLoginForm();

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit}
                className={"flex flex-col gap-y-6"}
            >

                <AuthAlert message={message} error={error} />

                <FormInput
                    name={"email"}
                    label={"Email"}
                    control={form.control}
                    placeholder={"Enter your email"}
                />
                <FormInput
                    name={"password"}
                    label={"Password"}
                    control={form.control}
                    placeholder={"Enter your password"}
                />

                <AuthButtons>
                    <AuthButtons.Credentials loading={loading}>
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