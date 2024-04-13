"use client";

import { cn } from "@/lib/utils";
import type { AreaModel } from "@/server/db/models/area";
import { useWorkspaces } from "@/components/_layouts/main-layout/workspaces/useWorkspaces";

export const Workspaces = ({ workspaces }: { workspaces: AreaModel.SchemaValue[] }) => {

    const {
        activeWorkspace,
        handleSwitchWorkspace
    } = useWorkspaces();

    return (
        <ul
            className={"flex items-center gap-x-6"}
        >
            {
                workspaces.map(item => (
                    <WorkspaceItem
                        key={item.id}
                        workspace={item}
                        isActive={item.id === activeWorkspace}
                        handleSwitch={() => handleSwitchWorkspace(item.id)}
                    />
                ))
            }
        </ul>
    );
};

const WorkspaceItem = ({ workspace, isActive, handleSwitch }: {
    workspace: AreaModel.SchemaValue, isActive: boolean, handleSwitch: () => void
}) => {
    return (
        <li
            key={workspace.id}
            onClick={handleSwitch}
            className={cn(
                "relative cursor-pointer ease-in-out duration-300",
                isActive ? "before:scale-x-100" : "before:scale-x-0 hover:before:scale-x-75 opacity-60",
                "before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5",
                "before:bg-primary before:rounded-md",
                "before:origin-bottom-left before:ease-in-out before:duration-300"
            )}
        >
            { workspace.title }
        </li>
    );
};