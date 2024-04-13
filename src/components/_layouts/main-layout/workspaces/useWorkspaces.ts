import { useSession } from "next-auth/react";


export function useWorkspaces() {
    const {
        data: session,
        update: updateSession,
    } = useSession();

    const handleSwitchWorkspace = async (id: string) => {
        await updateSession({
            user: {
                workspaceId: id
            }
        });
    };

    return {
        activeWorkspace: session?.user.workspaceId,
        handleSwitchWorkspace
    };
}