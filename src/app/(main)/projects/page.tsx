import { PageTitle } from "@/components/_layouts";
import { getUserTaskLists } from "@/server/api/actions/list";
import { NewProjectModal } from "@/components/_modules/project/new-project-form";
import { TaskList } from "@/components/_modules/tasks/task-list";

export default async function Page() {

    const taskLists = await getUserTaskLists();

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

            <div className={"flex flex-col gap-y-9"}>
                <NewProjectModal />
                {
                    taskLists.map(item => (
                        <TaskList key={item.list.id} data={item} />
                    ))
                }
            </div>
        </>
    );
}