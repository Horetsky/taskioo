import { getSession } from "@/server/auth";
import { cn } from "@/lib/utils";

export const Hero = async () => {

    const session = await getSession();

    return (
        <section className={"mb-20"}>
            <div className={"grid grid-cols-[1.2fr_3fr] gap-x-11"}>
                <div>
                    <h2 className={"font text-2xl opacity-60 mb-3"}>Hello, {session?.user.name}!</h2>
                    <h1 className={"font-semibold text-4xl leading-[48px]"}>
                        You&apos;ve got <br/> 8 tasks for today 🗒️
                    </h1>
                </div>
                <div className={"grid grid-cols-3 gap-x-9"}>
                    {/*<Card />*/}
                    {/*<Card />*/}
                    {/*<Card />*/}
                </div>
            </div>
        </section>
    );
};

const Card = () => {
    return (
        <div className={"relative grid-cols-1 grid-rows-[140px]"}>
            <div
                className={cn(
                    "relative z-10 w-full h-full bg-white shadow-lg rounded-2xl",
                    "py-4 pl-7"
                )}
            >
                <div className={"font-medium"}>
                    Write some code
                </div>
            </div>

            <div className={"absolute z-0 top-0 bottom-0 left-0 right-0 -translate-x-2 rounded-2xl bg-accent"}/>
        </div>
    );
};