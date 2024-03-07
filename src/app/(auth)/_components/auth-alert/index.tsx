import { Alert, AlertTitle } from "@/components/ui/alert";
import { type AuthServerError } from "@/server/types";
import { PiWarningCircle } from "react-icons/pi";
import { IoCheckmarkOutline } from "react-icons/io5";

type Props = {
    error?: string;
    message?: string;
}

export const AuthAlert = ({ error, message }: Props) => {

    if(error) return <ErrorAlert error={error} />;

    if(message) return <MessageAlert message={message} />;

};

const ErrorAlert = ({ error }: { error: string }) => {
    const errorView: Record<AuthServerError, string> = {
        USER_ALREADY_EXIST: "User with provided email is already exist.",
        INCORRECT_PASSWORD: "Incorrect password.",
        USER_IS_NOT_REGISTERED: "User with provided email does not exist.",
        USER_IS_BLOCKED: "",
        INTERNAL_SERVER_ERROR: "Internal server error. Try again later."
    };

    return (
        <Alert variant={"destructive"} className={"flex items-center  gap-x-2"}>
            <PiWarningCircle className={"text-2xl"} />
            <AlertTitle className={"mb-0"}>
                {
                    errorView[error as AuthServerError] || errorView["INTERNAL_SERVER_ERROR"]
                }
            </AlertTitle>
        </Alert>
    );
};

const MessageAlert = ({ message }: { message: string }) => {
    return (
        <Alert variant={"success"} className={"flex items-center gap-x-2"}>
            <IoCheckmarkOutline className={"text-2xl"} />
            <AlertTitle className={"mb-0"}>
                { message }
            </AlertTitle>
        </Alert>
    );
};