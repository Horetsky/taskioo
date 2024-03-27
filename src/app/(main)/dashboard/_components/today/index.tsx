import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { TaskList } from "@/components/task-list";

export const Today = () => {
    return (
        <section>
            <div className={"flex flex-col gap-y-9"}>
                <Button
                    variant={"dashed"}
                    size={"xl"}
                    className={"gap-x-6"}
                >
                    <div className={"bg-primary rounded-md p-0.5"}>
                        <LuPlus className={"text-lg"} />
                    </div>
                    New Task
                </Button>

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