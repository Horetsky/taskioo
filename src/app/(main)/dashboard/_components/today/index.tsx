import { TaskList } from "@/components/task-list";
import { AddNewItemButton } from "@/components/buttons";

export const Today = () => {
    return (
        <section>
            <div className={"flex flex-col gap-y-9"}>
                <AddNewItemButton>
                    New Task
                </AddNewItemButton>

                <TaskList
                    title={"🗒️ Today"}
                    count={4}
                    tasks={[0, 1, 2, 3]}
                />

                <TaskList
                    title={"ℹ️ Note"}
                    count={6}
                    tasks={[0, 1, 2, 3]}
                />

                <TaskList
                    title={"✅ Upcoming"}
                    count={1}
                    tasks={[0, 1, 2, 3]}
                />

            </div>
        </section>
    );
};