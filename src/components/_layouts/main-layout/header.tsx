import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
import { Workspaces } from "./workspaces";
import { NewWorkspaceModal } from "./new-workspace-modal";
import { type AreaModel } from "@/server/db/models/area";

type HeaderProps =
    ComponentProps<"header"> & {
    workspaces: AreaModel.SchemaValue[]
}

export const Header = ({ children, className, workspaces, ...props }: HeaderProps) => {
    return (
        <header
            className={cn(
                "py-7 px-14",
                "flex items-center justify-between",
                className
            )}
            {...props}
        >

            <Workspaces workspaces={workspaces} />

            <NewWorkspaceModal />
        </header>
    );
};