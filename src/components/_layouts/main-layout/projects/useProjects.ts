import { type NavigationItem } from "../navigation/useNavigation";
import { AiFillFolder, AiOutlineFolder } from "react-icons/ai";
import { useAction } from "@/lib/action/hooks";
import { getUserTaskLists } from "@/server/api/actions/list";
import { useEffect } from "react";

export function useProjects() {
    const {
        result,
        execute
    } = useAction(getUserTaskLists);

    useEffect(() => {
        execute({});
    }, []);

    return result;
}

export const projectItem: NavigationItem[] = [
    { label: "Projects", href: "/projects", Icon: AiOutlineFolder, IconActive: AiFillFolder },
];