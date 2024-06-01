import { getUserTaskLists } from "@/server/api/actions/list";
import { NewTaskModal } from "@/components/_modules/tasks/new-task-form";
import { TaskList } from "@/components/_modules/tasks/task-list";

export const Today = async () => {
    const taskLists = await getUserTaskLists();
    return (
        <section>
            <div className={"flex flex-col gap-y-9"}>
                <NewTaskModal />

                {
                    taskLists.map(item => (
                        <TaskList key={item.list.id} data={item} />
                    ))
                }

            </div>
        </section>
    );
};