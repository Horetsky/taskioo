import Image from "next/image";
import illustration from "@/../public/assets/auth.svg";
export const AuthSlider = () => {
    return (
        <div className={"relative bg-[#E8EEF9] h-full rounded-xl"}>
            <Image
                fill
                src={illustration}
                className={"object-contain"}
                alt={"illustration"}
            />
        </div>
    );
};