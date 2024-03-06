import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type AuthServerError } from "@/server/types";
import { IoWarning } from "react-icons/io5";
import { PiWarningCircleFill, PiWarningCircle } from "react-icons/pi";

type Props = {
    error: AuthServerError
}

export const AuthAlert = ({ error }: Props) => {

    const errorView: Record<AuthServerError, string> = {
        USER_ALREADY_EXIST: "User with provided email is already exist.",
        INCORRECT_PASSWORD: "",
        USER_IS_NOT_REGISTERED: "",
        USER_IS_BLOCKED: "",
        INTERNAL_SERVER_ERROR: "Internal server error. Try again later"
    };
    return (
        <Alert variant={"destructive"} className={"flex items-center  gap-x-2"}>
            <PiWarningCircle className={"text-2xl"} />
            <AlertTitle className={"mb-0"}>
                { errorView[error] }
            </AlertTitle>
        </Alert>
    );
};