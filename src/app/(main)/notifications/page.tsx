import { PageTitle } from "@/components/_layouts";

export default function Page() {
    return (
        <>
            <PageTitle>
                <PageTitle.Subtitle>
                    Notification
                </PageTitle.Subtitle>
                <PageTitle.Title>
                    You&apos;ve got <br/> 13 notifications 🔔
                </PageTitle.Title>
            </PageTitle>
        </>
    );
}