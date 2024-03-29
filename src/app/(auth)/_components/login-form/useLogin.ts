import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { type LoginFormValues } from "./validation";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function handleLogin(data: LoginFormValues) {
        setError(null);
        setLoading(true);

        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });

        if(!res?.ok) {
            setLoading(false);
            setError(res?.error as string);
        }
        
        return router.replace("/dashboard");
    }

    return {
        handleLogin,
        loading,
        error
    };
}