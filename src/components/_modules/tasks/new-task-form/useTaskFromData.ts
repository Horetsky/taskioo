import type { SelectOption } from "@/components/form/form-select";
import type { z } from "zod";
import type { taskPriority } from "@/lib/zod";
import { useAction } from "@/lib/action/hooks";
import { getUserLists } from "@/server/api/actions/list";
import { useEffect, useMemo } from "react";
import { getUserTeamMembers } from "@/server/api/actions/team";

export function useTaskFromData() {

    const {
        result: taskList,
        execute: getTaskList
    } = useAction(getUserLists);

    const {
        execute: getTeamMembers
    } = useAction(getUserTeamMembers);

    const getData = () => {
        getTaskList({})
            .then(() => getTeamMembers({}));
    };

    useEffect(getData, []);

    const taskListOptions: SelectOption[] = useMemo(() => {
        if(!taskList) return [];

        return taskList.map(item => ({
            label: item.title,
            value: item.id
        }));
    }, [taskList]);


    const teamMemberOptions: SelectOption[] = [];

    const taskPriorityOptions: Array<SelectOption & { value: z.infer<typeof taskPriority>}>  = [
        { label: "Lowest", value: "LOWEST" },
        { label: "Low", value: "LOW" },
        { label: "Medium", value: "MEDIUM" },
        { label: "High", value: "HIGH" },
        { label: "Highest", value: "HIGHEST" },
    ];

    return {
        taskPriorityOptions,
        taskListOptions,
        teamMemberOptions
    };
}