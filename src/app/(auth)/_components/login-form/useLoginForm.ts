"use client";

import { type AuthServerError, type UseFormHookReturn } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { loginFormSchema, type LoginFormValues } from "./validation";

export function useLoginForm(): UseFormHookReturn<LoginFormValues> {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AuthServerError | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const urlParams = new URLSearchParams(searchParams);

    const user =  urlParams.get("user");
    const message = user ? "Thanks for registering. Please log in." : undefined;

    const defaultValues: LoginFormValues = {
        email: user || "",
        password: ""
    };

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues,
        mode: "onBlur"
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        setError(null);
        setLoading(true);

        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });
        
        if(!res?.ok) {
            setLoading(false);
            setError(res?.error as AuthServerError);
        }

        router.refresh();
    });

    return {
        form,
        handleSubmit,
        loading,
        error: error?.toString(),
        message
    };
}