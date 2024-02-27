import api from "@/server/api";

const Page = async () => {
    await api.user.findMany({
        select: {
            id: true
        }
    });
    return (
        <div>
            home
        </div>
    );
};

export default Page;