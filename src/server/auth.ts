import { getServerSession, type NextAuthOptions } from "next-auth";
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

        async jwt({ token, user }) {
            if(!token.sub) return token;

            token.userId = token.sub;

            const profile = await db.profile.getByUserId(token.sub);

            if(!profile) return token;

            token.profileId = profile.id;
            token.picture = profile.picture;
            token.name = profile.name;
            token.surname = profile.surname;

            return token;
        },

        session({ session, token }) {

            if(token) {
                session.user.userId = token.userId;
                session.user.profileId = token.profileId;
                session.user.picture = token.picture;
                session.user.name = token.name;
                session.user.surname = token.surname;
            }

            return session;
        }
    }
};

export const getSession = () => getServerSession(authOptions);