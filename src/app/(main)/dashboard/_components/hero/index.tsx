import { getSession } from "@/server/auth";

export const Hero = async () => {

    const session = await getSession();

    return (
        <section className={"mb-9"}>
            <h2 className={"font text-2xl opacity-60 mb-3"}>Hello, {session.user.name}!</h2>
            <h1 className={"font-semibold text-4xl leading-[48px]"}>
                You&apos;ve got <br/> 8 tasks for today 🗒️
            </h1>
        </section>
    );
};