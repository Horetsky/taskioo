import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@/server/db";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours,
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials) return null;

                const { email, password } = credentials;

                const dbUser = await db.user.getByEmail(email);

                if(!dbUser || !dbUser.password) {
                    throw new Error("User with provided email is already exist.");
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    dbUser.password
                );

                if(!passwordMatch) {
                    throw new Error("Incorrect password.");
                }

                return dbUser;
            }
        })
    ],
    callbacks: {

        jwt({ token }) {

            console.log("jwwwtwtwttwt");

            return token;
        },

        session({ session }) {

            console.log("sesssioao");

            return session;
        }
    }
};