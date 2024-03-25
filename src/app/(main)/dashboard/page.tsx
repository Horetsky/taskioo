import { getSession } from "@/server/auth";
import { Hero } from "@/app/(main)/dashboard/_components/hero";
import { Today } from "@/app/(main)/dashboard/_components/today";

const Page = async () => {
    const session = await getSession();

    return (
        <>
            <Hero />
            <Today />
        </>
    );
};

export default Page;