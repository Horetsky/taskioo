import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/components/ui/input";
import { MdClose, MdCopyAll } from "react-icons/md";
import { type ChangeEvent, type ComponentProps } from "react";
import { Spinner } from "@/components/_icons";
import Image, { type ImageProps } from "next/image";


const FileInput = ({ children, className, ...props }: ComponentProps<"div">) => {

    return (
        <div
            className={cn(
                "relative w-full h-20 rounded-md overflow-hidden",
                "border border-dashed border-border bg-background",
                className
            )}
        >

            { children }

        </div>
    );
};


type FileInputProps =
    Omit<InputProps, "onChange"> & {
    onFileUpload: (file?: File) => void
}
const Pending = ({ onFileUpload, ...props }: FileInputProps) => {

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target?.files;
        if(fileList) {
            onFileUpload(fileList[0]);
        }
    };

    return (
        <>
            <Input
                type={"file"}
                className={"relative z-10 w-full h-full opacity-0"}
                onChange={handleFileUpload}
                {...props}
            />
            <div className={"absolute z-0 top-0 bottom-0 left-0 right-0"}>
                <div className={"flex flex-col items-center px-3 py-2 text-border"}>
                    <MdCopyAll className={"text-4xl"}/>
                    <span>
                        Drag Files to Upload or Click Here
                    </span>
                </div>
            </div>
        </>
    );
};

const Loading = () => {
    return (
        <div className={"absolute z-0 top-0 bottom-0 left-0 right-0"}>
            <div className={"flex flex-col items-center gap-y-2 px-3 py-2 text-border"}>
                <Spinner className={"border-[0.1rem] w-7 h-7"}/>
                <span>
                    Loading...
                </span>
            </div>
        </div>
    );
};

const Error = () => {
    return (
        <div className={"absolute z-0 top-0 bottom-0 left-0 right-0"}>
            <div className={"flex flex-col items-center px-3 py-2 text-border"}>
                <MdClose className={"text-4xl"} />
                <span>
                    Error:(
                </span>
            </div>
        </div>
    );
};

const Success = ({ src, ...props }: Omit<ImageProps, "alt">) => {
    return (
        <Image
            fill
            src={src}
            {...props}
            alt={"image"}
        />
    );
};

FileInput.Pending = Pending;
FileInput.Loading = Loading;
FileInput.Success = Success;
FileInput.Error = Error;
export { FileInput };

