import { Button, type ButtonProps } from "@/components/ui/button";
import { IcoGithub, IcoGoogle } from "@/components/_icons";
import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import "./styles.css";

const AuthButtons = ({ children, className }: ComponentProps<"div">) => {
    return (
        <div
            className={cn(
                "auth-btn",
                className
            )}
        >
            { children }
        </div>
    );
};

const Credentials = ({ children, ...props }: ButtonProps) => {
    return (
        <Button
            size={"lg"}
            style={{gridArea: "signup"}}
            variant={"default"}
            className={"w-full"}
            type={"submit"}
            {...props}
        >
            { children }
        </Button>
    );
};

const Google = ({ children, ...props }: ButtonProps) => {
    return (
        <Button
            size={"lg"}
            variant={"outline"}
            className={"w-full"}
            icon={<IcoGoogle/>}
            type={"button"}
            {...props}
        >
            { children }
        </Button>
    );
};

const Github = ({ children, ...props }: ButtonProps) => {
    return (
        <Button
            size={"lg"}
            variant={"outline"}
            className={"w-full"}
            icon={<IcoGithub/>}
            type={"button"}
            {...props}
        >
            { children }
        </Button>
    );
};

AuthButtons.Credentials = Credentials;
AuthButtons.Google = Google;
AuthButtons.Gitgub = Github;

export { AuthButtons };