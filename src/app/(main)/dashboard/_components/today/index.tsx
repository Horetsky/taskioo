import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";

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
            </div>
        </section>
    );
};