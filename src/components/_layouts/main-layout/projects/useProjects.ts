import { type NavigationItem } from "../navigation/useNavigation";
import { AiFillFolder, AiOutlineFolder } from "react-icons/ai";

export function useProjects() {

}

export const projectItem: NavigationItem[] = [
    { label: "Projects", href: "/projects", Icon: AiOutlineFolder, IconActive: AiFillFolder },
];