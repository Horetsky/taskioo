import { Lato, Poppins } from "next/font/google";

const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700", "900"],
    variable: "--font-lato"
});
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-poppins"
});

const fonts = `${lato.variable} ${poppins.variable}`;

export {
    fonts,
    lato,
    poppins
};