import { useFileUpload } from "@/components/file-uploader/useFileUpload";
import { FileInput, type FileInputProps } from "@/components/ui/file-input";

type FileUploaderProps =
    FileInputProps & {
    uploadUrl: string;
    onChange: (url: string) => void;
}

export const FileUploader = ({ onChange, uploadUrl }: FileUploaderProps) => {

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
        >
            { fileInputView }
        </FileInput>
    );
};