import { Today } from "@/app/(main)/dashboard/_components/today";
import { PageTitle } from "@/components/_layouts";
import { getSession } from "@/server/auth";

export default async function Page() {

    const session = await getSession();

    return (
        <>
            <PageTitle>
                <PageTitle.Subtitle>
                    Hello, {session.user.name}!
                </PageTitle.Subtitle>
                <PageTitle.Title>
                    You&apos;ve got <br/> 8 tasks for today 🗒️
                </PageTitle.Title>
            </PageTitle>
            <Today />
        </>
    );
};