import { PageTitle } from "@/components/_layouts";
import { NewProjectModal } from "@/app/(main)/projects/_components/new-project-form";

export default function Page() {
    return (
        <>
            <PageTitle>
                <PageTitle.Subtitle>
                    Projects
                </PageTitle.Subtitle>
                <PageTitle.Title>
                    Personal projects 🗒️
                </PageTitle.Title>
            </PageTitle>
            <NewProjectModal />
        </>
    );
}