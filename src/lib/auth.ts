import { type NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin",
        newUser: "/signup"
    },
    providers: [
    ],
    callbacks: {}
};