import { HaveAnAccount } from "@/app/(auth)/_components/have-an-account";
import { LoginForm } from "@/app/(auth)/_components/login-form";

export default function AuthForm() {
    return (
        <div className={"relative self-center flex flex-col gap-y-8"}>
            <div>
                <h1 className={"text-5xl font-bold"}>
                    Welcome back 👋
                </h1>
                <p className={"text-muted-foreground"}>
                    Enter your personal information to login the Taskio platform.
                </p>
            </div>
            <LoginForm />
            <HaveAnAccount actionText={"Sign up"} href={"/signup"}>
                Don’t have an account?
            </HaveAnAccount>
        </div>
    );
};