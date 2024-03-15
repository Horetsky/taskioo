import { CompleteProfileForm } from "@/app/(profile)/complete-profile/_components/complete-profile-form";

export default async function Page() {
    return (
        <>
            <div className={"text-background"}>
                <h1 className={"text-5xl font-black"}>
                    Complete Profile 🚀
                </h1>
                <p className={"text-background"}>
                    Enter your personal information to complete profile.
                </p>
            </div>
            <div className={"bg-background shadow-lg rounded-lg mt-9"}>
                <CompleteProfileForm />
            </div>
        </>
    );
}