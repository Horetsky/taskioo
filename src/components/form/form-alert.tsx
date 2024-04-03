import { Alert, AlertTitle } from "@/components/ui/alert";
import { IoCheckmarkOutline } from "react-icons/io5";
import { PiWarningCircle } from "react-icons/pi";

type Props = {
    error?: string | null;
    message?: string | null;
}

export const FormAlert = ({ error, message }: Props) => {
    if(error) return <ErrorAlert error={error} />;

    if(message) return <MessageAlert message={message} />;
};

const ErrorAlert = ({ error }: { error: string }) => {
    return (
        <Alert variant={"destructive"} className={"flex items-center  gap-x-2"}>
            <PiWarningCircle className={"text-2xl shrink-0"} />
            <AlertTitle className={"mb-0"}>
                { error }
            </AlertTitle>
        </Alert>
    );
};

const MessageAlert = ({ message }: { message: string }) => {
    return (
        <Alert variant={"success"} className={"flex items-center gap-x-2"}>
            <IoCheckmarkOutline className={"text-2xl shrink-0"} />
            <AlertTitle className={"mb-0"}>
                { message }
            </AlertTitle>
        </Alert>
    );
};