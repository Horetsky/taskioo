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

                return dbUser;
            }
        })
    ],
    callbacks: {
        async jwt({ token}) {
            if(!token.sub) return token;

            token.userId = token.sub;

            const profile = await db.profile.getByUserId(token.sub);

            if(!profile) return token;

            token.profileId = profile.id;
            token.picture = profile.avatar;
            token.name = profile.name;
            token.surname = profile.surname;

            return token;
        }
    }
};