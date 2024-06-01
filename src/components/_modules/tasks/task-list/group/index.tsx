import { type TaskList as TaskListType } from "@/types";
import { TaskList } from "@/components/_modules/tasks/task-list";
export const TaskListGroup = ({ lists }: { lists: TaskListType[] }) => {
    return (
        <div className={"flex flex-col gap-y-9"}>
            {/*{*/}
            {/*    lists.map(item => (*/}
            {/*        <TaskList key={item.id} list={item} />*/}
            {/*    ))*/}
            {/*}*/}
        </div>
    );
};