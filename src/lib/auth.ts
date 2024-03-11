import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/server/db";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60
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
                    throw new Error("User with provided email is already exist.");
                }

                const passwordMatch = await bcrypt.compare(
                    password,
                    dbUser.password
                );

                if(!passwordMatch) {
                    throw new Error("Incorrect password.");
                }

                // const area = await db.area.getByUser(dbUser.id);

                return dbUser;
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            return session;
        }
    }
};