import { useState } from "react";
import type { PutBlobResult } from "@vercel/blob";

export function useFileUpload(uploadUrl: string, onChange?: (url: string) => void) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<string | null>(null);

    async function handleUpload(file?: File) {
        if(!file) return setError("File was nor provided");

        setLoading(true);

        const fileName = generateFileName(file);

        const res = await fetch(`/api/blob/upload${uploadUrl}?filename=${fileName}`, {
            method: "POST",
            body: file
        });

        setLoading(false);

        if(res.ok) {
            const json = await res.json() as PutBlobResult;
            setFile(json.url);

            if(onChange) {
                onChange(json.url);
            }
        } else {
            setError("There is an error while uploading an image");
        }

    }

    async function handleRemove(url: string) {
        if(!url) return setError("Url was nor provided");

        setLoading(true);

        const res = await fetch(`/api/blob/upload${uploadUrl}?url=${url}`, {
            method: "DELETE",
        });

        if(res.ok) {
            setFile(null);
            setLoading(false);
            if(onChange) {
                onChange("");
            }
        } else {
            setError("There is an error while deleting an image");
        }
    }

    return {
        file,
        loading,
        error,
        handleUpload,
        handleRemove
    };
}

function generateFileName(file: File): string {
    const fileExt = file.type.split("/").pop();
    const name = String(Date.now());
    return `${name}.${fileExt}`;
}