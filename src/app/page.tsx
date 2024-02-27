import db from "@/server/db";

const Page = async () => {
    const users = await db.user.findUnique({
        where: {
            id: "92f12640-1470-4430-8c82-cca706dd5207"
        },
    });

    console.log("====", users);
    return (
        <div>

        </div>
    );
};

export default Page;