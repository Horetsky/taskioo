import { type ReactNode, useState } from "react";
import { FileInput } from "@/components/ui/file-input";
import { type InputProps } from "@/components/ui/input";
import { type PutBlobResult } from "@vercel/blob";

type FileUploaderView = "pending" | "loading" | "success" | "error";

type FileUploaderProps =
    Omit<InputProps, "onChange"> & {
    uploadUrl: string;
    onChange: (url: string) => void
}

export const FileUploader = ({ onChange, uploadUrl, ...inputProps }: FileUploaderProps) => {

    const [view, setView] = useState<FileUploaderView>("error");

    const handleFileUpload = async (file?: File) => {

        if(!file) return setView("error");

        setView("loading");

        const fileExt = file.type.split("/").pop();
        const name = String(Date.now());
        const generatedName = `${name}.${fileExt}`;

        const res = await fetch(`/api/blob/upload${uploadUrl}?filename=${generatedName}`, {
            method: "POST",
            body: file
        });

        if(res.ok) {
            setView("success");
            const json = await res.json() as PutBlobResult;
        } else {
            setView("error");
        }
    };

    const fileUploaderView: Record<FileUploaderView, ReactNode> = {
        pending: <FileInput>
            <FileInput.Pending {...inputProps} onFileUpload={handleFileUpload} />
        </FileInput>,
        loading: <FileInput>
            <FileInput.Loading />
        </FileInput>,
        success: <FileInput>
            <FileInput.Success src={""} />
        </FileInput>,
        error: <FileInput>
            <FileInput.Error />
        </FileInput>
    };

    return fileUploaderView[view] || fileUploaderView.pending;
};