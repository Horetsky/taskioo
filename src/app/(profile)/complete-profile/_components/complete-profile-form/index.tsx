"use client";

import { Form } from "@/components/ui/form";
import { useCompleteProfileForm } from "./useCompleteProfileForm";
import { FormInput } from "@/components/form/form-input";
import { type Session } from "next-auth";
import { FormFileInput } from "@/components/form/form-file-input";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/form/form-alert";
import { signOut } from "next-auth/react";

export const CompleteProfileForm = () => {
    const {
        form,
        loading,
        error,
        message,
        handleSubmit
    } = useCompleteProfileForm();

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit}
                className={"grid grid-cols-[3fr_1fr] gap-x-14 p-20"}
            >
                <div className={"flex flex-col gap-y-6"}>

                    <Button onClick={() => signOut()}>
                        log out
                    </Button>

                    <FormAlert
                        error={error}
                        message={message}
                    />

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
                    <FormInput
                        name={"username"}
                        label={"Username"}
                        control={form.control}
                        placeholder={"Enter your username"}
                    />

                    <Button
                        loading={loading}
                        type={"submit"}
                        size={"lg"}
                        variant={"dark"}
                    >
                        Save
                    </Button>
                </div>
                <div>
                    <FormFileInput
                        name={"picture"}
                        label={"Profile Photo"}
                        uploadUrl={"/profile/user228"}
                        control={form.control}
                    />
                </div>
            </form>
        </Form>
    );
};