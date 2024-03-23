import { getSession } from "@/server/auth";

const Page = async () => {
    const session = await getSession();

    return (
        <div>
            { JSON.stringify(session) }
        </div>
    );
};

export default Page;