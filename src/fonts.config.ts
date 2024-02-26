import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-latin"
});

const fonts = `${inter.variable}`;

export {
    fonts,
    inter
};