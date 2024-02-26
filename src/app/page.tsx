import api from "@/server/api";

const Page = async () => {
    await api.user.findUnique({
        // select: {
        //     id: true,
        //     password: true,
        //     email: true
        // },
        include: {
            area: "user_id",
            // list: "test_id"
        },
        // where: {
        //     id: "idishnik",
        //     email: "emeildnci"
        // },
        // order: {
        //     email: "DESC"
        // },
        limit: 10
    });
    return (
        <div>
            home
        </div>
    );
};

export default Page;