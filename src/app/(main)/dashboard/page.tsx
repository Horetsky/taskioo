import { Hero } from "@/app/(main)/dashboard/_components/hero";
import { Today } from "@/app/(main)/dashboard/_components/today";

const Page = async () => {
    return (
        <>
            <Hero />
            <Today />
        </>
    );
};

export default Page;