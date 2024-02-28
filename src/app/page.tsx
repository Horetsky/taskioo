import db from "@/server/db";

const Page = async () => {
    await db.user.delete({

    });

    return (
        <div>

        </div>
    );
};

export default Page;