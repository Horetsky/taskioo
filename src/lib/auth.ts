import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/server/db";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin",
        newUser: "/signup"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if(!credentials) return null;

                const { email, password } = credentials;

                const dbUser = await db.user.getByEmail(email);


                if(!dbUser || !dbUser.password) {
                    throw new Error("USER_IS_NOT_REGISTERED");
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    dbUser.password
                );

                if(!passwordMatch) {
                    throw new Error("INCORRECT_PASSWORD");
                }

                return dbUser;
            }
        })
    ],
    callbacks: {

    }
};