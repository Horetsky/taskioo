"use client";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { AuthButtons } from "@/app/(auth)/_components/auth-buttons";
import { useSignupForm } from "./useSignupForm";
import { FormAlert } from "@/components/form/form-alert";
import Link from "next/link";

export const SignupForm = () => {

    const {
        form,
        loading,
        handleSubmit,
        error,
    } = useSignupForm();

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit}
                className={"flex flex-col gap-y-6"}
            >
                <FormAlert
                    error={error}
                />
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
                    description={"Must have at least 8 characters, with capital letter, number and special symbol."}
                    placeholder={"Enter your password"}
                />
                <FormCheckbox
                    name={"agreement"}
                    control={form.control}
                >
                    I agree to the <Link href={""}>Terms of Service</Link> and <Link href={""}>Privacy Policy.</Link>
                </FormCheckbox>

                <AuthButtons>
                    <AuthButtons.Credentials loading={loading}>
                        Sign up
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