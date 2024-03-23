import { useFileUpload } from "@/components/file-uploader/useFileUpload";
import { FileInput, type FileInputProps } from "@/components/ui/file-input";
import { type ControllerFieldState } from "react-hook-form";

type FileUploaderProps =
    FileInputProps & {
    uploadUrl: string;
    fieldState: ControllerFieldState;
    onChange: (url: string) => void;
}

export const FileUploader = ({ uploadUrl, fieldState, onChange }: FileUploaderProps) => {

    const {
        file,
        loading,
        error,
        handleUpload,
        handleRemove,
    } = useFileUpload(uploadUrl, onChange);


    function renderFileInputView() {
        if(loading) return <FileInput.Loading />;
        if(error) return <FileInput.Error />;

        if(file) return <FileInput.Success src={file} />;

        return <FileInput.Pending />;
    }

    const fileInputView = renderFileInputView();
    return (
        <FileInput
            onFileUpload={handleUpload}
            onFileRemove={handleRemove}
            fieldState={fieldState}
        >
            { fileInputView }
        </FileInput>
    );
};