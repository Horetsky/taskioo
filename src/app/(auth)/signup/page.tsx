import { SignupForm } from "@/app/(auth)/_components/signup-form";
import { HaveAnAccount } from "@/app/(auth)/_components/have-an-account";

export default function AuthForm() {
    return (
        <div className={"relative self-center flex flex-col gap-y-8"}>
            <div>
                <h1 className={"text-foreground text-5xl font-bold"}>
                    Hey there 👋
                </h1>
                <p className={"text-muted-foreground"}>
                    Enter your personal information to register the Taskio platform.
                </p>
            </div>
            <SignupForm />
            <HaveAnAccount actionText={"Login"} href={"/login"}>
                Already have an account?
            </HaveAnAccount>
        </div>
    );
};