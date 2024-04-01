import { AddNewItemButton } from "@/components/buttons";
import { PageTitle } from "@/components/_layouts";

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
            <div className={"flex flex-col"}>
                <AddNewItemButton>
                    New Project
                </AddNewItemButton>
            </div>
        </>
    );
}