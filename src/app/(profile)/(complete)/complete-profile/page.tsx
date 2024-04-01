import { CompleteProfileForm } from "@/app/(profile)/(complete)/complete-profile/_components/complete-profile-form";
import { getSession } from "@/server/auth";

export default async function Page() {

    const session = await getSession();

    return (
        <>
            <div className={"text-foreground"}>
                <h1 className={"text-5xl font-black"}>
                    Complete Profile ✏️
                </h1>
                <p className={""}>
                    Enter your personal information to complete profile.
                </p>
            </div>
            <div className={"bg-background shadow-lg rounded-lg mt-9"}>
                <CompleteProfileForm session={session} />
            </div>
        </>
    );
}