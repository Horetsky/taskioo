import { Lato, Oswald } from "next/font/google";

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    variable: "--font-lato"
});
const oswald = Oswald({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-oswald"
});

const fonts = `${lato.variable} ${oswald.variable}`;

export {
    fonts,
    lato,
    oswald
};