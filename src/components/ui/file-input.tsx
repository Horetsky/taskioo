"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { MdClose, MdCopyAll } from "react-icons/md";
import { type ChangeEvent, type ComponentProps, createContext, type PropsWithChildren, useContext } from "react";
import { Spinner } from "@/components/_icons";
import Image, { type ImageProps } from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import type { ControllerFieldState } from "react-hook-form";

const fileInputVariant = cva(
    "group relative rounded-md overflow-hidden duration-200 text-foreground", {
        variants: {
            variant: {
                default: "border border-dashed border-border bg-background hover:border-foreground",
                round: "rounded-full border border-dashed border-border bg-background"
            },
            invalid: {
                true: "border-destructive hover:border-destructive"
            },
            size: {
                default: "w-full aspect-square "
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);


export type FileInputProps =
    Omit<ComponentProps<"div">, "onChange"> &
    VariantProps<typeof fileInputVariant>

type Props = {
    onFileUpload: (file?: File) => void;
    onFileRemove: (url: string) => void;
    fieldState: ControllerFieldState;
}

const FileInputContext = createContext<FileInputProps & Props | null>(null);
const FileInput = ({ children, className, variant, fieldState, ...props  }: FileInputProps & Props) => {

    return (
        <FileInputContext.Provider value={{ className, variant, fieldState, ...props}}>
            <div
                className={cn(
                    fileInputVariant({variant, invalid: fieldState.invalid, className}), "text"
                )}
                {...props}
            >
                {children}
            </div>
        </FileInputContext.Provider>
    );
};

const Content = ({children}: PropsWithChildren) => {
    return (
        <div className={"absolute z-0 top-0 bottom-0 left-0 right-0"}>
            <div className={"h-full flex flex-col items-center justify-center gap-y-2 text-center px-3 py-2"}>
                { children }
            </div>
        </div>
    );
};


const Pending = () => {

    const { onFileUpload } = useFileInputContext();

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
            />
            <Content>
                <div className={"bg-primary p-2 rounded-lg"}>
                    <MdCopyAll className={"text-4xl shrink-0"}/>
                </div>
                <span className={"text-sm"}>
                    Drag Files to Upload or Click Here
                </span>
            </Content>
        </>
    );
};

const Loading = () => {
    return (
        <Content>
            <Spinner className={"border-[0.1rem] border-t-foreground w-7 h-7"}/>
            <div>
                Loading...
            </div>
        </Content>
    );
};

const Error = () => {
    return (
        <Content>
            <MdClose className={"text-4xl"} />
            <span>
                Error:(
            </span>
        </Content>
    );
};

const Success = ({ src, className, ...props }: Omit<ImageProps, "alt" | "src"> & { src: string }) => {

    const { onFileRemove } = useFileInputContext();

    const handleFileRemove = () => {
        onFileRemove(src);
    };

    return (
        <>
            <div
                className={cn(
                    "absolute top-0 bottom-0 left-0 right-0 z-10",
                    "bg-black opacity-0 group-hover:opacity-20 duration-200"
                )}
            />

            <div
                className={cn(
                    "absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0 z-20",
                    "text-center text-background hover:underline cursor-pointer",
                    "group-hover:translate-y-0 group-hover:opacity-100 duration-200"
                )}
                onClick={handleFileRemove}
            >
                Remove
            </div>
            <Image
                fill
                src={src}
                className={cn(
                    "object-cover",
                    className
                )}
                {...props}
                alt={"image"}
            />
        </>
    );
};

function useFileInputContext(): FileInputProps & Props {
    const fileInput = useContext(FileInputContext);
    if(!fileInput) {
        // @ts-ignore
        throw new Error("FileInputContext should be used within <FileInput></FileInput>");
    }

    return fileInput;
}

FileInput.Pending = Pending;
FileInput.Loading = Loading;
FileInput.Success = Success;
FileInput.Error = Error;
export { FileInput };

