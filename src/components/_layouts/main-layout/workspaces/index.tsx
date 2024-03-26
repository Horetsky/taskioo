import { cn } from "@/lib/utils";

const areas = [
    {label: "Default", isActive: true},
    {label: "Work", isActive: false},
    {label: "Study", isActive: false}
];

export const Workspaces = () => {
    return (
        <ul
            className={"flex items-center gap-x-6"}
        >
            {
                areas.map(({ label, isActive }) => (
                    <li
                        key={label}
                        className={cn(
                            "relative cursor-pointer ease-in-out duration-300",
                            isActive ? "before:scale-x-100" : "before:scale-x-0 hover:before:scale-x-75 opacity-60",
                            "before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5",
                            "before:bg-primary before:rounded-md",
                            "before:origin-bottom-left before:ease-in-out before:duration-300"
                        )}
                    >
                        { label }
                    </li>
                ))
            }
        </ul>
    );
};