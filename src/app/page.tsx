import db from "@/server/db";

const Page = async () => {
    const t = await db.user.findMany({});
    return (
        <div>
            { JSON.stringify(t) }
        </div>
    );
};

export default Page;