import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <main>
            <div className={"bg-primary h-72"}>

            </div>
            <div className={"container -mt-52"}>
                { children }
            </div>
        </main>
    );
}